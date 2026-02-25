import { motion } from "framer-motion";
import { Award, Users, Target, Handshake, Heart, TrendingUp, Shield, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import alexandreImg from "@/assets/alexandre.png";

const stats = [
  { icon: Award, label: "10+ ans d'expérience" },
  { icon: Users, label: "200+ clients accompagnés" },
  { icon: Target, label: "Expert Île-de-France" },
  { icon: Handshake, label: "98% satisfaction client" },
];

const philosophy = [
  {
    icon: Heart,
    title: "L'humain avant tout",
    description: "Chaque projet est unique. Je prends le temps de comprendre vos besoins, vos contraintes et vos aspirations pour vous offrir un accompagnement véritablement personnalisé.",
  },
  {
    icon: Shield,
    title: "Confiance & Transparence",
    description: "Pas de promesses en l'air. Je m'engage à vous communiquer des informations fiables, des estimations justes et un suivi régulier à chaque étape.",
  },
  {
    icon: TrendingUp,
    title: "Performance & Résultat",
    description: "Grâce à une connaissance fine du marché et un réseau étendu, je négocie dans votre intérêt pour obtenir les meilleures conditions possibles.",
  },
  {
    icon: Briefcase,
    title: "Réseau Off-Market",
    description: "Mon réseau confidentiel me permet d'accéder à des biens jamais publiés. Un avantage décisif pour mes clients acquéreurs les plus exigeants.",
  },
];

const Director = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">Le Directeur</h1>
          <div className="w-16 h-0.5 bg-accent mx-auto" />
        </div>
      </section>

      {/* Portrait & Bio */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative max-w-md">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={alexandreImg}
                    alt="Alexandre - Directeur Émilio Conseil Immobilier"
                    className="w-full"
                    style={{
                      maskImage: "linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, black 80%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, black 80%, transparent 100%)",
                      maskComposite: "intersect",
                      WebkitMaskComposite: "destination-in",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Fondateur & Directeur</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-6">Alexandre</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Passionné par l'immobilier depuis plus de 10 ans, Alexandre a fondé Émilio Conseil Immobilier
                avec une vision claire : offrir un service d'excellence et un accompagnement personnalisé
                à chaque client.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Fort d'une expérience solide dans les marchés parisien et francilien, il met son expertise
                et son réseau au service de vos projets. Sa connaissance approfondie du marché,
                combinée à une approche humaine et transparente, fait de lui un interlocuteur de confiance
                pour toutes vos transactions immobilières.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Son objectif : transformer chaque projet immobilier en une expérience sereine et réussie,
                en plaçant toujours l'intérêt du client au cœur de sa démarche.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-secondary rounded">
                    <item.icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="font-body text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy / Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Ma philosophie</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-4">
              Ce qui guide mon approche
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              L'immobilier est bien plus qu'une transaction. C'est un moment de vie, un projet porteur d'émotions.
              Je m'engage à vous accompagner avec exigence, bienveillance et professionnalisme.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {philosophy.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded border border-border shadow-sm"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-3">{item.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parcours / Journey */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Mon parcours</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-4">
                Un chemin guidé par la passion
              </h2>
              <div className="w-16 h-0.5 bg-accent mx-auto" />
            </div>

            <div className="space-y-8">
              {[
                {
                  period: "2016 – Aujourd'hui",
                  title: "Fondation d'Émilio Conseil Immobilier",
                  text: "Création de l'agence avec une ambition : proposer un service immobilier haut de gamme, centré sur l'humain et l'excellence. Développement d'un réseau off-market exclusif en Île-de-France.",
                },
                {
                  period: "2012 – 2016",
                  title: "Conseiller immobilier senior",
                  text: "Spécialisation sur les marchés de l'ouest parisien : Boulogne-Billancourt, Issy-les-Moulineaux, Paris 15e et 16e. Plus de 150 transactions réalisées.",
                },
                {
                  period: "2010 – 2012",
                  title: "Premiers pas dans l'immobilier",
                  text: "Découverte du métier et formation approfondie. Développement de compétences en négociation, estimation et droit immobilier.",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.period}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                    {i < 2 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>
                  <div className="pb-2">
                    <span className="font-body text-accent text-xs font-semibold tracking-wider uppercase">{step.period}</span>
                    <h3 className="font-display text-lg text-foreground mt-1 mb-2">{step.title}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default Director;
