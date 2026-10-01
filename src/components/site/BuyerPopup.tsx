/* ═══ Fenêtre « Un espace rien que pour votre recherche » ═══════════════════════
   Présente aux visiteurs l’espace client, le nouvel outil de l’agence pour ses acheteurs.
   Le téléphone raconte, en boucle, les quatre atouts : l’alerte, la sélection, l’avis, la visite.
   Les règles :
   · sur toutes les pages sauf /acheter ;
   · 5 s après l’arrivée (20 s sur la fiche d’un bien, avec un autre titre) ;
   · une seule fois par visiteur, puis plus rien pendant 30 jours ;
   · jamais par-dessus une autre fenêtre, un menu ouvert ou un champ en cours de saisie ;
   · ordinateur : fenêtre au centre ; téléphone : panneau qui monte du bas.
   Pour la revoir : ajouter ?apercu=fenetre à l’adresse. */
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useAnimationControls, useDragControls, useReducedMotion } from "framer-motion";
import { ArrowRight, Bell, CalendarDays, Heart, Lock, Sparkles, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { PhoneScreen } from "@/components/site/PhoneScreen";
import { Souligne } from "@/components/site/ui";
import bien1 from "@/assets/refonte/espace-bien-1.webp";
import bien2 from "@/assets/refonte/espace-bien-2.webp";

const CLE = "emilio-fenetre-acheteurs";
const TRENTE_JOURS = 30 * 24 * 60 * 60 * 1000;
const PHOTOS = [bien1, bien2];
const DUREE_ETAPE = 3400;
let vueCetteVisite = false; // au cas où le navigateur refuse le stockage

const dejaVue = () => {
  if (vueCetteVisite) return true;
  try {
    const t = Number(window.localStorage.getItem(CLE) || 0);
    return t > 0 && Date.now() - t < TRENTE_JOURS;
  } catch {
    return false;
  }
};
const marquerVue = () => {
  vueCetteVisite = true;
  try {
    window.localStorage.setItem(CLE, String(Date.now()));
  } catch {
    /* stockage indisponible : on s’en tient à cette visite */
  }
};
/** Le visiteur est occupé : autre fenêtre, menu ouvert, saisie en cours, onglet en arrière-plan. */
const occupe = () => {
  if (document.hidden) return true;
  if (document.querySelector('[role="dialog"], [role="listbox"], header [aria-expanded="true"]')) return true;
  const a = document.activeElement as HTMLElement | null;
  return !!a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.tagName === "SELECT" || a.isContentEditable);
};
const suivre = (action: string) => window.gtag?.("event", "fenetre_acheteurs", { action });

type Variante = "general" | "bien";

/* ── Les quatre atouts, dans l’ordre où le téléphone les montre ── */
const ATOUTS = [
  {
    icon: Bell, t: "Prévenu en premier", d: "Une alerte dès qu’un bien arrive.",
    bulle: { t: "Un nouveau bien pour vous", d: "Boulogne · à l’instant", fond: "#FDEBD3", encre: "#A95808" },
  },
  {
    icon: Star, t: "Une sélection privée", d: "Même des biens qui ne sont pas en ligne.",
    bulle: { t: "Hors marché", d: "Rien que pour vous", fond: "#E8EFF8", encre: "#22497D" },
  },
  {
    icon: Heart, t: "Votre avis en un clic", d: "« Ça me plaît », « Pas pour moi ».",
    bulle: { t: "Ça me plaît", d: "Noté, on affine", fond: "#DCFCE7", encre: "#15803D" },
  },
  {
    icon: CalendarDays, t: "La visite, en direct", d: "Le rendez-vous s’ajoute à votre agenda.",
    bulle: { t: "Visite confirmée", d: "Jeudi à 18 h 30", fond: "#EDE9FE", encre: "#6D28D9" },
  },
] as const;

/** L’étape montrée : avance toute seule (trois tours), s’arrête au survol ou quand on choisit un atout. */
const useEtape = (actif: boolean) => {
  const [etape, setEtape] = useState(0);
  const [pause, setPause] = useState(!actif);
  const vus = useRef(0);
  useEffect(() => {
    if (pause) return;
    const t = window.setTimeout(() => {
      vus.current += 1;
      if (vus.current >= ATOUTS.length * 3) setPause(true);
      setEtape((e) => (e + 1) % ATOUTS.length);
    }, DUREE_ETAPE);
    return () => window.clearTimeout(t);
  }, [etape, pause]);
  const choisir = (i: number) => {
    setPause(true);
    setEtape(i);
  };
  /** Toucher la scène : l’atout suivant, la lecture continue. */
  const suivant = () => setEtape((e) => (e + 1) % ATOUTS.length);
  return { etape, pause, setPause, choisir, suivant };
};

/* ── Le téléphone : il flotte, vibre à chaque alerte, et une notification tombe sur l’écran ── */
const Telephone = ({ echelle, etape, reduit }: { echelle: number; etape: number; reduit: boolean }) => {
  const vibre = useAnimationControls();
  useEffect(() => {
    if (etape === 0 && !reduit) vibre.start({ rotate: [0, -5, 5, -4, 4, -2, 0], transition: { duration: 0.65, delay: 0.25 } });
  }, [etape, reduit, vibre]);
  return (
    <div aria-hidden className="anim-phone relative" style={{ width: 300 * echelle, height: 630 * echelle }}>
      <motion.div animate={vibre} className="absolute inset-0">
        <div
          className="absolute left-0 top-0 h-[630px] w-[300px] origin-top-left rounded-[46px] bg-brand-ink p-[11px] shadow-[0_50px_80px_-30px_rgba(5,14,30,0.85),inset_0_0_0_2px_#34465f]"
          style={{ transform: `scale(${echelle})` }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[36px]">
            <PhoneScreen photos={PHOTOS} />
            <AnimatePresence>
              {etape === 0 && (
                <motion.div
                  key="notif"
                  className="absolute inset-x-2.5 top-[40px] z-[2] flex items-center gap-2.5 rounded-[18px] bg-white/95 p-2.5 shadow-[0_18px_30px_-14px_rgba(5,14,30,0.6)]"
                  initial={reduit ? { opacity: 0 } : { y: -110, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduit ? { opacity: 0 } : { y: -110, opacity: 0 }}
                  transition={{ type: "spring", damping: 22, stiffness: 260, delay: 0.1 }}
                >
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-[11px] bg-[#1a2332] text-lg font-extrabold text-white">E</span>
                  <span className="flex min-w-0 flex-1 flex-col leading-tight">
                    <span className="text-[11px] font-bold text-[#64748b]">EMILIO · maintenant</span>
                    <span className="text-[14.5px] font-extrabold text-[#1a2332]">Un nouveau bien pour vous</span>
                    <span className="text-[12px] text-[#64748b]">5 pièces · 112 m² · Boulogne</span>
                  </span>
                  <img src={PHOTOS[0]} alt="" className="h-10 w-12 flex-none rounded-lg object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="absolute left-1/2 top-[9px] z-[3] h-6 w-[90px] -translate-x-1/2 rounded-full bg-brand-ink" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/** La bulle de l’étape, qui surgit à côté du téléphone. */
const Bulle = ({ i, petit, reduit }: { i: number; petit?: boolean; reduit: boolean }) => {
  const a = ATOUTS[i];
  const Icon = a.icon;
  return (
    <motion.div
      aria-hidden
      className={cn("flex items-center gap-2.5 rounded-2xl bg-white shadow-[0_22px_40px_-16px_rgba(5,14,30,0.6),0_0_0_1px_rgba(19,36,61,0.05)]", petit ? "gap-2 py-1.5 pl-1.5 pr-2.5" : "py-2 pl-2 pr-3.5")}
      initial={reduit ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduit ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: -8, transition: { duration: 0.2 } }}
      transition={{ type: "spring", damping: 16, stiffness: 300, delay: 0.35 }}
    >
      <span className={cn("grid flex-none place-items-center rounded-[11px]", petit ? "h-8 w-8" : "h-[38px] w-[38px]")} style={{ background: a.bulle.fond, color: a.bulle.encre }}>
        <Icon className={petit ? "h-4 w-4" : "h-[18px] w-[18px]"} strokeWidth={2.4} />
      </span>
      <span className="flex flex-col whitespace-nowrap leading-tight">
        <span className={cn("font-extrabold text-brand-ink", petit ? "text-[12.5px]" : "text-[14px]")}>{a.bulle.t}</span>
        <span className={cn("font-semibold text-brand-mut", petit ? "text-[10.5px]" : "text-[12px]")}>{a.bulle.d}</span>
      </span>
    </motion.div>
  );
};

/** Le fond bleu : halo, cercles qui tournent doucement, petits points qui flottent. */
const FondBleu = ({ rond }: { rond: string }) => (
  <div aria-hidden className={cn("absolute inset-0 overflow-hidden bg-brand", rond)}>
    <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_60%)]" />
    <span className="absolute left-1/2 top-[46%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.13]" />
    <span className="anim-spin-60 absolute left-1/2 top-[46%] -ml-[280px] -mt-[280px] h-[560px] w-[560px] rounded-full border border-dashed border-white/[.12]" />
    <span className="anim-bob-a absolute left-[12%] top-[14%] h-2.5 w-2.5 rounded-full bg-brand-orange" />
    <span className="anim-bob-b absolute right-[12%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/60" />
    <span className="anim-bob-c absolute bottom-[16%] left-[18%] h-2 w-2 rounded-full bg-white/40" />
    <span className="anim-bob-a absolute bottom-[10%] right-[16%] h-2 w-2 rounded-full bg-brand-orange/70" />
  </div>
);

/** Les quatre atouts : celui que montre le téléphone s’allume, une barre file pendant qu’il est affiché. */
const Atouts = ({ etape, pause, choisir, compact }: { etape: number; pause: boolean; choisir: (i: number) => void; compact?: boolean }) => (
  <div className={cn("grid grid-cols-2", compact ? "gap-2" : "gap-2.5")}>
    {ATOUTS.map((a, i) => {
      const on = i === etape;
      const Icon = a.icon;
      return (
        <button
          key={a.t}
          type="button"
          onClick={() => choisir(i)}
          aria-pressed={on}
          className={cn(
            "relative flex items-start overflow-hidden text-left transition-colors duration-300",
            compact ? "gap-2 rounded-2xl px-2.5 pb-3.5 pt-2.5" : "gap-3 rounded-[18px] px-3 pb-4 pt-3",
            on ? "bg-brand-sky shadow-[inset_0_0_0_1.5px_#22497D]" : "bg-brand-surf hover:bg-[#EAEFF5]",
          )}
        >
          <span className={cn("grid flex-none place-items-center rounded-xl transition-colors duration-300", compact ? "h-8 w-8" : "h-[38px] w-[38px]", on ? "bg-brand text-white" : "bg-white text-brand")}>
            <Icon className={compact ? "h-4 w-4" : "h-[18px] w-[18px]"} />
          </span>
          <span className="flex min-w-0 flex-col leading-snug">
            <span className={cn("font-extrabold text-brand-ink", compact ? "text-[13px] leading-tight" : "text-[14.5px]")}>{a.t}</span>
            {!compact && <span className="mt-0.5 text-[12.5px] font-medium text-brand-mut">{a.d}</span>}
          </span>
          {on && (
            <span className="absolute inset-x-3 bottom-1.5 h-[3px] overflow-hidden rounded-full bg-white/80">
              <motion.span
                key={`${i}-${pause}`}
                className="block h-full rounded-full bg-brand-orange"
                initial={{ width: pause ? "100%" : "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: pause ? 0 : DUREE_ETAPE / 1000, ease: "linear" }}
              />
            </span>
          )}
        </button>
      );
    })}
  </div>
);

/** « Nouveau » : le premier mot qu’on lit. */
const Nouveau = ({ petit }: { petit?: boolean }) => (
  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-brand-orange font-extrabold text-brand-ink", petit ? "h-[26px] px-2.5 text-[12px]" : "h-[30px] px-3 text-[13px]")}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/80" />
        <span className="relative h-2 w-2 rounded-full bg-white" />
      </span>
      Nouveau
    </span>
    <span className={cn("font-bold text-brand-orange-text", petit ? "text-[12.5px]" : "text-[14px]")}>Un outil mis en place pour nos acheteurs</span>
  </div>
);

const Titre = ({ variante }: { variante: Variante }) => {
  const etoile = <sup className="ml-0.5 text-[0.5em] text-brand-orange">*</sup>;
  if (variante === "bien")
    return (
      <>
        <span className="mb-1 block text-[0.56em] tracking-[-0.02em] text-brand">Ce bien vous plaît ?</span>
        Recevez les prochains comme lui <Souligne>en premier</Souligne>
        {etoile}
      </>
    );
  return (
    <>
      Un espace rien que pour <Souligne>votre recherche</Souligne>
      {etoile}
    </>
  );
};

const TEXTE: Record<Variante, string> = {
  general: "Confiez-nous votre recherche : vous recevez un lien personnel vers votre espace. Les biens qu’on choisit pour vous y arrivent, sur téléphone comme sur ordinateur.",
  bien: "Confiez-nous votre recherche : les biens qui vous ressemblent arrivent dans votre espace, parfois avant même d’être en ligne.",
};
const RESERVE = "* Réservé aux acheteurs qui nous confient leur recherche (mandat de recherche)";

type Props = { variante: Variante; fermer: (a: string) => void; confier: () => void; decouvrir: () => void; estimer: () => void; reduit: boolean };

/** Tab reste dans la fenêtre ; le focus revient où il était à la fermeture. */
const useFocusDansFenetre = () => {
  const boite = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const avant = document.activeElement as HTMLElement | null;
    boite.current?.focus({ preventScroll: true });
    return () => avant?.focus?.({ preventScroll: true });
  }, []);
  const clavier = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !boite.current) return;
    const f = [...boite.current.querySelectorAll<HTMLElement>("button, a[href]")];
    if (!f.length) return;
    const [premier, dernier] = [f[0], f[f.length - 1]];
    if (e.shiftKey && (document.activeElement === premier || document.activeElement === boite.current)) {
      e.preventDefault();
      dernier.focus();
    } else if (!e.shiftKey && document.activeElement === dernier) {
      e.preventDefault();
      premier.focus();
    }
  };
  return { boite, clavier };
};

const Vendeurs = ({ estimer, petit }: { estimer: () => void; petit?: boolean }) =>
  petit ? (
    <div className="border-t border-[#F6E3C8] bg-[#FFF7EC] px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 text-[13px] leading-snug text-[#33445B]">
      <strong className="font-extrabold text-brand-ink">Vous vendez ?</strong> C’est comme ça qu’on chouchoute vos futurs acheteurs chez nous.{" "}
      <button type="button" onClick={estimer} className="inline whitespace-nowrap font-extrabold text-brand-orange-text">
        Estimer mon bien →
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-3.5 rounded-b-[32px] border-t border-[#F6E3C8] bg-[#FFF7EC] px-7 py-4">
      <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white text-brand-orange shadow-[0_4px_10px_-6px_rgba(184,98,11,0.5)]">
        <Heart className="h-4 w-4 fill-current" />
      </span>
      <p className="m-0 flex-1 text-[14px] leading-snug text-[#33445B]">
        <strong className="font-extrabold text-brand-ink">Vous vendez ?</strong> C’est comme ça qu’on chouchoute vos futurs acheteurs chez nous.
      </p>
      <button type="button" onClick={estimer} className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-xl px-2 py-2 text-[14.5px] font-extrabold text-brand-orange-text transition hover:bg-white">
        Estimer mon bien <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );

/* Où surgit la bulle de chaque étape, autour du téléphone (ordinateur / téléphone). */
const POS_ORDI = [
  { left: -40, top: 150 },
  { right: 12, top: 262 },
  { left: -30, top: 446 },
  { right: 12, top: 472 },
];
const POS_MOBILE = [
  { left: 6, top: "40%" },
  { right: 6, top: "52%" },
  { left: 6, top: "54%" },
  { right: 6, top: "31%" },
];

/* ── Ordinateur : la fenêtre au centre ── */
const Fenetre = ({ variante, fermer, confier, decouvrir, estimer, reduit }: Props) => {
  const { boite, clavier } = useFocusDansFenetre();
  const { etape, pause, choisir } = useEtape(!reduit);
  const [k, setK] = useState(1);
  const [h, setH] = useState(700);
  /* Écran peu haut (portable 13 pouces) : la fenêtre se réduit pour tenir en entier. */
  useEffect(() => {
    const mesurer = () => {
      const haut = boite.current?.offsetHeight || 700;
      setH(haut);
      setK(Math.max(0.7, Math.min(1, (window.innerHeight - 40) / haut)));
    };
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, [boite]);
  return (
    <motion.div className="fixed inset-0 z-[85] overflow-y-auto font-jakarta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
      <div className="absolute inset-0 bg-[rgba(19,36,61,0.58)] backdrop-blur-[3px]" onClick={() => fermer("fond")} />
      <div className="pointer-events-none relative flex min-h-full items-center justify-center px-8 py-5">
        <div className="w-full max-w-[1000px]" style={{ transform: k < 1 ? `scale(${k})` : undefined, marginBlock: k < 1 ? -Math.round(((1 - k) * h) / 2) : undefined }}>
          <motion.div
            ref={boite}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fenetre-acheteurs-titre"
            aria-describedby="fenetre-acheteurs-texte"
            tabIndex={-1}
            onKeyDown={clavier}
            className="pointer-events-auto relative w-full rounded-[32px] bg-white shadow-[0_60px_120px_-40px_rgba(5,14,30,0.7)] outline-none"
            initial={reduit ? false : { opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduit ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98, transition: { duration: 0.18 } }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
          >
            <div className="grid grid-cols-[400px_minmax(0,1fr)]">
              {/* Le panneau bleu et le téléphone qui raconte l’espace */}
              <div className="relative min-h-[600px]">
                <FondBleu rond="rounded-tl-[32px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div initial={reduit ? false : { y: 70, opacity: 0, rotate: -4 }} animate={{ y: 0, opacity: 1, rotate: 0 }} transition={{ delay: 0.15, type: "spring", damping: 18, stiffness: 140 }}>
                    <Telephone echelle={0.8} etape={etape} reduit={reduit} />
                  </motion.div>
                </div>
                <AnimatePresence mode="popLayout">
                  <div key={etape} className="absolute z-[2]" style={POS_ORDI[etape]}>
                    <Bulle i={etape} reduit={reduit} />
                  </div>
                </AnimatePresence>
              </div>
              {/* Le texte */}
              <div className="flex flex-col px-11 pb-7 pt-10">
                <Nouveau />
                <h2 id="fenetre-acheteurs-titre" className="m-0 mt-5 pr-8 text-[38px] font-extrabold leading-[1.08] tracking-[-0.03em] text-brand-ink">
                  <Titre variante={variante} />
                </h2>
                <p id="fenetre-acheteurs-texte" className="m-0 mt-4 text-[16px] font-medium leading-[1.55] text-[#33445B]">
                  {TEXTE[variante]}
                </p>
                <div className="mt-6">
                  <Atouts etape={etape} pause={pause} choisir={choisir} />
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={confier}
                    className="inline-flex h-14 items-center gap-2.5 rounded-[18px] bg-brand-orange px-7 text-[16px] font-bold text-brand-ink shadow-[0_16px_30px_-16px_rgba(230,139,35,0.9)] transition hover:brightness-105"
                  >
                    Confier ma recherche <ArrowRight className="h-[18px] w-[18px]" />
                  </button>
                  <button type="button" onClick={decouvrir} className="inline-flex h-14 items-center rounded-[18px] border border-[#D5DEEA] bg-white px-6 text-[15.5px] font-bold text-brand transition hover:border-brand">
                    Découvrir l’espace
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-[13px] font-medium text-brand-mut">
                    <Lock className="h-[15px] w-[15px]" /> Un lien personnel, sans mot de passe
                  </span>
                  <button type="button" onClick={() => fermer("plus_tard")} className="rounded-lg px-2 py-1 text-[14px] font-bold text-brand-mut transition hover:bg-brand-surf hover:text-brand-ink">
                    Plus tard
                  </button>
                </div>
                <p className="m-0 mt-2 text-[12px] font-medium text-brand-mut">{RESERVE}</p>
              </div>
            </div>
            <Vendeurs estimer={estimer} />
            <button
              type="button"
              onClick={() => fermer("croix")}
              aria-label="Fermer"
              className="absolute right-5 top-5 z-[4] grid h-11 w-11 place-items-center rounded-full bg-brand-surf text-brand-ink transition hover:bg-brand-sky"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.4} />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Téléphone : le panneau qui monte du bas. Le téléphone fait le spectacle, peu de texte.
   Comme une « story » : quatre traits en haut, on touche le bleu pour passer à la suite. ── */
const Panneau = ({ variante, fermer, confier, estimer, reduit }: Props) => {
  const { boite, clavier } = useFocusDansFenetre();
  const { etape, pause, suivant } = useEtape(!reduit);
  const glisser = useDragControls();
  const a = ATOUTS[etape];
  const Icon = a.icon;
  return (
    <motion.div className="fixed inset-0 z-[85] font-jakarta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
      <div className="absolute inset-0 bg-[rgba(19,36,61,0.5)]" onClick={() => fermer("fond")} />
      <motion.div
        ref={boite}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fenetre-acheteurs-titre"
        tabIndex={-1}
        onKeyDown={clavier}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[calc(100%-56px)] max-w-[560px] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-30px_60px_-30px_rgba(5,14,30,0.6)] outline-none"
        initial={reduit ? { opacity: 0 } : { y: "100%" }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduit ? { opacity: 0 } : { y: "100%", transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        drag={reduit ? false : "y"}
        dragListener={false}
        dragControls={glisser}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.04, bottom: 0.7 }}
        onDragEnd={(_, i) => (i.offset.y > 90 || i.velocity.y > 600) && fermer("glisse")}
      >
        <div className="flex-none touch-none pb-2 pt-2.5" onPointerDown={(e) => glisser.start(e)}>
          <span aria-hidden className="mx-auto block h-1 w-10 rounded-full bg-[#D5DEEA]" />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {/* La scène bleue : on la touche pour passer à l’atout suivant */}
          <div
            className="relative mx-3 h-[372px] touch-none select-none [@media(max-height:720px)]:h-[318px] [@media(max-height:660px)]:h-[266px]"
            onPointerDown={(e) => glisser.start(e)}
            onClick={suivant}
          >
            <FondBleu rond="rounded-[24px]" />
            {/* Les quatre traits, comme une story */}
            <div aria-hidden className="absolute inset-x-4 top-3.5 z-[3] flex gap-1.5">
              {ATOUTS.map((x, i) => (
                <span key={x.t} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
                  {i < etape && <span className="block h-full w-full bg-white" />}
                  {i === etape && (
                    <motion.span
                      key={`${etape}-${pause}`}
                      className="block h-full bg-white"
                      initial={{ width: pause ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: pause ? 0 : DUREE_ETAPE / 1000, ease: "linear" }}
                    />
                  )}
                </span>
              ))}
            </div>
            {/* Nouveau : le premier mot qu’on lit */}
            <div className="absolute left-4 right-12 top-[30px] z-[3] flex items-center gap-2">
              <span className="inline-flex h-[26px] flex-none items-center gap-1.5 rounded-full bg-brand-orange px-2.5 text-[12px] font-extrabold text-brand-ink">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/80" />
                  <span className="relative h-2 w-2 rounded-full bg-white" />
                </span>
                Nouvel outil
              </span>
              <span className="text-[12.5px] font-bold leading-tight text-white/90 max-[359px]:text-[11.5px]">pour nos acheteurs</span>
            </div>
            {/* Le téléphone, coupé en fondu vers le bas */}
            <div className="absolute inset-x-0 bottom-0 top-[70px] flex justify-center overflow-hidden rounded-b-[24px] [-webkit-mask-image:linear-gradient(180deg,#000_58%,transparent_92%)] [mask-image:linear-gradient(180deg,#000_58%,transparent_92%)]">
              <motion.div className="pt-1.5" initial={reduit ? false : { y: 260, rotate: 8 }} animate={{ y: 0, rotate: 0 }} transition={{ delay: 0.25, type: "spring", damping: 17, stiffness: 120 }}>
                <Telephone echelle={0.6} etape={etape} reduit={reduit} />
              </motion.div>
            </div>
            <AnimatePresence mode="popLayout">
              <div key={etape} className="absolute z-[2]" style={POS_MOBILE[etape]}>
                <Bulle i={etape} petit reduit={reduit} />
              </div>
            </AnimatePresence>
            <span aria-hidden className="absolute inset-x-0 bottom-0 z-[2] h-28 rounded-b-[24px] bg-gradient-to-t from-brand via-brand/80 to-transparent" />
            {/* L’atout en grand, qui change à chaque étape */}
            <div aria-live="polite" className="absolute inset-x-4 bottom-4 z-[3]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={etape}
                  className="flex items-center gap-3"
                  initial={reduit ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduit ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.22, 0.8, 0.24, 1] }}
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-[14px] bg-brand-orange text-brand-ink shadow-[0_10px_20px_-10px_rgba(230,139,35,0.9)]">
                    <Icon className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="text-[19px] font-extrabold tracking-[-0.02em] text-white">{a.t}</span>
                    <span className="mt-0.5 text-[13px] font-medium text-white/80">{a.d}</span>
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="px-[18px] pt-4">
            <h2 id="fenetre-acheteurs-titre" className="m-0 text-[24px] font-extrabold leading-[1.12] tracking-[-0.03em] text-brand-ink">
              <Titre variante={variante} />
            </h2>
            <div className="mt-3.5 flex items-center gap-1.5">
              <button type="button" onClick={confier} className="inline-flex h-[52px] min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-brand-orange px-3 text-[15.5px] font-bold text-brand-ink shadow-[0_14px_26px_-16px_rgba(230,139,35,0.9)]">
                Confier ma recherche <ArrowRight className="h-4 w-4 flex-none max-[349px]:hidden" />
              </button>
              <button type="button" onClick={() => fermer("plus_tard")} className="inline-flex h-[52px] flex-none items-center rounded-2xl px-3.5 text-[14.5px] font-bold text-brand-mut">
                Plus tard
              </button>
            </div>
            <p className="m-0 mb-2.5 mt-2 text-center text-[10.5px] font-medium leading-snug text-brand-mut">{RESERVE}</p>
          </div>
          <Vendeurs estimer={estimer} petit />
        </div>
        <button
          type="button"
          onClick={() => fermer("croix")}
          aria-label="Fermer"
          className="absolute right-[22px] top-[40px] z-[5] grid h-9 w-9 place-items-center rounded-full bg-white/[.16] text-white"
        >
          <X className="h-[17px] w-[17px]" strokeWidth={2.4} />
        </button>
      </motion.div>
    </motion.div>
  );
};

const BuyerPopup = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { openEstimation } = useSiteModals();
  const reduit = !!useReducedMotion();
  const [ouvert, setOuvert] = useState(false);
  const [variante, setVariante] = useState<Variante>("general");
  const [ordi, setOrdi] = useState(true);

  /* Le minuteur : relancé à chaque page, coupé sur /acheter. */
  useEffect(() => {
    if (ouvert) return;
    const apercu = new URLSearchParams(search).get("apercu") === "fenetre";
    if (!apercu && (pathname.startsWith("/acheter") || dejaVue())) return;
    const surBien = /^\/biens\/[^/]+/.test(pathname);
    const delai = apercu ? 800 : surBien ? 20000 : 5000;
    let t = 0;
    const essayer = () => {
      if (occupe()) {
        t = window.setTimeout(essayer, 2000);
        return;
      }
      if (!apercu) marquerVue();
      setVariante(surBien ? "bien" : "general");
      setOrdi(window.matchMedia("(min-width: 900px)").matches);
      setOuvert(true);
      suivre("vue");
    };
    /* Les deux photos du téléphone, chargées juste avant */
    const pre = window.setTimeout(() => PHOTOS.forEach((p) => (new Image().src = p)), Math.max(0, delai - 1500));
    t = window.setTimeout(essayer, delai);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(pre);
    };
  }, [pathname, search, ouvert]);

  /* Une nouvelle page referme la fenêtre */
  useEffect(() => setOuvert(false), [pathname]);

  const fermer = useCallback((action: string) => {
    setOuvert(false);
    suivre(action);
  }, []);

  /* Échap ferme ; la page derrière ne défile plus. */
  useEffect(() => {
    if (!ouvert) return;
    const echap = (e: KeyboardEvent) => e.key === "Escape" && fermer("echap");
    document.addEventListener("keydown", echap);
    const b = document.body;
    const [o, p] = [b.style.overflow, b.style.paddingRight];
    const barre = window.innerWidth - document.documentElement.clientWidth;
    b.style.overflow = "hidden";
    if (barre > 0) b.style.paddingRight = `${barre}px`;
    return () => {
      document.removeEventListener("keydown", echap);
      b.style.overflow = o;
      b.style.paddingRight = p;
    };
  }, [ouvert, fermer]);

  const confier = () => {
    fermer("confier");
    navigate("/acheter#recherche");
  };
  const decouvrir = () => {
    fermer("decouvrir");
    navigate("/acheter#espace");
  };
  const estimer = () => {
    fermer("estimer");
    openEstimation();
  };

  const props = { variante, fermer, confier, decouvrir, estimer, reduit };
  return <AnimatePresence>{ouvert && (ordi ? <Fenetre key="o" {...props} /> : <Panneau key="t" {...props} />)}</AnimatePresence>;
};

export default BuyerPopup;
