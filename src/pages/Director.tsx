import { motion } from "framer-motion";
import { Award, Users, Target, BadgeCheck, Star, Clock, MessageCircle, ShieldCheck } from "lucide-react";
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

const values = [
  {
    icon: MessageCircle,
    title: "Transparence totale",
    text: "On vous dit les choses telles qu'elles sont. Pas de promesses en l'air, pas d'estimations gonflées. Vous méritez la vérité pour prendre les bonnes décisions.",
  },
  {
    icon: ShieldCheck,
    title: "Engagement sans faille",
    text: "Chaque dossier est traité avec la même rigueur, qu'il s'agisse d'un studio ou d'un hôtel particulier. Nous nous engageons sur des résultats, pas sur des mots.",
  },
  {
    icon: Clock,
    title: "Disponibilité réelle",
    text: "Soir, week-end, jour férié : quand vous avez besoin de nous, nous répondons. L'immobilier n'attend pas, nous non plus.",
  },
  {
    icon: Star,
    title: "Excellence du service",
    text: "Photos professionnelles, dossiers complets, accompagnement juridique, suivi personnalisé — nous ne laissons rien au hasard pour que votre projet aboutisse.",
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
    text: "Ouverture sur les 16e, 15e, 6e et 7e arrondissements — des secteurs où nous sommes aujourd'hui bien établis.",
  },
];

const Director = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
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
                Avant de créer Emilio, j'ai évolué au sein de plusieurs agences immobilières reconnues,
                de réseaux généralistes à des enseignes spécialisées dans l'immobilier de luxe.
                Ces expériences m'ont permis de développer une vision complète du marché, du bien classique au prestige.
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

      {/* Team Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-body text-accent font-semibold text-sm tracking-[0.3em] uppercase">Notre force</span>
            <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mt-3 mb-4">
              Une équipe à taille humaine
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-primary-foreground/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Chez Emilio, chaque collaborateur partage les mêmes valeurs : l'écoute, l'exigence et le goût du travail bien fait. 
              Nous formons une équipe soudée où chaque client est connu par son prénom, pas par un numéro de dossier.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: "5", label: "collaborateurs passionnés" },
              { value: "100%", label: "des clients suivis personnellement" },
              { value: "7j/7", label: "à votre écoute" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="font-display text-4xl md:text-5xl text-accent">{stat.value}</span>
                <p className="font-body text-primary-foreground/80 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values – Nos engagements */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Ce qui nous définit</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-4">
              Nos engagements
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-card rounded-xl border border-border p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2">{item.title}</h3>
                    <p className="font-body text-muted-foreground text-base leading-relaxed">{item.text}</p>
                  </div>
                </div>
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
              <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Notre parcours</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-4">
                Un chemin guidé par la passion
              </h2>
              <div className="w-16 h-0.5 bg-accent mx-auto" />
            </div>

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
