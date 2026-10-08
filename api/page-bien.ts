/* La page d'un bien, envoyée avec son titre, sa description et sa photo déjà dedans (Alexandre, 8 oct.).

   Pourquoi : les pages /biens/<numéro> ne sont pas pré-générées au build (les biens viennent du CRM et
   changent tous les jours). Elles partaient donc avec le titre général du site et sans photo, et ne se
   remplissaient qu'une fois ouvertes dans le navigateur. WhatsApp, Facebook, les SMS ne lisent que la page
   telle qu'elle arrive : l'aperçu d'un lien montrait le logo de l'agence au lieu de l'appartement, et
   Google voyait d'abord 25 pages au même titre.

   Comment : vercel.json envoie /biens/<numéro> ici. On prend la page du site (spa.html, la même que
   d'habitude), on lit le bien dans le flux du CRM, et on ajoute dans l'en-tête les mêmes balises que la
   fiche pose elle-même (bien-seo.ts), marquées data-rh pour que react-helmet les reprenne sans doublon.
   Le contenu de la page ne change pas : <div id="root"> reste vide, l'application s'affiche comme avant.

   Si quelque chose manque (flux du CRM injoignable, bien inconnu), la page part quand même : sans les
   balises du bien dans le premier cas, en 404 « plus disponible » dans le second. Vercel la garde
   5 minutes en cache : un changement de prix dans le CRM s'y voit au plus 5 minutes plus tard. */
import { SITE_URL, seoBien, type BienSeo } from "../src/lib/bien-seo.js";

export const config = { runtime: "edge" };

const FLUX_BIENS = "https://emilio-immo-chasseimmo.vercel.app/api/flux-site";
const IMAGE_PAR_DEFAUT = `${SITE_URL}/og-image.jpg`;

const attr = (t: string) => t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const texte = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ld = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");

/* La page du site, relue au plus toutes les minutes (elle change à chaque mise en ligne). */
let modele: { html: string; lu: number; origine: string } | null = null;
async function lireModele(origine: string): Promise<string | null> {
  if (modele && modele.origine === origine && Date.now() - modele.lu < 60_000) return modele.html;
  try {
    const r = await fetch(`${origine}/spa`, { signal: AbortSignal.timeout(5000) });
    const html = r.ok ? await r.text() : "";
    if (!html.includes('<div id="root"></div>')) throw new Error(`page du site illisible (${r.status})`);
    modele = { html, lu: Date.now(), origine };
    return html;
  } catch (e) {
    console.error("[page-bien] modèle :", (e as Error).message);
    return modele?.html ?? null;
  }
}

async function lireBiens(): Promise<BienSeo[] | null> {
  try {
    const r = await fetch(FLUX_BIENS, { signal: AbortSignal.timeout(5000) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = (await r.json()) as { properties?: BienSeo[] };
    return Array.isArray(d.properties) ? d.properties : null;
  } catch (e) {
    console.error("[page-bien] flux du CRM :", (e as Error).message);
    return null;
  }
}

/* Les balises, dans la forme exacte de SEOHead.tsx (react-helmet-async : attribut data-rh). */
function balises(t: { title: string; description: string; canonical?: string; robots: string; image: string; jsonLd?: unknown[] }) {
  const m = (cle: "name" | "property", nom: string, val: string) => `<meta ${cle}="${nom}" content="${attr(val)}" data-rh="true">`;
  return [
    m("name", "description", t.description),
    t.canonical ? `<link rel="canonical" href="${attr(t.canonical)}" data-rh="true">` : "",
    m("name", "robots", t.robots),
    m("property", "og:site_name", "Emilio Immobilier"),
    m("property", "og:locale", "fr_FR"),
    m("property", "og:type", "website"),
    m("property", "og:title", t.title),
    m("property", "og:description", t.description),
    t.canonical ? m("property", "og:url", t.canonical) : "",
    m("property", "og:image", t.image),
    m("name", "twitter:card", "summary_large_image"),
    m("name", "twitter:title", t.title),
    m("name", "twitter:description", t.description),
    m("name", "twitter:image", t.image),
    ...(t.jsonLd || []).map((b) => `<script type="application/ld+json" data-rh="true">${ld(b)}</script>`),
  ]
    .filter(Boolean)
    .join("\n    ");
}

const poser = (html: string, title: string, tete: string) =>
  html.replace(/<title>[\s\S]*?<\/title>/, `<title>${texte(title)}</title>`).replace(/\s*<\/head>/, `\n    ${tete}\n  </head>`);

const reponse = (html: string, status: number, cache: string) =>
  new Response(html, { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": cache } });

export default async function handler(req: Request): Promise<Response> {
  const u = new URL(req.url);
  const id = (u.searchParams.get("id") || decodeURIComponent(u.pathname.match(/\/biens\/([^/]+)/)?.[1] || "")).trim();
  const hote = req.headers.get("x-forwarded-host") || req.headers.get("host") || u.host;
  const origine = `${hote.startsWith("localhost") || hote.startsWith("127.") ? "http" : "https"}://${hote}`;

  const [html, biens] = await Promise.all([lireModele(origine), lireBiens()]);
  if (!html) return reponse('<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="2"><p>Chargement…</p>', 503, "no-store");

  /* Flux injoignable : la page normale, sans rien garder en cache. */
  if (!biens) return reponse(html, 200, "public, max-age=0, must-revalidate");

  const bien = biens.find((b) => String(b.id) === id);
  if (!bien) {
    /* Le bien fictif de démonstration vit dans le code du site, pas dans le flux. */
    if (id.includes("fictif")) return reponse(html, 200, "public, max-age=0, s-maxage=300");
    const title = "Ce bien n’est plus disponible | Emilio Immobilier";
    const description = "Ce bien a peut-être trouvé preneur. Découvrez nos autres biens à vendre à Paris et dans les Hauts-de-Seine.";
    return reponse(poser(html, title, balises({ title, description, robots: "noindex, follow", image: IMAGE_PAR_DEFAUT })), 404, "public, max-age=0, s-maxage=60");
  }

  try {
    const s = seoBien(bien);
    const tete = balises({ title: s.title, description: s.description, canonical: s.url, robots: "index, follow, max-image-preview:large", image: s.image || IMAGE_PAR_DEFAUT, jsonLd: s.jsonLd });
    return reponse(poser(html, s.title, tete), 200, "public, max-age=0, s-maxage=300, stale-while-revalidate=3600");
  } catch (e) {
    /* Une fiche incomplète dans le CRM ne doit pas casser la page : elle part sans ses balises. */
    console.error("[page-bien] bien", id, ":", (e as Error).message);
    return reponse(html, 200, "public, max-age=0, must-revalidate");
  }
}
