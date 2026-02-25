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
  gesClass?: string;
  orientation?: string;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  heating?: string;
  parking?: number;
  cave?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  elevator?: boolean;
  guardian?: boolean;
  charges?: number;
  taxeFonciere?: number;
  consoEnergie?: number;
  valeurGes?: number;
  address?: string;
  latitude?: number;
  longitude?: number;
}

// Fallback mock data used when edge function is unavailable
export const mockProperties: Property[] = [
  {
    id: "60059431",
    title: "Appartement 3 pièces - Issy-les-Moulineaux",
    price: 590000,
    city: "Issy-les-Moulineaux",
    postalCode: "92130",
    surface: 60,
    rooms: 3,
    bedrooms: 2,
    type: "Appartement",
    description: "Emplacement idéal, à 5 min de la Mairie d'Issy, dans une rue calme, très bel appartement en étage avec ascenseur. Il se compose d'une entrée avec rangement, d'un séjour lumineux avec balcon, cuisine semi-ouverte aménagée et équipée, la partie nuit se compose en deux chambres avec salle d'eau et wc séparé. Aucun travaux à prévoir. Au sous sol une cave et un parking. Visite Virtuelle possible.",
    images: ["https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/6/0/0/5/9/4/3/1/60059431a.jpg?DATEMAJ=21/02/2026-17:43:46"],
    dateAdded: "2026-02-21",
    exclusive: true,
    orientation: "Sud",
    floor: 4,
    totalFloors: 6,
    elevator: true,
    guardian: true,
    parking: 1,
    cave: true,
    balcony: true,
    charges: 2400,
    latitude: 48.823705,
    longitude: 2.269302,
  },
  {
    id: "60056805",
    title: "Appartement 3 pièces - Boulogne-Billancourt",
    price: 585000,
    city: "Boulogne-Billancourt",
    postalCode: "92100",
    surface: 69,
    rooms: 3,
    bedrooms: 2,
    type: "Appartement",
    description: "RUE DE SILLY / METRO LIGNE 10 / Dans une copropriété bien entretenue, nous vous proposons en étage ce bel appartement rénové.",
    images: [
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/6/0/0/5/6/8/0/5/60056805a.jpg?DATEMAJ=20/02/2026-16:59:26",
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/6/0/0/5/6/8/0/5/60056805b.jpg?DATEMAJ=20/02/2026-16:59:26",
    ],
    dateAdded: "2026-02-20",
    exclusive: true,
    floor: 4,
    totalFloors: 6,
    elevator: true,
    guardian: true,
    cave: true,
    yearBuilt: 1960,
    charges: 2520,
    latitude: 48.839944,
    longitude: 2.231568,
    address: "22 Rue de Silly",
  },
  {
    id: "60029191",
    title: "Appartement 3 pièces - Montrouge",
    price: 440000,
    city: "Montrouge",
    postalCode: "92120",
    surface: 54,
    rooms: 3,
    bedrooms: 2,
    type: "Appartement",
    description: "A PROXIMITÉ du métro Mairie de Montrouge, dans une rue calme.",
    images: ["https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/6/0/0/2/9/1/9/1/60029191a.jpg?DATEMAJ=16/02/2026-17:09:33"],
    dateAdded: "2026-02-16",
    exclusive: true,
    floor: 2,
    totalFloors: 5,
    elevator: true,
    cave: true,
    charges: 1560,
    latitude: 48.817083,
    longitude: 2.319765,
    address: "64 Rue Louis Rolland",
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
    description: "Dans un bel immeuble bien entretenu, idéalement situé à proximité immédiate de Montparnasse.",
    images: ["https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/9/9/2/4/3/9/1/59924391a.jpg?DATEMAJ=01/02/2026-17:50:53"],
    dateAdded: "2026-02-01",
    exclusive: true,
    orientation: "Sud",
    floor: 4,
    totalFloors: 6,
    elevator: true,
    cave: true,
    latitude: 48.845219,
    longitude: 2.324165,
    address: "13 Rue Littré",
  },
  {
    id: "58747369",
    title: "Appartement 4 pièces - Boulogne-Billancourt",
    price: 745000,
    city: "Boulogne-Billancourt",
    postalCode: "92100",
    surface: 71.16,
    rooms: 4,
    bedrooms: 2,
    type: "Appartement",
    description: "Limite Paris 16 - 4 pièces - Vue dégagée - Étage élevé.",
    images: [
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/8/7/4/7/3/6/9/58747369a.jpg?DATEMAJ=19/06/2025-22:53:15",
    ],
    dateAdded: "2025-06-19",
    exclusive: false,
    orientation: "Nord-Ouest",
    floor: 7,
    totalFloors: 10,
    elevator: true,
    guardian: true,
    balcony: true,
    cave: true,
    yearBuilt: 1968,
    heating: "Collectif gaz",
    charges: 4800,
    latitude: 48.836404,
    longitude: 2.253783,
    address: "19 Avenue Ferdinand Buisson",
  },
  {
    id: "58186914",
    title: "Maison 5 pièces - Boulogne-Billancourt",
    price: 1585000,
    city: "Boulogne-Billancourt",
    postalCode: "92100",
    surface: 163,
    rooms: 5,
    bedrooms: 3,
    type: "Maison",
    description: "BOULOGNE SUD - QUARTIER PIERRE GRENIER / Maison récente avec deux jardins.",
    images: [
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/8/1/8/6/9/1/4/58186914a.jpg?DATEMAJ=06/12/2025-15:25:47",
    ],
    dateAdded: "2025-03-27",
    exclusive: false,
    energyClass: "C",
    gesClass: "A",
    orientation: "Sud-Est",
    totalFloors: 1,
    parking: 2,
    yearBuilt: 2017,
    heating: "Collectif",
    consoEnergie: 158,
    valeurGes: 5,
    charges: 4800,
    latitude: 48.832452,
    longitude: 2.253172,
    address: "67 Avenue Pierre Grenier",
  },
  {
    id: "50173826",
    title: "Appartement 2 pièces - Boulogne-Billancourt",
    price: 379000,
    city: "Boulogne-Billancourt",
    postalCode: "92100",
    surface: 41.02,
    rooms: 2,
    bedrooms: 1,
    type: "Appartement",
    description: "5 MIN A PIED METRO - RIVES DE SEINE - Dans une jolie copropriété verdoyante.",
    images: [
      "https://media.immo-facile.com/office12/emilie_immob/catalog/images/pr_p/5/0/1/7/3/8/2/6/50173826a.jpg?DATEMAJ=16/02/2026-15:42:52",
    ],
    dateAdded: "2022-06-27",
    exclusive: true,
    energyClass: "C",
    gesClass: "B",
    orientation: "Sud-Est",
    floor: 2,
    totalFloors: 7,
    elevator: true,
    parking: 1,
    cave: true,
    yearBuilt: 2009,
    heating: "Collectif gaz de ville",
    consoEnergie: 117,
    valeurGes: 10,
    charges: 1740,
    taxeFonciere: 660,
    latitude: 48.827991,
    longitude: 2.236281,
    address: "78 Rue Marcel Bontemps",
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
};

export async function fetchPropertiesFromFeed(): Promise<Property[]> {
  try {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    if (!projectId) {
      console.warn("No project ID found, using mock data");
      return mockProperties;
    }
    
    const res = await fetch(`https://${projectId}.supabase.co/functions/v1/fetch-properties`, {
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    if (data.properties && data.properties.length > 0) {
      return data.properties;
    }
    return mockProperties;
  } catch (err) {
    console.warn("Failed to fetch live feed, using mock data:", err);
    return mockProperties;
  }
}
