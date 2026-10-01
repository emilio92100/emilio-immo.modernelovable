/* ═══ « Estimer mon bien » : parcours en 4 étapes + première estimation ═════
   1. Adresse et type de bien   2. Le bien   3. Le projet   4. Coordonnées
   La demande part dans le CRM (contact_submissions, form_type « estimation »).
   La fourchette vient de la fonction dvf-estimate (ventes DVF), quand elle existe. */
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, CalendarDays, Check, FileText, Home, LineChart, Loader2, Lock, MapPin, Phone, Search, Sun } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { checkSubmission, honeypotFieldName, honeypotStyle, markSubmitted } from "@/lib/antiBot";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ModalShell, TeamStack } from "./ModalShell";
import { Btn, TEL, TEL_HREF } from "./ui";
import { Consent, Field, Group, Pills, Segmented, Steps, Tile, Toggle, toggleIn } from "./form";
import type { EstimationPrefill } from "./SiteModals";
import alexandre from "@/assets/refonte/alexandre-detoure.webp";

type TypeBien = "Appartement" | "Maison" | "Autre";
type Suggestion = { label: string; name: string; postcode: string; city: string };
type Estimate = { ok?: boolean; estimate?: { low: number; mid: number; high: number }; price_per_sqm?: { low: number; mid: number; high: number }; sample_size?: number; scope?: "postal" | "district" | "department" };

const STEPS = ["Adresse", "Le bien", "Votre projet", "Coordonnées"];
const PROJETS = [
  { k: "Vendre dans les 3 mois", icon: <CalendarDays className="h-5 w-5" /> },
  { k: "Vendre d’ici un an", icon: <CalendarDays className="h-5 w-5" /> },
  { k: "Vendre plus tard", icon: <CalendarDays className="h-5 w-5" /> },
  { k: "Succession, donation ou séparation", icon: <FileText className="h-5 w-5" /> },
  { k: "Connaître sa valeur", sub: "sans projet de vente", icon: <Search className="h-5 w-5" /> },
] as const;
const ETATS = ["À rénover", "À rafraîchir", "Bon état", "Très bon état", "Refait à neuf"] as const;
const EXPOS = ["Nord", "Est", "Sud", "Ouest", "Traversant"] as const;
const CRENEAUX = ["Le matin", "Le midi", "L’après-midi", "En soirée", "Peu importe"] as const;
const POSITIONS = ["Rez-de-chaussée", "Intermédiaire", "Dernier étage"] as const;
const OPTS_APPART = ["Ascenseur", "Balcon", "Terrasse", "Cave", "Parking", "Vue dégagée"] as const;
const OPTS_MAISON = ["Jardin", "Terrasse", "Garage", "Sous-sol", "Piscine", "Plain-pied"] as const;

/* Nos secteurs (codes postaux) */
const SECTEURS: Record<string, string> = {
  "75006": "Paris 6e", "75007": "Paris 7e", "75015": "Paris 15e", "75016": "Paris 16e", "75116": "Paris 16e", "75017": "Paris 17e",
  "92100": "Boulogne-Billancourt", "92130": "Issy-les-Moulineaux", "92200": "Neuilly-sur-Seine", "92300": "Levallois-Perret",
  "92210": "Saint-Cloud", "92380": "Garches", "92140": "Clamart",
};
const zoneDe = (cp: string): { ok: "oui" | "proche" | "non"; texte: string } => {
  if (SECTEURS[cp]) return { ok: "oui", texte: `${SECTEURS[cp]} : c’est l’un de nos secteurs.` };
  if (cp.startsWith("92")) return { ok: "proche", texte: "Hauts-de-Seine : nous intervenons aussi dans votre commune." };
  if (cp.startsWith("75")) return { ok: "proche", texte: "Paris : nous étudions votre demande avec plaisir." };
  return { ok: "non", texte: "Nous travaillons surtout à Paris et dans les Hauts-de-Seine. Envoyez quand même votre demande : on vous dira honnêtement si on peut vous aider." };
};

const eur = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const withTimeout = <T,>(p: Promise<T>, ms: number) => Promise.race([p, new Promise<null>((r) => setTimeout(() => r(null), ms))]);

export default function EstimationFlow({ open, onClose, prefill, onContact }: { open: boolean; onClose: () => void; prefill: EstimationPrefill; onContact: () => void }) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [type, setType] = useState<TypeBien | "">("");
  const [adresse, setAdresse] = useState(prefill.address || "");
  const [cp, setCp] = useState(prefill.postalCode || "");
  const [ville, setVille] = useState(prefill.city || "");
  const [manuel, setManuel] = useState(false);
  const [sugg, setSugg] = useState<Suggestion[]>([]);
  const [showSugg, setShowSugg] = useState(false);
  const [surface, setSurface] = useState("");
  const [pieces, setPieces] = useState("");
  const [chambres, setChambres] = useState("");
  const [etage, setEtage] = useState("");
  const [position, setPosition] = useState<string>("");
  const [terrain, setTerrain] = useState("");
  const [autreType, setAutreType] = useState("");
  const [opts, setOpts] = useState<string[]>([]);
  const [projet, setProjet] = useState("");
  const [etat, setEtat] = useState("");
  const [expos, setExpos] = useState<string[]>([]);
  const [c, setC] = useState({ prenom: "", nom: "", email: "", tel: "" });
  const [creneau, setCreneau] = useState<string>("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<Estimate | null>(null);
  const startedAt = useRef(Date.now());
  const picked = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  /* Suggestions d'adresses (Base Adresse Nationale) */
  useEffect(() => {
    if (picked.current) { picked.current = false; return; }
    const q = adresse.trim();
    if (q.length < 3) { setSugg([]); setShowSugg(false); return; }
    const t = window.setTimeout(async () => {
      try {
        const r = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=6&autocomplete=1`);
        const j = await r.json();
        const items: Suggestion[] = (j.features || []).map((x: { properties: Suggestion }) => ({ label: x.properties.label, name: x.properties.name, postcode: x.properties.postcode, city: x.properties.city }));
        setSugg(items);
        setShowSugg(items.length > 0);
      } catch { setSugg([]); }
    }, 250);
    return () => window.clearTimeout(t);
  }, [adresse]);

  const choose = (s: Suggestion) => {
    picked.current = true;
    setAdresse(s.label);
    setCp(s.postcode);
    setVille(s.city);
    setShowSugg(false);
  };

  useEffect(() => { bodyRef.current?.scrollTo({ top: 0 }); }, [step]);

  const zone = cp.length === 5 ? zoneDe(cp) : null;
  const ok1 = !!type && adresse.trim().length > 3 && /^\d{5}$/.test(cp) && ville.trim().length > 1;
  const ok2 = Number(surface) > 5 && (type === "Autre" || !!pieces);
  const ok3 = !!projet;
  const ok4 = c.prenom.trim() && c.nom.trim() && c.email.trim() && c.tel.trim() && consent;
  const canNext = [ok1, ok2, ok3, ok4][step - 1];
  const options = type === "Maison" ? OPTS_MAISON : OPTS_APPART;

  const send = async () => {
    if (!ok4 || sending) return;
    const name = `${c.prenom.trim()} ${c.nom.trim()}`;
    const check = checkSubmission({ honeypot, startedAt: startedAt.current, name, email: c.email, phone: c.tel, requirePhone: true });
    if (!check.ok) {
      if (check.silent) { setResult({}); setStep(5); return; }
      toast({ title: "Vérification", description: check.reason, variant: "destructive" });
      return;
    }
    setSending(true);
    let est: Estimate | null = null;
    if (type === "Appartement" || type === "Maison") {
      try {
        const r = await withTimeout(supabase.functions.invoke("dvf-estimate", { body: { postal_code: cp, property_type: type, surface: Number(surface) } }), 7000);
        if (r && !r.error) est = r.data as Estimate;
      } catch { /* sans fourchette */ }
    }
    const lignes = [
      `Type : ${type === "Autre" ? `Autre${autreType ? ` (${autreType})` : ""}` : type}`,
      `Surface : ${surface} m²`,
      pieces && `Pièces : ${pieces}`,
      chambres && `Chambres : ${chambres}`,
      type === "Appartement" && (etage || position) && `Étage : ${[etage, position].filter(Boolean).join(" · ")}`,
      type === "Maison" && terrain && `Terrain : ${terrain} m²`,
      opts.length && `Atouts : ${opts.join(", ")}`,
      etat && `État : ${etat}`,
      expos.length && `Exposition : ${expos.join(", ")}`,
      `Projet : ${projet}`,
      creneau && `Rappel : ${creneau}`,
      `Adresse : ${adresse}${manuel ? `, ${cp} ${ville}` : ""}`,
      est?.ok && est.estimate ? `Estimation DVF : ${eur(est.estimate.low)} – ${eur(est.estimate.high)} (${est.sample_size} ventes)` : "Estimation DVF : non disponible",
    ].filter(Boolean).join("\n");
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        form_type: "estimation",
        name,
        email: c.email.trim(),
        phone: c.tel.trim(),
        message: lignes,
        desired_location: `${ville} (${cp})`,
        property_type: type === "Autre" ? "Autre" : type,
        desired_surface: surface,
        timeline: projet,
      });
      if (error) throw error;
      markSubmitted();
      try {
        await supabase.functions.invoke("send-contact-email", { body: { form_type: "estimation", name, email: c.email, phone: c.tel, message: lignes } });
      } catch { /* le CRM relit la table */ }
      setResult(est || {});
      setStep(5);
    } catch {
      toast({ title: "Erreur", description: `L’envoi n’a pas abouti. Réessayez, ou appelez-nous au ${TEL}.`, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const next = () => {
    if (!canNext) return;
    if (step < 4) setStep(step + 1);
    else send();
  };

  const titre = useMemo(() => (type === "Maison" ? "votre maison" : type === "Appartement" ? "votre appartement" : "votre bien"), [type]);

  return (
    <ModalShell open={open} onClose={onClose} title="Estimer mon bien" wide>
      <div className="flex min-h-full flex-col gap-4 sm:gap-5">
        <div className="flex items-center gap-3.5 pr-12">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-[14px] bg-brand-orange text-brand-ink sm:h-[50px] sm:w-[50px]"><LineChart className="h-[22px] w-[22px]" /></span>
          <div className="flex min-w-0 flex-col">
            <h2 className="m-0 font-display text-[24px] font-medium leading-tight text-brand-ink sm:text-[28px]">Estimer mon bien</h2>
            <span className="inline-flex items-center gap-1.5 text-[13px] text-brand-mut sm:text-sm">
              <Lock className="h-3.5 w-3.5 text-brand-orange-text" /> Gratuit · sans engagement · confidentiel
            </span>
          </div>
        </div>
        <div className="hidden sm:block"><Steps labels={STEPS} current={step} /></div>
        <div className="sm:hidden"><Steps labels={STEPS} current={step} compact /></div>

        <div ref={bodyRef} className="flex flex-1 flex-col gap-5">
          {step === 1 && (
            <>
              <Q t="Où se trouve votre bien ?" s="Votre adresse reste confidentielle. Elle sert seulement à situer le bien." />
              <Group title="Adresse du bien">
                <div className="relative">
                  <Field
                    label="Adresse"
                    icon={<Search className="h-[18px] w-[18px]" />}
                    placeholder="Commencez à taper l’adresse…"
                    autoComplete="street-address"
                    value={adresse}
                    onChange={(e) => { setAdresse(e.target.value); if (!manuel) { setCp(""); setVille(""); } }}
                    onFocus={() => sugg.length && setShowSugg(true)}
                    onBlur={() => window.setTimeout(() => setShowSugg(false), 150)}
                  />
                  {showSugg && (
                    <ul role="listbox" className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-64 overflow-auto rounded-xl border border-brand-line bg-white p-1 shadow-xl">
                      {sugg.map((s) => (
                        <li key={s.label}>
                          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => choose(s)} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[15px] text-brand-ink hover:bg-brand-pale">
                            <MapPin className="h-4 w-4 flex-none text-brand-orange-text" /> {s.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {manuel && (
                  <div className="grid grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] gap-2.5">
                    <Field label="Code postal" inputMode="numeric" maxLength={5} placeholder="92100" value={cp} onChange={(e) => setCp(e.target.value.replace(/\D/g, ""))} />
                    <Field label="Ville" placeholder="Boulogne-Billancourt" value={ville} onChange={(e) => setVille(e.target.value)} />
                  </div>
                )}
                {zone && (
                  <div className={cn("flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-[14.5px] font-bold", zone.ok === "non" ? "bg-[#FFF6EB] text-[#8A4A07]" : "bg-[#E9F5EF] text-[#1F6B4B]")}>
                    <span className={cn("grid h-[26px] w-[26px] flex-none place-items-center rounded-full", zone.ok === "non" ? "bg-brand-orange" : "bg-[#2E9A66]")}><Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /></span>
                    <span>{zone.texte}</span>
                  </div>
                )}
                {!manuel && (
                  <button type="button" onClick={() => setManuel(true)} className="self-start text-[13.5px] font-bold text-brand underline">Je ne trouve pas mon adresse</button>
                )}
              </Group>
              <Group title="Type de bien">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5">
                  <Tile compact={false} icon={<Building2 className="h-[22px] w-[22px]" />} label="Appartement" on={type === "Appartement"} onClick={() => setType("Appartement")} />
                  <Tile icon={<Home className="h-[22px] w-[22px]" />} label="Maison" on={type === "Maison"} onClick={() => setType("Maison")} />
                  <Tile icon={<Building2 className="h-[22px] w-[22px]" />} label="Autre" sub="immeuble, local…" on={type === "Autre"} onClick={() => setType("Autre")} />
                </div>
              </Group>
            </>
          )}

          {step === 2 && (
            <>
              <Q t={`Parlez-nous de ${titre}`} s="Quelques chiffres suffisent. Vous pourrez tout préciser avec nous." />
              {type === "Autre" && <Field label="De quel bien s’agit-il ?" placeholder="Immeuble, local commercial, terrain…" value={autreType} onChange={(e) => setAutreType(e.target.value)} />}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)]">
                <Group title="Surface habitable"><Field label="Surface" inputMode="numeric" placeholder="Ex. 70" suffix="m²" value={surface} onChange={(e) => setSurface(e.target.value.replace(/[^\d]/g, ""))} /></Group>
                {type !== "Autre" && <Group title="Pièces"><Segmented options={["1", "2", "3", "4", "5 +"] as const} value={[pieces as never]} onChange={(v) => setPieces(v)} /></Group>}
                {type !== "Autre" && <Group title="Chambres" optional><Segmented options={["0", "1", "2", "3", "4 +"] as const} value={[chambres as never]} onChange={(v) => setChambres(v)} /></Group>}
              </div>
              {type === "Appartement" && (
                <Group title="Étage" optional>
                  <div className="grid grid-cols-1 items-end gap-2.5 sm:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)]">
                    <Field label="Étage" inputMode="numeric" placeholder="Ex. 4" value={etage} onChange={(e) => setEtage(e.target.value.replace(/[^\d]/g, ""))} />
                    <Segmented options={POSITIONS} value={[position as never]} onChange={(v) => setPosition(position === v ? "" : v)} />
                  </div>
                </Group>
              )}
              {type === "Maison" && (
                <Group title="Terrain" optional>
                  <Field label="Surface du terrain" inputMode="numeric" placeholder="Ex. 250" suffix="m²" value={terrain} onChange={(e) => setTerrain(e.target.value.replace(/[^\d]/g, ""))} className="sm:max-w-[260px]" />
                </Group>
              )}
              {type !== "Autre" && (
                <Group title="Ce que votre bien a en plus" optional>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {options.map((o) => <Toggle key={o} label={o} on={opts.includes(o)} onClick={() => setOpts(toggleIn(opts, o))} />)}
                  </div>
                </Group>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <Q t="Où en est votre projet ?" s="Pour vous conseiller au bon moment, sans vous presser." />
              <Group title="Votre projet">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5">
                  {PROJETS.map((p) => <Tile key={p.k} compact icon={p.icon} label={p.k} sub={"sub" in p ? p.sub : undefined} on={projet === p.k} onClick={() => setProjet(p.k)} />)}
                </div>
              </Group>
              <Group title="État général" optional>
                <Pills options={ETATS} value={[etat as never]} onToggle={(v) => setEtat(etat === v ? "" : v)} size="sm" />
              </Group>
              <Group title="Exposition" optional hint="Plusieurs choix possibles.">
                <Pills options={EXPOS} value={expos as never} onToggle={(v) => setExpos(toggleIn(expos, v))} icon={<Sun className="h-3.5 w-3.5" />} size="sm" />
              </Group>
            </>
          )}

          {step === 4 && (
            <>
              <Q t="Où vous envoyer votre estimation ?" s="Vous voyez une première fourchette tout de suite, puis un membre de l’équipe vous rappelle pour l’affiner." />
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <Field label="Prénom" placeholder="Votre prénom" autoComplete="given-name" value={c.prenom} onChange={(e) => setC({ ...c, prenom: e.target.value })} />
                <Field label="Nom" placeholder="Votre nom" autoComplete="family-name" value={c.nom} onChange={(e) => setC({ ...c, nom: e.target.value })} />
                <Field label="E-mail" type="email" inputMode="email" autoComplete="email" placeholder="vous@exemple.fr" value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} />
                <Field label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" value={c.tel} onChange={(e) => setC({ ...c, tel: e.target.value })} />
              </div>
              <Group title="Quand préférez-vous être rappelé ?" optional>
                <Pills options={CRENEAUX} value={[creneau as never]} onToggle={(v) => setCreneau(creneau === v ? "" : v)} size="sm" />
              </Group>
              <input type="text" name={honeypotFieldName} tabIndex={-1} autoComplete="off" aria-hidden style={honeypotStyle} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              <Consent checked={consent} onChange={setConsent}>J’accepte qu’Emilio Immobilier me recontacte au sujet de mon bien.</Consent>
            </>
          )}

          {step === 5 && <Resultat result={result} prenom={c.prenom} type={type} surface={surface} pieces={pieces} ville={ville} cp={cp} onContact={onContact} />}
        </div>

        {step < 5 && (
          <div className="sticky bottom-0 -mx-[18px] -mb-[18px] flex items-center justify-between gap-3 border-t border-brand-line2 bg-white px-[18px] pb-[18px] pt-4 sm:static sm:m-0 sm:p-0 sm:pt-[18px]">
            <span className="hidden text-sm text-brand-mut sm:inline">Étape {step} sur 4 · environ 2 minutes</span>
            <div className="flex w-full gap-2.5 sm:w-auto">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="inline-flex h-[52px] items-center gap-2 rounded-xl border-[1.5px] border-brand-line px-[18px] text-[15.5px] font-bold text-brand-ink hover:bg-brand-pale">
                  <ArrowLeft className="h-[18px] w-[18px]" /> Retour
                </button>
              )}
              <button
                type="button"
                onClick={next}
                disabled={!canNext || sending}
                className="inline-flex h-[52px] flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-brand-orange px-6 text-[15.5px] font-extrabold text-brand-ink transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45 sm:flex-none"
              >
                {sending ? <><Loader2 className="h-[18px] w-[18px] animate-spin" /> Calcul en cours…</> : <>{step === 4 ? "Voir ma première estimation" : "Continuer"} <ArrowRight className="h-[18px] w-[18px]" /></>}
              </button>
            </div>
          </div>
        )}
      </div>
    </ModalShell>
  );
}

const Q = ({ t, s }: { t: string; s?: string }) => (
  <div>
    <h3 className="m-0 font-display text-[24px] font-medium leading-tight text-brand-ink sm:text-[26px]">{t}</h3>
    {s && <p className="mt-1.5 text-[15px] leading-normal text-brand-txt">{s}</p>}
  </div>
);

function Resultat({ result, prenom, type, surface, pieces, ville, cp, onContact }: { result: Estimate | null; prenom: string; type: string; surface: string; pieces: string; ville: string; cp: string; onContact: () => void }) {
  const has = !!(result?.ok && result.estimate);
  const lieu = result?.scope === "postal" ? `dans le ${cp}` : result?.scope === "district" ? "dans les arrondissements ou communes voisins" : cp.startsWith("75") ? "à Paris" : "dans le département";
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#2E9A66]"><Check className="h-4 w-4 text-white" strokeWidth={3} /></span>
        <span className="text-[14.5px] font-extrabold text-[#1F6B4B]">Demande bien reçue{prenom ? `, merci ${prenom.trim()}` : ""}</span>
      </div>
      <h3 className="m-0 font-display text-[26px] font-medium text-brand-ink">{has ? "Votre première estimation" : "On s’occupe de votre estimation"}</h3>
      <div className="flex flex-wrap gap-1.5">
        {[type, surface && `${surface} m²`, pieces && `${pieces} pièces`, ville].filter(Boolean).map((t) => (
          <span key={t as string} className="inline-flex h-8 items-center rounded-full border border-brand-line bg-brand-pale px-3 text-[13.5px] font-bold text-brand-ink">{t}</span>
        ))}
      </div>
      {has && result?.estimate && (
        <div className="flex flex-col gap-2.5 rounded-[20px] bg-brand p-5 sm:px-7 sm:py-6">
          <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-soft">Première fourchette</span>
          <span className="font-display text-[30px] leading-tight text-white sm:text-[42px]">{eur(result.estimate.low)} – {eur(result.estimate.high)}</span>
          {result.price_per_sqm && <span className="text-[15px] text-brand-bt">soit environ {eur(result.price_per_sqm.low)} à {eur(result.price_per_sqm.high)} le m²</span>}
          <div className="relative mt-1.5 h-2.5 rounded-full bg-white/15">
            <span className="absolute inset-y-0 left-[22%] right-[26%] rounded-full bg-gradient-to-r from-brand-orange to-brand-orange-soft" />
            <span className="absolute left-[48%] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_3px_#E68B23]" />
          </div>
        </div>
      )}
      <p className="m-0 text-[15px] leading-relaxed text-brand-txt">
        {has
          ? `Cette fourchette s’appuie sur ${result?.sample_size ?? "plusieurs"} ventes récentes de biens comparables ${lieu}. Elle ne tient pas encore compte de l’étage, de l’état ou de l’exposition : c’est là qu’une visite fait la différence.`
          : "Pour ce bien, une fourchette automatique ne serait pas assez fiable. Un membre de l’équipe étudie votre demande et vous rappelle avec une estimation sérieuse."}
      </p>
      <div className="flex items-start gap-3.5 rounded-2xl border border-brand-line bg-brand-pale p-4">
        <TeamStack photo={alexandre} size={42} />
        <span className="flex flex-col gap-1">
          <span className="text-[15.5px] font-extrabold text-brand-ink">Un membre de l’équipe vous rappelle sous 24 h</span>
          <span className="text-[14.5px] leading-normal text-brand-txt">Pour affiner ce prix et, si vous le souhaitez, venir voir le bien : l’avis de valeur sur place est gratuit.</span>
        </span>
      </div>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Btn onClick={onContact} iconLeft={<CalendarDays className="h-[18px] w-[18px]" />} icon={<ArrowRight className="h-[18px] w-[18px]" />}>Choisir un rendez-vous</Btn>
        <Btn href={TEL_HREF} variant="outline" iconLeft={<Phone className="h-[18px] w-[18px]" />}>{TEL}</Btn>
      </div>
    </div>
  );
}
