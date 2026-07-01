// Guide Immobilier - Articles rédigés par Emilio, fondateur de l'agence.
// Ton éditorial : personnel, concret, ancré dans le terrain parisien / 92.

export type ArticleSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface Category {
  slug: string;
  label: string;
  short: string;
  description: string;
}

export interface Article {
  slug: string;
  category: string; // category slug
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readMinutes: number;
  date: string; // ISO
  updated?: string;
  keywords: string[];
  sections: ArticleSection[];
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
  // PRIX & MARCHÉ
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
    readMinutes: 7,
    date: "2026-05-14",
    updated: "2026-06-10",
    keywords: [
      "prix m2 boulogne billancourt",
      "prix immobilier boulogne 2026",
      "estimation appartement boulogne",
      "marché immobilier boulogne",
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
          "Je vends et j'estime des biens dans cette ville depuis plusieurs années, et cette analyse s'appuie sur les mandats que je signe, les compromis que je vois passer, et les données notariales mises à jour trimestriellement.",
      },
      { type: "h2", text: "Le prix moyen à Boulogne-Billancourt en 2026" },
      {
        type: "p",
        text:
          "Sur l'ensemble de la commune, le prix moyen d'un appartement ancien tourne autour de 9 400 € / m² au premier semestre 2026, avec une fourchette réelle qui va de 7 800 € pour du T3 à rénover dans le Sud, jusqu'à 12 500 € pour un appartement familial refait dans le triangle d'or (Rothschild / Boulogne-Nord / limite Parc de Boulogne).",
      },
      {
        type: "table",
        headers: ["Secteur", "Prix moyen / m²", "Fourchette"],
        rows: [
          ["Boulogne-Nord (Rothschild, Parchamp)", "11 200 €", "10 000 – 12 500 €"],
          ["Centre-ville (Marché, Mairie)", "9 800 €", "9 000 – 11 000 €"],
          ["Silly-Gallieni", "9 400 €", "8 500 – 10 200 €"],
          ["Billancourt (Île Seguin, Trapèze)", "9 000 €", "8 200 – 10 500 €"],
          ["Boulogne-Sud (Point du Jour)", "8 400 €", "7 800 – 9 200 €"],
        ],
      },
      { type: "h2", text: "Ce qui fait vraiment bouger le prix, quartier par quartier" },
      { type: "h3", text: "Boulogne-Nord : la valeur refuge" },
      {
        type: "p",
        text:
          "C'est le secteur le plus recherché, historiquement stable. Les acquéreurs sont souvent des familles CSP+ qui viennent de Paris 16 et cherchent plus d'espace pour moins cher. Un 4 pièces bien exposé dans un immeuble bourgeois se vend en 4 à 6 semaines. Les biens à rénover partent aussi vite que ceux déjà refaits — c'est un vrai marché de vendeurs.",
      },
      { type: "h3", text: "Billancourt / Trapèze : le neuf qui pèse sur l'ancien" },
      {
        type: "p",
        text:
          "La ZAC du Trapèze continue de livrer des programmes. Résultat : l'offre en appartements récents est abondante, ce qui tire les prix de l'ancien vers le bas dans ce secteur. C'est paradoxalement là qu'on trouve les meilleures opportunités pour un primo-accédant qui accepte du 3 pièces des années 2000.",
      },
      { type: "h3", text: "Boulogne-Sud : le secteur qui monte" },
      {
        type: "p",
        text:
          "Longtemps considéré comme le parent pauvre, le Point du Jour a pris presque 12 % en trois ans grâce à l'arrivée du T2 et à la rénovation de l'avenue Pierre-Grenier. Pour un investisseur qui vise la revente à 5 ans, c'est aujourd'hui le pari le plus intéressant sur la commune.",
      },
      {
        type: "callout",
        title: "Ce que ces chiffres ne disent pas",
        text:
          "Un prix au m² moyen masque toujours des écarts individuels de ±15 %. L'étage, l'exposition, la vue, le DPE, la copropriété : chacun de ces critères peut valoir plusieurs centaines d'euros du m². Une estimation sérieuse se fait sur pièce, pas sur une carte.",
      },
      { type: "h2", text: "Tendance 2026 : ce qu'il faut retenir" },
      { type: "list", items: [
        "Les délais de vente sont revenus à 60-75 jours en moyenne (contre 90 en 2023).",
        "L'écart entre les biens DPE A-C et DPE F-G se creuse : on parle aujourd'hui de 10 à 15 % de décote sur les passoires thermiques.",
        "Les acquéreurs négocient moins qu'en 2024 : la marge de négociation moyenne est passée de 6 % à 3,5 %.",
        "Les biens familiaux (4 pièces et +) sont sous-offerts, donc surcotés dans le Nord de la ville.",
      ]},
      { type: "h2", text: "Envie de savoir ce que vaut votre bien à Boulogne ?" },
      {
        type: "p",
        text:
          "Une estimation faite sur photo ou sur un simple relevé cadastral se trompe souvent de 10 à 15 %. Je préfère venir sur place, regarder les vraies caractéristiques du bien, la vue, l'agencement, et vous rendre un avis de valeur argumenté. C'est gratuit et sans engagement.",
      },
    ],
  },

  {
    slug: "prix-m2-neuilly-sur-seine-2026",
    category: "prix-marche",
    title: "Prix au m² à Neuilly-sur-Seine en 2026 : analyse par quartier",
    metaTitle: "Prix m² Neuilly-sur-Seine 2026 : par quartier | Emilio",
    metaDescription:
      "Prix au m² à Neuilly-sur-Seine en 2026, analyse détaillée par quartier : Saint-James, Sablonville, Pasteur, Bagatelle. Vision terrain d'un expert local.",
    excerpt:
      "Neuilly reste l'une des adresses les plus prisées d'Île-de-France. Mais le marché s'est nettement segmenté depuis 2023. Voici ce qu'on observe concrètement en 2026.",
    readMinutes: 6,
    date: "2026-05-22",
    keywords: [
      "prix m2 neuilly sur seine",
      "prix immobilier neuilly 2026",
      "estimation neuilly",
      "marché immobilier neuilly",
    ],
    sections: [
      {
        type: "p",
        text:
          "Neuilly-sur-Seine a longtemps été considérée comme un marché monolithique — cher, stable, réservé à une clientèle familiale aisée. Ce n'est plus tout à fait vrai en 2026. La ville s'est segmentée, les micro-quartiers se sont différenciés, et la demande s'est déplacée.",
      },
      { type: "h2", text: "Le prix moyen à Neuilly en 2026" },
      {
        type: "p",
        text:
          "Prix moyen constaté : 11 800 € / m² sur l'ensemble de la commune, avec un plancher autour de 10 200 € pour du T2 à rénover en périphérie et un plafond qui dépasse régulièrement 15 000 € pour les biens d'exception à Saint-James ou face au Bois de Boulogne.",
      },
      {
        type: "table",
        headers: ["Quartier", "Prix moyen / m²", "Profil"],
        rows: [
          ["Saint-James / Bagatelle", "14 000 €", "Hôtels particuliers, familles patrimoniales"],
          ["Pasteur / Sablonville", "12 200 €", "Bourgeois familial, écoles"],
          ["Villiers / Château", "11 500 €", "Actifs, jeunes familles"],
          ["Les Sablons", "11 000 €", "Mixte, plus animé"],
          ["Périphérie porte Maillot", "10 500 €", "Investisseurs, jeunes cadres"],
        ],
      },
      { type: "h2", text: "Ce qui a changé en 2 ans" },
      {
        type: "p",
        text:
          "Le vrai basculement, c'est le retour des acquéreurs internationaux depuis 2025. On voit des offres au comptant venant du Moyen-Orient et d'Asie sur les biens familiaux de plus de 150 m². Ça soutient les prix hauts, mais ça n'aide pas les biens intermédiaires (T3 / T4) qui restent plus longtemps à la vente qu'avant.",
      },
      { type: "h3", text: "Le triangle Saint-James / Bagatelle : hors marché" },
      {
        type: "p",
        text:
          "C'est le seul secteur qui échappe totalement aux variations de conjoncture. Les biens s'y vendent souvent off-market, sans annonce publique, à des acquéreurs identifiés à l'avance. On y parle en unité, pas en prix au m² : un hôtel particulier peut se vendre 12 M€ comme 18 M€ selon le pedigree du bien.",
      },
      { type: "h3", text: "Sablonville / Pasteur : le cœur familial" },
      {
        type: "p",
        text:
          "C'est le vrai baromètre du marché neuilléen. Les 4 et 5 pièces bien exposés à moins de 10 minutes des écoles Saint-Dominique ou Sainte-Croix se vendent en moins de 45 jours. Les acquéreurs sont majoritairement des familles qui quittent Paris 16 ou 17 pour plus d'espace.",
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
          "Ma lecture : les prix restent stables sur le haut de gamme, légère érosion possible (–2 à –4 %) sur les biens intermédiaires mal notés énergétiquement, et remontée progressive sur les studios / T2 grâce au retour des primo-investisseurs. Rien de spectaculaire, mais un marché sain.",
      },
    ],
  },

  {
    slug: "marche-immobilier-92-2026",
    category: "prix-marche",
    title: "Marché immobilier dans les Hauts-de-Seine en 2026 : tendances et prévisions",
    metaTitle: "Marché immobilier 92 en 2026 : tendances | Emilio Immobilier",
    metaDescription:
      "État du marché immobilier dans les Hauts-de-Seine en 2026 : prix, délais, dynamique par ville. Analyse d'un expert local basée sur les mandats du terrain.",
    excerpt:
      "Après deux années de correction, le marché des Hauts-de-Seine a trouvé son point d'équilibre. Voici ce que révèlent les chiffres et ce que j'observe sur le terrain.",
    readMinutes: 6,
    date: "2026-04-30",
    keywords: [
      "marché immobilier 92",
      "immobilier hauts de seine 2026",
      "prix immobilier 92",
      "tendance immobilier ouest parisien",
    ],
    sections: [
      { type: "h2", text: "Un marché qui a fini de corriger" },
      {
        type: "p",
        text:
          "Entre mi-2022 et fin 2024, les prix dans le 92 ont perdu entre 6 et 12 % selon les communes. Depuis début 2025, on est entré dans une phase de stabilisation. Les acquéreurs, échaudés par la hausse des taux, sont revenus prudemment, et les vendeurs ont fini par ajuster leurs prétentions.",
      },
      { type: "h2", text: "Les villes qui tirent le marché" },
      {
        type: "p",
        text:
          "Trois communes concentrent aujourd'hui l'essentiel de la demande solvable : Boulogne-Billancourt (proximité Paris, offre équilibrée), Neuilly-sur-Seine (patrimoine, écoles) et Levallois-Perret (rapport qualité-prix, transports). Issy-les-Moulineaux suit de près, tirée par son pôle tertiaire et l'arrivée du Grand Paris Express.",
      },
      {
        type: "table",
        headers: ["Ville", "Prix moyen 2026", "Évolution 12 mois"],
        rows: [
          ["Neuilly-sur-Seine", "11 800 € / m²", "+ 1,2 %"],
          ["Boulogne-Billancourt", "9 400 € / m²", "+ 0,8 %"],
          ["Levallois-Perret", "9 100 € / m²", "+ 2,1 %"],
          ["Issy-les-Moulineaux", "8 700 € / m²", "+ 3,4 %"],
          ["Courbevoie", "7 500 € / m²", "+ 1,8 %"],
        ],
      },
      { type: "h2", text: "Trois tendances à surveiller" },
      { type: "h3", text: "1. La prime au bien bien noté énergétiquement" },
      {
        type: "p",
        text:
          "Un appartement classé D ou mieux se vend aujourd'hui 8 à 12 % plus cher qu'un bien équivalent classé F. Cet écart n'existait pas en 2020. Pour un vendeur, la question du DPE est devenue un vrai levier de négociation.",
      },
      { type: "h3", text: "2. Les délais de vente qui se raccourcissent" },
      {
        type: "p",
        text:
          "Fin 2023, il fallait compter 4 à 5 mois pour vendre un appartement dans le 92. Aujourd'hui, c'est plutôt 8 à 10 semaines pour un bien correctement estimé et bien présenté. La vitesse est revenue.",
      },
      { type: "h3", text: "3. Le retour du primo-accédant" },
      {
        type: "p",
        text:
          "Avec la baisse des taux amorcée mi-2025 (autour de 3,2 % sur 20 ans en juin 2026), les primo-accédants sont revenus sur les 2-3 pièces à moins de 700 000 €. C'est un segment qui repart, notamment à Issy et Levallois.",
      },
      {
        type: "callout",
        title: "Ce qu'il faut retenir en une phrase",
        text:
          "Le marché du 92 n'est plus baissier mais pas encore franchement haussier : c'est un marché d'ajustement, où le prix juste et la qualité du dossier de vente font toute la différence.",
      },
    ],
  },

  // ============================================================
  // VENDRE
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
    readMinutes: 5,
    date: "2026-05-05",
    keywords: [
      "délai vente appartement 92",
      "combien de temps pour vendre",
      "durée vente immobilier boulogne",
      "délai compromis vente",
    ],
    sections: [
      {
        type: "p",
        text:
          "Un vendeur me disait la semaine dernière : « J'ai lu partout qu'un appartement se vend en un mois aujourd'hui. Le mien est en ligne depuis 3 mois et je n'ai eu que 4 visites. » Cette phrase résume assez bien le décalage entre les moyennes qu'on lit dans la presse et la réalité du terrain.",
      },
      { type: "h2", text: "Les vrais délais en 2026" },
      {
        type: "p",
        text:
          "En 2026, le délai moyen de vente dans les Hauts-de-Seine se situe entre 55 et 90 jours entre la mise en ligne et la signature du compromis. À cela s'ajoutent 2,5 à 3 mois entre le compromis et l'acte définitif chez le notaire. Compter donc entre 4,5 et 6 mois du début à la fin.",
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
          "J'ai suivi cette année deux mandats identiques (même immeuble, même surface, même étage), l'un présenté avec des photos amateur au smartphone, l'autre avec un shooting professionnel. Le premier a mis 4 mois et a été bradé de 6 %. Le second est parti en 3 semaines au prix demandé. Ce n'est pas anecdotique.",
      },
      { type: "h2", text: "Les délais qui n'apparaissent jamais dans les statistiques" },
      { type: "list", items: [
        "Diagnostics techniques (DPE, amiante, plomb...) : 1 à 3 semaines à prévoir avant la mise en ligne.",
        "Levée des conditions suspensives par la banque de l'acquéreur : 45 à 60 jours après compromis.",
        "Purge du droit de préemption urbain (mairie) : 2 mois systématiques.",
        "Assemblée de copropriété à passer : peut décaler la vente de 1 à 2 mois si travaux à voter.",
      ]},
      {
        type: "callout",
        title: "Vendre vite sans brader : c'est possible ?",
        text:
          "Oui, mais à trois conditions cumulatives. Un prix ajusté au marché du moment (pas au prix rêvé), un dossier complet dès le J1 (diagnostics, PV d'AG, charges), et une stratégie de mise en marché différenciée selon la cible (portails grand public vs off-market ciblé pour le haut de gamme).",
      },
    ],
  },

  {
    slug: "vendre-off-market",
    category: "vendre",
    title: "Vendre off-market : pourquoi, pour qui, et à quel prix ?",
    metaTitle: "Vendre off-market : mode d'emploi pour les biens premium | Emilio",
    metaDescription:
      "Vendre son appartement off-market : à qui s'adresse cette stratégie confidentielle, comment ça se déroule, et pourquoi elle sécurise souvent le prix.",
    excerpt:
      "Vendre sans annonce publique, sans photo sur Internet, sans passage sur les portails. C'est ce qu'on appelle l'off-market. Voici quand cette stratégie a vraiment du sens.",
    readMinutes: 5,
    date: "2026-05-18",
    keywords: [
      "vendre off market",
      "vente confidentielle immobilier",
      "vente immobilière discrète",
      "off market paris",
    ],
    sections: [
      {
        type: "p",
        text:
          "L'off-market, c'est vendre sans passer par la vitrine. Pas d'annonce sur SeLoger, pas de photos publiques, pas de visites dominicales grand public. Le bien est présenté à un cercle restreint d'acquéreurs pré-qualifiés, souvent via le réseau personnel du conseiller.",
      },
      { type: "h2", text: "Pour qui l'off-market a-t-il vraiment du sens ?" },
      {
        type: "p",
        text:
          "Contrairement à ce qu'on entend parfois, l'off-market n'est pas réservé aux hôtels particuliers à 15 M€. Il devient pertinent dès qu'un vendeur a une bonne raison de vouloir garder la discrétion : divorce, succession, mutation professionnelle, personnalité publique, ou simplement bien exceptionnel qu'on ne veut pas voir dévalorisé par un affichage grand public.",
      },
      { type: "list", items: [
        "Biens à plus de 1,5 M€ dans le 92 ou Paris Ouest.",
        "Vendeurs souhaitant garder leur projet confidentiel (vie professionnelle, vie de famille).",
        "Biens atypiques ou d'exception, difficiles à photographier pour un portail grand public.",
        "Vendeurs qui refusent le défilé de visites et préfèrent 3 à 5 acquéreurs sérieux.",
      ]},
      { type: "h2", text: "Comment ça se passe concrètement" },
      {
        type: "p",
        text:
          "La première étape reste la même que pour une vente classique : estimation sérieuse, préparation du dossier technique, choix d'un prix d'entrée. La différence commence à la mise en marché. Au lieu de publier une annonce, nous activons notre carnet d'acquéreurs actifs — ceux qui ont un mandat de recherche en cours dans le secteur et le budget qui correspond.",
      },
      {
        type: "p",
        text:
          "Concrètement, sur un bien à 2,4 M€ à Neuilly, on peut identifier en 48 heures 6 à 10 acquéreurs sérieux dans notre base, plus autant chez nos confrères partenaires. Le bien est présenté en petit comité, souvent en semaine, avec un descriptif détaillé mais sans identification publique de l'adresse.",
      },
      { type: "h2", text: "Le mythe du « prix off-market plus bas »" },
      {
        type: "p",
        text:
          "On entend parfois qu'un bien vendu off-market se vend « moins cher » puisqu'il n'y a pas de mise en concurrence publique. Mon expérience dit exactement l'inverse. Sur les mandats que je gère, les biens vendus off-market se signent en moyenne à 98,5 % du prix affiché, contre 96,5 % pour les biens en vente publique. Pourquoi ? Parce qu'un acquéreur pré-qualifié qui a la chance d'accéder à un bien confidentiel négocie moins agressivement que quelqu'un qui a vu le bien traîner trois mois sur les portails.",
      },
      {
        type: "callout",
        title: "Off-market ≠ absence de méthode",
        text:
          "L'off-market ne fonctionne que si le conseiller dispose d'un vrai fichier acquéreurs actifs et qualifiés. Sans ça, ce n'est pas de la vente confidentielle, c'est juste une vente ratée.",
      },
    ],
  },

  {
    slug: "7-criteres-prix-vente",
    category: "vendre",
    title: "Les 7 critères qui font vraiment monter le prix de vente de votre appartement",
    metaTitle: "7 critères qui font monter le prix de vente d'un appartement | Emilio",
    metaDescription:
      "Étage, exposition, DPE, copropriété, agencement : les 7 critères qui déterminent vraiment le prix de vente d'un appartement en 2026. Analyse concrète.",
    excerpt:
      "À surface et quartier identiques, deux appartements peuvent se vendre avec 20 % d'écart. Voici les 7 critères qui expliquent presque toute la différence.",
    readMinutes: 6,
    date: "2026-05-27",
    keywords: [
      "critères prix vente appartement",
      "quoi valorise un appartement",
      "estimation appartement critères",
      "valeur appartement paris",
    ],
    sections: [
      {
        type: "p",
        text:
          "Quand j'explique à un vendeur que son appartement vaut 20 % de plus ou de moins que celui d'à côté, à surface égale, la réaction est souvent la même : « Mais on est dans le même immeuble ! ». C'est justement ce qui rend le métier passionnant : la valeur d'un bien ne se résume jamais à l'adresse.",
      },
      { type: "h2", text: "1. L'étage et l'ascenseur" },
      {
        type: "p",
        text:
          "Entre un rez-de-chaussée et un dernier étage bien exposé, dans le même immeuble, l'écart peut atteindre 15 %. L'absence d'ascenseur au-dessus du 3ᵉ étage retire mécaniquement 5 à 8 % du prix. À l'inverse, un dernier étage avec vue dégagée ajoute 5 à 10 %.",
      },
      { type: "h2", text: "2. L'exposition et la luminosité" },
      {
        type: "p",
        text:
          "Un bien traversant Est-Ouest ou Sud est un argument majeur à Paris. Un appartement plein Nord sans double exposition se négocie entre 4 et 7 % en dessous d'un équivalent bien exposé. Les acquéreurs, en 2026, ne transigent plus sur la lumière.",
      },
      { type: "h2", text: "3. La performance énergétique (DPE)" },
      {
        type: "p",
        text:
          "Le DPE est devenu, en 3 ans, l'un des tout premiers critères de négociation. Un bien classé F ou G subit aujourd'hui une décote moyenne de 10 à 15 % dans le 92, et de 8 à 12 % à Paris Ouest. À l'inverse, un logement classé C ou mieux (rare dans l'ancien haussmannien) peut se vendre 3 à 5 % au-dessus du marché.",
      },
      { type: "h2", text: "4. L'état de la copropriété" },
      {
        type: "p",
        text:
          "Une copropriété saine (charges maîtrisées, ravalement à jour, fonds travaux constitué) vaut de l'or. À l'inverse, une AG qui vote 80 000 € de travaux d'ascenseur peut faire chuter le prix de vente de 10 000 à 30 000 € du jour au lendemain, car l'acquéreur intègre cette dépense dans sa négociation.",
      },
      { type: "h2", text: "5. L'agencement et la modularité" },
      {
        type: "p",
        text:
          "Un T3 avec deux vraies chambres se vend nettement mieux qu'un T3 avec une chambre et un salon en enfilade impossible à cloisonner. La modularité est particulièrement recherchée depuis le télétravail : un espace bureau, même petit, ajoute une vraie valeur.",
      },
      { type: "h2", text: "6. Les extérieurs" },
      {
        type: "p",
        text:
          "Un balcon de 4 m² apporte 3 à 5 % de valeur. Une terrasse de 20 m² dans Paris intra-muros peut valoir plus que 30 m² intérieurs supplémentaires. Cette prime aux extérieurs, née pendant les confinements, ne s'est jamais démentie depuis.",
      },
      { type: "h2", text: "7. La vue et le calme" },
      {
        type: "p",
        text:
          "Deux critères souvent minimisés, à tort. Un appartement donnant sur une cour intérieure calme se vend 4 à 6 % plus cher qu'un équivalent sur rue passante. Une vue dégagée (jardin, monument, Seine) peut valoir jusqu'à 10 %.",
      },
      {
        type: "callout",
        title: "Le calcul rapide",
        text:
          "Sur un appartement à 1 M€, un bon DPE + une belle exposition + un balcon peuvent représenter facilement 80 000 à 120 000 € de plus-value réelle par rapport à un bien équivalent moins bien noté sur ces critères. C'est là que se joue le vrai prix de vente.",
      },
    ],
  },

  // ============================================================
  // ACHETER
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
    readMinutes: 6,
    date: "2026-06-02",
    keywords: [
      "boulogne ou neuilly",
      "vivre boulogne neuilly",
      "investir boulogne neuilly",
      "comparaison boulogne neuilly",
    ],
    sections: [
      {
        type: "p",
        text:
          "« Vous nous conseilleriez plutôt Boulogne ou Neuilly ? ». Cette question, on nous la pose au moins trois fois par mois. La réponse honnête dépend de ce que vous cherchez vraiment — et rarement de la seule question du prix.",
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
          "Neuilly a un côté « ville-résidence » assumé : peu de vie nocturne, beaucoup de commerces haut de gamme, une clientèle plutôt patrimoniale. Boulogne, surtout depuis le renouveau du Trapèze et de l'Île Seguin, offre une vie de quartier plus animée, plus jeune, avec un vrai centre-ville commerçant autour de la mairie.",
      },
      { type: "h2", text: "Les écoles" },
      {
        type: "p",
        text:
          "Match nul, mais pour des raisons différentes. Neuilly attire pour ses grands établissements privés (Sainte-Croix, Saint-Dominique, Pasteur). Boulogne joue plutôt sur l'excellence de son public (Jean-Renoir, Landowski) et son offre bilingue développée ces dernières années. Chaque famille tranche selon ses convictions.",
      },
      { type: "h2", text: "Les transports" },
      {
        type: "p",
        text:
          "Boulogne bénéficie de la ligne 9 et 10 très bien maillées, plus le T3 en surface. Neuilly a le grand mérite d'avoir la ligne 1, la plus fiable du réseau, qui vous met à la Défense en 6 minutes ou à Châtelet en 12. Pour un actif travaillant à Paris centre, la ligne 1 fait souvent pencher la balance.",
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
          ["Transports", "Ligne 1 (excellent)", "Lignes 9, 10, T3"],
          ["Potentiel d'appréciation", "Faible mais stable", "Modéré à fort selon secteur"],
          ["Cible acquéreur type", "Famille patrimoniale", "Famille active, investisseur"],
        ],
      },
      {
        type: "callout",
        title: "Notre recommandation en une phrase",
        text:
          "Neuilly pour préserver un patrimoine, Boulogne pour construire un patrimoine. Les deux se défendent, à condition de savoir ce qu'on cherche vraiment.",
      },
    ],
  },

  {
    slug: "primo-accedant-paris-ouest",
    category: "acheter",
    title: "Primo-accédant à Paris Ouest en 2026 : nos conseils concrets",
    metaTitle: "Primo-accédant Paris Ouest : les vrais conseils en 2026 | Emilio",
    metaDescription:
      "Vous achetez votre premier appartement à Paris Ouest ou dans le 92 ? Nos conseils concrets pour bien préparer votre dossier et sécuriser votre acquisition.",
    excerpt:
      "Acheter son premier appartement dans l'Ouest parisien en 2026 est redevenu possible. À condition de préparer sérieusement quelques points souvent négligés.",
    readMinutes: 6,
    date: "2026-06-08",
    keywords: [
      "primo accédant paris ouest",
      "premier achat immobilier boulogne",
      "acheter premier appartement 92",
      "conseils primo accédant 2026",
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
      { type: "h2", text: "2. Ne sous-estimez pas les frais annexes" },
      { type: "list", items: [
        "Frais de notaire : 7 à 8 % dans l'ancien, à financer sur apport personnel.",
        "Travaux : prévoir un budget « imprévu » de 10 à 15 % du prix d'achat.",
        "Frais bancaires : garantie, dossier, assurance (compter 1 à 1,5 % du montant emprunté).",
        "Copropriété : régularisation de charges à l'entrée + fonds travaux ALUR souvent oublié.",
      ]},
      { type: "h2", text: "3. Élargissez votre géographie" },
      {
        type: "p",
        text:
          "Un primo-accédant qui veut absolument Boulogne-Nord ou Neuilly-Sablonville avec un budget de 500 000 € va se heurter à une réalité de marché. À budget équivalent, regarder Issy-les-Moulineaux, Levallois-Perret ou même Courbevoie ouvre le champ des possibles : surface plus grande, extérieur, meilleur DPE. Une bonne acquisition, ce n'est pas forcément l'adresse la plus prestigieuse.",
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
      {
        type: "callout",
        title: "Le mandat de recherche : un vrai atout pour un primo-accédant",
        text:
          "Confier votre recherche à un conseiller (moyennant honoraires) vous donne accès aux biens off-market, à un accompagnement dans la négociation et à un vrai gain de temps. Sur un premier achat, c'est souvent un investissement qui se rembourse par la qualité de la négociation obtenue.",
      },
    ],
  },

  // ============================================================
  // FISCALITÉ & JURIDIQUE
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
    readMinutes: 7,
    date: "2026-04-22",
    keywords: [
      "plus value immobilière 2026",
      "calcul plus value immobilière",
      "exonération plus value résidence secondaire",
      "abattement durée détention plus value",
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
          "Bonne nouvelle pour les vendeurs : le prix d'acquisition retenu n'est pas seulement le prix payé à l'origine. On peut y ajouter les frais de notaire (forfait de 7,5 % appliqué si les vraies factures ne sont pas retrouvées), les travaux réalisés (sur justificatifs, ou forfait de 15 % si le bien est détenu depuis plus de 5 ans), et certains frais annexes.",
      },
      { type: "h3", text: "Prix de vente minoré" },
      {
        type: "p",
        text:
          "Symétriquement, on retire du prix de vente les frais liés à la vente : diagnostics, honoraires d'agence si à la charge du vendeur, frais de mainlevée d'hypothèque.",
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
      { type: "list", items: [
        "Résidence principale au jour de la vente : exonération intégrale.",
        "Première cession d'un logement autre que la résidence principale, sous condition de réemploi du prix dans l'achat de la RP dans les 24 mois.",
        "Cession inférieure à 15 000 € (peu courant).",
        "Vente par un retraité modeste ou une personne invalide (sous conditions de ressources).",
        "Cession à un organisme de logement social.",
      ]},
      { type: "h2", text: "Un exemple concret" },
      {
        type: "p",
        text:
          "Vous vendez en 2026 un appartement à Boulogne acheté 380 000 € en 2010. Prix de vente : 720 000 €. Après application des forfaits (frais notaire 7,5 % + travaux 15 %), le prix d'acquisition retenu est de 466 500 €. Plus-value brute : 253 500 €. Durée de détention : 16 ans, soit un abattement de 66 % à l'IR et 18,15 % aux prélèvements sociaux. Plus-value taxable IR : 86 190 € × 19 % = 16 376 €. Plus-value taxable PS : 207 470 € × 17,2 % = 35 685 €. Total dû : environ 52 000 €.",
      },
      {
        type: "callout",
        title: "Attention à la surtaxe",
        text:
          "Depuis 2013, une surtaxe s'applique sur les plus-values immobilières supérieures à 50 000 €. Elle va de 2 % à 6 % selon le montant. Un point à ne pas oublier dans le calcul.",
      },
    ],
  },

  {
    slug: "dpe-f-g-impact-prix",
    category: "fiscalite-juridique",
    title: "DPE F ou G : quel impact réel sur votre prix de vente en 2026 ?",
    metaTitle: "Impact du DPE F ou G sur le prix de vente en 2026 | Emilio",
    metaDescription:
      "Votre appartement est classé F ou G au DPE ? Voici l'impact réel sur votre prix de vente en 2026, les obligations et les solutions concrètes.",
    excerpt:
      "Le DPE est devenu, en 3 ans, un critère aussi déterminant que le prix au m². Voici ce que vous risquez vraiment avec un F ou un G — et comment limiter la casse.",
    readMinutes: 6,
    date: "2026-05-01",
    keywords: [
      "dpe f g impact prix",
      "décote dpe f g",
      "vendre passoire thermique 2026",
      "interdiction location dpe g",
    ],
    sections: [
      {
        type: "p",
        text:
          "En 2020, personne ne regardait le DPE. En 2026, c'est la première question que pose un acquéreur avant même la visite. Le calendrier légal, combiné à la prise de conscience énergétique, a fait du DPE l'un des critères les plus discriminants du marché.",
      },
      { type: "h2", text: "Le calendrier légal à connaître" },
      { type: "list", items: [
        "Depuis le 1er janvier 2023 : interdiction de louer les logements classés G+ (au-dessus de 450 kWh/m²/an).",
        "Depuis le 1er janvier 2025 : interdiction totale de louer les logements classés G.",
        "1er janvier 2028 : interdiction de louer les logements classés F.",
        "1er janvier 2034 : interdiction de louer les logements classés E.",
      ]},
      {
        type: "p",
        text:
          "Ces échéances ne concernent que la location, pas la vente. Mais elles influencent massivement le marché acquéreur : un investisseur qui achète un G aujourd'hui sait qu'il ne pourra pas le louer sans travaux lourds.",
      },
      { type: "h2", text: "L'impact réel sur le prix de vente" },
      {
        type: "p",
        text:
          "Sur les mandats que nous conduisons dans le 92 et Paris Ouest en 2026, la décote observée est la suivante :",
      },
      {
        type: "table",
        headers: ["Classe DPE", "Décote moyenne vs classe D"],
        rows: [
          ["A / B", "+ 3 à + 5 %"],
          ["C", "+ 1 à + 2 %"],
          ["D", "Référence"],
          ["E", "– 2 à – 4 %"],
          ["F", "– 8 à – 12 %"],
          ["G", "– 12 à – 18 %"],
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
      {
        type: "callout",
        title: "Un point souvent oublié",
        text:
          "Un DPE de plus de 10 ans doit être refait. Et un DPE réalisé après juillet 2021 utilise une nouvelle méthode plus stricte : votre bien peut être passé de E à F sans que rien n'ait changé. Vérifiez toujours la date de votre dernier DPE avant de mettre en vente.",
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