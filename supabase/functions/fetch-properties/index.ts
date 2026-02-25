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

    const xmlText = await response.text();
    
    // Parse XML to extract properties
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

function parseXML(xml: string) {
  const properties: any[] = [];
  
  // Extract each <BIEN> element
  const bienRegex = /<BIEN>([\s\S]*?)<\/BIEN>/g;
  let match;
  
  while ((match = bienRegex.exec(xml)) !== null) {
    const bien = match[1];
    
    const getValue = (tag: string): string => {
      const r = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}>([^<]*)<\\/${tag}>`);
      const m = bien.match(r);
      return m ? (m[1] || m[2] || "").trim() : "";
    };
    
    const getNum = (tag: string): number => {
      const v = getValue(tag);
      return v ? parseFloat(v.replace(",", ".")) : 0;
    };

    const getBool = (tag: string): boolean => {
      const v = getValue(tag).toLowerCase();
      return v === "oui" || v === "1" || v === "true" || v === "o";
    };

    // Extract images
    const images: string[] = [];
    const imgRegex = /<PHOTO[^>]*>(?:<!\[CDATA\[)?(https?:\/\/[^\]<]+)(?:\]\]>)?<\/PHOTO[^>]*>/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(bien)) !== null) {
      images.push(imgMatch[1].trim());
    }
    
    // Also try IMAGE tags
    const imgRegex2 = /<IMAGE[^>]*>(?:<!\[CDATA\[)?(https?:\/\/[^\]<]+)(?:\]\]>)?<\/IMAGE[^>]*>/gi;
    while ((imgMatch = imgRegex2.exec(bien)) !== null) {
      images.push(imgMatch[1].trim());
    }

    const id = getValue("INFO_GENERALES>AFF_NUM") || getValue("AFF_NUM") || getValue("ID") || getValue("REFERENCE") || Math.random().toString(36).substr(2);
    const title = getValue("TITRE") || getValue("INTITULE") || "";
    const price = getNum("PRIX") || getNum("PRIX_VENTE");
    const city = getValue("VILLE") || getValue("COMMUNE") || "";
    const postalCode = getValue("CODE_POSTAL") || getValue("CP") || "";
    const surface = getNum("SURFACE_HABITABLE") || getNum("SURFACE") || getNum("SURF_HAB");
    const rooms = getNum("NB_PIECES") || getNum("PIECES") || getNum("NB_PIECE");
    const bedrooms = getNum("NB_CHAMBRES") || getNum("CHAMBRES") || getNum("NB_CHAMBRE");
    const type = getValue("TYPE_BIEN") || getValue("NATURE") || getValue("CATEGORIE") || "Appartement";
    const description = getValue("DESCRIPTIF") || getValue("TEXTE") || getValue("COMMENTAIRES") || "";
    const energyClass = getValue("CLASSE_ENERGIE") || getValue("DPE_ETIQUETTE") || "";
    const gesClass = getValue("CLASSE_GES") || getValue("GES_ETIQUETTE") || "";
    const floor = getNum("ETAGE") || getNum("NUM_ETAGE");
    const totalFloors = getNum("NB_ETAGES") || getNum("NBRE_ETAGES");
    const orientation = getValue("ORIENTATION") || "";
    const yearBuilt = getNum("ANNEE_CONSTRUCTION") || 0;
    const heating = getValue("CHAUFFAGE") || getValue("TYPE_CHAUFFAGE") || "";
    const parking = getNum("NB_PARKING") || getNum("PARKING");
    const cave = getBool("CAVE");
    const balcony = getBool("BALCON");
    const terrace = getBool("TERRASSE");
    const elevator = getBool("ASCENSEUR");
    const guardian = getBool("GARDIEN");
    const charges = getNum("CHARGES") || getNum("CHARGES_MENSUELLES");
    const taxeFonciere = getNum("TAXE_FONCIERE");
    const consoEnergie = getNum("CONSO_ENERGIE") || getNum("DPE_VALEUR");
    const valeurGes = getNum("VALEUR_GES") || getNum("GES_VALEUR");
    const exclusive = getBool("EXCLUSIVITE") || getBool("MANDAT_EXCLUSIF");
    const dateAdded = getValue("DATE_CREATION") || getValue("DATE_MANDAT") || new Date().toISOString().split("T")[0];
    const address = getValue("ADRESSE") || "";
    const latitude = getNum("LATITUDE");
    const longitude = getNum("LONGITUDE");

    if (price > 0) {
      properties.push({
        id, title: title || `${type} ${rooms} pièces - ${city}`, price, city, postalCode,
        surface, rooms, bedrooms, type, description, images,
        dateAdded, exclusive, energyClass, gesClass, orientation,
        floor, totalFloors, yearBuilt, heating, parking,
        cave, balcony, terrace, elevator, guardian, charges,
        taxeFonciere, consoEnergie, valeurGes, address, latitude, longitude,
      });
    }
  }
  
  return properties;
}
