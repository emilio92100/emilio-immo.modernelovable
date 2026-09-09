import { useState, useEffect, useRef } from "react";
import { Send, Home, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SuccessPopup from "@/components/SuccessPopup";
import { checkSubmission, honeypotFieldName, honeypotStyle, markSubmitted } from "@/lib/antiBot";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface EstimationFormProps {
  trigger: React.ReactNode;
}

const reasons = [
  "Projet de vente à court terme",
  "Projet de vente à long terme",
  "Pour notaire / succession",
  "Par simple curiosité",
];

const EstimationForm = ({ trigger }: EstimationFormProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(Date.now());

  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    address: "",
    postalCode: "",
    city: "",
    phone: "",
    reason: "",
    surface: "",
    floor: "",
    bedrooms: "",
    message: "",
  });

  type Suggestion = { label: string; name: string; postcode: string; city: string };
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const justSelectedRef = useRef(false);

  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    const q = form.address.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = window.setTimeout(async () => {
      try {
        setSearching(true);
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=6&autocomplete=1`
        );
        const data = await res.json();
        const items: Suggestion[] = (data.features || []).map((f: any) => ({
          label: f.properties.label,
          name: f.properties.name,
          postcode: f.properties.postcode,
          city: f.properties.city,
        }));
        setSuggestions(items);
        setShowSuggestions(items.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, 250);
  }, [form.address]);

  const selectSuggestion = (s: Suggestion) => {
    justSelectedRef.current = true;
    setForm((prev) => ({ ...prev, address: s.name, postalCode: s.postcode, city: s.city }));
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const emptyForm = { lastName: "", firstName: "", address: "", postalCode: "", city: "", phone: "", reason: "", surface: "", floor: "", bedrooms: "", message: "" };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const check = checkSubmission({
      honeypot,
      startedAt: startedAt.current,
      name: `${form.firstName} ${form.lastName}`,
      message: form.message,
      phone: form.phone,
      requirePhone: true,
    });
    if (!check.ok) {
      if (check.silent) {
        setForm(emptyForm);
        setOpen(false);
        setShowSuccess(true);
        return;
      }
      toast({ title: "Vérification", description: check.reason, variant: "destructive" });
      return;
    }

    setLoading(true);


    try {
      const { error } = await supabase.from("contact_submissions").insert({
        form_type: "estimation",
        name: `${form.firstName} ${form.lastName}`,
        email: "",
        phone: form.phone,
        message: [
          `Adresse : ${form.address}`,
          `Code postal : ${form.postalCode}`,
          `Ville : ${form.city}`,
          `Raison : ${form.reason}`,
          form.surface ? `Surface : ${form.surface} m²` : null,
          form.floor ? `Étage : ${form.floor}` : null,
          form.bedrooms ? `Chambres : ${form.bedrooms}` : null,
          form.message ? `Message : ${form.message}` : null,
        ].filter(Boolean).join("\n"),
      });

      if (error) throw error;

      try {
        await supabase.functions.invoke("send-contact-email", {
          body: {
            form_type: "estimation",
            name: `${form.firstName} ${form.lastName}`,
            phone: form.phone,
            message: `Estimation demandée\nAdresse : ${form.address}\nCode postal : ${form.postalCode}\nVille : ${form.city}\nRaison : ${form.reason}`,
          },
        });
      } catch {
        // best-effort
      }

      setForm({ lastName: "", firstName: "", address: "", postalCode: "", city: "", phone: "", reason: "", surface: "", floor: "", bedrooms: "", message: "" });
      setOpen(false);
      setShowSuccess(true);
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all";

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <Home className="w-5 h-5 text-accent" />
              Estimer mon bien
            </DialogTitle>
            <DialogDescription className="font-body text-sm text-muted-foreground">
              Remplissez ce formulaire et nous vous recontacterons rapidement avec une estimation personnalisée.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3 mt-2">
            {/* Required fields */}
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="text" placeholder="Nom *" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Prénom *" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Adresse du bien * (ex: 12 rue de Paris)"
                required
                autoComplete="off"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className={inputClass}
              />
              {searching && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
              )}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-64 overflow-y-auto">
                  {suggestions.map((s, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          selectSuggestion(s);
                        }}
                        className="w-full flex items-start gap-2 px-3 py-2 text-left hover:bg-muted font-body text-sm text-foreground border-b border-border last:border-b-0"
                      >
                        <MapPin className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{s.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-[11px] text-muted-foreground mt-1 font-body">
                Commencez à taper l'adresse, le code postal et la ville se rempliront automatiquement.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <input type="text" placeholder="Code postal *" required value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Ville *" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} />
              <input type="tel" placeholder="Téléphone *" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            </div>

            <div>
              <p className="font-body text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">Raison de l'estimation *</p>
              <div className="grid grid-cols-2 gap-2">
                {reasons.map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded border cursor-pointer font-body text-sm transition-all ${
                      form.reason === r
                        ? "border-accent bg-accent/10 text-accent font-semibold"
                        : "border-border bg-background hover:bg-muted text-foreground"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={r}
                      checked={form.reason === r}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="sr-only"
                      required
                    />
                    {r}
                  </label>
                ))}
              </div>
            </div>

            {/* Optional fields */}
            <div className="border-t border-border pt-3 mt-3">
              <p className="font-body text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">Informations complémentaires (optionnel)</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <input type="text" placeholder="Surface (m²)" value={form.surface} onChange={(e) => setForm({ ...form, surface: e.target.value })} className={inputClass} />
                <input type="text" placeholder="Étage" value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })} className={inputClass} />
                <input type="text" placeholder="Nb de chambres" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} className={inputClass} />
              </div>
              <textarea
                placeholder="Message complémentaire..."
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} mt-3 resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded font-body font-semibold tracking-wide text-sm hover:brightness-110 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {loading ? "Envoi en cours..." : "Demander mon estimation"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <SuccessPopup
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Demande envoyée !"
        description="Merci d'avoir envoyé votre demande d'estimation. Un conseiller vous recontactera rapidement."
      />
    </>
  );
};

export default EstimationForm;
