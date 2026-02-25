import { Property, formatPrice } from "@/lib/properties";
import { MapPin, Maximize, BedDouble, Home } from "lucide-react";
import { motion } from "framer-motion";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group bg-card rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border"
  >
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
          {formatPrice(property.price)}
        </span>
      </div>
    </div>

    <div className="p-5">
      <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-1">
        {property.title}
      </h3>
      <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3 font-body">
        <MapPin className="w-3.5 h-3.5" />
        {property.city} ({property.postalCode})
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground font-body border-t border-border pt-3">
        <span className="flex items-center gap-1">
          <Maximize className="w-3.5 h-3.5" /> {property.surface} m²
        </span>
        <span className="flex items-center gap-1">
          <Home className="w-3.5 h-3.5" /> {property.rooms} pièces
        </span>
        {property.bedrooms > 0 && (
          <span className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5" /> {property.bedrooms} ch.
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

export default PropertyCard;
