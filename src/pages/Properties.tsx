/* « Nos biens » (refonte 2026) : recherche, filtres, tri et vue par ville. */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid, Lock, MapPin, Phone, Search, SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { SITE_URL } from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import { Property, fetchPropertiesFromFeed, mockProperties } from "@/lib/properties";
import { cityList } from "@/lib/cities";
import { Btn, Container, Crumbs, Em, Eyebrow, FRAME_SHADOW, SectionHead, TEL, TEL_HREF } from "@/components/site/ui";

const TYPES = ["Tous", "Appartement", "Maison", "Immeuble"] as const;
const PIECES = ["", "1", "2", "3", "4", "5"] as const;
const TRIS = { recent: "Plus récents", asc: "Prix croissant", desc: "Prix décroissant" } as const;

/** « Paris 15e », « 75015 », « Boulogne » ou plusieurs lieux séparés par des virgules. */
const sansAccent = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const matchVille = (p: Property, saisie: string) =>
  saisie.split(/[,;]/).map(sansAccent).filter(Boolean).some((v) => {
    const arr = v.match(/^paris\s*(\d{1,2})/);
    if (arr) return p.postalCode === `750${arr[1].padStart(2, "0")}`;
    return sansAccent(p.city).includes(v) || p.postalCode.startsWith(v);
  });

const sel = "h-12 w-full appearance-none rounded-xl border border-brand-line bg-white px-3.5 text-[15px] font-semibold text-brand-ink outline-none focus:border-brand-orange";

const Properties = () => {
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [ville, setVille] = useState("");
  const [showSugg, setShowSugg] = useState(false);
  const [type, setType] = useState<(typeof TYPES)[number]>("Tous");
  const [pieces, setPieces] = useState("");
  const [budget, setBudget] = useState("");
  const [plus, setPlus] = useState(false);
  const [chambres, setChambres] = useState("");
  const [etage, setEtage] = useState<"any" | "rdc" | "etage" | "dernier">("any");
  const [balcon, setBalcon] = useState(false);
  const [terrasse, setTerrasse] = useState(false);
  const [ascenseur, setAscenseur] = useState(false);
  const [tri, setTri] = useState<keyof typeof TRIS>("recent");
  const [vue, setVue] = useState<"grille" | "ville">("grille");

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

  const list = properties || [];
  const villes = useMemo(() => [...new Set(list.map((p) => p.city))].sort(), [list]);
  const sugg = ville ? villes.filter((c) => c.toLowerCase().includes(ville.toLowerCase())).slice(0, 6) : [];

  const filtres = useMemo(() => {
    const out = list.filter((p) => {
      if (ville && !matchVille(p, ville)) return false;
      if (type !== "Tous" && !p.type.toLowerCase().includes(type.toLowerCase())) return false;
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
    if (tri === "recent") out.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    return out;
  }, [list, ville, type, pieces, budget, chambres, etage, balcon, terrasse, ascenseur, tri]);

  const parVille = useMemo(() => {
    const m: Record<string, Property[]> = {};
    filtres.forEach((p) => (m[p.city] ||= []).push(p));
    return Object.entries(m).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtres]);

  const nbFiltres = [ville, type !== "Tous", pieces, budget, chambres, etage !== "any", balcon, terrasse, ascenseur].filter(Boolean).length;
  const reset = () => {
    setVille(""); setType("Tous"); setPieces(""); setBudget(""); setChambres(""); setEtage("any"); setBalcon(false); setTerrasse(false); setAscenseur(false);
  };

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

  const toggle = (on: boolean, set: (v: boolean) => void, label: string) => (
    <button type="button" aria-pressed={on} onClick={() => set(!on)} className={cn("inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[14.5px] font-semibold transition", on ? "border-brand bg-brand text-white" : "border-brand-line bg-white text-brand-ink hover:border-brand/40")}>
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Biens à vendre à Paris et dans les Hauts-de-Seine | Emilio Immobilier"
        description="Appartements, maisons et immeubles à vendre à Paris 6e, 7e, 15e, 16e, 17e, Boulogne, Neuilly, Issy et dans les Hauts-de-Seine. Photos, prix et visites avec Emilio Immobilier."
        canonical={`${SITE_URL}/biens`}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-[22px] pb-10 pt-6 md:pb-14 md:pt-10">
            <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Nos biens" }]} />
            <Eyebrow>Nos biens</Eyebrow>
            <h1 className="m-0 max-w-[900px] font-display text-[clamp(34px,4.2vw,58px)] font-medium leading-[1.07] tracking-[-0.015em] text-brand-ink text-balance">
              Nos biens à vendre, <Em wrap>à Paris et dans les Hauts-de-Seine</Em>
            </h1>
            <p className="m-0 max-w-[640px] text-lg leading-relaxed text-brand-txt text-pretty">Appartements, maisons et immeubles, avec leurs vraies photos. Survolez un bien pour la vue rapide, ou ouvrez sa fiche complète.</p>

            {/* Recherche */}
            <div className={cn("mt-2 flex flex-col gap-3 rounded-[22px] bg-white p-3.5 md:p-4", FRAME_SHADOW)}>
              <div className="grid grid-cols-1 gap-2.5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
                <div className="relative">
                  <label className="flex h-12 items-center gap-2.5 rounded-xl border border-brand-line bg-white px-3.5 focus-within:border-brand-orange">
                    <Search className="h-[18px] w-[18px] flex-none text-brand-orange-text" />
                    <span className="sr-only">Ville ou code postal</span>
                    <input value={ville} onChange={(e) => { setVille(e.target.value); setShowSugg(true); }} onFocus={() => setShowSugg(true)} onBlur={() => setTimeout(() => setShowSugg(false), 150)} placeholder="Ville ou code postal" className="w-full min-w-0 border-0 bg-transparent p-0 text-[15.5px] text-brand-ink outline-none placeholder:text-[#8A97A8]" />
                    {ville && <button type="button" aria-label="Effacer" onClick={() => setVille("")} className="text-brand-mut"><X className="h-4 w-4" /></button>}
                  </label>
                  {showSugg && sugg.length > 0 && (
                    <div className={cn("absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-xl bg-white py-1", FRAME_SHADOW)}>
                      {sugg.map((c) => (
                        <button key={c} type="button" onMouseDown={() => { setVille(c); setShowSugg(false); }} className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[15px] text-brand-ink hover:bg-brand-pale">
                          <MapPin className="h-4 w-4 text-brand-orange-text" /> {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <label>
                  <span className="sr-only">Nombre de pièces</span>
                  <select value={pieces} onChange={(e) => setPieces(e.target.value)} className={sel}>
                    {PIECES.map((p) => <option key={p} value={p}>{p === "" ? "Toutes les pièces" : p === "5" ? "5 pièces et plus" : `${p} pièce${p === "1" ? "" : "s"}`}</option>)}
                  </select>
                </label>
                <label>
                  <span className="sr-only">Budget maximum</span>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className={sel}>
                    <option value="">Tous les budgets</option>
                    {[500000, 800000, 1000000, 1500000, 2000000, 3000000].map((b) => <option key={b} value={b}>Jusqu’à {new Intl.NumberFormat("fr-FR").format(b)} €</option>)}
                  </select>
                </label>
                <button type="button" onClick={() => setPlus(!plus)} aria-expanded={plus} className={cn("inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-4 text-[15px] font-bold transition", plus ? "border-brand bg-brand text-white" : "border-brand-line bg-white text-brand hover:border-brand/40")}>
                  <SlidersHorizontal className="h-4 w-4" /> Plus de filtres
                  {nbFiltres > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-orange px-1 text-[11.5px] font-extrabold text-brand-ink">{nbFiltres}</span>}
                </button>
              </div>
              <div className="no-scrollbar -mx-3.5 flex gap-2 overflow-x-auto px-3.5 md:mx-0 md:flex-wrap md:px-0">
                {TYPES.map((t) => (
                  <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={cn("h-10 flex-none rounded-full border px-4 text-[14.5px] transition", type === t ? "border-brand bg-brand font-bold text-white" : "border-brand-line bg-white font-semibold text-brand hover:border-brand/40")}>
                    {t === "Tous" ? "Tous les biens" : `${t}s`}
                  </button>
                ))}
              </div>
              {plus && (
                <div className="flex flex-col gap-3 border-t border-brand-line2 pt-3">
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:max-w-[560px]">
                    <label>
                      <span className="sr-only">Chambres minimum</span>
                      <select value={chambres} onChange={(e) => setChambres(e.target.value)} className={sel}>
                        <option value="">Chambres : peu importe</option>
                        {["1", "2", "3", "4"].map((c) => <option key={c} value={c}>{c} chambre{c === "1" ? "" : "s"} ou plus</option>)}
                      </select>
                    </label>
                    <label>
                      <span className="sr-only">Étage</span>
                      <select value={etage} onChange={(e) => setEtage(e.target.value as typeof etage)} className={sel}>
                        <option value="any">Étage : peu importe</option>
                        <option value="rdc">Rez-de-chaussée</option>
                        <option value="etage">En étage</option>
                        <option value="dernier">Dernier étage</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {toggle(balcon, setBalcon, "Balcon")}
                    {toggle(terrasse, setTerrasse, "Terrasse")}
                    {toggle(ascenseur, setAscenseur, "Ascenseur")}
                    {nbFiltres > 0 && (
                      <button type="button" onClick={reset} className="ml-auto inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-bold text-brand-orange-text"><X className="h-4 w-4" /> Tout effacer</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="flex flex-col gap-7 py-10 md:py-14">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="m-0 text-[15.5px] font-semibold text-brand-ink" aria-live="polite">
                {properties ? `${filtres.length} bien${filtres.length > 1 ? "s" : ""} à vendre` : "Chargement des biens…"}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <label className="relative">
                  <span className="sr-only">Trier</span>
                  <select value={tri} onChange={(e) => setTri(e.target.value as keyof typeof TRIS)} className="h-11 appearance-none rounded-full border border-brand-line bg-white px-4 text-[14.5px] font-semibold text-brand-ink outline-none">
                    {Object.entries(TRIS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </label>
                <div role="group" aria-label="Affichage" className="flex rounded-full border border-brand-line bg-brand-pale p-1">
                  {([["grille", "Grille", LayoutGrid], ["ville", "Par ville", MapPin]] as const).map(([k, t, I]) => (
                    <button key={k} type="button" aria-pressed={vue === k} onClick={() => setVue(k)} className={cn("inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[14px] font-bold transition", vue === k ? "bg-white text-brand-ink shadow-[0_4px_12px_-6px_rgba(19,36,61,0.45)]" : "text-brand-mut")}>
                      <I className="h-4 w-4" /> {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {!properties ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2].map((i) => <div key={i} className="h-[380px] animate-pulse rounded-[22px] bg-brand-pale" />)}
              </div>
            ) : filtres.length === 0 ? (
              <div className="flex flex-wrap items-center justify-between gap-6 rounded-[22px] bg-brand-pale p-7 md:p-9">
                <div className="flex max-w-[620px] flex-col gap-2">
                  <span className="font-display text-[26px] leading-tight text-brand-ink">Aucun bien ne correspond à ces critères</span>
                  <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt">Élargissez la recherche, ou confiez-nous vos critères : on vous présente aussi des biens qui ne sont pas en ligne.</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {nbFiltres > 0 && <Btn variant="outline" onClick={reset}>Tout effacer</Btn>}
                  <Btn to="/acheter#recherche" iconLeft={<Search className="h-[18px] w-[18px]" />}>Confier ma recherche</Btn>
                </div>
              </div>
            ) : vue === "ville" ? (
              <div className="flex flex-col gap-11">
                {parVille.map(([c, ps]) => (
                  <div key={c} className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tint text-brand"><MapPin className="h-5 w-5" /></span>
                      <h2 className="m-0 font-display text-[26px] font-medium text-brand-ink">{c}</h2>
                      <span className="text-[14px] font-semibold text-brand-mut">{ps.length} bien{ps.length > 1 ? "s" : ""}</span>
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
          </Container>
        </section>

        {/* Biens hors marché */}
        <section className="bg-brand">
          <Container className="grid grid-cols-1 items-center gap-x-16 gap-y-8 py-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:py-[88px]">
            <div className="flex flex-col gap-5">
              <SectionHead dark eyebrow="Hors marché" title={<>Vous ne voyez qu’une partie <Em dark>de nos biens</Em></>} lead="Certains propriétaires préfèrent vendre sans annonce. Ces biens sont présentés uniquement aux acheteurs qui nous ont confié leur recherche." />
              <div className="flex flex-wrap gap-3 pt-1">
                <Btn to="/acheter#recherche" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Confier ma recherche</Btn>
                <Btn href={TEL_HREF} variant="ghost" iconLeft={<Phone className="h-[18px] w-[18px]" />}>{TEL}</Btn>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-[22px] bg-white p-6 md:p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-brand-orange"><Lock className="h-5 w-5" /></span>
              <span className="font-display text-[24px] leading-tight text-brand-ink">Acheter par secteur</span>
              <div className="flex flex-wrap gap-2">
                {cityList.map((c) => (
                  <Link key={c.slug} to={`/achat-appartement-${c.slug}`} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-brand-line bg-brand-pale px-3.5 text-[14px] font-semibold text-brand-ink transition hover:border-brand-orange hover:bg-[#FFF1DF]">
                    <MapPin className="h-3.5 w-3.5 text-brand-orange-text" /> {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
