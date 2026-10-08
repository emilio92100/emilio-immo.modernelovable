/* Le titre, la description, la photo et les données Google d'un bien, au même endroit pour deux usages :
   - la fiche du bien (PropertyDetail), qui les pose dans la page une fois ouverte dans le navigateur ;
   - la fonction api/page-bien.ts, qui les met dans la page AVANT de l'envoyer (Alexandre, 8 oct. :
     l'aperçu d'un lien envoyé par WhatsApp, SMS ou Facebook montrait le logo de l'agence au lieu du bien,
     et Google lisait d'abord une page sans titre propre).
   Ce fichier n'importe rien : la fonction Vercel l'embarque tel quel. */

export const SITE_URL = "https://www.emilio-immo.com";

/** Ce dont le référencement a besoin d'un bien (un `Property` de properties.ts convient). */
export interface BienSeo {
  id: string;
  type: string;
  rooms: number;
  bedrooms: number;
  surface: number;
  price: number;
  city: string;
  postalCode: string;
  description?: string;
  images: string[];
  dateAdded?: string;
  yearBuilt?: number;
}

/** Prix au format français : 1 250 000 €. */
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);

/** Surface au format français : 87,85 m². */
export const formatSurface = (n: number): string => `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(n)} m²`;

/** « Appartement 3 pièces ». */
export const displayTitle = (p: Pick<BienSeo, "type" | "rooms">) => {
  const type = p.type || "Bien";
  return p.rooms > 0 ? `${type} ${p.rooms} pièce${p.rooms > 1 ? "s" : ""}` : type;
};

/** « Paris 16e » pour un code postal parisien, sinon la ville telle quelle. */
export const displayCity = (p: Pick<BienSeo, "city" | "postalCode">) => {
  if (p.city.toLowerCase().startsWith("paris") && p.postalCode.startsWith("75")) {
    const n = parseInt(p.postalCode.slice(3), 10);
    if (n > 0) return `Paris ${n}${n === 1 ? "er" : "e"}`;
  }
  return p.city;
};

/** La photo des aperçus de liens : une version allégée (1080 px de large, moins de 250 Ko) quand la photo
    est rangée chez Supabase, qui sait la redimensionner. WhatsApp laisse de côté les images trop lourdes, et
    les photos des biens font souvent 300 à 600 Ko. Les autres adresses restent telles quelles. */
export const apercuPhoto = (u?: string) =>
  u && u.includes("/storage/v1/object/public/")
    ? `${u.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/")}?width=1080&quality=60`
    : u;

/** Tout ce que la page d'un bien dit à Google et aux aperçus de liens. */
export function seoBien(p: BienSeo) {
  const titre = displayTitle(p);
  const ville = displayCity(p);
  const url = `${SITE_URL}/biens/${p.id}`;
  const surf = p.surface ? formatSurface(p.surface) : "";
  const title = `${titre}${surf ? ` ${surf}` : ""} à vendre, ${ville} | Emilio Immobilier`;
  const description = `${titre} à vendre à ${ville}${surf ? `, ${surf}` : ""}${p.bedrooms ? `, ${p.bedrooms} chambre${p.bedrooms > 1 ? "s" : ""}` : ""} : ${formatPrice(p.price)}. Photos, plan, DPE et visite avec Emilio Immobilier.`.slice(0, 160);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: `${titre}, ${ville}`,
      url,
      description: p.description?.slice(0, 500),
      image: p.images?.slice(0, 6),
      datePosted: p.dateAdded,
      offers: { "@type": "Offer", price: p.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      about: {
        "@type": /maison/i.test(p.type) ? "House" : "Apartment",
        numberOfRooms: p.rooms || undefined,
        numberOfBedrooms: p.bedrooms || undefined,
        floorSize: p.surface ? { "@type": "QuantitativeValue", value: p.surface, unitCode: "MTK" } : undefined,
        yearBuilt: p.yearBuilt || undefined,
        address: { "@type": "PostalAddress", addressLocality: ville, postalCode: p.postalCode, addressCountry: "FR" },
      },
      provider: { "@type": "RealEstateAgent", name: "Emilio Immobilier", url: SITE_URL, telephone: "+33184801400" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Nos biens", item: `${SITE_URL}/biens` },
        { "@type": "ListItem", position: 3, name: `${titre}, ${ville}`, item: url },
      ],
    },
  ];
  return { titre, ville, url, surf, title, description, image: apercuPhoto(p.images?.[0]), jsonLd };
}
