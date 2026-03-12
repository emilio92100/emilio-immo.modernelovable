import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SuccessPopup from "@/components/SuccessPopup";

const STEPS = [
  { label: "Budget" },
  { label: "Localisation" },
  { label: "Critères" },
  { label: "Priorités" },
  { label: "Contact" },
];

const BuyerMandateStepperForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    budget_min: "",
    budget_max: "",
    financement: "",
    desired_location: "",
    quartiers: "",
    property_type: "",
    desired_surface: "",
    rooms: "",
    floor_preference: "",
    exterior: "",
    priority_1: "",
    priority_2: "",
    priority_3: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const budget = [form.budget_min, form.budget_max].filter(Boolean).join(" - ");
      const { error } = await supabase.from("contact_submissions").insert({
        form_type: "mandat_recherche",
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        budget: budget || null,
        property_type: form.property_type || null,
        desired_location: [form.desired_location, form.quartiers].filter(Boolean).join(" — ") || null,
        desired_surface: form.desired_surface || null,
        timeline: form.timeline || null,
        message: [
          form.financement && `Financement: ${form.financement}`,
          form.rooms && `Pièces: ${form.rooms}`,
          form.floor_preference && `Étage: ${form.floor_preference}`,
          form.exterior && `Extérieur: ${form.exterior}`,
          form.priority_1 && `Priorité 1: ${form.priority_1}`,
          form.priority_2 && `Priorité 2: ${form.priority_2}`,
          form.priority_3 && `Priorité 3: ${form.priority_3}`,
          form.message && `Message: ${form.message}`,
        ].filter(Boolean).join("\n") || null,
      });
      if (error) throw error;

      try {
        await supabase.functions.invoke("send-contact-email", {
          body: { ...form, budget, form_type: "mandat_recherche" },
        });
      } catch {}

      setShowSuccess(true);
      setStep(0);
      setForm({
        budget_min: "", budget_max: "", financement: "", desired_location: "", quartiers: "",
        property_type: "", desired_surface: "", rooms: "", floor_preference: "", exterior: "",
        priority_1: "", priority_2: "", priority_3: "", timeline: "",
        name: "", email: "", phone: "", message: "",
      });
    } catch {
      toast({ title: "Erreur", description: "Une erreur est survenue. Veuillez réessayer.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 bg-background border border-border text-foreground placeholder:text-muted-foreground rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all";
  const labelClass = "block font-body text-sm font-semibold text-foreground mb-1.5";
  const requiredStar = <span className="text-destructive ml-0.5">*</span>;

  const selectClass = inputClass;

  const canProceed = () => {
    switch (step) {
      case 0: return form.budget_max && form.financement;
      case 1: return form.desired_location;
      case 2: return form.property_type;
      case 3: return true;
      case 4: return form.name && form.email;
      default: return true;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <h3 className="font-display text-xl md:text-2xl text-foreground">Budget et Financement</h3>
            <div>
              <label className={labelClass}>Budget maximum {requiredStar}</label>
              <input type="text" placeholder="Ex: 350 000 €" value={form.budget_max} onChange={(e) => update("budget_max", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Financement {requiredStar}</label>
              <select value={form.financement} onChange={(e) => update("financement", e.target.value)} className={selectClass}>
                <option value="">Sélectionnez</option>
                <option value="pret_obtenu">Prêt obtenu</option>
                <option value="pret_en_cours">Prêt en cours</option>
                <option value="comptant">Achat comptant</option>
                <option value="non_commence">Pas encore commencé</option>
              </select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <h3 className="font-display text-xl md:text-2xl text-foreground">Localisation souhaitée</h3>
            <div>
              <label className={labelClass}>Ville ou secteur {requiredStar}</label>
              <input type="text" placeholder="Ex: Paris 16ème, Neuilly-sur-Seine..." value={form.desired_location} onChange={(e) => update("desired_location", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Quartiers préférés</label>
              <input type="text" placeholder="Ex: Auteuil, Passy, Trocadéro..." value={form.quartiers} onChange={(e) => update("quartiers", e.target.value)} className={inputClass} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <h3 className="font-display text-xl md:text-2xl text-foreground">Critères du bien</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Type de bien {requiredStar}</label>
                <select value={form.property_type} onChange={(e) => update("property_type", e.target.value)} className={selectClass}>
                  <option value="">Sélectionnez</option>
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                  <option value="terrain">Terrain</option>
                  <option value="commerce">Local commercial</option>
                  <option value="immeuble">Immeuble</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Surface souhaitée</label>
                <input type="text" placeholder="Ex: 60m² minimum" value={form.desired_surface} onChange={(e) => update("desired_surface", e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre de pièces</label>
                <select value={form.rooms} onChange={(e) => update("rooms", e.target.value)} className={selectClass}>
                  <option value="">Sélectionnez</option>
                  <option value="1">Studio / 1 pièce</option>
                  <option value="2">2 pièces</option>
                  <option value="3">3 pièces</option>
                  <option value="4">4 pièces</option>
                  <option value="5+">5 pièces et +</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Étage préféré</label>
                <select value={form.floor_preference} onChange={(e) => update("floor_preference", e.target.value)} className={selectClass}>
                  <option value="">Indifférent</option>
                  <option value="rdc">Rez-de-chaussée</option>
                  <option value="etage_bas">Étage bas (1-3)</option>
                  <option value="etage_haut">Étage élevé (4+)</option>
                  <option value="dernier">Dernier étage</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Extérieur souhaité</label>
              <select value={form.exterior} onChange={(e) => update("exterior", e.target.value)} className={selectClass}>
                <option value="">Indifférent</option>
                <option value="balcon">Balcon</option>
                <option value="terrasse">Terrasse</option>
                <option value="jardin">Jardin</option>
                <option value="loggia">Loggia</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5">
            <h3 className="font-display text-xl md:text-2xl text-foreground">Vos priorités</h3>
            <p className="font-body text-muted-foreground text-sm">Classez vos 3 critères les plus importants :</p>
            <div>
              <label className={labelClass}>Priorité n°1</label>
              <select value={form.priority_1} onChange={(e) => update("priority_1", e.target.value)} className={selectClass}>
                <option value="">Sélectionnez</option>
                <option value="luminosite">Luminosité</option>
                <option value="calme">Calme</option>
                <option value="vue">Vue dégagée</option>
                <option value="standing">Standing de l'immeuble</option>
                <option value="transports">Proximité transports</option>
                <option value="ecoles">Proximité écoles</option>
                <option value="commerces">Proximité commerces</option>
                <option value="parking">Parking / Stationnement</option>
                <option value="travaux">Pas de travaux</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Priorité n°2</label>
              <select value={form.priority_2} onChange={(e) => update("priority_2", e.target.value)} className={selectClass}>
                <option value="">Sélectionnez</option>
                <option value="luminosite">Luminosité</option>
                <option value="calme">Calme</option>
                <option value="vue">Vue dégagée</option>
                <option value="standing">Standing de l'immeuble</option>
                <option value="transports">Proximité transports</option>
                <option value="ecoles">Proximité écoles</option>
                <option value="commerces">Proximité commerces</option>
                <option value="parking">Parking / Stationnement</option>
                <option value="travaux">Pas de travaux</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Priorité n°3</label>
              <select value={form.priority_3} onChange={(e) => update("priority_3", e.target.value)} className={selectClass}>
                <option value="">Sélectionnez</option>
                <option value="luminosite">Luminosité</option>
                <option value="calme">Calme</option>
                <option value="vue">Vue dégagée</option>
                <option value="standing">Standing de l'immeuble</option>
                <option value="transports">Proximité transports</option>
                <option value="ecoles">Proximité écoles</option>
                <option value="commerces">Proximité commerces</option>
                <option value="parking">Parking / Stationnement</option>
                <option value="travaux">Pas de travaux</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Délai souhaité</label>
              <select value={form.timeline} onChange={(e) => update("timeline", e.target.value)} className={selectClass}>
                <option value="">Sélectionnez</option>
                <option value="urgent">Urgent (moins d'1 mois)</option>
                <option value="1-3mois">1 à 3 mois</option>
                <option value="3-6mois">3 à 6 mois</option>
                <option value="6mois+">Plus de 6 mois</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-5">
            <h3 className="font-display text-xl md:text-2xl text-foreground">Vos coordonnées</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nom complet {requiredStar}</label>
                <input type="text" placeholder="Votre nom" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email {requiredStar}</label>
                <input type="email" placeholder="votre@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Téléphone</label>
              <input type="tel" placeholder="06 12 34 56 78" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Message complémentaire</label>
              <textarea placeholder="Précisions sur votre recherche..." rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} className={`${inputClass} resize-none`} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">Démarrez Votre Recherche</h2>
            <p className="font-body text-muted-foreground">Complétez le formulaire pour que nous puissions vous accompagner efficacement</p>
          </div>

          {/* Stepper */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-between relative">
              {/* Line behind */}
              <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-border" />
              <div
                className="absolute top-5 left-[10%] h-0.5 bg-accent transition-all duration-500"
                style={{ width: `${(step / (STEPS.length - 1)) * 80}%` }}
              />

              {STEPS.map((s, i) => (
                <div key={s.label} className="flex flex-col items-center relative z-10">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-body transition-colors duration-300 ${
                      i < step
                        ? "bg-accent text-accent-foreground"
                        : i === step
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                    animate={i === step ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </motion.div>
                  <span className={`mt-2 text-xs font-body font-medium transition-colors ${
                    i <= step ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl shadow-sm border border-border p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={prev}
                    className="flex items-center gap-2 font-body text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Précédent
                  </button>
                ) : (
                  <div />
                )}

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canProceed()}
                    className="flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                  >
                    Suivant <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canProceed() || loading}
                    className="flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                  >
                    <Send className="w-4 h-4" /> {loading ? "Envoi..." : "Envoyer"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SuccessPopup
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Demande envoyée !"
        description="Nous vous recontacterons dans les plus brefs délais pour votre projet de recherche."
      />
    </>
  );
};

export default BuyerMandateStepperForm;
