// Le plan des biens à vendre, pour Google : servi sur www.emilio-immo.com/sitemap-biens.xml
// (réécriture dans vercel.json). Un bien qui arrive dans le flux immo-facile y entre tout
// seul ; un bien vendu ou retiré en sort tout seul.
// Les autres pages du site sont dans public/sitemap-pages.xml ; public/sitemap.xml réunit
// les deux (un « index » de plans, que Google lit comme un seul plan).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://www.emilio-immo.com";

/* La date de mise en ligne du bien, si le flux en donne une lisible (sinon rien : une
   date inventée serait pire que pas de date). */
function jour(v: unknown): string | null {
  const d = new Date(String(v ?? ""));
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  let biens: { id: string; dateAdded?: string }[] = [];
  try {
    // La même source que le site : la fonction fetch-properties de ce projet.
    const projectRef = new URL(req.url).hostname.split(".")[0];
    const r = await fetch(`https://${projectRef}.supabase.co/functions/v1/fetch-properties`);
    if (r.ok) biens = ((await r.json()).properties || []).filter((p: { id?: string }) => p && p.id);
  } catch (e) {
    console.error("Biens illisibles pour le plan :", e);
  }

  const urls = biens.map((p) => {
    const d = jour(p.dateAdded);
    return `  <url>
    <loc>${SITE}/biens/${encodeURIComponent(String(p.id))}</loc>${d ? `
    <lastmod>${d}</lastmod>` : ""}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
