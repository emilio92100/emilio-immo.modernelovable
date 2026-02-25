import { motion } from "framer-motion";
import { Search, Filter, MapPin, FileCheck, Handshake, ArrowRight, CheckCircle, Clock, Target, Users, Shield, Gem, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const steps = [
  {
    icon: Target,
    title: "Définition de vos critères",
    description: "Nous analysons en détail vos besoins, votre budget, vos préférences de localisation et vos contraintes pour cibler les biens parfaits.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    icon: Search,
    title: "Recherche personnalisée",
    description: "Notre équipe active son réseau et explore le marché visible et off-market pour identifier les opportunités correspondant à vos critères.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
  {
    icon: MapPin,
    title: "Visites organisées",
    description: "Nous pré-sélectionnons les biens pertinents et organisons les visites en fonction de vos disponibilités, avec une analyse détaillée de chaque bien.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    icon: FileCheck,
    title: "Analyse & négociation",
    description: "Vérification technique du bien, analyse du prix par rapport au marché et négociation dans votre intérêt pour obtenir les meilleures conditions.",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&q=80",
  },
  {
    icon: Handshake,
    title: "Accompagnement jusqu'à la signature",
    description: "Suivi administratif complet, coordination avec les notaires et accompagnement jusqu'à la remise des clés de votre nouveau bien.",
    image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=600&q=80",
  },
];

const advantages = [
  { icon: Gem, text: "Accès à des biens off-market exclusifs" },
  { icon: Clock, text: "Gain de temps considérable" },
  { icon: Target, text: "Expertise du marché francilien" },
  { icon: Shield, text: "Négociation professionnelle en votre faveur" },
  { icon: FileCheck, text: "Accompagnement juridique et administratif" },
  { icon: Users, text: "Un seul interlocuteur dédié à votre projet" },
];

const timelineSteps = [
  { week: "Semaine 1", label: "Premier rendez-vous", description: "Définition des critères, du budget et de la stratégie de recherche", percent: 0 },
  { week: "Semaines 2-4", label: "Recherche active", description: "Prospection intensive, réseau off-market, pré-sélection des biens", percent: 20 },
  { week: "Semaines 4-8", label: "Visites ciblées", description: "Organisation des visites, analyses comparatives détaillées", percent: 45 },
  { week: "Semaines 8-10", label: "Offre & négociation", description: "Rédaction de l'offre, négociation du prix et des conditions", percent: 65 },
  { week: "Semaines 10-12", label: "Compromis de vente", description: "Signature du compromis, suivi du dossier de financement", percent: 80 },
  { week: "Mois 3-4", label: "Signature définitive", description: "Acte authentique chez le notaire et remise des clés", percent: 100 },
];

const BuyerMandate = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=40')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <HeartHandshake className="w-12 h-12 text-accent mx-auto mb-6" />
            <h1 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">Mandat de Recherche</h1>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Confiez-nous votre recherche immobilière. Nous trouvons le bien idéal pour vous, en toute sérénité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps with alternating layout */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Comment ça fonctionne ?</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="md:w-1/2">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full aspect-[4/3] object-cover rounded shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-display text-accent text-sm font-bold">Étape {i + 1}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl mb-3">{step.title}</h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Durée estimée de votre projet</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Voici le déroulement type d'une recherche accompagnée, du premier contact à la remise des clés.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

            {timelineSteps.map((step, i) => (
              <motion.div
                key={step.week}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-start mb-10 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-secondary -translate-x-1/2 mt-1 z-10" />

                <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="font-display text-accent text-xs font-bold tracking-wider uppercase">{step.week}</span>
                  <h4 className="font-display text-lg text-foreground mt-1 mb-1">{step.label}</h4>
                  <p className="font-body text-muted-foreground text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Les avantages du mandat de recherche
              </h2>
              <div className="w-16 h-0.5 bg-accent mb-8" />
              <ul className="space-y-5">
                {advantages.map((a) => (
                  <li key={a.text} className="flex items-center gap-4 font-body text-foreground text-sm">
                    <div className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <a.icon className="w-4 h-4 text-accent" />
                    </div>
                    {a.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card p-8 rounded shadow-sm border border-border">
              <h3 className="font-display text-xl mb-4">Démarrez votre recherche</h3>
              <p className="font-body text-muted-foreground text-sm mb-6">
                Remplissez le formulaire de contact ci-dessous ou appelez-nous directement pour nous exposer votre projet.
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-body font-semibold text-sm rounded hover:brightness-110 transition-all w-full justify-center"
              >
                Nous contacter <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center mt-4 font-body text-muted-foreground text-xs">
                Ou appelez directement : <a href="tel:+33658957632" className="text-accent hover:underline">06 58 95 76 32</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default BuyerMandate;
