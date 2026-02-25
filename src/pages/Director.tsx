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

const emilioTimeline = [
  {
    period: "Septembre 2020",
    title: "Lancement d'Émilio Immobilier",
    text: "Création de l'agence avec un premier secteur sur Boulogne-Billancourt. Un démarrage ambitieux, porté par une vision claire du service immobilier.",
  },
  {
    period: "2021",
    title: "Expansion villes limitrophes",
    text: "Fort d'un succès rapide à Boulogne, développement sur les communes voisines : Issy-les-Moulineaux, Meudon, Sèvres et Chaville.",
  },
  {
    period: "2023",
    title: "Ouverture sur Paris Ouest",
    text: "Trois ans après sa création, Émilio s'implante sur les arrondissements prisés de l'ouest parisien : 15e, 16e et 17e arrondissements.",
  },
];

const beforeTimeline = [
  { period: "2 ans", agency: "BARNES", type: "Immobilier de prestige" },
  { period: "1 an", agency: "FONCIA", type: "Gestion & transaction" },
  { period: "4 ans", agency: "LAFORÊT", type: "Transaction résidentielle" },
];

const Director = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">Notre Histoire</h1>
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
                {/* Decorative frame */}
                <div className="absolute -inset-3 border-2 border-accent/30 rounded-lg" />
                <div className="absolute -inset-1 border border-accent/60 rounded-lg" />
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={alexandreImg}
                    alt="Alexandre - Fondateur Émilio Conseil Immobilier"
                    className="w-full"
                    style={{
                      maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                    }}
                  />
                </div>
                {/* Gold corner accents */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-accent rounded-tl-lg" />
                <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-accent rounded-tr-lg" />
                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-accent rounded-bl-lg" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-accent rounded-br-lg" />
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
              <p className="font-body text-muted-foreground leading-relaxed mb-6 text-base">
                Passionné par l'immobilier depuis plus de 10 ans, Alexandre a fondé Émilio Conseil Immobilier
                avec une vision claire : offrir un service d'excellence et un accompagnement personnalisé
                à chaque client.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 text-base">
                Fort d'un parcours riche au sein d'enseignes de renom — de la transaction résidentielle
                chez Laforêt et Foncia à l'immobilier de prestige chez Barnes — Alexandre maîtrise aussi bien
                les biens classiques que le segment luxe. Cette double expertise lui confère une vision
                complète du marché et une capacité unique à s'adapter aux attentes de chaque client.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8 text-base">
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
            <p className="font-body text-muted-foreground max-w-2xl mx-auto text-base">
              L'immobilier est bien plus qu'une transaction. C'est un moment de vie, un projet porteur d'émotions.
              Je m'engage à vous accompagner avec exigence, bienveillance et professionnalisme.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {philosophy.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-10 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl mb-3">{item.title}</h3>
                <p className="font-body text-muted-foreground text-base leading-relaxed">{item.description}</p>
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

            {/* Before Emilio - greyed out / subtle */}
            <div className="mb-12">
              <p className="font-body text-muted-foreground text-xs uppercase tracking-wider mb-6">Avant Émilio — Expériences fondatrices</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {beforeTimeline.map((item, i) => (
                  <motion.div
                    key={item.agency}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-muted/60 border border-border/50 rounded-lg p-5 text-center"
                  >
                    <span className="font-display text-lg text-muted-foreground/70">{item.agency}</span>
                    <p className="font-body text-xs text-muted-foreground/60 mt-1">{item.period}</p>
                    <p className="font-body text-xs text-muted-foreground/50 mt-2">{item.type}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emilio timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-accent/30" />
              <div className="space-y-0">
                {emilioTimeline.map((step, i) => (
                  <motion.div
                    key={step.period}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="relative flex gap-8 group pb-10 last:pb-0"
                  >
                    {/* Dot with hover glow */}
                    <div className="relative z-10 flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                        <div className="w-3 h-3 rounded-full bg-accent group-hover:bg-primary-foreground transition-colors duration-300" />
                      </div>
                    </div>
                    {/* Content card with hover effect */}
                    <div className="flex-1 bg-card border border-border rounded-lg p-6 shadow-sm group-hover:shadow-lg group-hover:border-accent/40 transition-all duration-300 group-hover:-translate-y-1">
                      <span className="inline-block font-body text-accent text-sm font-bold tracking-wider uppercase bg-accent/10 px-3 py-1 rounded-full group-hover:bg-accent group-hover:text-primary-foreground transition-all duration-300">
                        {step.period}
                      </span>
                      <h3 className="font-display text-xl text-foreground mt-3 mb-2">{step.title}</h3>
                      <p className="font-body text-muted-foreground text-base leading-relaxed">{step.text}</p>
                    </div>
                  </motion.div>
                ))}
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

export default Director;
