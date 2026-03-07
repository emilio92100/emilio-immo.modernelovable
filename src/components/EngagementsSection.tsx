import { motion, useAnimationControls } from "framer-motion";
import { Shield, Heart, Handshake, Eye, Clock, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const engagements = [
  {
    icon: Shield,
    title: "Transparence totale",
    description: "Un suivi clair à chaque étape. Vous êtes informé en temps réel, sans zone d'ombre.",
  },
  {
    icon: Heart,
    title: "Écoute & bienveillance",
    description: "Votre projet est unique. Nous comprenons vos attentes pour vous conseiller avec sincérité.",
  },
  {
    icon: Handshake,
    title: "Négociation experte",
    description: "Nous défendons vos intérêts pour vous obtenir les meilleures conditions du marché.",
  },
  {
    icon: Clock,
    title: "Réactivité 7j/7",
    description: "Une question ? Notre équipe est disponible et réactive tout au long de votre projet.",
  },
  {
    icon: Eye,
    title: "Accès off-market",
    description: "Des biens exclusifs jamais publiés en ligne, via notre réseau privilégié.",
  },
  {
    icon: Award,
    title: "Expertise locale",
    description: "Une connaissance fine de Paris et des Hauts-de-Seine pour un accompagnement sur-mesure.",
  },
];

const EngagementCard = ({
  engagement,
  index,
}: {
  engagement: (typeof engagements)[0];
  index: number;
}) => {
  const Icon = engagement.icon;

  return (
    <motion.div
      className="group relative flex-shrink-0 w-[320px] md:w-[380px] bg-card rounded-2xl border border-border p-8 md:p-10 mx-3 overflow-hidden cursor-default select-none"
      whileHover={{ scale: 1.04, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 rounded-2xl border-2 border-accent/40" />
      </div>

      {/* Floating accent dot */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent/40"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      />

      {/* Icon with continuous pulse ring */}
      <div className="relative w-16 h-16 mb-7">
        <motion.div
          className="absolute inset-0 rounded-2xl bg-accent/10"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        />
        <div className="relative w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent transition-all duration-500">
          <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
        </div>
      </div>

      <h3 className="font-display text-xl md:text-2xl mb-3 text-foreground">
        {engagement.title}
      </h3>
      <p className="font-body text-muted-foreground text-base leading-relaxed">
        {engagement.description}
      </p>

      {/* Bottom accent line animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-accent rounded-b-2xl"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

const MarqueeRow = ({
  items,
  direction = "left",
  speed = 35,
}: {
  items: (typeof engagements);
  direction?: "left" | "right";
  speed?: number;
}) => {
  // Duplicate items for seamless loop
  const duplicated = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-3">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex"
        animate={{
          x: direction === "left"
            ? ["0%", "-33.33%"]
            : ["-33.33%", "0%"],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((e, i) => (
          <EngagementCard key={`${e.title}-${i}`} engagement={e} index={i % items.length} />
        ))}
      </motion.div>
    </div>
  );
};

const EngagementsSection = () => {
  const topRow = engagements.slice(0, 3);
  const bottomRow = engagements.slice(3, 6);

  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-6"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              className="h-px w-12 bg-accent"
              animate={{ width: [48, 64, 48] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="font-body text-accent font-semibold text-sm tracking-[0.3em] uppercase">
              Ce qui nous définit
            </span>
            <motion.div
              className="h-px w-12 bg-accent"
              animate={{ width: [48, 64, 48] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-5">
            Nos <span className="text-accent italic">engagements</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Six valeurs essentielles au service de votre projet immobilier.
          </p>
        </motion.div>

        {/* Marquee rows */}
        <div className="space-y-4">
          <MarqueeRow items={topRow} direction="left" speed={30} />
          <MarqueeRow items={bottomRow} direction="right" speed={35} />
        </div>
      </div>
    </section>
  );
};

export default EngagementsSection;
