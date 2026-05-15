import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ShieldCheck,
  Database,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Phone,
  Calculator,
  Sparkles,
  Lock,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import EstimationPopup from "@/components/EstimationPopup";
import { cityList } from "@/lib/cities";

const PAGE_URL = "https://www.emilio-immo.com/estimation";

const faqs = [
  {
    q: "L'estimation est-elle vraiment gratuite et sans engagement ?",
    a: "Oui. L'estimation en ligne est instantanée et 100 % gratuite. Si vous souhaitez un avis de valeur écrit signé par un de nos experts, nous nous déplaçons également sans frais ni obligation de mandat.",
  },
  {
    q: "Comment calculez-vous la valeur de mon appartement ?",
    a: "Notre estimation s'appuie sur trois sources : la base DVF (Demandes de Valeurs Foncières) publiée par l'État qui recense toutes les transactions notariées, les comparables actifs sur le marché et notre connaissance terrain (étage, exposition, vue, état de la copropriété, DPE).",
  },
  {
    q: "Combien de temps prend l'estimation ?",
    a: "L'estimation en ligne prend moins de 2 minutes. Pour un avis de valeur signé après visite, comptez 24 à 48h après notre passage.",
  },
  {
    q: "Mes données sont-elles confidentielles ?",
    a: "Absolument. Vos coordonnées et l'adresse de votre bien ne sont jamais transmises à des tiers, jamais revendues, et ne servent qu'à vous adresser votre estimation et un éventuel suivi.",
  },
  {
    q: "Sur quelles villes intervenez-vous ?",
    a: "Nous intervenons sur Paris (6ᵉ, 7ᵉ, 15ᵉ, 16ᵉ) et les Hauts-de-Seine (Boulogne-Billancourt, Neuilly-sur-Seine, Issy-les-Moulineaux, Levallois-Perret). Pour les communes limitrophes, contactez-nous directement.",
  },
  {
    q: "Quelle est la différence entre l'estimation en ligne et l'avis de valeur ?",
    a: "L'estimation en ligne donne une fourchette indicative basée sur les transactions du quartier. L'avis de valeur, lui, intègre la visite physique du bien (étage, vue, travaux, prestations de la copropriété) et constitue un document opposable et précis utilisable pour une succession, un divorce ou la mise en vente.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Estimation immobilière gratuite",
      provider: {
        "@type": "RealEstateAgent",
        name: "Emilio Immobilier",
        url: "https://www.emilio-immo.com",
        telephone: "+33184801400",
        areaServed: ["Paris 6e", "Paris 7e", "Paris 15e", "Paris 16e", "Boulogne-Billancourt", "Neuilly-sur-Seine", "Issy-les-Moulineaux", "Levallois-Perret"],
      },
      areaServed: "Paris & Hauts-de-Seine",
      description: "Estimation immobilière gratuite et instantanée pour appartements à Paris et dans les Hauts-de-Seine. Méthode basée sur la base DVF officielle et l'expertise locale.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      url: PAGE_URL,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.emilio-immo.com/" },
        { "@type": "ListItem", position: 2, name: "Estimation", item: PAGE_URL },
      ],
    },
  ],
};

const EstimationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Estimation immobilière gratuite Paris & Hauts-de-Seine | Emilio Immobilier"
        description="Estimation gratuite et instantanée de votre appartement à Paris et dans les Hauts-de-Seine. Méthode DVF + expertise locale. Sans engagement, résultat sous 24h."
        canonical={PAGE_URL}
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 bg-primary overflow-hidden">
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
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25 rounded-full px-4 py-2 mb-8">
              <Calculator className="w-4 h-4 text-accent" />
              <span className="font-body text-accent text-sm font-semibold tracking-wide uppercase">
                Service gratuit · sans engagement
              </span>
            </div>
            <h1 className="font-display text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] mb-8">
              Estimation immobilière{" "}
              <span className="italic text-accent whitespace-nowrap">gratuite & instantanée</span>
            </h1>
            <p className="font-body text-primary-foreground/80 text-base md:text-2xl leading-relaxed max-w-3xl mx-auto mb-10">
              Découvrez en moins de 2 minutes la valeur de votre appartement à Paris ou dans les Hauts-de-Seine.
              Méthode professionnelle basée sur les transactions notariées récentes et l'expertise terrain de notre agence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <EstimationPopup
                trigger={
                  <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-7 py-4 rounded-full font-body font-semibold text-base hover:brightness-110 transition-all">
                    <TrendingUp className="w-5 h-5" /> Estimer mon bien gratuitement
                  </button>
                }
              />
              <a
                href="tel:+33184801400"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/25 text-primary-foreground px-7 py-4 rounded-full font-body font-medium text-base hover:bg-primary-foreground/5 transition-all"
              >
                <Phone className="w-5 h-5" /> Parler à un expert
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-primary-foreground/60 text-sm font-body">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> 100 % gratuit</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Sans engagement</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Données confidentielles</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MÉTHODOLOGIE */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold font-body">Notre méthode</span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mt-4">
              Une estimation <span className="italic text-accent">fiable</span>, pas un chiffre au hasard
            </h2>
            <p className="font-body text-muted-foreground text-base md:text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
              Trois piliers pour une valorisation réaliste, défendable face aux acheteurs et conforme aux pratiques notariales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: "Base DVF officielle",
                desc: "Nous interrogeons en temps réel la base des Demandes de Valeurs Foncières publiée par la DGFIP : toutes les transactions notariées des 5 dernières années dans votre secteur.",
              },
              {
                icon: MapPin,
                title: "Expertise locale terrain",
                desc: "Nos conseillers parcourent vos quartiers chaque semaine. Étage, exposition, état de la copropriété, vue, DPE : autant de critères que les algorithmes ignorent.",
              },
              {
                icon: ShieldCheck,
                title: "Avis de valeur signé",
                desc: "Au-delà du chiffre, nous remettons un document écrit, argumenté, comparables à l'appui. Opposable en cas de succession, divorce ou contestation fiscale.",
              },
            ].map((m) => (
              <div key={m.title} className="bg-card border border-border rounded-2xl p-8">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <m.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{m.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed text-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX PAR VILLE */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold font-body">Prix au m² 2026</span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mt-4">
              Combien vaut un appartement <span className="italic text-accent">dans votre ville</span> ?
            </h2>
            <p className="font-body text-muted-foreground text-base md:text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
              Aperçu des prix médians actuels sur nos zones d'intervention. Cliquez sur votre ville pour le détail complet et lancer votre estimation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cityList.map((c) => (
              <Link
                key={c.slug}
                to={`/vendre-appartement-${c.slug}`}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-accent transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-colors">{c.name}</h3>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
                <div className="font-display text-2xl text-foreground mb-1">
                  ≈ {c.pricePerSqm.mid.toLocaleString("fr-FR")} €/m²
                </div>
                <div className="font-body text-xs text-muted-foreground">
                  De {c.pricePerSqm.low.toLocaleString("fr-FR")} à {c.pricePerSqm.high.toLocaleString("fr-FR")} €/m²
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIANCE */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold font-body">Pourquoi nous</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-4 mb-6 leading-tight">
                Une estimation que vous pouvez <span className="italic text-accent">défendre</span>
              </h2>
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-6">
                Surévaluer un bien, c'est le condamner à rester invisible. Sous-évaluer, c'est offrir des dizaines de milliers d'euros aux acheteurs.
                Notre estimation n'a qu'un objectif : vous donner le <strong className="text-foreground">juste prix de marché</strong>, celui auquel votre bien partira en moins de 60 jours.
              </p>
              <ul className="space-y-3">
                {[
                  "Méthode transparente : tous les comparables vous sont communiqués",
                  "Avis de valeur écrit signé par un expert",
                  "Mise à jour selon l'évolution du marché",
                  "Engagement : sincérité plutôt que sur-évaluation pour vous séduire",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary text-primary-foreground rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent/10" />
              <Lock className="w-10 h-10 text-accent mb-5" />
              <h3 className="font-display text-2xl mb-4">Confidentialité absolue</h3>
              <p className="font-body text-primary-foreground/75 text-sm leading-relaxed mb-6">
                Vos coordonnées et l'adresse de votre bien ne sont <strong>jamais</strong> diffusées, jamais revendues à des tiers,
                jamais transmises à d'autres agences. Conformité RGPD garantie.
              </p>
              <div className="flex items-center gap-3 text-sm font-body text-accent">
                <Sparkles className="w-4 h-4" />
                Réponse personnelle d'un conseiller sous 24h
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold font-body">Questions fréquentes</span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mt-4">
              Tout ce que vous voulez savoir
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`f${i}`}
                className="bg-card border border-border rounded-xl px-5"
              >
                <AccordionTrigger className="font-body font-semibold text-left text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-5 md:px-6 text-center max-w-3xl">
          <Clock className="w-10 h-10 text-accent mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-5xl text-primary-foreground mb-5 leading-tight">
            Lancez votre estimation maintenant
          </h2>
          <p className="font-body text-primary-foreground/75 text-base md:text-lg mb-9 max-w-xl mx-auto">
            Moins de 2 minutes. Aucun engagement. Résultat affiché immédiatement, accompagné d'un avis de valeur sous 24h si vous le souhaitez.
          </p>
          <EstimationPopup
            trigger={
              <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-body font-semibold text-base hover:brightness-110 transition-all">
                <TrendingUp className="w-5 h-5" /> Estimer mon bien gratuitement
              </button>
            }
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EstimationPage;