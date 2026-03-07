import { motion } from "framer-motion";
import { Shield, Heart, Handshake, Eye, Clock, Award } from "lucide-react";
import { useState } from "react";

const engagements = [
  {
    icon: Shield,
    title: "Transparence totale",
    description: "Un suivi clair à chaque étape. Vous êtes informé en temps réel, sans zone d'ombre.",
    number: "01",
  },
  {
    icon: Heart,
    title: "Écoute & bienveillance",
    description: "Votre projet est unique. Nous comprenons vos attentes pour vous conseiller avec sincérité.",
    number: "02",
  },
  {
    icon: Handshake,
    title: "Négociation experte",
    description: "Nous défendons vos intérêts pour vous obtenir les meilleures conditions du marché.",
    number: "03",
  },
  {
    icon: Clock,
    title: "Réactivité 7j/7",
    description: "Une question ? Notre équipe est disponible et réactive tout au long de votre projet.",
    number: "04",
  },
  {
    icon: Eye,
    title: "Accès off-market",
    description: "Des biens exclusifs jamais publiés en ligne, via notre réseau privilégié.",
    number: "05",
  },
  {
    icon: Award,
    title: "Expertise locale",
    description: "Une connaissance fine de Paris et des Hauts-de-Seine pour un accompagnement sur-mesure.",
    number: "06",
  },
];

const EngagementCard = ({
  engagement,
  index,
  isActive,
  onHover,
}: {
  engagement: (typeof engagements)[0];
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) => {
  const Icon = engagement.icon;

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10 h-full"
        animate={{
          borderColor: isActive ? "hsl(32, 80%, 52%)" : "hsl(215, 20%, 90%)",
          y: isActive ? -6 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Background glow on hover */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: isActive ? 1.5 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Number watermark */}
        <span className="absolute top-4 right-6 font-display text-7xl md:text-8xl font-bold text-foreground/[0.03] select-none leading-none">
          {engagement.number}
        </span>

        {/* Top row: icon + number */}
        <div className="relative flex items-center gap-4 mb-6">
          <motion.div
            className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center"
            animate={{
              backgroundColor: isActive ? "hsl(32, 80%, 52%)" : "hsl(32, 80%, 52%, 0.1)",
            }}
            transition={{ duration: 0.4 }}
          >
            <Icon
              className="w-6 h-6 transition-colors duration-400"
              style={{ color: isActive ? "hsl(0, 0%, 100%)" : "hsl(32, 80%, 52%)" }}
            />
          </motion.div>
          <span className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-accent">
            {engagement.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="relative font-display text-xl md:text-2xl text-foreground mb-3">
          {engagement.title}
        </h3>

        {/* Description with reveal */}
        <motion.p
          className="relative font-body text-muted-foreground text-sm md:text-base leading-relaxed"
          animate={{ opacity: isActive ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {engagement.description}
        </motion.p>

        {/* Bottom accent bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-accent rounded-b-2xl"
          animate={{ width: isActive ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
};

const EngagementsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(215, 50%, 18%) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <motion.span
              className="inline-block font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase mb-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ce qui nous définit
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
              Nos{" "}
              <span className="text-accent italic">engagements</span>
            </h2>
          </motion.div>

          <motion.p
            className="font-body text-muted-foreground text-lg md:text-xl max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Six valeurs essentielles au service de votre projet immobilier.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {engagements.map((engagement, i) => (
            <EngagementCard
              key={engagement.number}
              engagement={engagement}
              index={i}
              isActive={activeIndex === i}
              onHover={setActiveIndex}
            />
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-16 md:mt-20 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="h-px flex-1 bg-border" />
          <span className="font-display text-sm text-muted-foreground italic">
            L'excellence au quotidien
          </span>
          <div className="h-px flex-1 bg-border" />
        </motion.div>
      </div>
    </section>
  );
};

export default EngagementsSection;
