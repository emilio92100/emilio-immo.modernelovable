/* « Nos biens » (refonte 2026, direction « Tuiles ») : grand bandeau bleu avec les biens du moment,
   recherche au style du site, tri par prix, vue en grille ou par ville avec une transition douce. */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownUp, ArrowRight, BedDouble, Building2, Check, ChevronRight, DoorOpen, Layers, LayoutGrid, Lock, MapPin, Phone, Search, SlidersHorizontal, Wallet, X } from "lucide-react";
import PropertyCard, { displayCity } from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { SITE_URL } from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import { Property, fetchPropertiesFromFeed, formatPrice, mockProperties } from "@/lib/properties";
import { cityList } from "@/lib/cities";
import { Souligne, TEL, TEL_HREF } from "@/components/site/ui";
import { Choix, type Option } from "@/components/home/tuiles/Choix";

const nf = new Intl.NumberFormat("fr-FR");

const TYPES: Option[] = [
  { v: "", t: "Tous les biens" },
  { v: "Appartement", t: "Appartements" },
  { v: "Maison", t: "Maisons" },
  { v: "Immeuble", t: "Immeubles" },
];
const PIECES: Option[] = [
  { v: "", t: "Peu importe" },
  { v: "1", t: "1 pièce" },
  { v: "2", t: "2 pièces" },
  { v: "3", t: "3 pièces" },
  { v: "4", t: "4 pièces" },
  { v: "5", t: "5 pièces et plus" },
];
const BUDGETS: Option[] = [{ v: "", t: "Peu importe" }, ...[500000, 800000, 1000000, 1500000, 2000000, 3000000].map((b) => ({ v: String(b), t: `Jusqu’à ${nf.format(b)} €` }))];
const CHAMBRES: Option[] = [{ v: "", t: "Peu importe" }, ...["1", "2", "3", "4"].map((c) => ({ v: c, t: `${c} chambre${c === "1" ? "" : "s"} ou plus` }))];
const ETAGES: Option[] = [
  { v: "any", t: "Peu importe" },
  { v: "rdc", t: "Rez-de-chaussée" },
  { v: "etage", t: "En étage" },
  { v: "dernier", t: "Dernier étage" },
];
const TRIS: Option[] = [
  { v: "asc", t: "Prix croissant" },
  { v: "desc", t: "Prix décroissant" },
];

/** « Paris 15e », « 75015 », « Boulogne » ou plusieurs lieux séparés par des virgules. */
const sansAccent = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const matchVille = (p: Property, saisie: string) =>
  saisie.split(/[,;]/).map(sansAccent).filter(Boolean).some((v) => {
    const arr = v.match(/^paris\s*(\d{1,2})/);
    if (arr) return p.postalCode === `750${arr[1].padStart(2, "0")}`;
    return sansAccent(p.city).includes(v) || p.postalCode.startsWith(v);
  });

/* ── Les biens du moment, en éventail dans le bandeau bleu ── */
const Eventail = ({ biens }: { biens: Property[] | null }) => {
  /* Seulement de vrais biens avec de vraies photos (pas l’annonce d’exemple ni une photo d’illustration) */
  const trois = (biens || []).filter((p) => p.images[0] && !p.id.includes("fictif")).slice(0, 3);
  const places = [
    { cls: "left-0 top-[58px] z-[1]", rot: -7, bob: "anim-bob-a" },
    { cls: "left-1/2 top-0 z-[3] -ml-[125px]", rot: 2, bob: "anim-bob-b" },
    { cls: "right-0 top-[84px] z-[2]", rot: 8, bob: "anim-bob-c" },
  ];
  return (
    <div className="relative h-[400px]">
      {places.map((pl, i) => {
        const p = trois[i];
        return (
          <div key={i} className={cn("absolute w-[250px]", pl.cls)}>
            <div className={pl.bob} style={{ animationDelay: `-${i * 1.6}s` }}>
              <div style={{ transform: `rotate(${pl.rot}deg)` }}>
                {p ? (
                  <Link to={`/biens/${p.id}`} className="group block rounded-[26px] bg-white p-2 shadow-[0_40px_70px_-30px_rgba(5,14,30,0.75)] transition duration-300 hover:-translate-y-1.5">
                    <span className="relative block h-[180px] overflow-hidden rounded-[20px] bg-brand-sky">
                      <img src={p.images[0]} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <span className="absolute left-2.5 top-2.5 inline-flex h-7 items-center rounded-full bg-[rgba(19,36,61,0.78)] px-2.5 text-[12px] font-bold text-white">{p.type}</span>
                    </span>
                    <span className="flex items-end justify-between gap-2 px-2 pb-1.5 pt-2.5">
                      <span className="flex min-w-0 flex-col leading-tight">
                        <span className="text-[17px] font-extrabold text-brand-ink">{formatPrice(p.price)}</span>
                        <span className="truncate text-[12.5px] font-semibold text-brand-mut">{displayCity(p)}</span>
                      </span>
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand-surf text-brand transition group-hover:bg-brand-orange group-hover:text-brand-ink">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </span>
                  </Link>
                ) : (
                  <div className="h-[252px] rounded-[26px] bg-white/10" />
                )}
              </div>
            </div>
          </div>
        );
      })}
      <span className="absolute bottom-6 left-6 z-[4] inline-flex h-10 items-center gap-2 rounded-full bg-brand-orange pl-1.5 pr-4 text-[13.5px] font-extrabold text-brand-ink shadow-[0_16px_30px_-14px_rgba(5,14,30,0.6)]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/70"><Lock className="h-3.5 w-3.5" /></span>
        Et d’autres, hors marché
      </span>
    </div>
  );
};

/** Un interrupteur en pilule (balcon, terrasse, ascenseur). */
const Interrupteur = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={cn("inline-flex h-11 items-center gap-2 rounded-full px-4 text-[14.5px] font-bold transition", on ? "bg-brand text-white" : "bg-brand-surf text-brand-ink hover:bg-[#EAEFF5]")}
  >
    <span className={cn("grid h-5 w-5 place-items-center rounded-full transition", on ? "bg-brand-orange text-brand-ink" : "bg-white text-transparent")}>
      <Check className="h-3 w-3" strokeWidth={3.2} />
    </span>
    {children}
  </button>
);

const Properties = () => {
  const reduit = !!useReducedMotion();
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [ville, setVille] = useState("");
  const [showSugg, setShowSugg] = useState(false);
  const [type, setType] = useState("");
  const [pieces, setPieces] = useState("");
  const [budget, setBudget] = useState("");
  const [plus, setPlus] = useState(false);
  /* Le panneau des filtres coupe ce qui dépasse seulement pendant qu’il s’ouvre (sinon les menus seraient cachés) */
  const [plusOuvert, setPlusOuvert] = useState(false);
  const [chambres, setChambres] = useState("");
  const [etage, setEtage] = useState("any");
  const [balcon, setBalcon] = useState(false);
  const [terrasse, setTerrasse] = useState(false);
  const [ascenseur, setAscenseur] = useState(false);
  const [tri, setTri] = useState("");
  const [vue, setVue] = useState<"grille" | "ville">("grille");
  const resultats = useRef<HTMLDivElement>(null);

  /* Recherche lancée depuis l’accueil : /biens?ville=…&budget=… */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const v = q.get("ville");
    const b = q.get("budget");
    if (v) setVille(v.slice(0, 80));
    if (b && /^\d+$/.test(b)) setBudget(b);
  }, []);

  useEffect(() => {
    let on = true;
    fetchPropertiesFromFeed()
      .then((d) => on && setProperties(d))
      .catch(() => on && setProperties(mockProperties));
    return () => {
      on = false;
    };
  }, []);

  const list = useMemo(() => properties || [], [properties]);
  const villes = useMemo(() => [...new Set(list.map((p) => p.city))].sort(), [list]);
  const sugg = ville ? villes.filter((c) => sansAccent(c).includes(sansAccent(ville))).slice(0, 6) : [];

  const filtres = useMemo(() => {
    const out = list.filter((p) => {
      if (ville && !matchVille(p, ville)) return false;
      if (type && !p.type.toLowerCase().includes(type.toLowerCase())) return false;
      if (pieces && (pieces === "5" ? p.rooms < 5 : p.rooms !== Number(pieces))) return false;
      if (budget && p.price > Number(budget)) return false;
      if (chambres && p.bedrooms < Number(chambres)) return false;
      if (etage === "rdc" && p.floor !== 0) return false;
      if (etage === "etage" && (p.floor === undefined || p.floor === 0)) return false;
      if (etage === "dernier" && (p.floor === undefined || p.totalFloors === undefined || p.floor !== p.totalFloors)) return false;
      if (balcon && !p.balcony) return false;
      if (terrasse && !p.terrace) return false;
      if (ascenseur && !p.elevator) return false;
      return true;
    });
    if (tri === "asc") out.sort((a, b) => a.price - b.price);
    if (tri === "desc") out.sort((a, b) => b.price - a.price);
    return out;
  }, [list, ville, type, pieces, budget, chambres, etage, balcon, terrasse, ascenseur, tri]);

  const parVille = useMemo(() => {
    const m: Record<string, Property[]> = {};
    filtres.forEach((p) => (m[p.city] ||= []).push(p));
    return Object.entries(m).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtres]);

  const nbAvances = [chambres, etage !== "any", balcon, terrasse, ascenseur].filter(Boolean).length;
  const nbFiltres = [ville, type, pieces, budget].filter(Boolean).length + nbAvances;
  const reset = () => {
    setVille(""); setType(""); setPieces(""); setBudget(""); setChambres(""); setEtage("any"); setBalcon(false); setTerrasse(false); setAscenseur(false);
  };
  const voir = () => resultats.current?.scrollIntoView({ behavior: reduit ? "auto" : "smooth", block: "start" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Biens à vendre — Emilio Immobilier",
        url: `${SITE_URL}/biens`,
        inLanguage: "fr-FR",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Nos biens", item: `${SITE_URL}/biens` },
        ],
      },
    ],
  };

  const nbTexte = (n: number) => `${n} bien${n > 1 ? "s" : ""} à vendre`;
  const glisse = vue === "ville" ? 1 : -1;

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Biens à vendre à Paris et dans les Hauts-de-Seine | Emilio Immobilier"
        description="Appartements, maisons et immeubles à vendre à Paris 6e, 7e, 15e, 16e, 17e, Boulogne, Neuilly, Issy et dans les Hauts-de-Seine. Photos, prix et visites avec Emilio Immobilier."
        canonical={`${SITE_URL}/biens`}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="font-jakarta">
        {/* ── Le bandeau bleu ── */}
        <section className="mx-auto w-full max-w-[1560px] px-3 md:px-6">
          <div className="relative overflow-hidden rounded-[30px] bg-brand px-[22px] pb-[150px] pt-5 md:rounded-[40px] md:px-16 md:pb-[120px] md:pt-10">
            <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_78%_40%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_55%)]" />
            <span aria-hidden className="absolute right-[-160px] top-[-220px] h-[680px] w-[680px] rounded-full border border-white/10" />
            <span aria-hidden className="anim-spin-90 absolute right-[-300px] top-[-360px] h-[960px] w-[960px] rounded-full border border-dashed border-white/[.08]" />
            <span aria-hidden className="anim-bob-b absolute left-[46%] top-[18%] hidden h-2.5 w-2.5 rounded-full bg-brand-orange lg:block" />
            <div className="relative z-[1] grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_560px]">
              <div className="flex flex-col">
                <nav aria-label="Fil d’Ariane" className="flex items-center gap-2 text-[13.5px] font-semibold text-white/65">
                  <Link to="/" className="inline-flex min-h-[40px] items-center hover:text-white">Accueil</Link>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span aria-current="page" className="text-white">Nos biens</span>
                </nav>
                <span className="mt-2 inline-flex h-9 items-center gap-2 self-start rounded-full bg-white/[.12] px-3.5 text-[13.5px] font-bold text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#4ade80]/70" />
                    <span className="relative h-2 w-2 rounded-full bg-[#4ade80]" />
                  </span>
                  {properties ? `${list.length} biens à vendre en ce moment` : "Nos biens à vendre en ce moment"}
                </span>
                <h1 className="m-0 mt-4 text-[42px] font-extrabold leading-[1.02] tracking-[-0.035em] text-white md:mt-5 md:text-[68px]">
                  Nos biens à vendre
                  <span className="mt-2 block text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-[#F9C98A] md:mt-3 md:text-[30px]">à Paris et dans les Hauts-de-Seine</span>
                </h1>
                <p className="m-0 mt-4 max-w-[560px] text-base font-medium leading-[1.55] text-white/80 md:mt-6 md:text-[18.5px]">
                  Appartements, maisons et immeubles, avec leurs vraies photos. Ouvrez une fiche pour tout voir, ou demandez une visite en un clic.
                </p>
              </div>
              <div className="hidden lg:block">
                <Eventail biens={properties} />
              </div>
            </div>
          </div>

          {/* ── La recherche ── */}
          <div className="relative z-[3] mx-2.5 -mt-[122px] rounded-[26px] bg-white p-2.5 shadow-[0_40px_70px_-40px_rgba(19,36,61,0.55),0_0_0_1px_rgba(19,36,61,0.06)] md:mx-auto md:-mt-[78px] md:w-[min(1180px,calc(100%-80px))] md:rounded-[30px] md:p-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
              <div className="relative min-w-0 md:flex-[1.4]">
                <label className="relative flex h-16 min-w-0 items-center gap-3.5 rounded-[20px] bg-brand-surf px-4 transition focus-within:bg-white focus-within:shadow-[0_0_0_2px_#22497D] md:h-[68px] md:px-5">
                  <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-xl bg-white text-brand"><Search className="h-[18px] w-[18px]" /></span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-xs font-bold text-brand-mut">Où cherchez-vous ?</span>
                    <input
                      value={ville}
                      onChange={(e) => { setVille(e.target.value); setShowSugg(true); }}
                      onFocus={() => setShowSugg(true)}
                      onBlur={() => setTimeout(() => setShowSugg(false), 150)}
                      placeholder="Paris 15e, Boulogne, 92200…"
                      className="w-full min-w-0 border-0 bg-transparent p-0 text-base font-semibold text-brand-ink outline-none placeholder:font-medium placeholder:text-[#8794A6]"
                    />
                  </span>
                  {ville && (
                    <button type="button" aria-label="Effacer le lieu" onClick={() => setVille("")} className="grid h-8 w-8 flex-none place-items-center rounded-full bg-white text-brand-mut">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </label>
                {showSugg && sugg.length > 0 && (
                  <ul className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 m-0 list-none rounded-[22px] bg-white p-2 shadow-[0_30px_60px_-24px_rgba(19,36,61,0.45),0_0_0_1px_rgba(19,36,61,0.06)]" style={{ animation: "fade-up .18s ease both" }}>
                    {sugg.map((c) => (
                      <li key={c}>
                        <button type="button" onMouseDown={() => { setVille(c); setShowSugg(false); }} className="flex min-h-[46px] w-full items-center gap-3 rounded-[14px] px-3 text-left text-[15px] font-semibold text-brand-ink hover:bg-brand-surf">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-sky text-brand"><MapPin className="h-4 w-4" /></span> {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Choix icon={<Building2 className="h-[18px] w-[18px]" />} label="Type de bien" value={type} options={TYPES} onChange={setType} />
              <Choix icon={<DoorOpen className="h-[18px] w-[18px]" />} label="Pièces" value={pieces} options={PIECES} onChange={setPieces} />
              <Choix icon={<Wallet className="h-[18px] w-[18px]" />} label="Budget maximum" value={budget} options={BUDGETS} onChange={setBudget} />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPlus(!plus)}
                  aria-expanded={plus}
                  aria-label="Plus de filtres"
                  className={cn(
                    "relative inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-[20px] px-5 text-[15px] font-bold transition md:h-[68px] md:w-[68px] md:flex-none md:px-0",
                    plus ? "bg-brand text-white" : "bg-brand-surf text-brand hover:bg-[#EAEFF5]",
                  )}
                >
                  <SlidersHorizontal className="h-[19px] w-[19px]" />
                  <span className="md:hidden">Filtres</span>
                  {nbAvances > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-orange px-1 text-[11.5px] font-extrabold text-brand-ink md:absolute md:right-2 md:top-2">{nbAvances}</span>}
                </button>
                <button type="button" onClick={voir} className="inline-flex h-14 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-[20px] bg-brand-orange px-5 text-[15px] font-bold text-brand-ink md:hidden">
                  Voir {properties ? `les ${filtres.length}` : "les biens"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <AnimatePresence initial={false}>
              {plus && (
                <motion.div
                  key="plus"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduit ? 0 : 0.3, ease: [0.22, 0.8, 0.24, 1] }}
                  onAnimationStart={() => setPlusOuvert(false)}
                  onAnimationComplete={() => setPlusOuvert(plus)}
                  className={cn("relative z-[5]", plusOuvert ? "overflow-visible" : "overflow-hidden")}
                >
                  <div className="mt-2 flex flex-col gap-2 rounded-[22px] bg-[#F8FAFC] p-2 md:flex-row md:items-center md:gap-3 md:p-2.5">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:w-[560px] md:flex-none">
                      <Choix icon={<BedDouble className="h-[18px] w-[18px]" />} label="Chambres" value={chambres} options={CHAMBRES} onChange={setChambres} />
                      <Choix icon={<Layers className="h-[18px] w-[18px]" />} label="Étage" value={etage} options={ETAGES} onChange={setEtage} />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 px-1 py-1 md:flex-1">
                      <Interrupteur on={balcon} onClick={() => setBalcon(!balcon)}>Balcon</Interrupteur>
                      <Interrupteur on={terrasse} onClick={() => setTerrasse(!terrasse)}>Terrasse</Interrupteur>
                      <Interrupteur on={ascenseur} onClick={() => setAscenseur(!ascenseur)}>Ascenseur</Interrupteur>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── Les biens ── */}
        <section className="mx-auto w-full max-w-[1320px] px-4 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
          <div ref={resultats} className="flex scroll-mt-24 flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2 className="m-0 text-[24px] font-extrabold tracking-[-0.02em] text-brand-ink md:text-[30px]" aria-live="polite">
                {properties ? nbTexte(filtres.length) : "Chargement des biens…"}
              </h2>
              {nbFiltres > 0 && (
                <button type="button" onClick={reset} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-orl px-3 text-[13.5px] font-bold text-brand-orange-text">
                  <X className="h-3.5 w-3.5" /> Effacer les filtres
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Choix pilule droite icon={<ArrowDownUp className="h-4 w-4" />} label="Trier" placeholder="Trier par prix" value={tri} options={TRIS} onChange={setTri} />
              <div role="group" aria-label="Affichage" className="flex rounded-full bg-brand-surf p-1">
                {([["grille", "Grille", LayoutGrid], ["ville", "Par ville", MapPin]] as const).map(([k, t, I]) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={vue === k}
                    onClick={() => setVue(k)}
                    className={cn("relative inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[14px] font-bold transition-colors duration-300 sm:px-3.5", vue === k ? "text-brand-ink" : "text-brand-mut hover:text-brand-ink")}
                  >
                    {vue === k && (
                      <motion.span layoutId="vue-pilule" className="absolute inset-0 rounded-full bg-white shadow-[0_4px_12px_-6px_rgba(19,36,61,0.45)]" transition={{ type: "spring", damping: 28, stiffness: 380 }} />
                    )}
                    <I className="relative hidden h-4 w-4 sm:block" />
                    <span className="relative">{t}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 overflow-x-clip">
            {!properties ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2].map((i) => <div key={i} className="h-[380px] animate-pulse rounded-[24px] bg-brand-surf" />)}
              </div>
            ) : filtres.length === 0 ? (
              <div className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-brand-surf p-7 md:p-9">
                <div className="flex max-w-[620px] flex-col gap-2">
                  <span className="text-[22px] font-extrabold leading-tight text-brand-ink">Aucun bien ne correspond à ces critères</span>
                  <p className="m-0 text-[15.5px] leading-relaxed text-[#33445B]">Élargissez la recherche, ou confiez-nous vos critères : on vous présente aussi des biens qui ne sont pas en ligne.</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {nbFiltres > 0 && (
                    <button type="button" onClick={reset} className="inline-flex h-[52px] items-center rounded-2xl bg-white px-5 text-[15px] font-bold text-brand-ink">Tout effacer</button>
                  )}
                  <Link to="/acheter#recherche" className="inline-flex h-[52px] items-center gap-2 rounded-2xl bg-brand-orange px-5 text-[15px] font-bold text-brand-ink">
                    Confier ma recherche <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait" initial={false} custom={glisse}>
                <motion.div
                  key={vue}
                  custom={glisse}
                  variants={{
                    in: (d: number) => ({ opacity: 0, x: reduit ? 0 : d * 60 }),
                    on: { opacity: 1, x: 0 },
                    out: (d: number) => ({ opacity: 0, x: reduit ? 0 : d * -60 }),
                  }}
                  initial="in"
                  animate="on"
                  exit="out"
                  transition={{ duration: 0.32, ease: [0.22, 0.8, 0.24, 1] }}
                >
                  {vue === "ville" ? (
                    <div className="flex flex-col gap-12">
                      {parVille.map(([c, ps]) => (
                        <div key={c} className="flex flex-col gap-5">
                          <div className="flex items-center gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-white"><MapPin className="h-5 w-5" /></span>
                            <h3 className="m-0 text-[24px] font-extrabold tracking-[-0.02em] text-brand-ink">{c}</h3>
                            <span className="inline-flex h-7 items-center rounded-full bg-brand-surf px-2.5 text-[13px] font-bold text-brand-mut">{ps.length} bien{ps.length > 1 ? "s" : ""}</span>
                          </div>
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {ps.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filtres.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* ── Biens hors marché ── */}
        <section className="mx-auto w-full max-w-[1320px] px-4 pb-4 md:px-10">
          <div className="grid grid-cols-1 items-center gap-x-14 gap-y-8 rounded-[30px] bg-brand-surf p-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:rounded-[40px] md:p-14">
            <div className="flex flex-col gap-4">
              <span className="inline-flex h-8 items-center gap-2 self-start rounded-full bg-white px-3 text-[13px] font-bold text-brand-ink">
                <Lock className="h-3.5 w-3.5 text-brand-orange-text" /> Hors marché
              </span>
              <h2 className="m-0 text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] text-brand-ink md:text-[42px]">
                Vous ne voyez qu’une partie{" "}
                <Souligne>de nos biens</Souligne>
              </h2>
              <p className="m-0 max-w-[560px] text-base font-medium leading-[1.55] text-[#33445B] md:text-[17px]">
                Certains propriétaires préfèrent vendre sans annonce. Ces biens sont présentés uniquement aux acheteurs qui nous ont confié leur recherche.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                <Link to="/acheter#recherche" className="inline-flex h-14 items-center gap-2.5 rounded-[18px] bg-brand-orange px-6 text-[15.5px] font-bold text-brand-ink transition hover:brightness-105">
                  Confier ma recherche <ArrowRight className="h-[18px] w-[18px]" />
                </Link>
                <a href={TEL_HREF} className="inline-flex h-14 items-center gap-2.5 rounded-[18px] bg-white px-5 text-[15.5px] font-bold text-brand-ink">
                  <Phone className="h-[18px] w-[18px] text-brand" /> {TEL}
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-[26px] bg-white p-6 md:p-7">
              <span className="text-[19px] font-extrabold text-brand-ink">Acheter par secteur</span>
              <div className="flex flex-wrap gap-2">
                {cityList.map((c) => (
                  <Link key={c.slug} to={`/achat-appartement-${c.slug}`} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-brand-surf px-3.5 text-[14px] font-semibold text-brand-ink transition hover:bg-brand-sky">
                    <MapPin className="h-3.5 w-3.5 text-brand" /> {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
