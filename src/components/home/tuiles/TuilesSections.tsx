/* ═══ Accueil « Tuiles » : les sections sous les biens ═══════════════════════
   Discrétion · Ce que nous faisons pour vous · Comment ça se passe · Nos secteurs · Avis · Appel final. */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, BadgeCheck, CalendarDays, Camera, Check, EyeOff, FileText, Home, KeyRound, LineChart, Lock, MessageSquare, Phone, Handshake, Search, ShieldCheck, Star, UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { TEL, TEL_HREF } from "@/components/site/ui";
import { AVIS, AVIS_GOOGLE_URL } from "@/data/avis";
import { useIsMobile } from "@/hooks/use-mobile";
import { CARTE_H, CARTE_W, ETIQUETTES, HDS_AUTRES, HDS_SECTEURS, PARIS_AUTRES, PARIS_SECTEURS, SEINE } from "@/data/secteursCarte";
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
    <section id="services" className="relative mt-[72px] overflow-hidden bg-brand text-white md:mt-24">
      <span aria-hidden className="absolute -left-[140px] -top-[160px] h-[420px] w-[420px] rounded-full border-[60px] border-white/[0.04]" />
      <span aria-hidden className="absolute -bottom-[180px] -right-[120px] h-[460px] w-[460px] rounded-full border-[64px] border-white/[0.04]" />
      <div className={cn(W, "relative pb-14 pt-14 md:pb-[88px] md:pt-[88px]")}>
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[780px]">
            <span className="mb-[18px] inline-flex items-center gap-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-soft">
              <span aria-hidden className="block h-[1.5px] w-8 bg-brand-orange" /> Nos services
            </span>
            <h2 className={cn(H2, "text-white")}>Ce que nous faisons pour vous</h2>
            <p className={cn(SUB, "text-brand-bt")}>Un seul interlocuteur, qui connaît votre dossier, du premier rendez-vous à la remise des clés.</p>
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
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-[14px] bg-brand text-brand-orange">{c.icon}</span>
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
            const carte = "group flex flex-col rounded-[28px] bg-white p-3 text-left shadow-[0_40px_70px_-40px_rgba(8,20,40,0.8)] transition-transform duration-300 hover:-translate-y-1 md:rounded-[30px]";
            return c.to ? (
              <Link key={c.t} to={c.to} className={carte}>{contenu}</Link>
            ) : (
              <button key={c.t} type="button" onClick={() => openEstimation()} className={carte}>{contenu}</button>
            );
          })}
        </div>
        <Link to="/acheter#espace" className="relative mt-3.5 flex flex-col items-start gap-4 overflow-hidden rounded-[26px] bg-white/[0.08] p-6 text-white ring-1 ring-white/15 transition hover:bg-white/[0.12] md:mt-5 md:flex-row md:items-center md:gap-6 md:rounded-[28px] md:px-7 md:py-6">
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
        <p className="relative m-0 mt-4 text-[12.5px] text-brand-bt">* Dans le cadre d’un mandat de recherche.</p>
      </div>
    </section>
  );
};

/* ── Comment ça se passe : une ligne qui avance d’étape en étape ── */
const ETAPES = {
  vends: {
    label: "Je vends",
    icon: <Home className="h-4 w-4" />,
    steps: [
      { icon: LineChart, t: "Estimation offerte", d: "Nous visitons votre bien et vous remettons un avis de valeur clair, appuyé sur les ventes du quartier." },
      { icon: Camera, t: "Mise en valeur", d: "Photos soignées, visite virtuelle, annonce travaillée : votre bien se montre sous son meilleur jour." },
      { icon: MessageSquare, t: "Visites et offres", d: "Des visites avec des acquéreurs sérieux, un compte rendu après chacune, et la négociation à vos côtés." },
      { icon: KeyRound, t: "Jusqu’aux clés", d: "Compromis, suivi avec le notaire, remise des clés : nous restons là jusqu’au bout." },
    ],
  },
  achete: {
    label: "J’achète",
    icon: <KeyRound className="h-4 w-4" />,
    steps: [
      { icon: UserRound, t: "Votre projet", d: "Budget, quartiers, critères : nous faisons le point ensemble, sans rien laisser au hasard." },
      { icon: Search, t: "La recherche", d: "Nous cherchons pour vous, y compris parmi des biens qui ne sont pas en ligne, grâce à notre réseau." },
      { icon: FileText, t: "Visites et dossier", d: "Nous visitons, étudions le dossier et la copropriété, et vous disons franchement ce que nous en pensons." },
      { icon: Handshake, t: "Négociation et signature", d: "Nous négocions à vos côtés, puis vous accompagnons jusqu’à la signature chez le notaire." },
    ],
  },
};
type Parcours = keyof typeof ETAPES;

export const Etapes = () => {
  const reduit = useReducedMotion();
  const [tab, setTab] = useState<Parcours>("vends");
  const [actif, setActif] = useState(0);
  const [pause, setPause] = useState(false);
  const steps = ETAPES[tab].steps;

  /* La ligne avance seule d’une étape à l’autre ; elle s’arrête quand on survole ou qu’on choisit une étape. */
  useEffect(() => {
    if (reduit || pause) return;
    const t = window.setInterval(() => setActif((a) => (a + 1) % 4), 2800);
    return () => window.clearInterval(t);
  }, [reduit, pause, tab]);

  const changer = (k: Parcours) => {
    if (k === tab) return;
    setTab(k);
    setActif(0);
  };
  const choisir = (i: number) => {
    setActif(i);
    setPause(true);
  };

  return (
    <section id="etapes" className={cn(W, "pt-[72px] md:pt-24")}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className={H2}>Comment ça se passe</h2>
          <p className={SUB}>Quatre étapes, avec un seul interlocuteur du début à la fin.</p>
        </div>
        <div role="tablist" aria-label="Votre projet" className="relative flex w-full gap-1 rounded-[18px] bg-brand-surf p-1 md:w-auto">
          {(Object.keys(ETAPES) as Parcours[]).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tab === k}
              onClick={() => changer(k)}
              className={cn("relative inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[14px] px-5 text-[14.5px] font-bold transition-colors duration-300 md:flex-none", tab === k ? "text-white" : "text-brand-mut hover:text-brand-ink")}
            >
              {tab === k && <motion.span layoutId="etapes-onglet" className="absolute inset-0 rounded-[14px] bg-brand" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className="relative inline-flex items-center gap-2">{ETAPES[k].icon}{ETAPES[k].label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-8 md:mt-12" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
        {/* La ligne : grise, et sa partie déjà parcourue en orange */}
        <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[38px] hidden h-[3px] rounded-full bg-[#E3E9F1] md:block" />
        <motion.span
          aria-hidden
          className="absolute left-[12.5%] top-[38px] hidden h-[3px] rounded-full bg-brand-orange md:block"
          animate={{ width: `${(actif / 3) * 75}%` }}
          transition={{ duration: reduit ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.ol
            key={tab}
            className="relative m-0 grid list-none grid-cols-1 gap-7 p-0 md:grid-cols-4 md:gap-6"
            initial="cache"
            animate="vu"
            exit="parti"
            variants={{ cache: {}, vu: { transition: { staggerChildren: 0.08 } }, parti: { transition: { staggerChildren: 0.04 } } }}
          >
            {steps.map((st, i) => {
              const Icon = st.icon;
              const fait = i < actif;
              const ici = i === actif;
              return (
                <motion.li
                  key={st.t}
                  variants={{ cache: { opacity: 0, y: 16 }, vu: { opacity: 1, y: 0 }, parti: { opacity: 0, y: -10 } }}
                  transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                  className="relative flex flex-row items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
                >
                  {i < steps.length - 1 && (
                    <span aria-hidden className={cn("absolute -bottom-7 left-[28.5px] top-[66px] w-[3px] rounded-full transition-colors duration-700 md:hidden", i < actif ? "bg-brand-orange" : "bg-[#E3E9F1]")} />
                  )}
                  <button
                    type="button"
                    onClick={() => choisir(i)}
                    aria-label={`Étape ${i + 1} : ${st.t}`}
                    aria-current={ici ? "step" : undefined}
                    className={cn(
                      "relative grid h-[60px] w-[60px] flex-none place-items-center rounded-full transition-all duration-500 md:mb-5 md:h-[78px] md:w-[78px]",
                      ici ? "scale-110 bg-brand text-white shadow-[0_0_0_8px_rgba(34,73,125,0.12),0_18px_36px_-16px_rgba(34,73,125,0.8)]"
                        : fait ? "bg-brand-sky text-brand" : "bg-white text-brand-mut shadow-[0_0_0_1.5px_#DCE3EC]",
                    )}
                  >
                    <Icon className="h-6 w-6 md:h-7 md:w-7" />
                    <span className={cn("absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full text-[11.5px] font-extrabold transition-colors duration-500 md:h-7 md:w-7 md:text-[12.5px]", ici || fait ? "bg-brand-orange text-brand-ink" : "bg-brand-surf text-brand-mut")}>
                      {fait ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                    </span>
                  </button>
                  <span className={cn("flex flex-col rounded-[22px] transition-all duration-500 md:px-4 md:py-4", ici ? "md:bg-brand-sky" : "")}>
                    <span className={cn("mb-1.5 mt-2 text-xl font-extrabold tracking-[-0.02em] transition-colors duration-500 md:mt-0", ici ? "text-brand" : "text-brand-ink")}>{st.t}</span>
                    <span className="max-w-[260px] text-[15px] font-medium leading-[1.58] text-brand-mut max-md:max-w-none md:mx-auto">{st.d}</span>
                  </span>
                </motion.li>
              );
            })}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ── Nos secteurs : la carte de Paris et des Hauts-de-Seine ── */
const PARIS_PREF = [
  ["Paris 6e", "/achat-appartement-paris-6"],
  ["Paris 7e", "/achat-appartement-paris-7"],
  ["Paris 15e", "/achat-appartement-paris-15"],
  ["Paris 16e", "/achat-appartement-paris-16"],
  ["Paris 17e", "/achat-appartement-paris-17"],
];
const HDS = [
  ["Boulogne-Billancourt", "/achat-appartement-boulogne-billancourt"],
  ["Issy-les-Moulineaux", "/achat-appartement-issy-les-moulineaux"],
  ["Neuilly-sur-Seine", "/achat-appartement-neuilly-sur-seine"],
  ["Levallois-Perret", "/achat-appartement-levallois-perret"],
  ["Saint-Cloud", "/achat-appartement-saint-cloud"],
  ["Garches", "/achat-appartement-garches"],
  ["Clamart", "/achat-appartement-clamart"],
];
const COURT: Record<string, string> = {
  "Boulogne-Billancourt": "Boulogne", "Issy-les-Moulineaux": "Issy", "Neuilly-sur-Seine": "Neuilly", "Levallois-Perret": "Levallois",
  "Saint-Cloud": "Saint-Cloud", Garches: "Garches", Clamart: "Clamart",
};
const DECALE: Record<string, [number, number]> = { "7e": [-1.2, -2.2], "6e": [1, 1], "15e": [-0.5, 1.2], "16e": [-2, 0], "Boulogne-Billancourt": [0.8, 0], "Issy-les-Moulineaux": [1.5, -1], Garches: [-4.5, -1.5], "Saint-Cloud": [-3, 6] };
const DECALE_MOBILE: Record<string, [number, number]> = { "Saint-Cloud": [-5.5, 8.5], "Boulogne-Billancourt": [3, -2], Garches: [-5.5, -2] };

const Carte = () => {
  const petit = useIsMobile();
  return (
    <div className="relative w-full overflow-hidden rounded-[24px] bg-brand-sky" style={{ aspectRatio: `${CARTE_W} / ${CARTE_H}` }}>
      <svg viewBox={`0 0 ${CARTE_W} ${CARTE_H}`} role="img" aria-label="Carte de nos secteurs à Paris et dans les Hauts-de-Seine" className="absolute inset-0 block h-full w-full">
        <path d={HDS_AUTRES} fill="#F7F9FC" stroke="#D6DFEA" strokeWidth={1.4} />
        <path d={PARIS_AUTRES} fill="#FFFFFF" stroke="#D6DFEA" strokeWidth={1.2} />
        {Object.entries(HDS_SECTEURS).map(([k, d]) => <path key={k} d={d} className="secteur-zone" fill="#F9DDB7" stroke="#E68B23" strokeWidth={1.6} />)}
        {Object.entries(PARIS_SECTEURS).map(([k, d]) => <path key={k} d={d} className="secteur-zone secteur-paris" fill="#22497D" stroke="#1B3D6B" strokeWidth={1.4} />)}
        <path d={SEINE} fill="none" stroke="#8EBBE5" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" opacity={0.95} />
      </svg>
      {Object.entries(ETIQUETTES).map(([k, [x, y]]) => {
        const [dx, dy] = (petit && DECALE_MOBILE[k]) || DECALE[k] || [0, 0];
        const paris = /^\d+e$/.test(k);
        return (
          <span
            key={k}
            className={cn(
              "pointer-events-none absolute z-[2] inline-flex -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-full font-extrabold shadow-[0_6px_14px_-8px_rgba(19,36,61,0.6)]",
              petit ? "h-[18px] px-[7px] text-[9.5px]" : "h-[26px] px-2.5 text-[12.5px]",
              paris ? "bg-white text-brand" : "bg-white text-brand-ink ring-1 ring-brand-orange/70",
            )}
            style={{ left: `${x + dx}%`, top: `${y + dy}%` }}
          >
            {paris ? k : COURT[k] || k}
          </span>
        );
      })}
      <span className="pointer-events-none absolute left-[86%] top-[33%] -translate-x-1/2 -translate-y-1/2 text-xs font-extrabold tracking-[0.3em] text-brand/45">PARIS</span>
      <span className="pointer-events-none absolute left-[22%] top-[82%] -translate-x-1/2 -translate-y-1/2 text-center text-[11px] font-extrabold leading-relaxed tracking-[0.24em] text-brand/40">HAUTS-<br />DE-SEINE</span>
    </div>
  );
};

export const Secteurs = () => {
  const { openContact } = useSiteModals();
  return (
    <section id="secteurs" className="mt-[72px] bg-brand-surf md:mt-24">
      <div className={cn(W, "grid grid-cols-1 items-center gap-x-16 gap-y-8 py-14 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:py-[88px]")}>
        <div className="flex min-w-0 flex-col gap-6">
          <div>
            <span className="mb-[18px] inline-flex items-center gap-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">
              <span aria-hidden className="block h-[1.5px] w-8 bg-brand-orange" /> Nos secteurs
            </span>
            <h2 className={H2}>Tout Paris, et l’Ouest parisien par cœur</h2>
            <p className={SUB}>
              Nous intervenons partout à Paris et dans les Hauts-de-Seine. Nos quartiers de prédilection, nous les connaissons rue par rue : leurs prix, leurs copropriétés, leurs écoles et leurs transports.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand">Paris</span>
            <div className="flex flex-wrap gap-2">
              {PARIS_PREF.map(([n, to]) => (
                <Link key={n} to={to} className="inline-flex h-11 items-center rounded-[14px] bg-brand px-4 text-[14.5px] font-bold text-white transition hover:-translate-y-px">{n}</Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-orange-text">Hauts-de-Seine</span>
            <div className="flex flex-wrap gap-2">
              {HDS.map(([n, to]) => (
                <Link key={n} to={to} className="inline-flex h-11 items-center rounded-[14px] bg-white px-4 text-[14.5px] font-bold text-brand-ink ring-1 ring-brand-orange/60 transition hover:-translate-y-px hover:bg-[#FFF4E6]">{n}</Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 rounded-[24px] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex flex-col">
              <b className="text-[17px] font-extrabold text-brand-ink">Votre ville n’y est pas ?</b>
              <span className="text-[14.5px] font-medium text-brand-mut">Ailleurs à Paris, en Île-de-France ou plus loin : parlons-en.</span>
            </span>
            <button type="button" onClick={() => openContact({ objet: "Autre", message: "Bonjour, mon projet se situe à : " })} className={cn(BTN, "h-12 flex-none bg-brand-orange text-brand-ink")}>
              Nous contacter <ArrowRight className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
        <div className="min-w-0">
          <div className="rounded-[32px] bg-white p-3 shadow-[0_40px_80px_-50px_rgba(19,36,61,0.6)]">
            <Carte />
            <div className="flex flex-wrap gap-x-5 gap-y-2 px-2 pb-1 pt-3.5 text-[13px] font-semibold text-brand-mut">
              <span className="inline-flex items-center gap-2"><span className="h-4 w-4 rounded-[5px] bg-brand" />Paris, nos quartiers de prédilection</span>
              <span className="inline-flex items-center gap-2"><span className="h-4 w-4 rounded-[5px] bg-[#F9DDB7] ring-1 ring-brand-orange" />Hauts-de-Seine, nos villes de prédilection</span>
              <span className="inline-flex items-center gap-2"><span className="h-4 w-4 rounded-[5px] bg-white ring-1 ring-[#D6DFEA]" />Nous y intervenons aussi</span>
            </div>
          </div>
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
      <div className="relative flex flex-col items-stretch justify-between gap-10 overflow-hidden rounded-[32px] bg-brand px-[26px] py-10 text-white md:flex-row md:items-center md:rounded-[40px] md:p-16">
        <span aria-hidden className="absolute -bottom-40 -left-[90px] h-[360px] w-[360px] rounded-full border-[50px] border-white/5" />
        <span aria-hidden className="absolute -right-10 -top-10 h-[120px] w-[120px] rounded-full bg-brand-orange/90 md:right-[300px] md:-top-[60px] md:h-40 md:w-40" />
        <div className="relative z-[1]">
          <h2 className="m-0 text-[36px] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[52px]">Un projet ? Parlons-en.</h2>
          <p className="m-0 mt-3 text-[17px] text-brand-bt">Un premier échange suffit pour faire le point, sans engagement.</p>
        </div>
        <div className="relative z-[1] flex flex-col gap-3 md:flex-row">
          <button type="button" onClick={() => openEstimation()} className={cn(BTN, "bg-brand-orange text-brand-ink")}>Estimer mon bien <ArrowRight className="h-[18px] w-[18px]" /></button>
          <a href={TEL_HREF} className={cn(BTN, "bg-white text-brand-ink")}><Phone className="h-[17px] w-[17px]" /> {TEL}</a>
        </div>
      </div>
    </section>
  );
};
