import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { Search, SlidersHorizontal, X, Lock, ArrowRight, Phone, Map, LayoutGrid, ChevronDown, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const [groundFloor, setGroundFloor] = useState<"any" | "yes" | "no" | "last">("any");
  const [balconyFilter, setBalconyFilter] = useState(false);
  const [terraceFilter, setTerraceFilter] = useState(false);
  const [elevatorFilter, setElevatorFilter] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

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
      if (groundFloor === "last" && (p.floor === undefined || p.totalFloors === undefined || p.floor !== p.totalFloors)) return false;
      if (groundFloor === "last" && (p.floor === undefined || p.totalFloors === undefined || p.floor !== p.totalFloors)) return false;
      if (balconyFilter && !p.balcony) return false;
      if (terraceFilter && !p.terrace) return false;
      if (elevatorFilter && !p.elevator) return false;
      return true;
    });
  }, [properties, searchCity, priceMin, priceMax, roomsFilter, typeFilter, groundFloor, balconyFilter, terraceFilter, elevatorFilter]);

  const uniqueCities = useMemo(() => [...new Set(properties.map(p => p.city))].sort(), [properties]);

  const activeFiltersCount = [searchCity, priceMin, priceMax, roomsFilter, typeFilter, groundFloor !== "any", balconyFilter, terraceFilter, elevatorFilter].filter(Boolean).length;

  const clearFilters = () => {
    setSearchCity("");
    setPriceMin("");
    setPriceMax("");
    setRoomsFilter("");
    setTypeFilter("");
    setGroundFloor("any");
    setBalconyFilter(false);
    setTerraceFilter(false);
    setElevatorFilter(false);
  };

  // Map view: grouped by city
  const citiesWithProperties = useMemo(() => {
    const cityMap: Record<string, Property[]> = {};
    filtered.forEach(p => {
      if (!cityMap[p.city]) cityMap[p.city] = [];
      cityMap[p.city].push(p);
    });
    return Object.entries(cityMap).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

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

      {/* SEARCH BAR - Compact & Modern */}
      <section className="py-4 bg-card border-b border-border md:sticky md:top-[60px] z-40 shadow-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-secondary/50 backdrop-blur-sm rounded-2xl p-3 border border-border"
          >
            {/* Main filters row */}
            <div className="flex flex-col sm:flex-row gap-2">
              {/* City search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <input
                  type="text"
                  placeholder="Ville ou code postal..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-card border border-border rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  list="cities-list"
                />
                <datalist id="cities-list">
                  {uniqueCities.map(c => <option key={c} value={c} />)}
                </datalist>
              </div>

              {/* Rooms */}
              <div className="relative sm:w-32">
                <select
                  value={roomsFilter}
                  onChange={(e) => setRoomsFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-card border border-border rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 appearance-none cursor-pointer"
                >
                  <option value="">Pièces</option>
                  <option value="1">1 pièce</option>
                  <option value="2">2 pièces</option>
                  <option value="3">3 pièces</option>
                  <option value="4">4 pièces</option>
                  <option value="5">5+ pièces</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>

              {/* Price range */}
              <div className="flex gap-1.5 sm:w-48">
                <input
                  type="number"
                  placeholder="Min €"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-1/2 px-2.5 py-2.5 bg-card border border-border rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <input
                  type="number"
                  placeholder="Max €"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-1/2 px-2.5 py-2.5 bg-card border border-border rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>

              {/* Advanced toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-body text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                  showAdvanced ? "bg-accent text-accent-foreground" : "bg-card border border-border hover:border-accent/40"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filtres Avancés
                {activeFiltersCount > 0 && (
                  <span className="bg-accent text-accent-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Advanced filters */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div className="relative">
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full px-3 py-2.5 bg-card border border-border rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 appearance-none"
                      >
                        <option value="">Type de bien</option>
                        <option value="Appartement">Appartement</option>
                        <option value="Maison">Maison</option>
                        <option value="Immeuble">Immeuble</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        value={groundFloor}
                        onChange={(e) => setGroundFloor(e.target.value as "any" | "yes" | "no" | "last")}
                        className="w-full px-3 py-2.5 bg-card border border-border rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 appearance-none"
                      >
                        <option value="any">Étage (tous)</option>
                        <option value="yes">RDC uniquement</option>
                        <option value="no">Étage uniquement</option>
                        <option value="last">Dernier étage</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    </div>

                    <label className="flex items-center gap-2 px-3 py-2.5 bg-card border border-border rounded-xl font-body text-sm cursor-pointer hover:border-accent/40 transition-colors">
                      <input type="checkbox" checked={balconyFilter} onChange={(e) => setBalconyFilter(e.target.checked)} className="w-3.5 h-3.5 accent-accent rounded" />
                      Balcon
                    </label>

                    <label className="flex items-center gap-2 px-3 py-2.5 bg-card border border-border rounded-xl font-body text-sm cursor-pointer hover:border-accent/40 transition-colors">
                      <input type="checkbox" checked={terraceFilter} onChange={(e) => setTerraceFilter(e.target.checked)} className="w-3.5 h-3.5 accent-accent rounded" />
                      Terrasse
                    </label>

                    <label className="flex items-center gap-2 px-3 py-2.5 bg-card border border-border rounded-xl font-body text-sm cursor-pointer hover:border-accent/40 transition-colors">
                      <input type="checkbox" checked={elevatorFilter} onChange={(e) => setElevatorFilter(e.target.checked)} className="w-3.5 h-3.5 accent-accent rounded" />
                      Ascenseur
                    </label>
                  </div>
                  {activeFiltersCount > 0 && (
                    <div className="mt-2 flex justify-end">
                      <button onClick={clearFilters} className="flex items-center gap-1.5 text-accent font-body text-xs font-semibold hover:underline">
                        <X className="w-3 h-3" /> Réinitialiser
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LISTING */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <p className="font-body text-muted-foreground text-sm">{filtered.length} bien(s) trouvé(s)</p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-body text-sm transition-colors ${viewMode === "list" ? "bg-accent text-accent-foreground" : "bg-card border border-border hover:bg-muted"}`}
              >
                <LayoutGrid className="w-4 h-4" /> Liste
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-body text-sm transition-colors ${viewMode === "map" ? "bg-accent text-accent-foreground" : "bg-card border border-border hover:bg-muted"}`}
              >
                <MapPin className="w-4 h-4" /> Par ville
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-body text-muted-foreground">Chargement des biens...</p>
            </div>
          ) : viewMode === "map" ? (
            /* City grouped view */
            <div className="space-y-10">
              {citiesWithProperties.length > 0 ? citiesWithProperties.map(([city, props]) => (
                <motion.div
                  key={city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground">{city}</h3>
                      <p className="font-body text-muted-foreground text-xs">{props.length} bien(s)</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {props.map((p, i) => (
                      <PropertyCard key={p.id} property={p} index={i} />
                    ))}
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-20">
                  <p className="font-body text-muted-foreground">Aucun bien ne correspond à vos critères.</p>
                </div>
              )}
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
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-secondary border border-border rounded-lg p-10 md:p-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <Lock className="w-6 h-6 text-accent" />
              <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Off-market</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              Vous ne voyez qu'une partie de nos biens
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-4 max-w-2xl mx-auto">
              Nous travaillons en grande partie sur du <span className="text-accent font-semibold italic">off-market</span>.
              De nombreux biens d'exception ne sont jamais publiés en ligne et restent accessibles uniquement via notre réseau confidentiel.
            </p>
            <p className="font-body text-muted-foreground/70 text-sm mb-8">
              Confiez-nous votre recherche et accédez à des opportunités exclusives avant tout le monde.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/mandat-recherche"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:brightness-110 transition-all"
              >
                Nous confier votre recherche <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+33184801400"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:bg-muted transition-all"
              >
                <Phone className="w-4 h-4" /> 01 84 80 14 00
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
