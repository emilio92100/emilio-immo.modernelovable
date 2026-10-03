import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { defilerVers } from "@/lib/defiler";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();
  const pagePrecedente = useRef<string | null>(null);

  useEffect(() => {
    const autrePage = pagePrecedente.current !== null && pagePrecedente.current !== pathname;
    pagePrecedente.current = pathname;
    if (hash) {
      // Lien vers une section (ex. /acheter#recherche) : en arrivant d’une autre page, on part du haut,
      // puis on glisse en douceur jusqu’à la section une fois la page affichée.
      if (autrePage && navType !== "POP") window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const t = window.setTimeout(() => defilerVers(hash.slice(1)), autrePage ? 260 : 60);
      return () => window.clearTimeout(t);
    }
    if (navType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash, navType]);

  // Tous les liens vers une section de la même page (#recherche, #vente, #espace…) : on y glisse en douceur au lieu de sauter.
  useEffect(() => {
    const clic = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const h = a?.getAttribute("href");
      if (!h || h.length < 2) return;
      if (defilerVers(h.slice(1))) {
        e.preventDefault();
        window.history.replaceState(window.history.state, "", h);
      }
    };
    document.addEventListener("click", clic);
    return () => document.removeEventListener("click", clic);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname + window.location.search,
        page_location: window.location.href,
      });
    }
  }, [pathname]);

  return null;
};
