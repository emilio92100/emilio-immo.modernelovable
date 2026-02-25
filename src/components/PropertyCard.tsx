import { Property, formatPrice } from "@/lib/properties";
import { MapPin, Maximize, BedDouble, Home, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const getDisplayTitle = (property: Property) => {
  // Remove city name from title (format: "Type Xp - Ville")
  return property.title.replace(/\s*[-–]\s*[^-–]+$/, '');
};

const getDisplayCity = (property: Property) => {
  const city = property.city;
  // If Paris, ensure arrondissement is shown
  if (city.toLowerCase().startsWith("paris") && property.postalCode.startsWith("75")) {
    const arrNum = parseInt(property.postalCode.slice(3), 10);
    if (arrNum > 0 && !city.includes("ème") && !city.includes("er")) {
      return `Paris ${arrNum}${arrNum === 1 ? "er" : "ème"}`;
    }
  }
  return city;
};

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group bg-card rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border relative"
  >
    <Link to={`/biens/${property.id}`} className="block">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {property.exclusive && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-body font-semibold tracking-wider uppercase px-3 py-1 rounded">
            Exclusivité
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4 pt-10">
          <span className="text-primary-foreground font-display text-xl font-semibold">
            {formatPrice(property.price)} <span className="text-sm font-body font-normal opacity-80">FAI</span>
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
          <Eye className="w-8 h-8 text-primary-foreground mb-2" />
          <p className="text-primary-foreground font-body text-sm text-center leading-relaxed line-clamp-3">
            {property.description}
          </p>
          <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded font-body text-xs font-semibold mt-2">
            Voir le détail <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {getDisplayTitle(property)}
        </h3>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3 font-body">
          <MapPin className="w-3.5 h-3.5" />
          {getDisplayCity(property)}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground font-body border-t border-border pt-3">
          <span className="flex items-center gap-1">
            <Maximize className="w-3.5 h-3.5" /> {property.surface} m²
          </span>
          {property.rooms > 0 && (
            <span className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> {property.rooms} pièces
            </span>
          )}
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5" /> {property.bedrooms} ch.
            </span>
          )}
        </div>
      </div>
    </Link>
  </motion.div>
);

export default PropertyCard;
