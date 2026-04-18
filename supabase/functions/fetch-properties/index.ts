import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const xmlUrl = "https://clients.immo-facile.com/office12/emilie_immob/cache/export.xml";
    const response = await fetch(xmlUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch XML: ${response.status}`);
    }

    const rawBuffer = await response.arrayBuffer();
    const decoder = new TextDecoder("iso-8859-1");
    const xmlText = decoder.decode(rawBuffer);
    const properties = parseXML(xmlText);

    return new Response(JSON.stringify({ properties, lastFetched: new Date().toISOString() }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractCDATA(text: string): string {
  // Collect ALL CDATA blocks and concatenate them
  const cdataRegex = /<!\[CDATA\[([\s\S]*?)\]\]>/g;
  const parts: string[] = [];
  let m;
  while ((m = cdataRegex.exec(text)) !== null) {
    parts.push(m[1]);
  }
  if (parts.length > 0) return parts.join("\n").trim();
  // Strip any remaining tags
  return text.replace(/<[^>]*>/g, "").trim();
}

function getTagContent(xml: string, tag: string): string {
  // Use greedy match to capture full content including nested CDATA
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*)<\\/${tag}>`, "i");
  const match = xml.match(regex);
  if (!match) {
    // Try self-closing or content without closing tag
    const regex2 = new RegExp(`<${tag}[^>]*>([^<]*)`, "i");
    const match2 = xml.match(regex2);
    return match2 ? match2[1].trim() : "";
  }
  return extractCDATA(match[1]);
}

function getSection(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = xml.match(regex);
  return match ? match[1] : "";
}

function getNum(xml: string, tag: string): number {
  const v = getTagContent(xml, tag);
  return v ? parseFloat(v.replace(",", ".")) || 0 : 0;
}

function getBool(xml: string, tag: string): boolean {
  const v = getTagContent(xml, tag).toLowerCase();
  return v === "oui" || v === "1" || v === "true" || v === "o";
}

function parseXML(xml: string) {
  const properties: any[] = [];

  // Extract each <BIEN> element (case-insensitive)
  const bienRegex = /<bien>([\s\S]*?)<\/bien>/gi;
  let match;

  while ((match = bienRegex.exec(xml)) !== null) {
    const bien = match[1];

    // Sections
    const infoGen = getSection(bien, "info_generales");
    const localisation = getSection(bien, "localisation");
    const vente = getSection(bien, "vente");
    const intitule = getSection(bien, "intitule");
    const commentaires = getSection(bien, "commentaires");
    const alur = getSection(bien, "alur");

    // Property type section: <maison>, <appartement>, <immeuble>, <terrain>, <local>, <parking>, <bureaux>
    const maisonSection = getSection(bien, "maison");
    const appartSection = getSection(bien, "appartement");
    const immeubleSection = getSection(bien, "immeuble");
    const terrainSection = getSection(bien, "terrain");
    const localSection = getSection(bien, "local") || getSection(bien, "local_commercial");
    const parkingSection = getSection(bien, "parking") || getSection(bien, "garage");
    const bureauxSection = getSection(bien, "bureaux") || getSection(bien, "bureau");

    let propSection = "";
    let propertyType = "Appartement";
    if (maisonSection) { propSection = maisonSection; propertyType = "Maison"; }
    else if (immeubleSection) { propSection = immeubleSection; propertyType = "Immeuble"; }
    else if (terrainSection) { propSection = terrainSection; propertyType = "Terrain"; }
    else if (localSection) { propSection = localSection; propertyType = "Local commercial"; }
    else if (bureauxSection) { propSection = bureauxSection; propertyType = "Bureaux"; }
    else if (parkingSection) { propSection = parkingSection; propertyType = "Parking"; }
    else if (appartSection) { propSection = appartSection; propertyType = "Appartement"; }
    else {
      // Fallback: try reading type from info_generales
      const typeBien = getTagContent(infoGen, "type_bien").toLowerCase();
      if (typeBien.includes("immeuble")) propertyType = "Immeuble";
      else if (typeBien.includes("maison")) propertyType = "Maison";
      else if (typeBien.includes("terrain")) propertyType = "Terrain";
      else if (typeBien.includes("local")) propertyType = "Local commercial";
      else if (typeBien.includes("bureau")) propertyType = "Bureaux";
      else if (typeBien.includes("parking") || typeBien.includes("garage")) propertyType = "Parking";
    }

    // Surface fallback: try reading from multiple possible locations
    const surfaceFallback = getNum(propSection, "surface_habitable")
      || getNum(propSection, "surface")
      || getNum(propSection, "surface_totale")
      || getNum(bien, "surface_habitable")
      || getNum(bien, "surface")
      || getNum(infoGen, "surface");

    // ID & dates
    const id = getTagContent(infoGen, "aff_id") || getTagContent(infoGen, "aff_num") || Math.random().toString(36).substr(2);
    const dateAdded = getTagContent(infoGen, "date_creation") || new Date().toISOString().split("T")[0];

    // Price
    const price = getNum(vente, "prix") || getNum(vente, "prix_net");

    // Location
    const city = getTagContent(localisation, "ville") || "";
    const postalCode = getTagContent(localisation, "code_postal") || "";
    const address = getTagContent(localisation, "adresse") || "";
    const latitude = getNum(localisation, "latitude");
    const longitude = getNum(localisation, "longitude");

    // Title & description
    const title = getTagContent(intitule, "fr") || "";
    const description = getTagContent(commentaires, "fr") || "";

    // Property details from maison/appartement section
    const surface = surfaceFallback;
    const rooms = getNum(propSection, "nbre_pieces");
    const bedrooms = getNum(propSection, "nbre_chambres");
    const floor = getNum(propSection, "num_etage");
    const totalFloors = getNum(propSection, "num_dernier_etage") || getNum(propSection, "nbre_etage");
    const yearBuilt = getNum(propSection, "annee_construction");
    const heating = getTagContent(propSection, "chauffage") || "";
    const parking = getNum(propSection, "nbre_parking");
    const orientation = getTagContent(propSection, "exposition_sejour") || "";
    const energyClass = getTagContent(propSection, "consommationenergetique") || "";
    const gesClass = getTagContent(propSection, "gazeffetdeserre") || "";
    const consoEnergie = getNum(propSection, "conso_annuel_energie");
    const valeurGes = getNum(propSection, "valeur_ges");

    // Booleans
    const cave = getBool(propSection, "cave") || getNum(propSection, "nbre_cave") > 0;
    const balcony = getBool(propSection, "balcon") || getNum(propSection, "nbre_balcon") > 0;
    const terrace = getBool(propSection, "terrasse") || getNum(propSection, "nbre_terrasse") > 0;
    const elevator = getBool(propSection, "ascenseur");
    const guardian = getBool(propSection, "gardien");
    const garden = getBool(propSection, "jardin");
    const exclusive = getTagContent(vente, "type_mandat").toUpperCase() === "E";

    // Charges
    const charges = getNum(alur, "charges_annuelles") || getNum(propSection, "charges_copropriete");
    const taxeFonciere = getNum(propSection, "taxe_fonciere");

    // Room details (pièces)
    const piecesSection = getSection(bien, "pieces");
    const roomDetails: any[] = [];
    const pieceRegex = /<piece>([\s\S]*?)<\/piece>/gi;
    let pieceMatch;
    while ((pieceMatch = pieceRegex.exec(piecesSection)) !== null) {
      const p = pieceMatch[1];
      const typePiece = getTagContent(p, "type_piece");
      const surfacePiece = getNum(p, "surface_piece");
      const descPiece = getTagContent(p, "description_piece");
      const niveauRaw = getTagContent(p, "niveau_piece");
      const niveauPiece = niveauRaw ? parseInt(niveauRaw, 10) : null;
      if (typePiece) {
        roomDetails.push({
          type: typePiece,
          surface: surfacePiece,
          description: descPiece,
          level: isNaN(niveauPiece as any) ? null : niveauPiece,
        });
      }
    }

    // Images: <img>URL format (may not have closing tags)
    const imagesSection = getSection(bien, "images");
    const images: string[] = [];
    // Match URLs after <img> tags
    const imgRegex = /<img[^>]*>(https?:\/\/[^\s<]+)/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(imagesSection)) !== null) {
      images.push(imgMatch[1].trim());
    }

    // Format city name nicely (BOULOGNE BILLANCOURT -> Boulogne-Billancourt)
    const formatCity = (c: string): string => {
      if (!c) return "";
      return c.split(/\s+/).map(w =>
        w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      ).join("-").replace(/-De-/g, "-de-").replace(/-Les-/g, "-les-").replace(/-La-/g, "-la-").replace(/-Le-/g, "-le-").replace(/-Sur-/g, "-sur-");
    };

    if (price > 0) {
      properties.push({
        id,
        title: title || `${propertyType} ${rooms} pièces - ${formatCity(city)}`,
        price,
        city: formatCity(city),
        postalCode,
        surface,
        rooms,
        bedrooms,
        type: propertyType,
        description,
        images,
        dateAdded,
        exclusive,
        energyClass,
        gesClass,
        orientation,
        floor,
        totalFloors,
        yearBuilt,
        heating,
        parking,
        cave,
        balcony,
        terrace,
        elevator,
        guardian,
        charges,
        taxeFonciere,
        consoEnergie,
        valeurGes,
        address,
        latitude,
        longitude,
        garden,
        roomDetails,
      });
    }
  }

  return properties;
}
