/* ═══ Accueil « Tuiles » : les sections sous les biens ═══════════════════════
   Discrétion · Ce que nous faisons pour vous · Comment ça se passe · Nos secteurs · Avis · Appel final. */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CalendarDays, ChartLine, EyeOff, FileText, Home, KeyRound, LineChart, Lock, MapPin, MessageSquare, Phone, Search, ShieldCheck, Sparkles, Star, UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { TEL, TEL_HREF } from "@/components/site/ui";
import { AVIS, AVIS_GOOGLE_URL } from "@/data/avis";
import salon from "@/assets/refonte/salon-haussmannien.webp";

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

/* ── Ce que nous faisons pour vous ── */
export const Services = () => {
  const { openEstimation } = useSiteModals();
  const tuile = "relative flex min-h-0 flex-col overflow-hidden rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-[3px] md:min-h-[330px] md:rounded-[32px] md:p-[34px]";
  const rond = "absolute -right-[50px] -top-[50px] h-40 w-40 rounded-full border-[26px]";
  const suite = (label: string, rondCls: string) => (
    <span className="mt-auto inline-flex items-center gap-3 pt-6 text-[15px] font-extrabold">
      <span className={cn("grid h-[46px] w-[46px] place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-1", rondCls)}><ArrowRight className="h-[18px] w-[18px]" /></span>
      {label}
    </span>
  );
  return (
    <section id="services" className={cn(W, "pt-[72px] md:pt-24")}>
      <h2 className={H2}>Ce que nous faisons pour vous</h2>
      <div className="mt-[26px] grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-3 md:gap-5">
        <Link to="/vendre" className={cn(tuile, "group bg-brand text-white")}>
          <span aria-hidden className={cn(rond, "border-white/10")} />
          <span className="grid h-[58px] w-[58px] place-items-center rounded-[18px] bg-white/[0.12]"><Home className="h-[26px] w-[26px]" /></span>
          <span className="mb-2.5 mt-[18px] text-[26px] font-extrabold tracking-[-0.035em] md:mt-[22px] md:text-[30px]">Vendre</span>
          <span className="text-[15.5px] font-medium leading-relaxed text-white/80">Estimation, mise en valeur, visites, négociation, notaire : nous préparons votre vente et la suivons jusqu’aux clés.</span>
          {suite("Vendre avec Emilio", "bg-white text-brand-ink")}
        </Link>
        <Link to="/acheter" className={cn(tuile, "group bg-brand-orl text-brand-ink")}>
          <span aria-hidden className={cn(rond, "border-white/55")} />
          <span className="grid h-[58px] w-[58px] place-items-center rounded-[18px] bg-white text-brand-orange-text"><KeyRound className="h-[26px] w-[26px]" /></span>
          <span className="mb-2.5 mt-[18px] text-[26px] font-extrabold tracking-[-0.035em] md:mt-[22px] md:text-[30px]">Acheter</span>
          <span className="text-[15.5px] font-medium leading-relaxed text-[#5E4A33]">Nous cherchons pour vous, y compris parmi des biens qui ne sont pas en ligne, et négocions à vos côtés.*</span>
          {suite("Confier ma recherche", "bg-brand-ink text-white")}
        </Link>
        <button type="button" onClick={() => openEstimation()} className={cn(tuile, "group bg-brand-sky text-left text-brand-ink")}>
          <span aria-hidden className={cn(rond, "border-white/55")} />
          <span className="grid h-[58px] w-[58px] place-items-center rounded-[18px] bg-white text-brand"><LineChart className="h-[26px] w-[26px]" /></span>
          <span className="mb-2.5 mt-[18px] text-[26px] font-extrabold tracking-[-0.035em] md:mt-[22px] md:text-[30px]">Estimer</span>
          <span className="text-[15.5px] font-medium leading-relaxed text-brand-mut">Une visite sur place, les ventes récentes du quartier et un avis de valeur clair. Gratuit et sans engagement.</span>
          {suite("Estimer mon bien", "bg-brand text-white")}
        </button>
      </div>
      <Link to="/acheter#espace" className="mt-3 flex flex-col items-start gap-3.5 rounded-[28px] border-[1.5px] border-[#E2E8F0] p-6 transition hover:border-brand/40 md:mt-5 md:flex-row md:items-center md:gap-6 md:rounded-[30px] md:px-[26px] md:py-[22px]">
        <span className="grid h-[58px] w-[58px] flex-none place-items-center rounded-[18px] bg-brand-surf text-brand"><UserRound className="h-[26px] w-[26px]" /></span>
        <span className="flex flex-col">
          <b className="text-[19px] font-extrabold tracking-[-0.02em] text-brand-ink">Votre espace client</b>
          <span className="mt-0.5 text-[15px] font-medium text-brand-mut">Visites, comptes rendus, offres, documents : tout votre projet au même endroit.</span>
        </span>
        <span className="flex flex-wrap gap-2 md:ml-auto">
          {[[<CalendarDays key="a" className="h-[15px] w-[15px]" />, "Visites"], [<MessageSquare key="b" className="h-[15px] w-[15px]" />, "Comptes rendus"], [<FileText key="c" className="h-[15px] w-[15px]" />, "Documents"]].map(([i, t]) => (
            <span key={t as string} className="inline-flex h-[38px] items-center gap-1.5 rounded-xl bg-brand-surf px-3 text-[13.5px] font-bold text-[#33445B]">{i}{t}</span>
          ))}
        </span>
        <ArrowRight className="hidden h-5 w-5 flex-none text-brand md:block" />
      </Link>
      <p className="m-0 mt-4 text-[12.5px] text-brand-mut">* Dans le cadre d’un mandat de recherche.</p>
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

/* ── Nos secteurs ── */
const PARIS = [
  ["Paris 6e", "/achat-appartement-paris-6"],
  ["Paris 7e", "/achat-appartement-paris-7"],
  ["Paris 15e", "/achat-appartement-paris-15"],
  ["Paris 16e", "/achat-appartement-paris-16"],
  ["Paris 17e", "/achat-appartement-paris-17"],
];
const SPEC = new Set([6, 7, 15, 16, 17]);
const HDS = [
  ["Boulogne-Billancourt", "/achat-appartement-boulogne-billancourt"],
  ["Issy-les-Moulineaux", "/achat-appartement-issy-les-moulineaux"],
  ["Neuilly-sur-Seine", "/achat-appartement-neuilly-sur-seine"],
  ["Levallois-Perret", "/achat-appartement-levallois-perret"],
  ["Saint-Cloud", "/achat-appartement-saint-cloud"],
  ["Garches", "/achat-appartement-garches"],
  ["Clamart", "/achat-appartement-clamart"],
];

const Ligne = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="group flex min-h-[54px] items-center justify-between gap-2.5 border-b border-brand-ink/[0.08] text-[15.5px] font-bold text-brand-ink">
    {children}
    <ArrowRight className="h-4 w-4 opacity-45 transition group-hover:translate-x-[3px] group-hover:opacity-100" />
  </Link>
);

export const Secteurs = () => {
  const { openContact } = useSiteModals();
  return (
    <section id="secteurs" className={cn(W, "pt-[72px] md:pt-24")}>
      <h2 className={H2}>Nos secteurs</h2>
      <p className={cn(SUB, "max-w-[780px]")}>
        Présents dans tout Paris, spécialistes de l’Ouest parisien et des Hauts-de-Seine. Nos quartiers de prédilection, nous les connaissons par cœur : leurs prix, leurs copropriétés, leurs écoles et leurs transports.
      </p>
      <div className="mt-[26px] grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-[1fr_1.45fr_0.85fr] md:gap-5">
        <div className="rounded-[28px] bg-brand-sky p-6 md:rounded-[32px] md:p-[30px]">
          <h3 className="m-0 mb-1 flex items-center gap-3 text-2xl font-extrabold tracking-[-0.03em] text-brand-ink">
            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-white text-brand"><MapPin className="h-5 w-5" /></span> Paris
          </h3>
          <p className="m-0 mb-1 mt-3 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-orange-text">Nos quartiers de prédilection</p>
          <div className="flex flex-col">{PARIS.map(([n, to]) => <Ligne key={n} to={to}>{n}</Ligne>)}</div>
          <p className="m-0 mb-2.5 mt-5 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-mut">Et tout Paris, avec le même soin</p>
          <div aria-hidden className="grid grid-cols-10 gap-1">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <span key={n} className={cn("grid aspect-square place-items-center rounded-full text-[11px] font-extrabold", SPEC.has(n) ? "bg-brand text-white" : "bg-white text-brand-mut")}>{n}</span>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] bg-brand-surf p-6 md:rounded-[32px] md:p-[30px]">
          <h3 className="m-0 mb-4 flex items-center gap-3 text-2xl font-extrabold tracking-[-0.03em] text-brand-ink">
            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-white text-brand"><Home className="h-5 w-5" /></span> Hauts-de-Seine
          </h3>
          <div className="grid grid-cols-1 gap-x-[22px] sm:grid-cols-2">{HDS.map(([n, to]) => <Ligne key={n} to={to}>{n}</Ligne>)}</div>
        </div>
        <div className="relative flex min-h-[220px] flex-col overflow-hidden rounded-[28px] bg-brand-ink p-6 text-white md:rounded-[32px] md:p-[30px]">
          <span aria-hidden className="absolute -bottom-[60px] -right-[50px] h-[170px] w-[170px] rounded-full bg-brand-orange" />
          <h3 className="m-0 mb-2.5 text-[26px] font-extrabold tracking-[-0.03em]">Et ailleurs ?</h3>
          <p className="relative z-[1] m-0 mb-6 text-[15px] font-medium leading-[1.55] text-white/80">Ailleurs à Paris, en Île-de-France ou au-delà : votre projet nous intéresse aussi.</p>
          <button type="button" onClick={() => openContact({ objet: "Autre", message: "Bonjour, mon projet se situe à : " })} className={cn(BTN, "relative z-[1] mt-auto self-start bg-brand-orange text-brand-ink")}>
            Parlons-en <ArrowRight className="h-[18px] w-[18px]" />
          </button>
        </div>
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
