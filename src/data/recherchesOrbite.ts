/* ═══ Les recherches qui défilent au centre de l'orbite (accueil) ═══════════
   Liste fixe, validée par Alexandre. Pour en changer une : modifier la ligne.
   Format : type d'acheteur, couleur, « qui », « quoi », « où · budget ».
   L'ordre est mélangé à chaque visite. */
import type { AvatarColor, AvatarKind } from "@/components/site/Avatar";

export type RechercheOrbite = { kind: AvatarKind; color: AvatarColor; qui: string; quoi: string; ou: string };

export const RECHERCHES_ORBITE: RechercheOrbite[] = [
  { kind: "famille", color: "orange", qui: "Une famille cherche", quoi: "un 4 pièces avec balcon", ou: "Paris 16e · 1,3 – 1,4 M€" },
  { kind: "couple", color: "navy", qui: "Un couple cherche", quoi: "un 3 pièces lumineux", ou: "Paris 17e · 850 – 950 k€" },
  { kind: "invest", color: "bleu", qui: "Un investisseur cherche", quoi: "un studio à louer", ou: "Paris 15e · 250 – 300 k€" },
  { kind: "famille", color: "navy", qui: "Une famille cherche", quoi: "un 5 pièces familial", ou: "Neuilly · 2 – 2,3 M€" },
  { kind: "couple", color: "orange", qui: "Un couple cherche", quoi: "un 3 pièces avec terrasse", ou: "Boulogne · 750 – 850 k€" },
  { kind: "personne", color: "orange", qui: "Une acheteuse cherche", quoi: "un 2 pièces calme", ou: "Paris 6e · 850 – 950 k€" },
  { kind: "famille", color: "bleu", qui: "Une famille cherche", quoi: "une maison avec jardin", ou: "Boulogne · 1,5 – 1,8 M€" },
  { kind: "couple", color: "bleu", qui: "Un couple cherche", quoi: "un 4 pièces haussmannien", ou: "Paris 7e · 1,8 – 2 M€" },
  { kind: "invest", color: "navy", qui: "Un investisseur cherche", quoi: "un 2 pièces à louer", ou: "Paris 17e · 400 – 450 k€" },
  { kind: "famille", color: "orange", qui: "Une famille cherche", quoi: "un 4 pièces près des écoles", ou: "Paris 15e · 1 – 1,1 M€" },
  { kind: "couple", color: "navy", qui: "Un jeune couple cherche", quoi: "son premier 2 pièces", ou: "Boulogne · 450 – 500 k€" },
  { kind: "personne", color: "bleu", qui: "Un acheteur cherche", quoi: "un pied-à-terre", ou: "Paris 7e · 600 – 700 k€" },
  { kind: "famille", color: "navy", qui: "Une famille cherche", quoi: "un 5 pièces avec parking", ou: "Paris 16e · 1,6 – 1,8 M€" },
  { kind: "couple", color: "orange", qui: "Un couple cherche", quoi: "un 3 pièces avec balcon", ou: "Neuilly · 1 – 1,2 M€" },
  { kind: "personne", color: "orange", qui: "Une acheteuse cherche", quoi: "un 3 pièces avec vue", ou: "Paris 6e · 1,3 – 1,5 M€" },
];

/* Les bulles qui tournent autour : un secteur chacune */
export const BULLES_ORBITE: { kind: AvatarKind; color: AvatarColor; t1: string; t2: string }[] = [
  { kind: "couple", color: "navy", t1: "3 pièces", t2: "Paris 17e" },
  { kind: "famille", color: "orange", t1: "4 pièces · balcon", t2: "Paris 16e" },
  { kind: "personne", color: "bleu", t1: "2 pièces", t2: "Paris 6e" },
  { kind: "famille", color: "navy", t1: "5 pièces", t2: "Neuilly" },
  { kind: "couple", color: "orange", t1: "3 p. + terrasse", t2: "Boulogne" },
  { kind: "famille", color: "bleu", t1: "4 pièces", t2: "Paris 7e" },
  { kind: "personne", color: "orange", t1: "Studio", t2: "Paris 15e" },
];
