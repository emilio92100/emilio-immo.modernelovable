import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Maximize, BedDouble, Home, Calendar, Building, Thermometer,
  Car, ChevronLeft, ChevronRight, Phone, Mail, Compass, DoorOpen, ShieldCheck, Star, CheckCircle, Send,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DPEBadge from "@/components/DPEBadge";
import SuccessPopup from "@/components/SuccessPopup";
import { Property, mockProperties, formatPrice, fetchPropertiesFromFeed, RoomDetail } from "@/lib/properties";

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

              {/* Room details */}
              {property.roomDetails && property.roomDetails.length > 0 && (
                <div className="bg-card border border-border rounded p-6">
                  <h2 className="font-display text-lg mb-4">Détail des pièces</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full font-body text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="pb-2 text-muted-foreground font-medium">Pièce</th>
                          <th className="pb-2 text-muted-foreground font-medium">Surface</th>
                          <th className="pb-2 text-muted-foreground font-medium hidden sm:table-cell">Niveau</th>
                          <th className="pb-2 text-muted-foreground font-medium hidden sm:table-cell">Info</th>
                        </tr>
                      </thead>
                      <tbody>
                        {property.roomDetails.map((room, i) => (
                          <tr key={i} className="border-b border-border/50 last:border-0">
                            <td className="py-2.5 text-foreground font-medium">{room.type}</td>
                            <td className="py-2.5 text-foreground">{room.surface > 0 ? `${room.surface} m²` : "—"}</td>
                            <td className="py-2.5 text-muted-foreground hidden sm:table-cell">
                              {room.level === 0 ? "RDC" : `Étage ${room.level}`}
                            </td>
                            <td className="py-2.5 text-muted-foreground hidden sm:table-cell">{room.description || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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

  const inputClass =
    "w-full px-3 py-2.5 bg-background border border-border text-foreground placeholder:text-muted-foreground rounded font-body text-sm focus:outline-none focus:border-accent transition-colors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
