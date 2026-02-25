import { motion } from "framer-motion";
import { Award, Users, Target, Handshake, Heart, Shield, BadgeCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import alexandreImg from "@/assets/alexandre.png";

const stats = [
  { icon: Award, label: "10+ ans d'expérience" },
  { icon: Users, label: "200+ clients accompagnés" },
  { icon: Target, label: "Expert Île-de-France" },
  { icon: BadgeCheck, label: "Titulaire carte T professionnelle" },
];

const philosophy = [
  {
    icon: Handshake,
    title: "Je vous écoute vraiment",
    description: "Je ne suis pas là pour vous vendre un bien à tout prix. Je prends le temps de vous connaître, de comprendre ce que vous cherchez vraiment, et je vous dis franchement si un bien n'est pas fait pour vous.",
  },
  {
    icon: Shield,
    title: "Je joue cartes sur table",
    description: "Pas de discours commercial, pas de chiffres gonflés. Je vous donne mon avis honnête, même quand ce n'est pas ce que vous voulez entendre. C'est comme ça qu'on construit une relation de confiance.",
  },
  {
    icon: Target,
    title: "Je me bats pour vos intérêts",
    description: "Négocier, c'est mon métier. Je connais les prix, je connais le marché, et je mets toute mon énergie pour vous obtenir les meilleures conditions — que vous achetiez ou que vous vendiez.",
  },
  {
    icon: Heart,
    title: "Je reste disponible, tout simplement",
    description: "Un doute le soir ? Une question le week-end ? Je décroche. L'immobilier ne s'arrête pas à 18h, et moi non plus. Vous pouvez compter sur moi du début à la fin.",
  },
];

const emilioTimeline = [
  {
    period: "Septembre 2020",
    title: "Lancement d'Emilio Immobilier",
    text: "Création de l'agence avec un premier secteur sur Boulogne-Billancourt. Un démarrage ambitieux, porté par l'envie de faire les choses différemment.",
  },
  {
    period: "2021",
    title: "Expansion dans les villes limitrophes",
    text: "Fort d'un bouche-à-oreille rapide, développement sur Neuilly-sur-Seine, Saint-Cloud, Garches et Issy-les-Moulineaux.",
  },
  {
    period: "2023",
    title: "Implantation à Paris",
    text: "Ouverture sur les 16e, 15e, 6e et 7e arrondissements — des secteurs où nous sommes aujourd'hui bien établis, avec des propriétaires qui nous recommandent régulièrement grâce à notre travail professionnel.",
  },
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

      {/* Why the name Emilio? */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">L'origine du nom</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-4">
                Pourquoi Emilio Immobilier ?
              </h2>
              <div className="w-16 h-0.5 bg-accent mx-auto" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card p-8 md:p-10 rounded-lg border border-border shadow-sm"
            >
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-4">
                Pour moi, le métier d'agent immobilier est avant tout un métier d'humain, de contact et de relation. 
                Je voulais que le nom de l'agence reflète cette dimension personnelle — quelque chose de chaleureux, 
                d'accessible, qui sonne comme un prénom plutôt qu'un nom d'entreprise.
              </p>
              <p className="font-body text-muted-foreground text-base leading-relaxed">
                Le nom <span className="text-accent font-semibold">Emilio</span> vient de l'Italie. J'ai de très bons amis italiens, 
                et c'est lors d'un moment partagé avec eux que l'idée m'est venue. Emilio, c'est simple, 
                c'est joli, ça se retient facilement — et ça incarne exactement l'esprit que je voulais donner à l'agence : 
                humain, sincère et mémorable.
              </p>
            </motion.div>
          </div>
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
                <div className="absolute -inset-3 border-2 border-accent/30 rounded-lg" />
                <div className="absolute -inset-1 border border-accent/60 rounded-lg" />
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={alexandreImg}
                    alt="Alexandre - Fondateur Emilio Immobilier"
                    className="w-full"
                    style={{
                      maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                    }}
                  />
                </div>
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
                Passionné par l'immobilier depuis plus de 10 ans, j'ai fondé Emilio Immobilier
                avec une idée simple : offrir à mes clients le service que j'aurais aimé recevoir moi-même.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 text-base">
                Avant de créer Emilio, j'ai travaillé chez Laforêt, Foncia puis Barnes.
                Ces expériences m'ont permis de toucher aussi bien aux biens classiques qu'à l'immobilier de prestige,
                et de développer une vision complète du marché.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8 text-base">
                Mon objectif aujourd'hui : que chaque client se sente accompagné, écouté et en confiance
                du premier appel jusqu'à la signature.
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
            <p className="font-body text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
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
                    <div className="relative z-10 flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                        <div className="w-3 h-3 rounded-full bg-accent group-hover:bg-primary-foreground transition-colors duration-300" />
                      </div>
                    </div>
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
