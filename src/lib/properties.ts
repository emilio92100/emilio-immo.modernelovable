export interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  postalCode: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  type: string;
  description: string;
  images: string[];
  dateAdded: string;
  exclusive: boolean;
  energyClass?: string;
  orientation?: string;
}

export const mockProperties: Property[] = [
  {
    id: "60059431",
    title: "Appartement 3 pièces - Nanterre",
    price: 590000,
    city: "Nanterre",
    postalCode: "92130",
    surface: 65,
    rooms: 3,
    bedrooms: 2,
    type: "Appartement",
    description: "Magnifique appartement lumineux avec vue dégagée, entièrement rénové avec des matériaux de qualité.",
    images: ["https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/6/0/0/5/9/4/3/1/60059431a.jpg?DATEMAJ=21/02/2026-17:43:46"],
    dateAdded: "2026-02-21",
    exclusive: true,
    energyClass: "C",
    orientation: "Sud",
  },
  {
    id: "60056805",
    title: "Appartement 4 pièces - Nanterre",
    price: 585000,
    city: "Nanterre",
    postalCode: "92100",
    surface: 69,
    rooms: 4,
    bedrooms: 2,
    type: "Appartement",
    description: "Bel appartement familial avec balcon, proche de toutes commodités.",
    images: [
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/6/0/0/5/6/8/0/5/60056805a.jpg?DATEMAJ=20/02/2026-16:59:26",
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/6/0/0/5/6/8/0/5/60056805b.jpg?DATEMAJ=20/02/2026-16:59:26",
    ],
    dateAdded: "2026-02-20",
    exclusive: true,
    energyClass: "D",
  },
  {
    id: "60029191",
    title: "Appartement 2 pièces - Antony",
    price: 440000,
    city: "Antony",
    postalCode: "92120",
    surface: 54,
    rooms: 2,
    bedrooms: 1,
    type: "Appartement",
    description: "Charmant appartement avec parquet ancien et moulures, au calme.",
    images: ["https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/6/0/0/2/9/1/9/1/60029191a.jpg?DATEMAJ=16/02/2026-17:09:33"],
    dateAdded: "2026-02-16",
    exclusive: true,
  },
  {
    id: "59924391",
    title: "Appartement 4 pièces - Paris 6ème",
    price: 1495000,
    city: "Paris 6ème",
    postalCode: "75006",
    surface: 90,
    rooms: 4,
    bedrooms: 3,
    type: "Appartement",
    description: "Superbe appartement au cœur de Saint-Germain-des-Prés, prestations haut de gamme.",
    images: ["https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/9/9/2/4/3/9/1/59924391a.jpg?DATEMAJ=01/02/2026-17:50:53"],
    dateAdded: "2026-02-01",
    exclusive: true,
    energyClass: "C",
    orientation: "Sud",
  },
  {
    id: "59702167",
    title: "Hôtel Particulier - Paris 2ème",
    price: 4200000,
    city: "Paris 2ème",
    postalCode: "75002",
    surface: 432,
    rooms: 8,
    bedrooms: 5,
    type: "Hôtel Particulier",
    description: "Exceptionnel hôtel particulier avec jardin privatif au cœur de Paris.",
    images: ["https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/9/7/0/2/1/6/7/59702167a.jpg?DATEMAJ=17/12/2025-15:10:06"],
    dateAdded: "2025-12-17",
    exclusive: true,
  },
  {
    id: "58747369",
    title: "Maison 4 pièces - Paris 15ème",
    price: 745000,
    city: "Paris 15ème",
    postalCode: "75015",
    surface: 71,
    rooms: 4,
    bedrooms: 2,
    type: "Maison",
    description: "Ravissante maison de ville avec terrasse et jardin, quartier résidentiel.",
    images: [
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/8/7/4/7/3/6/9/58747369a.jpg?DATEMAJ=19/06/2025-22:53:15",
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/8/7/4/7/3/6/9/58747369b.jpg?DATEMAJ=19/06/2025-22:53:15",
    ],
    dateAdded: "2025-06-19",
    exclusive: false,
  },
  {
    id: "58686240",
    title: "Maison 4 pièces - Paris 15ème",
    price: 1495000,
    city: "Paris 15ème",
    postalCode: "75015",
    surface: 100,
    rooms: 4,
    bedrooms: 3,
    type: "Maison",
    description: "Magnifique maison familiale, entièrement rénovée, avec jardin.",
    images: [
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/8/6/8/6/2/4/0/58686240a.jpg?DATEMAJ=14/06/2025-15:32:56",
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/8/6/8/6/2/4/0/58686240b.jpg?DATEMAJ=14/06/2025-15:32:58",
    ],
    dateAdded: "2025-06-13",
    exclusive: false,
    energyClass: "E",
    orientation: "Est",
  },
  {
    id: "58361847",
    title: "Studio - Paris 6ème",
    price: 79000,
    city: "Paris 6ème",
    postalCode: "75006",
    surface: 9.6,
    rooms: 1,
    bedrooms: 0,
    type: "Appartement",
    description: "Studio idéal investissement locatif, quartier recherché.",
    images: [
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/8/3/6/1/8/4/7/58361847a.jpg?DATEMAJ=05/05/2025-21:59:29",
    ],
    dateAdded: "2025-05-03",
    exclusive: false,
    energyClass: "D",
    orientation: "Sud",
  },
  {
    id: "56527064",
    title: "Appartement 3 pièces - Nanterre",
    price: 669000,
    city: "Nanterre",
    postalCode: "92100",
    surface: 66.95,
    rooms: 3,
    bedrooms: 2,
    type: "Appartement",
    description: "Appartement en très bon état avec vue dégagée et luminosité exceptionnelle.",
    images: [
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/6/5/2/7/0/6/4/56527064a.jpg?DATEMAJ=18/04/2025-01:24:26",
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/6/5/2/7/0/6/4/56527064b.jpg?DATEMAJ=18/04/2025-01:24:27",
    ],
    dateAdded: "2024-09-27",
    exclusive: false,
    energyClass: "D",
    orientation: "Sud - Est",
  },
  {
    id: "58186914",
    title: "Appartement 5 pièces - Nanterre",
    price: 1585000,
    city: "Nanterre",
    postalCode: "92100",
    surface: 163,
    rooms: 5,
    bedrooms: 4,
    type: "Appartement",
    description: "Exceptionnel appartement familial avec terrasse panoramique, finitions haut de gamme.",
    images: [
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/8/1/8/6/9/1/4/58186914a.jpg?DATEMAJ=06/12/2025-15:25:47",
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/8/1/8/6/9/1/4/58186914b.jpg?DATEMAJ=06/12/2025-15:25:47",
    ],
    dateAdded: "2025-03-27",
    exclusive: false,
    energyClass: "A",
    orientation: "Sud - Est",
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
};
