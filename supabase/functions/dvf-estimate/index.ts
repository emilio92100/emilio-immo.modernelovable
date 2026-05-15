// Estimation immobilière basée sur les données DVF (Demandes de Valeurs Foncières)
// Source : data.gouv.fr — gratuit, pas de clé API
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface EstimateRequest {
  postal_code: string;
  property_type: "Appartement" | "Maison";
  surface: number;
}

interface DvfRecord {
  valeur_fonciere?: number;
  surface_reelle_bati?: number;
  type_local?: string;
  code_postal?: string;
  date_mutation?: string;
}

// Fetches up to N records from a few public DVF endpoints — first one that returns wins.
async function fetchDvf(postal: string, type: string): Promise<DvfRecord[]> {
  // Source 1 : OpenDataSoft public dataset (dataset id "dvf")
  const ods = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/dvf/records?where=code_postal%3D%22${postal}%22%20AND%20type_local%3D%22${encodeURIComponent(
    type,
  )}%22%20AND%20nature_mutation%3D%22Vente%22&limit=100&order_by=date_mutation%20DESC`;
  try {
    const r = await fetch(ods, { headers: { Accept: "application/json" } });
    if (r.ok) {
      const j = await r.json();
      const rows: DvfRecord[] = (j.results || []).map((x: any) => ({
        valeur_fonciere: Number(x.valeur_fonciere),
        surface_reelle_bati: Number(x.surface_reelle_bati),
        type_local: x.type_local,
        code_postal: x.code_postal,
        date_mutation: x.date_mutation,
      }));
      if (rows.length > 0) return rows;
    }
  } catch (_e) { /* ignore */ }

  // Source 2 : cquest.org (fallback)
  try {
    const url = `https://api.cquest.org/dvf?code_postal=${postal}&type_local=${encodeURIComponent(
      type,
    )}&nature_mutation=Vente`;
    const r = await fetch(url, { headers: { Accept: "application/json" } });
    if (r.ok) {
      const j = await r.json();
      return (j.resultats || []) as DvfRecord[];
    }
  } catch (_e) { /* ignore */ }

  return [];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as EstimateRequest;
    const { postal_code, property_type, surface } = body;

    if (!postal_code || !property_type || !surface) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rows = await fetchDvf(postal_code, property_type);

    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 4);

    const prices = rows
      .filter(
        (m) =>
          (m.valeur_fonciere || 0) > 50000 &&
          (m.surface_reelle_bati || 0) >= 10 &&
          (m.surface_reelle_bati || 0) <= 500 &&
          (!m.date_mutation || new Date(m.date_mutation) >= cutoff),
      )
      .map((m) => (m.valeur_fonciere || 0) / (m.surface_reelle_bati || 1))
      .filter((p) => p > 1000 && p < 35000);

    if (prices.length < 3) {
      return new Response(
        JSON.stringify({
          error: "not_enough_data",
          message: "Pas assez de ventes récentes pour estimer ce code postal",
          sample_size: prices.length,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    prices.sort((a, b) => a - b);
    const pct = (p: number) => prices[Math.floor((prices.length - 1) * p)];
    const median = pct(0.5);
    const p25 = pct(0.25);
    const p75 = pct(0.75);

    return new Response(
      JSON.stringify({
        ok: true,
        sample_size: prices.length,
        price_per_sqm: {
          low: Math.round(p25),
          mid: Math.round(median),
          high: Math.round(p75),
        },
        estimate: {
          low: Math.round((surface * p25) / 1000) * 1000,
          mid: Math.round((surface * median) / 1000) * 1000,
          high: Math.round((surface * p75) / 1000) * 1000,
        },
        source: "DVF — Demandes de Valeurs Foncières (data.gouv.fr)",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "internal", message: String((e as Error).message || e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
