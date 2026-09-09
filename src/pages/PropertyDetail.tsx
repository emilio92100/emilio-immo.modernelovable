import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { checkSubmission, honeypotFieldName, honeypotStyle, markSubmitted } from "@/lib/antiBot";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Maximize, BedDouble, Home, Calendar, Building, Thermometer,
  Car, ChevronLeft, ChevronRight, Phone, Mail, Compass, DoorOpen, ShieldCheck, Star, CheckCircle, Send, X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DPEBadge from "@/components/DPEBadge";
import SuccessPopup from "@/components/SuccessPopup";
import { Property, mockProperties, formatPrice, fetchPropertiesFromFeed, RoomDetail } from "@/lib/properties";

/* ---------- Room Details Popup Block ---------- */
const RoomDetailsBlock = ({ roomDetails }: { roomDetails: RoomDetail[] }) => {
  const formatLevel = (level: number | null | undefined) => {
    if (level === null || level === undefined || level === 0) return "—";
    return `Étage ${level}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full bg-gradient-to-r from-accent to-accent/80 rounded-lg p-6 shadow-lg hover:brightness-110 transition-all cursor-pointer text-left group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl text-accent-foreground">Détail des pièces</h2>
                <p className="font-body text-sm text-accent-foreground/80 mt-1">
                  {roomDetails.length} surface{roomDetails.length > 1 ? "s" : ""} — <span className="underline underline-offset-2">cliquez pour voir</span>
                </p>
              </div>
            </div>
            <div className="w-10 h-10 bg-accent-foreground/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Maximize className="w-5 h-5 text-accent-foreground" />
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[75vh] flex flex-col rounded-2xl p-0 gap-0 overflow-hidden border-0 shadow-2xl [&>button.absolute]:text-primary-foreground [&>button.absolute]:opacity-100 [&>button.absolute]:hover:text-white">
        {/* Fixed header */}
        <div className="px-6 pt-6 pb-4 bg-gradient-to-br from-primary to-navy-light relative">
          <DialogTitle className="font-display text-xl text-primary-foreground flex items-center gap-3 pr-8">
            <div className="w-11 h-11 bg-primary-foreground/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span>Détail des pièces</span>
              <p className="text-sm font-body font-normal text-primary-foreground/70 mt-0.5">{roomDetails.length} surface{roomDetails.length > 1 ? "s" : ""}</p>
            </div>
          </DialogTitle>
        </div>

        {/* Fixed column headers */}
        <div className="px-6 pt-3 pb-2 bg-background border-b border-border">
          <div className="grid grid-cols-[1fr_2fr_1fr] gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Niveau</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Pièce</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent text-right">Surface</span>
          </div>
        </div>

        {/* Scrollable rows */}
        <div className="overflow-y-auto flex-1 px-6 py-2">
          {roomDetails.map((room, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr_1fr] gap-2 py-3 border-b border-border/30 last:border-0 hover:bg-accent/5 rounded-lg px-1 transition-colors">
              <span className="text-sm text-muted-foreground font-body">{formatLevel(room.level)}</span>
              <span className="text-sm text-foreground font-medium font-body">{room.type}</span>
              <span className="text-sm text-foreground font-body text-right">{room.surface > 0 ? `${room.surface} m²` : "—"}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
import { supabase } from "@/integrations/supabase/client";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | undefined>(
    mockProperties.find((p) => p.id === id)
  );
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
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
        <SEOHead
          title="Bien introuvable — Emilio Immobilier"
          description="Ce bien n'est plus disponible. Découvrez nos autres biens à vendre à Paris et dans les Hauts-de-Seine."
          noindex
        />
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

  // Build highlights (attractive features)
  const highlights: { icon: any; label: string }[] = [];
  if (property.balcony) highlights.push({ icon: Compass, label: "Balcon" });
  if (property.terrace) highlights.push({ icon: Compass, label: "Terrasse" });
  if (property.garden) highlights.push({ icon: Compass, label: "Jardin" });
  if (property.cave) highlights.push({ icon: DoorOpen, label: "Cave" });
  if (property.elevator) highlights.push({ icon: Building, label: "Ascenseur" });
  if (property.guardian) highlights.push({ icon: ShieldCheck, label: "Gardien / Concierge" });
  if (property.parking) highlights.push({ icon: Car, label: `Parking (${property.parking} place${property.parking > 1 ? "s" : ""})` });
  if (property.orientation) highlights.push({ icon: Compass, label: `Orientation ${property.orientation}` });
  if (property.exclusive) highlights.push({ icon: Star, label: "Exclusivité" });

  // Build characteristics, excluding items already in highlights
  const highlightLabels = new Set(["Ascenseur", "Gardien", "Parking", "Orientation"]);
  const infoItems = [
    { icon: Maximize, label: "Surface", value: `${property.surface} m²` },
    property.rooms > 0 ? { icon: Home, label: "Pièces", value: `${property.rooms}` } : null,
    property.bedrooms > 0 ? { icon: BedDouble, label: "Chambres", value: `${property.bedrooms}` } : null,
    property.floor ? { icon: Building, label: "Étage", value: `${property.floor}/${property.totalFloors}` } : null,
    !property.orientation ? null : null, // already in highlights
    property.yearBuilt && property.yearBuilt > 0 ? { icon: Calendar, label: "Année", value: `${property.yearBuilt}` } : null,
    property.heating ? { icon: Thermometer, label: "Chauffage", value: property.heating } : null,
    // Skip parking, elevator, guardian — they're in highlights
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  return (
    <div className="min-h-screen">
      {(() => {
        const city = getDisplayCity(property);
        const baseTitle = getDisplayTitle(property);
        const surfaceStr = property.surface ? `${property.surface} m²` : "";
        // SEO title: "Appartement 3 pièces 60m² — Boulogne-Billancourt | Emilio Immobilier"
        const seoTitle = `${baseTitle}${surfaceStr ? " " + surfaceStr : ""} — ${city} | Emilio Immobilier`.slice(0, 75);
        const bedStr = property.bedrooms ? `, ${property.bedrooms} chambre${property.bedrooms > 1 ? "s" : ""}` : "";
        const seoDesc = `${baseTitle} à vendre à ${city}${surfaceStr ? " — " + surfaceStr : ""}${bedStr}. ${formatPrice(property.price)}. Découvrez ce bien chez Emilio Immobilier, votre expert immobilier local.`.slice(0, 160);
        const url = `https://www.emilio-immo.com/biens/${property.id}`;
        return (
          <SEOHead
            title={seoTitle}
            description={seoDesc}
            canonical={url}
            jsonLd={{
              "@context": "https://schema.org",
              "@type": property.type === "Maison" ? "House" : "Apartment",
              name: `${baseTitle} — ${city}`,
              url,
              description: property.description?.slice(0, 500),
              image: property.images?.slice(0, 6),
              datePosted: property.dateAdded,
              numberOfRooms: property.rooms || undefined,
              numberOfBedroomsTotal: property.bedrooms || undefined,
              floorSize: property.surface
                ? { "@type": "QuantitativeValue", value: property.surface, unitCode: "MTK" }
                : undefined,
              yearBuilt: property.yearBuilt || undefined,
              address: {
                "@type": "PostalAddress",
                addressLocality: city,
                postalCode: property.postalCode,
                addressCountry: "FR",
              },
              brokeredBy: {
                "@type": "RealEstateAgent",
                name: "Emilio Immobilier",
                url: "https://www.emilio-immo.com",
                telephone: "+33184801400",
                priceRange: "€€€",
                image: "https://www.emilio-immo.com/logo.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "10 Avenue Kléber",
                  addressLocality: "Paris",
                  postalCode: "75016",
                  addressCountry: "FR",
                },
              },
            }}
          />
        );
      })()}
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
      <section className="bg-secondary">
        <div className="container mx-auto px-6 py-6">
          <div className="relative max-w-4xl mx-auto">
            <motion.img
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={property.images[currentImage]}
              alt={`${property.title} - Photo ${currentImage + 1}`}
              className="w-full aspect-[16/10] object-cover rounded cursor-pointer"
              onClick={() => setLightboxOpen(true)}
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
                <h1 className="font-display text-2xl md:text-3xl text-foreground mb-2">{getDisplayTitle(property)}</h1>
                <div className="flex items-center gap-1.5 text-muted-foreground font-body text-sm">
                  <MapPin className="w-4 h-4" />
                  {getDisplayCity(property)} ({property.postalCode})
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
                <div className="bg-primary rounded-lg p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <h2 className="font-display text-lg text-primary-foreground">Les + de ce bien</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {highlights.map((h) => (
                      <div key={h.label} className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-3 border border-primary-foreground/15">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="font-body text-sm text-primary-foreground">{h.label}</span>
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

              {property.description && property.description.trim().length > 0 && (
                <div className="bg-card border border-border rounded p-6">
                  <h2 className="font-display text-lg mb-4">Description</h2>
                  <div className="font-body text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {property.description}
                  </div>
                </div>
              )}

              {/* Room details - collapsible */}
              {property.roomDetails && property.roomDetails.length > 0 && (
                <RoomDetailsBlock roomDetails={property.roomDetails} />
              )}

              {/* DPE */}
              <div className="bg-card border border-border rounded p-6">
                <h2 className="font-display text-lg mb-6">Diagnostic de Performance Énergétique</h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  <DPEBadge
                    label="Consommation énergétique (DPE)"
                    value={property.energyClass}
                    type="energy"
                    consoValue={property.consoEnergie}
                  />
                  <DPEBadge
                    label="Émissions de gaz à effet de serre (GES)"
                    value={property.gesClass}
                    type="ges"
                    consoValue={property.valeurGes}
                  />
                </div>
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

                {/* Callback form */}
                <CallbackForm propertyRef={property.id} propertyTitle={property.title} />

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="font-body text-xs text-muted-foreground mb-2">Commodités</p>
                  <div className="flex flex-wrap gap-2">
                    {property.cave && <span className="bg-secondary text-foreground text-xs font-body px-2 py-1 rounded">Cave</span>}
                    {property.balcony && <span className="bg-secondary text-foreground text-xs font-body px-2 py-1 rounded">Balcon</span>}
                    {property.terrace && <span className="bg-secondary text-foreground text-xs font-body px-2 py-1 rounded">Terrasse</span>}
                    {property.garden && <span className="bg-secondary text-foreground text-xs font-body px-2 py-1 rounded">Jardin</span>}
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

      {/* Fullscreen Lightbox (mobile) */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2.5 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm p-2.5 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={property.images[currentImage]}
              alt={`Photo ${currentImage + 1}`}
              className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm p-2.5 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-body text-sm">
              {currentImage + 1} / {property.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactForm />
      <Footer />
    </div>
  );
};

/* ---------- Callback Form (sidebar) ---------- */
const CallbackForm = ({ propertyRef, propertyTitle }: { propertyRef: string; propertyTitle: string }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(Date.now());

  const inputClass =
    "w-full px-3 py-2.5 bg-background border border-border text-foreground placeholder:text-muted-foreground rounded font-body text-sm focus:outline-none focus:border-accent transition-colors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const check = checkSubmission({
      honeypot,
      startedAt: startedAt.current,
      name: `${form.firstName} ${form.lastName}`,
      message: form.message,
      email: form.email,
      phone: form.phone,
      requirePhone: true,
    });
    if (!check.ok) {
      if (check.silent) {
        setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        setShowSuccess(true);
        return;
      }
      window.alert(check.reason);
      return;
    }

    setLoading(true);
    try {

      const { error } = await supabase.from("contact_submissions").insert({
        form_type: "rappel_bien",
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        message: form.message || null,
        property_ref: propertyRef,
        property_title: propertyTitle,
      });
      if (error) throw error;

      try {
        await supabase.functions.invoke("send-contact-email", {
          body: {
            form_type: "rappel_bien",
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone,
            message: `Bien concerné : ${propertyTitle} (Réf. ${propertyRef})\n\n${form.message || "Pas de message complémentaire."}`,
          },
        });
      } catch { /* best-effort */ }

      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setShowSuccess(true);
    } catch {
      // fallback toast handled inline
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-display text-sm mb-3">Être rappelé pour ce bien</h4>
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Prénom *" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Nom *" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} />
          </div>
          <input type="email" placeholder="Email *" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          <input type="tel" placeholder="Téléphone *" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          <textarea placeholder="Message (optionnel)" rows={2} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} />
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-2.5 rounded font-body font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50">
            <Send className="w-3.5 h-3.5" /> {loading ? "Envoi..." : "Demander un rappel"}
          </button>
        </form>
      </div>
      <SuccessPopup
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Demande de rappel envoyée !"
        description="Un conseiller vous recontactera dans les plus brefs délais."
      />
    </>
  );
};

export default PropertyDetail;
