/* Carte d'un bien (refonte 2026) : carte encadrée, survol « Vue rapide / Détail ».
   Sur téléphone, les deux boutons restent visibles sur la photo. */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BedDouble, Eye, LayoutGrid, MapPin, Maximize, X } from "lucide-react";
import { Property, formatPrice, formatSurface } from "@/lib/properties";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { FRAME_SHADOW } from "@/components/site/ui";
import { Portal, Slider, useLockScroll } from "@/components/site/Slider";

interface PropertyCardProps {
  property: Property;
  index?: number;
  className?: string;
  imgClassName?: string;
}

export const displayTitle = (p: Property) => {
  const type = p.type || "Bien";
  return p.rooms > 0 ? `${type} ${p.rooms} pièce${p.rooms > 1 ? "s" : ""}` : type;
};

export const displayCity = (p: Property) => {
  if (p.city.toLowerCase().startsWith("paris") && p.postalCode.startsWith("75")) {
    const n = parseInt(p.postalCode.slice(3), 10);
    if (n > 0) return `Paris ${n}${n === 1 ? "er" : "e"}`;
  }
  return p.city;
};

export const featureBadges = (p: Property) => {
  const b: string[] = [];
  if (p.parking && p.parking > 0) b.push("Parking");
  if (p.terrace) b.push("Terrasse");
  if (p.balcony) b.push("Balcon");
  if (p.garden) b.push("Jardin");
  if (p.cave) b.push("Cave");
  if (p.elevator) b.push("Ascenseur");
  return b;
};

const perM2 = (p: Property) => (p.surface > 0 ? `${new Intl.NumberFormat("fr-FR").format(Math.round(p.price / p.surface))} €/m²` : "");

/* ── Vue rapide ── */
export const QuickViewPopup = ({ property, open, onClose }: { property: Property; open: boolean; onClose: () => void }) => {
  const { openContact } = useSiteModals();
  const [photo, setPhoto] = useState(0);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useLockScroll(open);
  useEffect(() => {
    if (!open) return;
    setPhoto(0);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeRef.current();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const imgs = property.images.length ? property.images : [];
  const specs = [
    { icon: <Maximize className="h-[18px] w-[18px]" />, v: formatSurface(property.surface), l: "surface", lm: "" },
    property.rooms > 0 && { icon: <LayoutGrid className="h-[18px] w-[18px]" />, v: String(property.rooms), l: "pièces", lm: "p." },
    property.bedrooms > 0 && { icon: <BedDouble className="h-[18px] w-[18px]" />, v: String(property.bedrooms), l: "chambres", lm: "ch." },
  ].filter(Boolean) as { icon: JSX.Element; v: string; l: string; lm: string }[];
  return (
    <Portal>
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[rgba(19,36,61,0.6)] p-0 sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Vue rapide : ${displayTitle(property)}, ${displayCity(property)}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[88vh] w-full max-w-[960px] grid-cols-1 overflow-y-auto rounded-t-[24px] bg-white px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2.5 shadow-2xl sm:rounded-[24px] sm:p-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
          >
            <span aria-hidden className="mx-auto mb-2 block h-1 w-10 rounded-full bg-brand-line sm:hidden" />
            <button type="button" onClick={onClose} aria-label="Fermer la vue rapide" className="absolute right-5 top-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-brand-ink shadow-lg sm:right-4 sm:top-4 sm:h-11 sm:w-11">
              <X className="h-[18px] w-[18px]" strokeWidth={2.4} />
            </button>
            <div className="relative h-[210px] overflow-hidden rounded-2xl bg-brand-tint sm:h-[300px] md:h-[440px]">
              <Slider images={imgs} index={photo} onIndex={setPhoto} alt={(k) => `${displayTitle(property)}, photo ${k + 1}`} className="absolute inset-0" keys arrowSize="sm" />
              {imgs.length > 1 && <span className="pointer-events-none absolute bottom-3 left-3 z-[2] inline-flex h-[28px] items-center rounded-lg bg-[rgba(19,36,61,0.82)] px-2.5 text-[12.5px] font-semibold text-white">{photo + 1} / {imgs.length}</span>}
              <span className="pointer-events-none absolute left-3 top-3 z-[2] inline-flex h-[30px] items-center rounded-full bg-white px-3 text-[13px] font-bold text-brand-ink">{property.type}</span>
              {property.exclusive && <span className="pointer-events-none absolute left-3 top-12 z-[2] inline-flex h-[26px] items-center rounded-full bg-brand-orange px-2.5 text-xs font-extrabold text-brand-ink">Exclusivité</span>}
            </div>
            <div className="flex min-w-0 flex-col gap-2.5 px-1 pb-1 pt-3.5 md:gap-3.5 md:px-[30px] md:pb-6 md:pt-[34px]">
              <span className="hidden text-xs font-extrabold uppercase tracking-[0.16em] text-brand-orange-text md:block">Vue rapide</span>
              <div className="flex items-start justify-between gap-3 md:block">
                <h3 className="m-0 min-w-0 font-display text-[21px] font-medium leading-tight text-brand-ink md:pr-10 md:text-[30px]">
                  {displayTitle(property)}<span className="hidden md:inline">, </span><em className="hidden font-normal italic text-brand-orange-lt md:inline">{displayCity(property)}</em>
                </h3>
                <span className="flex-none whitespace-nowrap font-display text-[22px] font-medium text-brand-ink md:hidden">{formatPrice(property.price)}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[14px] text-brand-mut md:text-[14.5px]"><MapPin className="h-[15px] w-[15px] flex-none text-brand-orange-text" />{displayCity(property)} · {property.postalCode}<span className="md:hidden">&nbsp;· {perM2(property)}</span></span>
              <div className="hidden flex-wrap items-baseline gap-2.5 md:flex">
                <span className="font-display text-[32px] font-medium tracking-[-0.01em] text-brand-ink">{formatPrice(property.price)}</span>
                <span className="text-xs font-bold text-brand-mut">FAI</span>
                <span className="text-[13.5px] text-brand-mut">{perM2(property)}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(110px,100%),1fr))] md:gap-2">
                {specs.map((s) => (
                  <div key={s.l} className="flex items-center gap-2 rounded-[10px] bg-brand-pale px-2.5 py-1.5 md:gap-2.5 md:px-3 md:py-2.5">
                    <span className="text-brand-orange-text">{s.icon}</span>
                    <span className="flex items-baseline gap-1 leading-tight md:flex-col md:items-start md:gap-0"><span className="text-[14.5px] font-bold text-brand-ink md:text-[15.5px]">{s.v}</span>{s.lm && <span className="text-[12.5px] text-brand-mut md:hidden">{s.lm}</span>}<span className="hidden text-[12.5px] text-brand-mut md:inline">{s.l}</span></span>
                  </div>
                ))}
              </div>
              <p className="m-0 hidden text-[15px] leading-relaxed text-brand-txt md:line-clamp-4">{property.description}</p>
              {featureBadges(property).length > 0 && (
                <div className="hidden flex-wrap gap-1.5 md:flex">
                  {featureBadges(property).map((b) => <span key={b} className="rounded-full border border-brand-orange/30 px-3 py-1 text-xs font-semibold text-brand-orange-text">{b}</span>)}
                </div>
              )}
              <div className="mt-1 grid grid-cols-[1.25fr_1fr] gap-2 md:flex md:flex-wrap md:gap-2.5">
                <Link to={`/biens/${property.id}`} className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[10px] bg-brand-orange px-3 text-[15px] font-bold text-brand-ink md:px-5 md:text-[15.5px]">
                  <span className="md:hidden">Voir le bien</span><span className="hidden md:inline">Voir la fiche détaillée</span> <ArrowRight className="h-[18px] w-[18px] flex-none" />
                </Link>
                <button
                  type="button"
                  onClick={() => { onClose(); openContact({ objet: "Visiter un bien", propertyRef: property.id, propertyTitle: `${displayTitle(property)}, ${displayCity(property)}`, propertyImage: property.images[0], propertyPrice: formatPrice(property.price) }); }}
                  className="inline-flex h-[50px] items-center justify-center rounded-[10px] border-[1.5px] border-brand px-3 text-[15px] font-bold text-brand md:px-5 md:text-[15.5px]"
                >
                  <span className="md:hidden">Visiter</span><span className="hidden md:inline">Demander une visite</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </Portal>
  );
};

/* ── Carte ── */
const PropertyCard = ({ property, index = 0, className, imgClassName }: PropertyCardProps) => {
  const [quick, setQuick] = useState(false);
  const voir = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuick(true);
  };
  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.07 }}
        className={cn("group relative flex flex-col rounded-[18px] bg-white p-2.5 transition-transform duration-300 hover:-translate-y-1", FRAME_SHADOW, className)}
      >
        <div className={cn("relative h-[210px] overflow-hidden rounded-xl bg-brand-tint", imgClassName)}>
          <img src={property.images[0]} alt={displayTitle(property)} loading="lazy" className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.045] md:group-hover:grayscale-[.45]" />
          <span className="absolute left-2.5 top-2.5 z-[2] inline-flex h-[30px] items-center rounded-full bg-white px-3 text-[13px] font-bold text-brand-ink">{property.type}</span>
          {property.exclusive && <span className="absolute left-2.5 top-11 z-[2] inline-flex h-[24px] items-center rounded-full bg-brand-orange px-2.5 text-[11.5px] font-extrabold text-brand-ink">Exclusivité</span>}
          {/* Survol (ordinateur) */}
          <div className="absolute inset-0 z-[3] hidden items-center justify-center gap-2.5 bg-[rgba(19,36,61,0.45)] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 md:flex">
            <button type="button" onClick={voir} className="inline-flex h-[46px] items-center gap-2 rounded-full bg-white px-[18px] text-[14.5px] font-extrabold text-brand-ink shadow-lg">
              <Eye className="h-[17px] w-[17px]" /> Vue rapide
            </button>
            <Link to={`/biens/${property.id}`} className="inline-flex h-[46px] items-center gap-2 rounded-full bg-brand-orange px-[18px] text-[14.5px] font-extrabold text-brand-ink shadow-lg">
              Détail <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {/* Téléphone */}
          <div className="absolute bottom-2.5 right-2.5 z-[3] flex gap-1.5 md:hidden">
            <button type="button" onClick={voir} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/95 px-3 text-[13px] font-extrabold text-brand-ink"><Eye className="h-[15px] w-[15px]" /> Vue rapide</button>
            <Link to={`/biens/${property.id}`} className="inline-flex h-9 items-center rounded-full bg-brand-orange px-3 text-[13px] font-extrabold text-brand-ink">Détail</Link>
          </div>
        </div>
        <Link to={`/biens/${property.id}`} className="flex flex-1 flex-col gap-1.5 px-2.5 pb-2 pt-4">
          <div className="flex items-baseline justify-between gap-2.5">
            <span className="inline-flex items-baseline gap-1.5">
              <span className="whitespace-nowrap font-display text-2xl font-medium tracking-[-0.01em] text-brand-ink">{formatPrice(property.price)}</span>
              <span className="text-xs font-bold text-brand-mut">FAI</span>
            </span>
            <span className="whitespace-nowrap text-[12.5px] text-brand-mut">{perM2(property)}</span>
          </div>
          <span className="text-base font-bold leading-snug text-brand-ink">{displayTitle(property)}</span>
          <span className="inline-flex items-center gap-1.5 text-sm text-brand-mut"><MapPin className="h-[15px] w-[15px] text-brand-orange-text" />{displayCity(property)} · {property.postalCode}</span>
          <div className="mt-auto flex flex-wrap items-center gap-x-3.5 gap-y-2 border-t border-brand-line2 pt-3 text-sm text-brand-mut">
            <span className="inline-flex items-center gap-1.5"><Maximize className="h-3.5 w-3.5 text-brand-orange-text" /> {formatSurface(property.surface)}</span>
            {property.rooms > 0 && <span className="inline-flex items-center gap-1.5"><LayoutGrid className="h-3.5 w-3.5 text-brand-orange-text" /> {property.rooms} p.</span>}
            {property.bedrooms > 0 && <span className="inline-flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5 text-brand-orange-text" /> {property.bedrooms} ch.</span>}
          </div>
        </Link>
      </motion.article>
      <QuickViewPopup property={property} open={quick} onClose={() => setQuick(false)} />
    </>
  );
};

export default PropertyCard;
