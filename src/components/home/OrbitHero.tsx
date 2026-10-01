/* ═══ Haut de l'accueil : « Ils tournent autour d'un bien comme le vôtre » ═══
   Au centre, les recherches défilent (ordre mélangé à chaque visite).
   Autour, les secteurs tournent lentement. Fond bleu Emilio. */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Home, LineChart, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { EstimerCard } from "@/components/site/EstimerCard";
import { useSiteModals } from "@/components/site/SiteModals";
import { Avatar, Picto, type AvatarColor, type AvatarKind } from "@/components/site/Avatar";
import { Container, Em, Eyebrow, TrustRow } from "@/components/site/ui";
import { BULLES_ORBITE, RECHERCHES_ORBITE } from "@/data/recherchesOrbite";
import carte from "@/assets/refonte/carte-secteurs-3d.webp";

const SECTEURS = ["Paris 6e", "Paris 7e", "Paris 15e", "Paris 16e", "Paris 17e", "Neuilly", "Boulogne"];
const INTERIEUR: [AvatarKind, AvatarColor][] = [["personne", "navy"], ["couple", "orange"], ["famille", "bleu"], ["personne", "orange"], ["couple", "bleu"]];

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

const Orbit = ({ small }: { small: boolean }) => {
  const reduce = useReducedMotion();
  // Même ordre au premier affichage (page pré-générée), puis mélange côté navigateur.
  const [list, setList] = useState(RECHERCHES_ORBITE);
  useEffect(() => {
    const [first, ...rest] = RECHERCHES_ORBITE;
    setList([first, ...shuffle(rest)]);
  }, []);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % list.length), 3000);
    return () => window.clearInterval(t);
  }, [list.length, reduce]);
  const r = list[i];
  const badge = r.quoi.includes("maison") ? "maison" : r.kind === "invest" || r.quoi.includes("louer") ? "cle" : "appart";
  const R1 = small ? 40 : 43;
  const R2 = small ? 27 : 28.5;

  return (
    <div className="flex flex-col items-center gap-3">
    <div className="relative mx-auto aspect-square w-full max-w-[340px] md:max-w-[600px]">
      {/* La carte, en cercle */}
      <div className="absolute inset-[4%] overflow-hidden rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_50px_90px_-30px_rgba(0,0,0,0.65)]">
        <img src={carte} alt="Carte illustrée de Paris Ouest et Boulogne-Billancourt" className="absolute max-w-none opacity-[0.92] saturate-[.85] brightness-[.92]" style={{ left: "-66%", top: "-10%", width: "212%" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(27,61,107,0.05) 0%, rgba(27,61,107,0.25) 50%, rgba(27,61,107,0.7) 100%)" }} />
      </div>
      {/* Liseré discret */}
      <div className="anim-glow absolute inset-[3.6%] rounded-full border-[1.5px] border-[rgba(242,178,102,0.38)] shadow-[0_0_14px_rgba(242,178,102,0.22)]" />
      <div
        className="anim-spin-16 absolute inset-[3.6%] rounded-full"
        style={{
          background: "conic-gradient(from 0deg, rgba(242,178,102,0) 0deg, rgba(242,178,102,0) 270deg, rgba(242,178,102,.55) 345deg, rgba(242,178,102,0) 360deg)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))",
        }}
      />
      <div className="absolute inset-[7%] rounded-full border-[1.5px] border-dashed border-white/25" />
      <div className="absolute rounded-full border-[1.5px] border-dashed border-[rgba(242,178,102,0.55)]" style={{ inset: `${50 - R2}%` }} />
      {/* Anneau extérieur : les secteurs */}
      <div className="anim-spin-90 absolute inset-0">
        {BULLES_ORBITE.map((b, k) => {
          const a = ((-90 + (k * 360) / BULLES_ORBITE.length) * Math.PI) / 180;
          return (
            <div key={k} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + R1 * Math.cos(a)}%`, top: `${50 + R1 * Math.sin(a)}%` }}>
              <div className="anim-spin-90-r">
                <div className={cn("flex items-center whitespace-nowrap rounded-full bg-white shadow-[0_14px_28px_-14px_rgba(19,36,61,0.6),0_0_0_1px_rgba(19,36,61,0.06)]", small ? "gap-1.5 py-[3px] pl-[3px] pr-2.5" : "gap-2 py-[5px] pl-[5px] pr-3.5")}>
                  <Avatar kind={b.kind} color={b.color} size={small ? 28 : 36} />
                  <span className="flex flex-col leading-tight">
                    <span className={cn("font-extrabold text-brand-ink", small ? "text-xs" : "text-[13.5px]")}>{small ? b.t2 : b.t1}</span>
                    <span className={cn("font-bold text-brand-mut", small ? "text-[11px]" : "text-xs")}>{small ? b.t1.replace(" · balcon", "") : b.t2}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Anneau intérieur : des acheteurs */}
      {!small && (
        <div className="anim-spin-60-r absolute inset-0">
          {INTERIEUR.map(([k, c], n) => {
            const a = ((-54 + n * 72) * Math.PI) / 180;
            return (
              <div key={n} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + R2 * Math.cos(a)}%`, top: `${50 + R2 * Math.sin(a)}%` }}>
                <div className="anim-spin-60 rounded-full bg-white p-[3px] shadow-[0_10px_20px_-10px_rgba(19,36,61,0.55)]"><Avatar kind={k} color={c} size={32} /></div>
              </div>
            );
          })}
        </div>
      )}
      {/* Centre : une recherche après l'autre */}
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:w-[40%] shadow-[0_30px_60px_-24px_rgba(19,36,61,0.6),0_0_0_8px_rgba(255,255,255,0.14)]"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-[9%] text-center"
          >
            <span className="md:hidden"><Picto kind={r.kind} color={r.color} badge={badge} size={50} /></span>
            <span className="hidden md:block"><Picto kind={r.kind} color={r.color} badge={badge} size={56} /></span>
            <span className="mt-1 hidden text-[11px] font-extrabold uppercase leading-tight tracking-[0.08em] text-brand-orange-text md:block">{r.qui}</span>
            <span className="hidden font-display text-[20px] leading-[1.16] text-brand-ink text-balance md:block">{r.quoi}</span>
            <span className="hidden text-[12.5px] font-bold leading-tight text-brand-mut md:block">{r.ou}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    {/* Téléphone : la recherche s'affiche en clair sous l'orbite, avec toute la place qu'il faut */}
    {(
      <div className="relative -mt-3 w-full max-w-[340px] md:hidden" aria-hidden>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-[84px] items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_24px_44px_-22px_rgba(0,0,0,0.6)]"
          >
            <Picto kind={r.kind} color={r.color} badge={badge} size={40} />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-brand-orange-text">{r.qui}</span>
              <span className="font-display text-[19px] leading-tight text-brand-ink">{r.quoi}</span>
              <span className="text-[12.5px] font-bold text-brand-mut">{r.ou}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    )}
    </div>
  );
};

type Onglet = "Estimer" | "Vendre" | "Acheter";

export const HeroTabs = ({ initial = "Estimer" }: { initial?: Onglet }) => {
  const { openEstimation } = useSiteModals();
  const [tab, setTab] = useState<Onglet>(initial);
  const [adresse, setAdresse] = useState("");
  const TABS: { k: Onglet; icon: JSX.Element }[] = [
    { k: "Estimer", icon: <LineChart className="h-[18px] w-[18px]" /> },
    { k: "Vendre", icon: <Home className="h-[18px] w-[18px]" /> },
    { k: "Acheter", icon: <Search className="h-[18px] w-[18px]" /> },
  ];
  const checks = tab === "Acheter" ? ["Biens hors marché", "Un espace client dédié", "Payé seulement si vous achetez"] : ["Gratuit, sans engagement", "Visite sur place", "Rapport détaillé"];
  return (
    <div className="overflow-hidden rounded-xl border border-brand-line bg-white shadow-[0_22px_44px_-30px_rgba(19,36,61,0.55)]">
      <div role="tablist" className="flex">
        {TABS.map((t, n) => (
          <button
            key={t.k}
            role="tab"
            type="button"
            aria-selected={tab === t.k}
            onClick={() => setTab(t.k)}
            className={cn(
              "inline-flex h-[54px] min-w-0 flex-1 items-center justify-center gap-2 text-[15px] transition",
              n > 0 && "border-l border-brand-line",
              tab === t.k ? "bg-white font-extrabold text-brand-ink shadow-[inset_0_-3px_0_#E68B23]" : "bg-brand-pale font-semibold text-brand-mut shadow-[inset_0_-1px_0_#DCE3EC]",
            )}
          >
            <span className={tab === t.k ? "text-brand-orange-text" : ""}>{t.icon}</span>
            {t.k}
          </button>
        ))}
      </div>
      <div key={tab} className="fx-fade flex flex-col gap-2.5 p-3.5">
        {tab === "Estimer" && (
          <form
            className="flex flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              openEstimation({ address: adresse });
            }}
          >
            <label className="flex min-w-0 flex-[1_1_220px] flex-col gap-0.5 rounded-[10px] border border-[#D5DEEA] px-3.5 py-2">
              <span className="text-xs font-bold text-brand-mut">Adresse du bien</span>
              <input value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="Ex. 12 rue de Silly, Boulogne" className="w-full min-w-0 border-0 bg-transparent p-0 text-base text-brand-ink outline-none placeholder:text-[#8A97A8]" />
            </label>
            <button type="submit" className="inline-flex h-[54px] flex-[1_1_auto] items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] bg-brand-orange px-6 text-base font-extrabold text-brand-ink sm:flex-none">
              <LineChart className="h-[18px] w-[18px]" /> Estimer gratuitement
            </button>
          </form>
        )}
        {tab === "Vendre" && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="m-0 max-w-[340px] text-[15px] leading-normal text-brand-txt">Une vente préparée, suivie et expliquée, avec un interlocuteur dédié.</p>
            <Link to="/vendre" className="inline-flex h-[54px] items-center gap-2.5 rounded-[10px] bg-brand-orange px-6 text-base font-extrabold text-brand-ink">Préparer ma vente <ArrowRight className="h-[18px] w-[18px]" /></Link>
          </div>
        )}
        {tab === "Acheter" && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="m-0 max-w-[340px] text-[15px] leading-normal text-brand-txt">Un chasseur qui cherche pour vous, et qui reste de votre côté.</p>
            <Link to="/acheter#recherche" className="inline-flex h-[54px] items-center gap-2.5 rounded-[10px] bg-brand-orange px-6 text-base font-extrabold text-brand-ink">Confier ma recherche <ArrowRight className="h-[18px] w-[18px]" /></Link>
          </div>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-semibold text-brand-mut">
          {checks.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5"><Check className="h-[15px] w-[15px] text-[#2E7D5B]" strokeWidth={2.6} />{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

/** Haut de page avec l’orbite des recherches. `vendre` : version de la page Vendre (estimation directe). */
const OrbitHero = ({ vendre }: { vendre?: boolean }) => {
  const small = useIsMobile();
  const action = vendre ? <EstimerCard /> : <HeroTabs />;
  return (
    <section className="overflow-hidden text-brand-bt" style={{ background: "linear-gradient(165deg, #1B3D6B 0%, #22497D 58%, #2C5C99 100%)" }}>
      <Container className="flex flex-wrap items-center gap-x-12 gap-y-8 pb-12 pt-8 md:pb-[60px] md:pt-14">
        <div className="flex min-w-0 max-w-[560px] flex-[1_1_460px] flex-col gap-[22px]">
          <Eyebrow dark>{vendre ? "Vendre avec Emilio" : "Ils cherchent en ce moment"}</Eyebrow>
          <h1 className="m-0 font-display text-[33px] font-medium leading-[1.08] tracking-[-0.01em] text-white text-balance sm:text-[clamp(40px,4.6vw,60px)] sm:leading-[1.06]">
            Ils tournent autour <Em dark wrap>d’un bien comme le vôtre.</Em>
          </h1>
          <p className="m-0 text-base leading-relaxed text-pretty sm:text-lg">
            {vendre
              ? "Des familles, des couples, des investisseurs nous ont déjà confié leur recherche. Estimez votre bien : on vous dit combien d’entre eux il peut intéresser, et on prépare votre vente avec vous."
              : "Des familles, des couples, des investisseurs nous confient leur recherche, à Paris, dans les Hauts-de-Seine et au-delà. Estimez votre bien : on vous dit combien d’entre eux il peut intéresser."}
          </p>
          <div className="hidden md:block">{action}</div>
          <TrustRow dark className="hidden md:flex" />
        </div>
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[18px]">
          <Orbit small={small} />
          <div className="hidden flex-wrap justify-center gap-1.5 md:flex">
            {SECTEURS.map((s) => (
              <span key={s} className="inline-flex h-8 items-center rounded-full border border-white/20 bg-white/10 px-[11px] text-[13px] font-bold text-white">{s}</span>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 md:hidden">
          {action}
          <TrustRow dark className="justify-between" />
        </div>
      </Container>
    </section>
  );
};

export default OrbitHero;
