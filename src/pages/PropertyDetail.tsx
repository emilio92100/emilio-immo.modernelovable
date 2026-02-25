import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Maximize, BedDouble, Home, Calendar, Building, Thermometer,
  Car, ChevronLeft, ChevronRight, Phone, Mail, Compass, DoorOpen, ShieldCheck, Star, CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DPEBadge from "@/components/DPEBadge";
import { Property, mockProperties, formatPrice, fetchPropertiesFromFeed } from "@/lib/properties";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | undefined>(
    mockProperties.find((p) => p.id === id)
  );
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetchPropertiesFromFeed().then((data) => {
      const found = data.find((p) => p.id === id);
      if (found) setProperty(found);
      setLoading(false);
    });
  }, [id]);

  if (loading && !property) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 text-center container mx-auto px-6">
          <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-body text-muted-foreground">Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 text-center container mx-auto px-6">
          <h1 className="font-display text-3xl mb-4">Bien introuvable</h1>
          <Link to="/biens" className="text-accent hover:underline font-body">
            ← Retour aux biens
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => setCurrentImage((c) => (c + 1) % property.images.length);
  const prevImage = () => setCurrentImage((c) => (c - 1 + property.images.length) % property.images.length);

  const infoItems = [
    { icon: Maximize, label: "Surface", value: `${property.surface} m²` },
    property.rooms > 0 ? { icon: Home, label: "Pièces", value: `${property.rooms}` } : null,
    property.bedrooms > 0 ? { icon: BedDouble, label: "Chambres", value: `${property.bedrooms}` } : null,
    property.floor ? { icon: Building, label: "Étage", value: `${property.floor}/${property.totalFloors}` } : null,
    property.orientation ? { icon: Compass, label: "Orientation", value: property.orientation } : null,
    property.yearBuilt && property.yearBuilt > 0 ? { icon: Calendar, label: "Année", value: `${property.yearBuilt}` } : null,
    property.heating ? { icon: Thermometer, label: "Chauffage", value: property.heating } : null,
    property.parking ? { icon: Car, label: "Parking", value: `${property.parking} place(s)` } : null,
    property.elevator ? { icon: DoorOpen, label: "Ascenseur", value: "Oui" } : null,
    property.guardian ? { icon: ShieldCheck, label: "Gardien", value: "Oui" } : null,
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  // Build highlights
  const highlights: { icon: any; label: string }[] = [];
  if (property.balcony) highlights.push({ icon: Compass, label: "Balcon" });
  if (property.terrace) highlights.push({ icon: Compass, label: "Terrasse" });
  if (property.cave) highlights.push({ icon: DoorOpen, label: "Cave" });
  if (property.elevator) highlights.push({ icon: Building, label: "Ascenseur" });
  if (property.guardian) highlights.push({ icon: ShieldCheck, label: "Gardien / Concierge" });
  if (property.parking) highlights.push({ icon: Car, label: `Parking (${property.parking} place${property.parking > 1 ? "s" : ""})` });
  if (property.orientation) highlights.push({ icon: Compass, label: `Orientation ${property.orientation}` });
  if (property.exclusive) highlights.push({ icon: Star, label: "Exclusivité Émilio" });

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Sticky top back button - appears on scroll */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40">
        <Link
          to="/biens"
          className="flex items-center gap-2 bg-card/95 backdrop-blur-md text-foreground border border-border px-6 py-2.5 rounded-full font-body text-sm font-semibold shadow-lg hover:shadow-xl hover:border-accent transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Revenir au listing
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="pt-20 bg-secondary border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/biens"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent font-body text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux biens
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-primary">
        <div className="container mx-auto px-6 py-6">
          <div className="relative max-w-4xl mx-auto">
            <motion.img
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={property.images[currentImage]}
              alt={`${property.title} - Photo ${currentImage + 1}`}
              className="w-full aspect-[16/10] object-cover rounded"
            />
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-primary/70 text-primary-foreground px-3 py-1 rounded-full font-body text-xs">
                  {currentImage + 1} / {property.images.length}
                </div>
              </>
            )}
          </div>
          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="flex gap-2 mt-4 max-w-4xl mx-auto overflow-x-auto pb-2">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                    i === currentImage ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  {property.exclusive && (
                    <span className="bg-accent text-accent-foreground text-xs font-body font-semibold tracking-wider uppercase px-3 py-1 rounded">
                      Exclusivité
                    </span>
                  )}
                  <span className="bg-secondary text-foreground text-xs font-body px-3 py-1 rounded">
                    {property.type}
                  </span>
                  <span className="bg-secondary text-foreground text-xs font-body px-3 py-1 rounded">
                    Réf. {property.id}
                  </span>
                </div>
                <h1 className="font-display text-2xl md:text-3xl text-foreground mb-2">{property.title}</h1>
                <div className="flex items-center gap-1.5 text-muted-foreground font-body text-sm">
                  <MapPin className="w-4 h-4" />
                  {property.city} ({property.postalCode})
                </div>
                <p className="font-display text-3xl text-accent font-semibold mt-4">
                  {formatPrice(property.price)} <span className="text-lg font-body font-normal text-muted-foreground">FAI</span>
                </p>
                {property.charges && (
                  <p className="font-body text-muted-foreground text-sm mt-1">
                    Charges annuelles : {formatPrice(property.charges)}
                  </p>
                )}
              </div>

              {/* Les + du bien — EN HAUT */}
              {highlights.length > 0 && (
                <div className="bg-accent/5 border border-accent/20 rounded p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="font-display text-lg">Les + de ce bien</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {highlights.map((h) => (
                      <div key={h.label} className="flex items-center gap-3 bg-card rounded p-3 border border-border">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="font-body text-sm text-foreground">{h.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info grid */}
              <div className="bg-card border border-border rounded p-6">
                <h2 className="font-display text-lg mb-4">Caractéristiques</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {infoItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-body text-xs text-muted-foreground">{item.label}</p>
                        <p className="font-body text-sm font-semibold text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              {property.description && property.description.trim().length > 0 && (
                <div className="bg-card border border-border rounded p-6">
                  <h2 className="font-display text-lg mb-4">Description</h2>
                  <div className="font-body text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {property.description}
                  </div>
                </div>
              )}

              {/* DPE */}
              <div className="bg-card border border-border rounded p-6">
                <h2 className="font-display text-lg mb-6">Diagnostic de Performance Énergétique</h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  <DPEBadge
                    label="Consommation énergétique (DPE)"
                    value={property.energyClass}
                    type="energy"
                  />
                  <DPEBadge
                    label="Émissions de gaz à effet de serre (GES)"
                    value={property.gesClass}
                    type="ges"
                  />
                </div>
                {(property.consoEnergie || property.valeurGes) && (
                  <div className="mt-4 pt-4 border-t border-border flex gap-6 font-body text-xs text-muted-foreground">
                    {property.consoEnergie && <span>Conso. : {property.consoEnergie} kWh/m²/an</span>}
                    {property.valeurGes && <span>GES : {property.valeurGes} kg CO₂/m²/an</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded p-6 sticky top-24">
                <h3 className="font-display text-lg mb-4">Intéressé par ce bien ?</h3>
                <p className="font-body text-muted-foreground text-sm mb-6">
                  Contactez-nous pour organiser une visite ou obtenir plus d'informations.
                </p>
                <a
                  href="tel:+33184801400"
                  className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded font-body font-semibold text-sm hover:brightness-110 transition-all w-full mb-3"
                >
                  <Phone className="w-4 h-4" /> 01 84 80 14 00
                </a>
                <a
                  href="mailto:agence@emilio-immo.com"
                  className="flex items-center justify-center gap-2 border border-border px-5 py-3 rounded font-body text-sm hover:bg-muted transition-colors w-full"
                >
                  <Mail className="w-4 h-4" /> agence@emilio-immo.com
                </a>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="font-body text-xs text-muted-foreground mb-2">Commodités</p>
                  <div className="flex flex-wrap gap-2">
                    {property.cave && <span className="bg-secondary text-foreground text-xs font-body px-2 py-1 rounded">Cave</span>}
                    {property.balcony && <span className="bg-secondary text-foreground text-xs font-body px-2 py-1 rounded">Balcon</span>}
                    {property.elevator && <span className="bg-secondary text-foreground text-xs font-body px-2 py-1 rounded">Ascenseur</span>}
                    {property.guardian && <span className="bg-secondary text-foreground text-xs font-body px-2 py-1 rounded">Gardien</span>}
                    {property.parking && <span className="bg-secondary text-foreground text-xs font-body px-2 py-1 rounded">Parking</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default PropertyDetail;
