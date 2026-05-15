import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Train, GraduationCap, Trees, Building2, ArrowRight, CheckCircle2, Search, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";
import { Property, mockProperties, fetchPropertiesFromFeed } from "@/lib/properties";

const BB_POSTAL = "92100";
const PAGE_URL = "https://www.emilio-immo.com/achat-appartement-boulogne-billancourt";

const quartiers = [
  { name: "Centre-ville", desc: "Cœur historique autour de l'Hôtel de Ville, commerces, marché Escudier, ambiance de village urbain prisée." },
  { name: "Billancourt — Île Seguin", desc: "Quartier en pleine renaissance autour de la Seine Musicale, immeubles récents, bords de Seine et perspectives modernes." },
  { name: "Parchamp — Albert Kahn", desc: "Quartier résidentiel verdoyant, immeubles haussmanniens et années 30, prisé des familles pour ses écoles." },
  { name: "Silly — Gallieni", desc: "Quartier dynamique et bien desservi, proche du parc Edmond de Rothschild, mixte d'ancien et de neuf." },
  { name: "République — Point du Jour", desc: "Aux portes de Paris 16e, quartier recherché pour son calme, ses écoles et son accès direct à la capitale." },
  { name: "Marcel Sembat", desc: "Quartier vivant autour du métro ligne 9, commerces de proximité, idéal pour primo-accédants et investisseurs." },
];

const transports = [
  { line: "Ligne 9", stations: "Marcel Sembat · Billancourt · Pont de Sèvres" },
  { line: "Ligne 10", stations: "Boulogne Jean Jaurès · Pont de Saint-Cloud" },
  { line: "T2", stations: "Tramway Issy → La Défense" },
  { line: "RER C", stations: "Issy & Issy-Val-de-Seine à proximité" },
];

const faqs = [
  {
    q: "Quel est le prix moyen au m² pour un appartement à Boulogne-Billancourt ?",
    a: "Le prix moyen d'un appartement à Boulogne-Billancourt se situe autour de 9 000 à 10 500 €/m², avec de fortes variations selon le quartier, l'étage, l'exposition et la présence d'un extérieur. Les biens haussmanniens du Centre ou les programmes neufs de l'Île Seguin atteignent fréquemment 11 000 à 13 000 €/m².",
  },
  {
    q: "Quels sont les meilleurs quartiers pour acheter à Boulogne-Billancourt ?",
    a: "Les quartiers les plus recherchés sont le Centre-ville (cachet et commerces), Parchamp-Albert Kahn (familles, écoles, calme), République-Point du Jour (proximité Paris 16e) et l'Île Seguin/Billancourt (programmes neufs, bords de Seine).",
  },
  {
    q: "Combien de temps faut-il pour acheter un appartement à Boulogne-Billancourt ?",
    a: "Avec notre accompagnement en mandat de recherche, comptez en moyenne 3 à 4 mois entre le premier rendez-vous et la remise des clés : 4 à 8 semaines de recherche active, puis le délai incompressible compromis-acte authentique chez le notaire.",
  },
  {
    q: "Boulogne-Billancourt est-elle un bon investissement immobilier ?",
    a: "Oui. La ville cumule un bassin d'emploi dense, une excellente desserte (lignes 9, 10, T2, futur Grand Paris Express), des écoles réputées et une proximité immédiate de Paris. La demande locative y est très soutenue, en particulier pour les 2 et 3 pièces.",
  },
];

const AchatBoulogneBillancourt = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);

  useEffect(() => {
    fetchPropertiesFromFeed().then(setProperties).catch(() => {});
  }, []);

  const boulogneProperties = properties
    .filter((p) => p.postalCode === BB_POSTAL || p.city.toLowerCase().includes("boulogne"))
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        name: "Émilio Immobilier",
        url: PAGE_URL,
        areaServed: { "@type": "City", name: "Boulogne-Billancourt" },
        telephone: "+33184801400",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.emilio-immo.com/" },
          { "@type": "ListItem", position: 2, name: "Acheter", item: "https://www.emilio-immo.com/mandat-recherche" },
          { "@type": "ListItem", position: 3, name: "Achat appartement Boulogne-Billancourt", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
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
        title="Achat appartement Boulogne-Billancourt (92100) — Émilio Immobilier"
        description="Achat d'appartement à Boulogne-Billancourt : prix au m², meilleurs quartiers, biens disponibles et accompagnement par notre agence locale. Trouvez votre appartement à Boulogne avec Émilio Immobilier."
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
              <span className="font-body text-accent text-xs font-semibold tracking-wide uppercase">Hauts-de-Seine · 92100</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-[1.1] mb-8">
              Achat d'appartement à{" "}
              <span className="block mt-2 italic text-accent">Boulogne-Billancourt</span>
            </h1>
            <p className="font-body text-primary-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Vous cherchez à acheter un appartement à Boulogne-Billancourt ? Notre agence vous accompagne dans toutes les étapes de votre projet : analyse du marché, sélection des meilleurs biens (visibles et off-market), visites, négociation et signature.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/biens"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all"
              >
                <Search className="w-4 h-4" /> Voir les appartements à Boulogne
              </Link>
              <Link
                to="/mandat-recherche"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-full font-body font-medium text-sm hover:bg-primary-foreground/5 transition-all"
              >
                Confier ma recherche <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARCHÉ */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl text-center">
          <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">Le marché</span>
          <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3 mb-10">
            Le marché immobilier à <span className="italic text-accent">Boulogne-Billancourt</span>
          </h2>
          <div className="prose prose-lg max-w-3xl mx-auto font-body text-muted-foreground leading-relaxed space-y-6 text-left md:text-center">
            <p>
              Située aux portes de Paris dans les Hauts-de-Seine, <strong className="text-foreground">Boulogne-Billancourt</strong> est l'une des villes les plus recherchées d'Île-de-France pour l'achat d'un appartement. Avec plus de 120 000 habitants, la ville offre un cadre de vie haut de gamme, à mi-chemin entre dynamisme parisien et calme résidentiel.
            </p>
            <p>
              Le <strong className="text-foreground">prix au m² à Boulogne-Billancourt</strong> oscille en moyenne entre 9 000 € et 10 500 €, avec des pics à plus de 13 000 €/m² pour les biens haussmanniens du Centre ou les programmes neufs de l'Île Seguin. Les <strong className="text-foreground">appartements 2 et 3 pièces</strong> représentent l'essentiel de la demande, portés par les jeunes actifs et les familles.
            </p>
            <p>
              Acheter un appartement à Boulogne-Billancourt en 2026, c'est faire le choix d'une ville à fort potentiel : transports renforcés par le Grand Paris Express, écoles d'excellence, espaces verts (parc Edmond de Rothschild, bois de Boulogne) et un cadre de travail attractif (sièges sociaux, hôpital Ambroise-Paré, Renault).
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
            {[
              { icon: TrendingUp, val: "≈ 9 800 €/m²", label: "Prix moyen" },
              { icon: Building2, val: "120 000+", label: "Habitants" },
              { icon: Train, val: "4 lignes", label: "Métro & T2" },
              { icon: GraduationCap, val: "30+", label: "Écoles" },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-6 text-center">
                <s.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="font-display text-xl md:text-2xl text-foreground">{s.val}</div>
                <div className="font-body text-sm text-muted-foreground mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUARTIERS */}
      <section className="py-24 md:py-36 bg-secondary">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">Les quartiers</span>
          <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3 mb-3">
            Où acheter à <span className="italic text-accent">Boulogne-Billancourt</span> ?
          </h2>
          <p className="font-body text-muted-foreground mb-10 max-w-2xl">
            Chaque quartier de Boulogne-Billancourt a son identité. Voici notre sélection pour vous aider à cibler votre achat.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quartiers.map((q, i) => (
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
      <section className="py-24 md:py-36 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">Disponibles</span>
              <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3">
                Nos appartements à <span className="italic text-accent">Boulogne-Billancourt</span>
              </h2>
            </div>
            <Link
              to="/biens"
              className="inline-flex items-center gap-2 text-accent font-body font-semibold text-sm hover:underline"
            >
              Voir tous nos biens <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {boulogneProperties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boulogneProperties.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-10 text-center">
              <p className="font-body text-muted-foreground mb-6">
                Aucun appartement à Boulogne-Billancourt n'est actuellement publié. Nos biens off-market évoluent chaque semaine — confiez-nous votre recherche.
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
          <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">Cadre de vie</span>
          <h2 className="font-display text-2xl md:text-4xl text-primary-foreground mt-3 mb-10">
            Pourquoi vivre à <span className="italic text-accent">Boulogne-Billancourt</span> ?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-xl p-6">
              <Train className="w-6 h-6 text-accent mb-3" />
              <h3 className="font-display text-lg text-primary-foreground mb-3">Transports</h3>
              <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
                {transports.map((t) => (
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
                {[
                  "Écoles publiques et privées réputées",
                  "Parc Edmond de Rothschild & bois de Boulogne",
                  "Bassin d'emploi (Renault, sièges sociaux)",
                  "Commerces, marchés et restaurants",
                  "Proximité immédiate de Paris 16e",
                ].map((a) => (
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
          <span className="font-body text-accent font-semibold text-xs tracking-[0.3em] uppercase">Questions fréquentes</span>
          <h2 className="font-display text-2xl md:text-4xl text-foreground mt-3 mb-10">
            Acheter à Boulogne-Billancourt : <span className="italic text-accent">vos questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-card border border-border rounded-xl p-5 cursor-pointer">
                <summary className="font-display text-base md:text-lg text-foreground list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-accent text-2xl font-light shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-5">
            Prêt à acheter votre appartement à <span className="italic text-accent">Boulogne-Billancourt</span> ?
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-xl mx-auto">
            Confiez-nous votre recherche : nous activons notre réseau, vous présentons les meilleures opportunités (y compris off-market) et négocions pour vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/mandat-recherche"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-semibold text-sm"
            >
              Démarrer ma recherche <ArrowRight className="w-4 h-4" />
            </Link>
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

export default AchatBoulogneBillancourt;