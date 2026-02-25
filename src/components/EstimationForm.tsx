import { useState } from "react";
import { Send, Home, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SuccessPopup from "@/components/SuccessPopup";
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
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    address: "",
    postalCode: "",
    phone: "",
    reason: "",
    surface: "",
    floor: "",
    bedrooms: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            message: `Estimation demandée\nAdresse : ${form.address}\nCode postal : ${form.postalCode}\nRaison : ${form.reason}`,
          },
        });
      } catch {
        // best-effort
      }

      setForm({ lastName: "", firstName: "", address: "", postalCode: "", phone: "", reason: "", surface: "", floor: "", bedrooms: "", message: "" });
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
            <input type="text" placeholder="Adresse du bien *" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} />
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="text" placeholder="Code postal *" required value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} className={inputClass} />
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
        description="Nous vous recontacterons rapidement avec votre estimation personnalisée."
      />
    </>
  );
};

export default EstimationForm;
