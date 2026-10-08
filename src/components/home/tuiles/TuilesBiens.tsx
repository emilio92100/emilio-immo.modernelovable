/* ═══ Accueil « Tuiles » : nos biens du moment ═══════════════════════════════
   Maquette B (8 oct. 2026, Alexandre : « moins mettre cette partie bleue, assez imposante ») :
   une tuile gris très clair, et des cartes-photos un peu plus larges que hautes (5/4), le prix, le titre
   et la ville sur la photo ; pas la ligne des surfaces (Alexandre : « ça fait remonter les infos, on ne voit
   pas assez bien les photos »).
   Ordinateur : les biens défilent doucement tout seuls ; le défilé s’arrête quand on passe la souris dessus.
   Téléphone : les biens défilent aussi tout seuls (Alexandre, 8 oct. : « comme sur le PC ») ; le doigt arrête la
   rangée et la fait glisser, elle repart quand on la lâche.
   Si l’appareil demande moins d’animations, pas de défilé : on fait défiler soi-même. */
import { useEffect, useMemo, useRef, useState } from "react";
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

/* Dix biens au plus sur l’accueil : le reste est sur la page Nos biens. */
const MAX = 10;
const PAS = 360 + 20; // largeur d’une carte sur ordinateur + l’espace entre deux cartes

/** La carte-photo d’un bien : la photo en entier, le prix, le titre et la ville posés dessus.
    `cachee` : copie qui sert seulement à faire boucler le défilé (ni lue, ni atteinte au clavier). */
const Carte = ({ p, onVue, cachee, className }: { p: Property; onVue: () => void; cachee?: boolean; className?: string }) => {
  const plus = featureBadges(p)[0];
  const sansClavier = cachee ? { tabIndex: -1 } : {};
  return (
    <article
      {...(cachee ? { "aria-hidden": true } : {})}
      className={cn("group relative isolate flex aspect-[5/4] flex-none flex-col justify-end overflow-hidden rounded-[24px] bg-brand-sky text-white shadow-[0_26px_44px_-30px_rgba(19,36,61,0.75)] transition duration-300 md:rounded-[26px] md:hover:-translate-y-1.5", className)}
    >
      {p.images[0] && (
        <img src={p.images[0]} alt={cachee ? "" : `${displayTitle(p)}, ${displayCity(p)}`} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]" />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(19,36,61,0)_44%,rgba(19,36,61,0.5)_68%,rgba(19,36,61,0.86)_100%)]" />
      {p.exclusive && <span className="absolute left-3 top-3 z-[2] inline-flex h-[26px] items-center rounded-full bg-brand-orange px-2.5 text-xs font-extrabold text-brand-ink">Exclusivité</span>}
        <button
          type="button"
          onClick={onVue}
          aria-label={`Vue rapide : ${displayTitle(p)}, ${displayCity(p)}`}
          {...sansClavier}
          className="absolute right-3 top-3 z-[2] grid h-10 w-10 place-items-center rounded-full bg-white/95 text-brand-ink shadow-[0_6px_16px_-8px_rgba(19,36,61,0.5)] transition hover:scale-105"
        >
          <Eye className="h-4 w-4" />
        </button>
      {/* Le texte n’est pas positionné : le lien du titre (son ::after) couvre ainsi toute la carte, photo comprise */}
      <div className="flex flex-col gap-1 p-[18px]">
        <span className="text-[23px] font-extrabold leading-tight tracking-[-0.02em]">{formatPrice(p.price)}</span>
        <h3 className="m-0 line-clamp-1 text-[15.5px] font-bold leading-snug">
          <Link to={`/biens/${p.id}`} {...sansClavier} className="after:absolute after:inset-0 after:z-[1] after:content-['']">
            {displayTitle(p)}
            {plus ? ` avec ${plus.toLowerCase()}` : ""}
          </Link>
        </h3>
        <span className="flex min-w-0 items-center gap-1.5 text-[13px] font-semibold text-white/85">
          <MapPin className="h-[14px] w-[14px] flex-none" /> <span className="truncate">{displayCity(p)} ({p.postalCode})</span>
        </span>
      </div>
    </article>
  );
};

/** La rangée de biens qui passe toute seule (deux fois la même suite, pour boucler sans à-coup).
    Le mouvement est piloté image par image. Ordinateur : au survol (ou au clavier), il ralentit en douceur
    jusqu’à l’arrêt, puis repart quand la souris s’en va. Téléphone (`tactile`) : la rangée avance aussi toute
    seule (Alexandre : « un petit effet de mouvement… comme sur le PC ») ; le doigt l’arrête et la fait glisser,
    elle repart doucement deux secondes et demie après qu’on l’a lâchée. Le défilement vertical de la page reste
    libre (touch-action: pan-y). */
const VITESSE = PAS / 6.5; // pixels par seconde, ordinateur
const VITESSE_TEL = 34; // pixels par seconde, téléphone : plus lent, les cartes sont presque de la largeur de l’écran
const DOUCEUR = 0.4; // en secondes : plus c’est grand, plus le freinage et le redémarrage sont doux

const Defile = ({ liste, onVue, calme, tactile = false }: { liste: Property[]; onVue: (p: Property) => void; calme: boolean; tactile?: boolean }) => {
  const zone = useRef<HTMLDivElement>(null);
  const piste = useRef<HTMLDivElement>(null);
  const arret = useRef({ souris: false, clavier: false, doigt: false });
  const pos = useRef(0); // le décalage de la rangée, en pixels (négatif : elle est partie vers la gauche)
  const glisse = useRef<{ x0: number; p0: number; bouge: boolean; id: number } | null>(null);
  const sansClic = useRef(false);
  const reprise = useRef(0);
  const vitesse = tactile ? VITESSE_TEL : VITESSE;
  const largeur = tactile ? "w-[80vw] max-w-[330px]" : "w-[360px]";

  useEffect(() => {
    const el = piste.current;
    const z = zone.current;
    if (calme || !el || !z) return;
    let v = vitesse;
    let avant = performance.now();
    let visible = true;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(z);
    const image = (t: number) => {
      const dt = Math.min(0.05, (t - avant) / 1000);
      avant = t;
      if (visible && !document.hidden) {
        const a = arret.current;
        const cible = a.souris || a.clavier || a.doigt ? 0 : vitesse;
        v += (cible - v) * (1 - Math.exp(-dt / DOUCEUR));
        if (!glisse.current) pos.current -= v * dt;
        // boucler : la rangée reste entre -moitié et 0 (la copie prend le relais), y compris pendant qu’on la tire
        const moitie = el.scrollWidth / 2;
        if (moitie > 0) {
          const avantCalage = pos.current;
          while (pos.current <= -moitie) pos.current += moitie;
          while (pos.current > 0) pos.current -= moitie;
          if (glisse.current) glisse.current.p0 += pos.current - avantCalage;
        }
        el.style.transform = `translate3d(${pos.current.toFixed(2)}px,0,0)`;
      }
      raf = requestAnimationFrame(image);
    };
    raf = requestAnimationFrame(image);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.clearTimeout(reprise.current);
    };
  }, [calme, liste, vitesse]);

  if (calme) {
    // moins d’animations demandé : une simple rangée qu’on fait défiler soi-même
    return (
      <div className={cn("flex overflow-x-auto pb-4", tactile ? "gap-3 px-5" : "gap-5 px-10")}>
        {liste.map((p) => <Carte key={p.id} p={p} onVue={() => onVue(p)} className={largeur} />)}
      </div>
    );
  }
  // assez de cartes pour remplir l’écran, même avec un seul bien
  const fois = liste.length ? Math.max(1, Math.ceil(1800 / (liste.length * PAS))) : 0;
  const base = Array.from({ length: fois }).flatMap(() => liste);
  const serie = [...base, ...base];

  const lacher = () => {
    const g = glisse.current;
    glisse.current = null;
    if (g?.bouge) {
      sansClic.current = true;
      window.setTimeout(() => (sansClic.current = false), 60);
    }
    window.clearTimeout(reprise.current);
    reprise.current = window.setTimeout(() => (arret.current.doigt = false), 2500);
  };

  return (
    <div
      ref={zone}
      onPointerEnter={(e) => e.pointerType === "mouse" && (arret.current.souris = true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && (arret.current.souris = false)}
      onPointerDown={(e) => {
        if (!tactile || e.pointerType === "mouse") return;
        window.clearTimeout(reprise.current);
        arret.current.doigt = true;
        glisse.current = { x0: e.clientX, p0: pos.current, bouge: false, id: e.pointerId };
      }}
      onPointerMove={(e) => {
        const g = glisse.current;
        if (!g || g.id !== e.pointerId) return;
        const dx = e.clientX - g.x0;
        if (Math.abs(dx) > 6) g.bouge = true;
        pos.current = g.p0 + dx;
      }}
      onPointerUp={lacher}
      onPointerCancel={lacher}
      onClickCapture={(e) => {
        if (sansClic.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onFocus={() => (arret.current.clavier = true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) arret.current.clavier = false;
      }}
      className={cn("relative", tactile ? "touch-pan-y select-none [mask-image:linear-gradient(90deg,transparent_0,#000_4%,#000_96%,transparent_100%)]" : "[mask-image:linear-gradient(90deg,transparent_0,#000_6%,#000_94%,transparent_100%)]")}
    >
      <div ref={piste} className="flex w-max py-2 will-change-transform">
        {serie.map((p, k) => (
          <div key={`${p.id}-${k}`} className={cn("flex-none", tactile ? "pr-3" : "pr-5")}>
            <Carte p={p} onVue={() => onVue(p)} cachee={k >= liste.length} className={largeur} />
          </div>
        ))}
      </div>
    </div>
  );
};

/** Les filtres. Sur téléphone, ils défilent de côté : un fondu sur le bord montre qu’il y en a d’autres,
    et à l’arrivée ils glissent un peu tout seuls, pour montrer qu’on peut les faire défiler. */
const Filtres = ({ dispo, filtre, choisir }: { dispo: { k: string; t: string; n: number }[]; filtre: string; choisir: (k: string) => void }) => {
  const el = useRef<HTMLDivElement>(null);
  const [bords, setBords] = useState({ g: false, d: false });

  useEffect(() => {
    const e = el.current;
    if (!e) return;
    const maj = () => setBords({ g: e.scrollLeft > 4, d: e.scrollLeft + e.clientWidth < e.scrollWidth - 4 });
    maj();
    e.addEventListener("scroll", maj, { passive: true });
    const ro = new ResizeObserver(maj);
    ro.observe(e);
    return () => {
      e.removeEventListener("scroll", maj);
      ro.disconnect();
    };
  }, [dispo.length]);

  useEffect(() => {
    const e = el.current;
    if (!e || window.matchMedia("(min-width: 768px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([x]) => {
        if (!x.isIntersecting) return;
        io.disconnect();
        if (e.scrollWidth <= e.clientWidth + 4) return;
        window.setTimeout(() => {
          if (e.scrollLeft > 4) return;
          e.scrollTo({ left: 60, behavior: "smooth" });
          window.setTimeout(() => e.scrollTo({ left: 0, behavior: "smooth" }), 650);
        }, 1400);
      },
      { threshold: 0.9 },
    );
    io.observe(e);
    return () => io.disconnect();
  }, [dispo.length]);

  const masque = `linear-gradient(90deg, ${bords.g ? "transparent 0, #000 28px" : "#000 0"}, ${bords.d ? "#000 calc(100% - 48px), transparent 100%" : "#000 100%"})`;
  return (
    <div
      ref={el}
      role="group"
      aria-label="Filtrer les biens"
      className="no-scrollbar -mx-5 flex w-[calc(100%+40px)] gap-2 overflow-x-auto px-5 md:mx-0 md:w-auto md:px-0"
      style={{ WebkitMaskImage: masque, maskImage: masque }}
    >
      {dispo.map((f) => (
        <button
          key={f.k}
          type="button"
          aria-pressed={filtre === f.k}
          onClick={() => choisir(f.k)}
          className={cn(
            "inline-flex h-10 flex-none items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] px-3.5 text-[13.5px] font-bold transition md:h-11 md:px-4 md:text-sm",
            filtre === f.k ? "border-brand bg-brand text-white" : "border-brand-line2 bg-white text-[#33445B] hover:border-brand-bt",
          )}
        >
          {f.t}
          <span className={cn("grid h-[22px] min-w-[22px] place-items-center rounded-full px-1 text-xs", filtre === f.k ? "bg-white/20 text-white" : "bg-brand-surf text-brand-mut")}>{f.n}</span>
        </button>
      ))}
    </div>
  );
};

const TuilesBiens = () => {
  const biens = useBiens();
  const calme = !!useReducedMotion();
  const [filtre, setFiltre] = useState("tous");
  const [vue, setVue] = useState<Property | null>(null);
  const dispo = useMemo(() => FILTRES.map((f) => ({ ...f, n: (biens || []).filter(f.test).length })).filter((f) => f.k === "tous" || f.n > 0), [biens]);
  const tous = useMemo(() => (biens || []).filter((FILTRES.find((f) => f.k === filtre) || FILTRES[0]).test), [biens, filtre]);
  const liste = tous.slice(0, MAX);

  const nbTous = biens?.length || 0;

  return (
    <section id="biens" className="mx-auto w-full max-w-[1560px] px-3 pt-12 md:px-6 md:pt-6">
      <div className="relative overflow-hidden rounded-[30px] bg-brand-pale pb-7 pt-8 text-brand-ink md:rounded-[36px] md:pb-10 md:pt-12">

        <div className="relative">
          {/* Le titre et les filtres */}
          <div className="mx-auto flex w-full max-w-[1320px] flex-wrap items-end justify-between gap-5 px-5 md:gap-6 md:px-10">
            <div>
              <h2 className="m-0 text-[28px] font-extrabold leading-[1.08] tracking-[-0.03em] text-brand-ink md:text-[44px] md:leading-[1.04] md:tracking-[-0.035em]">Nos biens du moment</h2>
              <p className="m-0 mt-2 text-[14.5px] font-medium leading-relaxed text-brand-mut md:mt-2.5 md:text-[17px]">Ce qui est à vendre en ce moment chez Emilio, à Paris et dans les Hauts-de-Seine.</p>
            </div>
            <Filtres
              dispo={dispo}
              filtre={filtre}
              choisir={setFiltre}
            />
          </div>

          {!biens ? (
            <div className="mt-8 flex gap-5 overflow-hidden px-5 md:mt-10 md:px-10">
              {[0, 1, 2, 3, 4].map((k) => <div key={k} className="aspect-[5/4] w-[84vw] max-w-[340px] flex-none animate-pulse rounded-[26px] bg-white md:w-[360px]" />)}
            </div>
          ) : (
            <>
              {/* Ordinateur : le défilé */}
              <div key={filtre} className="fx-fade mt-8 hidden md:block">
                <Defile liste={liste} onVue={setVue} calme={calme} />
              </div>

              {/* Téléphone : le même défilé, qu’on arrête et fait glisser du doigt */}
              <div key={`tel-${filtre}`} className="fx-fade mt-6 md:hidden">
                <Defile liste={liste} onVue={setVue} calme={calme} tactile />
              </div>
              <p className="m-0 mt-2 flex items-center gap-1.5 px-5 text-[13px] font-semibold text-brand-mut md:hidden">
                <Hand className="h-4 w-4 flex-none text-brand-orange-text" />
                {calme ? "Faites glisser pour voir tous les biens." : "Glissez du doigt pour les parcourir, touchez un bien pour le voir."}
              </p>

              {/* Le bas de la tuile : tous les biens, et l’alerte */}
              <div className="mx-auto mt-5 flex w-full max-w-[1320px] flex-col gap-3 px-5 md:mt-8 md:flex-row md:items-center md:justify-between md:px-10">
                <span className="hidden text-[15px] font-semibold text-brand-mut md:inline">
                  {calme ? "Faites défiler les biens pour tous les voir." : "Passez la souris sur un bien pour arrêter le défilé."}
                </span>
                <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3">
                  <Link to="/acheter#recherche" className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-brand-line bg-white px-5 text-[15px] font-bold text-brand transition hover:border-brand-bt">
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
