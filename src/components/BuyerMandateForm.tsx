import { useState, useRef } from "react";
import { Send, Search } from "lucide-react";
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

interface BuyerMandateFormProps {
  trigger: React.ReactNode;
}

const BuyerMandateForm = ({ trigger }: BuyerMandateFormProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    property_type: "",
    desired_location: "",
    desired_surface: "",
    timeline: "",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(Date.now());

  const emptyForm = { name: "", email: "", phone: "", budget: "", property_type: "", desired_location: "", desired_surface: "", timeline: "", message: "" };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const check = checkSubmission({
      honeypot,
      startedAt: startedAt.current,
      name: form.name,
      message: form.message,
      email: form.email,
      phone: form.phone,
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
        form_type: "mandat_recherche",
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        budget: form.budget || null,
        property_type: form.property_type || null,
        desired_location: form.desired_location || null,
        desired_surface: form.desired_surface || null,
        timeline: form.timeline || null,
        message: form.message || null,
      });

      if (error) throw error;

      markSubmitted();

      // Try to send email notification
      try {
        await supabase.functions.invoke("send-contact-email", {
          body: { ...form, form_type: "mandat_recherche" },
        });
      } catch {
        // Email is best-effort, don't block the submission
      }

      setForm(emptyForm);
      startedAt.current = Date.now();
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
    "w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground rounded font-body text-sm focus:outline-none focus:border-accent transition-colors";

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2 font-extrabold tracking-[-0.025em]">
            <Search className="w-5 h-5 text-accent" />
            Mandat de Recherche
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground">
            Décrivez votre projet immobilier et nous vous accompagnerons dans votre recherche.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <input
            type="text"
            name={honeypotFieldName}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={honeypotStyle}
          />

          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nom complet *"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Email *"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <input
            type="tel"
            placeholder="Téléphone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />

          <div className="border-t border-border pt-3 mt-3">
            <p className="font-body text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">Votre projet</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <select
                value={form.property_type}
                onChange={(e) => setForm({ ...form, property_type: e.target.value })}
                className={inputClass}
              >
                <option value="">Type de bien</option>
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
                <option value="terrain">Terrain</option>
                <option value="commerce">Local commercial</option>
                <option value="immeuble">Immeuble</option>
              </select>
              <input
                type="text"
                placeholder="Budget (ex: 300 000 €)"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <input
                type="text"
                placeholder="Localisation souhaitée"
                value={form.desired_location}
                onChange={(e) => setForm({ ...form, desired_location: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Surface souhaitée (m²)"
                value={form.desired_surface}
                onChange={(e) => setForm({ ...form, desired_surface: e.target.value })}
                className={inputClass}
              />
            </div>
            <select
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className={`${inputClass} mt-3`}
            >
              <option value="">Délai souhaité</option>
              <option value="urgent">Urgent (moins d'1 mois)</option>
              <option value="1-3mois">1 à 3 mois</option>
              <option value="3-6mois">3 à 6 mois</option>
              <option value="6mois+">Plus de 6 mois</option>
            </select>
          </div>

          <textarea
            placeholder="Précisions sur votre recherche..."
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded font-body font-semibold tracking-wide text-sm hover:brightness-110 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> {loading ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
    <SuccessPopup
      open={showSuccess}
      onClose={() => setShowSuccess(false)}
      title="Demande envoyée !"
      description="Nous vous recontacterons dans les plus brefs délais pour votre projet de recherche."
    />
    </>
  );
};

export default BuyerMandateForm;
