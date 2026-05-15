import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Train,
  Trees,
  ArrowRight,
  CheckCircle2,
  Search,
  Phone,
  TrendingUp,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";
import EstimationPopup from "@/components/EstimationPopup";
import { Property, mockProperties, fetchPropertiesFromFeed } from "@/lib/properties";
import type { CityData } from "@/lib/cities";

const renderMarkdownLight = (txt: string) =>
  txt.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

const CityPageTemplate = ({ city }: { city: CityData }) => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const PAGE_URL = `https://www.emilio-immo.com/achat-appartement-${city.slug}`;

  useEffect(() => {
    fetchPropertiesFromFeed().then(setProperties).catch(() => {});
  }, []);

  const cityProperties = properties
    .filter(
      (p) =>
        city.postalCodes.includes(p.postalCode) ||
        city.cityMatch.some((m) => p.city.toLowerCase().includes(m)),
    )
    .slice(0, 6);

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
          { "@type": "ListItem", position: 3, name: `Achat ${city.name}`, item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: city.faqs.map((f) => ({
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
        title={city.metaTitle}
        description={city.metaDescription}
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
                {city.postalLabel}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-[1.1] mb-8">
              Achat & vente d'appartement à{" "}
              <span className="block mt-2 italic text-accent">{city.name}</span>
            </h1>
            <p className="font-body text-primary-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              {city.heroIntro}
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
              <Link
                to="/biens"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-full font-body font-medium text-sm hover:bg-primary-foreground/5 transition-all"
              >
                <Search className="w-4 h-4" /> Voir les biens
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARCHÉ */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl text-center">
          <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
            Le marché
          </span>
          <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3 mb-10">
            Le marché immobilier à <span className="italic text-accent">{city.name}</span>
          </h2>
          <div className="prose prose-lg max-w-3xl mx-auto font-body text-muted-foreground leading-relaxed space-y-6 text-left md:text-center">
            {city.marketParagraphs.map((p, i) => (
              <p key={i}>{renderMarkdownLight(p)}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
            {city.stats.map((s) => (
              <div
                key={s.label}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <s.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="font-display text-xl md:text-2xl text-foreground">{s.val}</div>
                <div className="font-body text-sm text-muted-foreground mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MID-PAGE ESTIMATION CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary border border-accent/30 rounded-2xl p-8 md:p-10 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25 rounded-full px-4 py-1.5 mb-5">
              <TrendingUp className="w-3.5 h-3.5 text-accent" />
              <span className="font-body text-accent text-xs font-semibold tracking-wide uppercase">
                Estimation immédiate · gratuite
              </span>
            </div>
            <h3 className="font-display text-xl md:text-2xl text-primary-foreground mb-4 max-w-2xl mx-auto leading-tight">
              {city.estimationCta}
            </h3>
            <p className="font-body text-primary-foreground/60 text-sm mb-6 max-w-xl mx-auto">
              Estimation basée sur les dernières ventes réelles de votre quartier
              (DVF — data.gouv.fr). 100 % gratuit, 0 spam.
            </p>
            <EstimationPopup
              defaultCity={city.name}
              defaultPostalCode={city.postalCodes[0]}
              trigger={
                <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all">
                  Estimer mon bien en 2 minutes <ArrowRight className="w-4 h-4" />
                </button>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* QUARTIERS */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
            Les quartiers
          </span>
          <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3 mb-3">
            Où acheter à <span className="italic text-accent">{city.name}</span> ?
          </h2>
          <p className="font-body text-muted-foreground mb-10 max-w-2xl">
            Chaque quartier a son identité. Voici notre sélection pour vous aider à cibler.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {city.quartiers.map((q, i) => (
              <motion.div
                key={q.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors"
              >
                <h3 className="font-display text-lg text-foreground mb-2">{q.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{q.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BIENS DISPO */}
      <section className="py-24 md:py-36 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
                Disponibles
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3">
                Nos biens à <span className="italic text-accent">{city.name}</span>
              </h2>
            </div>
            <Link
              to="/biens"
              className="inline-flex items-center gap-2 text-accent font-body font-semibold text-sm hover:underline"
            >
              Voir tous nos biens <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {cityProperties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityProperties.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-10 text-center">
              <p className="font-body text-muted-foreground mb-6">
                Aucun bien à {city.name} n'est actuellement publié. Nos biens off-market évoluent
                chaque semaine — confiez-nous votre recherche.
              </p>
              <Link
                to="/mandat-recherche"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm"
              >
                Démarrer ma recherche <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* TRANSPORTS / ATOUTS */}
      <section className="py-24 md:py-36 bg-primary">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
            Cadre de vie
          </span>
          <h2 className="font-display text-2xl md:text-4xl text-primary-foreground mt-3 mb-10">
            Pourquoi vivre à <span className="italic text-accent">{city.name}</span> ?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-xl p-6">
              <Train className="w-6 h-6 text-accent mb-3" />
              <h3 className="font-display text-lg text-primary-foreground mb-3">Transports</h3>
              <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
                {city.transports.map((t) => (
                  <li key={t.line} className="flex gap-3">
                    <span className="text-accent font-semibold shrink-0">{t.line}</span>
                    <span>{t.stations}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-xl p-6">
              <Trees className="w-6 h-6 text-accent mb-3" />
              <h3 className="font-display text-lg text-primary-foreground mb-3">Atouts</h3>
              <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
                {city.atouts.map((a) => (
                  <li key={a} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-36 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl">
          <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">
            Questions fréquentes
          </span>
          <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3 mb-10">
            {city.name} : <span className="italic text-accent">vos questions</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {city.faqs.map((f, i) => (
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

      {/* CTA FINAL */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-5">
            {city.estimationCta}
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-xl mx-auto">
            Estimation gratuite basée sur les dernières ventes réelles de votre quartier, puis appel
            d'un conseiller sous 24h pour affiner.
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
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-full font-body font-medium text-sm hover:bg-secondary transition-colors"
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

export default CityPageTemplate;
