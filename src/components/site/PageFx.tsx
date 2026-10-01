/* Effets de fluidité : les sections apparaissent en douceur au défilement, les images en fondu
   quand elles arrivent. Rien n'est masqué dans le HTML pré-généré (Google voit tout) :
   les classes sont ajoutées par le navigateur, uniquement sous la ligne de flottaison. */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const calme = () => typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const PageFx = () => {
  const { pathname } = useLocation();

  /* Sections : apparition au défilement */
  useEffect(() => {
    if (calme() || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );
    const t = window.setTimeout(() => {
      document.querySelectorAll("main > section").forEach((s, i) => {
        if (i === 0 || s.classList.contains("reveal")) return;
        if (s.getBoundingClientRect().top < window.innerHeight * 0.9) return; // déjà à l'écran
        s.classList.add("reveal");
        io.observe(s);
      });
    }, 40);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
      document.querySelectorAll("main > section.reveal:not(.is-in)").forEach((s) => s.classList.add("is-in"));
    };
  }, [pathname]);

  /* Images : fondu à l'arrivée */
  useEffect(() => {
    if (calme()) return;
    const prep = (img: HTMLImageElement) => {
      if (img.dataset.fx) return;
      img.dataset.fx = "1";
      if (img.complete && img.naturalWidth > 0) return;
      img.classList.add("img-fade");
      const done = () => img.classList.add("is-loaded");
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    };
    document.querySelectorAll("img").forEach(prep);
    const mo = new MutationObserver((list) =>
      list.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLImageElement) prep(n);
          else if (n instanceof HTMLElement) n.querySelectorAll("img").forEach(prep);
        }),
      ),
    );
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  return null;
};
