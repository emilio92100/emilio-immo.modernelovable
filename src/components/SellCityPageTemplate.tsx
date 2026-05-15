import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  TrendingUp,
  Clock,
  ShieldCheck,
  Users,
  Camera,
  Network,
  Handshake,
  Sparkles,
  ArrowRight,
  Phone,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";
import EstimationPopup from "@/components/EstimationPopup";
import type { CityData } from "@/lib/cities";
import type { SellCityData } from "@/lib/sellCities";

type Props = { city: CityData; sell: SellCityData };

const method = [
  {
    icon: TrendingUp,
    title: "Estimation experte",
    desc: "Analyse fine de votre bien et du marché local par un conseiller dédié. Rendu sous 24h, gratuit, sans engagement.",
  },
  {
    icon: Camera,
    title: "Mise en valeur premium",
    desc: "Reportage photo professionnel, plans 2D, visite virtuelle si pertinent et dossier de présentation soigné.",
  },
  {
    icon: Network,
    title: "Diffusion off-market ciblée",
    desc: "Activation prioritaire de notre vivier d'acheteurs déjà qualifiés avant toute mise en ligne publique.",
  },
  {
    icon: Users,
    title: "Visites qualifiées uniquement",
    desc: "Aucun curieux. Chaque visiteur est filtré : capacité de financement vérifiée et projet sérieux.",
  },
  {
    icon: Handshake,
    title: "Négociation et signature",
    desc: "Accompagnement de A à Z : compromis, levée des conditions, suivi notarial jusqu'à la remise des clés.",
  },
];

const SellCityPageTemplate = ({ city, sell }: Props) => {
  const PAGE_URL = `https://www.emilio-immo.com/vendre-appartement-${city.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        name: "Emilio Immobilier",
        url: PAGE_URL,
        areaServed: { "@type": "Place", name: city.name },
        telephone: "+33184801400",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.emilio-immo.com/" },
          { "@type": "ListItem", position: 2, name: "Vendre", item: "https://www.emilio-immo.com/vendre" },
          { "@type": "ListItem", position: 3, name: `Vendre ${city.name}`, item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: sell.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={sell.metaTitle}
        description={sell.metaDescription}
        canonical={PAGE_URL}
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-primary-foreground" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full border border-primary-foreground" />
        </div>
        <div className="container mx-auto px-5 md:px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25 rounded-full px-4 py-1.5 mb-8">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span className="font-body text-accent text-xs font-semibold tracking-wide uppercase">
                Vendre · {city.postalLabel}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-[1.1] mb-8">
              Vendre votre appartement à{" "}
              <span className="block mt-2 italic text-accent">{city.name}</span>
            </h1>
            <p className="font-body text-primary-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              {sell.heroIntro}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <EstimationPopup
                defaultCity={city.name}
                defaultPostalCode={city.postalCodes[0]}
                trigger={
                  <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all">
                    <TrendingUp className="w-4 h-4" /> Estimer mon bien gratuitement
                  </button>
                }
              />
              <a
                href="tel:+33184801400"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-full font-body font-medium text-sm hover:bg-primary-foreground/5 transition-all"
              >
                <Phone className="w-4 h-4" /> Parler à un conseiller
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMBIEN VAUT MON BIEN */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
              Le marché local
            </span>
            <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3">
              Combien vaut votre bien à{" "}
              <span className="italic text-accent">{city.name}</span> ?
            </h2>
            <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
              {city.pricePerSqm.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="font-body text-xs uppercase tracking-wide text-muted-foreground mb-2">Entrée de gamme</div>
              <div className="font-display text-2xl text-foreground">≈ {city.pricePerSqm.low.toLocaleString("fr-FR")} €/m²</div>
            </div>
            <div className="bg-primary border border-accent/30 rounded-xl p-6 text-center">
              <div className="font-body text-xs uppercase tracking-wide text-accent mb-2">Prix médian</div>
              <div className="font-display text-2xl text-primary-foreground">≈ {city.pricePerSqm.mid.toLocaleString("fr-FR")} €/m²</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="font-body text-xs uppercase tracking-wide text-muted-foreground mb-2">Premium</div>
              <div className="font-display text-2xl text-foreground">≈ {city.pricePerSqm.high.toLocaleString("fr-FR")} €/m²</div>
            </div>
          </div>

          <div className="bg-secondary border border-border rounded-2xl p-8 text-center">
            <p className="font-body text-muted-foreground text-sm mb-5 max-w-2xl mx-auto">
              Une estimation précise dépend de l'étage, l'exposition, l'extérieur, l'état général et les vues.
              Obtenez un rendu personnalisé sous 24h.
            </p>
            <EstimationPopup
              defaultCity={city.name}
              defaultPostalCode={city.postalCodes[0]}
              trigger={
                <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all">
                  <TrendingUp className="w-4 h-4" /> Recevoir mon estimation
                </button>
              }
            />
          </div>
        </div>
      </section>

      {/* DÉLAI DE VENTE */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
              Délai moyen
            </span>
            <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3">
              Combien de temps pour vendre à{" "}
              <span className="italic text-accent">{city.name}</span> ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-card border border-border rounded-xl p-8">
              <Clock className="w-7 h-7 text-muted-foreground mb-3" />
              <div className="font-body text-xs uppercase tracking-wide text-muted-foreground mb-1">Marché local</div>
              <div className="font-display text-3xl text-foreground mb-2">{sell.avgDelayCity}</div>
              <p className="font-body text-sm text-muted-foreground">
                Délai moyen observé sur le marché à {city.name}, du mandat à la signature.
              </p>
            </div>
            <div className="bg-primary border border-accent/30 rounded-xl p-8">
              <Sparkles className="w-7 h-7 text-accent mb-3" />
              <div className="font-body text-xs uppercase tracking-wide text-accent mb-1">Avec Emilio Immobilier</div>
              <div className="font-display text-3xl text-primary-foreground mb-2">{sell.avgDelayUs}</div>
              <p className="font-body text-sm text-primary-foreground/70">
                Notre vivier d'acheteurs qualifiés permet une mise en relation prioritaire, avant toute diffusion publique.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg text-foreground mb-2">Profil de nos acheteurs à {city.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{sell.profilAcheteurs}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="text-center mb-14">
            <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
              Notre méthode
            </span>
            <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3">
              5 étapes pour vendre à{" "}
              <span className="italic text-accent">{city.name}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {method.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display text-xs text-accent">0{i + 1}</span>
                  <m.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-base text-foreground mb-2">{m.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MARCHÉ + ANGLE */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-5 md:px-6 max-w-4xl text-center">
          <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
            Pourquoi vendre maintenant
          </span>
          <h2 className="font-display text-2xl md:text-4xl text-primary-foreground mt-3 mb-8">
            {city.name} en <span className="italic text-accent">2026</span>
          </h2>
          <p className="font-body text-primary-foreground/70 text-base md:text-lg leading-relaxed">
            {sell.marketAngle}
          </p>
        </div>
      </section>

      {/* HONORAIRES / RÉASSURANCE */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
              Nos engagements
            </span>
            <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3">
              Pourquoi nous confier votre vente
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: "Honoraires transparents", desc: "Tarifs clairs présentés dès le premier rendez-vous, sans frais cachés." },
              { icon: Network, title: "Réseau off-market", desc: "Vivier d'acheteurs qualifiés activé avant toute diffusion publique." },
              { icon: Sparkles, title: "Conseiller dédié", desc: "Un seul interlocuteur de l'estimation à la remise des clés." },
            ].map((b) => (
              <div key={b.title} className="bg-secondary border border-border rounded-xl p-6">
                <b.icon className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-display text-base text-foreground mb-2">{b.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground font-body">
            {["Estimation gratuite", "Sans engagement", "Confidentialité absolue", "Réponse sous 24h"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 bg-secondary border border-border rounded-full px-3 py-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl">
          <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
            Questions de vendeurs
          </span>
          <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3 mb-10">
            Vendre à {city.name} : <span className="italic text-accent">vos questions</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {sell.faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 overflow-hidden data-[state=open]:border-accent/30 transition-colors"
              >
                <AccordionTrigger className="font-display text-base md:text-lg text-foreground py-5 hover:no-underline gap-4 [&[data-state=open]>svg]:text-accent">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* MAILLAGE INTERNE */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
          <p className="font-body text-sm text-muted-foreground mb-4">
            Acheteur à {city.name} ? Découvrez nos biens disponibles.
          </p>
          <Link
            to={`/achat-appartement-${city.slug}`}
            className="inline-flex items-center gap-2 text-accent font-body font-semibold text-sm hover:underline"
          >
            Voir les biens à {city.name} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
          <h2 className="font-display text-2xl md:text-4xl text-primary-foreground mb-5">
            Prêt à vendre votre bien à {city.name} ?
          </h2>
          <p className="font-body text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Estimation gratuite et confidentielle, puis appel d'un conseiller dédié sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <EstimationPopup
              defaultCity={city.name}
              defaultPostalCode={city.postalCodes[0]}
              trigger={
                <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all">
                  <TrendingUp className="w-4 h-4" /> Estimer mon bien
                </button>
              }
            />
            <a
              href="tel:+33184801400"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-full font-body font-medium text-sm hover:bg-primary-foreground/5 transition-colors"
            >
              <Phone className="w-4 h-4" /> 01 84 80 14 00
            </a>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default SellCityPageTemplate;