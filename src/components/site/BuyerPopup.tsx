/* ═══ Fenêtre « Vos futurs biens, dans votre poche » ═════════════════════════
   Présente l’espace client acheteur aux visiteurs.
   Les règles :
   · sur toutes les pages sauf /acheter ;
   · 5 s après l’arrivée (20 s sur la fiche d’un bien, avec un autre titre) ;
   · une seule fois par visiteur, puis plus rien pendant 30 jours ;
   · jamais par-dessus une autre fenêtre, un menu ouvert ou un champ en cours de saisie ;
   · ordinateur : fenêtre au centre ; téléphone : petite carte en bas, la page reste utilisable.
   Pour la revoir : ajouter ?apercu=fenetre à l’adresse. */
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bell, Heart, MessageCircle, Sparkles, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { PhoneScreen } from "@/components/site/PhoneScreen";
import bien1 from "@/assets/refonte/espace-bien-1.webp";
import bien2 from "@/assets/refonte/espace-bien-2.webp";

const CLE = "emilio-fenetre-acheteurs";
const TRENTE_JOURS = 30 * 24 * 60 * 60 * 1000;
const PHOTOS = [bien1, bien2];
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

/* ── Le téléphone, réduit ── */
const Telephone = ({ echelle }: { echelle: number }) => (
  <div aria-hidden className="relative" style={{ width: 300 * echelle, height: 630 * echelle }}>
    <div
      className="absolute left-0 top-0 h-[630px] w-[300px] origin-top-left rounded-[46px] bg-brand-ink p-[11px] shadow-[0_40px_70px_-30px_rgba(5,14,30,0.8),inset_0_0_0_2px_#34465f]"
      style={{ transform: `scale(${echelle})` }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[36px]">
        <PhoneScreen photos={PHOTOS} />
        <span className="absolute left-1/2 top-[9px] h-6 w-[90px] -translate-x-1/2 rounded-full bg-brand-ink" />
      </div>
    </div>
  </div>
);

/** Le bandeau bleu derrière le téléphone : halo et cercles. */
const FondBleu = ({ rond }: { rond: string }) => (
  <div aria-hidden className={cn("absolute inset-0 overflow-hidden bg-brand", rond)}>
    <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_58%)]" />
    <span className="absolute left-1/2 top-full h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.12]" />
    <span className="absolute left-1/2 top-full h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[.10]" />
    <span className="absolute left-[9%] top-[22%] h-2 w-2 rounded-full bg-brand-orange/80" />
    <span className="absolute right-[8%] top-[64%] h-1.5 w-1.5 rounded-full bg-white/50" />
  </div>
);

/** La bulle « un nouveau bien » qui apparaît et disparaît près du téléphone. */
const Notif = ({ petit }: { petit?: boolean }) => (
  <div aria-hidden className={cn("anim-notif flex items-center gap-2.5 rounded-2xl bg-white shadow-[0_20px_36px_-16px_rgba(5,14,30,0.55),0_0_0_1px_rgba(19,36,61,0.06)]", petit ? "py-1.5 pl-1.5 pr-3" : "py-2 pl-2 pr-3.5")}>
    <span className={cn("grid flex-none place-items-center rounded-[10px] bg-brand-orl text-brand-orange-text", petit ? "h-7 w-7" : "h-9 w-9")}>
      <Sparkles className={petit ? "h-3.5 w-3.5" : "h-[18px] w-[18px]"} />
    </span>
    <span className="flex flex-col whitespace-nowrap leading-tight">
      <span className={cn("font-extrabold text-brand-ink", petit ? "text-[12px]" : "text-[13.5px]")}>Un nouveau bien pour vous</span>
      <span className={cn("font-semibold text-brand-mut", petit ? "text-[10.5px]" : "text-[11.5px]")}>5 pièces · Boulogne · à l’instant</span>
    </span>
  </div>
);

/* Les atouts autour du téléphone : ils s’allument l’un après l’autre. */
const ATOUTS = [
  { cote: "g", top: 34, ordre: 0, icon: <Bell className="h-[17px] w-[17px]" />, t: "Prévenu en premier", d: "Une alerte dès qu’un bien arrive" },
  { cote: "d", top: 70, ordre: 1, icon: <Star className="h-[17px] w-[17px]" />, t: "Choisis pour vous", d: "Même des biens qui ne sont pas en ligne" },
  { cote: "g", top: 134, ordre: 2, icon: <Heart className="h-[17px] w-[17px]" />, t: "Votre avis en un clic", d: "« Ça me plaît », « Pas pour moi »" },
  { cote: "d", top: 160, ordre: 3, icon: <MessageCircle className="h-[17px] w-[17px]" />, t: "Votre conseiller", d: "Alexandre, à portée de main" },
] as const;

const Atout = ({ a, montre, reduit }: { a: (typeof ATOUTS)[number]; montre: boolean; reduit: boolean }) => {
  const g = a.cote === "g";
  return (
    <motion.div
      aria-hidden
      className="absolute z-[2] w-[232px]"
      style={g ? { right: "calc(50% + 104px)", top: a.top } : { left: "calc(50% + 104px)", top: a.top }}
      initial={reduit ? false : { opacity: 0, x: g ? 18 : -18 }}
      animate={montre ? { opacity: 1, x: 0 } : undefined}
      transition={{ delay: 0.45 + a.ordre * 0.1, duration: 0.45, ease: [0.22, 0.8, 0.24, 1] }}
    >
      <div className={cn("anim-lit relative flex items-center gap-2.5 rounded-2xl bg-white px-2.5 py-2", g ? "flex-row-reverse text-right" : "")} style={{ animationDelay: `${a.ordre * 3}s` }}>
        <span className="anim-lit-tile grid h-[34px] w-[34px] flex-none place-items-center rounded-[11px]" style={{ animationDelay: `${a.ordre * 3}s` }}>
          {a.icon}
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-[13.5px] font-extrabold text-brand-ink">{a.t}</span>
          <span className="mt-0.5 text-[11.5px] font-medium text-brand-mut">{a.d}</span>
        </span>
        {/* Le petit trait vers le téléphone */}
        <span className={cn("absolute top-1/2 flex w-[22px] -translate-y-1/2 items-center", g ? "left-full" : "right-full flex-row-reverse")}>
          <span className="h-0 flex-1 border-t-2 border-dashed border-white/60" />
          <span className="anim-lit-tile h-2 w-2 flex-none rounded-full" style={{ animationDelay: `${a.ordre * 3}s` }} />
        </span>
      </div>
    </motion.div>
  );
};

const Titre = ({ variante, mobile }: { variante: Variante; mobile?: boolean }) => {
  const souligne = mobile ? "text-[#F9C98A]" : "relative z-0 whitespace-nowrap";
  const trait = mobile ? null : <span aria-hidden className="absolute -left-0.5 -right-1 bottom-0.5 -z-10 h-3 rounded-full bg-[#FAD3A0]" />;
  const etoile = <sup className={cn("ml-0.5 text-[0.55em]", mobile ? "text-[#F9C98A]" : "text-brand-orange")}>*</sup>;
  if (variante === "bien")
    return (
      <>
        {mobile ? "Ce bien vous plaît ? " : <span className="mb-1.5 block text-[20px] tracking-[-0.02em] text-brand">Ce bien vous plaît ?</span>}
        Recevez les prochains comme lui{" "}
        <span className={souligne}>en premier{trait}</span>
        {etoile}
      </>
    );
  return (
    <>
      Vos futurs biens,{" "}
      <span className={souligne}>dans votre poche{trait}</span>
      {etoile}
    </>
  );
};

const RESERVE = "* Réservé aux acheteurs qui nous confient leur recherche (mandat de recherche)";

/* ── Ordinateur : la fenêtre au centre ── */
const Fenetre = ({ variante, fermer, confier, estimer, reduit }: { variante: Variante; fermer: (a: string) => void; confier: () => void; estimer: () => void; reduit: boolean }) => {
  const boite = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  const [h, setH] = useState(624);
  useEffect(() => {
    const avant = document.activeElement as HTMLElement | null;
    boite.current?.focus({ preventScroll: true });
    return () => avant?.focus?.({ preventScroll: true });
  }, []);
  /* Écran peu haut (portable 13 pouces) : la fenêtre se réduit pour tenir en entier. */
  useEffect(() => {
    const mesurer = () => {
      const haut = boite.current?.offsetHeight || 624;
      setH(haut);
      setK(Math.max(0.68, Math.min(1, (window.innerHeight - 28) / (haut + 112))));
    };
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, []);
  /* Tab reste dans la fenêtre */
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
  return (
    <motion.div
      className="fixed inset-0 z-[85] overflow-y-auto font-jakarta"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 bg-[rgba(19,36,61,0.58)] backdrop-blur-[3px]" onClick={() => fermer("fond")} />
      <div className="pointer-events-none relative flex min-h-full items-center justify-center px-6 pb-3.5" style={{ paddingTop: Math.round(98 * k) + 14 }}>
        <div className="w-full max-w-[720px]" style={{ transform: k < 1 ? `scale(${k})` : undefined, transformOrigin: "50% 0", marginBottom: k < 1 ? -Math.round((1 - k) * h) : undefined }}>
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
            {/* Le bandeau bleu, le téléphone qui sort de la fenêtre et les atouts */}
            <div className="relative h-[248px]">
              <FondBleu rond="rounded-t-[32px]" />
              {/* Le cadre coupe le téléphone au ras du bandeau, en fondu : il « sort » de la fenêtre. */}
              <div className="absolute bottom-0 left-1/2 top-[-88px] z-[1] w-[174px] -translate-x-1/2 pt-3.5 [-webkit-mask-image:linear-gradient(180deg,#000_86%,transparent)] [mask-image:linear-gradient(180deg,#000_86%,transparent)]">
                <motion.div initial={reduit ? false : { y: 190 }} animate={{ y: 0 }} transition={{ delay: 0.18, type: "spring", damping: 20, stiffness: 150 }}>
                  <div className="anim-float">
                    <Telephone echelle={0.58} />
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="absolute left-[calc(50%+52px)] top-[-36px] z-[3]"
                initial={reduit ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.4 }}
              >
                <Notif />
              </motion.div>
              {ATOUTS.map((a) => (
                <Atout key={a.t} a={a} montre reduit={reduit} />
              ))}
              <button
                type="button"
                onClick={() => fermer("croix")}
                aria-label="Fermer"
                className="absolute right-4 top-4 z-[4] grid h-10 w-10 place-items-center rounded-full bg-white/[.14] text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={2.4} />
              </button>
            </div>
            {/* Le texte et les boutons */}
            <div className="flex flex-col items-center px-10 pb-6 pt-7 text-center">
              <span className="inline-flex h-7 items-center rounded-full bg-brand-orl px-3 text-[11.5px] font-extrabold uppercase tracking-[0.14em] text-brand-orange-text">
                {variante === "bien" ? "Pour les acheteurs" : "Nouveau · pour les acheteurs"}
              </span>
              <h2 id="fenetre-acheteurs-titre" className="m-0 mt-3.5 text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] text-brand-ink">
                <Titre variante={variante} />
              </h2>
              <p id="fenetre-acheteurs-texte" className="m-0 mt-3 max-w-[500px] text-[16px] font-medium leading-[1.55] text-[#33445B]">
                {variante === "bien"
                  ? "Confiez-nous votre recherche : les biens qui vous ressemblent arrivent dans votre espace, parfois avant même d’être en ligne."
                  : "Un espace rien que pour vous : les biens qu’on choisit pour vous, une alerte dès qu’un nouveau arrive, vos visites en un clic."}
              </p>
              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={confier}
                  className="inline-flex h-14 items-center gap-2.5 rounded-[18px] bg-brand-orange px-7 text-[16px] font-bold text-brand-ink shadow-[0_16px_30px_-16px_rgba(230,139,35,0.9)] transition hover:brightness-105"
                >
                  Confier ma recherche <ArrowRight className="h-[18px] w-[18px]" />
                </button>
                <button type="button" onClick={() => fermer("plus_tard")} className="inline-flex h-14 items-center rounded-[18px] px-5 text-[15.5px] font-bold text-brand-mut transition hover:bg-brand-surf hover:text-brand-ink">
                  Plus tard
                </button>
              </div>
              <p className="m-0 mt-4 text-[12px] font-medium text-brand-mut">{RESERVE}</p>
            </div>
            {/* Pour les vendeurs */}
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Téléphone : la petite carte en bas de l’écran ── */
const Carte = ({ variante, fermer, confier, estimer, reduit }: { variante: Variante; fermer: (a: string) => void; confier: () => void; estimer: () => void; reduit: boolean }) => (
  <motion.div
    role="dialog"
    aria-modal="false"
    aria-labelledby="fenetre-acheteurs-titre"
    className="fixed inset-x-2.5 z-[75] mx-auto max-w-[460px] rounded-[26px] bg-white font-jakarta shadow-[0_30px_60px_-18px_rgba(19,36,61,0.6),0_0_0_1px_rgba(19,36,61,0.06)]"
    style={{ bottom: "calc(84px + env(safe-area-inset-bottom))" }}
    initial={reduit ? false : { y: 380, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={reduit ? { opacity: 0 } : { y: 380, opacity: 0, transition: { duration: 0.25 } }}
    transition={{ type: "spring", damping: 26, stiffness: 260 }}
    drag={reduit ? false : "y"}
    dragConstraints={{ top: 0, bottom: 0 }}
    dragElastic={{ top: 0.05, bottom: 0.6 }}
    onDragEnd={(_, i) => (i.offset.y > 70 || i.velocity.y > 500) && fermer("glisse")}
  >
    {/* Bandeau bleu, téléphone qui dépasse */}
    <div className="relative flex min-h-[108px] items-center py-3.5 pl-[118px] pr-12">
      <FondBleu rond="rounded-t-[26px]" />
      <div className="absolute bottom-0 left-3.5 top-[-48px] w-[92px] [-webkit-mask-image:linear-gradient(180deg,#000_80%,transparent)] [mask-image:linear-gradient(180deg,#000_80%,transparent)]">
        <motion.div
          initial={reduit ? false : { y: 150 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.25, type: "spring", damping: 20, stiffness: 160 }}
        >
          <Telephone echelle={0.306} />
        </motion.div>
      </div>
      <motion.div
        className="absolute left-[86px] top-[-30px] z-[2] max-[359px]:hidden"
        initial={reduit ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.35 }}
      >
        <Notif petit />
      </motion.div>
      <div className="relative z-[1] flex flex-col gap-1">
        <span className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-[#F9C98A] max-[359px]:hidden">{variante === "bien" ? "Pour les acheteurs" : "Nouveau · acheteurs"}</span>
        <h2 id="fenetre-acheteurs-titre" className="m-0 text-[18px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
          <Titre variante={variante} mobile />
        </h2>
      </div>
      <button
        type="button"
        onClick={() => fermer("croix")}
        aria-label="Fermer"
        className="absolute right-2.5 top-2.5 z-[2] grid h-10 w-10 place-items-center rounded-full bg-white/[.14] text-white"
      >
        <X className="h-[17px] w-[17px]" strokeWidth={2.4} />
      </button>
    </div>
    <div className="px-3.5 pb-2.5 pt-3">
      <div className="flex items-center gap-1.5">
        <button type="button" onClick={confier} className="inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-brand-orange px-3 text-[15px] font-bold text-brand-ink">
          Confier ma recherche <ArrowRight className="h-4 w-4 flex-none max-[349px]:hidden" />
        </button>
        <button type="button" onClick={() => fermer("plus_tard")} className="inline-flex h-12 flex-none items-center rounded-2xl px-3 text-[14.5px] font-bold text-brand-mut">
          Plus tard
        </button>
      </div>
      <p className="m-0 mt-2 text-center text-[10.5px] font-medium leading-snug text-brand-mut">{RESERVE}</p>
    </div>
    <div className="rounded-b-[26px] border-t border-[#F6E3C8] bg-[#FFF7EC] px-3.5 py-2.5 text-[12.5px] leading-snug text-[#33445B]">
      <strong className="font-extrabold text-brand-ink">Vous vendez ?</strong> C’est comme ça qu’on chouchoute vos futurs acheteurs chez nous.{" "}
      <button type="button" onClick={estimer} className="inline whitespace-nowrap font-extrabold text-brand-orange-text">
        Estimer mon bien →
      </button>
    </div>
  </motion.div>
);

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
      setOrdi(window.matchMedia("(min-width: 768px)").matches);
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

  /* Échap ferme ; sur ordinateur, la page derrière ne défile plus. */
  useEffect(() => {
    if (!ouvert) return;
    const echap = (e: KeyboardEvent) => e.key === "Escape" && fermer("echap");
    document.addEventListener("keydown", echap);
    let rendre = () => {};
    if (ordi) {
      const b = document.body;
      const [o, p] = [b.style.overflow, b.style.paddingRight];
      const barre = window.innerWidth - document.documentElement.clientWidth;
      b.style.overflow = "hidden";
      if (barre > 0) b.style.paddingRight = `${barre}px`;
      rendre = () => {
        b.style.overflow = o;
        b.style.paddingRight = p;
      };
    }
    return () => {
      document.removeEventListener("keydown", echap);
      rendre();
    };
  }, [ouvert, ordi, fermer]);

  const confier = () => {
    fermer("confier");
    navigate("/acheter#recherche");
  };
  const estimer = () => {
    fermer("estimer");
    openEstimation();
  };

  const props = { variante, fermer, confier, estimer, reduit };
  return <AnimatePresence>{ouvert && (ordi ? <Fenetre key="o" {...props} /> : <Carte key="t" {...props} />)}</AnimatePresence>;
};

export default BuyerPopup;
