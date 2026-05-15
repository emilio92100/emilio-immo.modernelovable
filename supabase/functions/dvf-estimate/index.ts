// Estimation immobilière basée sur les données DVF (Demandes de Valeurs Foncières)
// Source officielle data.gouv.fr — gratuit, pas de clé API
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface EstimateRequest {
  postal_code: string;
  property_type: "Appartement" | "Maison";
  surface: number; // m²
}

interface DvfMutation {
  valeur_fonciere?: number;
  surface_reelle_bati?: number;
  type_local?: string;
  code_postal?: string;
  date_mutation?: string;
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

    // API publique DVF (cquest.org) — proxy gratuit des données data.gouv
    const url = `https://api.cquest.org/dvf?code_postal=${postal_code}&type_local=${encodeURIComponent(
      property_type,
    )}&nature_mutation=Vente`;

    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`DVF API ${res.status}`);
    const data = await res.json();
    const mutations: DvfMutation[] = data.resultats || [];

    // On garde les ventes valides : prix > 50k, surface entre 10 et 500 m²
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 3);

    const prices = mutations
      .filter(
        (m) =>
          (m.valeur_fonciere || 0) > 50000 &&
          (m.surface_reelle_bati || 0) >= 10 &&
          (m.surface_reelle_bati || 0) <= 500 &&
          (!m.date_mutation || new Date(m.date_mutation) >= cutoff),
      )
      .map((m) => (m.valeur_fonciere || 0) / (m.surface_reelle_bati || 1))
      .filter((p) => p > 1000 && p < 30000);

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

    // Médiane + percentiles 25/75 = fourchette robuste
    prices.sort((a, b) => a - b);
    const pct = (p: number) => prices[Math.floor((prices.length - 1) * p)];
    const median = pct(0.5);
    const p25 = pct(0.25);
    const p75 = pct(0.75);

    const estimateLow = Math.round((surface * p25) / 1000) * 1000;
    const estimateHigh = Math.round((surface * p75) / 1000) * 1000;
    const estimateMid = Math.round((surface * median) / 1000) * 1000;

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
          low: estimateLow,
          mid: estimateMid,
          high: estimateHigh,
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
