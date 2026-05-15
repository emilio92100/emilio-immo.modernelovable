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
  AlertTriangle,
  FileText,
  Home,
  Calculator,
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
    desc: "Analyse fine de votre bien et du marché local par un conseiller dédié. Rendu sous 24h, gratuit et sans engagement.",
  },
  {
    icon: Camera,
    title: "Mise en valeur premium",
    desc: "Reportage photo professionnel, plans 2D, visite virtuelle si pertinent et dossier de présentation soigné en français et anglais.",
  },
  {
    icon: Network,
    title: "Diffusion off-market ciblée",
    desc: "Activation prioritaire de notre vivier d'acheteurs déjà qualifiés avant toute mise en ligne publique.",
  },
  {
    icon: Users,
    title: "Visites qualifiées uniquement",
    desc: "Aucun curieux. Chaque visiteur est filtré : capacité de financement vérifiée et projet sérieux validé en amont.",
  },
  {
    icon: Handshake,
    title: "Négociation et signature",
    desc: "Accompagnement de A à Z : compromis, levée des conditions, suivi notarial jusqu'à la remise des clés.",
  },
];

const documents = [
  "Titre de propriété",
  "3 derniers procès-verbaux d'assemblée générale",
  "Règlement de copropriété et état descriptif de division",
  "Pré-état daté (à demander au syndic)",
  "Carnet d'entretien de l'immeuble",
  "Diagnostic de Performance Énergétique (DPE)",
  "Diagnostic plomb (immeubles construits avant 1949)",
  "Diagnostic amiante (avant 1997)",
  "Diagnostic électricité et gaz (installations > 15 ans)",
  "État des Risques et Pollutions (ERP)",
  "Mesurage Loi Carrez",
  "Dernier appel de fonds et taxe foncière",
];

// Typo tokens — used everywhere for consistency
const T = {
  eyebrow: "font-body text-accent font-semibold text-sm tracking-[0.25em] uppercase",
  h2: "font-display text-[1.75rem] sm:text-4xl md:text-5xl text-foreground leading-[1.15]",
  h2Light: "font-display text-[1.75rem] sm:text-4xl md:text-5xl text-primary-foreground leading-[1.15]",
  h3: "font-display text-lg md:text-2xl text-foreground",
  lead: "font-body text-base md:text-xl text-muted-foreground leading-relaxed",
  body: "font-body text-[15px] md:text-lg text-muted-foreground leading-relaxed",
  bodyLight: "font-body text-[15px] md:text-lg text-primary-foreground/80 leading-relaxed",
};

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
      <SEOHead title={sell.metaTitle} description={sell.metaDescription} canonical={PAGE_URL} jsonLd={jsonLd} />
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
              <MapPin className="w-4 h-4 text-accent" />
              <span className="font-body text-accent text-sm font-semibold tracking-wide uppercase">
                Vendre · {city.postalLabel}
              </span>
            </div>
            <h1 className="font-display text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] mb-8">
              Vendre votre appartement{" "}
              <span className="italic text-accent whitespace-nowrap">à {city.name}</span>
            </h1>
            <p className="font-body text-primary-foreground/80 text-base md:text-2xl leading-relaxed max-w-3xl mx-auto mb-10">
              {sell.heroIntro}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <EstimationPopup
                defaultCity={city.name}
                defaultPostalCode={city.postalCodes[0]}
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
                <Phone className="w-5 h-5" /> Parler à un conseiller
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRIX AU M² */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="text-center mb-14">
            <span className={T.eyebrow}>Le marché local</span>
            <h2 className={`${T.h2} mt-4`}>
              Combien vaut votre bien <span className="italic text-accent whitespace-nowrap">à {city.name}</span> ?
            </h2>
            <p className={`${T.lead} mt-6 max-w-3xl mx-auto`}>{city.pricePerSqm.description}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <div className="font-body text-sm uppercase tracking-wide text-muted-foreground mb-3">Entrée de gamme</div>
              <div className="font-display text-3xl md:text-4xl text-foreground">≈ {city.pricePerSqm.low.toLocaleString("fr-FR")} €/m²</div>
            </div>
            <div className="bg-primary border border-accent/30 rounded-2xl p-8 text-center">
              <div className="font-body text-sm uppercase tracking-wide text-accent mb-3">Prix médian</div>
              <div className="font-display text-3xl md:text-4xl text-primary-foreground">≈ {city.pricePerSqm.mid.toLocaleString("fr-FR")} €/m²</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <div className="font-body text-sm uppercase tracking-wide text-muted-foreground mb-3">Premium</div>
              <div className="font-display text-3xl md:text-4xl text-foreground">≈ {city.pricePerSqm.high.toLocaleString("fr-FR")} €/m²</div>
            </div>
          </div>

          <div className="bg-secondary border border-border rounded-2xl p-10 text-center">
            <p className={`${T.body} mb-6 max-w-2xl mx-auto`}>
              Une estimation précise dépend de l'étage, l'exposition, l'extérieur, l'état général, les vues
              et la qualité de la copropriété. Recevez un rendu personnalisé sous 24h, gratuit et sans engagement.
            </p>
            <EstimationPopup
              defaultCity={city.name}
              defaultPostalCode={city.postalCodes[0]}
              trigger={
                <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-7 py-4 rounded-full font-body font-semibold text-base hover:brightness-110 transition-all">
                  <TrendingUp className="w-5 h-5" /> Recevoir mon estimation
                </button>
              }
            />
          </div>
        </div>
      </section>

      {/* QUARTIERS */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="text-center mb-14">
            <span className={T.eyebrow}>Connaissance terrain</span>
            <h2 className={`${T.h2} mt-4`}>
              Les quartiers porteurs <span className="italic text-accent whitespace-nowrap">de {city.name}</span>
            </h2>
            <p className={`${T.lead} mt-6 max-w-3xl mx-auto`}>
              Chaque quartier a ses acheteurs, ses prix et son timing. Notre conseiller adapte la stratégie au vôtre.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {sell.quartiersForts.map((q) => (
              <div key={q.name} className="bg-card border border-border rounded-2xl p-7 hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Home className="w-5 h-5 text-accent" />
                  <h3 className={T.h3}>{q.name}</h3>
                </div>
                <p className={T.body}>{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DÉLAI + PROFIL ACHETEURS */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="text-center mb-14">
            <span className={T.eyebrow}>Délai moyen</span>
            <h2 className={`${T.h2} mt-4`}>
              Combien de temps pour vendre <span className="italic text-accent whitespace-nowrap">à {city.name}</span> ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-card border border-border rounded-2xl p-10">
              <Clock className="w-8 h-8 text-muted-foreground mb-4" />
              <div className="font-body text-sm uppercase tracking-wide text-muted-foreground mb-2">Marché local</div>
              <div className="font-display text-4xl md:text-5xl text-foreground mb-3">{sell.avgDelayCity}</div>
              <p className={T.body}>
                Délai moyen observé sur le marché à {city.name}, du mandat à la signature de l'acte authentique.
              </p>
            </div>
            <div className="bg-primary border border-accent/30 rounded-2xl p-10">
              <Sparkles className="w-8 h-8 text-accent mb-4" />
              <div className="font-body text-sm uppercase tracking-wide text-accent mb-2">Avec Emilio Immobilier</div>
              <div className="font-display text-4xl md:text-5xl text-primary-foreground mb-3">{sell.avgDelayUs}</div>
              <p className={T.bodyLight}>
                Notre vivier d'acheteurs qualifiés permet une mise en relation prioritaire, avant toute diffusion publique.
              </p>
            </div>
          </div>

          <div className="bg-secondary border border-border rounded-2xl p-10">
            <div className="flex items-start gap-5">
              <Users className="w-7 h-7 text-accent shrink-0 mt-1" />
              <div>
                <h3 className={`${T.h3} mb-3`}>Profil de nos acheteurs à {city.name}</h3>
                <p className={T.body}>{sell.profilAcheteurs}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POINTS FORTS */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="text-center mb-14">
            <span className={T.eyebrow}>Atouts à valoriser</span>
            <h2 className={`${T.h2} mt-4`}>
              Pourquoi votre bien <span className="whitespace-nowrap">à {city.name}</span> <span className="italic text-accent whitespace-nowrap">se vend bien</span>
            </h2>
            <p className={`${T.lead} mt-6 max-w-3xl mx-auto`}>
              Nous mettons en avant les arguments concrets qui déclenchent la décision d'achat dans votre secteur.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {sell.pointsForts.map((p) => (
              <div key={p} className="flex items-start gap-4 bg-card border border-border rounded-xl p-6">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <p className="font-body text-base md:text-lg text-foreground leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="text-center mb-14">
            <span className={T.eyebrow}>Notre méthode</span>
            <h2 className={`${T.h2} mt-4`}>
              5 étapes pour vendre <span className="italic text-accent whitespace-nowrap">à {city.name}</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {method.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-7 md:p-8 hover:border-accent/40 hover:shadow-lg transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-display text-lg text-accent">0{i + 1}</span>
                  <m.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3 leading-snug">{m.title}</h3>
                <p className="font-body text-[15px] md:text-base text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MARCHÉ + ANGLE */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-5 md:px-6 max-w-4xl text-center">
          <span className={T.eyebrow}>Pourquoi vendre maintenant</span>
          <h2 className={`${T.h2Light} mt-4 mb-8`}>
            <span className="whitespace-nowrap">{city.name}</span> en <span className="italic text-accent">2026</span>
          </h2>
          <p className="font-body text-primary-foreground/85 text-base md:text-2xl leading-relaxed">
            {sell.marketAngle}
          </p>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="text-center mb-14">
            <span className={T.eyebrow}>Préparer son dossier</span>
            <h2 className={`${T.h2} mt-4`}>
              Documents à réunir <span className="italic text-accent">pour vendre</span>
            </h2>
            <p className={`${T.lead} mt-6 max-w-3xl mx-auto`}>
              Notre conseiller centralise et coordonne avec votre syndic et notaire. Vous n'avez rien à gérer seul.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {documents.map((d) => (
              <div key={d} className="flex items-start gap-3 bg-secondary border border-border rounded-xl p-5">
                <FileText className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="font-body text-base text-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ERREURS À ÉVITER */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="text-center mb-14">
            <span className={T.eyebrow}>Pièges classiques</span>
            <h2 className={`${T.h2} mt-4`}>
              Les 4 erreurs <span className="italic text-accent">à éviter</span>
            </h2>
            <p className={`${T.lead} mt-6 max-w-3xl mx-auto`}>
              Constatées sur des centaines de mandats. Anticipez-les pour vendre vite et au juste prix.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {sell.erreursAEviter.map((e, i) => (
              <div key={e.title} className="bg-card border border-border rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-accent" />
                  <span className="font-display text-base text-accent">Erreur 0{i + 1}</span>
                </div>
                <h3 className={`${T.h3} mb-3`}>{e.title}</h3>
                <p className={T.body}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FISCALITÉ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <span className={T.eyebrow}>Aspect fiscal</span>
            <h2 className={`${T.h2} mt-4`}>
              Fiscalité de la <span className="italic text-accent">vente</span>
            </h2>
          </div>

          <div className="bg-secondary border border-border rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-5 mb-8">
              <Calculator className="w-8 h-8 text-accent shrink-0 mt-1" />
              <div>
                <h3 className={`${T.h3} mb-3`}>Résidence principale</h3>
                <p className={T.body}>
                  Exonération totale de la plus-value, sans condition de durée de détention.
                  C'est le régime le plus favorable et il concerne la majorité des ventes que nous accompagnons.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-8 flex items-start gap-5">
              <Calculator className="w-8 h-8 text-accent shrink-0 mt-1" />
              <div>
                <h3 className={`${T.h3} mb-3`}>Résidence secondaire ou investissement</h3>
                <p className={`${T.body} mb-3`}>
                  Plus-value soumise à l'impôt sur le revenu (19 %) et aux prélèvements sociaux (17,2 %),
                  avec un abattement progressif selon la durée de détention.
                </p>
                <ul className={`${T.body} space-y-2 list-disc pl-5`}>
                  <li>Exonération d'impôt sur le revenu après 22 ans de détention</li>
                  <li>Exonération de prélèvements sociaux après 30 ans</li>
                  <li>Surtaxe de 2 à 6 % au-delà de 50 000 € de plus-value imposable</li>
                </ul>
                <p className={`${T.body} mt-4 italic`}>
                  Notre conseiller vous oriente vers un notaire fiscaliste si votre situation le justifie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RÉASSURANCE */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="text-center mb-14">
            <span className={T.eyebrow}>Nos engagements</span>
            <h2 className={`${T.h2} mt-4`}>Pourquoi nous confier votre vente</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: "Honoraires transparents", desc: "Tarifs clairs présentés dès le premier rendez-vous, sans frais cachés ni mauvaise surprise." },
              { icon: Network, title: "Réseau off-market", desc: "Vivier d'acheteurs qualifiés activé avant toute diffusion publique pour préserver votre confidentialité." },
              { icon: Sparkles, title: "Conseiller dédié", desc: "Un seul interlocuteur de l'estimation à la remise des clés, joignable 7j/7." },
            ].map((b) => (
              <div key={b.title} className="bg-card border border-border rounded-2xl p-7">
                <b.icon className="w-7 h-7 text-accent mb-4" />
                <h3 className={`${T.h3} mb-3`}>{b.title}</h3>
                <p className={T.body}>{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {["Estimation gratuite", "Sans engagement", "Confidentialité absolue", "Réponse sous 24h"].map((b) => (
              <span key={b} className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 font-body text-base text-foreground">
                <CheckCircle2 className="w-4 h-4 text-accent" /> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <span className={T.eyebrow}>Questions de vendeurs</span>
            <h2 className={`${T.h2} mt-4`}>
              <span className="whitespace-nowrap">Vendre à {city.name}</span> : <span className="italic text-accent whitespace-nowrap">vos questions</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {sell.faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-2xl px-7 overflow-hidden data-[state=open]:border-accent/30 transition-colors"
              >
                <AccordionTrigger className="font-display text-lg md:text-xl text-foreground py-6 hover:no-underline gap-4 text-left [&[data-state=open]>svg]:text-accent">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-base md:text-lg text-muted-foreground leading-relaxed pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* MAILLAGE INTERNE */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
          <p className="font-body text-base md:text-lg text-muted-foreground mb-4">
            Acheteur à {city.name} ? Découvrez nos biens disponibles.
          </p>
          <Link
            to={`/achat-appartement-${city.slug}`}
            className="inline-flex items-center gap-2 text-accent font-body font-semibold text-base md:text-lg hover:underline"
          >
            Voir les biens à {city.name} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
          <h2 className={`${T.h2Light} mb-6`}>
            Prêt à vendre votre bien <span className="whitespace-nowrap">à {city.name}</span> ?
          </h2>
          <p className="font-body text-primary-foreground/80 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Estimation gratuite et confidentielle, puis appel d'un conseiller dédié sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <EstimationPopup
              defaultCity={city.name}
              defaultPostalCode={city.postalCodes[0]}
              trigger={
                <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-7 py-4 rounded-full font-body font-semibold text-base hover:brightness-110 transition-all">
                  <TrendingUp className="w-5 h-5" /> Estimer mon bien
                </button>
              }
            />
            <a
              href="tel:+33184801400"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/25 text-primary-foreground px-7 py-4 rounded-full font-body font-medium text-base hover:bg-primary-foreground/5 transition-colors"
            >
              <Phone className="w-5 h-5" /> 01 84 80 14 00
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
