/* ═══ Accueil « Tuiles » : nos biens du moment ═══════════════════════════════
   Une grande tuile bleue aux coins arrondis, comme les autres blocs de l’accueil.
   Ordinateur : les biens défilent doucement tout seuls ; le défilé s’arrête quand on passe la souris dessus.
   Téléphone : on glisse du doigt, la carte au centre est mise en avant, une barre montre où l’on en est.
   Si l’appareil demande moins d’animations, pas de défilé : on fait défiler soi-même. */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Bell, Eye, Hand, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Property, formatPrice } from "@/lib/properties";
import { QuickViewPopup, displayCity, displayTitle, featureBadges } from "@/components/PropertyCard";
import { useBiens } from "@/components/home/FeaturedProperties";

const FILTRES = [
  { k: "tous", t: "Tous", test: () => true },
  { k: "appartement", t: "Appartements", test: (p: Property) => /appartement|studio|duplex|loft/i.test(p.type) },
  { k: "maison", t: "Maisons", test: (p: Property) => /maison/i.test(p.type) },
  { k: "immeuble", t: "Immeubles", test: (p: Property) => /immeuble/i.test(p.type) },
];

const BLEU = "linear-gradient(165deg, #1B3D6B 0%, #22497D 58%, #2C5C99 100%)";
const nf = new Intl.NumberFormat("fr-FR");
/* Dix biens au plus sur l’accueil : le reste est sur la page Nos biens. */
const MAX = 10;
const PAS = 320 + 24; // largeur d’une carte sur ordinateur + l’espace entre deux cartes

const Spec = ({ t }: { t: string }) => <span className="inline-flex h-7 items-center rounded-[9px] bg-brand-surf px-2.5 text-[12.5px] font-bold text-[#33445B]">{t}</span>;

/** La carte blanche d’un bien. `cachee` : copie qui sert seulement à faire boucler le défilé (ni lue, ni atteinte au clavier). */
const Carte = ({ p, onVue, cachee, className }: { p: Property; onVue: () => void; cachee?: boolean; className?: string }) => {
  const plus = featureBadges(p)[0];
  const sansClavier = cachee ? { tabIndex: -1 } : {};
  return (
    <article
      {...(cachee ? { "aria-hidden": true } : {})}
      className={cn("group relative flex-none overflow-hidden rounded-[24px] bg-white text-brand-ink shadow-[0_30px_60px_-34px_rgba(0,0,0,0.7)] transition duration-300 md:rounded-[26px] md:hover:-translate-y-1.5", className)}
    >
      <div className="relative h-[200px] overflow-hidden bg-brand-sky md:h-[210px]">
        {p.images[0] && (
          <img src={p.images[0]} alt={cachee ? "" : `${displayTitle(p)}, ${displayCity(p)}`} loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]" />
        )}
        <span className="absolute bottom-3 left-3 inline-flex h-9 items-center rounded-xl bg-white px-3 text-[15.5px] font-extrabold shadow-[0_6px_16px_-8px_rgba(19,36,61,0.4)]">{formatPrice(p.price)}</span>
        {p.exclusive && <span className="absolute left-3 top-3 inline-flex h-[26px] items-center rounded-full bg-brand-orange px-2.5 text-xs font-extrabold text-brand-ink">Exclusivité</span>}
        <button
          type="button"
          onClick={onVue}
          aria-label={`Vue rapide : ${displayTitle(p)}, ${displayCity(p)}`}
          {...sansClavier}
          className="absolute right-3 top-3 z-[2] grid h-10 w-10 place-items-center rounded-full bg-white/95 text-brand-ink shadow-[0_6px_16px_-8px_rgba(19,36,61,0.5)] transition hover:scale-105"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="m-0 truncate text-[16.5px] font-extrabold tracking-[-0.01em] md:text-[17px]">
          <Link to={`/biens/${p.id}`} {...sansClavier} className="after:absolute after:inset-0 after:z-[1] after:content-['']">
            {displayTitle(p)}
            {plus ? ` avec ${plus.toLowerCase()}` : ""}
          </Link>
        </h3>
        <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-mut">
          <MapPin className="h-[15px] w-[15px] flex-none" /> {displayCity(p)} ({p.postalCode})
        </span>
        <div className="flex flex-wrap gap-1.5">
          {p.surface > 0 && <Spec t={`${nf.format(p.surface)} m²`} />}
          {p.rooms > 0 && <Spec t={`${p.rooms} pièce${p.rooms > 1 ? "s" : ""}`} />}
          {p.bedrooms > 0 && <Spec t={`${p.bedrooms} chambre${p.bedrooms > 1 ? "s" : ""}`} />}
        </div>
      </div>
    </article>
  );
};

/** Ordinateur : la rangée de biens qui passe toute seule (deux fois la même suite, pour boucler sans à-coup). */
const Defile = ({ liste, onVue, calme }: { liste: Property[]; onVue: (p: Property) => void; calme: boolean }) => {
  if (calme) {
    // moins d’animations demandé : une simple rangée qu’on fait défiler soi-même
    return (
      <div className="flex gap-6 overflow-x-auto px-10 pb-4">
        {liste.map((p) => <Carte key={p.id} p={p} onVue={() => onVue(p)} className="w-[320px]" />)}
      </div>
    );
  }
  // assez de cartes pour remplir l’écran, même avec un seul bien
  const fois = liste.length ? Math.max(1, Math.ceil(1800 / (liste.length * PAS))) : 0;
  const base = Array.from({ length: fois }).flatMap(() => liste);
  const serie = [...base, ...base];
  return (
    <div className="group/defile relative [mask-image:linear-gradient(90deg,transparent_0,#000_6%,#000_94%,transparent_100%)]">
      <div
        className="flex w-max py-2 [animation:defile-biens_var(--duree)_linear_infinite] group-focus-within/defile:[animation-play-state:paused] group-hover/defile:[animation-play-state:paused]"
        style={{ "--duree": `${Math.max(22, base.length * 6.5)}s` } as React.CSSProperties}
      >
        {serie.map((p, k) => (
          <div key={`${p.id}-${k}`} className="flex-none pr-6">
            <Carte p={p} onVue={() => onVue(p)} cachee={k >= liste.length} className="w-[320px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

const TuilesBiens = () => {
  const biens = useBiens();
  const calme = !!useReducedMotion();
  const [filtre, setFiltre] = useState("tous");
  const [vue, setVue] = useState<Property | null>(null);
  const [actif, setActif] = useState(0);
  const [touche, setTouche] = useState(false);
  const rail = useRef<HTMLDivElement>(null);

  const dispo = useMemo(() => FILTRES.map((f) => ({ ...f, n: (biens || []).filter(f.test).length })).filter((f) => f.k === "tous" || f.n > 0), [biens]);
  const tous = useMemo(() => (biens || []).filter((FILTRES.find((f) => f.k === filtre) || FILTRES[0]).test), [biens, filtre]);
  const liste = tous.slice(0, MAX);
  const total = liste.length;

  /* Téléphone : la carte la plus proche du centre est la carte active. */
  const mesure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let dist = Infinity;
    Array.from(el.querySelectorAll<HTMLElement>("[data-carte]")).forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    setActif(best);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(mesure);
    };
    el.addEventListener("scroll", on, { passive: true });
    mesure();
    return () => {
      el.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, [mesure, biens, filtre]);

  /* Téléphone : une petite invitation à glisser quand la liste arrive à l’écran. */
  useEffect(() => {
    const el = rail.current;
    if (!el || !biens?.length || touche) return;
    if (!window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        window.setTimeout(() => {
          if (el.scrollLeft > 4) return;
          el.scrollTo({ left: 70, behavior: "smooth" });
          window.setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 650);
        }, 500);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [biens, touche]);

  const aller = (i: number) => {
    const el = rail.current;
    const c = el?.querySelectorAll<HTMLElement>("[data-carte]")[i];
    if (!el || !c) return;
    el.scrollTo({ left: c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
  };

  const nbTous = biens?.length || 0;

  return (
    <section id="biens" className="mx-auto w-full max-w-[1560px] px-3 pt-14 md:px-6 md:pt-[110px]">
      <div className="relative overflow-hidden rounded-[30px] pb-8 pt-9 text-white shadow-[0_50px_90px_-60px_rgba(19,36,61,0.9)] md:rounded-[40px] md:pb-12 md:pt-14" style={{ background: BLEU }}>
        <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full border-[48px] border-white/[0.06]" />
        <span aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 h-[300px] w-[300px] rounded-full border-[44px] border-white/[0.05]" />

        <div className="relative">
          {/* Le titre et les filtres */}
          <div className="mx-auto flex w-full max-w-[1320px] flex-wrap items-end justify-between gap-5 px-5 md:gap-6 md:px-10">
            <div>
              <h2 className="m-0 text-[28px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white md:text-[52px] md:leading-[1.04] md:tracking-[-0.035em]">Nos biens du moment</h2>
              <p className="m-0 mt-2.5 text-[14.5px] font-medium leading-relaxed text-brand-bt md:mt-3 md:text-[17px]">Ce qui est à vendre en ce moment chez Emilio, à Paris et dans les Hauts-de-Seine.</p>
            </div>
            <div role="group" aria-label="Filtrer les biens" className="no-scrollbar -mx-5 flex w-[calc(100%+40px)] gap-2 overflow-x-auto px-5 md:mx-0 md:w-auto md:px-0">
              {dispo.map((f) => (
                <button
                  key={f.k}
                  type="button"
                  aria-pressed={filtre === f.k}
                  onClick={() => {
                    setFiltre(f.k);
                    rail.current?.scrollTo({ left: 0 });
                  }}
                  className={cn(
                    "inline-flex h-11 flex-none items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] px-4 text-sm font-bold transition",
                    filtre === f.k ? "border-white bg-white text-brand-ink" : "border-white/25 text-white/80 hover:border-white/60",
                  )}
                >
                  {f.t}
                  <span className={cn("grid h-[22px] min-w-[22px] place-items-center rounded-full px-1 text-xs", filtre === f.k ? "bg-brand-ink/10 text-brand-ink" : "bg-white/10 text-white/80")}>{f.n}</span>
                </button>
              ))}
            </div>
          </div>

          {!biens ? (
            <div className="mt-8 flex gap-5 overflow-hidden px-5 md:mt-10 md:px-10">
              {[0, 1, 2, 3, 4].map((k) => <div key={k} className="h-[340px] w-[78vw] max-w-[320px] flex-none animate-pulse rounded-[26px] bg-white/10 md:w-[320px]" />)}
            </div>
          ) : (
            <>
              {/* Ordinateur : le défilé */}
              <div key={filtre} className="fx-fade mt-10 hidden md:block">
                <Defile liste={liste} onVue={setVue} calme={calme} />
              </div>

              {/* Téléphone : on glisse du doigt */}
              <div
                ref={rail}
                key={`tel-${filtre}`}
                onTouchStart={() => setTouche(true)}
                className="fx-fade no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[11vw] pb-3 pt-1 md:hidden"
              >
                {liste.map((p, i) => (
                  <div key={p.id} data-carte className={cn("flex-none snap-center transition duration-500 ease-out", actif === i ? "scale-100 opacity-100" : "scale-[0.93] opacity-70")}>
                    <Carte p={p} onVue={() => setVue(p)} className="w-[78vw] max-w-[320px]" />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-3.5 px-5 md:hidden">
                <span className="min-w-[44px] text-sm font-extrabold tabular-nums text-white" aria-live="polite">
                  {Math.min(actif + 1, total)} <span className="font-semibold text-white/60">/ {total}</span>
                </span>
                <div className="flex flex-1 gap-1.5">
                  {liste.map((p, i) => (
                    <button key={p.id} type="button" onClick={() => aller(i)} aria-label={`Bien ${i + 1}`} className="flex h-11 flex-1 items-center">
                      <span className={cn("block h-1.5 w-full rounded-full transition-colors duration-300", i === actif ? "bg-white" : i < actif ? "bg-white/45" : "bg-white/20")} />
                    </button>
                  ))}
                </div>
                {!touche && actif === 0 && (
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-bold text-[#F9C98A]">
                    <Hand className="anim-swipe h-4 w-4" /> Glissez
                  </span>
                )}
              </div>

              {/* Le bas de la tuile : tous les biens, et l’alerte */}
              <div className="mx-auto mt-5 flex w-full max-w-[1320px] flex-col gap-3 px-5 md:mt-9 md:flex-row md:items-center md:justify-between md:px-10">
                <span className="hidden text-[15px] font-semibold text-brand-bt md:inline">
                  {calme ? "Faites défiler les biens pour tous les voir." : "Passez la souris sur un bien pour arrêter le défilé."}
                </span>
                <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3">
                  <Link to="/acheter#recherche" className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-white/55 px-5 text-[15px] font-bold text-white transition hover:bg-white/10">
                    <Bell className="h-[18px] w-[18px]" /> Être prévenu en premier
                  </Link>
                  <Link to="/biens" className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-brand-orange px-6 text-[15px] font-bold text-brand-ink transition hover:brightness-105">
                    {nbTous > 1 ? `Voir nos ${nbTous} biens` : "Voir tous nos biens"} <ArrowRight className="h-[18px] w-[18px]" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {vue && <QuickViewPopup property={vue} open={!!vue} onClose={() => setVue(null)} />}
    </section>
  );
};

export default TuilesBiens;
