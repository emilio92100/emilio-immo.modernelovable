/* « Nos biens du moment » : un bien à la une, encadré, puis les autres biens. */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BedDouble, Camera, Eye, LayoutGrid, MapPin, Maximize, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Property, fetchPropertiesFromFeed, formatPrice, formatSurface, mockProperties } from "@/lib/properties";
import PropertyCard, { QuickViewPopup, displayCity, displayTitle, featureBadges } from "@/components/PropertyCard";
import { Container, FRAME_SHADOW, SectionHead, TextLink } from "@/components/site/ui";

const FILTRES = ["Tous", "Maisons", "Appartements", "Immeubles"] as const;
type Filtre = (typeof FILTRES)[number];
const match = (p: Property, f: Filtre) =>
  f === "Tous" ||
  (f === "Maisons" && /maison/i.test(p.type)) ||
  (f === "Appartements" && /appartement|studio|duplex|loft/i.test(p.type)) ||
  (f === "Immeubles" && /immeuble/i.test(p.type));

/** Les biens du flux, sans le bien de démonstration. */
export function useBiens() {
  const [biens, setBiens] = useState<Property[] | null>(null);
  useEffect(() => {
    let on = true;
    fetchPropertiesFromFeed()
      .then((d) => on && setBiens(d.filter((p) => !p.id.includes("fictif"))))
      .catch(() => on && setBiens(mockProperties.filter((p) => !p.id.includes("fictif"))));
    return () => {
      on = false;
    };
  }, []);
  return biens;
}

const Featured = ({ p }: { p: Property }) => {
  const [quick, setQuick] = useState(false);
  const badges = featureBadges(p).slice(0, 2);
  const specs = [
    { icon: <Maximize className="h-[19px] w-[19px]" />, v: formatSurface(p.surface), l: "habitables" },
    p.rooms > 0 && { icon: <LayoutGrid className="h-[19px] w-[19px]" />, v: String(p.rooms), l: "pièces" },
    p.bedrooms > 0 && { icon: <BedDouble className="h-[19px] w-[19px]" />, v: String(p.bedrooms), l: "chambres" },
    p.surface > 0 && { icon: <Star className="h-[19px] w-[19px]" />, v: `${new Intl.NumberFormat("fr-FR").format(Math.round(p.price / p.surface))} €`, l: "le m²" },
  ].filter(Boolean) as { icon: JSX.Element; v: string; l: string }[];
  return (
    <div className="relative md:mx-3 md:mb-[22px] md:ml-4 md:mt-1.5">
      <span aria-hidden className="absolute -bottom-4 -left-4 hidden h-[74%] w-[58%] rounded-[28px] bg-brand md:block" />
      <span aria-hidden className="absolute -right-3 -top-3 hidden h-[110px] w-[110px] rounded-tr-[30px] border-r-2 border-t-2 border-brand-orange md:block" />
      <article className={cn("group relative z-[1] grid grid-cols-1 rounded-[24px] bg-white p-3 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]", FRAME_SHADOW)}>
        <div className="relative h-[260px] overflow-hidden rounded-2xl bg-brand-tint md:h-[490px]">
          <img src={p.images[0]} alt={displayTitle(p)} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
          <span className="absolute left-3.5 top-3.5 inline-flex h-8 items-center gap-1.5 rounded-full bg-brand-orange px-3 text-[13px] font-extrabold text-brand-ink"><Star className="h-3.5 w-3.5" /> À la une</span>
          {p.images.length > 1 && (
            <span className="absolute bottom-3.5 left-3.5 inline-flex h-[34px] items-center gap-2 rounded-lg bg-[rgba(19,36,61,0.82)] px-3 text-[13px] font-semibold text-white"><Camera className="h-[15px] w-[15px]" /> {p.images.length} photos</span>
          )}
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-4 px-2 pb-2.5 pt-[18px] md:pb-[26px] md:pl-9 md:pr-[30px] md:pt-7">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex h-[30px] items-center rounded-full bg-brand-pale px-3 text-[13px] font-bold text-brand">{p.type}</span>
            {badges.map((b) => <span key={b} className="inline-flex h-[30px] items-center rounded-full bg-brand-pale px-3 text-[13px] font-bold text-brand">{b}</span>)}
            {p.exclusive && <span className="inline-flex h-[30px] items-center rounded-full bg-[#FCEBD6] px-3 text-[13px] font-bold text-[#7A3F05]">Exclusivité</span>}
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="m-0 font-display text-[26px] font-medium leading-tight text-brand-ink md:text-[34px]">
              {displayTitle(p)}, <em className="font-normal italic text-brand-orange-lt">{displayCity(p)}</em>
            </h3>
            <span className="inline-flex items-center gap-1.5 text-[15px] text-brand-mut"><MapPin className="h-4 w-4 text-brand-orange-text" />{displayCity(p)} · {p.postalCode}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="font-display text-[30px] font-medium tracking-[-0.01em] text-brand-ink md:text-[38px]">{formatPrice(p.price)}</span>
            <span className="text-sm font-bold text-brand-mut">FAI</span>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {specs.map((s) => (
              <div key={s.l} className="flex flex-col gap-1 rounded-xl bg-brand-pale px-3.5 py-3">
                <span className="text-brand-orange-text">{s.icon}</span>
                <span className="whitespace-nowrap text-[17px] font-bold text-brand-ink">{s.v}</span>
                <span className="-mt-0.5 text-[12.5px] text-brand-mut">{s.l}</span>
              </div>
            ))}
          </div>
          <p className="m-0 line-clamp-3 text-[15.5px] leading-relaxed text-brand-txt">{p.description}</p>
          <div className="flex flex-wrap gap-2.5">
            <Link to={`/biens/${p.id}`} className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-brand px-5 text-[15.5px] font-bold text-white">Voir le bien <ArrowRight className="h-[18px] w-[18px]" /></Link>
            <button type="button" onClick={() => setQuick(true)} className="inline-flex h-[50px] items-center gap-2 rounded-[10px] border-[1.5px] border-brand bg-white px-5 text-[15.5px] font-bold text-brand"><Eye className="h-[17px] w-[17px]" /> Vue rapide</button>
          </div>
        </div>
      </article>
      <QuickViewPopup property={p} open={quick} onClose={() => setQuick(false)} />
    </div>
  );
};

const FeaturedProperties = () => {
  const biens = useBiens();
  const [filtre, setFiltre] = useState<Filtre>("Tous");
  const liste = useMemo(() => (biens || []).filter((p) => match(p, filtre)), [biens, filtre]);
  const dispo = useMemo(() => FILTRES.filter((f) => f === "Tous" || (biens || []).some((p) => match(p, f))), [biens]);
  const [une, ...autres] = liste;

  return (
    <section id="biens" className="bg-white md:bg-[linear-gradient(180deg,#FFFFFF_0%,#FFFFFF_62%,#F5F8FC_62%,#F5F8FC_100%)]">
      <Container className="flex flex-col gap-7 pb-12 pt-10 md:gap-9 md:pb-[84px] md:pt-[84px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="À vendre en ce moment" title={<>Nos biens <em className="font-normal italic text-brand-orange-lt">du moment</em></>} lead="Maisons, appartements et immeubles en vente à Paris et dans les Hauts-de-Seine, avec leurs vraies photos." />
          <div className="flex flex-col gap-3 md:items-end">
            <div role="group" aria-label="Filtrer les biens" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
              {dispo.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filtre === f}
                  onClick={() => setFiltre(f)}
                  className={cn("h-11 flex-none rounded-full border px-[18px] text-[14.5px] transition", filtre === f ? "border-brand bg-brand font-bold text-white" : "border-brand-line bg-white font-semibold text-brand hover:border-brand/40")}
                >
                  {f}
                </button>
              ))}
            </div>
            <TextLink to="/biens">Voir tous nos biens</TextLink>
          </div>
        </div>
        {!biens ? (
          <div className="h-[520px] animate-pulse rounded-[24px] bg-brand-pale" />
        ) : !une ? (
          <p className="text-brand-txt">Aucun bien dans cette catégorie pour le moment.</p>
        ) : (
          <>
            <Featured p={une} />
            {autres.length > 0 && (
              <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-5 pt-1.5 md:mx-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))] md:gap-6 md:overflow-visible md:p-0">
                {autres.slice(0, 4).map((p, k) => (
                  <PropertyCard key={p.id} property={p} index={k} className="w-[286px] flex-none snap-start md:w-auto" />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProperties;
