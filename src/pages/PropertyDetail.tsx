/* Fiche d'un bien (refonte 2026). Les demandes passent par la fenêtre « Demande d'informations » (CRM). */
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BedDouble, Building, CalendarDays, Camera, ChevronLeft, ChevronRight, Expand, Home, LayoutGrid,
  Mail, MapPin, Maximize, MessageCircle, Phone, Search, Star, Thermometer, X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { SITE_URL } from "@/components/SEOHead";
import DPEBadge from "@/components/DPEBadge";
import PropertyCard, { displayCity, displayTitle } from "@/components/PropertyCard";
import { cn } from "@/lib/utils";
import { Property, fetchPropertiesFromFeed, formatPrice, mockProperties } from "@/lib/properties";
import { useSiteModals } from "@/components/site/SiteModals";
import { Btn, Container, Crumbs, Em, FRAME_SHADOW, MAIL, SectionHead, TEL, TEL_HREF } from "@/components/site/ui";

const nf = new Intl.NumberFormat("fr-FR");

const plus = (p: Property) => {
  const out: string[] = [];
  if (p.exclusive) out.push("Exclusivité");
  if (p.balcony) out.push("Balcon");
  if (p.terrace) out.push("Terrasse");
  if (p.garden) out.push("Jardin");
  if (p.cave) out.push("Cave");
  if (p.elevator) out.push("Ascenseur");
  if (p.guardian) out.push("Gardien");
  if (p.parking) out.push(`Parking (${p.parking} place${p.parking > 1 ? "s" : ""})`);
  if (p.orientation) out.push(`Orientation ${p.orientation}`);
  return out;
};

/* ── Galerie + plein écran ── */
const Galerie = ({ p }: { p: Property }) => {
  const imgs = p.images.length ? p.images : [];
  const [i, setI] = useState(0);
  const [plein, setPlein] = useState(false);
  const n = imgs.length;
  const go = useCallback((d: number) => setI((c) => (c + d + n) % n), [n]);

  useEffect(() => {
    if (!plein) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlein(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [plein, go]);

  if (!n) return <div className="h-[300px] rounded-[22px] bg-brand-tint md:h-[520px]" />;
  const alt = `${displayTitle(p)} à vendre, ${displayCity(p)}`;
  return (
    <>
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="relative h-[280px] overflow-hidden rounded-[22px] bg-brand-tint sm:h-[380px] md:h-[520px]">
          <button type="button" onClick={() => setPlein(true)} className="block h-full w-full" aria-label="Agrandir la photo">
            <img src={imgs[i]} alt={`${alt}, photo ${i + 1}`} className="h-full w-full object-cover" />
          </button>
          {n > 1 && (
            <>
              <button type="button" aria-label="Photo précédente" onClick={() => go(-1)} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-ink shadow-md hover:bg-white"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" aria-label="Photo suivante" onClick={() => go(1)} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-ink shadow-md hover:bg-white"><ChevronRight className="h-5 w-5" /></button>
            </>
          )}
          <span className="absolute bottom-3.5 left-3.5 inline-flex h-[34px] items-center gap-2 rounded-lg bg-[rgba(19,36,61,0.82)] px-3 text-[13px] font-semibold text-white"><Camera className="h-[15px] w-[15px]" /> {i + 1} / {n}</span>
          <button type="button" onClick={() => setPlein(true)} className="absolute bottom-3.5 right-3.5 inline-flex h-[34px] items-center gap-2 rounded-lg bg-white px-3 text-[13px] font-bold text-brand-ink shadow-md"><Expand className="h-[15px] w-[15px]" /> Plein écran</button>
        </div>
        {n > 1 && (
          <div className="hidden grid-rows-2 gap-2.5 md:grid">
            {[1, 2].map((k) => {
              const idx = (i + k) % n;
              return (
                <button key={k} type="button" onClick={() => (k === 2 && n > 3 ? setPlein(true) : setI(idx))} className="relative overflow-hidden rounded-[22px] bg-brand-tint">
                  <img src={imgs[idx]} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" />
                  {k === 2 && n > 3 && <span className="absolute inset-0 grid place-items-center bg-[rgba(19,36,61,0.45)] text-[15px] font-bold text-white"><span className="inline-flex items-center gap-2"><LayoutGrid className="h-4 w-4" /> Voir les {n} photos</span></span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {n > 1 && (
        <div className="no-scrollbar mt-2.5 flex gap-2 overflow-x-auto pb-1">
          {imgs.map((src, k) => (
            <button key={k} type="button" aria-label={`Photo ${k + 1}`} onClick={() => setI(k)} className={cn("h-14 w-20 flex-none overflow-hidden rounded-lg border-2 transition", k === i ? "border-brand-orange" : "border-transparent opacity-60 hover:opacity-100")}>
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      {plein && (
        <div role="dialog" aria-modal="true" aria-label="Photos du bien" className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(10,18,32,0.96)]" onClick={() => setPlein(false)}>
          <button type="button" aria-label="Fermer" onClick={() => setPlein(false)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X className="h-6 w-6" /></button>
          {n > 1 && <button type="button" aria-label="Photo précédente" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft className="h-6 w-6" /></button>}
          <img src={imgs[i]} alt={`${alt}, photo ${i + 1}`} onClick={(e) => e.stopPropagation()} className="max-h-[86vh] max-w-[94vw] rounded-lg object-contain" />
          {n > 1 && <button type="button" aria-label="Photo suivante" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight className="h-6 w-6" /></button>}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">{i + 1} / {n}</span>
        </div>
      )}
    </>
  );
};

const PropertyDetail = () => {
  const { id } = useParams();
  const { openContact } = useSiteModals();
  const [property, setProperty] = useState<Property | undefined>(mockProperties.find((p) => p.id === id));
  const [loading, setLoading] = useState(true);
  const [autres, setAutres] = useState<Property[]>([]);

  useEffect(() => {
    let on = true;
    setLoading(true);
    fetchPropertiesFromFeed()
      .then((data) => {
        if (!on) return;
        const found = data.find((p) => p.id === id);
        setProperty(found || mockProperties.find((p) => p.id === id));
        const reste = data.filter((p) => p.id !== id && !p.id.includes("fictif"));
        const memeVille = found ? reste.filter((p) => p.postalCode === found.postalCode || p.city === found.city) : [];
        const recents = [...reste].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        setAutres([...memeVille, ...recents.filter((p) => !memeVille.includes(p))].slice(0, 3));
      })
      .finally(() => on && setLoading(false));
    return () => {
      on = false;
    };
  }, [id]);

  if (loading && !property) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Container className="flex flex-col gap-5 py-10">
          <div className="h-5 w-64 animate-pulse rounded bg-brand-pale" />
          <div className="h-[420px] animate-pulse rounded-[22px] bg-brand-pale" />
          <div className="h-10 w-96 max-w-full animate-pulse rounded bg-brand-pale" />
        </Container>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <SEOHead title="Ce bien n’est plus disponible | Emilio Immobilier" description="Ce bien a peut-être trouvé preneur. Découvrez nos autres biens à vendre à Paris et dans les Hauts-de-Seine." noindex />
        <Navbar />
        <main>
          <section className="bg-brand-pale">
            <Container className="flex flex-col items-center gap-5 py-14 text-center md:py-20">
              <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">Bien vendu ou retiré</span>
              <h1 className="m-0 font-display text-[clamp(32px,3.6vw,48px)] font-medium leading-tight text-brand-ink">Ce bien n’est plus <Em>disponible</Em></h1>
              <p className="m-0 max-w-[560px] text-[17px] leading-relaxed text-brand-txt">Il a peut-être déjà trouvé preneur. Voici nos derniers biens à vendre, ou confiez-nous votre recherche.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Btn to="/biens" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Voir tous nos biens</Btn>
                <Btn to="/acheter#recherche" variant="outline" iconLeft={<Search className="h-[18px] w-[18px]" />}>Confier ma recherche</Btn>
              </div>
            </Container>
          </section>
          {autres.length > 0 && (
            <section className="bg-white">
              <Container className="grid grid-cols-1 gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
                {autres.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
              </Container>
            </section>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  const p = property;
  const titre = displayTitle(p);
  const ville = displayCity(p);
  const url = `${SITE_URL}/biens/${p.id}`;
  const surf = p.surface ? `${p.surface} m²` : "";
  const seoTitle = `${titre}${surf ? ` ${surf}` : ""} à vendre, ${ville} | Emilio Immobilier`;
  const seoDesc = `${titre} à vendre à ${ville}${surf ? `, ${surf}` : ""}${p.bedrooms ? `, ${p.bedrooms} chambre${p.bedrooms > 1 ? "s" : ""}` : ""} : ${formatPrice(p.price)}. Photos, plan, DPE et visite avec Emilio Immobilier.`.slice(0, 160);
  const avantages = plus(p);
  const demande = (objet: "Visiter un bien" | "Autre", message: string) => openContact({ objet, message, propertyRef: p.id, propertyTitle: `${titre}, ${ville}` });

  const specs = [
    p.surface > 0 && { icon: Maximize, l: "Surface", v: `${p.surface} m²` },
    p.rooms > 0 && { icon: Home, l: "Pièces", v: `${p.rooms}` },
    p.bedrooms > 0 && { icon: BedDouble, l: "Chambres", v: `${p.bedrooms}` },
    p.floor !== undefined && p.floor !== null && { icon: Building, l: "Étage", v: p.floor === 0 ? "Rez-de-chaussée" : p.totalFloors ? `${p.floor} sur ${p.totalFloors}` : `${p.floor}` },
    p.yearBuilt && p.yearBuilt > 0 && { icon: CalendarDays, l: "Construction", v: `${p.yearBuilt}` },
    p.heating && { icon: Thermometer, l: "Chauffage", v: p.heating },
  ].filter(Boolean) as { icon: typeof Home; l: string; v: string }[];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: `${titre}, ${ville}`,
      url,
      description: p.description?.slice(0, 500),
      image: p.images?.slice(0, 6),
      datePosted: p.dateAdded,
      offers: { "@type": "Offer", price: p.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      about: {
        "@type": /maison/i.test(p.type) ? "House" : "Apartment",
        numberOfRooms: p.rooms || undefined,
        numberOfBedrooms: p.bedrooms || undefined,
        floorSize: p.surface ? { "@type": "QuantitativeValue", value: p.surface, unitCode: "MTK" } : undefined,
        yearBuilt: p.yearBuilt || undefined,
        address: { "@type": "PostalAddress", addressLocality: ville, postalCode: p.postalCode, addressCountry: "FR" },
      },
      provider: { "@type": "RealEstateAgent", name: "Emilio Immobilier", url: SITE_URL, telephone: "+33184801400" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Nos biens", item: `${SITE_URL}/biens` },
        { "@type": "ListItem", position: 3, name: `${titre}, ${ville}`, item: url },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead title={seoTitle} description={seoDesc} canonical={url} jsonLd={jsonLd} image={p.images[0]} />
      <Navbar />
      <main>
        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-4 pb-8 pt-5 md:pb-10 md:pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Nos biens", to: "/biens" }, { label: `${titre}, ${ville}` }]} />
              <Link to="/biens" className="inline-flex min-h-[44px] items-center gap-2 text-[14.5px] font-bold text-brand hover:text-brand-orange-text"><ArrowLeft className="h-4 w-4 text-brand-orange" /> Retour aux biens</Link>
            </div>
            <Galerie p={p} />
          </Container>
        </section>

        <section className="bg-white">
          <Container className="grid grid-cols-1 items-start gap-x-12 gap-y-10 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="flex min-w-0 flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {p.exclusive && <span className="inline-flex h-[30px] items-center gap-1.5 rounded-full bg-brand-orange px-3 text-[13px] font-extrabold text-brand-ink"><Star className="h-3.5 w-3.5" /> Exclusivité</span>}
                  <span className="inline-flex h-[30px] items-center rounded-full bg-brand-pale px-3 text-[13px] font-bold text-brand">{p.type}</span>
                  <span className="inline-flex h-[30px] items-center rounded-full bg-brand-pale px-3 text-[13px] font-semibold text-brand-mut">Réf. {p.id}</span>
                </div>
                <h1 className="m-0 font-display text-[clamp(30px,3.4vw,46px)] font-medium leading-[1.1] text-brand-ink text-balance">
                  {titre}{surf && ` de ${surf}`}, <Em>{ville}</Em>
                </h1>
                <span className="inline-flex items-center gap-1.5 text-[15.5px] text-brand-mut"><MapPin className="h-4 w-4 text-brand-orange-text" /> {ville} · {p.postalCode}</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {specs.map((s) => (
                  <div key={s.l} className="flex items-center gap-3 rounded-2xl bg-brand-pale px-4 py-3.5">
                    <s.icon className="h-5 w-5 flex-none text-brand-orange-text" />
                    <span className="flex min-w-0 flex-col leading-tight">
                      <span className="text-[16px] font-bold text-brand-ink">{s.v}</span>
                      <span className="text-[13px] text-brand-mut">{s.l}</span>
                    </span>
                  </div>
                ))}
              </div>

              {avantages.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h2 className="m-0 font-display text-[26px] font-medium text-brand-ink">Les plus de ce bien</h2>
                  <div className="flex flex-wrap gap-2">
                    {avantages.map((a) => <span key={a} className="inline-flex h-10 items-center rounded-full border border-brand-line bg-white px-4 text-[14.5px] font-semibold text-brand-ink">{a}</span>)}
                  </div>
                </div>
              )}

              {p.description?.trim() && (
                <div className="flex flex-col gap-3">
                  <h2 className="m-0 font-display text-[26px] font-medium text-brand-ink">Description</h2>
                  <p className="m-0 whitespace-pre-line text-[16.5px] leading-[1.75] text-brand-txt">{p.description}</p>
                </div>
              )}

              {p.roomDetails && p.roomDetails.length > 0 && (
                <details className="group rounded-[20px] border border-brand-line bg-white">
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 [&::-webkit-details-marker]:hidden">
                    <span className="flex flex-col"><span className="font-display text-[22px] text-brand-ink">Détail des pièces</span><span className="text-[13.5px] text-brand-mut">{p.roomDetails.length} surface{p.roomDetails.length > 1 ? "s" : ""}</span></span>
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand-tint text-brand transition-transform group-open:rotate-180"><ChevronLeft className="h-[18px] w-[18px] -rotate-90" /></span>
                  </summary>
                  <div className="overflow-x-auto px-5 pb-5">
                    <table className="w-full border-collapse text-[15px]">
                      <thead><tr className="text-left text-[12.5px] uppercase tracking-[0.12em] text-brand-orange-text"><th className="py-2 font-extrabold">Niveau</th><th className="py-2 font-extrabold">Pièce</th><th className="py-2 text-right font-extrabold">Surface</th></tr></thead>
                      <tbody>
                        {p.roomDetails.map((r, k) => (
                          <tr key={k} className="border-t border-brand-line2">
                            <td className="py-2.5 text-brand-mut">{r.level ? `Étage ${r.level}` : "—"}</td>
                            <td className="py-2.5 font-semibold text-brand-ink">{r.type}</td>
                            <td className="py-2.5 text-right text-brand-ink">{r.surface > 0 ? `${r.surface} m²` : "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              )}

              <div className="flex flex-col gap-5 rounded-[20px] border border-brand-line bg-white p-5 md:p-6">
                <h2 className="m-0 font-display text-[24px] font-medium text-brand-ink">Diagnostic de performance énergétique</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <DPEBadge label="Consommation énergétique (DPE)" value={p.energyClass} type="energy" consoValue={p.consoEnergie} />
                  <DPEBadge label="Émissions de gaz à effet de serre (GES)" value={p.gesClass} type="ges" consoValue={p.valeurGes} />
                </div>
              </div>
            </div>

            {/* Colonne prix + contact */}
            <aside className="lg:sticky lg:top-28">
              <div className={cn("flex flex-col gap-4 rounded-[24px] bg-white p-6", FRAME_SHADOW)}>
                <div className="flex flex-col gap-1">
                  <span className="flex flex-wrap items-baseline gap-2.5">
                    <span className="font-display text-[40px] font-medium leading-none text-brand-ink">{formatPrice(p.price)}</span>
                    <span className="text-sm font-bold text-brand-mut">FAI</span>
                  </span>
                  {p.surface > 0 && <span className="text-[14.5px] text-brand-mut">soit {nf.format(Math.round(p.price / p.surface))} €/m²</span>}
                  <span className="text-[13px] text-brand-mut">
                    Prix frais d’agence inclus · <Link to="/honoraires" className="font-semibold text-brand underline underline-offset-2">consulter nos tarifs</Link>
                  </span>
                  {(p.charges || p.taxeFonciere) && (
                    <span className="pt-1 text-[13.5px] text-brand-txt">
                      {p.charges ? `Charges : ${formatPrice(p.charges)} par an` : ""}
                      {p.charges && p.taxeFonciere ? " · " : ""}
                      {p.taxeFonciere ? `Taxe foncière : ${formatPrice(p.taxeFonciere)}` : ""}
                    </span>
                  )}
                </div>
                <div className="h-px bg-brand-line2" />
                <span className="font-display text-[22px] leading-tight text-brand-ink">Ce bien vous intéresse ?</span>
                <Btn full onClick={() => demande("Visiter un bien", "Je souhaite visiter ce bien.")} iconLeft={<CalendarDays className="h-[18px] w-[18px]" />}>Demander une visite</Btn>
                <Btn full variant="outline" onClick={() => demande("Autre", "J’ai une question sur ce bien : ")} iconLeft={<MessageCircle className="h-[18px] w-[18px]" />}>Poser une question</Btn>
                <div className="flex flex-col gap-1 pt-1">
                  <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center gap-2 text-[16px] font-extrabold text-brand-ink"><Phone className="h-4 w-4 text-brand-orange-text" /> {TEL}</a>
                  <a href={`mailto:${MAIL}?subject=${encodeURIComponent(`Bien réf. ${p.id}`)}`} className="inline-flex min-h-[40px] items-center gap-2 text-[14.5px] font-semibold text-brand"><Mail className="h-4 w-4 text-brand-orange-text" /> {MAIL}</a>
                </div>
              </div>
            </aside>
          </Container>
        </section>

        {autres.length > 0 && (
          <section className="bg-brand-pale">
            <Container className="flex flex-col gap-9 py-14 md:py-[88px]">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHead eyebrow="À voir aussi" title={<>D’autres biens <Em>à vendre</Em></>} />
                <Btn to="/biens" variant="outline" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Voir tous nos biens</Btn>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {autres.map((a, k) => <PropertyCard key={a.id} property={a} index={k} />)}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
