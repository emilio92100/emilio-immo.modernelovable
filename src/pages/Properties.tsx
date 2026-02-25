import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, Lock, ArrowRight, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Property, mockProperties, formatPrice, fetchPropertiesFromFeed } from "@/lib/properties";

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [roomsFilter, setRoomsFilter] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [groundFloor, setGroundFloor] = useState<"any" | "yes" | "no">("any");
  const [balconyFilter, setBalconyFilter] = useState(false);
  const [terraceFilter, setTerraceFilter] = useState(false);

  useEffect(() => {
    fetchPropertiesFromFeed().then((data) => {
      setProperties(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (searchCity && !p.city.toLowerCase().includes(searchCity.toLowerCase()) && !p.postalCode.includes(searchCity)) return false;
      if (priceMin && p.price < Number(priceMin)) return false;
      if (priceMax && p.price > Number(priceMax)) return false;
      if (roomsFilter && p.rooms !== Number(roomsFilter)) return false;
      if (typeFilter && p.type.toLowerCase() !== typeFilter.toLowerCase()) return false;
      if (groundFloor === "yes" && (p.floor !== 0 && p.floor !== undefined)) return false;
      if (groundFloor === "no" && p.floor === 0) return false;
      if (balconyFilter && !p.balcony) return false;
      if (terraceFilter && !p.terrace) return false;
      return true;
    });
  }, [properties, searchCity, priceMin, priceMax, roomsFilter, typeFilter, groundFloor, balconyFilter, terraceFilter]);

  const uniqueCities = useMemo(() => [...new Set(properties.map(p => p.city))].sort(), [properties]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HEADER */}
      <section className="pt-28 pb-12 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">Nos Biens Immobiliers</h1>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="font-body text-primary-foreground/70 max-w-xl mx-auto">
            Découvrez notre sélection de biens en Île-de-France.
          </p>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="py-8 bg-secondary border-b border-border sticky top-[60px] z-40">
        <div className="container mx-auto px-6">
          {/* Main filters row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* City */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ville ou code postal..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                list="cities-list"
              />
              <datalist id="cities-list">
                {uniqueCities.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            {/* Rooms */}
            <select
              value={roomsFilter}
              onChange={(e) => setRoomsFilter(e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 appearance-none"
            >
              <option value="">Nb de pièces</option>
              <option value="1">1 pièce</option>
              <option value="2">2 pièces</option>
              <option value="3">3 pièces</option>
              <option value="4">4 pièces</option>
              <option value="5">5+ pièces</option>
            </select>

            {/* Price range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Prix min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-1/2 px-3 py-3 bg-card border border-border rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <input
                type="number"
                placeholder="Prix max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-1/2 px-3 py-3 bg-card border border-border rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>

            {/* Advanced toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-center gap-2 px-5 py-3 border border-border rounded font-body text-sm bg-card hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Recherche avancée
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Advanced filters */}
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {/* Type */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 appearance-none"
              >
                <option value="">Type de bien</option>
                <option value="Appartement">Appartement</option>
                <option value="Maison">Maison</option>
                <option value="Immeuble">Immeuble</option>
              </select>

              {/* Ground floor */}
              <select
                value={groundFloor}
                onChange={(e) => setGroundFloor(e.target.value as "any" | "yes" | "no")}
                className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 appearance-none"
              >
                <option value="any">Étage (tous)</option>
                <option value="yes">RDC uniquement</option>
                <option value="no">Étage uniquement</option>
              </select>

              {/* Balcony */}
              <label className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded font-body text-sm cursor-pointer hover:bg-muted transition-colors">
                <input
                  type="checkbox"
                  checked={balconyFilter}
                  onChange={(e) => setBalconyFilter(e.target.checked)}
                  className="w-4 h-4 accent-accent"
                />
                Balcon
              </label>

              {/* Terrace */}
              <label className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded font-body text-sm cursor-pointer hover:bg-muted transition-colors">
                <input
                  type="checkbox"
                  checked={terraceFilter}
                  onChange={(e) => setTerraceFilter(e.target.checked)}
                  className="w-4 h-4 accent-accent"
                />
                Terrasse
              </label>
            </motion.div>
          )}
        </div>
      </section>

      {/* LISTING */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <p className="font-body text-muted-foreground text-sm mb-6 text-center">{filtered.length} bien(s) trouvé(s)</p>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-body text-muted-foreground">Chargement des biens...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-body text-muted-foreground">Aucun bien ne correspond à vos critères.</p>
            </div>
          )}
        </div>
      </section>

      {/* OFF-MARKET CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Lock className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-display text-2xl md:text-4xl text-primary-foreground mb-4">
              Vous ne voyez qu'une partie de nos biens
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-4">
              Nous travaillons en grande partie sur du <span className="text-gold font-semibold italic">off-market</span>. 
              De nombreux biens d'exception ne sont jamais publiés en ligne et restent accessibles uniquement via notre réseau confidentiel.
            </p>
            <p className="font-body text-primary-foreground/60 text-sm mb-8">
              Confiez-nous votre recherche et accédez à des opportunités exclusives avant tout le monde.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/mandat-recherche"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:brightness-110 transition-all"
              >
                Nous confier votre recherche <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+33100000000"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:bg-primary-foreground/10 transition-all"
              >
                <Phone className="w-4 h-4" /> Nous appeler
              </a>
            </div>

            <div className="flex items-center justify-center gap-6 text-primary-foreground/50 font-body text-xs">
              <span className="flex items-center gap-2"><Mail className="w-3 h-3" /> contact@emilio-conseil.fr</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
