import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  Bed,
  Maximize,
  Layers,
  Sun,
  Sparkles,
  Car,
  Archive,
  Phone,
  Mail,
  User,
  CheckCircle2,
  Loader2,
  MapPin,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  ShieldCheck,
  Send,
  Compass,
  TreePine,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EstimationPopupProps {
  trigger: React.ReactNode;
  defaultCity?: string;
  defaultPostalCode?: string;
}

type PropertyType = "Appartement" | "Maison";
type Step = 1 | 2 | 3 | 4;

type FormData = {
  property_type: PropertyType | "";
  rooms: string;
  bedrooms: string;
  surface: string;
  floor: string;
  total_floors: string;
  is_ground_floor: boolean;
  is_top_floor: boolean;
  has_balcony: boolean;
  has_terrace: boolean;
  exposition: string;
  condition: string;
  has_cellar: boolean;
  has_parking: boolean;
  // step 2
  address: string;
  postal_code: string;
  city: string;
  // step 3
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  timeline: string;
  consent: boolean;
};

const initialForm = (defaultCity?: string, defaultPostal?: string): FormData => ({
  property_type: "",
  rooms: "",
  bedrooms: "",
  surface: "",
  floor: "",
  total_floors: "",
  is_ground_floor: false,
  is_top_floor: false,
  has_balcony: false,
  has_terrace: false,
  exposition: "",
  condition: "",
  has_cellar: false,
  has_parking: false,
  address: "",
  postal_code: defaultPostal || "",
  city: defaultCity || "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  timeline: "",
  consent: false,
});

const expositions = [
  { val: "Sud", icon: Sun },
  { val: "Est", icon: Compass },
  { val: "Ouest", icon: Compass },
  { val: "Nord", icon: Compass },
  { val: "Traversant", icon: Sparkles },
];

const conditions = ["À rafraîchir", "Bon état", "Refait à neuf", "Neuf"];
const timelines = [
  "Par simple curiosité",
  "Projet d'ici 3 mois",
  "Projet d'ici 6 mois",
  "Dans 1 an ou plus",
];

type EstimateResult = {
  ok?: boolean;
  estimate?: { low: number; mid: number; high: number };
  price_per_sqm?: { low: number; mid: number; high: number };
  sample_size?: number;
  error?: string;
};

const fmtEUR = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const EstimationPopup = ({ trigger, defaultCity, defaultPostalCode }: EstimationPopupProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialForm(defaultCity, defaultPostalCode));
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);

  // Address autocomplete
  type Suggestion = { label: string; name: string; postcode: string; city: string };
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const justSelectedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      // reset on close
      setTimeout(() => {
        setStep(1);
        setForm(initialForm(defaultCity, defaultPostalCode));
        setResult(null);
      }, 300);
    }
  }, [open, defaultCity, defaultPostalCode]);

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
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=6&autocomplete=1`,
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
    setForm((p) => ({ ...p, address: s.name, postal_code: s.postcode, city: s.city }));
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const canNextStep1 =
    !!form.property_type && !!form.rooms && !!form.surface && Number(form.surface) > 5;
  const canNextStep2 = !!form.address && !!form.postal_code && !!form.city;
  const canSubmit =
    !!form.first_name &&
    !!form.last_name &&
    !!form.email &&
    !!form.phone &&
    !!form.timeline &&
    form.consent;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      // 1. Get DVF estimation
      let estimate: EstimateResult | null = null;
      try {
        const { data, error } = await supabase.functions.invoke("dvf-estimate", {
          body: {
            postal_code: form.postal_code,
            property_type: form.property_type,
            surface: Number(form.surface),
          },
        });
        if (!error) estimate = data as EstimateResult;
      } catch {
        // silent fallback
      }

      // 2. Save to DB
      const detailsLines = [
        `Type : ${form.property_type}`,
        `Pièces : ${form.rooms}`,
        form.bedrooms ? `Chambres : ${form.bedrooms}` : null,
        `Surface : ${form.surface} m²`,
        form.floor ? `Étage : ${form.floor}${form.total_floors ? ` / ${form.total_floors}` : ""}` : null,
        form.is_ground_floor ? "RDC" : null,
        form.is_top_floor ? "Dernier étage" : null,
        form.has_balcony ? "Balcon ✓" : null,
        form.has_terrace ? "Terrasse ✓" : null,
        form.exposition ? `Exposition : ${form.exposition}` : null,
        form.condition ? `État : ${form.condition}` : null,
        form.has_cellar ? "Cave ✓" : null,
        form.has_parking ? "Parking ✓" : null,
        ``,
        `Adresse : ${form.address}, ${form.postal_code} ${form.city}`,
        `Délai projet : ${form.timeline}`,
        estimate?.ok && estimate.estimate
          ? `\n→ Estimation DVF auto : ${fmtEUR(estimate.estimate.low)} – ${fmtEUR(
              estimate.estimate.high,
            )} (${estimate.sample_size} ventes)`
          : `\n→ Estimation DVF : non disponible (peu de ventes récentes)`,
      ]
        .filter(Boolean)
        .join("\n");

      const { error: dbError } = await supabase.from("contact_submissions").insert({
        form_type: "estimation",
        name: `${form.first_name} ${form.last_name}`,
        email: form.email,
        phone: form.phone,
        message: detailsLines,
        desired_location: `${form.city} (${form.postal_code})`,
        property_type: form.property_type,
        desired_surface: form.surface,
        timeline: form.timeline,
      });
      if (dbError) throw dbError;

      // 3. Notify (best-effort)
      try {
        await supabase.functions.invoke("send-contact-email", {
          body: {
            form_type: "estimation",
            name: `${form.first_name} ${form.last_name}`,
            email: form.email,
            phone: form.phone,
            message: detailsLines,
          },
        });
      } catch {
        // silent
      }

      setResult(estimate || { error: "no_data" });
      setStep(4);
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- UI sub-components ----------
  const stepLabels = ["Le bien", "L'adresse", "Vos coordonnées"];
  const StepperBar = () => {
    const progress = ((step - 1) / 2) * 100;
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
            Étape {step}/3
          </span>
          <span className="font-body text-[12px] text-foreground font-semibold">
            {stepLabels[step - 1]}
          </span>
        </div>
        <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${Math.max(progress, 4)}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/80 to-accent rounded-full"
          />
        </div>
      </div>
    );
  };

  const ChoiceCard = ({
    icon: Icon,
    label,
    selected,
    onClick,
  }: {
    icon: typeof Home;
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
        selected
          ? "border-accent bg-accent/10 text-accent"
          : "border-border bg-card hover:border-accent/40 text-foreground"
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="font-body text-sm font-semibold">{label}</span>
    </button>
  );

  const ToggleCard = ({
    icon: Icon,
    label,
    checked,
    onToggle,
  }: {
    icon: typeof Home;
    label: string;
    checked: boolean;
    onToggle: () => void;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
        checked
          ? "border-accent bg-accent/10 text-accent"
          : "border-border bg-card hover:border-accent/40 text-foreground"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-body text-sm font-semibold flex-1 text-left">{label}</span>
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          checked ? "border-accent bg-accent" : "border-muted-foreground"
        }`}
      >
        {checked && <CheckCircle2 className="w-4 h-4 text-accent-foreground" />}
      </div>
    </button>
  );

  const inputClass =
    "w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="max-w-xl p-0 bg-transparent border-0 shadow-none gap-0 rounded-none [&>button]:hidden overflow-visible"
      >
        <style>{`
          .estimation-scroll::-webkit-scrollbar { width: 6px; }
          .estimation-scroll::-webkit-scrollbar-track { background: transparent; }
          .estimation-scroll::-webkit-scrollbar-thumb {
            background: hsl(var(--accent) / 0.4);
            border-radius: 9999px;
          }
          .estimation-scroll::-webkit-scrollbar-thumb:hover { background: hsl(var(--accent) / 0.65); }
          .estimation-scroll { scrollbar-width: thin; scrollbar-color: hsl(var(--accent) / 0.4) transparent; }
        `}</style>

        <div className="relative w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-background shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)]">
          {/* Compact header — single thin band */}
          <div className="relative shrink-0 bg-primary px-5 md:px-6 py-3.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <DialogTitle className="font-display text-base md:text-lg text-primary-foreground leading-tight tracking-tight">
                Estimation <span className="italic text-accent font-normal">gratuite</span> de votre bien
              </DialogTitle>
              <DialogDescription className="font-body text-[11px] md:text-[12px] text-primary-foreground/65 mt-0.5">
                Confidentiel · Réponse sous 24h
              </DialogDescription>
            </div>
            <DialogClose
              aria-label="Fermer"
              className="shrink-0 w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/20 hover:border-primary-foreground/40 flex items-center justify-center text-primary-foreground transition-all focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <X className="w-4 h-4" />
            </DialogClose>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto estimation-scroll">
            {step < 4 && (
              <div className="px-5 md:px-6 pt-4 pb-3 border-b border-border/60 bg-card/30">
                <StepperBar />
              </div>
            )}

            <div className="px-5 md:px-6 py-5">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Type */}
                <div>
                  <p className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                    Type de bien *
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <ChoiceCard
                      icon={Building2}
                      label="Appartement"
                      selected={form.property_type === "Appartement"}
                      onClick={() => setForm({ ...form, property_type: "Appartement" })}
                    />
                    <ChoiceCard
                      icon={Home}
                      label="Maison"
                      selected={form.property_type === "Maison"}
                      onClick={() => setForm({ ...form, property_type: "Maison" })}
                    />
                  </div>
                </div>

                {/* Pièces / surface / chambres */}
                <div>
                  <p className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                    Caractéristiques *
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="relative">
                      <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="number"
                        min="1"
                        placeholder="Pièces *"
                        value={form.rooms}
                        onChange={(e) => setForm({ ...form, rooms: e.target.value })}
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                    <div className="relative">
                      <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="number"
                        min="5"
                        placeholder="Surface (m²) *"
                        value={form.surface}
                        onChange={(e) => setForm({ ...form, surface: e.target.value })}
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                    <div className="relative">
                      <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="number"
                        min="0"
                        placeholder="Chambres"
                        value={form.bedrooms}
                        onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>
                </div>

                {/* Étage */}
                <div>
                  <p className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                    Étage
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="number"
                      min="0"
                      placeholder="Étage du bien"
                      value={form.floor}
                      onChange={(e) => setForm({ ...form, floor: e.target.value })}
                      className={inputClass}
                      disabled={form.is_ground_floor}
                    />
                    <input
                      type="number"
                      min="1"
                      placeholder="Nb d'étages immeuble"
                      value={form.total_floors}
                      onChange={(e) => setForm({ ...form, total_floors: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <ToggleCard
                      icon={Building2}
                      label="Rez-de-chaussée"
                      checked={form.is_ground_floor}
                      onToggle={() =>
                        setForm({
                          ...form,
                          is_ground_floor: !form.is_ground_floor,
                          is_top_floor: false,
                          floor: !form.is_ground_floor ? "0" : form.floor,
                        })
                      }
                    />
                    <ToggleCard
                      icon={Layers}
                      label="Dernier étage"
                      checked={form.is_top_floor}
                      onToggle={() =>
                        setForm({
                          ...form,
                          is_top_floor: !form.is_top_floor,
                          is_ground_floor: false,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Extérieurs */}
                <div>
                  <p className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                    Extérieurs
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <ToggleCard
                      icon={TreePine}
                      label="Balcon"
                      checked={form.has_balcony}
                      onToggle={() => setForm({ ...form, has_balcony: !form.has_balcony })}
                    />
                    <ToggleCard
                      icon={Sun}
                      label="Terrasse"
                      checked={form.has_terrace}
                      onToggle={() => setForm({ ...form, has_terrace: !form.has_terrace })}
                    />
                  </div>
                </div>

                {/* Exposition */}
                <div>
                  <p className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                    Exposition
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {expositions.map((e) => (
                      <ChoiceCard
                        key={e.val}
                        icon={e.icon}
                        label={e.val}
                        selected={form.exposition === e.val}
                        onClick={() =>
                          setForm({ ...form, exposition: form.exposition === e.val ? "" : e.val })
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* État */}
                <div>
                  <p className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                    État général
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {conditions.map((c) => (
                      <ChoiceCard
                        key={c}
                        icon={Sparkles}
                        label={c}
                        selected={form.condition === c}
                        onClick={() =>
                          setForm({ ...form, condition: form.condition === c ? "" : c })
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Annexes */}
                <div>
                  <p className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                    Annexes
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <ToggleCard
                      icon={Archive}
                      label="Cave"
                      checked={form.has_cellar}
                      onToggle={() => setForm({ ...form, has_cellar: !form.has_cellar })}
                    />
                    <ToggleCard
                      icon={Car}
                      label="Parking"
                      checked={form.has_parking}
                      onToggle={() => setForm({ ...form, has_parking: !form.has_parking })}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    disabled={!canNextStep1}
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuer <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <p className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                    Adresse du bien *
                  </p>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Commencez à taper l'adresse…"
                      value={form.address}
                      autoComplete="off"
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                      className={`${inputClass} pl-10`}
                    />
                    {searching && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
                    )}
                    {showSuggestions && suggestions.length > 0 && (
                      <ul className="absolute z-50 left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
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
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 font-body flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Votre adresse précise reste confidentielle. Seuls le code postal et la ville sont
                    utilisés pour l'estimation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Code postal *"
                    value={form.postal_code}
                    onChange={(e) => setForm({ ...form, postal_code: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Ville *"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-3 rounded-full font-body font-medium text-sm hover:bg-secondary transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" /> Retour
                  </button>
                  <button
                    type="button"
                    disabled={!canNextStep2}
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuer <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Prénom *"
                      value={form.first_name}
                      onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Nom *"
                      value={form.last_name}
                      onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`${inputClass} pl-10`}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="Téléphone *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`${inputClass} pl-10`}
                  />
                </div>

                <div>
                  <p className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                    Délai de votre projet *
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {timelines.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, timeline: t })}
                        className={`px-3 py-2.5 rounded-lg border-2 font-body text-sm transition-all text-left ${
                          form.timeline === t
                            ? "border-accent bg-accent/10 text-accent font-semibold"
                            : "border-border bg-card hover:border-accent/40 text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 bg-secondary border border-border rounded-lg cursor-pointer">
                  <Checkbox
                    checked={form.consent}
                    onCheckedChange={(v) => setForm({ ...form, consent: !!v })}
                    className="mt-0.5"
                  />
                  <span className="font-body text-xs text-foreground leading-relaxed">
                    J'accepte qu'un conseiller Emilio Immobilier me recontacte pour affiner mon
                    estimation et discuter de mon projet de vente. *
                  </span>
                </label>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-3 rounded-full font-body font-medium text-sm hover:bg-secondary transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" /> Retour
                  </button>
                  <button
                    type="button"
                    disabled={!canSubmit || submitting}
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Calcul en cours…
                      </>
                    ) : (
                      <>
                        Voir mon estimation <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="s4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-5 text-center py-4"
              >
                <div className="inline-flex w-16 h-16 rounded-full bg-accent/15 items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-2xl text-foreground">
                  Votre estimation est prête
                </h3>
                {result?.ok && result.estimate ? (
                  <>
                    <p className="font-body text-sm text-muted-foreground">
                      Estimation indicative pour un {form.property_type?.toLowerCase()} de{" "}
                      {form.surface} m² à {form.city} :
                    </p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-primary text-primary-foreground rounded-2xl p-6"
                    >
                      <div className="font-body text-xs uppercase tracking-wider text-primary-foreground/60 mb-2">
                        Fourchette estimée
                      </div>
                      <div className="font-display text-2xl md:text-3xl text-accent">
                        {fmtEUR(result.estimate.low)} – {fmtEUR(result.estimate.high)}
                      </div>
                      {result.price_per_sqm && (
                        <div className="font-body text-xs text-primary-foreground/60 mt-3">
                          Soit {fmtEUR(result.price_per_sqm.low)} à{" "}
                          {fmtEUR(result.price_per_sqm.high)} / m²
                        </div>
                      )}
                    </motion.div>
                    <p className="font-body text-xs text-muted-foreground">
                      Basé sur <strong className="text-foreground">{result.sample_size} transactions récentes</strong>{" "}
                      analysées dans votre quartier.
                    </p>
                  </>
                ) : (
                  <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
                    Pas assez de ventes récentes dans la base publique pour ce code postal. Pas
                    d'inquiétude : <strong className="text-foreground">notre conseiller vous
                    rappellera sous 24h</strong> avec une estimation experte personnalisée.
                  </p>
                )}

                <div className="bg-accent/10 border border-accent/25 rounded-xl p-4 text-left">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-display text-sm text-foreground mb-1">
                        Un conseiller vous rappelle sous 24h
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        Cette estimation reste indicative — un expert affinera selon l'étage,
                        l'exposition, l'état réel et la dynamique micro-locale.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm"
                >
                  Fermer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EstimationPopup;
