import { motion } from "framer-motion";
import { Search, Filter, MapPin, FileCheck, Handshake, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const steps = [
  {
    icon: Search,
    title: "Définition de vos critères",
    description: "Nous analysons en détail vos besoins, votre budget, vos préférences de localisation et vos contraintes pour cibler les biens parfaits.",
  },
  {
    icon: Filter,
    title: "Recherche personnalisée",
    description: "Notre équipe active son réseau et explore le marché visible et off-market pour identifier les opportunités correspondant à vos critères.",
  },
  {
    icon: MapPin,
    title: "Visites organisées",
    description: "Nous pré-sélectionnons les biens pertinents et organisons les visites en fonction de vos disponibilités, avec une analyse détaillée de chaque bien.",
  },
  {
    icon: FileCheck,
    title: "Analyse & négociation",
    description: "Vérification technique du bien, analyse du prix par rapport au marché et négociation dans votre intérêt pour obtenir les meilleures conditions.",
  },
  {
    icon: Handshake,
    title: "Accompagnement jusqu'à la signature",
    description: "Suivi administratif complet, coordination avec les notaires et accompagnement jusqu'à la remise des clés de votre nouveau bien.",
  },
];

const advantages = [
  "Accès à des biens off-market exclusifs",
  "Gain de temps considérable",
  "Expertise du marché francilien",
  "Négociation professionnelle en votre faveur",
  "Accompagnement juridique et administratif",
  "Un seul interlocuteur dédié à votre projet",
];

const BuyerMandate = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">Mandat de Recherche</h1>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto">
            Confiez-nous votre recherche immobilière. Nous trouvons le bien idéal pour vous.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Comment ça fonctionne ?</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-accent text-sm font-bold">Étape {i + 1}</span>
                  </div>
                  <h3 className="font-display text-lg mb-2">{step.title}</h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Les avantages du mandat de recherche
              </h2>
              <div className="w-16 h-0.5 bg-accent mb-8" />
              <ul className="space-y-4">
                {advantages.map((a) => (
                  <li key={a} className="flex items-center gap-3 font-body text-foreground text-sm">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    {a}
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
