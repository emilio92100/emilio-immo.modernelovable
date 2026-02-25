import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { mockProperties } from "@/lib/properties";

const Properties = () => {
  const [searchCity, setSearchCity] = useState("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [surfaceMin, setSurfaceMin] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return mockProperties.filter((p) => {
      if (searchCity && !p.city.toLowerCase().includes(searchCity.toLowerCase()) && !p.postalCode.includes(searchCity)) return false;
      if (priceMax && p.price > Number(priceMax)) return false;
      if (surfaceMin && p.surface < Number(surfaceMin)) return false;
      return true;
    });
  }, [searchCity, priceMax, surfaceMin]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">Nos Biens Immobiliers</h1>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="font-body text-primary-foreground/70 max-w-xl mx-auto">
            Découvrez notre sélection de biens en Île-de-France.
          </p>
        </div>
      </section>

      <section className="py-8 bg-secondary border-b border-border sticky top-[60px] z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par ville ou code postal..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 border border-border rounded font-body text-sm bg-card hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filtres
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid sm:grid-cols-2 gap-4 animate-fade-in">
              <div>
                <label className="font-body text-xs text-muted-foreground mb-1 block">Prix maximum (€)</label>
                <input
                  type="number"
                  placeholder="Ex: 500000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground mb-1 block">Surface minimum (m²)</label>
                <input
                  type="number"
                  placeholder="Ex: 50"
                  value={surfaceMin}
                  onChange={(e) => setSurfaceMin(e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <p className="font-body text-muted-foreground text-sm mb-6">{filtered.length} bien(s) trouvé(s)</p>
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <ContactForm />
      <Footer />
    </div>
  );
};

export default Properties;
