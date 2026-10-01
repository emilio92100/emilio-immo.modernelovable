/* ═══ Avis clients (Google), affichés sans date ═══════════════════════════ */
export type Avis = { nom: string; projet: string; texte: string };

export const AVIS: Avis[] = [
  {
    nom: "Béatrice L.",
    projet: "Vente d’un appartement",
    texte:
      "Merci à toute l’équipe pour son professionnalisme malgré une actualité immobilière compliquée. Merci particulièrement à Alexandre pour sa réactivité face aux différentes difficultés rencontrées, d’avoir réussi à vendre notre appartement dans les temps ET dans la fourchette de prix.",
  },
  {
    nom: "Laurane M.",
    projet: "Première acquisition",
    texte:
      "Dans le cadre d’une première acquisition immobilière et dans un contexte particulièrement compliqué, nous avons été accompagnés avec mon conjoint par Alexandre de l’agence Emilio Immobilier. Nous avons été très satisfaits de son accompagnement et nous le remercions fortement pour sa réactivité et sa disponibilité.",
  },
  {
    nom: "Carole C.",
    projet: "Vente",
    texte: "Très professionnel, efficace, réactif et sympathique. Une vente rapide sans aucun aléa. Je recommande +++",
  },
];

export const AVIS_GOOGLE_URL = "https://www.google.com/search?q=Emilio+Immobilier+Boulogne-Billancourt+avis";
