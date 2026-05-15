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
    metaTitle: "Achat appartement Boulogne-Billancourt (92100) | Prix m² "Achat appartement Boulogne-Billancourt (92100) — Emilio Immobilier" biens à vendre",
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
    metaTitle: "Achat appartement Neuilly-sur-Seine (92200) | Prix m² "Achat appartement Neuilly-sur-Seine (92200) — Emilio Immobilier" biens à vendre",
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
    metaTitle: "Achat appartement Issy-les-Moulineaux (92130) | Prix m² "Achat appartement Issy-les-Moulineaux (92130) — Emilio Immobilier" biens à vendre",
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
    metaTitle: "Achat appartement Levallois-Perret (92300) | Prix m² "Achat appartement Levallois-Perret (92300) — Emilio Immobilier" biens à vendre",
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
    metaTitle: "Achat appartement Paris 16e (75016) | Prix m² "Achat appartement Paris 16e — Emilio Immobilier" biens à vendre",
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
    metaTitle: "Achat appartement Paris 15e (75015) | Prix m² "Achat appartement Paris 15e — Emilio Immobilier" biens à vendre",
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
    metaTitle: "Achat appartement Paris 7e (75007) | Prix m² "Achat appartement Paris 7e — Emilio Immobilier" biens à vendre",
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
    metaTitle: "Achat appartement Paris 6e (75006) | Prix m² "Achat appartement Paris 6e — Emilio Immobilier" biens à vendre",
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
};

export const getCityData = (slug: string): CityData | null => cities[slug] || null;
export const cityList = Object.values(cities);
