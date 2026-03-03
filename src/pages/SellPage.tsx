import { motion } from "framer-motion";
import { 
  ClipboardCheck, Camera, BarChart3, Megaphone, FileSignature, Key, 
  ArrowRight, Shield, TrendingUp, Users, Clock, Handshake, Award,
  CheckCircle, Phone, Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import EstimationForm from "@/components/EstimationForm";
import PricingSection from "@/components/PricingSection";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Estimation gratuite & personnalisée",
    description: "Nous réalisons une estimation précise de votre bien basée sur notre connaissance approfondie du marché local, les dernières transactions comparables et une analyse des atouts spécifiques de votre propriété.",
    details: ["Analyse comparative de marché", "Visite approfondie du bien", "Rapport d'estimation détaillé", "Conseil sur les travaux à envisager"],
  },
  {
    icon: Camera,
    title: "Mise en valeur premium",
    description: "Nous investissons dans la présentation de votre bien pour maximiser son attractivité : photographies professionnelles HDR, vidéo drone si pertinent, home staging virtuel et rédaction d'une annonce percutante.",
    details: ["Photos HDR professionnelles", "Visite virtuelle 360°", "Home staging conseil", "Annonce rédactionnelle soignée"],
  },
  {
    icon: BarChart3,
    title: "Stratégie de commercialisation",
    description: "Ensemble, nous définissons une stratégie de prix et de commercialisation parfaitement adaptée à votre bien et aux conditions actuelles du marché.",
    details: ["Analyse du marché actuel", "Positionnement prix optimisé", "Ciblage acheteurs qualifiés", "Calendrier de commercialisation"],
  },
  {
    icon: Megaphone,
    title: "Diffusion multi-canal",
    description: "Votre bien est diffusé sur les meilleurs portails, nos réseaux sociaux, notre base d'acheteurs qualifiés et notre réseau off-market confidentiel.",
    details: ["Portails immobiliers premium", "Réseaux sociaux ciblés", "Base acheteurs privée", "Réseau off-market exclusif"],
  },
  {
    icon: FileSignature,
    title: "Sélection & négociation",
    description: "Nous organisons et gérons toutes les visites, sélectionnons les acquéreurs sérieux et négocions dans votre intérêt pour obtenir le meilleur prix.",
    details: ["Visites qualifiées uniquement", "Vérification financement", "Négociation experte", "Rédaction compromis"],
  },
  {
    icon: Key,
    title: "Accompagnement jusqu'aux clés",
    description: "Nous assurons le suivi complet du dossier auprès du notaire et restons à vos côtés jusqu'à la signature de l'acte authentique et la remise des clés.",
    details: ["Suivi notaire complet", "Coordination des parties", "Gestion administrative", "Remise des clés"],
  },
];

const advantages = [
  { icon: Shield, title: "0% de frais cachés", desc: "Nos honoraires sont transparents, définis et acceptés dès le départ. Aucune surprise." },
  { icon: TrendingUp, title: "Prix de vente optimisé", desc: "Notre expertise locale nous permet d'obtenir les meilleurs prix du marché pour nos vendeurs." },
  { icon: Users, title: "Réseau d'acheteurs qualifiés", desc: "Accès immédiat à notre base de +500 acheteurs actifs et qualifiés en Île-de-France." },
  { icon: Clock, title: "Délai de vente réduit", desc: "Notre délai moyen de vente est de 45 jours, bien en dessous de la moyenne du marché." },
  { icon: Handshake, title: "Accompagnement humain", desc: "Un interlocuteur unique et dédié vous accompagne à chaque étape, disponible 7j/7." },
  { icon: Award, title: "Engagement de résultat", desc: "Nous nous engageons sur un plan d'action précis et des objectifs clairs dès le début." },
];

const stats = [
  { value: "45j", label: "Délai moyen de vente" },
  { value: "200+", label: "Ventes réalisées" },
  { value: "10+", label: "Années d'expérience" },
];

const SellPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/90" />
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block font-body text-accent text-base font-semibold tracking-widest uppercase mb-4">Vendez en toute sérénité</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 leading-tight">
              Votre bien mérite<br />
              <span className="text-gold italic">le meilleur accompagnement</span>
            </h1>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-8">
              De l'estimation à la remise des clés, nous vous accompagnons avec expertise, 
              transparence et engagement. Chaque vente est unique, notre approche aussi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EstimationForm
                trigger={
                  <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 font-body font-semibold tracking-wide text-base rounded hover:brightness-110 transition-all">
                    Estimation gratuite <ArrowRight className="w-5 h-5" />
                  </button>
                }
              />
              <a
                href="tel:+33184801400"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 font-body font-semibold tracking-wide text-base rounded hover:bg-primary-foreground/10 transition-all"
              >
                <Phone className="w-5 h-5" /> Nous appeler
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-0 -mt-1">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 bg-card rounded-lg shadow-lg border border-border -mt-8 relative z-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 text-center border-r last:border-r-0 border-border"
              >
                <div className="font-display text-3xl md:text-4xl text-accent mb-1">{s.value}</div>
                <div className="font-body text-muted-foreground text-sm tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Pourquoi vendre avec <span className="text-gold italic">Emilio</span> ?
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-muted-foreground leading-relaxed text-lg md:text-xl">
              Vendre un bien immobilier est une étape importante. C'est pourquoi nous mettons tout en œuvre
              pour que cette expérience soit fluide, sereine et aboutisse au meilleur résultat possible. 
              Notre connaissance approfondie du marché francilien, combinée à une approche humaine et personnalisée, 
              fait toute la différence.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-5">Notre processus en<br className="sm:hidden" /> <span className="text-accent italic">6 étapes</span></h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-5" />
            <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Un accompagnement structuré et transparent pour une vente réussie.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 md:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row gap-4 md:gap-8 pb-0 md:pb-12 last:pb-0"
              >
                {/* Number + line - horizontal on mobile, vertical on desktop */}
                <div className="flex md:flex-col items-center gap-3 md:gap-0">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-display font-bold text-base md:text-lg shrink-0 shadow-md">
                    {i + 1}
                  </div>
                  <h3 className="font-display text-lg md:hidden">{step.title}</h3>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block w-0.5 flex-1 bg-accent/20 mt-2" />
                  )}
                </div>
                
                <div className="bg-card p-5 md:p-10 rounded-xl shadow-sm border border-border flex-1 mb-2">
                  <div className="hidden md:flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-display text-2xl">{step.title}</h3>
                  </div>
                  <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed mb-4 md:mb-5">{step.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {step.details.map((d) => (
                      <div key={d} className="flex items-center gap-2 font-body text-sm md:text-base text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-5">Nos <span className="text-accent italic">engagements</span></h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-5" />
            <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Ce qui fait la différence quand vous nous confiez la vente de votre bien.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {advantages.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                  <a.icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                </div>
                <h3 className="font-display text-xl md:text-2xl mb-3">{a.title}</h3>
                <p className="font-body text-muted-foreground text-lg leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-6 h-6 fill-accent text-accent" />)}
            </div>
            <blockquote className="font-display text-2xl md:text-3xl text-primary-foreground italic leading-relaxed mb-6">
              "La vente de notre appartement s'est déroulée de manière exceptionnelle. 
              L'estimation était juste, la mise en valeur parfaite et nous avons vendu 
              en seulement 3 semaines au prix souhaité."
            </blockquote>
            <p className="font-body text-primary-foreground/60 text-base">— Sophie & Marc L., vente à Boulogne-Billancourt</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <PricingSection
        heading="Nos honoraires"
        subheading="Des tarifs transparents, adaptés à votre projet de vente."
        plans={[
          {
            title: "Mandat Simple",
            rate: "5% TTC",
            subtitle: "du prix de vente du bien",
            features: [
              { text: "Estimation gratuite du bien", included: true },
              { text: "Photos professionnelles", included: true },
              { text: "Diffusion portails immobiliers", included: true },
              { text: "Visites et compte-rendus", included: true },
              { text: "Accompagnement notaire", included: true },
              { text: "Stratégie de vente exclusive", included: false },
              { text: "Priorité de diffusion maximale", included: false },
              { text: "Reporting hebdomadaire détaillé", included: false },
              { text: "Vente en moyenne 2x plus rapide", included: false },
            ],
            cta: "Choisir le mandat simple",
          },
          {
            title: "Mandat Exclusif",
            rate: "4% TTC",
            subtitle: "du prix de vente du bien",
            recommended: true,
            features: [
              { text: "Estimation gratuite du bien", included: true },
              { text: "Photos & vidéo drone professionnelles", included: true },
              { text: "Diffusion premium multi-canal", included: true },
              { text: "Visites qualifiées et compte-rendus", included: true },
              { text: "Accompagnement notaire complet", included: true },
              { text: "Stratégie de vente sur-mesure dédiée", included: true },
              { text: "Priorité de diffusion maximale", included: true },
              { text: "Reporting hebdomadaire détaillé", included: true },
              { text: "Vente en moyenne 2x plus rapide", included: true },
            ],
            cta: "Choisir le mandat exclusif",
          },
        ]}
      />

      {/* CTA FINAL */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-5">
            Prêt à vendre votre bien ?
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-xl mx-auto mb-8 text-lg md:text-xl">
            Commencez par une estimation gratuite et sans engagement.
          </p>
          <EstimationForm
            trigger={
              <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-10 py-4 font-body font-semibold tracking-wide text-base rounded hover:brightness-110 transition-all">
                Demander une estimation gratuite <ArrowRight className="w-5 h-5" />
              </button>
            }
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SellPage;
