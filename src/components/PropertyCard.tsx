import { useState } from "react";
import { Property, formatPrice } from "@/lib/properties";
import { MapPin, Maximize, BedDouble, Home, Eye, ArrowRight, Bath, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";


interface PropertyCardProps {
  property: Property;
  index?: number;
}

const getDisplayTitle = (property: Property) => {
  const type = property.type || "Bien";
  if (property.rooms > 0) {
    return `${type} ${property.rooms} pièce${property.rooms > 1 ? "s" : ""}`;
  }
  return type;
};

const getDisplayCity = (property: Property) => {
  const city = property.city;
  if (city.toLowerCase().startsWith("paris") && property.postalCode.startsWith("75")) {
    const arrNum = parseInt(property.postalCode.slice(3), 10);
    if (arrNum > 0 && !city.includes("ème") && !city.includes("er")) {
      return `Paris ${arrNum}${arrNum === 1 ? "er" : "ème"}`;
    }
  }
  return city;
};

const getFeatureBadges = (property: Property) => {
  const badges: string[] = [];
  if (property.parking && property.parking > 0) badges.push("Parking");
  if (property.terrace) badges.push("Terrasse");
  if (property.balcony) badges.push("Balcon");
  if (property.garden) badges.push("Jardin");
  if (property.cave) badges.push("Cave");
  if (property.elevator) badges.push("Ascenseur");
  return badges;
};

/* ── Quick View Popup ── */
const QuickViewPopup = ({
  property,
  open,
  onClose,
}: {
  property: Property;
  open: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full mx-4 bg-card rounded-xl overflow-hidden shadow-2xl border border-border"
        >
          {/* Image header */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-foreground/60 hover:bg-foreground/80 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-background" />
            </button>
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-body font-bold tracking-wider uppercase px-3 py-1.5 rounded">
              Vente
            </span>
            {property.exclusive && (
              <span className="absolute top-3 left-[5.5rem] bg-accent text-accent-foreground text-xs font-body font-bold tracking-wider uppercase px-3 py-1.5 rounded">
                Exclusivité
              </span>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-5 pt-14">
              <span className="text-primary-foreground font-display text-2xl font-bold">
                {formatPrice(property.price)}
              </span>
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.3 }}
            className="p-6 space-y-4"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {getDisplayTitle(property)}
              </h3>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1 font-body">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                {getDisplayCity(property)}, {property.postalCode}
              </div>
            </div>

            <div className="flex items-center gap-5 text-sm text-muted-foreground font-body border-t border-b border-border py-3">
              <span className="flex items-center gap-1.5">
                <Maximize className="w-4 h-4 text-accent" /> {property.surface} m²
              </span>
              {property.rooms > 0 && (
                <span className="flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-accent" /> {property.rooms} pièces
                </span>
              )}
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1.5">
                  <BedDouble className="w-4 h-4 text-accent" /> {property.bedrooms} ch.
                </span>
              )}
            </div>

            <p className="font-body text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {property.description}
            </p>

            {getFeatureBadges(property).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {getFeatureBadges(property).map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-body font-medium text-accent border border-accent/30 rounded-full px-3 py-1"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 border border-border text-foreground font-body font-semibold text-sm py-3 rounded-lg hover:bg-muted transition-colors"
              >
                Fermer
              </button>
              <Link
                to={`/biens/${property.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-body font-semibold text-sm py-3 rounded-lg hover:brightness-110 transition-all"
              >
                <ArrowRight className="w-4 h-4" /> Voir en détail
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ── Property Card ── */
const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const [quickView, setQuickView] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border"
      >
        {/* Image zone */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />

          {/* Badge VENTE */}
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[11px] font-body font-bold tracking-wider uppercase px-3 py-1 rounded z-10">
            Vente
          </span>
          {property.exclusive && (
            <span className="absolute top-3 left-[5rem] bg-accent text-accent-foreground text-[11px] font-body font-bold tracking-wider uppercase px-3 py-1 rounded z-10">
              Exclusivité
            </span>
          )}

          {/* Price overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/85 to-transparent p-4 pt-12">
            <span className="text-primary-foreground font-display text-xl font-bold">
              {formatPrice(property.price)}{" "}
              <span className="text-sm font-body font-normal opacity-70">FAI</span>
            </span>
          </div>

          {/* Hover overlay with 2 buttons */}
          <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickView(true);
              }}
              className="flex items-center gap-2 bg-background/95 text-foreground px-5 py-2.5 rounded-lg font-body text-sm font-semibold hover:bg-background transition-colors shadow-lg"
            >
              <Eye className="w-4 h-4" /> Vue rapide
            </button>
            <Link
              to={`/biens/${property.id}`}
              className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-body text-sm font-semibold hover:brightness-110 transition-all shadow-lg"
            >
              <ArrowRight className="w-4 h-4" /> Détails
            </Link>
          </div>
        </div>

        {/* Info zone */}
        <Link to={`/biens/${property.id}`} className="block p-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-1">
            {getDisplayTitle(property)}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3 font-body">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            {getDisplayCity(property)}, {property.postalCode}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground font-body border-t border-border pt-3">
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-accent" /> {property.surface} m²
            </span>
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-accent" /> {property.bedrooms} ch.
              </span>
            )}
          </div>
        </Link>
      </motion.div>

      {/* Quick View Dialog */}
      <QuickViewPopup
        property={property}
        open={quickView}
        onClose={() => setQuickView(false)}
      />
    </>
  );
};

export default PropertyCard;
