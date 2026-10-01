/* Balises de référencement de chaque page (titre, description, canonique, partage, données structurées).
   Passe par react-helmet-async : rendu côté navigateur ET dans les pages pré-générées au build. */
import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://www.emilio-immo.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  image?: string;
  type?: "website" | "article";
  children?: ReactNode;
}

const ld = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");

const SEOHead = ({ title, description, canonical, jsonLd, noindex, image = DEFAULT_OG_IMAGE, type = "website", children }: SEOHeadProps) => {
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet prioritizeSeoTags>
      <html lang="fr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"} />
      <meta property="og:site_name" content="Emilio Immobilier" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {children}
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{ld(b)}</script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
