import { motion } from "framer-motion";
import { Search, MapPin, FileCheck, Handshake, Target, Shield, Gem, Clock, Users, HeartHandshake, ArrowDown, Sparkles, Key } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import BuyerMandateStepperForm from "@/components/BuyerMandateStepperForm";
import PricingSection from "@/components/PricingSection";
import SEOHead from "@/components/SEOHead";

const steps = [
  {
    icon: Target,
    num: "01",
    title: "Définition de vos critères",
    description: "Analyse approfondie de vos besoins, budget, localisation et contraintes.",
  },
  {
    icon: Search,
    num: "02",
    title: "Recherche personnalisée",
    description: "Prospection active sur le marché visible et off-market via notre réseau.",
  },
  {
    icon: MapPin,
    num: "03",
    title: "Visites organisées",
    description: "Pré-sélection et organisation de visites avec analyse détaillée.",
  },
  {
    icon: FileCheck,
    num: "04",
    title: "Analyse & négociation",
    description: "Vérification technique, analyse du prix et négociation en votre faveur.",
  },
  {
    icon: Handshake,
    num: "05",
    title: "Signature & remise des clés",
    description: "Suivi administratif, coordination notaire et accompagnement complet.",
  },
];

const advantages = [
  { icon: Gem, title: "Off-market", text: "Accès à des biens exclusifs non publiés" },
  { icon: Clock, title: "Gain de temps", text: "Nous cherchons, vous choisissez" },
  { icon: Target, title: "Expertise locale", text: "Connaissance fine du marché francilien" },
  { icon: Shield, title: "Négociation", text: "Défense de vos intérêts financiers" },
  { icon: FileCheck, title: "Juridique", text: "Accompagnement administratif complet" },
  { icon: Users, title: "Interlocuteur unique", text: "Un seul expert dédié à votre projet" },
];

const timelineSteps = [
  { week: "Sem. 1", label: "Premier RDV", icon: "📋" },
  { week: "Sem. 2-4", label: "Recherche active", icon: "🔍" },
  { week: "Sem. 4-8", label: "Visites ciblées", icon: "🏠" },
  { week: "Sem. 8-10", label: "Négociation", icon: "🤝" },
  { week: "Sem. 10-12", label: "Compromis", icon: "📝" },
  { week: "Mois 3-4", label: "Clés en main", icon: "🔑" },
];

const BuyerMandate = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Mandat de recherche — Émilio Immobilier | Chasseur immobilier"
        description="Confiez votre recherche immobilière à Émilio Immobilier. Accès aux biens off-market, accompagnement personnalisé, négociation experte à Paris et Hauts-de-Seine."
        canonical="https://www.emilio-immo.com/mandat-recherche"
      />
      <Navbar />

      {/* Hero — Full bleed with bold typography */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center bg-primary overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-primary-foreground" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full border border-primary-foreground" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-foreground" />
        </div>

        <div className="relative container mx-auto px-5 md:px-6 text-center py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="hidden md:inline-flex items-center gap-1.5 bg-accent/15 border border-accent/25 rounded-full px-5 py-2 mb-8">
              <HeartHandshake className="w-4 h-4 text-accent" />
              <span className="font-body text-accent text-sm font-semibold tracking-wide">Chasseur immobilier</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4 md:mb-6 leading-[1.1]">
              Trouvons ensemble
              <br />
              <span className="italic text-accent">votre bien idéal</span>
            </h1>

            <p className="font-body text-primary-foreground/60 max-w-2xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-10">
              Un accompagnement sur-mesure pour votre achat immobilier à Paris et Hauts-de-Seine. Du premier rendez-vous à la remise des clés.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="#formulaire"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 md:px-8 md:py-4 rounded-full font-body font-semibold text-sm md:text-base hover:brightness-110 transition-all shadow-lg shadow-accent/25"
              >
                Démarrer ma recherche
              </a>
              <a
                href="#processus"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground/80 px-6 py-3 md:px-8 md:py-4 rounded-full font-body font-medium text-sm md:text-base hover:bg-primary-foreground/5 transition-all"
              >
                Comment ça marche <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps — Horizontal numbered cards */}
      <section id="processus" className="py-14 md:py-28 bg-background">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-20"
          >
            <span className="font-body text-accent font-semibold text-[10px] md:text-sm tracking-[0.3em] uppercase">Le processus</span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-foreground mt-3 md:mt-4 mb-3 md:mb-5">
              5 étapes vers <span className="text-accent italic">votre nouveau chez-vous</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto text-xs md:text-base leading-relaxed">
              Une méthode éprouvée, un accompagnement à chaque étape.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto space-y-3 md:space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="flex items-stretch bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent/30 hover:shadow-xl transition-all duration-500">
                  {/* Number block */}
                  <div className="hidden md:flex w-24 shrink-0 items-center justify-center bg-primary group-hover:bg-accent transition-colors duration-500">
                    <span className="font-display text-3xl text-primary-foreground/30 group-hover:text-accent-foreground/80 transition-colors duration-500">
                      {step.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-center gap-3 md:gap-5 p-4 md:p-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-lg md:rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-105 transition-all duration-500">
                      <step.icon className="w-4 h-4 md:w-5 md:h-5 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                    </div>
                    <div>
                      <span className="md:hidden font-body text-accent text-[10px] font-bold tracking-wider uppercase">Étape {step.num}</span>
                      <h3 className="font-display text-sm md:text-xl text-foreground mb-0.5 md:mb-1">{step.title}</h3>
                      <p className="font-body text-muted-foreground text-xs md:text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages — Bento-style grid */}
      <section className="py-14 md:py-28 bg-primary">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <span className="font-body text-accent font-semibold text-[10px] md:text-sm tracking-[0.3em] uppercase">Pourquoi nous choisir</span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-primary-foreground mt-3 md:mt-4 mb-3 md:mb-5">
              Vos <span className="text-accent italic">avantages</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {advantages.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group relative bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-primary-foreground/[0.08] hover:border-accent/30 transition-all duration-500"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-accent/15 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-accent group-hover:scale-105 transition-all duration-500">
                  <a.icon className="w-4 h-4 md:w-[18px] md:h-[18px] text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                </div>
                <h3 className="font-display text-sm md:text-base text-primary-foreground mb-1 md:mb-1.5">{a.title}</h3>
                <p className="font-body text-primary-foreground/50 text-[11px] md:text-xs leading-relaxed">{a.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — Horizontal scroll */}
      <section className="py-14 md:py-28 bg-secondary overflow-hidden">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <span className="font-body text-accent font-semibold text-[10px] md:text-sm tracking-[0.3em] uppercase">Planning</span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-foreground mt-3 md:mt-4 mb-3 md:mb-5">
              Durée estimée de <span className="text-accent italic">votre projet</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto text-xs md:text-base leading-relaxed">
              Du premier contact à la remise des clés en 3 à 4 mois.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-accent/20" />

              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                {timelineSteps.map((step, i) => (
                  <motion.div
                    key={step.week}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <div className="relative flex justify-center mb-3 md:mb-6">
                      <div className="w-5 h-5 md:w-[26px] md:h-[26px] rounded-full bg-accent/20 border-[3px] md:border-4 border-secondary flex items-center justify-center group-hover:bg-accent transition-colors duration-500 z-10">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent group-hover:bg-accent-foreground transition-colors duration-500" />
                      </div>
                    </div>

                    <div className="text-xl md:text-3xl mb-1.5 md:mb-3">{step.icon}</div>
                    <span className="block font-body text-accent text-[9px] md:text-xs font-bold tracking-wider uppercase mb-0.5 md:mb-1">{step.week}</span>
                    <h4 className="font-display text-xs md:text-base text-foreground leading-tight">{step.label}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stepper Form */}
      <div id="formulaire">
        <BuyerMandateStepperForm />
      </div>

      {/* PRICING */}
      <PricingSection
        heading="Nos honoraires de recherche"
        subheading="Un accompagnement premium, pensé exclusivement pour défendre vos intérêts tout au long de votre achat."
        note="Pour garantir un travail de qualité, une recherche approfondie et un accompagnement réellement sur-mesure, nous travaillons uniquement en mandat exclusif afin de nous engager pleinement à vos côtés et de mobiliser tout notre réseau pour trouver le bien qui vous correspond."
        plans={[
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
