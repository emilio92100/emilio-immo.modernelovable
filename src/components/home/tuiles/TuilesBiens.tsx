/* ═══ Accueil « Tuiles » : nos biens du moment ═══════════════════════════════
   Des cartes qui défilent. Sur téléphone : on glisse du doigt, la carte au centre
   est mise en avant, une barre montre où l’on en est. Sur ordinateur : une barre de
   défilement sous les cartes, à cliquer ou à faire glisser. */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BedDouble, Bell, Camera, DoorOpen, Eye, Hand, MapPin, Maximize } from "lucide-react";
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

const nf = new Intl.NumberFormat("fr-FR");
const MAX = 8;

const Carte = ({ p, actif, onVue }: { p: Property; actif: boolean; onVue: () => void }) => {
  const plus = featureBadges(p)[0];
  return (
    <article
      data-carte
      className={cn(
        "group relative flex w-[84vw] max-w-[340px] flex-none snap-center flex-col gap-3.5 transition duration-500 ease-out md:w-[340px] md:snap-start",
        actif ? "max-md:scale-100 max-md:opacity-100" : "max-md:scale-[0.93] max-md:opacity-70",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-sky md:aspect-auto md:h-[250px]">
        {p.images[0] && (
          <img src={p.images[0]} alt={`${displayTitle(p)}, ${displayCity(p)}`} loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]" />
        )}
        <span className="absolute left-3.5 top-3.5 inline-flex h-[30px] items-center rounded-full bg-[rgba(19,36,61,0.78)] px-3 text-[12.5px] font-bold text-white">{p.type}</span>
        {p.exclusive && <span className="absolute left-3.5 top-[52px] inline-flex h-[26px] items-center rounded-full bg-brand-orange px-2.5 text-xs font-bold text-brand-ink">Exclusivité</span>}
        <button
          type="button"
          onClick={onVue}
          aria-label={`Vue rapide : ${displayTitle(p)}, ${displayCity(p)}`}
          className="absolute right-3 top-3 z-[2] grid h-11 w-11 place-items-center rounded-full bg-white/95 text-brand-ink shadow-[0_6px_16px_-8px_rgba(19,36,61,0.5)] transition hover:scale-105"
        >
          <Eye className="h-[18px] w-[18px]" />
        </button>
        <span className="absolute bottom-3.5 left-3.5 inline-flex h-[38px] items-center rounded-xl bg-white px-3.5 text-base font-extrabold text-brand-ink shadow-[0_6px_16px_-8px_rgba(19,36,61,0.4)]">{formatPrice(p.price)}</span>
        {p.images.length > 1 && (
          <span className="absolute bottom-3.5 right-3.5 inline-flex h-[30px] items-center gap-1.5 rounded-full bg-[rgba(19,36,61,0.7)] px-2.5 text-xs font-semibold text-white">
            <Camera className="h-3.5 w-3.5" /> {p.images.length}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 px-0.5">
        <h3 className="m-0 text-lg font-extrabold leading-snug tracking-[-0.02em] text-brand-ink">
          <Link to={`/biens/${p.id}`} className="after:absolute after:inset-0 after:z-[1] after:content-['']">
            {displayTitle(p)}
            {plus ? ` avec ${plus.toLowerCase()}` : ""}
          </Link>
        </h3>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-mut">
          <MapPin className="h-[15px] w-[15px]" /> {displayCity(p)} ({p.postalCode})
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 px-0.5">
        {p.surface > 0 && <Spec icon={<Maximize className="h-3.5 w-3.5" />} t={`${nf.format(p.surface)} m²`} />}
        {p.rooms > 0 && <Spec icon={<DoorOpen className="h-3.5 w-3.5" />} t={`${p.rooms} pièce${p.rooms > 1 ? "s" : ""}`} />}
        {p.bedrooms > 0 && <Spec icon={<BedDouble className="h-3.5 w-3.5" />} t={`${p.bedrooms} chambre${p.bedrooms > 1 ? "s" : ""}`} />}
      </div>
    </article>
  );
};

const Spec = ({ icon, t }: { icon: JSX.Element; t: string }) => (
  <span className="inline-flex h-8 items-center gap-1.5 rounded-[10px] bg-brand-surf px-2.5 text-[13px] font-bold text-[#33445B]">{icon}{t}</span>
);

const Alerte = () => (
  <Link
    to="/acheter#recherche"
    data-carte
    className="relative flex w-[78vw] max-w-[300px] flex-none snap-center flex-col justify-between overflow-hidden rounded-3xl bg-brand p-[30px] text-white md:min-h-[372px] md:w-[300px] md:snap-start"
  >
    <span aria-hidden className="absolute -right-[70px] -top-[70px] h-[220px] w-[220px] rounded-full border-[34px] border-white/[0.07]" />
    <span className="relative flex flex-col">
      <span className="grid h-[52px] w-[52px] place-items-center rounded-2xl bg-white/[0.12]"><Bell className="h-6 w-6" /></span>
      <span className="mb-2.5 mt-[22px] text-[22px] font-extrabold leading-[1.15] tracking-[-0.03em] md:text-[26px]">Soyez prévenu en premier</span>
      <span className="text-[15px] leading-[1.55] text-white/80">Les nouveaux biens dès leur arrivée, parfois avant leur mise en ligne.</span>
    </span>
    <span className="relative mt-7 inline-flex h-[52px] items-center gap-2.5 self-start rounded-2xl bg-brand-orange px-6 text-[15px] font-bold text-brand-ink">
      Créer mon alerte <ArrowRight className="h-[18px] w-[18px]" />
    </span>
  </Link>
);

const Encore = ({ n }: { n: number }) => (
  <Link
    to="/biens"
    data-carte
    className="flex w-[78vw] max-w-[300px] flex-none snap-center flex-col items-start justify-end gap-3 rounded-3xl bg-brand-sky p-[30px] text-brand-ink transition hover:bg-brand-tint md:min-h-[372px] md:w-[300px] md:snap-start"
  >
    <span className="text-[56px] font-extrabold leading-none tracking-[-0.04em] text-brand">+{n}</span>
    <span className="text-[22px] font-extrabold leading-tight tracking-[-0.03em]">biens à découvrir</span>
    <span className="mt-3 inline-flex h-[52px] items-center gap-2.5 rounded-2xl bg-brand px-6 text-[15px] font-bold text-white">
      Voir tous nos biens <ArrowRight className="h-[18px] w-[18px]" />
    </span>
  </Link>
);

/* Ordinateur : la barre de défilement sous les cartes, à la place des flèches.
   Un clic sur la barre y emmène en douceur ; on peut aussi attraper la poignée et la faire glisser, ou utiliser les flèches du clavier. */
const BarreDefilement = ({ rail, cle, id }: { rail: React.RefObject<HTMLDivElement>; cle: string; id: string }) => {
  const piste = useRef<HTMLDivElement>(null);
  const prise = useRef<{ x: number; depart: number } | null>(null);
  const [pos, setPos] = useState({ debut: 0, taille: 1 });
  const [tenue, setTenue] = useState(false);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const maj = () => {
      const max = el.scrollWidth - el.clientWidth;
      const taille = el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1;
      setPos({ taille, debut: max > 0 ? (el.scrollLeft / max) * (1 - taille) : 0 });
    };
    maj();
    el.addEventListener("scroll", maj, { passive: true });
    const ro = new ResizeObserver(maj);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", maj);
      ro.disconnect();
    };
  }, [rail, cle]);

  if (pos.taille >= 0.995) return null;

  const allerA = (fraction: number, doux = true) => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const debut = Math.max(0, Math.min(1 - pos.taille, fraction - pos.taille / 2));
    el.scrollTo({ left: (debut / (1 - pos.taille)) * max, behavior: doux ? "smooth" : "auto" });
  };

  const clicPiste = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).dataset.poignee) return;
    const r = piste.current!.getBoundingClientRect();
    allerA((e.clientX - r.left) / r.width);
  };

  const attraper = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = rail.current;
    if (!el) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    prise.current = { x: e.clientX, depart: el.scrollLeft };
    el.style.scrollSnapType = "none"; // pas d’aimant pendant qu’on fait glisser
    setTenue(true);
  };
  const bouger = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = rail.current;
    const p = prise.current;
    if (!el || !p || !piste.current) return;
    el.scrollLeft = p.depart + (e.clientX - p.x) * (el.scrollWidth / piste.current.clientWidth);
  };
  const lacher = () => {
    if (!prise.current) return;
    prise.current = null;
    setTenue(false);
    if (rail.current) rail.current.style.scrollSnapType = "";
  };

  const clavier = (e: React.KeyboardEvent) => {
    const el = rail.current;
    if (!el) return;
    const pasCarte = 360;
    if (e.key === "ArrowRight") el.scrollBy({ left: pasCarte, behavior: "smooth" });
    else if (e.key === "ArrowLeft") el.scrollBy({ left: -pasCarte, behavior: "smooth" });
    else if (e.key === "Home") el.scrollTo({ left: 0, behavior: "smooth" });
    else if (e.key === "End") el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else return;
    e.preventDefault();
  };

  const avance = pos.taille < 1 ? Math.round((pos.debut / (1 - pos.taille)) * 100) : 0;
  return (
    <div
      ref={piste}
      role="scrollbar"
      aria-controls={id}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={avance}
      aria-label="Faire défiler les biens"
      tabIndex={0}
      onClick={clicPiste}
      onKeyDown={clavier}
      className="group/barre relative hidden h-7 cursor-pointer items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand/40 md:flex"
    >
      <span aria-hidden className={cn("absolute inset-x-0 rounded-full bg-[#E2E8F0] transition-all duration-200", tenue ? "h-2.5" : "h-1.5 group-hover/barre:h-2.5")} />
      <span
        data-poignee="1"
        aria-hidden
        onPointerDown={attraper}
        onPointerMove={bouger}
        onPointerUp={lacher}
        onPointerCancel={lacher}
        className={cn(
          "absolute rounded-full bg-brand transition-[height,background-color] duration-200 hover:bg-brand-ink",
          tenue ? "h-2.5 cursor-grabbing bg-brand-ink" : "h-1.5 cursor-grab group-hover/barre:h-2.5",
        )}
        style={{ left: `${pos.debut * 100}%`, width: `${pos.taille * 100}%` }}
      >
        <span className="absolute -inset-y-3 inset-x-0" />
      </span>
    </div>
  );
};

const TuilesBiens = () => {
  const biens = useBiens();
  const [filtre, setFiltre] = useState("tous");
  const [vue, setVue] = useState<Property | null>(null);
  const [actif, setActif] = useState(0);
  const [touche, setTouche] = useState(false);
  const rail = useRef<HTMLDivElement>(null);

  const dispo = useMemo(() => FILTRES.map((f) => ({ ...f, n: (biens || []).filter(f.test).length })).filter((f) => f.k === "tous" || f.n > 0), [biens]);
  const tous = useMemo(() => (biens || []).filter((FILTRES.find((f) => f.k === filtre) || FILTRES[0]).test), [biens, filtre]);
  /* Huit biens au plus sur l’accueil : le reste est sur la page Nos biens. */
  const liste = tous.slice(0, MAX);
  const total = liste.length + (tous.length > MAX ? 2 : 1);

  /* Carte la plus proche du centre = carte active. */
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

  /* Sur téléphone, une petite invitation à glisser quand la liste arrive à l’écran. */
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
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    el.scrollTo({ left: desktop ? c.offsetLeft - 40 : c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <section id="biens" className="mx-auto w-full max-w-[1320px] px-4 pt-14 md:px-10 md:pt-[110px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="m-0 text-[28px] font-extrabold leading-[1.08] tracking-[-0.03em] text-brand-ink md:text-[52px] md:leading-[1.04] md:tracking-[-0.035em]">Nos biens du moment</h2>
          <p className="m-0 mt-2.5 text-[14.5px] font-medium leading-relaxed text-brand-mut md:mt-3 md:text-[17px]">Ce qui est à vendre en ce moment chez Emilio, avec les vraies photos.</p>
        </div>
        <div className="flex w-full min-w-0 items-center gap-2.5 md:w-auto">
          <div role="group" aria-label="Filtrer les biens" className="no-scrollbar -mx-4 flex flex-1 gap-2 overflow-x-auto px-4 md:mx-0 md:flex-none md:px-0">
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
                  filtre === f.k ? "border-brand-ink bg-brand-ink text-white" : "border-[#E2E8F0] text-brand-mut hover:border-brand-ink/40",
                )}
              >
                {f.t}
                <span className={cn("grid h-[22px] min-w-[22px] place-items-center rounded-full px-1 text-xs", filtre === f.k ? "bg-white/20 text-white" : "bg-brand-surf text-brand-mut")}>{f.n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {!biens ? (
        <div className="mt-8 flex gap-5 overflow-hidden md:mt-9">
          {[0, 1, 2, 3].map((k) => <div key={k} className="h-[372px] w-[84vw] max-w-[340px] flex-none animate-pulse rounded-3xl bg-brand-surf md:w-[340px]" />)}
        </div>
      ) : (
        <>
          <div
            ref={rail}
            id="rail-biens"
            key={filtre}
            onTouchStart={() => setTouche(true)}
            className="fx-fade no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[8vw] pb-4 pt-1 md:-mx-10 md:mt-9 md:gap-5 md:px-10 md:pb-6 md:[scroll-padding-inline:40px]"
          >
            {liste.map((p, i) => <Carte key={p.id} p={p} actif={actif === i} onVue={() => setVue(p)} />)}
            {tous.length > MAX && <Encore n={tous.length - MAX} />}
            <Alerte />
          </div>

          {/* Ordinateur : la barre de défilement */}
          <BarreDefilement rail={rail} cle={`${filtre}-${liste.length}`} id="rail-biens" />

          {/* Téléphone : où en est-on, et une invitation à glisser */}
          <div className="mt-1 flex items-center gap-3.5 md:hidden">
            <span className="min-w-[44px] text-sm font-extrabold tabular-nums text-brand-ink" aria-live="polite">
              {Math.min(actif + 1, total)} <span className="font-semibold text-brand-mut">/ {total}</span>
            </span>
            <div className="flex flex-1 gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <button key={i} type="button" onClick={() => aller(i)} aria-label={i < liste.length ? `Bien ${i + 1}` : i === total - 1 ? "Créer une alerte" : "Voir tous nos biens"} className="flex h-11 flex-1 items-center">
                  <span className={cn("block h-1.5 w-full rounded-full transition-colors duration-300", i === actif ? "bg-brand" : i < actif ? "bg-brand/35" : "bg-[#D8E1EC]")} />
                </button>
              ))}
            </div>
            {!touche && actif === 0 && (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-bold text-brand-orange-text">
                <Hand className="h-4 w-4 anim-swipe" /> Glissez
              </span>
            )}
          </div>

          <div className="mt-6 flex justify-center md:mt-4 md:justify-start">
            <Link to="/biens" className="inline-flex h-[52px] items-center gap-2.5 rounded-2xl bg-brand-surf px-6 text-[15px] font-bold text-brand-ink transition hover:bg-brand-sky">
              {(biens?.length || 0) > MAX ? `Voir nos ${biens?.length} biens` : "Voir tous nos biens"} <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </div>
        </>
      )}
      {vue && <QuickViewPopup property={vue} open={!!vue} onClose={() => setVue(null)} />}
    </section>
  );
};

export default TuilesBiens;
