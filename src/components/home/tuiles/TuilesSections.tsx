/* ═══ Accueil « Tuiles » : les sections sous les biens ═══════════════════════
   Discrétion · Ce que nous faisons pour vous · Comment ça se passe · Nos secteurs · Avis · Appel final. */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BadgeCheck, CalendarDays, ChartLine, Check, EyeOff, FileText, Home, KeyRound, LineChart, Lock, MapPin, MessageSquare, Phone, Handshake, Search, ShieldCheck, Sparkles, Star, UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { TEL, TEL_HREF } from "@/components/site/ui";
import { AVIS, AVIS_GOOGLE_URL } from "@/data/avis";
import salon from "@/assets/refonte/salon-haussmannien.webp";
import facade from "@/assets/refonte/paris-facade-eiffel.webp";
import toits from "@/assets/refonte/paris-toits.webp";
import rue from "@/assets/refonte/paris-rue-eiffel.webp";

const W = "mx-auto w-full max-w-[1320px] px-4 md:px-10";
const H2 = "m-0 text-[36px] font-extrabold leading-[1.04] tracking-[-0.035em] text-brand-ink md:text-[52px]";
const SUB = "m-0 mt-3 text-[15.5px] font-medium leading-relaxed text-brand-mut md:text-[17px]";
const BTN = "inline-flex h-[52px] items-center justify-center gap-2.5 whitespace-nowrap rounded-2xl px-6 text-[15px] font-bold transition hover:-translate-y-px";

/* ── Vendez votre bien en toute discrétion ── */
const POINTS = [
  { icon: <EyeOff className="h-4 w-4" />, t: "Aucune annonce sur les portails" },
  { icon: <ShieldCheck className="h-4 w-4" />, t: "Des acquéreurs vérifiés, financement compris" },
  { icon: <CalendarDays className="h-4 w-4" />, t: "Des visites sur rendez-vous, à vos conditions" },
];

export const Discretion = () => {
  const { openContact } = useSiteModals();
  return (
    <section id="discretion" className={cn(W, "pt-[72px] md:pt-24")}>
      <div className="relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[32px] bg-brand-sky px-[22px] pb-12 pt-8 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:rounded-[40px] md:p-[60px]">
        <span aria-hidden className="absolute -bottom-40 -left-[120px] h-[380px] w-[380px] rounded-full border-[54px] border-brand/[0.05]" />
        <div className="relative z-[1]">
          <span className="mb-6 grid h-[60px] w-[60px] place-items-center rounded-[20px] bg-brand text-white"><Lock className="h-[26px] w-[26px]" /></span>
          <h2 className="m-0 mb-4 text-[34px] font-extrabold leading-[1.04] tracking-[-0.035em] text-brand-ink md:text-[50px]">Vendez votre bien en toute discrétion.</h2>
          <p className="m-0 mb-[26px] max-w-[540px] text-base font-medium leading-[1.62] text-brand-mut md:text-[17px]">
            Pas d’annonce en ligne, pas de photos publiques : nous présentons votre bien uniquement à des acquéreurs que nous connaissons, dont le financement est vérifié.
          </p>
          <ul className="m-0 mb-[30px] flex list-none flex-col gap-3 p-0">
            {POINTS.map((p) => (
              <li key={p.t} className="flex items-center gap-3 text-[15.5px] font-semibold text-brand-ink">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-white text-brand">{p.icon}</span>
                {p.t}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={() => openContact({ objet: "Vendre", message: "Bonjour, je souhaite vendre mon bien en toute discrétion, sans annonce en ligne." })} className={cn(BTN, "bg-brand text-white")}>
              En parler en toute discrétion <ArrowRight className="h-[18px] w-[18px]" />
            </button>
            <a href={TEL_HREF} className={cn(BTN, "bg-white text-brand-ink")}><Phone className="h-[17px] w-[17px]" /> {TEL}</a>
          </div>
        </div>
        {/* La photo, bien visible, et les pastilles qui flottent */}
        <div className="relative mx-1 md:mx-0">
          <figure className="relative z-[1] m-0 mx-auto w-full max-w-[480px] -rotate-2 rounded-[32px] bg-white p-3.5 shadow-[0_40px_70px_-40px_rgba(19,36,61,0.55)]">
            <div className="relative h-[230px] overflow-hidden rounded-[22px] md:h-[320px]">
              <img src={salon} alt="Salon d’un appartement haussmannien" loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute left-3 top-3 inline-flex h-[26px] items-center rounded-full bg-[rgba(19,36,61,0.55)] px-2.5 text-[11.5px] font-bold text-white">Photo d’illustration</span>
              <span className="absolute bottom-3.5 left-1/2 inline-flex h-11 -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-white/85 px-[18px] text-[14.5px] font-extrabold text-brand-ink shadow-[0_10px_24px_-12px_rgba(19,36,61,0.5)] backdrop-blur-md">
                <Lock className="h-4 w-4" /> Visible sur rendez-vous
              </span>
            </div>
            <figcaption className="flex items-center justify-between gap-2.5 px-2 pb-1.5 pt-4">
              <span className="flex flex-col">
                <b className="text-[17px] font-extrabold text-brand-ink">Appartement familial</b>
                <span className="text-[13.5px] font-semibold text-brand-mut">Présenté à des acquéreurs vérifiés</span>
              </span>
              <span className="inline-flex h-[22px] items-center rounded-full bg-brand-surf px-2.5 text-[11px] font-extrabold uppercase tracking-[0.05em] text-brand">Exemple</span>
            </figcaption>
          </figure>
          <span className="anim-float absolute -right-1.5 -top-[18px] z-[2] inline-flex h-11 items-center gap-2.5 rounded-full bg-white pl-1.5 pr-4 text-[13.5px] font-bold text-brand-ink shadow-[0_18px_36px_-18px_rgba(19,36,61,0.55)] md:right-[-4px] md:top-11 md:h-[50px] md:text-[14.5px]">
            <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-brand-orl text-brand-orange-text md:h-[34px] md:w-[34px]"><EyeOff className="h-4 w-4" /></span>
            Aucune annonce en ligne
          </span>
          <span className="anim-float absolute -left-1.5 top-[96px] z-[2] inline-flex h-11 items-center gap-2.5 rounded-full bg-white pl-1.5 pr-4 text-[13.5px] font-bold text-brand-ink shadow-[0_18px_36px_-18px_rgba(19,36,61,0.55)] [animation-delay:1.4s] md:-left-4 md:top-[150px] md:h-[50px] md:text-[14.5px]">
            <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#E6F4EC] text-[#2E7D5B] md:h-[34px] md:w-[34px]"><ShieldCheck className="h-4 w-4" /></span>
            Acquéreur vérifié
          </span>
        </div>
      </div>
    </section>
  );
};

/* ── Ce que nous faisons pour vous (même esprit que la discrétion : bloc bleu clair, cartes encadrées) ── */
const SERVICES = [
  {
    to: "/vendre", icon: <Home className="h-[22px] w-[22px]" />, t: "Vendre", photo: facade, pastille: "Un point chaque semaine",
    d: "Une vente préparée, suivie et expliquée, de l’estimation à la remise des clés.",
    pts: ["Photos soignées et visite virtuelle", "Annonce sur les portails et réseau hors marché", "Un compte rendu après chaque visite"],
    cta: "Vendre avec Emilio", btn: "bg-brand text-white",
  },
  {
    to: "/acheter", icon: <KeyRound className="h-[22px] w-[22px]" />, t: "Acheter", photo: toits, pastille: "Biens hors marché",
    d: "Nous cherchons pour vous et restons de votre côté, jusqu’à la signature.*",
    pts: ["Des biens qui ne sont pas en ligne", "Étude du dossier et de la copropriété", "Négociation à vos côtés"],
    cta: "Confier ma recherche", btn: "bg-brand-ink text-white",
  },
  {
    to: "", icon: <LineChart className="h-[22px] w-[22px]" />, t: "Estimer", photo: rue, pastille: "Gratuit et sans engagement",
    d: "Le juste prix de votre bien, avant de décider quoi que ce soit.",
    pts: ["Une visite sur place", "Les ventes récentes du quartier", "Un avis de valeur clair et détaillé"],
    cta: "Estimer mon bien", btn: "bg-brand-orange text-brand-ink",
  },
];

export const Services = () => {
  const { openEstimation } = useSiteModals();
  return (
    <section id="services" className={cn(W, "pt-[72px] md:pt-24")}>
      <div className="relative overflow-hidden rounded-[32px] bg-brand-sky px-[18px] pb-[22px] pt-8 md:rounded-[40px] md:px-[52px] md:pb-[52px] md:pt-[56px]">
        <span aria-hidden className="absolute -right-[120px] -top-[150px] h-[380px] w-[380px] rounded-full border-[54px] border-brand/[0.05]" />
        <div className="relative flex flex-wrap items-end justify-between gap-6 px-1 md:px-0">
          <div className="max-w-[780px]">
            <span className="mb-6 grid h-[60px] w-[60px] place-items-center rounded-[20px] bg-brand text-white"><Handshake className="h-[26px] w-[26px]" /></span>
            <h2 className={H2}>Ce que nous faisons pour vous</h2>
            <p className={SUB}>Un seul interlocuteur, qui connaît votre dossier, du premier rendez-vous à la remise des clés.</p>
          </div>
          <span className="anim-float inline-flex h-[50px] items-center gap-2.5 rounded-full bg-white pl-1.5 pr-[18px] text-[14.5px] font-bold text-brand-ink shadow-[0_18px_36px_-18px_rgba(19,36,61,0.55)]">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#E6F4EC] text-[#2E7D5B]"><BadgeCheck className="h-4 w-4" /></span>
            200+ clients accompagnés
          </span>
        </div>
        <div className="relative mt-7 grid grid-cols-1 gap-3.5 md:mt-10 md:grid-cols-3 md:gap-5">
          {SERVICES.map((c) => {
            const contenu = (
              <>
                <span className="relative block h-[160px] overflow-hidden rounded-[22px] md:h-[170px]">
                  <img src={c.photo} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]" />
                  <span className="absolute bottom-3 left-3 inline-flex h-9 items-center gap-2 rounded-full bg-white/90 px-3.5 text-[13px] font-bold text-brand-ink backdrop-blur-md">
                    <Check className="h-3.5 w-3.5 text-brand" strokeWidth={3} /> {c.pastille}
                  </span>
                </span>
                <span className="flex flex-1 flex-col px-2.5 pb-2 pt-5 md:px-3">
                  <span className="flex items-center gap-3">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-[14px] bg-brand-sky text-brand">{c.icon}</span>
                    <span className="text-[26px] font-extrabold tracking-[-0.035em] text-brand-ink">{c.t}</span>
                  </span>
                  <span className="mt-3 text-[15px] font-medium leading-relaxed text-brand-mut">{c.d}</span>
                  <span className="mb-6 mt-4 flex flex-col gap-2.5">
                    {c.pts.map((pt) => (
                      <span key={pt} className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-snug text-brand-ink">
                        <span className="mt-px grid h-5 w-5 flex-none place-items-center rounded-full bg-brand text-white"><Check className="h-3 w-3" strokeWidth={3.2} /></span>
                        {pt}
                      </span>
                    ))}
                  </span>
                  <span className={cn(BTN, "mt-auto w-full", c.btn)}>{c.cta} <ArrowRight className="h-[18px] w-[18px]" /></span>
                </span>
              </>
            );
            const carte = "group flex flex-col rounded-[28px] bg-white p-3 text-left shadow-[0_30px_60px_-44px_rgba(19,36,61,0.6)] transition-transform duration-300 hover:-translate-y-1 md:rounded-[30px]";
            return c.to ? (
              <Link key={c.t} to={c.to} className={carte}>{contenu}</Link>
            ) : (
              <button key={c.t} type="button" onClick={() => openEstimation()} className={carte}>{contenu}</button>
            );
          })}
        </div>
        <Link to="/acheter#espace" className="relative mt-3.5 flex flex-col items-start gap-4 overflow-hidden rounded-[26px] bg-brand p-6 text-white transition hover:brightness-110 md:mt-5 md:flex-row md:items-center md:gap-6 md:rounded-[28px] md:px-7 md:py-6">
          <span aria-hidden className="absolute -bottom-16 -right-12 h-36 w-36 rounded-full bg-brand-orange/90 md:-right-14 md:-top-20 md:bottom-auto md:h-40 md:w-40" />
          <span className="relative grid h-[54px] w-[54px] flex-none place-items-center rounded-[18px] bg-white/[0.12]"><UserRound className="h-6 w-6" /></span>
          <span className="relative flex min-w-0 flex-1 flex-col">
            <b className="text-[19px] font-extrabold tracking-[-0.02em]">Votre espace client</b>
            <span className="mt-0.5 text-[15px] font-medium text-white/80">Visites, comptes rendus, offres, documents : tout votre projet au même endroit.</span>
          </span>
          <span className="relative flex flex-wrap gap-2 md:flex-nowrap">
            {[[<CalendarDays key="a" className="h-[15px] w-[15px]" />, "Visites"], [<MessageSquare key="b" className="h-[15px] w-[15px]" />, "Comptes rendus"], [<FileText key="c" className="h-[15px] w-[15px]" />, "Documents"]].map(([i, t]) => (
              <span key={t as string} className="inline-flex h-[38px] items-center gap-1.5 rounded-xl bg-white/[0.12] px-3 text-[13.5px] font-bold">{i}{t}</span>
            ))}
          </span>
          <span className="relative hidden h-11 w-11 flex-none place-items-center rounded-full bg-white text-brand-ink md:grid"><ArrowRight className="h-5 w-5" /></span>
        </Link>
        <p className="relative m-0 mt-4 px-1 text-[12.5px] text-brand-mut">* Dans le cadre d’un mandat de recherche.</p>
      </div>
    </section>
  );
};

/* ── Comment ça se passe : la vague ── */
const ETAPES = {
  vends: {
    label: "Je vends",
    icon: <Home className="h-4 w-4" />,
    steps: [
      { icon: <ChartLine className="h-[30px] w-[30px]" />, t: "Estimation offerte", d: "Nous visitons votre bien et vous remettons un avis de valeur clair, appuyé sur les ventes du quartier." },
      { icon: <Sparkles className="h-[30px] w-[30px]" />, t: "Mise en valeur", d: "Photos soignées, visite virtuelle, annonce travaillée : votre bien se montre sous son meilleur jour." },
      { icon: <MessageSquare className="h-[30px] w-[30px]" />, t: "Visites et offres", d: "Des visites avec des acquéreurs sérieux, un compte rendu après chacune, et la négociation à vos côtés." },
      { icon: <KeyRound className="h-[30px] w-[30px]" />, t: "Jusqu’aux clés", d: "Compromis, suivi avec le notaire, remise des clés : nous restons là jusqu’au bout." },
    ],
  },
  achete: {
    label: "J’achète",
    icon: <KeyRound className="h-4 w-4" />,
    steps: [
      { icon: <UserRound className="h-[30px] w-[30px]" />, t: "Votre projet", d: "Budget, quartiers, critères : nous faisons le point ensemble, sans rien laisser au hasard." },
      { icon: <Search className="h-[30px] w-[30px]" />, t: "La recherche", d: "Nous cherchons pour vous, y compris parmi des biens qui ne sont pas en ligne, grâce à notre réseau." },
      { icon: <FileText className="h-[30px] w-[30px]" />, t: "Visites et dossier", d: "Nous visitons, étudions le dossier et la copropriété, et vous disons franchement ce que nous en pensons." },
      { icon: <KeyRound className="h-[30px] w-[30px]" />, t: "Négociation et signature", d: "Nous négocions à vos côtés, puis vous accompagnons jusqu’à la signature chez le notaire." },
    ],
  },
};

export const Etapes = () => {
  const [tab, setTab] = useState<keyof typeof ETAPES>("vends");
  const steps = ETAPES[tab].steps;
  return (
    <section id="etapes" className={cn(W, "pt-[72px] md:pt-24")}>
      <div className="rounded-[32px] bg-brand-sky px-[18px] pb-[26px] pt-[30px] md:rounded-[40px] md:px-[52px] md:pb-11 md:pt-[52px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className={H2}>Comment ça se passe</h2>
            <p className={SUB}>Quatre étapes, avec un seul interlocuteur du début à la fin.</p>
          </div>
          <div role="tablist" aria-label="Votre projet" className="flex w-full gap-1 rounded-[18px] bg-white p-1 md:w-auto">
            {(Object.keys(ETAPES) as (keyof typeof ETAPES)[]).map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={cn("inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[14px] px-5 text-[14.5px] font-bold transition md:flex-none", tab === k ? "bg-brand text-white" : "text-brand-mut hover:text-brand-ink")}
              >
                <span className="hidden md:inline">{ETAPES[k].icon}</span>
                {ETAPES[k].label}
              </button>
            ))}
          </div>
        </div>
        <ol key={tab} className="fx-fade relative m-0 mt-[26px] grid list-none grid-cols-1 gap-[18px] p-0 md:mt-10 md:grid-cols-4 md:gap-6">
          <svg aria-hidden viewBox="0 0 1000 150" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 hidden h-[150px] w-full md:block">
            <path d="M117 50 C 240 50, 250 114, 372 114 S 505 50, 628 50 S 760 114, 883 114" fill="none" stroke="#9FB6D6" strokeWidth={2.5} strokeDasharray="7 9" vectorEffect="non-scaling-stroke" />
          </svg>
          {steps.map((s, i) => (
            <li key={s.t} className={cn("relative flex flex-row items-start gap-4 text-left md:flex-col md:items-center md:gap-0 md:text-center", i % 2 === 0 ? "md:pt-2" : "md:pt-[72px]")}>
              <span className="relative grid h-[60px] w-[60px] flex-none place-items-center rounded-full bg-white text-brand shadow-[0_18px_36px_-20px_rgba(19,36,61,0.45)] md:mb-5 md:h-[84px] md:w-[84px]">
                <span className="scale-[0.8] md:scale-100">{s.icon}</span>
                <span className={cn("absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full text-[11.5px] font-extrabold md:h-[30px] md:w-[30px] md:text-[13px]", i === steps.length - 1 ? "bg-brand-orange text-brand-ink" : "bg-brand-ink text-white")}>{i + 1}</span>
              </span>
              <span className="flex flex-col">
                <span className="mb-2 mt-1.5 text-xl font-extrabold tracking-[-0.02em] text-brand-ink md:mt-0">{s.t}</span>
                <span className="max-w-[250px] text-[15px] font-medium leading-[1.58] text-brand-mut max-md:max-w-none md:mx-auto">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ── Nos secteurs : tout Paris, tout le 92, et l’Île-de-France sur demande ── */
const SPEC_PARIS: Record<number, string> = { 6: "/achat-appartement-paris-6", 7: "/achat-appartement-paris-7", 15: "/achat-appartement-paris-15", 16: "/achat-appartement-paris-16", 17: "/achat-appartement-paris-17" };
const HDS = [
  ["Boulogne-Billancourt", "/achat-appartement-boulogne-billancourt"],
  ["Issy-les-Moulineaux", "/achat-appartement-issy-les-moulineaux"],
  ["Neuilly-sur-Seine", "/achat-appartement-neuilly-sur-seine"],
  ["Levallois-Perret", "/achat-appartement-levallois-perret"],
  ["Saint-Cloud", "/achat-appartement-saint-cloud"],
  ["Garches", "/achat-appartement-garches"],
  ["Clamart", "/achat-appartement-clamart"],
];
const HDS_AUSSI = ["Meudon", "Sèvres", "Vanves", "Montrouge", "Malakoff", "Suresnes", "Rueil-Malmaison", "Puteaux", "Courbevoie", "Asnières-sur-Seine"];
const arr = (n: number) => (n === 1 ? "1er" : `${n}e`);
const versBiens = (v: string) => `/biens?ville=${encodeURIComponent(v)}`;

const Legende = () => (
  <span className="mt-auto flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] font-semibold text-brand-mut">
    <span className="inline-flex items-center gap-2"><span className="h-3.5 w-3.5 rounded-full bg-brand" />Nos quartiers de prédilection</span>
    <span className="inline-flex items-center gap-2"><span className="h-3.5 w-3.5 rounded-full border-[1.5px] border-[#C5D3E5] bg-white" />Nous y intervenons aussi</span>
  </span>
);

export const Secteurs = () => {
  const { openContact } = useSiteModals();
  return (
    <section id="secteurs" className={cn(W, "pt-[72px] md:pt-24")}>
      <h2 className={H2}>Nos secteurs</h2>
      <p className={cn(SUB, "max-w-[860px]")}>
        Partout dans Paris et dans les Hauts-de-Seine, et ailleurs en Île-de-France sur demande. Nos quartiers de prédilection, nous les connaissons par cœur : leurs prix, leurs copropriétés, leurs écoles et leurs transports.
      </p>
      <div className="mt-[26px] grid grid-cols-1 gap-3.5 md:mt-10 md:grid-cols-2 md:gap-5">
        <div className="flex flex-col gap-5 rounded-[28px] bg-brand-sky p-[22px] md:rounded-[32px] md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="m-0 flex items-center gap-3 text-[26px] font-extrabold tracking-[-0.03em] text-brand-ink">
              <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-white text-brand"><MapPin className="h-5 w-5" /></span> Paris
            </h3>
            <span className="inline-flex h-8 items-center rounded-full bg-white px-3 text-[13px] font-bold text-brand">Les 20 arrondissements</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 md:gap-2">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => {
              const spec = SPEC_PARIS[n];
              return (
                <Link
                  key={n}
                  to={spec || versBiens(`Paris ${arr(n)}`)}
                  aria-label={`Paris ${arr(n)}`}
                  className={cn(
                    "grid h-11 place-items-center rounded-[14px] text-[14.5px] font-extrabold transition hover:-translate-y-px md:h-[54px] md:text-[15.5px]",
                    spec ? "bg-brand text-white shadow-[0_8px_18px_-10px_rgba(34,73,125,0.8)]" : "bg-white text-brand-ink hover:bg-brand-surf",
                  )}
                >
                  {arr(n)}
                </Link>
              );
            })}
          </div>
          <Legende />
        </div>
        <div className="flex flex-col gap-5 rounded-[28px] bg-brand-surf p-[22px] md:rounded-[32px] md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="m-0 flex items-center gap-3 text-[26px] font-extrabold tracking-[-0.03em] text-brand-ink">
              <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-white text-brand"><Home className="h-5 w-5" /></span> Hauts-de-Seine
            </h3>
            <span className="inline-flex h-8 items-center rounded-full bg-white px-3 text-[13px] font-bold text-brand">Tout le département</span>
          </div>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {HDS.map(([n, to]) => (
              <Link key={n} to={to} className="inline-flex h-11 items-center rounded-[14px] bg-brand px-3.5 text-[14px] font-bold text-white shadow-[0_8px_18px_-10px_rgba(34,73,125,0.8)] transition hover:-translate-y-px md:h-12 md:px-4 md:text-[14.5px]">
                {n}
              </Link>
            ))}
            {HDS_AUSSI.map((n) => (
              <Link key={n} to={versBiens(n)} className="inline-flex h-11 items-center rounded-[14px] bg-white px-3.5 text-[14px] font-semibold text-brand-ink transition hover:bg-brand-sky md:h-12 md:px-4 md:text-[14.5px]">
                {n}
              </Link>
            ))}
            <span className="inline-flex h-11 items-center px-1 text-[13.5px] font-semibold text-brand-mut md:h-12">et les autres communes du 92</span>
          </div>
          <Legende />
        </div>
      </div>
      <div className="relative mt-3.5 flex flex-col items-start gap-5 overflow-hidden rounded-[28px] bg-brand-ink p-6 text-white md:mt-5 md:flex-row md:items-center md:justify-between md:rounded-[32px] md:px-9 md:py-8">
        <span aria-hidden className="absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-brand-orange md:-top-24 md:bottom-auto md:right-[22%]" />
        <span aria-hidden className="absolute -left-16 -top-24 h-56 w-56 rounded-full border-[40px] border-white/5" />
        <span className="relative flex flex-col gap-1.5">
          <b className="text-[24px] font-extrabold tracking-[-0.03em] md:text-[28px]">Ailleurs en Île-de-France, ou plus loin ?</b>
          <span className="text-[15.5px] font-medium text-white/80">Yvelines, Val-de-Marne, Essonne… Dites-nous où se trouve votre projet, nous vous répondons vite.</span>
        </span>
        <button type="button" onClick={() => openContact({ objet: "Autre", message: "Bonjour, mon projet se situe à : " })} className={cn(BTN, "relative bg-brand-orange text-brand-ink")}>
          Parlons-en <ArrowRight className="h-[18px] w-[18px]" />
        </button>
      </div>
    </section>
  );
};

/* ── Avis (vrais avis Google) ── */
export const Avis = () => (
  <section id="avis" className={cn(W, "pt-[72px] md:pt-24")}>
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <h2 className={H2}>Ils nous ont fait confiance</h2>
        <p className={SUB}>Les avis de nos clients, tels qu’ils les ont laissés sur Google.</p>
      </div>
      <a href={AVIS_GOOGLE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2.5 rounded-full border-[1.5px] border-[#E2E8F0] bg-white px-[18px] text-sm font-bold text-brand-ink transition hover:border-brand-ink/40">
        <Etoiles size={15} /> Lire tous les avis sur Google <ArrowRight className="h-4 w-4" />
      </a>
    </div>
    <div className="no-scrollbar -mx-4 mt-[26px] flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1.5 md:mx-0 md:mt-9 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:p-0">
      {AVIS.map((a) => (
        <article key={a.nom} className="flex w-[300px] flex-none snap-start flex-col gap-[18px] rounded-[26px] border-[1.5px] border-[#E2E8F0] bg-white p-6 md:w-auto md:rounded-[30px] md:p-[30px]">
          <div className="flex items-center justify-between">
            <Etoiles size={17} />
            <span className="inline-flex h-[26px] items-center rounded-full bg-brand-surf px-2.5 text-xs font-bold text-brand-mut">Avis Google</span>
          </div>
          <p className="m-0 text-base font-medium leading-[1.62] text-[#33445B]">« {a.texte} »</p>
          <div className="mt-auto flex items-center gap-3 border-t border-[#E2E8F0] pt-4">
            <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-brand-sky font-extrabold text-brand">{a.nom[0]}</span>
            <span className="flex flex-col">
              <b className="text-[15px] font-extrabold text-brand-ink">{a.nom}</b>
              <span className="text-[13.5px] font-semibold text-brand-mut">{a.projet}</span>
            </span>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const Etoiles = ({ size }: { size: number }) => (
  <span className="inline-flex gap-0.5" aria-label="5 étoiles sur 5">
    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="fill-[#F4B400] text-[#F4B400]" style={{ width: size, height: size }} />)}
  </span>
);

/* ── Appel final ── */
export const AppelFinal = () => {
  const { openEstimation } = useSiteModals();
  return (
    <section className={cn(W, "pt-[72px] md:pt-24")}>
      <div className="relative flex flex-col items-stretch justify-between gap-10 overflow-hidden rounded-[32px] bg-brand-ink px-[26px] py-10 text-white md:flex-row md:items-center md:rounded-[40px] md:p-16">
        <span aria-hidden className="absolute -bottom-40 -left-[90px] h-[360px] w-[360px] rounded-full border-[50px] border-white/5" />
        <span aria-hidden className="absolute -right-10 -top-10 h-[120px] w-[120px] rounded-full bg-brand-orange/90 md:right-[300px] md:-top-[60px] md:h-40 md:w-40" />
        <div className="relative z-[1]">
          <h2 className="m-0 text-[36px] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[52px]">Un projet ? Parlons-en.</h2>
          <p className="m-0 mt-3 text-[17px] text-white/75">Un premier échange suffit pour faire le point, sans engagement.</p>
        </div>
        <div className="relative z-[1] flex flex-col gap-3 md:flex-row">
          <button type="button" onClick={() => openEstimation()} className={cn(BTN, "bg-brand-orange text-brand-ink")}>Estimer mon bien <ArrowRight className="h-[18px] w-[18px]" /></button>
          <a href={TEL_HREF} className={cn(BTN, "bg-white text-brand-ink")}><Phone className="h-[17px] w-[17px]" /> {TEL}</a>
        </div>
      </div>
    </section>
  );
};
