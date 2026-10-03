/* Défilement doux vers une section de la page (« Confier ma recherche », « Découvrir l’espace client »…).
   Plus lent et plus fluide que le saut du navigateur : ça démarre doucement, ça accélère, puis ça ralentit en arrivant.
   S’arrête tout de suite si la personne fait défiler elle-même. Sans animation si l’ordinateur demande moins de mouvement.
   À l’arrivée, la section reçoit data-arrive pendant un instant (petit halo sur le formulaire, voir index.css). */

let tour = 0;

const douceur = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const marquerArrivee = (el: HTMLElement) => {
  el.removeAttribute("data-arrive");
  void el.offsetWidth; // relance l’animation si on clique deux fois
  el.setAttribute("data-arrive", "");
  window.setTimeout(() => el.removeAttribute("data-arrive"), 1600);
};

export const defilerVers = (cible: string | HTMLElement | null): boolean => {
  const el = typeof cible === "string" ? document.getElementById(decodeURIComponent(cible.replace(/^#/, ""))) : cible;
  if (!el) return false;

  const marge = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  // La position d’arrivée est recalculée à chaque image : si une photo se charge plus haut, on arrive quand même au bon endroit.
  const arrivee = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(max, el.getBoundingClientRect().top + window.scrollY - marge));
  };
  const depart = window.scrollY;
  const distance = arrivee() - depart;
  const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (calme || Math.abs(distance) < 4) {
    window.scrollTo({ top: arrivee(), behavior: "instant" as ScrollBehavior });
    marquerArrivee(el);
    return true;
  }

  const duree = Math.min(1300, Math.max(700, Math.abs(distance) * 0.45));
  const moi = ++tour;
  const t0 = performance.now();
  const lacher = () => { tour++; nettoyer(); };
  const nettoyer = () => {
    window.removeEventListener("wheel", lacher);
    window.removeEventListener("touchstart", lacher);
    window.removeEventListener("keydown", lacher);
  };
  window.addEventListener("wheel", lacher, { passive: true });
  window.addEventListener("touchstart", lacher, { passive: true });
  window.addEventListener("keydown", lacher);

  const pas = (t: number) => {
    if (moi !== tour) return;
    const p = Math.min(1, (t - t0) / duree);
    window.scrollTo({ top: depart + (arrivee() - depart) * douceur(p), behavior: "instant" as ScrollBehavior });
    if (p < 1) requestAnimationFrame(pas);
    else {
      nettoyer();
      marquerArrivee(el);
    }
  };
  requestAnimationFrame(pas);
  return true;
};
