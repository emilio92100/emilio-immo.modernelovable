import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Eye, Lock, Search, Home, CheckCircle, Quote } from "lucide-react";
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

const values = [
  {
    icon: ShieldCheck,
    title: "Expertise locale",
    description: "Une connaissance approfondie du marché immobilier francilien pour vous conseiller au mieux.",
  },
  {
    icon: Eye,
    title: "Transparence totale",
    description: "Un suivi clair et régulier à chaque étape de votre projet immobilier.",
  },
  {
    icon: Star,
    title: "Service premium",
    description: "Un accompagnement personnalisé et sur-mesure, du premier contact à la signature.",
  },
];

const Index = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);

  useEffect(() => {
    fetchPropertiesFromFeed().then(setProperties);
  }, []);

  const latestProperties = [...properties]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-semibold leading-tight mb-6"
          >
            L'immobilier d'exception,
            <br />
            <span className="text-gold italic">à votre portée</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-body text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Conseil immobilier personnalisé en Île-de-France. Achat, vente et accompagnement sur-mesure.
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
      </section>

      {/* VALUES */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Notre valeur ajoutée</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded text-center shadow-sm border border-border"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl mb-3">{v.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST PROPERTIES */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Derniers biens ajoutés</h2>
              <div className="w-16 h-0.5 bg-accent" />
            </div>
            <Link
              to="/biens"
              className="hidden md:flex items-center gap-2 text-accent font-body font-semibold text-sm hover:underline"
            >
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* OFF-MARKET */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-accent" />
                <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Accès privilégié</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">
                Notre base <span className="text-gold italic">Off-Market</span>
              </h2>
              <p className="font-body text-primary-foreground/70 leading-relaxed mb-6">
                Accédez à des biens d'exception qui ne sont jamais diffusés sur les portails immobiliers classiques.
                Notre réseau privilégié nous permet de vous proposer des opportunités uniques avant leur mise sur le marché.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Biens exclusifs non diffusés",
                  "Accès prioritaire avant mise en marché",
                  "Réseau confidentiel de vendeurs",
                  "Opportunités d'investissement rares",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-primary-foreground/80 font-body text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/mandat-recherche"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-body font-semibold text-sm rounded hover:brightness-110 transition-all"
              >
                Accéder au off-market <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Biens off-market", value: "50+" },
                { label: "Transactions réussies", value: "200+" },
                { label: "Clients satisfaits", value: "98%" },
                { label: "Années d'expérience", value: "10+" },
              ].map((stat) => (
                <div key={stat.label} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded p-6 text-center">
                  <div className="font-display text-3xl text-accent mb-2">{stat.value}</div>
                  <div className="font-body text-primary-foreground/60 text-xs tracking-wide">{stat.label}</div>
                </div>
              ))}
            </motion.div>
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
