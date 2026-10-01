/* Pré-génère une page HTML par adresse publique (titre, description, données structurées et contenu),
   et réécrit le plan du site. Ne fait jamais échouer le build : en cas de souci, le site reste
   servi normalement par l'application (spa.html). */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE = "https://www.emilio-immo.com";
const dist = path.resolve("dist");
const ssrEntry = path.resolve("dist-ssr/entry-server.js");
const templatePath = path.join(dist, "spa.html");

if (!fs.existsSync(templatePath)) {
  console.warn("[prerender] dist/spa.html introuvable : rien à faire.");
  process.exit(0);
}
const template = fs.readFileSync(templatePath, "utf8");

let mod;
try {
  mod = await import(pathToFileURL(ssrEntry).href);
} catch (e) {
  console.warn("[prerender] chargement impossible, pages non pré-générées :", e?.message || e);
  process.exit(0);
}

const { render, routes, lastmod = {} } = mod;
let ok = 0;
const done = [];
for (const url of routes) {
  try {
    const { html, head, htmlAttrs } = render(url);
    if (!html || html.length < 500) throw new Error("rendu vide");
    const page = template
      .replace(/<html[^>]*>/, `<html ${htmlAttrs || 'lang="fr"'}>`)
      .replace(/<title>[\s\S]*?<\/title>\s*/, "")
      .replace("</head>", `${head}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    const file = url === "/" ? path.join(dist, "index.html") : path.join(dist, `${url.slice(1)}.html`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page);
    ok += 1;
    done.push(url);
  } catch (e) {
    console.warn(`[prerender] ${url} : ${e?.message || e}`);
  }
}
console.log(`[prerender] ${ok}/${routes.length} pages pré-générées.`);

/* Plan du site des pages fixes, à jour à chaque build. */
const today = new Date().toISOString().slice(0, 10);
const prio = (u) => (u === "/" ? "1.0" : /^\/(vendre|acheter|estimation|biens)$/.test(u) ? "0.9" : /appartement-/.test(u) ? "0.8" : /^\/guide-immobilier/.test(u) ? "0.7" : "0.5");
const freq = (u) => (u === "/biens" ? "daily" : u === "/" || /appartement-|^\/guide-immobilier$/.test(u) ? "weekly" : "monthly");
const urls = routes
  .map((u) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${lastmod[u] || today}</lastmod><changefreq>${freq(u)}</changefreq><priority>${prio(u)}</priority></url>`)
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap-pages.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`[prerender] sitemap-pages.xml : ${routes.length} adresses.`);
