import {
  Briefcase,
  Building2,
  GraduationCap,
  Landmark,
  Sparkles,
  Trees,
  Users,
  Wine,
} from "lucide-react";

export type LucideIcon = typeof Building2;

export type CityData = {
  slug: string; // url segment after /achat-appartement-
  name: string;
  postalCodes: string[]; // for property filtering
  cityMatch: string[]; // lowercase substrings to match property.city
  postalLabel: string; // hero badge
  population: string;
  pricePerSqm: { low: number; mid: number; high: number; description: string };
  metaTitle: string;
  metaDescription: string;
  heroIntro: string;
  marketParagraphs: string[];
  stats: { icon: LucideIcon; val: string; label: string }[];
  quartiers: { name: string; desc: string }[];
  transports: { line: string; stations: string }[];
  atouts: string[];
  faqs: { q: string; a: string }[];
  estimationCta: string; // varied CTA
};

const cities: Record<string, CityData> = {
  "boulogne-billancourt": {
    slug: "boulogne-billancourt",
    name: "Boulogne-Billancourt",
    postalCodes: ["92100"],
    cityMatch: ["boulogne"],
    postalLabel: "Hauts-de-Seine · 92100",
    population: "120 000+",
    pricePerSqm: {
      low: 9000,
      mid: 9800,
      high: 10500,
      description: "9 000 à 10 500 €/m², avec des pics à 13 000 €/m² pour le haussmannien et l'Île Seguin.",
    },
    metaTitle: "Achat appartement Boulogne-Billancourt (92100) | Prix m² & biens à vendre",
    metaDescription:
      "Achat d'appartement à Boulogne-Billancourt : prix au m², meilleurs quartiers, biens disponibles et accompagnement par notre agence locale.",
    heroIntro:
      "Vous cherchez à acheter ou vendre un appartement à Boulogne-Billancourt ? Notre agence vous accompagne sur toutes les étapes : analyse marché, sélection (visibles et off-market), visites, négociation, signature.",
    marketParagraphs: [
      "Située aux portes de Paris dans les Hauts-de-Seine, **Boulogne-Billancourt** est l'une des villes les plus recherchées d'Île-de-France. Plus de 120 000 habitants, un cadre de vie haut de gamme à mi-chemin entre dynamisme parisien et calme résidentiel.",
      "Le **prix au m² à Boulogne-Billancourt** oscille entre 9 000 € et 10 500 €, avec des pics à plus de 13 000 €/m² pour le haussmannien du Centre ou les programmes neufs de l'Île Seguin. Les **2 et 3 pièces** dominent la demande.",
      "Acheter ou vendre à Boulogne en 2026, c'est une ville à fort potentiel : Grand Paris Express, écoles d'excellence, parc Edmond de Rothschild, sièges sociaux, hôpital Ambroise-Paré, Renault.",
    ],
    stats: [
      { icon: Building2, val: "≈ 9 800 €/m²", label: "Prix moyen" },
      { icon: Users, val: "120 000+", label: "Habitants" },
      { icon: Landmark, val: "4 lignes", label: "Métro & T2" },
      { icon: GraduationCap, val: "30+", label: "Écoles" },
    ],
    quartiers: [
      { name: "Centre-ville", desc: "Cœur historique autour de l'Hôtel de Ville, marché Escudier, ambiance village urbain prisée." },
      { name: "Billancourt — Île Seguin", desc: "Renaissance autour de la Seine Musicale, immeubles récents, bords de Seine." },
      { name: "Parchamp — Albert Kahn", desc: "Quartier verdoyant, haussmanniens et années 30, prisé des familles." },
      { name: "Silly — Gallieni", desc: "Dynamique et bien desservi, proche du parc Edmond de Rothschild." },
      { name: "République — Point du Jour", desc: "Aux portes de Paris 16e, calme, écoles, accès direct capitale." },
      { name: "Marcel Sembat", desc: "Vivant autour du métro 9, idéal primo-accédants et investisseurs." },
    ],
    transports: [
      { line: "Ligne 9", stations: "Marcel Sembat · Billancourt · Pont de Sèvres" },
      { line: "Ligne 10", stations: "Boulogne Jean Jaurès · Pont de Saint-Cloud" },
      { line: "T2", stations: "Tramway Issy → La Défense" },
      { line: "RER C", stations: "Issy & Issy-Val-de-Seine à proximité" },
    ],
    atouts: [
      "Écoles publiques et privées réputées",
      "Parc Edmond de Rothschild & bois de Boulogne",
      "Bassin d'emploi (Renault, sièges sociaux)",
      "Commerces, marchés et restaurants",
      "Proximité immédiate de Paris 16e",
    ],
    faqs: [
      {
        q: "Quel est le prix moyen au m² pour un appartement à Boulogne-Billancourt ?",
        a: "Entre 9 000 et 10 500 €/m² en moyenne, avec de fortes variations selon le quartier, l'étage, l'exposition et la présence d'un extérieur. Les biens haussmanniens du Centre ou les programmes neufs de l'Île Seguin atteignent fréquemment 11 000 à 13 000 €/m².",
      },
      {
        q: "Quels sont les meilleurs quartiers pour acheter à Boulogne-Billancourt ?",
        a: "Centre-ville (cachet et commerces), Parchamp-Albert Kahn (familles, écoles, calme), République-Point du Jour (proximité Paris 16e) et l'Île Seguin/Billancourt (programmes neufs, bords de Seine).",
      },
      {
        q: "Combien de temps pour acheter à Boulogne-Billancourt ?",
        a: "Avec notre accompagnement en mandat de recherche, comptez 3 à 4 mois entre le premier rendez-vous et la remise des clés.",
      },
      {
        q: "Boulogne-Billancourt est-elle un bon investissement ?",
        a: "Oui. Bassin d'emploi dense, lignes 9, 10, T2, futur Grand Paris Express, écoles réputées, proximité immédiate de Paris. Demande locative très soutenue, en particulier sur les 2 et 3 pièces.",
      },
    ],
    estimationCta: "Vous vendez à Boulogne-Billancourt ? Obtenez le prix réel de votre bien en 2 minutes.",
  },

  "neuilly-sur-seine": {
    slug: "neuilly-sur-seine",
    name: "Neuilly-sur-Seine",
    postalCodes: ["92200"],
    cityMatch: ["neuilly"],
    postalLabel: "Hauts-de-Seine · 92200",
    population: "60 000+",
    pricePerSqm: {
      low: 11500,
      mid: 13000,
      high: 15000,
      description: "11 500 à 15 000 €/m², avec des records pour les hôtels particuliers et appartements vue Bois.",
    },
    metaTitle: "Achat appartement Neuilly-sur-Seine (92200) | Prix m² & biens à vendre",
    metaDescription:
      "Acheter ou vendre un appartement à Neuilly-sur-Seine : prix au m², quartiers prisés, biens disponibles et accompagnement par notre agence locale.",
    heroIntro:
      "Neuilly-sur-Seine, l'une des adresses les plus recherchées des Hauts-de-Seine. Notre agence vous accompagne pour acheter ou vendre votre appartement avec discrétion et expertise.",
    marketParagraphs: [
      "**Neuilly-sur-Seine** est sans doute la commune la plus prestigieuse des Hauts-de-Seine : avenue Charles de Gaulle, bois de Boulogne en limite, immeubles haussmanniens et années 30, ambiance résidentielle haut de gamme.",
      "Le **prix au m² à Neuilly** s'inscrit entre 11 500 € et 15 000 €, et dépasse fréquemment 17 000 €/m² pour un appartement bourgeois avec vue Bois ou pour les hôtels particuliers de l'Île de la Jatte.",
      "La ville attire familles aisées, expatriés et professions libérales : écoles privées de référence (Sainte-Croix, Saint-Pierre-Fourier), hôpital américain, commerces premium, et un accès direct à Paris via la ligne 1.",
    ],
    stats: [
      { icon: Building2, val: "≈ 13 000 €/m²", label: "Prix moyen" },
      { icon: Users, val: "60 000+", label: "Habitants" },
      { icon: Landmark, val: "Ligne 1", label: "Direct Paris" },
      { icon: GraduationCap, val: "Top", label: "Écoles privées" },
    ],
    quartiers: [
      { name: "Saint-James", desc: "Quartier le plus prestigieux, hôtels particuliers, calme absolu, prisé par les familles fortunées." },
      { name: "Sablons", desc: "Cœur résidentiel autour du métro Les Sablons, immeubles bourgeois et écoles renommées." },
      { name: "Île de la Jatte", desc: "Cadre exceptionnel sur la Seine, programmes haut de gamme, ambiance village très prisée." },
      { name: "Pasteur — Pereire", desc: "À deux pas de Paris 17e, vie de quartier dynamique, parfait pour familles actives." },
      { name: "Centre — Charles de Gaulle", desc: "Le long de la grande avenue, immeubles haussmanniens, commerces et restaurants." },
      { name: "Madrid — Bois", desc: "En lisière du bois de Boulogne, calme et verdure, recherchés pour les vues dégagées." },
    ],
    transports: [
      { line: "Ligne 1", stations: "Pont de Neuilly · Les Sablons · Porte Maillot" },
      { line: "RER C", stations: "Neuilly-Porte Maillot (à proximité)" },
      { line: "T3b", stations: "Porte Maillot (à proximité)" },
      { line: "Bus", stations: "Nombreuses lignes vers Paris et La Défense" },
    ],
    atouts: [
      "Bois de Boulogne en limite immédiate",
      "Écoles privées de référence",
      "Hôpital américain de Paris",
      "Commerces premium et marchés",
      "Accès direct Paris (10 min ligne 1)",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² à Neuilly-sur-Seine ?",
        a: "Entre 11 500 et 15 000 €/m² en moyenne, avec des records à 17 000-20 000 €/m² pour les biens d'exception (hôtels particuliers, vues Bois, Île de la Jatte).",
      },
      {
        q: "Quels sont les meilleurs quartiers pour acheter à Neuilly ?",
        a: "Saint-James et l'Île de la Jatte pour le prestige, Sablons et Pasteur pour les familles, Madrid-Bois pour le calme et la vue.",
      },
      {
        q: "Pourquoi vendre son bien à Neuilly avec un mandataire ?",
        a: "Neuilly est un marché très spécifique : acheteurs exigeants, attentes de discrétion, valorisation patrimoniale. Notre approche off-market et notre réseau qualifié maximisent votre prix de vente.",
      },
      {
        q: "Combien de temps pour vendre à Neuilly ?",
        a: "Comptez 6 à 12 semaines pour un bien correctement positionné. Les biens d'exception peuvent partir off-market en quelques jours via notre réseau.",
      },
    ],
    estimationCta: "Vous vendez à Neuilly-sur-Seine ? Estimation confidentielle en 2 minutes.",
  },

  "issy-les-moulineaux": {
    slug: "issy-les-moulineaux",
    name: "Issy-les-Moulineaux",
    postalCodes: ["92130"],
    cityMatch: ["issy"],
    postalLabel: "Hauts-de-Seine · 92130",
    population: "70 000+",
    pricePerSqm: {
      low: 8500,
      mid: 9500,
      high: 10500,
      description: "8 500 à 10 500 €/m², portée par les programmes récents du Fort et bords de Seine.",
    },
    metaTitle: "Achat appartement Issy-les-Moulineaux (92130) | Prix m² & biens à vendre",
    metaDescription:
      "Acheter ou vendre un appartement à Issy-les-Moulineaux : prix au m², quartiers, programmes neufs et accompagnement par notre agence locale.",
    heroIntro:
      "Issy-les-Moulineaux, ville pionnière de la smart city aux portes de Paris. Notre agence vous accompagne pour vendre ou acheter votre appartement.",
    marketParagraphs: [
      "**Issy-les-Moulineaux** combine modernité et qualité de vie : ville pionnière du numérique, sièges sociaux (Microsoft, Bouygues, Cisco), programmes neufs de standing et bords de Seine aménagés.",
      "Le **prix au m² à Issy** se situe entre 8 500 € et 10 500 €, avec des pointes au-dessus de 11 000 €/m² sur les bords de Seine, le Fort d'Issy ou les programmes Cœur de Ville.",
      "La ville séduit jeunes actifs et familles : excellente desserte (M12, T2, RER C, futur M15), écoles bilingues, parcs (île Saint-Germain) et un dynamisme économique unique en Île-de-France.",
    ],
    stats: [
      { icon: Building2, val: "≈ 9 500 €/m²", label: "Prix moyen" },
      { icon: Users, val: "70 000+", label: "Habitants" },
      { icon: Landmark, val: "M12 · T2 · RER C", label: "Transports" },
      { icon: Briefcase, val: "Tech hub", label: "Bassin d'emploi" },
    ],
    quartiers: [
      { name: "Cœur de Ville", desc: "Le centre rénové, commerces, marché, ambiance vivante très prisée." },
      { name: "Fort d'Issy", desc: "Éco-quartier moderne, programmes neufs haut de gamme, vue panoramique." },
      { name: "Bords de Seine — Île Saint-Germain", desc: "Cadre exceptionnel, parc, programmes récents avec terrasses." },
      { name: "Corentin Celton", desc: "Quartier dynamique autour du métro 12, mixte ancien et neuf." },
      { name: "Les Épinettes", desc: "Résidentiel, calme, idéal pour les familles primo-accédantes." },
      { name: "Val de Seine", desc: "Quartier d'affaires (Bouygues, France Télévisions), appartements récents." },
    ],
    transports: [
      { line: "Ligne 12", stations: "Mairie d'Issy · Corentin Celton" },
      { line: "T2", stations: "Issy-Val-de-Seine → La Défense" },
      { line: "RER C", stations: "Issy · Issy-Val-de-Seine" },
      { line: "Future ligne 15", stations: "Issy RER (Grand Paris Express)" },
    ],
    atouts: [
      "Pôle tech & numérique majeur",
      "Île Saint-Germain & bords de Seine",
      "Écoles bilingues et internationales",
      "Programmes neufs récents",
      "Accès direct Paris 15e",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² à Issy-les-Moulineaux ?",
        a: "Entre 8 500 et 10 500 €/m² en moyenne. Les programmes neufs (Fort d'Issy, Cœur de Ville) et les bords de Seine atteignent 11 000 €/m².",
      },
      {
        q: "Issy-les-Moulineaux est-elle un bon investissement ?",
        a: "Oui : bassin d'emploi tech majeur, demande locative très forte (jeunes cadres), arrivée de la ligne 15 du Grand Paris qui valorisera durablement les biens.",
      },
      {
        q: "Quels sont les quartiers à privilégier ?",
        a: "Cœur de Ville et Corentin Celton pour la vie de quartier, Fort d'Issy et bords de Seine pour le neuf et la qualité de vie.",
      },
      {
        q: "Combien de temps pour vendre à Issy ?",
        a: "6 à 10 semaines pour un bien bien positionné. La demande est très soutenue sur les 2 et 3 pièces.",
      },
    ],
    estimationCta: "Vous vendez à Issy-les-Moulineaux ? Estimation experte sous 24h.",
  },

  "levallois-perret": {
    slug: "levallois-perret",
    name: "Levallois-Perret",
    postalCodes: ["92300"],
    cityMatch: ["levallois"],
    postalLabel: "Hauts-de-Seine · 92300",
    population: "65 000+",
    pricePerSqm: {
      low: 9000,
      mid: 10000,
      high: 11500,
      description: "9 000 à 11 500 €/m², portée par la proximité Paris 17e et les programmes récents.",
    },
    metaTitle: "Achat appartement Levallois-Perret (92300) | Prix m² & biens à vendre",
    metaDescription:
      "Acheter ou vendre un appartement à Levallois-Perret : prix au m², meilleurs quartiers et accompagnement personnalisé par notre agence locale.",
    heroIntro:
      "Levallois-Perret, l'extension naturelle de Paris 17e. Notre agence vous accompagne pour vendre ou acheter votre appartement.",
    marketParagraphs: [
      "**Levallois-Perret**, l'une des villes les plus denses d'Europe, est devenue une adresse incontournable pour les jeunes actifs et familles parisiennes : ambiance urbaine, propreté, services de proximité et accès direct au CBD parisien.",
      "Le **prix au m² à Levallois** s'établit entre 9 000 € et 11 500 €, avec des pointes vers 12 500 €/m² sur les axes recherchés (Anatole France, Front de Seine, proximité parc de la Planchette).",
      "La ville offre un cadre de vie urbain premium : 3 lignes de métro, sièges sociaux majeurs (LVMH, Alstom), écoles publiques et privées, parcs et bords de Seine.",
    ],
    stats: [
      { icon: Building2, val: "≈ 10 000 €/m²", label: "Prix moyen" },
      { icon: Users, val: "65 000+", label: "Habitants" },
      { icon: Landmark, val: "M3", label: "Direct Paris" },
      { icon: Briefcase, val: "Pôle tertiaire", label: "Bassin d'emploi" },
    ],
    quartiers: [
      { name: "Anatole France", desc: "Le plus recherché, autour du métro 3, immeubles haussmanniens et art déco." },
      { name: "Louise Michel", desc: "Quartier vivant, commerces, marché, idéal pour les familles." },
      { name: "Front de Seine", desc: "Programmes récents, vue Seine, terrasses, prisé par les cadres." },
      { name: "Pont de Levallois", desc: "Aux portes de Paris 17e, mixte ancien et neuf, bonne valorisation." },
      { name: "Wilson — Trézel", desc: "Calme, résidentiel, proche du parc de la Planchette." },
      { name: "Eiffel — Centre", desc: "Cœur de ville, mairie, commerces de proximité." },
    ],
    transports: [
      { line: "Ligne 3", stations: "Anatole France · Louise Michel · Pont de Levallois" },
      { line: "RER C", stations: "Pereire-Levallois (à proximité)" },
      { line: "Bus", stations: "Nombreuses lignes vers Paris et La Défense" },
      { line: "Future ligne 15", stations: "Levallois (Grand Paris Express)" },
    ],
    atouts: [
      "Proximité immédiate Paris 17e & CBD",
      "Sièges sociaux (LVMH, Alstom, Areva)",
      "Parcs : Planchette, île de la Jatte voisine",
      "Réseau dense de commerces premium",
      "Marché immobilier dynamique et liquide",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² à Levallois-Perret ?",
        a: "Entre 9 000 et 11 500 €/m² en moyenne. Les biens haussmanniens d'Anatole France et les programmes récents Front de Seine peuvent atteindre 12 500 €/m².",
      },
      {
        q: "Levallois est-elle bien desservie ?",
        a: "Excellemment : ligne 3 du métro (3 stations), bus vers La Défense et Paris, RER C à proximité, future ligne 15 du Grand Paris Express.",
      },
      {
        q: "Combien de temps pour vendre à Levallois ?",
        a: "Marché très liquide : 6 à 8 semaines pour un bien correctement estimé. Forte demande sur les 2/3 pièces et les biens avec extérieur.",
      },
      {
        q: "Faut-il acheter ou louer à Levallois ?",
        a: "Acheter reste pertinent en visée patrimoniale long terme : la demande locative est forte, et le prix est porté par la proximité Paris et l'arrivée du Grand Paris.",
      },
    ],
    estimationCta: "Vous vendez à Levallois-Perret ? Connaissez la vraie valeur de votre bien en 2 minutes.",
  },

  "paris-16": {
    slug: "paris-16",
    name: "Paris 16e",
    postalCodes: ["75116", "75016"],
    cityMatch: ["paris 16", "paris-16", "75016", "75116"],
    postalLabel: "Paris · 75016 / 75116",
    population: "165 000+",
    pricePerSqm: {
      low: 11000,
      mid: 12500,
      high: 14500,
      description: "11 000 à 14 500 €/m², avec des sommets pour Auteuil, Passy et les vues Bois.",
    },
    metaTitle: "Achat appartement Paris 16e (75016) | Prix m² & biens à vendre",
    metaDescription:
      "Acheter ou vendre un appartement dans le 16ème arrondissement de Paris : prix au m², quartiers, biens disponibles et accompagnement.",
    heroIntro:
      "Le 16ème arrondissement, cœur du Paris bourgeois. Notre agence vous accompagne pour vendre ou acheter votre appartement avec expertise et discrétion.",
    marketParagraphs: [
      "**Paris 16ème** est l'arrondissement le plus vaste et l'un des plus recherchés de la capitale : haussmannien, art déco, hôtels particuliers, ambassades, bois de Boulogne en limite ouest.",
      "Le **prix au m² dans le 16e** s'inscrit entre 11 000 € et 14 500 €, et grimpe régulièrement au-delà de 16 000 €/m² pour les biens haussmanniens d'Auteuil, Passy ou avec vue sur le Bois.",
      "Le 16e séduit familles internationales, expatriés et investisseurs patrimoniaux : écoles d'élite (Janson de Sailly, Molière), commerces premium, et un patrimoine architectural exceptionnel signé Guimard, Mallet-Stevens, Le Corbusier.",
    ],
    stats: [
      { icon: Building2, val: "≈ 12 500 €/m²", label: "Prix moyen" },
      { icon: Users, val: "165 000+", label: "Habitants" },
      { icon: Landmark, val: "8 lignes", label: "Métro & RER" },
      { icon: Trees, val: "Bois", label: "Boulogne en limite" },
    ],
    quartiers: [
      { name: "Auteuil", desc: "Le plus prisé : ambiance village, hôtels particuliers, écoles d'excellence." },
      { name: "Passy", desc: "Cœur bourgeois historique, haussmannien, commerces premium rue de Passy." },
      { name: "La Muette", desc: "Quartier verdoyant autour du jardin du Ranelagh, vue Bois recherchée." },
      { name: "Trocadéro", desc: "Adresse iconique, vue Tour Eiffel, hôtels particuliers et grands appartements." },
      { name: "Chaillot", desc: "Élégant, ambassades, musées, à deux pas des Champs-Élysées." },
      { name: "Porte Dauphine — Foch", desc: "Belles avenues haussmanniennes, prestige et calme résidentiel." },
    ],
    transports: [
      { line: "Lignes 6 / 9 / 10", stations: "Trocadéro · Passy · Auteuil · La Muette" },
      { line: "Ligne 2", stations: "Porte Dauphine · Victor Hugo" },
      { line: "RER C", stations: "Avenue Henri Martin · Boulainvilliers" },
      { line: "Bus", stations: "Réseau dense vers tout Paris" },
    ],
    atouts: [
      "Bois de Boulogne en limite immédiate",
      "Écoles publiques et privées d'élite",
      "Patrimoine architectural exceptionnel",
      "Commerces et restaurants premium",
      "Quartier diplomatique et résidentiel",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² dans le 16e arrondissement ?",
        a: "Entre 11 000 et 14 500 €/m² en moyenne. Auteuil, Passy et les vues Bois dépassent fréquemment 16 000 €/m². Les hôtels particuliers atteignent 20 000 €/m² et plus.",
      },
      {
        q: "Quels sont les meilleurs quartiers pour acheter dans le 16e ?",
        a: "Auteuil et Passy pour le cachet bourgeois, La Muette et Trocadéro pour la vue et le standing, Foch-Dauphine pour le grand classique haussmannien.",
      },
      {
        q: "Pourquoi vendre dans le 16e avec un chasseur immobilier ?",
        a: "Le 16e est un marché de connaisseurs : acheteurs internationaux, attentes de confidentialité, valorisation patrimoniale. Notre approche off-market et notre réseau qualifié maximisent votre prix de vente.",
      },
      {
        q: "Combien de temps pour vendre dans le 16e ?",
        a: "Comptez 8 à 16 semaines selon le segment de prix. Les biens d'exception peuvent partir off-market en quelques jours via notre réseau.",
      },
    ],
    estimationCta: "Vous vendez dans le 16e arrondissement ? Estimation experte en 2 minutes.",
  },

  "paris-15": {
    slug: "paris-15",
    name: "Paris 15e",
    postalCodes: ["75015"],
    cityMatch: ["paris 15", "paris-15", "75015"],
    postalLabel: "Paris · 75015",
    population: "230 000+",
    pricePerSqm: {
      low: 10000,
      mid: 11000,
      high: 12500,
      description: "10 000 à 12 500 €/m², avec des pointes pour Beaugrenelle et Convention.",
    },
    metaTitle: "Achat appartement Paris 15e (75015) | Prix m² & biens à vendre",
    metaDescription:
      "Acheter ou vendre un appartement dans le 15ème arrondissement de Paris : prix au m², meilleurs quartiers et accompagnement par notre agence.",
    heroIntro:
      "Le 15ème, l'arrondissement le plus peuplé de Paris, idéal pour familles et jeunes actifs. Notre agence vous accompagne pour vendre ou acheter.",
    marketParagraphs: [
      "**Paris 15ème** est l'arrondissement le plus peuplé de la capitale : très résidentiel, architecture variée (haussmannien, années 30, contemporain Beaugrenelle), grand parc André Citroën et bords de Seine.",
      "Le **prix au m² dans le 15e** s'établit entre 10 000 € et 12 500 €, avec des pointes vers 13 500 €/m² pour Convention, Necker, Beaugrenelle ou la rive haussmannienne du Champ-de-Mars.",
      "Le 15e séduit familles parisiennes : écoles publiques et privées de qualité, hôpital Necker, commerces de proximité partout, parcs (Citroën, Suzanne Lenglen), excellente desserte 6 lignes de métro.",
    ],
    stats: [
      { icon: Building2, val: "≈ 11 000 €/m²", label: "Prix moyen" },
      { icon: Users, val: "230 000+", label: "Habitants" },
      { icon: Landmark, val: "6 lignes", label: "Métro" },
      { icon: Trees, val: "Citroën", label: "Parc majeur" },
    ],
    quartiers: [
      { name: "Convention", desc: "Très recherché, ambiance village, marchés, écoles, ligne 12 directe." },
      { name: "Necker — Pasteur", desc: "Hôpital prestigieux, haussmannien, proche Tour Montparnasse." },
      { name: "Beaugrenelle — Front de Seine", desc: "Tours modernes, centre commercial, vue Seine, dynamique." },
      { name: "Cambronne — La Motte-Picquet", desc: "À deux pas du Champ-de-Mars, haussmannien chic." },
      { name: "Vaugirard", desc: "Coeur populaire et commerçant, marché Vaugirard." },
      { name: "Commerce — Émile Zola", desc: "Vivant, jeunes actifs, axe commerçant rue du Commerce." },
    ],
    transports: [
      { line: "Lignes 6 / 8 / 10 / 12 / 13", stations: "5 lignes traversent l'arrondissement" },
      { line: "RER C", stations: "Champ de Mars · Javel · Boulainvilliers" },
      { line: "T3a", stations: "Tramway boulevards des Maréchaux" },
      { line: "Bus", stations: "Réseau très dense" },
    ],
    atouts: [
      "Hôpital Necker (référence pédiatrique)",
      "Parc André Citroën & bords de Seine",
      "Écoles publiques et privées réputées",
      "Beaugrenelle (commerces, cinéma)",
      "Champ-de-Mars en limite est",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² dans le 15e arrondissement ?",
        a: "Entre 10 000 et 12 500 €/m² en moyenne. Convention, Beaugrenelle et l'axe Champ-de-Mars dépassent 13 000 €/m².",
      },
      {
        q: "Le 15e est-il un bon arrondissement pour les familles ?",
        a: "Oui : c'est l'un des arrondissements préférés des familles parisiennes pour ses écoles, ses parcs (Citroën, Lenglen), son hôpital Necker et son ambiance résidentielle.",
      },
      {
        q: "Combien de temps pour vendre dans le 15e ?",
        a: "6 à 10 semaines pour un bien correctement positionné. Marché très liquide, notamment sur les 2 et 3 pièces familiaux.",
      },
      {
        q: "Quels quartiers privilégier dans le 15e ?",
        a: "Convention et Pasteur-Necker pour le haussmannien familial, Beaugrenelle pour le moderne avec vue Seine, Cambronne pour la proximité Champ-de-Mars.",
      },
    ],
    estimationCta: "Vous vendez dans le 15e arrondissement ? Estimation gratuite et confidentielle.",
  },

  "paris-7": {
    slug: "paris-7",
    name: "Paris 7e",
    postalCodes: ["75007"],
    cityMatch: ["paris 7", "paris-7", "75007"],
    postalLabel: "Paris · 75007",
    population: "50 000+",
    pricePerSqm: {
      low: 14000,
      mid: 16000,
      high: 18500,
      description: "14 000 à 18 500 €/m², adresse rive gauche d'exception.",
    },
    metaTitle: "Achat appartement Paris 7e (75007) | Prix m² & biens à vendre",
    metaDescription:
      "Acheter ou vendre un appartement dans le 7ème arrondissement de Paris : prix au m², quartiers prestigieux et accompagnement personnalisé.",
    heroIntro:
      "Le 7ème, adresse iconique de la rive gauche : Tour Eiffel, Invalides, Faubourg Saint-Germain. Notre agence vous accompagne avec discrétion.",
    marketParagraphs: [
      "**Paris 7ème** est l'arrondissement le plus prestigieux de la rive gauche : Tour Eiffel, Invalides, École Militaire, Musée d'Orsay, Faubourg Saint-Germain — un patrimoine architectural et institutionnel d'exception.",
      "Le **prix au m² dans le 7e** s'inscrit entre 14 000 € et 18 500 €, et dépasse fréquemment 22 000 €/m² pour les hôtels particuliers du Faubourg, les vues Tour Eiffel ou les biens haussmanniens d'exception.",
      "Le 7e attire ambassades, ministères, familles patrimoniales et acheteurs internationaux : commerces premium rue Cler, rue du Bac, écoles d'élite (Sainte-Clotilde, Stanislas voisin), galeries d'art et antiquaires.",
    ],
    stats: [
      { icon: Building2, val: "≈ 16 000 €/m²", label: "Prix moyen" },
      { icon: Users, val: "50 000+", label: "Habitants" },
      { icon: Landmark, val: "Tour Eiffel", label: "Adresse iconique" },
      { icon: Wine, val: "Premium", label: "Commerces & galeries" },
    ],
    quartiers: [
      { name: "Faubourg Saint-Germain", desc: "Le plus prestigieux : hôtels particuliers, ministères, ambassades, ambiance feutrée." },
      { name: "Invalides", desc: "Autour du Dôme, esplanade verdoyante, immeubles haussmanniens d'exception." },
      { name: "Gros-Caillou — Champ-de-Mars", desc: "Vue Tour Eiffel, ambiance village, rue Cler animée." },
      { name: "École Militaire", desc: "Beaux haussmanniens, calme, proximité immédiate du Champ-de-Mars." },
      { name: "Saint-Thomas-d'Aquin", desc: "Cœur du Carré Rive Gauche, antiquaires, galeries d'art." },
      { name: "Rue du Bac", desc: "L'une des plus belles rues de Paris, commerces premium, bel haussmannien." },
    ],
    transports: [
      { line: "Lignes 8 / 12 / 13", stations: "École Militaire · Solférino · Varenne · Invalides" },
      { line: "RER C", stations: "Pont de l'Alma · Invalides · Musée d'Orsay" },
      { line: "Bus 69", stations: "Ligne historique vers le Marais" },
      { line: "Vélib & marche", stations: "Tout est à pied" },
    ],
    atouts: [
      "Tour Eiffel & Champ-de-Mars",
      "Faubourg Saint-Germain (patrimoine)",
      "Commerces premium (rue Cler, rue du Bac)",
      "Galeries d'art & antiquaires",
      "Écoles publiques et privées d'élite",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² dans le 7e arrondissement ?",
        a: "Entre 14 000 et 18 500 €/m² en moyenne. Les biens vue Tour Eiffel, les hôtels particuliers du Faubourg et les haussmanniens d'exception dépassent 22 000 €/m².",
      },
      {
        q: "Quels sont les meilleurs quartiers pour acheter dans le 7e ?",
        a: "Faubourg Saint-Germain pour le prestige absolu, Gros-Caillou pour la vue Tour Eiffel et l'ambiance village, Invalides pour les grands haussmanniens.",
      },
      {
        q: "Pourquoi vendre dans le 7e avec un chasseur ?",
        a: "Le 7e est un marché de connaisseurs et d'acheteurs internationaux. Notre approche confidentielle et notre réseau qualifié permettent de vendre au juste prix sans bradeur.",
      },
      {
        q: "Combien de temps pour vendre dans le 7e ?",
        a: "10 à 16 semaines selon le segment. Les biens d'exception se traitent souvent off-market via notre réseau (acheteurs internationaux, family offices).",
      },
    ],
    estimationCta: "Vous vendez dans le 7e arrondissement ? Estimation experte et confidentielle.",
  },

  "paris-6": {
    slug: "paris-6",
    name: "Paris 6e",
    postalCodes: ["75006"],
    cityMatch: ["paris 6", "paris-6", "75006"],
    postalLabel: "Paris · 75006",
    population: "40 000+",
    pricePerSqm: {
      low: 15000,
      mid: 17000,
      high: 20000,
      description: "15 000 à 20 000 €/m², l'un des arrondissements les plus chers de France.",
    },
    metaTitle: "Achat appartement Paris 6e (75006) | Prix m² & biens à vendre",
    metaDescription:
      "Acheter ou vendre un appartement dans le 6ème arrondissement de Paris : Saint-Germain, Odéon, Luxembourg. Estimation et accompagnement.",
    heroIntro:
      "Le 6ème, cœur intellectuel et chic de la rive gauche : Saint-Germain-des-Prés, Luxembourg, Odéon. Notre agence vous accompagne avec excellence.",
    marketParagraphs: [
      "**Paris 6ème** est l'un des arrondissements les plus chers et prestigieux de France : Saint-Germain-des-Prés, jardin du Luxembourg, Odéon, Sénat, écoles Beaux-Arts et Sciences Po.",
      "Le **prix au m² dans le 6e** s'établit entre 15 000 € et 20 000 €, et dépasse 25 000 €/m² pour les biens d'exception (vue Luxembourg, immeubles classés du carré Saint-Sulpice / Saint-Germain).",
      "Le 6e attire familles patrimoniales, intellectuels, professions libérales, acheteurs internationaux : galeries, librairies, cafés mythiques (Flore, Deux Magots), écoles d'élite, et une qualité de vie unique au monde.",
    ],
    stats: [
      { icon: Building2, val: "≈ 17 000 €/m²", label: "Prix moyen" },
      { icon: Users, val: "40 000+", label: "Habitants" },
      { icon: Trees, val: "Luxembourg", label: "Jardin majeur" },
      { icon: Sparkles, val: "Top 3", label: "Arrondissements premium" },
    ],
    quartiers: [
      { name: "Saint-Germain-des-Prés", desc: "Le mythe : abbaye, cafés littéraires, galeries, immeubles classés." },
      { name: "Odéon", desc: "Théâtre, Sénat, librairies, ambiance intellectuelle, beaux haussmanniens." },
      { name: "Luxembourg", desc: "Vue jardin, l'adresse rêvée des familles parisiennes patrimoniales." },
      { name: "Saint-Sulpice", desc: "Place mythique, marché Saint-Germain, commerces premium." },
      { name: "Mabillon — Buci", desc: "Cœur animé, marchés, restaurants, vie de quartier intense." },
      { name: "Notre-Dame-des-Champs", desc: "Plus calme, à la limite du 14e, proche Luxembourg." },
    ],
    transports: [
      { line: "Lignes 4 / 10 / 12", stations: "Saint-Germain · Odéon · Mabillon · Saint-Sulpice" },
      { line: "RER B", stations: "Luxembourg · Saint-Michel" },
      { line: "RER C", stations: "Saint-Michel-Notre-Dame" },
      { line: "Marche", stations: "Tout se fait à pied dans le 6e" },
    ],
    atouts: [
      "Jardin du Luxembourg",
      "Cafés et galeries Saint-Germain",
      "Écoles d'élite (Beaux-Arts, Sciences Po)",
      "Commerces premium et marchés",
      "Patrimoine architectural classé",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² dans le 6e arrondissement ?",
        a: "Entre 15 000 et 20 000 €/m² en moyenne. Les vues Luxembourg, les immeubles classés et les hôtels particuliers dépassent fréquemment 25 000 €/m².",
      },
      {
        q: "Quels sont les meilleurs quartiers pour acheter dans le 6e ?",
        a: "Vue Luxembourg pour le prestige absolu, Saint-Germain et Saint-Sulpice pour le cachet historique, Odéon-Mabillon pour la vie de quartier.",
      },
      {
        q: "Pourquoi vendre dans le 6e avec un chasseur ?",
        a: "Le 6e est un marché ultra-confidentiel : acheteurs internationaux, family offices, attentes de discrétion. Notre approche off-market et notre réseau permettent de maximiser la valeur.",
      },
      {
        q: "Combien de temps pour vendre dans le 6e ?",
        a: "12 à 20 semaines selon le segment. Les biens d'exception (Luxembourg, immeubles classés) se traitent souvent en off-market en quelques semaines via notre réseau qualifié.",
      },
    ],
    estimationCta: "Vous vendez dans le 6e arrondissement ? Estimation experte et confidentielle.",
  },
  "paris-17": {
    slug: "paris-17",
    name: "Paris 17e",
    postalCodes: ["75017"],
    cityMatch: ["paris 17"],
    postalLabel: "Paris · 75017",
    population: "159 000",
    pricePerSqm: {
      low: 7100,
      mid: 10000,
      high: 13300,
      description: "Autour de 10 000 €/m² en moyenne : moins de 9 000 €/m² aux Épinettes, plus de 10 500 €/m² en Plaine Monceau et aux Ternes.",
    },
    metaTitle: "Achat appartement Paris 17e (75017) | Prix m² 2026 & biens à vendre",
    metaDescription:
      "Acheter un appartement dans le 17e : prix au m² par quartier (Batignolles, Ternes, Plaine Monceau, Épinettes), transports et biens à vendre avec Emilio Immobilier.",
    heroIntro:
      "Vous cherchez à acheter ou à vendre un appartement dans le 17e ? Des Ternes aux Batignolles, nous vous accompagnons à chaque étape : les prix rue par rue, les biens visibles et hors marché, les visites, la négociation et la signature.",
    marketParagraphs: [
      "Le **17e arrondissement** réunit plusieurs Paris : l'ouest haussmannien de la **Plaine Monceau** et des **Ternes**, le village des **Batignolles**, les **Épinettes** plus abordables au nord, et le nouveau quartier **Clichy-Batignolles** autour du parc Martin-Luther-King.",
      "Le **prix au m² dans le 17e** tourne autour de 10 000 € en moyenne. Il dépasse 10 500 €/m² en Plaine Monceau et aux Ternes, et reste sous les 9 000 €/m² aux Épinettes. Les grands appartements familiaux avec ascenseur et balcon sont les plus recherchés.",
      "En 2026, le marché est stable, en légère hausse sur un an. La ligne 14 (Pont Cardinet, Porte de Clichy), le RER E à Porte Maillot et le tramway T3b ont nettement amélioré la desserte de l'arrondissement ces dernières années.",
    ],
    stats: [
      { icon: Building2, val: "≈ 10 000 €/m²", label: "Prix moyen" },
      { icon: Users, val: "159 000", label: "Habitants" },
      { icon: Landmark, val: "5 lignes", label: "Métro, dont la 14" },
      { icon: Trees, val: "10 ha", label: "Parc Martin-Luther-King" },
    ],
    quartiers: [
      { name: "Batignolles", desc: "L'esprit village autour du square et de la rue des Batignolles, très apprécié des jeunes couples et des familles." },
      { name: "Clichy-Batignolles", desc: "Le nouveau quartier autour du parc Martin-Luther-King et du Tribunal de Paris : immeubles récents, terrasses, ligne 14." },
      { name: "Ternes", desc: "De l'Étoile à la Porte Maillot, autour de l'avenue des Ternes et de la rue Poncelet : haussmannien, commerces, adresse prisée." },
      { name: "Plaine Monceau", desc: "Hôtels particuliers et grands appartements fin XIXe autour de la place Malesherbes, à deux pas du parc Monceau." },
      { name: "Épinettes", desc: "Ancien quartier ouvrier devenu très vivant, avec la cité des Fleurs : les prix les plus accessibles de l'arrondissement." },
      { name: "Pereire – Wagram", desc: "Immeubles haussmanniens et grands appartements familiaux, le long du boulevard Pereire et de l'avenue de Wagram." },
    ],
    transports: [
      { line: "Ligne 14", stations: "Pont Cardinet · Porte de Clichy" },
      { line: "Lignes 2 et 3", stations: "Ternes · Courcelles · Villiers · Pereire · Wagram · Malesherbes" },
      { line: "Ligne 13", stations: "La Fourche · Brochant · Guy Môquet · Porte de Clichy" },
      { line: "RER C et E", stations: "Pereire-Levallois · Porte de Clichy · Neuilly-Porte Maillot" },
      { line: "Tram T3b", stations: "Le long des boulevards des Maréchaux" },
    ],
    atouts: [
      "Parc Clichy-Batignolles – Martin-Luther-King et square des Batignolles",
      "Lycées Carnot et Honoré-de-Balzac",
      "Rues commerçantes et marchés : Lévis, Poncelet, Batignolles",
      "Palais des Congrès et Porte Maillot",
      "Le parc Monceau, juste à la limite du 8e",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² dans le 17e arrondissement ?",
        a: "Autour de 10 000 €/m² en moyenne en 2026, avec de vrais écarts selon le quartier : plus de 10 500 €/m² en Plaine Monceau et aux Ternes, autour de 10 000 €/m² aux Batignolles, moins de 9 000 €/m² aux Épinettes. L'étage, l'ascenseur, l'extérieur et l'état de l'immeuble font ensuite la différence.",
      },
      {
        q: "Quels quartiers choisir pour acheter dans le 17e ?",
        a: "La Plaine Monceau et les Ternes pour l'haussmannien et les grands appartements, les Batignolles pour l'ambiance village, Clichy-Batignolles pour le neuf autour du parc, et les Épinettes ou Guy Môquet pour des prix plus accessibles.",
      },
      {
        q: "Le 17e est-il bien desservi ?",
        a: "Oui : lignes 1, 2, 3, 13 et 14 du métro, RER C et RER E à Porte Maillot, ligne L à Pont-Cardinet et tramway T3b sur les Maréchaux.",
      },
      {
        q: "Combien de temps pour acheter dans le 17e ?",
        a: "Avec un mandat de recherche, comptez en général 3 à 4 mois entre le premier rendez-vous et la remise des clés, selon la rareté du bien recherché.",
      },
    ],
    estimationCta: "Vous vendez dans le 17e ? Découvrez la valeur de votre appartement en 2 minutes.",
  },

  "saint-cloud": {
    slug: "saint-cloud",
    name: "Saint-Cloud",
    postalCodes: ["92210"],
    cityMatch: ["saint-cloud", "saint cloud"],
    postalLabel: "Hauts-de-Seine · 92210",
    population: "29 900",
    pricePerSqm: {
      low: 4850,
      mid: 6500,
      high: 8850,
      description: "Autour de 6 500 €/m² pour un appartement, davantage à Montretout. Les maisons se vendent autour de 8 400 €/m² en moyenne.",
    },
    metaTitle: "Achat appartement Saint-Cloud (92210) | Prix m² 2026 & biens à vendre",
    metaDescription:
      "Acheter un appartement ou une maison à Saint-Cloud : prix au m² par quartier (Montretout, Coteaux, Val d'Or), transports, écoles et biens à vendre avec Emilio Immobilier.",
    heroIntro:
      "Vous cherchez à acheter ou à vendre à Saint-Cloud ? Appartement familial, maison à Montretout ou vue sur la Seine depuis les Coteaux : nous vous accompagnons de la recherche à la signature.",
    marketParagraphs: [
      "Entre le **domaine national de Saint-Cloud** et la Seine, **Saint-Cloud** est l'une des communes les plus résidentielles des Hauts-de-Seine : environ 30 000 habitants, beaucoup de familles, et plus de huit logements sur dix en appartement.",
      "Le **prix au m² à Saint-Cloud** tourne autour de 6 500 € pour un appartement en 2026, et autour de 8 400 € pour une maison. **Montretout** reste le secteur le plus recherché, tandis que **Fouilleuse** et le **Val d'Or** offrent des prix plus accessibles.",
      "Après une baisse en 2024 et 2025, les prix se sont stabilisés. La future gare de la ligne 15 Ouest, prévue vers 2031, viendra compléter une desserte déjà assurée par les lignes L et U et le tramway T2.",
    ],
    stats: [
      { icon: Building2, val: "≈ 6 500 €/m²", label: "Prix moyen" },
      { icon: Users, val: "29 900", label: "Habitants" },
      { icon: Landmark, val: "L · U · T2", label: "Train et tramway" },
      { icon: Trees, val: "460 ha", label: "Domaine national" },
    ],
    quartiers: [
      { name: "Centre", desc: "Autour de l'église et des rues commerçantes, proche de la gare de Saint-Cloud : appartements anciens et vie de quartier." },
      { name: "Montretout – Coutureau", desc: "Le secteur résidentiel le plus recherché, avec maisons et grands appartements, et le mieux tenu en prix." },
      { name: "Coteaux – Bords de Seine", desc: "Vues sur la Seine et sur Paris, desservi par le tramway T2 à la station Les Coteaux." },
      { name: "Pasteur – Magenta", desc: "Calme et familial, autour de la rue Pasteur et de l'American School of Paris." },
      { name: "Val d'Or", desc: "Autour de la gare du Val d'Or (ligne L), apprécié des actifs qui travaillent à La Défense ou à Paris." },
      { name: "Fouilleuse", desc: "Le secteur le plus accessible de la ville, à la limite de Rueil-Malmaison." },
    ],
    transports: [
      { line: "Ligne L", stations: "Gare de Saint-Cloud · Gare du Val d'Or (Saint-Lazare)" },
      { line: "Ligne U", stations: "Gare de Saint-Cloud (La Défense – La Verrière)" },
      { line: "Tram T2", stations: "Les Coteaux · Les Milons · Parc de Saint-Cloud" },
      { line: "Métro 10", stations: "Boulogne – Pont de Saint-Cloud, de l'autre côté du pont" },
    ],
    atouts: [
      "Domaine national de Saint-Cloud (460 ha, jardins de Le Nôtre)",
      "Hippodrome de Saint-Cloud",
      "Lycées Alexandre-Dumas et Santos-Dumont, American School of Paris",
      "La Défense et Paris en quelques minutes",
      "Musée des Avelines et centre-ville commerçant",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² à Saint-Cloud ?",
        a: "Autour de 6 500 €/m² pour un appartement en 2026, et autour de 8 400 €/m² pour une maison. Montretout se situe au-dessus de la moyenne, Fouilleuse et le Val d'Or en dessous.",
      },
      {
        q: "Quels quartiers choisir pour acheter à Saint-Cloud ?",
        a: "Montretout pour les maisons et les grands appartements, le centre pour la vie de quartier près de la gare, les Coteaux pour la vue sur la Seine, Pasteur-Magenta pour le calme et les écoles.",
      },
      {
        q: "Saint-Cloud est-elle bien desservie ?",
        a: "Oui : lignes L et U à la gare de Saint-Cloud (Saint-Lazare et La Défense), ligne L au Val d'Or, tramway T2 le long de la Seine, et métro 10 juste de l'autre côté du pont. Une gare de la ligne 15 Ouest est prévue vers 2031.",
      },
      {
        q: "Acheter une maison à Saint-Cloud, est-ce possible ?",
        a: "Oui, mais l'offre est rare : la grande majorité des logements sont des appartements. Les maisons se concentrent surtout à Montretout et sur les coteaux. Confier sa recherche permet d'être prévenu avant la mise en ligne.",
      },
    ],
    estimationCta: "Vous vendez à Saint-Cloud ? Découvrez la valeur de votre bien en 2 minutes.",
  },

  garches: {
    slug: "garches",
    name: "Garches",
    postalCodes: ["92380"],
    cityMatch: ["garches"],
    postalLabel: "Hauts-de-Seine · 92380",
    population: "17 700",
    pricePerSqm: {
      low: 4200,
      mid: 5800,
      high: 8050,
      description: "Autour de 5 800 €/m² pour un appartement et 7 350 €/m² pour une maison en moyenne, avec de gros écarts selon l'état et le terrain.",
    },
    metaTitle: "Achat appartement Garches (92380) | Prix m² 2026 & biens à vendre",
    metaDescription:
      "Acheter un appartement ou une maison à Garches : prix au m² par quartier, transports, cadre de vie et biens à vendre avec Emilio Immobilier, agence de l'Ouest parisien.",
    heroIntro:
      "Vous cherchez à acheter ou à vendre à Garches ? Maison avec jardin ou appartement au calme, entre le golf et le domaine de Saint-Cloud : nous vous accompagnons de la recherche à la signature.",
    marketParagraphs: [
      "Commune résidentielle de près de 18 000 habitants, **Garches** se situe entre le **domaine national de Saint-Cloud**, le bois de Saint-Cucufa et le golf de Saint-Cloud. Près d'un logement sur quatre y est une maison, ce qui en fait une adresse prisée des familles.",
      "Le **prix au m² à Garches** tourne autour de 5 800 € pour un appartement et 7 350 € pour une maison en 2026. Le centre, autour de la mairie, et le **Petit Garches** sont les secteurs les plus recherchés ; **Buzenval** reste le plus accessible.",
      "Après une forte hausse entre 2019 et 2022, les prix ont reculé en 2025, surtout pour les maisons. Pour un acheteur, c'est une fenêtre intéressante ; pour un vendeur, la justesse du prix de départ compte plus que jamais.",
    ],
    stats: [
      { icon: Building2, val: "≈ 5 800 €/m²", label: "Prix moyen" },
      { icon: Users, val: "17 700", label: "Habitants" },
      { icon: Landmark, val: "Ligne L", label: "Vers Saint-Lazare" },
      { icon: Trees, val: "Golf et bois", label: "Saint-Cloud, Saint-Cucufa" },
    ],
    quartiers: [
      { name: "Mairie – Centre", desc: "Commerces, écoles et gare à proximité : le cœur pratique de la ville." },
      { name: "Petit Garches", desc: "Villas et jardins, parmi les secteurs les plus recherchés de la commune." },
      { name: "Porte Jaune", desc: "Résidences de qualité et peu de biens à vendre, en lisière du golf." },
      { name: "Côte Saint-Louis", desc: "Résidentiel et calme, à quelques minutes du centre." },
      { name: "Poincaré", desc: "Autour de l'hôpital Raymond-Poincaré, sur le point le plus haut de la ville." },
      { name: "Buzenval", desc: "Le quartier le plus accessible de Garches, apprécié des primo-accédants." },
    ],
    transports: [
      { line: "Ligne L", stations: "Gare de Garches – Marnes-la-Coquette, Saint-Lazare en 20 à 30 minutes" },
      { line: "Bus", stations: "Lignes 360, 426, 459 et 467" },
    ],
    atouts: [
      "Golf de Saint-Cloud et bois de Saint-Cucufa",
      "Domaine national de Saint-Cloud au sud",
      "Hôpital Raymond-Poincaré (AP-HP)",
      "Église Saint-Louis, la première de France dédiée à saint Louis",
      "Un cadre calme, avec maisons et jardins",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² à Garches ?",
        a: "Autour de 5 800 €/m² pour un appartement et 7 350 €/m² pour une maison en 2026, en moyenne. Le centre et le Petit Garches sont au-dessus, Buzenval en dessous. Le terrain, l'état et l'exposition pèsent beaucoup sur le prix d'une maison.",
      },
      {
        q: "Quels quartiers choisir pour acheter à Garches ?",
        a: "Le centre pour avoir tout à pied, le Petit Garches et la Porte Jaune pour les maisons et le calme, Buzenval pour un budget plus doux.",
      },
      {
        q: "Comment rejoindre Paris depuis Garches ?",
        a: "La ligne L relie la gare de Garches – Marnes-la-Coquette à Saint-Lazare en 20 à 30 minutes. Plusieurs lignes de bus desservent aussi Saint-Cloud, Rueil et La Défense.",
      },
      {
        q: "Est-ce le bon moment pour acheter à Garches ?",
        a: "Après la baisse de 2025, les prix sont plus raisonnables qu'au pic de 2022, surtout pour les maisons. Les biens bien placés restent rares : mieux vaut être prêt, financement validé, pour se positionner vite.",
      },
    ],
    estimationCta: "Vous vendez à Garches ? Découvrez la valeur de votre bien en 2 minutes.",
  },

  clamart: {
    slug: "clamart",
    name: "Clamart",
    postalCodes: ["92140"],
    cityMatch: ["clamart"],
    postalLabel: "Hauts-de-Seine · 92140",
    population: "58 600",
    pricePerSqm: {
      low: 3750,
      mid: 5600,
      high: 7400,
      description: "Autour de 5 600 €/m² pour un appartement : plus de 6 000 €/m² près de la gare et à Percy, moins de 5 000 €/m² au Petit-Clamart. Maisons autour de 6 250 €/m².",
    },
    metaTitle: "Achat appartement Clamart (92140) | Prix m² 2026 & biens à vendre",
    metaDescription:
      "Acheter un appartement ou une maison à Clamart : prix au m² par quartier (Gare, Percy, Centre, Jardin Parisien), ligne 15, tramways et biens à vendre avec Emilio Immobilier.",
    heroIntro:
      "Vous cherchez à acheter ou à vendre à Clamart ? Près de la gare, en centre-ville ou en lisière de forêt : nous vous accompagnons de la recherche à la signature, avec une vraie connaissance des prix par quartier.",
    marketParagraphs: [
      "Aux portes de Paris et en lisière de la **forêt de Meudon**, **Clamart** compte près de 59 000 habitants. La ville mêle centre-ville commerçant, quartiers pavillonnaires et programmes récents, comme l'écoquartier **Panorama**.",
      "Le **prix au m² à Clamart** tourne autour de 5 600 € pour un appartement en 2026. Il dépasse 6 000 €/m² dans les quartiers **de la Gare** et **Percy**, et reste plus accessible au **Petit-Clamart**.",
      "Clamart fait partie des rares marchés du secteur en hausse sur un an. L'arrivée de la **ligne 15 Sud** à la gare Fort d'Issy – Vanves – Clamart, attendue à l'automne 2027, et le tramway T10 renforcent son attrait.",
    ],
    stats: [
      { icon: Building2, val: "≈ 5 600 €/m²", label: "Prix moyen" },
      { icon: Users, val: "58 600", label: "Habitants" },
      { icon: Landmark, val: "N · T6 · T10", label: "Train et tramways" },
      { icon: Sparkles, val: "Ligne 15", label: "Attendue fin 2027" },
    ],
    quartiers: [
      { name: "Centre-ville", desc: "Mairie, église Saint-Pierre-Saint-Paul et un grand marché : le cœur commerçant de la ville." },
      { name: "La Gare", desc: "Ligne N vers Montparnasse et future ligne 15 : le quartier le plus suivi par les acheteurs." },
      { name: "Percy", desc: "Résidentiel, autour de l'hôpital Percy, parmi les quartiers les plus chers de Clamart." },
      { name: "Jardin Parisien", desc: "Ancien lotissement du début du XXe siècle, maisons et petits immeubles, terminus du tramway T10." },
      { name: "Panorama", desc: "Écoquartier récent sur l'ancien site d'EDF, avec son plan d'eau et des immeubles neufs." },
      { name: "Petit-Clamart", desc: "Sur le plateau, en bordure de forêt : les prix les plus accessibles de la ville." },
    ],
    transports: [
      { line: "Ligne N", stations: "Gare de Clamart, Montparnasse en 7 minutes environ" },
      { line: "Tram T6", stations: "Hôpital Béclère · Pavé Blanc" },
      { line: "Tram T10", stations: "Jardin Parisien → Antony" },
      { line: "Ligne 15 Sud", stations: "Fort d'Issy – Vanves – Clamart, attendue à l'automne 2027" },
    ],
    atouts: [
      "Bois de Clamart et forêt de Meudon",
      "Marché du centre-ville",
      "Hôpitaux Antoine-Béclère et Percy",
      "Écoquartier Panorama et son plan d'eau",
      "Montparnasse en quelques minutes",
    ],
    faqs: [
      {
        q: "Quel est le prix au m² à Clamart ?",
        a: "Autour de 5 600 €/m² pour un appartement en 2026. Plus de 6 000 €/m² près de la gare et à Percy, environ 5 700 €/m² en centre-ville, moins de 5 000 €/m² au Petit-Clamart. Les maisons tournent autour de 6 250 €/m².",
      },
      {
        q: "Quels quartiers choisir pour acheter à Clamart ?",
        a: "La Gare et Percy pour la proximité de Paris et de la future ligne 15, le centre-ville pour les commerces et le marché, le Jardin Parisien pour les maisons, le Petit-Clamart pour un budget plus doux près de la forêt.",
      },
      {
        q: "Quand la ligne 15 arrive-t-elle à Clamart ?",
        a: "La gare Fort d'Issy – Vanves – Clamart de la ligne 15 Sud est attendue à l'automne 2027, sous l'actuelle gare SNCF, en correspondance avec la ligne N.",
      },
      {
        q: "Clamart est-elle un bon investissement ?",
        a: "Les prix y progressent légèrement alors que le secteur est plutôt stable, et la ligne 15 va rapprocher la ville du reste du Grand Paris. La demande locative est soutenue près de la gare et des tramways.",
      },
    ],
    estimationCta: "Vous vendez à Clamart ? Découvrez la valeur de votre bien en 2 minutes.",
  },
};

export const getCityData = (slug: string): CityData | null => cities[slug] || null;
export const cityList = Object.values(cities);
