import { motion } from "framer-motion";
import { Search, MapPin, FileCheck, Handshake, ArrowRight, Clock, Target, Users, Shield, Gem, HeartHandshake, CheckCircle, Eye, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import BuyerMandateForm from "@/components/BuyerMandateForm";
import BuyerMandateStepperForm from "@/components/BuyerMandateStepperForm";
import PricingSection from "@/components/PricingSection";

const steps = [
  {
    icon: Target,
    title: "Définition de vos critères",
    description: "Nous analysons en détail vos besoins, votre budget, vos préférences de localisation et vos contraintes pour cibler les biens parfaits.",
    color: "bg-accent/10 border-accent/20",
    iconColor: "bg-accent/20",
  },
  {
    icon: Search,
    title: "Recherche personnalisée",
    description: "Notre équipe active son réseau et explore le marché visible et off-market pour identifier les opportunités correspondant à vos critères.",
    color: "bg-primary/5 border-primary/15",
    iconColor: "bg-primary/10",
  },
  {
    icon: MapPin,
    title: "Visites organisées",
    description: "Nous pré-sélectionnons les biens pertinents et organisons les visites en fonction de vos disponibilités, avec une analyse détaillée de chaque bien.",
    color: "bg-accent/10 border-accent/20",
    iconColor: "bg-accent/20",
  },
  {
    icon: FileCheck,
    title: "Analyse & négociation",
    description: "Vérification technique du bien, analyse du prix par rapport au marché et négociation dans votre intérêt pour obtenir les meilleures conditions.",
    color: "bg-primary/5 border-primary/15",
    iconColor: "bg-primary/10",
  },
  {
    icon: Handshake,
    title: "Accompagnement jusqu'à la signature",
    description: "Suivi administratif complet, coordination avec les notaires et accompagnement jusqu'à la remise des clés de votre nouveau bien.",
    color: "bg-accent/10 border-accent/20",
    iconColor: "bg-accent/20",
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
  { week: "Semaine 1", label: "Premier rendez-vous", description: "Définition des critères, du budget et de la stratégie de recherche" },
  { week: "Semaines 2-4", label: "Recherche active", description: "Prospection intensive, réseau off-market, pré-sélection des biens" },
  { week: "Semaines 4-8", label: "Visites ciblées", description: "Organisation des visites, analyses comparatives détaillées" },
  { week: "Semaines 8-10", label: "Offre & négociation", description: "Rédaction de l'offre, négociation du prix et des conditions" },
  { week: "Semaines 10-12", label: "Compromis de vente", description: "Signature du compromis, suivi du dossier de financement" },
  { week: "Mois 3-4", label: "Signature définitive", description: "Acte authentique chez le notaire et remise des clés" },
];

const BuyerMandate = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="relative container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <HeartHandshake className="w-12 h-12 text-accent mx-auto mb-6" />
            <h1 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">Acheter avec Emilio</h1>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Confiez-nous votre recherche immobilière. Nous trouvons le bien idéal pour vous, en toute sérénité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps with colored blocks */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Comment ça fonctionne ?</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-start gap-6 p-8 rounded-xl border-2 ${step.color} hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-16 h-16 ${step.iconColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <step.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-accent text-sm font-bold bg-accent/10 px-3 py-1 rounded-full">
                      Étape {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl mb-3 text-foreground">{step.title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">{step.description}</p>
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Les avantages de nous confier votre recherche
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-10" />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {advantages.map((a) => (
                <div key={a.text} className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <a.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-body text-foreground text-sm text-center">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stepper Form */}
      <BuyerMandateStepperForm />

      {/* PRICING */}
      <PricingSection
        heading="Nos honoraires de recherche"
        subheading="Des tarifs clairs pour un accompagnement sur-mesure dans votre projet d'achat."
        plans={[
          {
            title: "Mandat de Recherche Simple",
            rate: "4% TTC",
            subtitle: "du prix d'acquisition du bien",
            features: [
              { text: "Définition de vos critères", included: true },
              { text: "Recherche sur le marché visible", included: true },
              { text: "Organisation des visites", included: true },
              { text: "Conseil et accompagnement", included: true },
              { text: "Accès au réseau off-market exclusif", included: false },
              { text: "Prospection dédiée et prioritaire", included: false },
              { text: "Négociation renforcée en votre faveur", included: false },
              { text: "Reporting hebdomadaire personnalisé", included: false },
              { text: "Délai de recherche réduit de moitié", included: false },
            ],
            cta: "Choisir le mandat simple",
          },
          {
            title: "Mandat Exclusif de Recherche",
            rate: "2,5% TTC",
            subtitle: "du prix d'acquisition du bien",
            recommended: true,
            features: [
              { text: "Définition approfondie de vos critères", included: true },
              { text: "Recherche marché visible + off-market", included: true },
              { text: "Organisation et pré-sélection des visites", included: true },
              { text: "Conseil et accompagnement premium", included: true },
              { text: "Accès prioritaire au réseau off-market", included: true },
              { text: "Prospection dédiée et intensive", included: true },
              { text: "Négociation experte en votre faveur", included: true },
              { text: "Reporting hebdomadaire personnalisé", included: true },
              { text: "Délai de recherche réduit de moitié", included: true },
            ],
            cta: "Choisir le mandat exclusif",
          },
        ]}
      />

      <ContactForm />
      <Footer />
    </div>
  );
};

export default BuyerMandate;
