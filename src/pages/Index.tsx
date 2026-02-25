import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Star, ShieldCheck, Eye, Lock, Search, Home, CheckCircle, Quote,
  KeyRound, FileSearch, Handshake, TrendingUp, MapPin,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Property, mockProperties, formatPrice, fetchPropertiesFromFeed } from "@/lib/properties";
import heroBg from "@/assets/hero-bg.jpg";

const testimonials = [
  {
    name: "Marie & Thomas D.",
    text: "Un accompagnement exceptionnel du début à la fin. Alexandre a su comprendre nos besoins et nous trouver le bien idéal en un temps record.",
    rating: 5,
  },
  {
    name: "Sophie L.",
    text: "Professionnalisme et écoute remarquables. La vente de notre appartement s'est déroulée sans accroc grâce à l'expertise d'Émilio.",
    rating: 5,
  },
  {
    name: "Jean-Pierre M.",
    text: "Grâce à leur réseau off-market, nous avons eu accès à des biens que nous n'aurions jamais trouvés seuls. Résultat parfait.",
    rating: 5,
  },
];

const services = [
  {
    icon: KeyRound,
    title: "Achat immobilier",
    description: "Trouvez le bien idéal grâce à notre sélection exclusive et notre accompagnement personnalisé jusqu'à la remise des clés.",
    link: "/mandat-recherche",
    cta: "Confier ma recherche",
  },
  {
    icon: TrendingUp,
    title: "Vente immobilière",
    description: "Valorisez votre bien au meilleur prix grâce à une estimation précise, une stratégie de vente sur-mesure et notre réseau qualifié.",
    link: "/vendre",
    cta: "Estimer mon bien",
  },
  {
    icon: FileSearch,
    title: "Mandat de recherche",
    description: "Un chasseur immobilier dédié prospecte pour vous, y compris sur notre base off-market, pour dénicher la perle rare.",
    link: "/mandat-recherche",
    cta: "En savoir plus",
  },
  {
    icon: Handshake,
    title: "Conseil & Investissement",
    description: "Bénéficiez de notre expertise pour vos projets d'investissement locatif ou patrimonial en Île-de-France.",
    link: "/mandat-recherche",
    cta: "Nous consulter",
  },
];

const offMarketStats = [
  { value: "50+", label: "Biens off-market", description: "Biens exclusifs non diffusés sur les portails classiques" },
  { value: "200+", label: "Transactions", description: "Transactions réussies grâce à notre réseau privilégié" },
  { value: "98%", label: "Satisfaction", description: "De nos clients recommandent nos services" },
  { value: "72h", label: "Réactivité", description: "Délai moyen pour vous proposer un bien ciblé" },
];

const Index = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);

  useEffect(() => {
    fetchPropertiesFromFeed().then(setProperties);
  }, []);

  const latestProperties = [...properties]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-secondary" />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-block font-body text-accent font-semibold text-sm tracking-widest uppercase mb-6"
            >
              Émilio Conseil Immobilier
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-semibold leading-tight mb-6"
            >
              Votre projet immobilier,
              <br />
              <span className="text-accent italic">notre expertise</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="font-body text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-10"
            >
              Achat, vente et conseil sur-mesure en Île-de-France. 
              Accédez à des biens d'exception, y compris en off-market.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/biens"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:brightness-110 transition-all"
              >
                Découvrir nos biens <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/mandat-recherche"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/40 text-primary-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:bg-primary-foreground/10 transition-all"
              >
                Mandat de recherche
              </Link>
            </motion.div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border">
          <div className="container mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "200+", label: "Transactions réussies" },
              { value: "10+", label: "Années d'expérience" },
              { value: "98%", label: "Clients satisfaits" },
              { value: "50+", label: "Biens off-market" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl text-accent font-semibold">{s.value}</div>
                <div className="font-body text-muted-foreground text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Nos services</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-4">
              Un accompagnement à chaque étape
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card p-8 rounded border border-border shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <s.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-3">{s.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5">{s.description}</p>
                <Link
                  to={s.link}
                  className="inline-flex items-center gap-1.5 text-accent font-body font-semibold text-sm hover:underline"
                >
                  {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST PROPERTIES — Taille uniforme */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Nos derniers biens</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-4">Sélection récente</h2>
              <div className="w-16 h-0.5 bg-accent" />
            </div>
            <Link
              to="/biens"
              className="hidden md:flex items-center gap-2 text-accent font-body font-semibold text-sm hover:underline"
            >
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProperties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/biens"
              className="inline-flex items-center gap-2 text-accent font-body font-semibold text-sm hover:underline"
            >
              Voir tous nos biens <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* OFF-MARKET — Hover cards with stats */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-accent" />
              <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Accès privilégié</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">
              Notre base <span className="text-gold italic">Off-Market</span>
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Accédez à des biens d'exception qui ne sont jamais diffusés sur les portails classiques.
              Notre réseau privilégié vous ouvre les portes d'opportunités uniques.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {offMarketStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-8 text-center cursor-default overflow-hidden transition-all duration-500 hover:bg-primary-foreground/10 hover:border-accent/30"
              >
                {/* Default view */}
                <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                  <div className="font-display text-4xl text-accent mb-2 font-semibold">{stat.value}</div>
                  <div className="font-body text-primary-foreground/70 text-sm tracking-wide">{stat.label}</div>
                </div>
                {/* Hover view */}
                <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="text-center">
                    <div className="font-display text-2xl text-accent mb-2 font-semibold">{stat.value}</div>
                    <p className="font-body text-primary-foreground/80 text-sm leading-relaxed">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mandat-recherche"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-body font-semibold text-sm rounded hover:brightness-110 transition-all"
            >
              Accéder au off-market <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Ils nous font confiance</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded shadow-sm border border-border relative"
              >
                <Quote className="w-8 h-8 text-accent/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <p className="font-body font-semibold text-foreground text-sm">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Un projet immobilier ?</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-xl mx-auto mb-8">
            Que vous souhaitiez acheter, vendre ou simplement obtenir un avis d'expert, notre équipe est à votre écoute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/vendre"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:bg-navy-light transition-all"
            >
              <Home className="w-4 h-4" /> Je souhaite vendre
            </Link>
            <Link
              to="/mandat-recherche"
              className="inline-flex items-center justify-center gap-2 border border-primary text-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Search className="w-4 h-4" /> Je cherche un bien
            </Link>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
