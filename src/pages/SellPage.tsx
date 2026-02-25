import { motion } from "framer-motion";
import { ClipboardCheck, Camera, BarChart3, Megaphone, FileSignature, Key, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Estimation gratuite",
    description: "Nous réalisons une estimation précise de votre bien basée sur notre connaissance du marché local et les dernières transactions comparables.",
  },
  {
    icon: Camera,
    title: "Mise en valeur",
    description: "Photographies professionnelles, home staging virtuel et rédaction d'une annonce percutante pour maximiser l'attractivité de votre bien.",
  },
  {
    icon: BarChart3,
    title: "Stratégie de vente",
    description: "Définition ensemble d'une stratégie de prix et de commercialisation adaptée à votre bien et au marché actuel.",
  },
  {
    icon: Megaphone,
    title: "Diffusion ciblée",
    description: "Publication sur les meilleurs portails immobiliers et activation de notre réseau d'acheteurs qualifiés, y compris notre base off-market.",
  },
  {
    icon: FileSignature,
    title: "Négociation & compromis",
    description: "Gestion des visites, sélection des acquéreurs sérieux, négociation dans votre intérêt et rédaction du compromis.",
  },
  {
    icon: Key,
    title: "Accompagnement notaire",
    description: "Suivi du dossier jusqu'à la signature de l'acte authentique. Nous restons à vos côtés jusqu'à la remise des clés.",
  },
];

const SellPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">Je souhaite vendre</h1>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto">
            Vendez votre bien en toute sérénité grâce à notre accompagnement complet et personnalisé.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Notre processus de vente</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Un accompagnement en 6 étapes clés pour une vente réussie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-card p-8 rounded shadow-sm border border-border"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-display font-bold text-sm">
                  {i + 1}
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-5">
                  <step.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-3">{step.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">Pourquoi nous choisir ?</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "0% de frais cachés", desc: "Honoraires transparents et définis dès le départ." },
              { title: "Réseau qualifié", desc: "Accès à notre base d'acheteurs actifs et qualifiés." },
              { title: "Vente rapide", desc: "Délai moyen de vente inférieur à la moyenne du marché." },
            ].map((item) => (
              <div key={item.title} className="p-6">
                <h3 className="font-display text-lg text-foreground mb-2">{item.title}</h3>
                <p className="font-body text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default SellPage;
