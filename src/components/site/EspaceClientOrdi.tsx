/* Page Acheter, haut de page sur ordinateur (à partir de 1024 px) : « l’appli qui se raconte », version bleu Emilio.
   Le téléphone se balance à gauche, les 5 atouts sont listés à droite. Chaque atout se joue sur l’écran du téléphone
   et une bulle sort à côté de lui. Les étapes défilent toutes seules ; un clic sur une étape la montre tout de suite.
   Sur téléphone et tablette, rien de tout ça n’est affiché (voir EspaceClient dans pages/Acheter.tsx). */
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bell, CalendarDays, Check, FileText, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneScreen } from "@/components/site/PhoneScreen";
import { CocheEnvoyee } from "@/components/site/ModalShell";

/** Vrai seulement sur un écran d’ordinateur : ailleurs, ce bloc est caché et n’a pas besoin de tourner. */
const useOrdinateur = () => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const f = () => setOk(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return ok;
};

/** L’étape en cours : passe toute seule à la suivante. Un clic choisit une étape et relance le compte. */
export const useHistoire = () => {
  const calme = useReducedMotion();
  const ordi = useOrdinateur();
  const [i, setI] = useState(0);
  const [tour, setTour] = useState(0);
  useEffect(() => {
    if (calme || !ordi) return;
    const t = setTimeout(() => {
      setI((x) => (x + 1) % DUREES.length);
      setTour((x) => x + 1);
    }, DUREES[i]);
    return () => clearTimeout(t);
  }, [i, tour, calme, ordi]);
  return { actif: i, tour, choisir: (k: number) => { setI(k); setTour((x) => x + 1); } };
};

/* ── Le téléphone ── */
const Telephone = ({ photos, children, bouge }: { photos: string[]; children?: ReactNode; bouge?: boolean }) => (
  <div className={cn("relative z-[2] h-[630px] w-[300px] flex-none rounded-[46px] bg-brand-ink p-[11px] shadow-[0_60px_100px_-40px_rgba(19,36,61,0.75),inset_0_0_0_2px_#34465f]", bouge && "anim-phone")}>
    <div className="relative h-full w-full overflow-hidden rounded-[36px]">
      <PhoneScreen photos={photos} />
      {children}
      <span aria-hidden className="absolute left-1/2 top-[9px] z-[8] h-6 w-[90px] -translate-x-1/2 rounded-full bg-brand-ink" />
    </div>
  </div>
);

/** Le téléphone en plus petit (et encore un peu plus petit sur les écrans bas). */
const Reduit = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("relative h-[529px] w-[252px] flex-none [@media(max-height:760px)]:h-[466px] [@media(max-height:760px)]:w-[222px]", className)}>
    <div className="absolute left-0 top-0 origin-top-left scale-[.84] [@media(max-height:760px)]:scale-[.74]">{children}</div>
  </div>
);

const ETAPES = [
  { icon: Bell, t: "Prévenu en premier", d: "Un bien qui vous correspond arrive : vous recevez une notification, avant tout le monde." },
  { icon: Star, t: "Une sélection privée", d: "Les biens retenus pour vous, annonces du marché et biens hors marché, au même endroit." },
  { icon: Heart, t: "Votre avis en un clic", d: "« Ça me plaît », « Pas pour moi » : on affine la recherche avec vous." },
  { icon: CalendarDays, t: "La visite, en direct", d: "« Je veux visiter » depuis la fiche du bien, et le rendez-vous s’ajoute à votre agenda." },
  { icon: FileText, t: "Le mandat signé en ligne", d: "Un code reçu par e-mail, une signature au doigt : c’est fait." },
];
const DUREES = [3800, 4000, 3800, 4200, 5400];

const Voile = () => <motion.div className="absolute inset-0 z-[5] bg-[rgba(19,36,61,0.32)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />;

const Feuille = ({ haut, children }: { haut: number; children: ReactNode }) => (
  <motion.div
    className="absolute inset-x-0 bottom-0 z-[6] flex flex-col rounded-t-[24px] bg-white px-4 pb-5 pt-2 shadow-[0_-18px_40px_-16px_rgba(19,36,61,0.45)]"
    style={{ top: haut }}
    initial={{ y: "105%" }}
    animate={{ y: 0 }}
    exit={{ y: "105%" }}
    transition={{ type: "spring", stiffness: 240, damping: 30, delay: 0.15 }}
  >
    <span className="mx-auto mb-3 block h-1 w-9 flex-none rounded-full bg-[#D5DEEA]" />
    {children}
  </motion.div>
);

const ECRANS = (photos: string[]): ReactNode[] => {
  const [a, b] = [photos[0], photos[1] || photos[0]];
  return [
    /* 1. La notification arrive en haut, la carte du bien s’illumine */
    <motion.div key="notif" className="absolute inset-0 z-[6]" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <motion.div
        className="absolute inset-x-2.5 top-[36px] flex items-start gap-2.5 rounded-[18px] bg-white/95 p-2.5 shadow-[0_18px_36px_-14px_rgba(19,36,61,0.6)] backdrop-blur"
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.3 }}
      >
        <span className="grid h-9 w-9 flex-none place-items-center rounded-[10px] bg-[#1a2332] text-[15px] font-extrabold text-white">E</span>
        <span className="flex min-w-0 flex-1 flex-col leading-snug">
          <span className="flex justify-between text-[9.5px] font-bold uppercase tracking-wide text-[#64748b]"><span>Ma recherche</span><span className="normal-case tracking-normal">maintenant</span></span>
          <span className="text-[12.5px] font-extrabold text-[#1a2332]">Un nouveau bien pour vous</span>
          <span className="text-[10.5px] text-[#475569]">5 pièces · 112 m² · Boulogne-Billancourt</span>
        </span>
      </motion.div>
      <motion.span
        className="absolute left-[14px] top-[290px] h-[146px] w-[250px] rounded-2xl"
        initial={{ boxShadow: "0 0 0 0px rgba(230,139,35,0)" }}
        animate={{ boxShadow: ["0 0 0 0px rgba(230,139,35,0)", "0 0 0 5px rgba(230,139,35,0.55)", "0 0 0 0px rgba(230,139,35,0)"] }}
        transition={{ duration: 1.3, delay: 1, repeat: 1 }}
      />
    </motion.div>,

    /* 2. La sélection monte : les biens retenus, un par un */
    <motion.div key="selection" className="absolute inset-0 z-[5]" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <Voile />
      <Feuille haut={190}>
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-extrabold text-[#1a2332]">Votre sélection</span>
          <span className="rounded-full bg-[#E8EFF8] px-2 py-0.5 text-[10.5px] font-extrabold text-brand">12 biens</span>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {[
            { img: a, p: "1 099 000 €", l: "5 pièces · Boulogne-Billancourt", tag: "Nouveau", c: "bg-[#e0822e] text-white" },
            { img: b, p: "1 650 000 €", l: "5 pièces · Paris 6e", tag: "Hors marché", c: "bg-brand text-white" },
            { img: a, p: "1 180 000 €", l: "5 pièces · Boulogne, balcon", tag: "91 %", c: "bg-[#dcfce7] text-[#15803d]" },
          ].map((r, k) => (
            <motion.div key={k} className="flex items-center gap-2.5 rounded-xl bg-[#f4f6fa] p-1.5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 + k * 0.28, type: "spring", stiffness: 260, damping: 24 }}>
              <img src={r.img} alt="" className="h-11 w-11 flex-none rounded-lg object-cover" />
              <span className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="text-[12.5px] font-extrabold text-[#1a2332]">{r.p}</span>
                <span className="truncate text-[10.5px] text-[#64748b]">{r.l}</span>
              </span>
              <span className={cn("flex-none rounded-full px-1.5 py-0.5 text-[9px] font-extrabold", r.c)}>{r.tag}</span>
            </motion.div>
          ))}
        </div>
      </Feuille>
    </motion.div>,

    /* 3. Le doigt appuie sur « Ça me plaît », des cœurs s’envolent */
    <motion.div key="avis" className="absolute inset-0 z-[6]" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <motion.span
        className="absolute left-[62px] top-[497px] -ml-[17px] -mt-[17px] h-[34px] w-[34px] rounded-full border-[3px] border-white bg-white/40 shadow-[0_8px_18px_-6px_rgba(0,0,0,0.5)]"
        initial={{ x: 90, y: -120, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: [0, 1, 1], scale: [1, 1, 0.82, 1] }}
        transition={{ duration: 0.9, delay: 0.25, times: [0, 0.6, 0.8, 1] }}
      />
      <motion.span
        className="absolute left-[62px] top-[497px] -ml-[26px] -mt-[26px] h-[52px] w-[52px] rounded-full bg-[rgba(22,163,74,0.35)]"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: [0.3, 1.9], opacity: [0.8, 0] }}
        transition={{ duration: 0.8, delay: 0.95 }}
      />
      {[[-18, 0], [6, 0.12], [24, 0.24], [-4, 0.36]].map(([dx, d], k) => (
        <motion.span key={k} className="absolute left-[62px] top-[490px] text-[#16a34a]" initial={{ opacity: 0, x: -8, y: 0, scale: 0.6 }} animate={{ opacity: [0, 1, 0], x: dx - 8, y: -150, scale: 1.1 }} transition={{ duration: 1.5, delay: 1 + d, ease: "easeOut" }}>
          <Heart className="h-5 w-5 fill-current" />
        </motion.span>
      ))}
      <motion.div className="absolute inset-x-3 bottom-[12px] flex items-center gap-2 rounded-xl bg-[#1a2332] px-3 py-2.5 text-[11.5px] font-bold text-white shadow-[0_12px_24px_-10px_rgba(0,0,0,0.6)]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, type: "spring", stiffness: 280, damping: 24 }}>
        <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-[#16a34a]"><Check className="h-3 w-3" strokeWidth={3.5} /></span>
        Noté ! On affine votre sélection.
      </motion.div>
    </motion.div>,

    /* 4. La visite est confirmée, la coche se dessine */
    <motion.div key="visite" className="absolute inset-0 z-[5]" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <Voile />
      <Feuille haut={278}>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <CocheEnvoyee size={58} />
          <span className="mt-1 text-[16px] font-extrabold text-[#1a2332]">Visite confirmée</span>
          <span className="text-[13px] font-extrabold text-[#6d28d9]">Mardi à 18 h 30</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-[#f4f6fa] p-1.5">
          <img src={a} alt="" className="h-10 w-10 flex-none rounded-lg object-cover" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[12px] font-extrabold text-[#1a2332]">1 099 000 €</span>
            <span className="truncate text-[10.5px] text-[#64748b]">5 pièces · Boulogne-Billancourt</span>
          </span>
        </div>
        <motion.span className="mt-2.5 inline-flex items-center justify-center gap-1.5 self-center rounded-full bg-[#ede9fe] px-3 py-1.5 text-[11px] font-extrabold text-[#6d28d9]" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}>
          <CalendarDays className="h-3.5 w-3.5" /> Ajoutée à votre agenda
        </motion.span>
      </Feuille>
    </motion.div>,

    /* 5. Le code arrive chiffre par chiffre, la signature se dessine */
    <motion.div key="mandat" className="absolute inset-0 z-[5]" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <Voile />
      <Feuille haut={196}>
        <span className="text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-[#64748b]">Mandat de recherche</span>
        <span className="text-[15px] font-extrabold text-[#1a2332]">Signature en ligne</span>
        <span className="mt-2.5 text-[10.5px] font-bold text-[#64748b]">Code reçu par e-mail</span>
        <div className="mt-1 flex gap-1.5">
          {["4", "8", "2", "1", "9", "6"].map((c, k) => (
            <span key={k} className="grid h-9 flex-1 place-items-center rounded-lg border-[1.5px] border-[#d5deea] bg-white text-[15px] font-extrabold text-[#1a2332]">
              <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + k * 0.16 }}>{c}</motion.span>
            </span>
          ))}
        </div>
        <span className="mt-2.5 text-[10.5px] font-bold text-[#64748b]">Votre signature</span>
        <div className="mt-1 h-[84px] rounded-xl border-[1.5px] border-dashed border-[#c5d1e0] bg-[#fafbfd] p-1.5">
          <svg viewBox="0 0 210 70" className="h-full w-full" aria-hidden>
            <motion.path
              d="M10 48 C 18 18, 34 14, 36 40 S 48 66, 60 40 S 78 16, 86 42 S 100 62, 112 36 C 120 20, 134 26, 130 44 S 146 60, 166 34 C 174 26, 182 30, 200 26"
              fill="none"
              stroke="#22497D"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.6, duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
        </div>
        <motion.span className="mt-2.5 inline-flex items-center justify-center gap-1.5 self-center rounded-full bg-[#dcfce7] px-3.5 py-1.5 text-[12px] font-extrabold text-[#15803d]" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.15, type: "spring", stiffness: 320, damping: 18 }}>
          <Check className="h-4 w-4" strokeWidth={3} /> Mandat signé
        </motion.span>
      </Feuille>
    </motion.div>,
  ];
};

/** La liste des 5 atouts, à droite (sur le fond bleu). */
export const EtapesOrdi = ({ actif, tour, choisir }: { actif: number; tour: number; choisir: (k: number) => void }) => {
  return (
    <ol className="m-0 flex max-w-[560px] list-none flex-col gap-1.5 p-0">
      {ETAPES.map((e, k) => {
        const on = k === actif;
        return (
          <li key={e.t}>
            <button
              type="button"
              onClick={() => choisir(k)}
              aria-pressed={on}
              className={cn(
                "relative w-full overflow-hidden rounded-[18px] text-left transition-all duration-500",
                on ? "bg-white shadow-[0_0_0_1.5px_rgba(230,139,35,0.9),0_24px_44px_-26px_rgba(0,0,0,0.55)]" : "bg-transparent hover:bg-white/10",
              )}
            >
              <span className="flex items-center gap-3.5 px-3.5 py-[7px]">
                <span
                  className={cn(
                    "grid h-10 w-10 flex-none place-items-center rounded-xl transition-colors duration-500",
                    on ? "bg-brand-orange text-brand-ink" : "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.14)]",
                  )}
                >
                  <e.icon className="h-5 w-5" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className={cn("text-[16px] font-extrabold leading-snug transition-colors", on ? "text-brand-ink" : "text-white/80")}>{e.t}</span>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="block overflow-hidden">
                        <span className="block pb-0.5 pt-0.5 text-[14px] leading-snug text-brand-txt">{e.d}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </span>
              {on && (
                <motion.span key={tour} aria-hidden className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-brand-orange" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: DUREES[k] / 1000, ease: "linear" }} />
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
};

/** Le téléphone et ce qui se joue sur son écran. `bouge` : il se balance doucement. */
const TelephoneHistoire = ({ photos, actif, bouge, className }: { photos: string[]; actif: number; bouge?: boolean; className?: string }) => {
  const ecrans = ECRANS(photos);
  return (
    <Reduit className={cn(!bouge && "anim-float", className)}>
      <Telephone photos={photos} bouge={bouge}>
        <AnimatePresence mode="wait">{ecrans[actif]}</AnimatePresence>
      </Telephone>
    </Reduit>
  );
};

const Bulle2 = ({ icon, fond, t, d, className, delai }: { icon: ReactNode; fond: string; t: string; d: string; className: string; delai: number }) => (
  <motion.div
    className={cn("absolute z-[4] flex items-center gap-2.5 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 shadow-[0_24px_44px_-18px_rgba(0,0,0,0.6)]", className)}
    initial={{ opacity: 0, scale: 0.6, y: 14 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: -8, transition: { duration: 0.2 } }}
    transition={{ type: "spring", stiffness: 320, damping: 20, delay: delai }}
  >
    <span className={cn("relative grid h-10 w-10 flex-none place-items-center rounded-full", fond)}>
      {icon}
      <motion.span aria-hidden className="absolute inset-0 rounded-full border-2 border-current" initial={{ scale: 1, opacity: 0.7 }} animate={{ scale: 1.8, opacity: 0 }} transition={{ duration: 1.1, delay: delai + 0.15, repeat: 2 }} />
    </span>
    <span className="flex flex-col leading-snug">
      <span className="whitespace-nowrap text-[14px] font-extrabold text-brand-ink">{t}</span>
      <span className="whitespace-nowrap text-[12px] font-semibold text-brand-mut">{d}</span>
    </span>
  </motion.div>
);

const BULLES = [
  <Bulle2 key="b0" delai={0.7} className="-right-3 top-[64px] xl:-right-8" fond="bg-[#FFF1DF] text-brand-orange-text" icon={<Bell className="h-5 w-5" />} t="Nouveau bien" d="Boulogne · 5 pièces" />,
  <Bulle2 key="b1" delai={1.1} className="-left-3 top-[236px] xl:-left-8" fond="bg-[#E8EFF8] text-brand" icon={<Star className="h-5 w-5" />} t="12 biens" d="rien que pour vous" />,
  <Bulle2 key="b2" delai={1.25} className="-right-3 top-[330px] xl:-right-8" fond="bg-[#dcfce7] text-[#15803d]" icon={<Heart className="h-5 w-5 fill-current" />} t="Ça me plaît" d="c’est noté" />,
  <Bulle2 key="b3" delai={1.0} className="-left-3 top-[120px] xl:-left-8" fond="bg-[#ede9fe] text-[#6d28d9]" icon={<CalendarDays className="h-5 w-5" />} t="Mardi · 18 h 30" d="Visite confirmée" />,
  <Bulle2 key="b4" delai={3.2} className="-right-3 top-[250px] xl:-right-8" fond="bg-[#dcfce7] text-[#15803d]" icon={<Check className="h-5 w-5" strokeWidth={3} />} t="Mandat signé" d="en ligne, au doigt" />,
];

/** La colonne du téléphone : cercles qui tournent, téléphone qui se balance, bulle de l’étape en cours. */
export const TelephoneOrdi = ({ photos, actif, className }: { photos: string[]; actif: number; className?: string }) => (
  <div aria-hidden className={cn("relative hidden h-[560px] items-center justify-center lg:flex [@media(max-height:760px)]:h-[500px]", className)}>
    <span className="absolute left-1/2 top-1/2 -ml-[230px] -mt-[230px] h-[460px] w-[460px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0) 70%)" }} />
    <span className="anim-spin-60 absolute left-1/2 top-1/2 -ml-[210px] -mt-[210px] h-[420px] w-[420px] rounded-full border-2 border-dashed border-white/20" />
    <span className="anim-spin-90-r absolute left-1/2 top-1/2 -ml-[262px] -mt-[262px] h-[524px] w-[524px] rounded-full border border-dotted border-white/15" />
    <span className="anim-bob-b absolute left-[10%] top-[14%] h-3 w-3 rounded-full bg-brand-orange" />
    <span className="anim-bob-a absolute bottom-[14%] right-[10%] h-2.5 w-2.5 rounded-full bg-white/70" />
    <span className="anim-bob-c absolute right-[16%] top-[18%] h-2 w-2 rounded-full bg-[#F9C98A]" />
    <TelephoneHistoire photos={photos} actif={actif} bouge className="z-[2]" />
    <AnimatePresence mode="wait">{BULLES[actif]}</AnimatePresence>
  </div>
);
