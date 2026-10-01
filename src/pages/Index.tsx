/* Accueil (refonte 2026) */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { SITE_URL } from "@/components/SEOHead";
import OrbitHero from "@/components/home/OrbitHero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Sectors from "@/components/home/Sectors";
import { AboutAlexandre, Confidential, Reviews, Services } from "@/components/home/HomeSections";

const Index = () => (
  <div className="min-h-screen bg-white">
    <SEOHead
      title="Agence immobilière Paris Ouest et Hauts-de-Seine | Emilio Immobilier"
      description="Emilio Immobilier, agence indépendante depuis 2020 : vente, achat et estimation gratuite à Paris 6e, 7e, 15e, 16e, 17e, Boulogne, Neuilly, Issy, Levallois et dans les Hauts-de-Seine."
      canonical={`${SITE_URL}/`}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "@id": `${SITE_URL}/#agence`,
          name: "Emilio Immobilier",
          alternateName: "Emilio conseil immobilier",
          url: `${SITE_URL}/`,
          logo: `${SITE_URL}/logo-emilio.png`,
          image: `${SITE_URL}/og-image.jpg`,
          telephone: "+33184801400",
          email: "agence@emilio-immo.com",
          description: "Agence immobilière indépendante à Paris Ouest et dans les Hauts-de-Seine : vente, achat avec un chasseur, estimation gratuite.",
          foundingDate: "2020-09",
          founder: { "@type": "Person", name: "Alexandre Rogelet" },
          numberOfEmployees: { "@type": "QuantitativeValue", value: 6 },
          areaServed: ["Paris 6e", "Paris 7e", "Paris 15e", "Paris 16e", "Paris 17e", "Boulogne-Billancourt", "Issy-les-Moulineaux", "Neuilly-sur-Seine", "Levallois-Perret", "Saint-Cloud", "Garches", "Clamart", "Hauts-de-Seine"].map((name) => ({ "@type": "Place", name })),
          priceRange: "€€€",
          address: { "@type": "PostalAddress", streetAddress: "10 avenue Kléber", postalCode: "75016", addressLocality: "Paris", addressRegion: "Île-de-France", addressCountry: "FR" },
          contactPoint: { "@type": "ContactPoint", telephone: "+33184801400", contactType: "customer service", availableLanguage: ["French"] },
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#site`,
          name: "Emilio Immobilier",
          url: `${SITE_URL}/`,
          inLanguage: "fr-FR",
          publisher: { "@id": `${SITE_URL}/#agence` },
        },
      ]}
    />
    <Navbar />
    <main>
      <OrbitHero />
      <FeaturedProperties />
      <Sectors />
      <Confidential />
      <Services />
      <AboutAlexandre />
      <Reviews />
    </main>
    <Footer />
  </div>
);

export default Index;
