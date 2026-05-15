// Dynamic XML sitemap generator — includes all property pages
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://www.emilio-immo.com";

const STATIC_URLS = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/biens", changefreq: "daily", priority: "0.9" },
  { loc: "/vendre", changefreq: "monthly", priority: "0.8" },
  { loc: "/mandat-recherche", changefreq: "monthly", priority: "0.8" },
  { loc: "/notre-histoire", changefreq: "monthly", priority: "0.7" },
  { loc: "/achat-appartement-boulogne-billancourt", changefreq: "weekly", priority: "0.9" },
  { loc: "/achat-appartement-neuilly-sur-seine", changefreq: "weekly", priority: "0.9" },
  { loc: "/achat-appartement-issy-les-moulineaux", changefreq: "weekly", priority: "0.9" },
  { loc: "/achat-appartement-levallois-perret", changefreq: "weekly", priority: "0.9" },
  { loc: "/achat-appartement-paris-16", changefreq: "weekly", priority: "0.9" },
  { loc: "/achat-appartement-paris-15", changefreq: "weekly", priority: "0.9" },
  { loc: "/achat-appartement-paris-7", changefreq: "weekly", priority: "0.9" },
  { loc: "/achat-appartement-paris-6", changefreq: "weekly", priority: "0.9" },
  { loc: "/mentions-legales", changefreq: "yearly", priority: "0.3" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  let propertyIds: string[] = [];
  try {
    // Reuse the existing fetch-properties function to keep a single source of truth
    const url = new URL(req.url);
    const projectRef = url.hostname.split(".")[0];
    const propsRes = await fetch(`https://${projectRef}.supabase.co/functions/v1/fetch-properties`, {
      headers: { "Content-Type": "application/json" },
    });
    if (propsRes.ok) {
      const data = await propsRes.json();
      propertyIds = (data.properties || []).map((p: { id: string }) => p.id);
    }
  } catch (e) {
    console.error("Failed to fetch properties for sitemap:", e);
  }

  const today = new Date().toISOString().split("T")[0];

  const urls = [
    ...STATIC_URLS.map(
      (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    ),
    ...propertyIds.map(
      (id) => `  <url>
    <loc>${SITE}/biens/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    ),
  ].join("\n");

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