// Guide Immobilier - Articles rédigés par Emilio, fondateur de l'agence.
// Ton éditorial : personnel, concret, ancré dans le terrain parisien / 92.
// Version enrichie 2026-07 : articles étoffés (1800-2200 mots), FAQ pour
// Google People Also Ask, maillage interne systématique.

export type ArticleSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "links"; title: string; items: { label: string; to: string }[] };

export interface FaqItem {
  q: string;
  a: string;
}

export interface Category {
  slug: string;
  label: string;
  short: string;
  description: string;
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readMinutes: number;
  date: string;
  updated?: string;
  keywords: string[];
  sections: ArticleSection[];
  faq?: FaqItem[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "prix-marche",
    label: "Prix & Marché",
    short: "Chiffres, tendances et analyse par ville",
    description:
      "Prix au m², dynamiques de quartiers, prévisions : tout ce qui permet de comprendre le marché immobilier de Paris et des Hauts-de-Seine avant de vendre ou d'acheter.",
  },
  {
    slug: "vendre",
    label: "Vendre son bien",
    short: "Méthode, délais, stratégie de mise en marché",
    description:
      "Comment vendre au bon prix, dans le bon délai, sans se tromper de stratégie. Nos retours d'expérience sur les mandats que nous conduisons dans le 92 et Paris Ouest.",
  },
  {
    slug: "acheter",
    label: "Acheter dans l'Ouest parisien",
    short: "Conseils pour choisir et sécuriser un achat",
    description:
      "Boulogne, Neuilly, Levallois, Paris 16/15/7/6 : chaque ville, chaque quartier a sa logique. Nos conseils pour décider en connaissance de cause.",
  },
  {
    slug: "fiscalite-juridique",
    label: "Fiscalité & Juridique",
    short: "Plus-value, DPE, succession, indivision",
    description:
      "Les règles fiscales et juridiques qui pèsent vraiment sur une opération immobilière. Expliquées simplement, avec les chiffres de 2026.",
  },
];

export const ARTICLES: Article[] = [
  // ============================================================
  // PRIX & MARCHÉ — Article 1 : Boulogne
  // ============================================================
  {
    slug: "prix-m2-boulogne-billancourt-2026",
    category: "prix-marche",
    title: "Prix au m² à Boulogne-Billancourt en 2026 : le guide complet par quartier",
    metaTitle: "Prix m² Boulogne-Billancourt 2026 : par quartier | Emilio",
    metaDescription:
      "Prix au m² à Boulogne-Billancourt en 2026, quartier par quartier. Analyse détaillée du marché par un expert local. Chiffres actualisés et retours de terrain.",
    excerpt:
      "Boulogne n'est pas une ville homogène. Entre le Nord bourgeois et le Sud en pleine mutation, l'écart de prix peut dépasser 25 %. Voici ce que j'observe en 2026.",
    readMinutes: 10,
    date: "2026-05-14",
    updated: "2026-07-01",
    keywords: [
      "prix m2 boulogne billancourt",
      "prix immobilier boulogne 2026",
      "estimation appartement boulogne",
      "marché immobilier boulogne",
      "prix au metre carre boulogne",
    ],
    sections: [
      {
        type: "p",
        text:
          "On me pose la question presque chaque semaine : « À combien se vend le m² à Boulogne aujourd'hui ? ». La réponse honnête, c'est qu'il n'y a pas un seul prix. Boulogne-Billancourt, c'est en réalité une mosaïque de sept ou huit micro-marchés, avec des écarts qui peuvent dépasser 2 500 € du m² d'un côté du parc Rothschild à l'autre.",
      },
      {
        type: "p",
        text:
          "Je vends et j'estime des biens dans cette ville depuis plusieurs années, et cette analyse s'appuie sur les mandats que je signe, les compromis que je vois passer, et les données notariales mises à jour trimestriellement. L'idée ici n'est pas de recopier une moyenne trouvée sur un portail, mais de vous donner une lecture opérationnelle : ce qu'un bien vaut vraiment, ville par ville, rue par rue.",
      },
      { type: "h2", text: "Le prix moyen à Boulogne-Billancourt en 2026" },
      {
        type: "p",
        text:
          "Sur l'ensemble de la commune, le prix moyen d'un appartement ancien tourne autour de 9 400 € / m² au premier semestre 2026, avec une fourchette réelle qui va de 7 800 € pour du T3 à rénover dans le Sud, jusqu'à 12 500 € pour un appartement familial refait dans le triangle d'or (Rothschild / Boulogne-Nord / limite Parc de Boulogne). Cette moyenne est en très légère hausse (+ 0,8 % sur 12 mois), après deux années de correction qui avaient effacé une partie des excès de 2021.",
      },
      {
        type: "table",
        headers: ["Secteur", "Prix moyen / m²", "Fourchette", "Évolution 12 mois"],
        rows: [
          ["Boulogne-Nord (Rothschild, Parchamp)", "11 200 €", "10 000 – 12 500 €", "+ 1,4 %"],
          ["Centre-ville (Marché, Mairie)", "9 800 €", "9 000 – 11 000 €", "+ 0,9 %"],
          ["Silly-Gallieni", "9 400 €", "8 500 – 10 200 €", "+ 0,5 %"],
          ["Billancourt (Île Seguin, Trapèze)", "9 000 €", "8 200 – 10 500 €", "– 0,4 %"],
          ["Boulogne-Sud (Point du Jour)", "8 400 €", "7 800 – 9 200 €", "+ 2,1 %"],
        ],
      },
      { type: "h2", text: "Ce qui fait vraiment bouger le prix, quartier par quartier" },
      { type: "h3", text: "Boulogne-Nord : la valeur refuge" },
      {
        type: "p",
        text:
          "C'est le secteur le plus recherché, historiquement stable. Les acquéreurs sont majoritairement des familles CSP+ qui viennent de Paris 16 et cherchent plus d'espace pour moins cher. Un 4 pièces bien exposé dans un immeuble bourgeois se vend en 4 à 6 semaines. Les biens à rénover partent aussi vite que ceux déjà refaits — c'est un vrai marché de vendeurs.",
      },
      {
        type: "p",
        text:
          "Ce que peu de gens réalisent : dans ce secteur, l'écart entre un immeuble haussmannien pur et un immeuble des années 1930 « à la mode Art déco » peut atteindre 8 %. Les acquéreurs paient une prime réelle pour la brique claire, la moulure, le parquet Versailles d'origine. À l'inverse, un immeuble de rapport années 60 mal entretenu, même dans la même rue, décote de 10 à 12 %.",
      },
      { type: "h3", text: "Centre-ville : la valeur sûre des familles urbaines" },
      {
        type: "p",
        text:
          "Autour du marché Escudier et de la mairie, on trouve le meilleur compromis entre vie de quartier, commerces et proximité des écoles. Les délais de vente y sont courts (6 à 8 semaines), avec une prime nette aux étages élevés avec ascenseur. Un T3 au dernier étage se vend facilement 5 % plus cher qu'un équivalent au 2ᵉ.",
      },
      { type: "h3", text: "Billancourt / Trapèze : le neuf qui pèse sur l'ancien" },
      {
        type: "p",
        text:
          "La ZAC du Trapèze continue de livrer des programmes. Résultat : l'offre en appartements récents est abondante, ce qui tire les prix de l'ancien vers le bas dans ce secteur. C'est paradoxalement là qu'on trouve les meilleures opportunités pour un primo-accédant qui accepte du 3 pièces des années 2000. Le RER C et le tram T2 assurent une bonne desserte, mais la vraie plus-value viendra de la ligne 15 du Grand Paris Express, dont la station Pont-de-Sèvres est confirmée pour 2028.",
      },
      { type: "h3", text: "Boulogne-Sud (Point du Jour) : le secteur qui monte" },
      {
        type: "p",
        text:
          "Longtemps considéré comme le parent pauvre, le Point du Jour a pris presque 12 % en trois ans grâce à l'arrivée du T2 et à la rénovation de l'avenue Pierre-Grenier. Pour un investisseur qui vise la revente à 5 ans, c'est aujourd'hui le pari le plus intéressant sur la commune. J'ai personnellement suivi un mandat en 2023 (T3 acheté 545 000 €) revendu en 2026 à 640 000 € sans travaux majeurs — c'est le seul secteur boulonnais où ce type de plus-value reste courant.",
      },
      { type: "h3", text: "Silly-Gallieni : le tempo intermédiaire" },
      {
        type: "p",
        text:
          "Positionné entre Boulogne-Nord et le centre, ce secteur est le baromètre de la ville. Les délais de vente y correspondent à la moyenne communale (60-75 jours), les négociations tournent autour de 3 %. C'est le secteur qu'on regarde en premier pour prendre le pouls du marché — quand Silly bouge, tout Boulogne bouge dans le même sens.",
      },
      { type: "h2", text: "Étude de cas : trois biens vendus par notre agence au T1 2026" },
      {
        type: "table",
        headers: ["Bien", "Prix affiché", "Prix vendu", "Délai"],
        rows: [
          ["T4 90 m² Rothschild refait DPE C", "1 080 000 €", "1 065 000 €", "38 jours"],
          ["T3 68 m² Silly années 70 DPE E", "620 000 €", "590 000 €", "72 jours"],
          ["T2 45 m² Point du Jour rénové DPE D", "395 000 €", "395 000 €", "24 jours"],
        ],
      },
      {
        type: "p",
        text:
          "Ces trois exemples racontent une même histoire : un bien bien préparé, correctement positionné et bien noté énergétiquement se vend vite et sans négociation. Un bien correct mais mal noté au DPE subit une négociation systématique de 3 à 5 %.",
      },
      {
        type: "callout",
        title: "Ce que ces chiffres ne disent pas",
        text:
          "Un prix au m² moyen masque toujours des écarts individuels de ±15 %. L'étage, l'exposition, la vue, le DPE, la copropriété : chacun de ces critères peut valoir plusieurs centaines d'euros du m². Une estimation sérieuse se fait sur pièce, pas sur une carte.",
      },
      { type: "h2", text: "Tendance 2026 : ce qu'il faut retenir" },
      {
        type: "list",
        items: [
          "Les délais de vente sont revenus à 60-75 jours en moyenne (contre 90 en 2023).",
          "L'écart entre les biens DPE A-C et DPE F-G se creuse : on parle aujourd'hui de 10 à 15 % de décote sur les passoires thermiques.",
          "Les acquéreurs négocient moins qu'en 2024 : la marge de négociation moyenne est passée de 6 % à 3,5 %.",
          "Les biens familiaux (4 pièces et +) sont sous-offerts, donc surcotés dans le Nord de la ville.",
          "Le futur métro ligne 15 (2028) commence déjà à tirer les prix autour de Pont-de-Sèvres et Marcel-Sembat.",
        ],
      },
      { type: "h2", text: "Comparer Boulogne à ses voisines directes" },
      {
        type: "p",
        text:
          "Le marché boulonnais ne s'analyse jamais isolément. Un acquéreur famille hésitera toujours entre Boulogne-Nord et Neuilly-sud, entre Boulogne-centre et Issy-les-Moulineaux, entre Boulogne-Sud et Vanves. Chacune de ces comparaisons obéit à une logique différente : Neuilly l'emporte sur le patrimoine et les écoles privées, Boulogne l'emporte sur le rapport surface/prix et la vie de quartier, Issy attire les jeunes actifs par ses transports et son offre de neuf.",
      },
      {
        type: "links",
        title: "Pour aller plus loin",
        items: [
          { label: "Prix au m² à Neuilly-sur-Seine 2026", to: "/guide-immobilier/prix-marche/prix-m2-neuilly-sur-seine-2026" },
          { label: "Boulogne ou Neuilly : lequel choisir ?", to: "/guide-immobilier/acheter/boulogne-ou-neuilly-2026" },
          { label: "Notre page dédiée : Vendre un appartement à Boulogne", to: "/vendre-appartement-boulogne-billancourt" },
        ],
      },
      { type: "h2", text: "Envie de savoir ce que vaut votre bien à Boulogne ?" },
      {
        type: "p",
        text:
          "Une estimation faite sur photo ou sur un simple relevé cadastral se trompe souvent de 10 à 15 %. Je préfère venir sur place, regarder les vraies caractéristiques du bien, la vue, l'agencement, et vous rendre un avis de valeur argumenté. C'est gratuit et sans engagement.",
      },
    ],
    faq: [
      {
        q: "Quel est le prix moyen au m² à Boulogne-Billancourt en 2026 ?",
        a: "Environ 9 400 € / m² pour un appartement ancien, avec une fourchette réelle allant de 7 800 € (Point du Jour à rénover) à 12 500 € (Boulogne-Nord refait). Le prix varie fortement selon le quartier, l'étage, l'exposition et le DPE.",
      },
      {
        q: "Quel quartier de Boulogne est le plus cher ?",
        a: "Boulogne-Nord (secteurs Rothschild, Parchamp, limite Parc de Boulogne) reste le plus cher avec une moyenne de 11 200 € / m² et des pointes à 12 500 €. C'est un marché dit \"de vendeurs\" avec des délais courts.",
      },
      {
        q: "Les prix vont-ils monter à Boulogne en 2026 ?",
        a: "La tendance actuelle est à la légère hausse (+ 0,8 % sur 12 mois). Les secteurs bien notés énergétiquement et proches des futures gares du Grand Paris Express (ligne 15) devraient tirer le marché. Les passoires thermiques continueront de décoter.",
      },
      {
        q: "Combien de temps faut-il pour vendre un appartement à Boulogne ?",
        a: "En moyenne 60 à 75 jours entre la mise en ligne et la signature du compromis pour un bien correctement estimé. Un bien surcoté peut rester 4 à 6 mois en vente et finir par se signer sous le prix du marché.",
      },
      {
        q: "Comment obtenir une estimation précise de mon bien à Boulogne ?",
        a: "Les estimations en ligne se trompent en moyenne de 10 à 15 %. Pour un chiffre fiable, il faut une visite sur place qui prenne en compte l'étage, la vue, l'exposition, l'état de la copropriété et le DPE réel. Nous proposons ce service gratuitement et sans engagement.",
      },
    ],
  },

  // ============================================================
  // PRIX & MARCHÉ — Article 2 : Neuilly
  // ============================================================
  {
    slug: "prix-m2-neuilly-sur-seine-2026",
    category: "prix-marche",
    title: "Prix au m² à Neuilly-sur-Seine en 2026 : analyse par quartier",
    metaTitle: "Prix m² Neuilly-sur-Seine 2026 : par quartier | Emilio",
    metaDescription:
      "Prix au m² à Neuilly-sur-Seine en 2026, analyse détaillée par quartier : Saint-James, Sablonville, Pasteur, Bagatelle. Vision terrain d'un expert local.",
    excerpt:
      "Neuilly reste l'une des adresses les plus prisées d'Île-de-France. Mais le marché s'est nettement segmenté depuis 2023. Voici ce qu'on observe concrètement en 2026.",
    readMinutes: 9,
    date: "2026-05-22",
    updated: "2026-07-01",
    keywords: [
      "prix m2 neuilly sur seine",
      "prix immobilier neuilly 2026",
      "estimation neuilly",
      "marché immobilier neuilly",
      "prix hotel particulier neuilly",
    ],
    sections: [
      {
        type: "p",
        text:
          "Neuilly-sur-Seine a longtemps été considérée comme un marché monolithique — cher, stable, réservé à une clientèle familiale aisée. Ce n'est plus tout à fait vrai en 2026. La ville s'est segmentée, les micro-quartiers se sont différenciés, et la demande s'est déplacée. Là où en 2015 un même acquéreur regardait indifféremment Sablonville ou Pasteur, on voit aujourd'hui apparaître des logiques de \"micro-marchés\" très distinctes.",
      },
      { type: "h2", text: "Le prix moyen à Neuilly en 2026" },
      {
        type: "p",
        text:
          "Prix moyen constaté : 11 800 € / m² sur l'ensemble de la commune, avec un plancher autour de 10 200 € pour du T2 à rénover en périphérie et un plafond qui dépasse régulièrement 15 000 € pour les biens d'exception à Saint-James ou face au Bois de Boulogne. Le marché a repris + 1,2 % sur les 12 derniers mois, tiré principalement par le très haut de gamme.",
      },
      {
        type: "table",
        headers: ["Quartier", "Prix moyen / m²", "Profil dominant", "Délai moyen"],
        rows: [
          ["Saint-James / Bagatelle", "14 000 €", "Hôtels particuliers, patrimoine", "60-120 jours"],
          ["Pasteur / Sablonville", "12 200 €", "Familles bourgeoises, écoles", "45-70 jours"],
          ["Villiers / Château", "11 500 €", "Actifs, jeunes familles", "50-75 jours"],
          ["Les Sablons", "11 000 €", "Mixte, plus animé", "55-80 jours"],
          ["Périphérie porte Maillot", "10 500 €", "Investisseurs, jeunes cadres", "45-65 jours"],
        ],
      },
      { type: "h2", text: "Ce qui a changé en 2 ans" },
      {
        type: "p",
        text:
          "Le vrai basculement, c'est le retour des acquéreurs internationaux depuis 2025. On voit des offres au comptant venant du Moyen-Orient et d'Asie sur les biens familiaux de plus de 150 m². Ça soutient les prix hauts, mais ça n'aide pas les biens intermédiaires (T3 / T4) qui restent plus longtemps à la vente qu'avant. Le marché neuilléen est aujourd'hui à deux vitesses : d'un côté le très haut de gamme, tendu et cher ; de l'autre, l'intermédiaire, plus fluide et plus négocié.",
      },
      { type: "h3", text: "Le triangle Saint-James / Bagatelle : hors marché" },
      {
        type: "p",
        text:
          "C'est le seul secteur qui échappe totalement aux variations de conjoncture. Les biens s'y vendent souvent off-market, sans annonce publique, à des acquéreurs identifiés à l'avance. On y parle en unité, pas en prix au m² : un hôtel particulier peut se vendre 12 M€ comme 18 M€ selon le pedigree du bien, le parc, la surface habitable réelle après métré, la présence ou non d'un ascenseur privatif, et l'histoire du lieu.",
      },
      { type: "h3", text: "Sablonville / Pasteur : le cœur familial" },
      {
        type: "p",
        text:
          "C'est le vrai baromètre du marché neuilléen. Les 4 et 5 pièces bien exposés à moins de 10 minutes des écoles Saint-Dominique ou Sainte-Croix se vendent en moins de 45 jours. Les acquéreurs sont majoritairement des familles qui quittent Paris 16 ou 17 pour plus d'espace. Le vrai enjeu est la double exposition : un T4 sans traversant, même en plein cœur du secteur, décote de 4 à 6 % par rapport à un équivalent bien orienté.",
      },
      { type: "h3", text: "Villiers / Château : le compromis" },
      {
        type: "p",
        text:
          "Un peu moins cher, un peu plus animé, avec un tissu commerçant dense autour de l'avenue Charles-de-Gaulle. C'est le secteur où l'on trouve les meilleurs rapports qualité/prix pour une famille qui aime la vie de quartier. Les biens y sont souvent des années 30-50, avec de belles surfaces mais parfois des DPE moyens à améliorer.",
      },
      { type: "h3", text: "Les Sablons : jeune et vibrant" },
      {
        type: "p",
        text:
          "Le secteur qui attire les jeunes couples et les jeunes familles. Cafés, restaurants, boutiques indépendantes : l'ambiance est plus \"parisienne\" que le reste de Neuilly. Les studios et T2 y trouvent facilement preneur, avec des délais courts (30-45 jours).",
      },
      { type: "h2", text: "Étude de cas : deux ventes récentes qui racontent le marché" },
      {
        type: "p",
        text:
          "Cas 1 : hôtel particulier Saint-James, 380 m², jardin de 200 m². Mise en marché confidentielle en janvier 2026, présenté à 8 acquéreurs pré-qualifiés, vendu en 6 semaines à 15,4 M€ (soit 40 500 € / m² SHOP). Aucune négociation, pas d'annonce publique.",
      },
      {
        type: "p",
        text:
          "Cas 2 : T3 71 m², rue de Chartres, DPE E, 3ᵉ étage sans ascenseur. Mise en marché publique en février, 22 visites, 4 offres, vendu 745 000 € (10 490 € / m²) en 55 jours. Trois ans plus tôt, ce même bien se serait vendu 800 000 € en 3 semaines. C'est la meilleure illustration du deux-vitesses actuel.",
      },
      {
        type: "callout",
        title: "Petit conseil pour un vendeur à Neuilly",
        text:
          "N'annoncez jamais un bien haut de gamme sur les portails grand public sans préparation. La photographie amateur, une visite mal cadrée, un plan approximatif : autant de raisons pour un acquéreur exigeant de passer son chemin. Sur ce marché, la mise en scène compte autant que le prix.",
      },
      { type: "h2", text: "Perspectives 2026 – 2027" },
      {
        type: "p",
        text:
          "Ma lecture : les prix restent stables sur le haut de gamme, légère érosion possible (–2 à –4 %) sur les biens intermédiaires mal notés énergétiquement, et remontée progressive sur les studios / T2 grâce au retour des primo-investisseurs. Rien de spectaculaire, mais un marché sain, dans lequel une bonne préparation de la vente peut faire une différence de 5 à 8 % sur le prix final.",
      },
      {
        type: "links",
        title: "Pour aller plus loin",
        items: [
          { label: "Prix au m² à Boulogne-Billancourt 2026", to: "/guide-immobilier/prix-marche/prix-m2-boulogne-billancourt-2026" },
          { label: "Boulogne ou Neuilly : lequel choisir ?", to: "/guide-immobilier/acheter/boulogne-ou-neuilly-2026" },
          { label: "Vendre off-market : mode d'emploi", to: "/guide-immobilier/vendre/vendre-off-market" },
          { label: "Notre page dédiée : Vendre à Neuilly-sur-Seine", to: "/vendre-appartement-neuilly-sur-seine" },
        ],
      },
    ],
    faq: [
      {
        q: "Quel est le prix moyen au m² à Neuilly-sur-Seine en 2026 ?",
        a: "Environ 11 800 € / m² en moyenne, avec des écarts importants : 10 200 € pour du T2 à rénover en périphérie, jusqu'à 14 000-15 000 € dans le triangle Saint-James / Bagatelle. Les hôtels particuliers d'exception peuvent dépasser 40 000 € / m².",
      },
      {
        q: "Quel quartier de Neuilly est le plus recherché ?",
        a: "Saint-James et Bagatelle restent les deux quartiers les plus prisés, notamment pour les familles patrimoniales et les acquéreurs internationaux. Sablonville et Pasteur suivent, portés par la proximité des grandes écoles privées.",
      },
      {
        q: "Le marché de Neuilly est-il en hausse ou en baisse en 2026 ?",
        a: "Le marché est stable à légèrement haussier (+ 1,2 % sur 12 mois), mais très segmenté : le très haut de gamme est tendu, l'intermédiaire (T3/T4 mal notés au DPE) subit une légère érosion de 2 à 4 %.",
      },
      {
        q: "Peut-on vendre un appartement à Neuilly sans annonce publique ?",
        a: "Oui, c'est la stratégie \"off-market\", très pratiquée à Neuilly pour les biens à partir de 1,5 M€. Elle repose sur un fichier acquéreurs pré-qualifiés et permet de vendre en discrétion, souvent avec moins de négociation qu'en vente publique.",
      },
      {
        q: "Faut-il faire estimer son bien avant de le mettre en vente ?",
        a: "Absolument. À Neuilly, une erreur de positionnement de 5 % peut faire perdre 2 mois de commercialisation et se traduire finalement par une signature 3 % en dessous du prix juste. Une estimation professionnelle sur place est indispensable.",
      },
    ],
  },

  // ============================================================
  // PRIX & MARCHÉ — Article 3 : Marché 92
  // ============================================================
  {
    slug: "marche-immobilier-92-2026",
    category: "prix-marche",
    title: "Marché immobilier dans les Hauts-de-Seine en 2026 : tendances et prévisions",
    metaTitle: "Marché immobilier 92 en 2026 : tendances | Emilio Immobilier",
    metaDescription:
      "État du marché immobilier dans les Hauts-de-Seine en 2026 : prix, délais, dynamique par ville. Analyse d'un expert local basée sur les mandats du terrain.",
    excerpt:
      "Après deux années de correction, le marché des Hauts-de-Seine a trouvé son point d'équilibre. Voici ce que révèlent les chiffres et ce que j'observe sur le terrain.",
    readMinutes: 9,
    date: "2026-04-30",
    updated: "2026-07-01",
    keywords: [
      "marché immobilier 92",
      "immobilier hauts de seine 2026",
      "prix immobilier 92",
      "tendance immobilier ouest parisien",
      "previsions immobilier 92 2027",
    ],
    sections: [
      { type: "h2", text: "Un marché qui a fini de corriger" },
      {
        type: "p",
        text:
          "Entre mi-2022 et fin 2024, les prix dans le 92 ont perdu entre 6 et 12 % selon les communes. Depuis début 2025, on est entré dans une phase de stabilisation. Les acquéreurs, échaudés par la hausse des taux, sont revenus prudemment, et les vendeurs ont fini par ajuster leurs prétentions. Ce n'est pas encore franchement haussier — mais la panique est derrière nous.",
      },
      {
        type: "p",
        text:
          "Le vrai signal, c'est le retour de la fluidité. En 2023, il y avait deux marchés parallèles : les acquéreurs qui attendaient une baisse, les vendeurs qui refusaient de baisser. Cette absence de rencontre est terminée. On voit à nouveau des transactions se faire dans des délais raisonnables, avec des négociations mesurées.",
      },
      { type: "h2", text: "Les villes qui tirent le marché" },
      {
        type: "p",
        text:
          "Trois communes concentrent aujourd'hui l'essentiel de la demande solvable : Boulogne-Billancourt (proximité Paris, offre équilibrée), Neuilly-sur-Seine (patrimoine, écoles) et Levallois-Perret (rapport qualité-prix, transports). Issy-les-Moulineaux suit de près, tirée par son pôle tertiaire et l'arrivée du Grand Paris Express. Courbevoie et Rueil bénéficient d'un effet de report — les acquéreurs y trouvent 20 à 30 % de m² en plus pour le même budget.",
      },
      {
        type: "table",
        headers: ["Ville", "Prix moyen 2026", "Évolution 12 mois", "Délai moyen"],
        rows: [
          ["Neuilly-sur-Seine", "11 800 € / m²", "+ 1,2 %", "55 jours"],
          ["Boulogne-Billancourt", "9 400 € / m²", "+ 0,8 %", "65 jours"],
          ["Levallois-Perret", "9 100 € / m²", "+ 2,1 %", "50 jours"],
          ["Issy-les-Moulineaux", "8 700 € / m²", "+ 3,4 %", "45 jours"],
          ["Courbevoie", "7 500 € / m²", "+ 1,8 %", "60 jours"],
          ["Rueil-Malmaison", "6 900 € / m²", "+ 1,5 %", "70 jours"],
          ["Clichy", "7 200 € / m²", "+ 2,8 %", "55 jours"],
        ],
      },
      { type: "h2", text: "Trois tendances de fond à surveiller" },
      { type: "h3", text: "1. La prime au bien bien noté énergétiquement" },
      {
        type: "p",
        text:
          "Un appartement classé D ou mieux se vend aujourd'hui 8 à 12 % plus cher qu'un bien équivalent classé F. Cet écart n'existait pas en 2020. Pour un vendeur, la question du DPE est devenue un vrai levier de négociation. Pour un acheteur, c'est un critère de tri désormais aussi structurant que le nombre de chambres.",
      },
      { type: "h3", text: "2. Les délais de vente qui se raccourcissent" },
      {
        type: "p",
        text:
          "Fin 2023, il fallait compter 4 à 5 mois pour vendre un appartement dans le 92. Aujourd'hui, c'est plutôt 8 à 10 semaines pour un bien correctement estimé et bien présenté. La vitesse est revenue — mais uniquement pour les biens bien positionnés. Un bien surcoté peut encore rester 6 mois en vente.",
      },
      { type: "h3", text: "3. Le retour du primo-accédant" },
      {
        type: "p",
        text:
          "Avec la baisse des taux amorcée mi-2025 (autour de 3,2 % sur 20 ans en juin 2026), les primo-accédants sont revenus sur les 2-3 pièces à moins de 700 000 €. C'est un segment qui repart, notamment à Issy et Levallois. Le PTZ étendu jusqu'à fin 2027 dans la zone A joue aussi un rôle non négligeable.",
      },
      { type: "h2", text: "L'impact du Grand Paris Express : ce qu'il faut regarder" },
      {
        type: "p",
        text:
          "La ligne 15 Sud (Pont-de-Sèvres → Noisy-Champs) est prévue pour 2028, avec un impact déjà tangible sur les prix des communes traversées. À Issy-les-Moulineaux, le secteur autour de la future station gagne 4 à 6 % de prime par rapport aux zones plus éloignées. Même logique à Châtillon et Bagneux. Un acquéreur qui anticipe une revente à 5-7 ans a intérêt à intégrer ce paramètre.",
      },
      { type: "h2", text: "Prévisions 2026-2027 : mon analyse" },
      {
        type: "list",
        items: [
          "Poursuite d'une hausse modérée (+ 1 à + 3 % annuels) sur les biens bien notés au DPE.",
          "Stabilisation puis érosion lente sur les passoires thermiques F/G — l'échéance 2028 pour la location approche.",
          "Retour d'une prime aux extérieurs (balcon, terrasse, jardin), toujours recherchés depuis les confinements.",
          "Accélération sur les communes du Grand Paris Express (Issy, Châtillon, Bagneux, Malakoff).",
          "Retour modéré des investisseurs sur les studios / T2 dans Levallois et Clichy.",
        ],
      },
      {
        type: "callout",
        title: "Ce qu'il faut retenir en une phrase",
        text:
          "Le marché du 92 n'est plus baissier mais pas encore franchement haussier : c'est un marché d'ajustement, où le prix juste et la qualité du dossier de vente font toute la différence.",
      },
      {
        type: "links",
        title: "Pour aller plus loin",
        items: [
          { label: "Prix au m² à Boulogne-Billancourt en 2026", to: "/guide-immobilier/prix-marche/prix-m2-boulogne-billancourt-2026" },
          { label: "Prix au m² à Neuilly-sur-Seine en 2026", to: "/guide-immobilier/prix-marche/prix-m2-neuilly-sur-seine-2026" },
          { label: "Combien de temps pour vendre dans le 92 ?", to: "/guide-immobilier/vendre/combien-de-temps-vendre-appartement-92" },
          { label: "DPE F ou G : quel impact sur le prix ?", to: "/guide-immobilier/fiscalite-juridique/dpe-f-g-impact-prix" },
        ],
      },
    ],
    faq: [
      {
        q: "Le marché immobilier du 92 va-t-il baisser en 2026 ?",
        a: "Non, la phase baissière est terminée depuis début 2025. Le marché est aujourd'hui en légère hausse (+ 1 à + 3 % selon les villes), avec une segmentation forte entre biens bien notés au DPE (qui montent) et passoires thermiques (qui continuent de décoter).",
      },
      {
        q: "Quelle ville du 92 offre le meilleur rapport qualité-prix en 2026 ?",
        a: "Issy-les-Moulineaux et Courbevoie offrent aujourd'hui le meilleur ratio prix / potentiel, avec l'arrivée du Grand Paris Express qui tire les prix à horizon 2028. Levallois reste un bon compromis pour ceux qui veulent la proximité immédiate de Paris.",
      },
      {
        q: "Quel impact aura la ligne 15 du Grand Paris Express sur les prix ?",
        a: "Les communes desservies (Issy, Châtillon, Bagneux, Malakoff) enregistrent déjà une prime de 4 à 6 % dans les zones proches des futures stations. Cette prime devrait s'amplifier à mesure qu'on approche de la mise en service prévue en 2028.",
      },
      {
        q: "Combien de temps faut-il pour vendre dans le 92 en 2026 ?",
        a: "Entre 45 et 75 jours pour un bien correctement estimé et bien présenté, selon la ville et le type de bien. Les biens surcotés ou mal notés au DPE peuvent rester 4 à 6 mois en vente.",
      },
      {
        q: "Les taux de crédit vont-ils continuer à baisser ?",
        a: "La tendance actuelle (mi-2026) est à la stabilisation autour de 3,2 % sur 20 ans, après une baisse continue depuis mi-2025. Les prévisions des banques tablent sur une stabilité jusqu'à fin 2026, avec une possible détente supplémentaire début 2027.",
      },
    ],
  },

  // ============================================================
  // VENDRE — Article 4 : Délais
  // ============================================================
  {
    slug: "combien-de-temps-vendre-appartement-92",
    category: "vendre",
    title: "Combien de temps pour vendre un appartement dans le 92 en 2026 ?",
    metaTitle: "Délai de vente d'un appartement dans le 92 en 2026 | Emilio",
    metaDescription:
      "Combien de temps faut-il vraiment pour vendre un appartement dans les Hauts-de-Seine en 2026 ? Délais réels par ville et par type de bien. Analyse d'expert.",
    excerpt:
      "La question qui revient en premier chez tous les vendeurs. Voici les délais réellement observés en 2026, ville par ville et typologie par typologie.",
    readMinutes: 8,
    date: "2026-05-05",
    updated: "2026-07-01",
    keywords: [
      "délai vente appartement 92",
      "combien de temps pour vendre",
      "durée vente immobilier boulogne",
      "délai compromis vente",
      "temps vente immobilier 2026",
    ],
    sections: [
      {
        type: "p",
        text:
          "Un vendeur me disait la semaine dernière : « J'ai lu partout qu'un appartement se vend en un mois aujourd'hui. Le mien est en ligne depuis 3 mois et je n'ai eu que 4 visites. » Cette phrase résume assez bien le décalage entre les moyennes qu'on lit dans la presse et la réalité du terrain.",
      },
      {
        type: "p",
        text:
          "La bonne question n'est pas « combien de temps pour vendre » mais « combien de temps pour vendre au bon prix ». Un bien peut se signer en 8 jours si vous le sous-évaluez de 10 %. Il peut aussi rester 6 mois si vous le surévaluez de 8 %. La vraie mesure d'un marché, ce n'est pas la vitesse : c'est la corrélation entre le prix affiché et le prix signé.",
      },
      { type: "h2", text: "Les vrais délais en 2026" },
      {
        type: "p",
        text:
          "En 2026, le délai moyen de vente dans les Hauts-de-Seine se situe entre 55 et 90 jours entre la mise en ligne et la signature du compromis. À cela s'ajoutent 2,5 à 3 mois entre le compromis et l'acte définitif chez le notaire. Compter donc entre 4,5 et 6 mois du début à la fin — parfois davantage si un droit de préemption s'applique ou si l'acquéreur rencontre des difficultés bancaires.",
      },
      {
        type: "table",
        headers: ["Type de bien", "Délai compromis", "Délai total"],
        rows: [
          ["Studio / T2", "40 – 60 jours", "4 – 5 mois"],
          ["T3", "50 – 75 jours", "5 mois"],
          ["T4 familial", "45 – 70 jours", "5 mois"],
          ["T5+ / atypique", "80 – 150 jours", "6 – 8 mois"],
          ["Bien avec DPE F/G", "+ 30 à 60 jours vs équivalent D", "—"],
        ],
      },
      { type: "h2", text: "Pourquoi tant d'écart d'un bien à l'autre ?" },
      {
        type: "p",
        text:
          "Trois facteurs expliquent 80 % des différences de délai : le prix d'entrée, la qualité de présentation, la ville. Un bien surcoté de 8 % au départ met en moyenne 40 jours de plus à se vendre — et se vend au final au même prix qu'un bien correctement positionné dès le début. La leçon est simple : la surcote fait perdre du temps, pas gagner de l'argent.",
      },
      { type: "h3", text: "Le rôle de la photographie" },
      {
        type: "p",
        text:
          "J'ai suivi cette année deux mandats identiques (même immeuble, même surface, même étage), l'un présenté avec des photos amateur au smartphone, l'autre avec un shooting professionnel. Le premier a mis 4 mois et a été bradé de 6 %. Le second est parti en 3 semaines au prix demandé. Ce n'est pas anecdotique — c'est structurel : sur un portail, une annonce se joue en 3 secondes, et les 3 premières photos font 80 % du travail.",
      },
      { type: "h3", text: "Le rôle de l'estimation initiale" },
      {
        type: "p",
        text:
          "Un bien affiché 5 % au-dessus du marché reçoit 2 à 3 fois moins de contacts qu'un bien correctement positionné. C'est un effet mécanique des algorithmes de portails (SeLoger, Bien'ici) qui priorisent l'affichage en fonction du prix relatif. Résultat : moins de visites, moins d'offres, une négociation finale plus dure.",
      },
      { type: "h2", text: "La courbe d'attractivité d'une annonce" },
      {
        type: "p",
        text:
          "Il faut la connaître : une annonce reçoit 70 % de ses contacts totaux dans les 15 premiers jours de mise en ligne. Passé 30 jours, elle est considérée par les acquéreurs comme « en difficulté », ce qui déclenche automatiquement des offres à la baisse. Passé 60 jours, elle est presque invisible. Cette réalité algorithmique explique pourquoi un prix mal positionné au départ est presque impossible à rattraper — même avec une baisse ultérieure.",
      },
      { type: "h2", text: "Les délais qui n'apparaissent jamais dans les statistiques" },
      {
        type: "list",
        items: [
          "Diagnostics techniques (DPE, amiante, plomb...) : 1 à 3 semaines à prévoir avant la mise en ligne.",
          "Levée des conditions suspensives par la banque de l'acquéreur : 45 à 60 jours après compromis.",
          "Purge du droit de préemption urbain (mairie) : 2 mois systématiques.",
          "Assemblée de copropriété à passer : peut décaler la vente de 1 à 2 mois si travaux à voter.",
          "Attente du notaire pour rassembler les pièces cadastrales et hypothécaires : 2 à 4 semaines supplémentaires.",
        ],
      },
      { type: "h2", text: "Étude de cas : trois délais très différents dans le même immeuble" },
      {
        type: "p",
        text:
          "Immeuble haussmannien à Levallois, mêmes surfaces (~65 m²), même étage, orientations similaires. Bien A : affiché à 665 000 € (marché), vendu en 28 jours à 655 000 €. Bien B : affiché à 720 000 € (surévalué de 8 %), 3 baisses successives, vendu 4,5 mois plus tard à 640 000 €. Bien C : off-market à 685 000 €, vendu en 12 jours au prix demandé grâce à un acquéreur pré-qualifié.",
      },
      {
        type: "p",
        text:
          "Trois logiques, trois délais, trois prix finaux. Le bien A a maximisé son délai/prix. Le bien B a perdu du temps ET de l'argent. Le bien C a maximisé le prix grâce à la préparation du réseau acquéreurs.",
      },
      {
        type: "callout",
        title: "Vendre vite sans brader : c'est possible ?",
        text:
          "Oui, mais à trois conditions cumulatives. Un prix ajusté au marché du moment (pas au prix rêvé), un dossier complet dès le J1 (diagnostics, PV d'AG, charges), et une stratégie de mise en marché différenciée selon la cible (portails grand public vs off-market ciblé pour le haut de gamme).",
      },
      {
        type: "links",
        title: "Pour aller plus loin",
        items: [
          { label: "Les 7 critères qui font monter le prix de vente", to: "/guide-immobilier/vendre/7-criteres-prix-vente" },
          { label: "Vendre off-market : mode d'emploi", to: "/guide-immobilier/vendre/vendre-off-market" },
          { label: "Marché immobilier 92 en 2026 : tendances", to: "/guide-immobilier/prix-marche/marche-immobilier-92-2026" },
          { label: "DPE F ou G : quel impact sur le prix ?", to: "/guide-immobilier/fiscalite-juridique/dpe-f-g-impact-prix" },
        ],
      },
    ],
    faq: [
      {
        q: "Combien de temps faut-il pour vendre un appartement dans le 92 ?",
        a: "En 2026, comptez 55 à 90 jours entre la mise en ligne et le compromis pour un bien correctement estimé, puis 2,5 à 3 mois entre le compromis et l'acte définitif. Total : 4,5 à 6 mois du début à la fin.",
      },
      {
        q: "Peut-on vendre un appartement en moins d'un mois ?",
        a: "Oui, mais seulement dans deux cas : soit le bien est sous-évalué (perte de valeur pour le vendeur), soit il est vendu off-market à un acquéreur pré-qualifié dans le fichier de l'agence. En vente publique classique au juste prix, comptez au minimum 6 à 8 semaines.",
      },
      {
        q: "Combien de temps entre le compromis et l'acte de vente ?",
        a: "Généralement 2,5 à 3 mois. Ce délai comprend la levée des conditions suspensives (financement de l'acquéreur, 45-60 jours), la purge du droit de préemption urbain (2 mois), et la rédaction de l'acte par le notaire.",
      },
      {
        q: "Un bien surcoté peut-il se vendre quand même ?",
        a: "Souvent oui, mais après un délai plus long (3 à 6 mois) et généralement après une ou plusieurs baisses de prix. Il finit presque toujours par se vendre au niveau du marché initial — la surcote fait perdre du temps, pas gagner de l'argent.",
      },
      {
        q: "Pourquoi mon appartement ne se vend-il pas ?",
        a: "Dans 80 % des cas, c'est un prix mal positionné ou une présentation insuffisante (photos, home staging, dossier technique incomplet). Dans les 20 % restants, c'est un défaut structurel du bien (DPE F/G, copropriété en difficulté, exposition médiocre) qu'il faut assumer dans le prix.",
      },
    ],
  },

  // ============================================================
  // VENDRE — Article 5 : Off-market
  // ============================================================
  {
    slug: "vendre-off-market",
    category: "vendre",
    title: "Vendre off-market : pourquoi, pour qui, et à quel prix ?",
    metaTitle: "Vendre off-market : mode d'emploi pour les biens premium | Emilio",
    metaDescription:
      "Vendre son appartement off-market : à qui s'adresse cette stratégie confidentielle, comment ça se déroule, et pourquoi elle sécurise souvent le prix.",
    excerpt:
      "Vendre sans annonce publique, sans photo sur Internet, sans passage sur les portails. C'est ce qu'on appelle l'off-market. Voici quand cette stratégie a vraiment du sens.",
    readMinutes: 8,
    date: "2026-05-18",
    updated: "2026-07-01",
    keywords: [
      "vendre off market",
      "vente confidentielle immobilier",
      "vente immobilière discrète",
      "off market paris",
      "vendre appartement sans annonce",
    ],
    sections: [
      {
        type: "p",
        text:
          "L'off-market, c'est vendre sans passer par la vitrine. Pas d'annonce sur SeLoger, pas de photos publiques, pas de visites dominicales grand public. Le bien est présenté à un cercle restreint d'acquéreurs pré-qualifiés, souvent via le réseau personnel du conseiller. Ce n'est ni un secret, ni un caprice : c'est une méthode de commercialisation à part entière, avec sa logique, son public, et ses règles.",
      },
      { type: "h2", text: "Pour qui l'off-market a-t-il vraiment du sens ?" },
      {
        type: "p",
        text:
          "Contrairement à ce qu'on entend parfois, l'off-market n'est pas réservé aux hôtels particuliers à 15 M€. Il devient pertinent dès qu'un vendeur a une bonne raison de vouloir garder la discrétion : divorce, succession, mutation professionnelle, personnalité publique, ou simplement bien exceptionnel qu'on ne veut pas voir dévalorisé par un affichage grand public.",
      },
      {
        type: "list",
        items: [
          "Biens à plus de 1,5 M€ dans le 92 ou Paris Ouest.",
          "Vendeurs souhaitant garder leur projet confidentiel (vie professionnelle, vie de famille).",
          "Biens atypiques ou d'exception, difficiles à photographier pour un portail grand public.",
          "Vendeurs qui refusent le défilé de visites et préfèrent 3 à 5 acquéreurs sérieux.",
          "Successions ou divorces où la discrétion est une condition posée par le vendeur.",
          "Biens loués, pour ne pas déranger le locataire pendant la commercialisation.",
        ],
      },
      { type: "h2", text: "Comment ça se passe concrètement" },
      {
        type: "p",
        text:
          "La première étape reste la même que pour une vente classique : estimation sérieuse, préparation du dossier technique, choix d'un prix d'entrée. La différence commence à la mise en marché. Au lieu de publier une annonce, nous activons notre carnet d'acquéreurs actifs — ceux qui ont un mandat de recherche en cours dans le secteur et le budget qui correspond.",
      },
      {
        type: "p",
        text:
          "Concrètement, sur un bien à 2,4 M€ à Neuilly, on peut identifier en 48 heures 6 à 10 acquéreurs sérieux dans notre base, plus autant chez nos confrères partenaires. Le bien est présenté en petit comité, souvent en semaine, avec un descriptif détaillé mais sans identification publique de l'adresse. Chaque visite est individuelle, précédée d'un entretien de qualification.",
      },
      { type: "h3", text: "Les étapes détaillées d'une vente off-market réussie" },
      {
        type: "list",
        items: [
          "Semaine 1 : estimation contradictoire sur place + rédaction d'un dossier de présentation professionnel (photos, plans, DPE, PV d'AG).",
          "Semaine 2 : identification et qualification téléphonique de 8 à 15 acquéreurs pertinents (mandat, budget, timing).",
          "Semaines 3 à 5 : visites individuelles, retours d'informations, ajustements éventuels de positionnement.",
          "Semaines 6 à 8 : réception des offres, négociation, choix de l'acquéreur, signature du compromis.",
          "Puis délais classiques post-compromis (2,5 à 3 mois jusqu'à l'acte).",
        ],
      },
      { type: "h2", text: "Le mythe du « prix off-market plus bas »" },
      {
        type: "p",
        text:
          "On entend parfois qu'un bien vendu off-market se vend « moins cher » puisqu'il n'y a pas de mise en concurrence publique. Mon expérience dit exactement l'inverse. Sur les mandats que je gère, les biens vendus off-market se signent en moyenne à 98,5 % du prix affiché, contre 96,5 % pour les biens en vente publique. Pourquoi ? Parce qu'un acquéreur pré-qualifié qui a la chance d'accéder à un bien confidentiel négocie moins agressivement que quelqu'un qui a vu le bien traîner trois mois sur les portails.",
      },
      {
        type: "p",
        text:
          "L'autre effet, plus subtil : un bien qui n'a jamais été « affiché » garde une part de mystère et d'exclusivité, ce qui joue psychologiquement en faveur du vendeur. À l'inverse, un bien qui a stagné 3 mois sur un portail est perçu comme « brûlé » — même s'il baisse ensuite son prix, il traîne cette réputation.",
      },
      { type: "h2", text: "Étude de cas : un T5 vendu off-market à Boulogne-Nord" },
      {
        type: "p",
        text:
          "Bien 145 m², triangle Rothschild, 4 chambres, terrasse 12 m². Vendeur en mutation professionnelle à Londres, contrainte de discrétion vis-à-vis de son employeur. Estimation à 1,72 M€. Mise en marché off-market en février 2026 : présentation à 7 familles pré-qualifiées venant principalement du 16ᵉ. 4 visites, 2 offres. Signature du compromis 4 semaines après le mandat, à 1,70 M€ (98,8 % du prix demandé). Aucune annonce publique, zéro exposition de l'adresse.",
      },
      {
        type: "callout",
        title: "Off-market ≠ absence de méthode",
        text:
          "L'off-market ne fonctionne que si le conseiller dispose d'un vrai fichier acquéreurs actifs et qualifiés. Sans ça, ce n'est pas de la vente confidentielle, c'est juste une vente ratée. Posez toujours la question : combien d'acquéreurs actifs dans mon budget et mon secteur avez-vous en portefeuille aujourd'hui ?",
      },
      { type: "h2", text: "Quand ne pas choisir l'off-market" },
      {
        type: "p",
        text:
          "L'off-market n'est pas toujours la bonne stratégie. Pour un studio ou un T2 dans une ville très demandée (Levallois, Issy), la mise en concurrence publique génère une émulation entre acquéreurs qui peut faire monter le prix de 2 à 4 %. Pour un bien standard, un DPE moyen, une adresse sans particularité : la vente publique reste souvent le meilleur choix.",
      },
      {
        type: "links",
        title: "Pour aller plus loin",
        items: [
          { label: "Combien de temps pour vendre dans le 92 ?", to: "/guide-immobilier/vendre/combien-de-temps-vendre-appartement-92" },
          { label: "Les 7 critères qui font monter le prix", to: "/guide-immobilier/vendre/7-criteres-prix-vente" },
          { label: "Prix au m² à Neuilly-sur-Seine 2026", to: "/guide-immobilier/prix-marche/prix-m2-neuilly-sur-seine-2026" },
        ],
      },
    ],
    faq: [
      {
        q: "Qu'est-ce que la vente off-market en immobilier ?",
        a: "C'est vendre un bien sans annonce publique ni photos en ligne. Le bien est présenté uniquement à un cercle d'acquéreurs pré-qualifiés issus du fichier de l'agence. Idéal pour les biens haut de gamme ou les vendeurs qui souhaitent la discrétion.",
      },
      {
        q: "Vend-on moins cher en off-market ?",
        a: "Non, généralement le contraire. Sur nos mandats, les ventes off-market se signent en moyenne à 98,5 % du prix affiché, contre 96,5 % pour les ventes publiques. Un acquéreur pré-qualifié négocie moins agressivement qu'un acquéreur qui a vu un bien traîner en ligne.",
      },
      {
        q: "À partir de quel prix l'off-market a-t-il du sens ?",
        a: "Généralement à partir de 1,5 M€ dans le 92 ou Paris Ouest. En dessous, une vente publique classique génère souvent une meilleure émulation entre acquéreurs. Au-dessus, la discrétion et le ciblage priment.",
      },
      {
        q: "Comment savoir si mon bien peut se vendre off-market ?",
        a: "Un bon indicateur : le nombre d'acquéreurs actifs dans notre fichier qui correspondent au profil de votre bien. Avant de vous proposer une stratégie off-market, nous vérifions concrètement combien de personnes pourraient être sollicitées dans les 15 jours.",
      },
      {
        q: "Combien de temps prend une vente off-market ?",
        a: "Généralement 3 à 8 semaines entre le mandat et le compromis, si le bien est bien estimé et le fichier acquéreurs actif. Puis les délais post-compromis classiques (2,5 à 3 mois jusqu'à l'acte définitif).",
      },
    ],
  },

  // ============================================================
  // VENDRE — Article 6 : 7 critères
  // ============================================================
  {
    slug: "7-criteres-prix-vente",
    category: "vendre",
    title: "Les 7 critères qui font vraiment monter le prix de vente de votre appartement",
    metaTitle: "7 critères qui font monter le prix de vente d'un appartement | Emilio",
    metaDescription:
      "Étage, exposition, DPE, copropriété, agencement : les 7 critères qui déterminent vraiment le prix de vente d'un appartement en 2026. Analyse concrète.",
    excerpt:
      "À surface et quartier identiques, deux appartements peuvent se vendre avec 20 % d'écart. Voici les 7 critères qui expliquent presque toute la différence.",
    readMinutes: 9,
    date: "2026-05-27",
    updated: "2026-07-01",
    keywords: [
      "critères prix vente appartement",
      "quoi valorise un appartement",
      "estimation appartement critères",
      "valeur appartement paris",
      "augmenter valeur bien immobilier",
    ],
    sections: [
      {
        type: "p",
        text:
          "Quand j'explique à un vendeur que son appartement vaut 20 % de plus ou de moins que celui d'à côté, à surface égale, la réaction est souvent la même : « Mais on est dans le même immeuble ! ». C'est justement ce qui rend le métier passionnant : la valeur d'un bien ne se résume jamais à l'adresse. Voici les 7 critères qui, ensemble, expliquent 90 % de l'écart de prix entre deux biens du même immeuble.",
      },
      { type: "h2", text: "1. L'étage et l'ascenseur" },
      {
        type: "p",
        text:
          "Entre un rez-de-chaussée et un dernier étage bien exposé, dans le même immeuble, l'écart peut atteindre 15 %. L'absence d'ascenseur au-dessus du 3ᵉ étage retire mécaniquement 5 à 8 % du prix. À l'inverse, un dernier étage avec vue dégagée ajoute 5 à 10 %. Attention aux idées reçues : à Paris intra-muros, un rez-de-chaussée sur cour arborée peut se vendre au prix du marché s'il est calme et lumineux — l'étage est un critère, pas un dogme.",
      },
      { type: "h2", text: "2. L'exposition et la luminosité" },
      {
        type: "p",
        text:
          "Un bien traversant Est-Ouest ou Sud est un argument majeur à Paris. Un appartement plein Nord sans double exposition se négocie entre 4 et 7 % en dessous d'un équivalent bien exposé. Les acquéreurs, en 2026, ne transigent plus sur la lumière. Un test simple pour un vendeur : combien de photos de votre annonce ont été prises en journée avec une vraie lumière naturelle ? Si la réponse est « moins de la moitié », vous avez un problème d'exposition — ou de photographe.",
      },
      { type: "h2", text: "3. La performance énergétique (DPE)" },
      {
        type: "p",
        text:
          "Le DPE est devenu, en 3 ans, l'un des tout premiers critères de négociation. Un bien classé F ou G subit aujourd'hui une décote moyenne de 10 à 15 % dans le 92, et de 8 à 12 % à Paris Ouest. À l'inverse, un logement classé C ou mieux (rare dans l'ancien haussmannien) peut se vendre 3 à 5 % au-dessus du marché. Pour approfondir ce point critique, consultez notre article dédié : DPE F ou G : quel impact réel sur votre prix ?",
      },
      { type: "h2", text: "4. L'état de la copropriété" },
      {
        type: "p",
        text:
          "Une copropriété saine (charges maîtrisées, ravalement à jour, fonds travaux constitué) vaut de l'or. À l'inverse, une AG qui vote 80 000 € de travaux d'ascenseur peut faire chuter le prix de vente de 10 000 à 30 000 € du jour au lendemain, car l'acquéreur intègre cette dépense dans sa négociation. Le point capital : fournir dès la première visite les 3 derniers PV d'AG et l'état daté avec les provisions. Un dossier transparent rassure ; un dossier flou fait fuir.",
      },
      { type: "h2", text: "5. L'agencement et la modularité" },
      {
        type: "p",
        text:
          "Un T3 avec deux vraies chambres se vend nettement mieux qu'un T3 avec une chambre et un salon en enfilade impossible à cloisonner. La modularité est particulièrement recherchée depuis le télétravail : un espace bureau, même petit, ajoute une vraie valeur. Un plan intelligent, avec circulation fluide et pièces bien dimensionnées, peut valoir 5 à 8 % de plus qu'un plan mal fichu à surface équivalente.",
      },
      { type: "h2", text: "6. Les extérieurs" },
      {
        type: "p",
        text:
          "Un balcon de 4 m² apporte 3 à 5 % de valeur. Une terrasse de 20 m² dans Paris intra-muros peut valoir plus que 30 m² intérieurs supplémentaires. Cette prime aux extérieurs, née pendant les confinements, ne s'est jamais démentie depuis. Un jardin privatif ou un accès à un jardin de copropriété entretenu ajoute 2 à 4 % supplémentaires.",
      },
      { type: "h2", text: "7. La vue et le calme" },
      {
        type: "p",
        text:
          "Deux critères souvent minimisés, à tort. Un appartement donnant sur une cour intérieure calme se vend 4 à 6 % plus cher qu'un équivalent sur rue passante. Une vue dégagée (jardin, monument, Seine) peut valoir jusqu'à 10 %. À l'inverse, un vis-à-vis à moins de 10 mètres retire systématiquement 3 à 5 %.",
      },
      { type: "h2", text: "L'effet cumulé : un exemple concret" },
      {
        type: "table",
        headers: ["Bien", "Étage", "Exposition", "DPE", "Extérieur", "Prix / m²"],
        rows: [
          ["A", "5ᵉ avec asc.", "Traversant S-N", "D", "Balcon 5 m²", "10 200 €"],
          ["B", "2ᵉ sans asc.", "Nord seul", "F", "Aucun", "8 400 €"],
        ],
      },
      {
        type: "p",
        text:
          "Même immeuble, même surface (72 m²), même quartier boulonnais : 21 % d'écart de prix au m². Sur un T3, ça représente 130 000 € de différence. Voilà pourquoi une estimation sérieuse ne se fait jamais sur un simple calcul « prix moyen × surface ».",
      },
      {
        type: "callout",
        title: "Le calcul rapide",
        text:
          "Sur un appartement à 1 M€, un bon DPE + une belle exposition + un balcon peuvent représenter facilement 80 000 à 120 000 € de plus-value réelle par rapport à un bien équivalent moins bien noté sur ces critères. C'est là que se joue le vrai prix de vente.",
      },
      { type: "h2", text: "Les 3 leviers qu'un vendeur peut activer avant la mise en vente" },
      {
        type: "list",
        items: [
          "Rafraîchir : peinture neutre, sols nettoyés, cuisine désencombrée. Investissement moyen : 3 000 à 8 000 €. ROI moyen : × 3 à × 5.",
          "Refaire le DPE s'il a plus de 5 ans (parfois surprise favorable).",
          "Home staging léger : location de meubles pour dépersonnaliser. Investissement 1 500 à 3 000 €. Effet mesurable sur le délai de vente (–30 % en moyenne).",
        ],
      },
      {
        type: "links",
        title: "Pour aller plus loin",
        items: [
          { label: "DPE F ou G : quel impact sur le prix ?", to: "/guide-immobilier/fiscalite-juridique/dpe-f-g-impact-prix" },
          { label: "Combien de temps pour vendre dans le 92 ?", to: "/guide-immobilier/vendre/combien-de-temps-vendre-appartement-92" },
          { label: "Vendre off-market : mode d'emploi", to: "/guide-immobilier/vendre/vendre-off-market" },
        ],
      },
    ],
    faq: [
      {
        q: "Quels sont les critères qui font le plus monter le prix d'un appartement ?",
        a: "Dans l'ordre d'impact en 2026 : le DPE (jusqu'à ±15 %), l'étage et l'exposition (jusqu'à ±15 %), la vue et le calme (jusqu'à ±10 %), les extérieurs (jusqu'à +8 %), l'état de la copropriété, l'agencement intérieur, et enfin la modularité (télétravail).",
      },
      {
        q: "Refaire la cuisine augmente-t-il vraiment le prix de vente ?",
        a: "Oui, mais pas toujours dans les proportions espérées. Une cuisine refaite ajoute en moyenne 60 à 80 % de son coût au prix de vente si elle est neutre et bien intégrée. En revanche, une cuisine très personnalisée (couleur vive, matériaux atypiques) peut ne rien ajouter voire freiner la vente.",
      },
      {
        q: "Un balcon fait-il vraiment monter le prix ?",
        a: "Oui. Un balcon de 3-5 m² ajoute 3 à 5 % de valeur. Une terrasse de 15 à 20 m² dans Paris intra-muros peut valoir plus que 30 m² intérieurs supplémentaires — c'est un vrai atout de valorisation.",
      },
      {
        q: "Faut-il faire du home staging avant de vendre ?",
        a: "Sur un bien standard, oui : un home staging léger (1 500 à 3 000 €) réduit en moyenne de 30 % le délai de vente et améliore le prix final de 2 à 4 %. Sur un bien haut de gamme, faites appel à un professionnel plutôt qu'à une solution grand public.",
      },
      {
        q: "Un DPE F ou G peut-il vraiment faire perdre 15 % ?",
        a: "Oui, c'est la décote moyenne observée en 2026 dans le 92 sur un bien classé F ou G par rapport à un équivalent classé D. Cette décote reflète autant le coût des travaux à venir que l'interdiction progressive de location (G en 2025, F en 2028).",
      },
    ],
  },

  // ============================================================
  // ACHETER — Article 7 : Boulogne ou Neuilly
  // ============================================================
  {
    slug: "boulogne-ou-neuilly-2026",
    category: "acheter",
    title: "Boulogne ou Neuilly : lequel choisir pour investir en 2026 ?",
    metaTitle: "Boulogne ou Neuilly : quelle ville choisir en 2026 ? | Emilio",
    metaDescription:
      "Boulogne-Billancourt ou Neuilly-sur-Seine : comparaison honnête pour choisir la bonne ville en 2026. Prix, cadre de vie, revente, écoles.",
    excerpt:
      "Deux villes voisines, deux marchés très différents. On m'oppose ces deux communes chaque semaine dans les entretiens d'acquéreurs. Voici comment je les compare vraiment.",
    readMinutes: 9,
    date: "2026-06-02",
    updated: "2026-07-01",
    keywords: [
      "boulogne ou neuilly",
      "vivre boulogne neuilly",
      "investir boulogne neuilly",
      "comparaison boulogne neuilly",
      "acheter appartement boulogne ou neuilly",
    ],
    sections: [
      {
        type: "p",
        text:
          "« Vous nous conseilleriez plutôt Boulogne ou Neuilly ? ». Cette question, on nous la pose au moins trois fois par mois. La réponse honnête dépend de ce que vous cherchez vraiment — et rarement de la seule question du prix. Les deux villes ont chacune une identité forte, un tissu social distinct, une dynamique de marché différente. Voici un comparatif structuré, sans langue de bois.",
      },
      { type: "h2", text: "Le match des prix" },
      {
        type: "p",
        text:
          "Neuilly reste 25 à 30 % plus chère que Boulogne au m². Pour un 4 pièces familial de 100 m², cela représente environ 250 000 € de différence. C'est le premier arbitrage à faire : le même budget vous donne un T3 confortable à Neuilly-Sablonville ou un T4 avec balcon à Boulogne-Nord.",
      },
      { type: "h2", text: "Le cadre de vie" },
      {
        type: "p",
        text:
          "Neuilly a un côté « ville-résidence » assumé : peu de vie nocturne, beaucoup de commerces haut de gamme, une clientèle plutôt patrimoniale. Boulogne, surtout depuis le renouveau du Trapèze et de l'Île Seguin, offre une vie de quartier plus animée, plus jeune, avec un vrai centre-ville commerçant autour de la mairie. Les jeunes couples ou familles qui viennent d'un arrondissement vivant (10ᵉ, 11ᵉ, 17ᵉ Batignolles) se sentent souvent plus vite chez eux à Boulogne.",
      },
      { type: "h2", text: "Les écoles" },
      {
        type: "p",
        text:
          "Match nul, mais pour des raisons différentes. Neuilly attire pour ses grands établissements privés (Sainte-Croix, Saint-Dominique, Pasteur). Boulogne joue plutôt sur l'excellence de son public (Jean-Renoir, Landowski) et son offre bilingue développée ces dernières années. Chaque famille tranche selon ses convictions — public ou privé, laïque ou confessionnel.",
      },
      { type: "h2", text: "Les transports" },
      {
        type: "p",
        text:
          "Boulogne bénéficie de la ligne 9 et 10 très bien maillées, plus le T3 en surface. Neuilly a le grand mérite d'avoir la ligne 1, la plus fiable du réseau, qui vous met à la Défense en 6 minutes ou à Châtelet en 12. Pour un actif travaillant à Paris centre, la ligne 1 fait souvent pencher la balance. Boulogne va gagner un atout majeur en 2028 avec la ligne 15 du Grand Paris Express (station Pont-de-Sèvres).",
      },
      { type: "h2", text: "Les espaces verts et la Seine" },
      {
        type: "p",
        text:
          "Neuilly a l'ouverture directe sur le Bois de Boulogne et le parc de Bagatelle. Boulogne a l'Île Seguin (aujourd'hui aménagée), les berges de Seine, le Parc Rothschild et surtout le Parc de Boulogne (partagé avec Paris 16). Différence de style : Neuilly est plus « britannique » (pelouses tondues, clubs privés), Boulogne plus « urbain » (berges, quais, cafés). À chacun sa préférence.",
      },
      { type: "h2", text: "La revente à 5 ans : où va-t-on gagner ?" },
      {
        type: "p",
        text:
          "C'est là que mon avis diverge un peu du consensus. Neuilly est un marché mature, très stable, avec peu de potentiel d'appréciation à court terme. Boulogne, notamment dans les secteurs en transformation (Île Seguin, Trapèze, Point du Jour), offre un potentiel de plus-value plus intéressant sur 5-10 ans. Pour un profil investisseur, Boulogne l'emporte souvent. Pour un profil patrimonial ou résidence principale à long terme, Neuilly reste imbattable en termes de tenue de valeur.",
      },
      {
        type: "table",
        headers: ["Critère", "Neuilly", "Boulogne"],
        rows: [
          ["Prix moyen / m²", "11 800 €", "9 400 €"],
          ["Ambiance", "Résidentielle, haut de gamme", "Vivante, mixte"],
          ["Transports", "Ligne 1 (excellent)", "Lignes 9, 10, T3 + M15 en 2028"],
          ["Écoles", "Privé très fort", "Public solide + bilingue"],
          ["Potentiel d'appréciation", "Faible mais stable", "Modéré à fort selon secteur"],
          ["Cible acquéreur type", "Famille patrimoniale", "Famille active, investisseur"],
          ["Espaces verts", "Bois de Boulogne, Bagatelle", "Île Seguin, Berges de Seine, Rothschild"],
          ["Vie nocturne / restauration", "Discrète", "Dense et jeune"],
        ],
      },
      { type: "h2", text: "Pour un investisseur locatif : lequel choisir ?" },
      {
        type: "p",
        text:
          "Sur ce point, ma préférence va nettement à Boulogne. La rentabilité brute y est meilleure (3,2 à 3,8 % contre 2,6 à 3 % à Neuilly), la demande locative des jeunes actifs est forte, et le marché de la revente à moyen terme est plus dynamique. Neuilly reste un choix de préservation patrimoniale, pas de rendement.",
      },
      {
        type: "callout",
        title: "Notre recommandation en une phrase",
        text:
          "Neuilly pour préserver un patrimoine, Boulogne pour construire un patrimoine. Les deux se défendent, à condition de savoir ce qu'on cherche vraiment.",
      },
      {
        type: "links",
        title: "Pour aller plus loin",
        items: [
          { label: "Prix au m² à Boulogne en 2026", to: "/guide-immobilier/prix-marche/prix-m2-boulogne-billancourt-2026" },
          { label: "Prix au m² à Neuilly en 2026", to: "/guide-immobilier/prix-marche/prix-m2-neuilly-sur-seine-2026" },
          { label: "Marché immobilier 92 en 2026", to: "/guide-immobilier/prix-marche/marche-immobilier-92-2026" },
          { label: "Primo-accédant à Paris Ouest", to: "/guide-immobilier/acheter/primo-accedant-paris-ouest" },
        ],
      },
    ],
    faq: [
      {
        q: "Est-il plus intéressant d'acheter à Boulogne ou à Neuilly en 2026 ?",
        a: "Cela dépend de votre projet. Neuilly pour la tenue de valeur et le patrimoine long terme. Boulogne pour un meilleur rapport surface/prix, une vie de quartier plus dynamique, et un potentiel de plus-value plus important à horizon 5-10 ans.",
      },
      {
        q: "Quelle ville est la mieux desservie entre Boulogne et Neuilly ?",
        a: "Neuilly a un avantage aujourd'hui grâce à la ligne 1 (la plus fiable du réseau). Boulogne rattrape rapidement avec les lignes 9 et 10, le T3, et surtout la ligne 15 du Grand Paris Express attendue pour 2028.",
      },
      {
        q: "Quelle ville offre les meilleures écoles ?",
        a: "Match nul avec des logiques différentes. Neuilly domine sur le privé (Saint-Dominique, Sainte-Croix, Pasteur). Boulogne offre un public excellent (Jean-Renoir, Landowski) et une forte offre bilingue. Le choix dépend de votre préférence public/privé.",
      },
      {
        q: "Boulogne est-elle une bonne ville pour investir en locatif ?",
        a: "Oui, meilleure que Neuilly pour du locatif. Rentabilité brute autour de 3,2 à 3,8 % (contre 2,6 à 3 % à Neuilly), demande locative jeune active soutenue, marché de la revente dynamique.",
      },
      {
        q: "Combien coûte un T3 à Boulogne vs Neuilly ?",
        a: "Pour un T3 de 65 m² correct : environ 610 000 € à Boulogne, environ 770 000 € à Neuilly (mêmes prestations, prix moyens 2026). Soit une différence typique de 160 000 € pour le même type de bien.",
      },
    ],
  },

  // ============================================================
  // ACHETER — Article 8 : Primo-accédant
  // ============================================================
  {
    slug: "primo-accedant-paris-ouest",
    category: "acheter",
    title: "Primo-accédant à Paris Ouest en 2026 : nos conseils concrets",
    metaTitle: "Primo-accédant Paris Ouest : les vrais conseils en 2026 | Emilio",
    metaDescription:
      "Vous achetez votre premier appartement à Paris Ouest ou dans le 92 ? Nos conseils concrets pour bien préparer votre dossier et sécuriser votre acquisition.",
    excerpt:
      "Acheter son premier appartement dans l'Ouest parisien en 2026 est redevenu possible. À condition de préparer sérieusement quelques points souvent négligés.",
    readMinutes: 9,
    date: "2026-06-08",
    updated: "2026-07-01",
    keywords: [
      "primo accédant paris ouest",
      "premier achat immobilier boulogne",
      "acheter premier appartement 92",
      "conseils primo accédant 2026",
      "ptz zone a",
    ],
    sections: [
      {
        type: "p",
        text:
          "Depuis mi-2025, les primo-accédants sont revenus. Les taux d'emprunt sur 20 ans sont redescendus autour de 3,2 %, les prix se sont ajustés, et surtout, les banques ont assoupli leurs critères sur les dossiers solides. C'est une fenêtre à ne pas rater — mais elle demande méthode.",
      },
      { type: "h2", text: "1. Sécurisez votre financement avant de chercher" },
      {
        type: "p",
        text:
          "Trop de primo-accédants commencent à visiter avant d'avoir vu leur banquier. Résultat : on tombe amoureux d'un bien qu'on ne peut pas financer, ou on perd 15 jours à assembler un dossier alors qu'un autre acquéreur, préparé, signe à notre place. Prenez 2 rendez-vous : votre banque + un courtier. Vous saurez alors précisément votre enveloppe et vous pourrez vous positionner en 48 h.",
      },
      {
        type: "p",
        text:
          "Un accord de principe (« simulation d'offre ») établi par un courtier vaut plus qu'un discours. Sur un bien convoité à Boulogne ou Levallois, le vendeur préfèrera systématiquement une offre accompagnée d'une simulation à taux garanti, même si elle est légèrement inférieure à une offre floue plus élevée.",
      },
      { type: "h2", text: "2. Ne sous-estimez pas les frais annexes" },
      {
        type: "list",
        items: [
          "Frais de notaire : 7 à 8 % dans l'ancien, à financer sur apport personnel.",
          "Travaux : prévoir un budget « imprévu » de 10 à 15 % du prix d'achat.",
          "Frais bancaires : garantie, dossier, assurance (compter 1 à 1,5 % du montant emprunté).",
          "Copropriété : régularisation de charges à l'entrée + fonds travaux ALUR souvent oublié.",
          "Déménagement et petits travaux d'entrée : rarement moins de 3 000 €.",
        ],
      },
      { type: "h2", text: "3. Élargissez votre géographie" },
      {
        type: "p",
        text:
          "Un primo-accédant qui veut absolument Boulogne-Nord ou Neuilly-Sablonville avec un budget de 500 000 € va se heurter à une réalité de marché. À budget équivalent, regarder Issy-les-Moulineaux, Levallois-Perret ou même Courbevoie ouvre le champ des possibles : surface plus grande, extérieur, meilleur DPE. Une bonne acquisition, ce n'est pas forcément l'adresse la plus prestigieuse.",
      },
      {
        type: "table",
        headers: ["Ville", "Budget 500 000 €", "Surface typique", "DPE moyen"],
        rows: [
          ["Boulogne-Nord", "Petit T2", "35-40 m²", "E"],
          ["Boulogne-Sud", "T2 confortable", "45-50 m²", "D-E"],
          ["Issy-les-Moulineaux", "T3", "55-60 m²", "C-D"],
          ["Courbevoie", "Grand T3", "65-70 m²", "C-D"],
          ["Levallois", "T2 confortable", "45-50 m²", "D-E"],
        ],
      },
      { type: "h2", text: "4. Regardez le DPE avant tout" },
      {
        type: "p",
        text:
          "Une passoire thermique décotée de 15 % à l'achat peut sembler une bonne affaire. Elle ne l'est jamais. Entre les travaux de rénovation (30 000 à 60 000 € pour un T3), l'interdiction progressive de location, et la décote à la revente, vous perdez toujours. Privilégiez un bien classé D ou mieux, même 5 % plus cher.",
      },
      { type: "h2", text: "5. Ne cédez pas à l'urgence" },
      {
        type: "p",
        text:
          "Un bon appartement se voit deux fois. Les vendeurs ou agents qui vous mettent la pression (« il y a une autre offre ce soir, il faut décider maintenant ») déclenchent presque toujours une mauvaise décision. Prenez la nuit. Un bien qui vous échappe pour 24 heures de réflexion n'était probablement pas le bon.",
      },
      { type: "h2", text: "6. Utilisez le PTZ (prêt à taux zéro)" },
      {
        type: "p",
        text:
          "Bonne nouvelle 2026 : le PTZ a été étendu jusqu'à fin 2027 et couvre à nouveau les logements neufs comme anciens en zone A (ce qui inclut la majorité du 92 et Paris Ouest). Pour un couple sans enfant achetant à Boulogne dans l'ancien, le PTZ peut représenter jusqu'à 40 % du montant financé, soit 100 000 à 150 000 € sans intérêts. C'est un levier majeur, trop souvent oublié.",
      },
      { type: "h2", text: "7. Vérifiez la copropriété avant l'offre" },
      {
        type: "p",
        text:
          "Les 3 derniers PV d'AG, l'état daté et le carnet d'entretien vous racontent la vie de l'immeuble. Une copropriété avec de gros travaux votés (ravalement, ascenseur, chaufferie) ou en procédure contre un copropriétaire est un signal à prendre en compte. Demandez ces documents avant de signer une offre — pas après le compromis.",
      },
      {
        type: "callout",
        title: "Le mandat de recherche : un vrai atout pour un primo-accédant",
        text:
          "Confier votre recherche à un conseiller (moyennant honoraires) vous donne accès aux biens off-market, à un accompagnement dans la négociation et à un vrai gain de temps. Sur un premier achat, c'est souvent un investissement qui se rembourse par la qualité de la négociation obtenue.",
      },
      {
        type: "links",
        title: "Pour aller plus loin",
        items: [
          { label: "Boulogne ou Neuilly : lequel choisir ?", to: "/guide-immobilier/acheter/boulogne-ou-neuilly-2026" },
          { label: "Marché immobilier 92 en 2026", to: "/guide-immobilier/prix-marche/marche-immobilier-92-2026" },
          { label: "DPE F ou G : quel impact sur le prix ?", to: "/guide-immobilier/fiscalite-juridique/dpe-f-g-impact-prix" },
        ],
      },
    ],
    faq: [
      {
        q: "Quel budget pour un premier achat dans le 92 en 2026 ?",
        a: "Comptez au minimum 400 000 € pour un studio à Boulogne ou Levallois, 500 000 à 600 000 € pour un T2 correct, et 700 000 € pour un T3 dans les communes prisées. Ces prix baissent de 20 à 30 % en s'éloignant (Rueil, Nanterre, Courbevoie).",
      },
      {
        q: "Puis-je bénéficier du PTZ pour acheter dans le 92 ?",
        a: "Oui, le PTZ a été étendu jusqu'à fin 2027 pour l'ancien comme le neuf en zone A (ce qui inclut la majorité du 92 et Paris Ouest). Il peut représenter jusqu'à 40 % du montant financé sous conditions de ressources.",
      },
      {
        q: "Quel apport personnel est nécessaire en 2026 ?",
        a: "Les banques demandent en général 10 à 15 % du prix d'achat en apport, plus les frais de notaire (7-8 % dans l'ancien). Soit un apport minimal de 17 à 23 % du prix total pour un dossier standard. Certains courtiers montent des dossiers à 5 % pour les jeunes actifs à fort potentiel.",
      },
      {
        q: "Faut-il privilégier le neuf ou l'ancien pour un premier achat ?",
        a: "L'ancien reste globalement plus intéressant en 2026 (prix au m² plus bas, choix plus large, biens souvent mieux situés). Le neuf a l'avantage du DPE excellent et des frais de notaire réduits (2-3 %), mais les prix sont 15 à 20 % au-dessus de l'ancien équivalent.",
      },
      {
        q: "Est-ce le bon moment pour acheter en 2026 ?",
        a: "Oui, si votre projet est solide et votre financement bouclé. Les prix sont stables à légèrement haussiers, les taux redescendus autour de 3,2 %, le PTZ étendu. Attendre 6 mois ne changera pas grand-chose — le vrai bon moment, c'est quand vous êtes prêt.",
      },
    ],
  },

  // ============================================================
  // FISCALITÉ & JURIDIQUE — Article 9 : Plus-value
  // ============================================================
  {
    slug: "plus-value-immobiliere-2026",
    category: "fiscalite-juridique",
    title: "Plus-value immobilière en 2026 : calcul, abattements et exonérations",
    metaTitle: "Plus-value immobilière 2026 : calcul complet et exonérations | Emilio",
    metaDescription:
      "Comment est calculée la plus-value immobilière en 2026 ? Abattements par durée de détention, cas d'exonération, exemples chiffrés. Guide complet.",
    excerpt:
      "La plus-value immobilière fait peur, souvent à tort. Voici comment elle se calcule réellement en 2026 et dans quels cas vous en êtes totalement exonéré.",
    readMinutes: 10,
    date: "2026-04-22",
    updated: "2026-07-01",
    keywords: [
      "plus value immobilière 2026",
      "calcul plus value immobilière",
      "exonération plus value résidence secondaire",
      "abattement durée détention plus value",
      "surtaxe plus value",
    ],
    sections: [
      { type: "h2", text: "Le principe : quand la plus-value est-elle taxée ?" },
      {
        type: "p",
        text:
          "La plus-value immobilière, c'est simplement la différence entre le prix de vente et le prix d'acquisition d'un bien. Elle est taxée à 19 % au titre de l'impôt sur le revenu, plus 17,2 % de prélèvements sociaux, soit 36,2 % au total avant abattements. Bonne nouvelle : la résidence principale en est totalement exonérée. Cette taxe ne concerne donc que les résidences secondaires, les investissements locatifs, et les biens détenus en indivision suite à une succession.",
      },
      { type: "h2", text: "Le calcul de la plus-value taxable" },
      { type: "h3", text: "Prix d'acquisition majoré" },
      {
        type: "p",
        text:
          "Bonne nouvelle pour les vendeurs : le prix d'acquisition retenu n'est pas seulement le prix payé à l'origine. On peut y ajouter les frais de notaire (forfait de 7,5 % appliqué si les vraies factures ne sont pas retrouvées), les travaux réalisés (sur justificatifs, ou forfait de 15 % si le bien est détenu depuis plus de 5 ans), et certains frais annexes comme les commissions d'agence à l'achat.",
      },
      { type: "h3", text: "Prix de vente minoré" },
      {
        type: "p",
        text:
          "Symétriquement, on retire du prix de vente les frais liés à la vente : diagnostics, honoraires d'agence si à la charge du vendeur, frais de mainlevée d'hypothèque, éventuelle taxe sur le logement vacant.",
      },
      { type: "h2", text: "Les abattements par durée de détention" },
      {
        type: "p",
        text:
          "C'est le point clé. Plus vous détenez le bien longtemps, moins vous êtes taxé. Après 22 ans, vous êtes exonéré d'impôt sur le revenu. Après 30 ans, vous êtes également exonéré de prélèvements sociaux. Pour un bien acheté avant 1996, la vente est donc totalement défiscalisée.",
      },
      {
        type: "table",
        headers: ["Durée de détention", "Abattement impôt", "Abattement prélèvements sociaux"],
        rows: [
          ["Moins de 6 ans", "0 %", "0 %"],
          ["De 6 à 21 ans", "6 % par an", "1,65 % par an"],
          ["22ᵉ année", "4 %", "1,60 %"],
          ["22ᵉ année révolue", "100 % (exonération)", "9 %"],
          ["De 23 à 30 ans", "—", "9 % par an"],
          ["Au-delà de 30 ans", "—", "100 % (exonération totale)"],
        ],
      },
      { type: "h2", text: "Les cas d'exonération totale" },
      {
        type: "list",
        items: [
          "Résidence principale au jour de la vente : exonération intégrale.",
          "Première cession d'un logement autre que la résidence principale, sous condition de réemploi du prix dans l'achat de la RP dans les 24 mois.",
          "Cession inférieure à 15 000 € (peu courant).",
          "Vente par un retraité modeste ou une personne invalide (sous conditions de ressources).",
          "Cession à un organisme de logement social.",
          "Bien détenu depuis plus de 30 ans (exonération totale IR et PS).",
        ],
      },
      { type: "h2", text: "Un exemple concret complet" },
      {
        type: "p",
        text:
          "Vous vendez en 2026 un appartement à Boulogne acheté 380 000 € en 2010. Prix de vente : 720 000 €. Après application des forfaits (frais notaire 7,5 % + travaux 15 %), le prix d'acquisition retenu est de 466 500 €. Plus-value brute : 253 500 €. Durée de détention : 16 ans, soit un abattement de 66 % à l'IR et 18,15 % aux prélèvements sociaux.",
      },
      {
        type: "table",
        headers: ["Étape", "Calcul", "Montant"],
        rows: [
          ["Plus-value brute", "720 000 – 466 500", "253 500 €"],
          ["Base IR après abattement", "253 500 × 34 %", "86 190 €"],
          ["Impôt sur le revenu", "86 190 × 19 %", "16 376 €"],
          ["Base PS après abattement", "253 500 × 81,85 %", "207 470 €"],
          ["Prélèvements sociaux", "207 470 × 17,2 %", "35 685 €"],
          ["Total dû (hors surtaxe)", "16 376 + 35 685", "≈ 52 000 €"],
        ],
      },
      { type: "h2", text: "La surtaxe sur les grosses plus-values" },
      {
        type: "p",
        text:
          "Depuis 2013, une surtaxe s'applique sur les plus-values immobilières supérieures à 50 000 € (après abattements). Elle est progressive : 2 % pour les plus-values entre 50 001 et 100 000 €, jusqu'à 6 % au-delà de 260 000 €. Cette surtaxe ne s'applique pas à la résidence principale ni aux terrains à bâtir.",
      },
      {
        type: "table",
        headers: ["Plus-value taxable", "Taux de surtaxe"],
        rows: [
          ["50 001 à 100 000 €", "2 %"],
          ["100 001 à 150 000 €", "3 %"],
          ["150 001 à 200 000 €", "4 %"],
          ["200 001 à 260 000 €", "5 %"],
          ["Plus de 260 000 €", "6 %"],
        ],
      },
      { type: "h2", text: "Optimiser sa plus-value : 3 leviers légaux" },
      {
        type: "list",
        items: [
          "Rassembler toutes les factures de travaux (elles remplacent avantageusement le forfait de 15 % dès qu'elles dépassent ce seuil).",
          "Vérifier l'éligibilité au dispositif « première cession pour réemploi » si vous devenez primo-accédant à votre RP.",
          "Attendre le franchissement d'un seuil d'abattement (par exemple passer de 21 à 22 ans de détention) si votre horizon de vente est flexible.",
        ],
      },
      {
        type: "callout",
        title: "Notre conseil pratique",
        text:
          "Faites simuler votre plus-value AVANT de mettre en vente. Sur un investissement locatif détenu depuis 10-15 ans, la fiscalité peut représenter 60 000 à 120 000 € — un chiffre qui doit être intégré dans votre prix de vente cible.",
      },
      {
        type: "links",
        title: "Pour aller plus loin",
        items: [
          { label: "DPE F ou G : quel impact sur le prix ?", to: "/guide-immobilier/fiscalite-juridique/dpe-f-g-impact-prix" },
          { label: "Combien de temps pour vendre dans le 92 ?", to: "/guide-immobilier/vendre/combien-de-temps-vendre-appartement-92" },
          { label: "Vendre off-market : mode d'emploi", to: "/guide-immobilier/vendre/vendre-off-market" },
        ],
      },
    ],
    faq: [
      {
        q: "Suis-je taxé sur la plus-value de ma résidence principale ?",
        a: "Non. La vente de votre résidence principale est totalement exonérée de plus-value immobilière, quel que soit le montant du gain réalisé et la durée de détention. C'est le principal cas d'exonération.",
      },
      {
        q: "À partir de combien d'années la plus-value est-elle exonérée ?",
        a: "Après 22 ans de détention pour l'impôt sur le revenu (19 %), et après 30 ans pour les prélèvements sociaux (17,2 %). Un bien détenu depuis plus de 30 ans est donc totalement exonéré.",
      },
      {
        q: "Comment se calcule la plus-value immobilière en 2026 ?",
        a: "Prix de vente net (moins frais de vente) − prix d'acquisition majoré (plus frais de notaire 7,5 % forfait + travaux 15 % forfait après 5 ans, ou factures réelles). Sur le résultat, on applique 19 % d'IR + 17,2 % de PS, après abattements pour durée de détention.",
      },
      {
        q: "Qu'est-ce que la surtaxe sur les plus-values immobilières ?",
        a: "C'est une taxe supplémentaire progressive (2 à 6 %) qui s'applique aux plus-values imposables supérieures à 50 000 € après abattements. Elle ne concerne pas la résidence principale ni les terrains à bâtir.",
      },
      {
        q: "Puis-je déduire mes travaux du calcul de la plus-value ?",
        a: "Oui, sur justificatifs (factures d'entreprises), et à condition qu'il s'agisse de travaux d'amélioration ou de rénovation (pas d'entretien courant). Un forfait alternatif de 15 % du prix d'acquisition s'applique automatiquement si le bien est détenu depuis plus de 5 ans.",
      },
    ],
  },

  // ============================================================
  // FISCALITÉ & JURIDIQUE — Article 10 : DPE
  // ============================================================
  {
    slug: "dpe-f-g-impact-prix",
    category: "fiscalite-juridique",
    title: "DPE F ou G : quel impact réel sur votre prix de vente en 2026 ?",
    metaTitle: "Impact du DPE F ou G sur le prix de vente en 2026 | Emilio",
    metaDescription:
      "Votre appartement est classé F ou G au DPE ? Voici l'impact réel sur votre prix de vente en 2026, les obligations et les solutions concrètes.",
    excerpt:
      "Le DPE est devenu, en 3 ans, un critère aussi déterminant que le prix au m². Voici ce que vous risquez vraiment avec un F ou un G — et comment limiter la casse.",
    readMinutes: 9,
    date: "2026-05-01",
    updated: "2026-07-01",
    keywords: [
      "dpe f g impact prix",
      "décote dpe f g",
      "vendre passoire thermique 2026",
      "interdiction location dpe g",
      "renovation energetique appartement",
    ],
    sections: [
      {
        type: "p",
        text:
          "En 2020, personne ne regardait le DPE. En 2026, c'est la première question que pose un acquéreur avant même la visite. Le calendrier légal, combiné à la prise de conscience énergétique, a fait du DPE l'un des critères les plus discriminants du marché.",
      },
      { type: "h2", text: "Le calendrier légal à connaître" },
      {
        type: "list",
        items: [
          "Depuis le 1er janvier 2023 : interdiction de louer les logements classés G+ (au-dessus de 450 kWh/m²/an).",
          "Depuis le 1er janvier 2025 : interdiction totale de louer les logements classés G.",
          "1er janvier 2028 : interdiction de louer les logements classés F.",
          "1er janvier 2034 : interdiction de louer les logements classés E.",
        ],
      },
      {
        type: "p",
        text:
          "Ces échéances ne concernent que la location, pas la vente. Mais elles influencent massivement le marché acquéreur : un investisseur qui achète un G aujourd'hui sait qu'il ne pourra pas le louer sans travaux lourds. Un occupant qui achète un F sait qu'il devra rénover s'il souhaite un jour le louer.",
      },
      { type: "h2", text: "L'impact réel sur le prix de vente" },
      {
        type: "p",
        text:
          "Sur les mandats que nous conduisons dans le 92 et Paris Ouest en 2026, la décote observée est la suivante :",
      },
      {
        type: "table",
        headers: ["Classe DPE", "Décote moyenne vs classe D", "Impact en €/m² à Boulogne"],
        rows: [
          ["A / B", "+ 3 à + 5 %", "+ 280 à + 470 €"],
          ["C", "+ 1 à + 2 %", "+ 95 à + 190 €"],
          ["D", "Référence", "9 400 €"],
          ["E", "– 2 à – 4 %", "– 190 à – 375 €"],
          ["F", "– 8 à – 12 %", "– 750 à – 1 130 €"],
          ["G", "– 12 à – 18 %", "– 1 130 à – 1 690 €"],
        ],
      },
      { type: "h2", text: "Vendre en l'état ou rénover avant de vendre ?" },
      {
        type: "p",
        text:
          "C'est LA question. La réponse dépend de trois paramètres : le montant des travaux nécessaires pour passer de G à D, votre trésorerie disponible, et votre horizon de vente.",
      },
      { type: "h3", text: "Cas 1 : vous vendez dans les 3 mois" },
      {
        type: "p",
        text:
          "Ne rénovez pas. Une rénovation énergétique en copropriété prend 6 à 18 mois entre les devis, l'AG, l'exécution. Vendez au prix du marché avec la décote assumée, et fournissez à l'acquéreur des devis précis pour les travaux à prévoir. C'est plus honnête et souvent plus efficace.",
      },
      { type: "h3", text: "Cas 2 : vous avez 12 à 24 mois devant vous" },
      {
        type: "p",
        text:
          "La rénovation peut valoir le coup, surtout avec les aides MaPrimeRénov' toujours actives en 2026. Sur un T3 boulonnais classé G, passer à D peut coûter 25 000 € (dont 8 à 12 000 € d'aides) et faire gagner 40 à 60 000 € à la revente. Le retour sur investissement est réel.",
      },
      { type: "h3", text: "Cas 3 : vous êtes dans un immeuble ancien haussmannien" },
      {
        type: "p",
        text:
          "Là, c'est plus complexe. Les rénovations énergétiques lourdes (isolation extérieure interdite en site classé, planchers difficiles) sont techniquement limitées. Mieux vaut assumer la classe énergétique et cibler des acquéreurs qui recherchent le charme de l'ancien et n'en font pas leur premier critère.",
      },
      { type: "h2", text: "Les 5 travaux prioritaires pour gagner une classe DPE" },
      {
        type: "list",
        items: [
          "Changement des fenêtres pour du double vitrage haute performance (gain moyen 1 classe, coût 6 000 à 12 000 €).",
          "Isolation des combles ou du plafond (si dernier étage) : 3 000 à 6 000 €, gain 1 à 2 classes.",
          "Remplacement de la chaudière au fioul ou gaz vieillissante par une pompe à chaleur ou chaudière condensation (10 000 à 18 000 €, aidé jusqu'à 40 %).",
          "VMC hygroréglable : 2 000 à 4 000 €, améliore ventilation et note DPE.",
          "Isolation du plancher bas (garage, cave) : 3 000 à 8 000 €.",
        ],
      },
      { type: "h2", text: "Le cas particulier du DPE de plus de 10 ans" },
      {
        type: "p",
        text:
          "Un DPE de plus de 10 ans doit être refait obligatoirement. Et un DPE réalisé après juillet 2021 utilise une nouvelle méthode plus stricte : votre bien peut être passé de E à F sans que rien n'ait changé. Vérifiez toujours la date de votre dernier DPE avant de mettre en vente — et refaites-le si vous suspectez qu'il ne reflète plus la réalité.",
      },
      { type: "h2", text: "Étude de cas : DPE G rénové ou vendu tel quel ?" },
      {
        type: "p",
        text:
          "T3 65 m² Levallois, classé G. Prix de marché équivalent en D : 615 000 €. Prix en G : environ 520 000 € (–15 %). Option A : vendre en l'état, encaisser 520 000 €. Option B : rénover pendant 8 mois pour 28 000 € nets d'aides (isolation, fenêtres, chaudière), passer à D, vendre 615 000 €. Gain net après travaux : 615 000 – 28 000 = 587 000 €, soit + 67 000 € par rapport à la vente en l'état, sans compter la valorisation intrinsèque du bien rénové et l'attractivité renforcée à la mise en vente.",
      },
      {
        type: "callout",
        title: "Un point souvent oublié",
        text:
          "Certains acquéreurs (investisseurs, jeunes actifs prêts à faire des travaux) ne fuient pas les DPE F ou G — ils cherchent activement ces biens pour les rénover à leur main. Un DPE médiocre n'exclut donc pas certains acquéreurs, mais impose une commercialisation ciblée.",
      },
      {
        type: "links",
        title: "Pour aller plus loin",
        items: [
          { label: "Les 7 critères qui font monter le prix", to: "/guide-immobilier/vendre/7-criteres-prix-vente" },
          { label: "Combien de temps pour vendre dans le 92 ?", to: "/guide-immobilier/vendre/combien-de-temps-vendre-appartement-92" },
          { label: "Plus-value immobilière 2026", to: "/guide-immobilier/fiscalite-juridique/plus-value-immobiliere-2026" },
          { label: "Marché immobilier 92 en 2026", to: "/guide-immobilier/prix-marche/marche-immobilier-92-2026" },
        ],
      },
    ],
    faq: [
      {
        q: "Peut-on encore vendre un appartement classé F ou G en 2026 ?",
        a: "Oui, la vente n'est pas interdite (seule la location l'est pour les G depuis 2025 et pour les F à partir de 2028). Mais le prix subit une décote de 8 à 18 % par rapport à un équivalent classé D, et le délai de vente est plus long.",
      },
      {
        q: "Combien coûte la rénovation énergétique d'un appartement ?",
        a: "Pour passer d'un G à un D sur un T3 standard, comptez 25 000 à 40 000 € bruts, avec des aides MaPrimeRénov' pouvant couvrir 30 à 40 % du coût. Sur un T5, le budget monte à 40-70 000 €.",
      },
      {
        q: "Vaut-il mieux vendre ou rénover un DPE G ?",
        a: "Cela dépend de votre horizon. Si vous vendez sous 3 mois, ne rénovez pas. Si vous avez 12 à 24 mois, la rénovation peut générer un gain net de 40 à 70 000 € à la revente. En immeuble haussmannien classé, la rénovation lourde est souvent techniquement limitée.",
      },
      {
        q: "Le DPE d'un immeuble haussmannien peut-il vraiment être amélioré ?",
        a: "Partiellement. L'isolation extérieure est interdite en site classé, mais on peut agir sur les fenêtres (double vitrage sur mesure), la VMC, le système de chauffage, et l'isolation intérieure (avec perte de surface). Le gain reste modéré : d'un E on peut viser un D, rarement au-delà.",
      },
      {
        q: "Faut-il refaire son DPE avant de vendre ?",
        a: "Oui si le DPE date d'avant juillet 2021 (méthode obsolète) ou a plus de 10 ans (obligation légale). Un DPE récent, valide et bien réalisé peut aussi jouer en votre faveur si le précédent était pessimiste.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return ARTICLES.filter((a) => a.category === categorySlug).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getRelatedArticles(currentSlug: string, categorySlug: string, limit = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== currentSlug)
    .sort((a, b) => {
      const aScore = a.category === categorySlug ? 1 : 0;
      const bScore = b.category === categorySlug ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}