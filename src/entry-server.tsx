/* Pré-génération des pages au build (référencement) : chaque page publique est rendue en HTML,
   avec son titre, sa description et ses données structurées, avant même que JavaScript ne se charge. */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { AppRoutes, Providers } from "./App";
import { cityList } from "./lib/cities";
import { getSellCityData } from "./lib/sellCities";
import { ARTICLES, CATEGORIES } from "./data/blogArticles";

export const routes: string[] = [
  "/",
  "/biens",
  "/vendre",
  "/acheter",
  "/estimation",
  "/notre-histoire",
  "/honoraires",
  "/mentions-legales",
  "/guide-immobilier",
  ...cityList.map((c) => `/achat-appartement-${c.slug}`),
  ...cityList.filter((c) => getSellCityData(c.slug)).map((c) => `/vendre-appartement-${c.slug}`),
  ...CATEGORIES.map((c) => `/guide-immobilier/${c.slug}`),
  ...ARTICLES.map((a) => `/guide-immobilier/${a.category}/${a.slug}`),
];

/** Dates de mise à jour connues (plan du site). */
export const lastmod: Record<string, string> = Object.fromEntries(ARTICLES.map((a) => [`/guide-immobilier/${a.category}/${a.slug}`, a.updated || a.date]));

export function render(url: string) {
  const ctx: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={ctx}>
      <Providers>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </Providers>
    </HelmetProvider>,
  );
  const h = ctx.helmet;
  const head = h ? [h.title.toString(), h.priority.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n") : "";
  return { html, head, htmlAttrs: h ? h.htmlAttributes.toString() : 'lang="fr"' };
}
