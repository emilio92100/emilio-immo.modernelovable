export type SellCityData = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroIntro: string;
  avgDelayCity: string; // délai moyen marché ville
  avgDelayUs: string; // délai avec notre agence
  profilAcheteurs: string;
  marketAngle: string; // pourquoi vendre maintenant
  quartiersForts: { name: string; desc: string }[];
  pointsForts: string[];
  erreursAEviter: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

const sellCities: Record<string, SellCityData> = {
  "boulogne-billancourt": {
    slug: "boulogne-billancourt",
    metaTitle: "Vendre appartement Boulogne-Billancourt (92100) — Emilio Immobilier",
    metaDescription:
      "Vendre votre appartement à Boulogne-Billancourt : estimation gratuite, délai moyen, méthode off-market et accompagnement par notre agence locale.",
    heroIntro:
      "Vendre votre bien à Boulogne-Billancourt au juste prix, sans bradeur ni perte de temps. Notre équipe locale active son réseau d'acheteurs qualifiés avant même la mise en ligne.",
    avgDelayCity: "75 jours",
    avgDelayUs: "45 jours",
    profilAcheteurs:
      "Familles parisiennes en recherche de plus grand, cadres travaillant à Issy/La Défense, primo-accédants attirés par la ligne 9 et le futur Grand Paris Express.",
    marketAngle:
      "Boulogne-Billancourt reste l'une des villes les plus liquides du 92 : la demande dépasse encore l'offre sur les T2/T3 avec balcon, et le projet Île Seguin valorise l'ensemble de la ville sur 5 ans.",
    faqs: [
      {
        q: "Quels documents pour vendre un appartement à Boulogne-Billancourt ?",
        a: "Titre de propriété, dernier appel de fonds, PV des 3 dernières AG, règlement de copropriété, pré-état daté, carnet d'entretien, et le DDT (DPE, plomb, amiante, électricité, gaz, ERP, surface Carrez). Notre équipe centralise tout pour vous.",
      },
      {
        q: "Vente off-market ou publique : que choisir à Boulogne ?",
        a: "L'off-market fonctionne très bien à Boulogne pour les biens premium (Centre, Parchamp, Île Seguin) car notre vivier d'acheteurs déjà qualifiés permet souvent de signer en 2 à 4 semaines, sans visites chronophages ni négociation à la baisse.",
      },
      {
        q: "Faut-il vendre vide ou meublé à Boulogne-Billancourt ?",
        a: "Vide dans 95 % des cas : la demande locale est dominée par la résidence principale. Pour un studio destiné à un investisseur (proche métro 9), le meublé peut valoriser le bien de 3 à 5 %.",
      },
      {
        q: "Quelle plus-value imposable lors d'une vente à Boulogne ?",
        a: "La résidence principale est exonérée. Sur une résidence secondaire ou un investissement locatif, comptez un abattement progressif sur la durée de détention (exonération totale après 22 ans pour l'IR et 30 ans pour les prélèvements sociaux).",
      },
      {
        q: "Quels sont les diagnostics obligatoires ?",
        a: "DPE, plomb (avant 1949), amiante (avant 1997), électricité et gaz (>15 ans), ERP, état parasitaire si arrêté préfectoral, surface Loi Carrez. Tous valides à la signature du compromis.",
      },
      {
        q: "Combien de temps entre le compromis et la signature à Boulogne ?",
        a: "En moyenne 2,5 à 3 mois. Notre équipe pilote l'ensemble : rendez-vous notaire, levée des conditions suspensives, financement acheteur, jusqu'à la remise des clés.",
      },
    ],
  },

  "neuilly-sur-seine": {
    slug: "neuilly-sur-seine",
    metaTitle: "Vendre appartement Neuilly-sur-Seine (92200) — Emilio Immobilier",
    metaDescription:
      "Vendre votre appartement à Neuilly-sur-Seine en toute confidentialité : estimation experte, vente off-market et réseau d'acheteurs internationaux qualifiés.",
    heroIntro:
      "Vendre votre bien à Neuilly-sur-Seine avec discrétion absolue. Notre approche off-market protège votre vie privée et active un réseau d'acheteurs déjà qualifiés.",
    avgDelayCity: "85 jours",
    avgDelayUs: "50 jours",
    profilAcheteurs:
      "Familles fortunées, professions libérales, expatriés et dirigeants. Beaucoup d'acheteurs internationaux et de family offices cherchent une adresse à Neuilly comme valeur refuge.",
    marketAngle:
      "Neuilly est un marché de connaisseurs où le bouche-à-oreille discret pèse plus que les portails. Les biens de qualité partent souvent avant publication grâce au réseau qualifié.",
    faqs: [
      {
        q: "Pourquoi vendre off-market à Neuilly-sur-Seine ?",
        a: "Pour préserver votre vie privée (pas de visites publiques, pas de photos diffusées), maîtriser le calendrier et éviter la décote liée à un bien resté trop longtemps en ligne. La demande off-market à Neuilly est structurellement supérieure à l'offre.",
      },
      {
        q: "Quels documents préparer pour la vente ?",
        a: "Titre de propriété, 3 dernières AG, règlement de copropriété, pré-état daté, carnet d'entretien, ensemble des diagnostics (DPE, plomb, amiante, électricité, gaz, ERP, surface Carrez). Notre équipe gère la coordination notaire/syndic.",
      },
      {
        q: "Vendre un hôtel particulier à Neuilly : quelle stratégie ?",
        a: "Approche 100 % confidentielle, dossier de présentation premium, sélection manuelle de 3 à 5 acheteurs cibles via notre réseau international. Aucune diffusion publique avant accord du vendeur.",
      },
      {
        q: "Quelle plus-value sur la vente à Neuilly ?",
        a: "Résidence principale exonérée. Pour un investissement, abattement progressif (exonération IR à 22 ans, prélèvements sociaux à 30 ans). Au-delà de 50 000 € de plus-value imposable, surtaxe de 2 à 6 %.",
      },
      {
        q: "Mon bien intéresse-t-il un acheteur international ?",
        a: "Oui, fortement. Neuilly est l'une des trois adresses les plus demandées par les acheteurs internationaux en Île-de-France (avec Paris 7/16). Notre dossier de présentation est systématiquement bilingue FR/EN.",
      },
      {
        q: "Combien de temps entre le compromis et l'acte ?",
        a: "2,5 à 3 mois en moyenne. Sur un acheteur international cash, possibilité d'accélérer à 6-8 semaines.",
      },
    ],
  },

  "issy-les-moulineaux": {
    slug: "issy-les-moulineaux",
    metaTitle: "Vendre appartement Issy-les-Moulineaux (92130) — Emilio Immobilier",
    metaDescription:
      "Vendre votre appartement à Issy-les-Moulineaux : estimation gratuite, délai moyen 45 jours, accompagnement complet par notre agence locale.",
    heroIntro:
      "Vendre votre bien à Issy-les-Moulineaux dans un marché ultra-dynamique porté par le tech hub et l'arrivée du Grand Paris Express. Notre équipe valorise chaque atout local.",
    avgDelayCity: "60 jours",
    avgDelayUs: "40 jours",
    profilAcheteurs:
      "Jeunes cadres tech (Microsoft, Bouygues, Cisco), familles primo-accédantes, et investisseurs anticipant la valorisation liée à la ligne 15 du Grand Paris Express.",
    marketAngle:
      "Issy bénéficie d'une demande exceptionnelle sur les 2/3 pièces récents. L'arrivée prochaine de la ligne 15 (Issy RER) crée une fenêtre de valorisation de 8 à 15 % sur 3 ans.",
    faqs: [
      {
        q: "Faut-il vendre avant ou après l'arrivée de la ligne 15 ?",
        a: "Pour les biens proches de la future gare, attendre peut faire gagner 5 à 10 %. Pour les biens plus éloignés, la valorisation sera marginale : mieux vaut vendre maintenant pour profiter d'un marché déjà tendu.",
      },
      {
        q: "Quels documents pour vendre à Issy-les-Moulineaux ?",
        a: "Titre, 3 dernières AG, règlement de copropriété, pré-état daté, diagnostics (DPE, plomb, amiante, électricité, gaz, ERP, Carrez). Notre équipe centralise et coordonne avec le syndic.",
      },
      {
        q: "Mon programme neuf récent : faut-il une stratégie particulière ?",
        a: "Oui : valorisation des labels (RT2012, NF Habitat), DPE souvent A/B (très recherché), services collectifs (gardien, conciergerie). Notre dossier de présentation met en avant ces atouts cachés.",
      },
      {
        q: "Vendre à un investisseur ou à un occupant : quelle différence ?",
        a: "Investisseur : décision rapide, pas de visite émotionnelle, mais offre souvent 3-5 % en dessous. Occupant : process plus long, mais souvent meilleur prix. Notre stratégie cible les deux selon le bien.",
      },
      {
        q: "Quelle plus-value en cas de vente d'un investissement locatif ?",
        a: "Abattement progressif sur la durée de détention. Possibilité d'optimisation via réinvestissement (loi Pinel, démembrement). Notre équipe oriente vers un notaire fiscaliste si pertinent.",
      },
      {
        q: "Délais entre compromis et signature ?",
        a: "2,5 à 3 mois. Le marché Issy est très liquide : peu de désistements et financements rapides chez les jeunes cadres.",
      },
    ],
  },

  "levallois-perret": {
    slug: "levallois-perret",
    metaTitle: "Vendre appartement Levallois-Perret (92300) — Emilio Immobilier",
    metaDescription:
      "Vendre votre appartement à Levallois-Perret : estimation gratuite, marché ultra-liquide, accompagnement complet par notre agence locale.",
    heroIntro:
      "Vendre votre bien à Levallois-Perret sur un marché parmi les plus liquides d'Île-de-France. Notre équipe maximise votre prix grâce à une connaissance fine du tissu local.",
    avgDelayCity: "55 jours",
    avgDelayUs: "35 jours",
    profilAcheteurs:
      "Jeunes couples actifs travaillant à La Défense ou Paris 17e, cadres LVMH/Alstom, et investisseurs séduits par la liquidité du marché et la rentabilité locative.",
    marketAngle:
      "Levallois est l'un des marchés les plus liquides du 92 : à prix juste, un bien part en moins de 6 semaines. La proximité immédiate de Paris 17e et l'arrivée de la ligne 15 soutiennent la valorisation.",
    faqs: [
      {
        q: "Pourquoi le marché est-il si rapide à Levallois ?",
        a: "Demande structurellement supérieure à l'offre : ville dense, transports excellents (M3, future M15), bassin d'emploi premium. Les 2/3 pièces partent en quelques semaines à prix juste.",
      },
      {
        q: "Quels documents pour vendre à Levallois-Perret ?",
        a: "Titre, 3 dernières AG, règlement de copropriété, pré-état daté, diagnostics complets (DPE, plomb, amiante, électricité, gaz, ERP, Carrez). Notre équipe coordonne tout en parallèle.",
      },
      {
        q: "Investisseur ou résidence principale : quel acheteur cibler ?",
        a: "Levallois attire historiquement les investisseurs (rentabilité ~3,5 %), mais la part des résidents principaux croît. Notre stratégie cible le profil qui valorise le mieux votre bien.",
      },
      {
        q: "Faut-il refaire des travaux avant de vendre ?",
        a: "Sur Levallois, un bien rénové se vend 8 à 12 % plus cher. Notre équipe identifie les rénovations à fort retour (cuisine, peintures, sols) vs celles à éviter (rénovation lourde).",
      },
      {
        q: "Quelle plus-value imposable ?",
        a: "Résidence principale exonérée. Investissement : abattement progressif jusqu'à exonération totale (22 ans IR, 30 ans prélèvements sociaux).",
      },
      {
        q: "Combien de temps entre compromis et acte ?",
        a: "2,5 à 3 mois. Marché très fluide, peu de mauvaises surprises sur le financement.",
      },
    ],
  },

  "paris-16": {
    slug: "paris-16",
    metaTitle: "Vendre appartement Paris 16e (75016) — Emilio Immobilier",
    metaDescription:
      "Vendre votre appartement dans le 16ème arrondissement de Paris : estimation experte, vente off-market et réseau d'acheteurs qualifiés.",
    heroIntro:
      "Vendre votre bien dans le 16e arrondissement avec discrétion et exigence. Notre approche off-market valorise les biens patrimoniaux auprès d'acheteurs déjà qualifiés.",
    avgDelayCity: "100 jours",
    avgDelayUs: "60 jours",
    profilAcheteurs:
      "Familles internationales, expatriés, investisseurs patrimoniaux français et étrangers, professions libérales. Le 16e est une valeur refuge pour les acheteurs internationaux.",
    marketAngle:
      "Le 16e reste l'un des arrondissements les plus stables du marché parisien. La rareté des biens haussmanniens d'exception (Auteuil, Passy, vue Bois) maintient une tension acheteur permanente.",
    faqs: [
      {
        q: "Pourquoi vendre off-market dans le 16e ?",
        a: "Confidentialité (vous évitez les visites de curieux), maîtrise du calendrier, pas de décote liée à un bien resté trop longtemps en ligne. Le 16e est l'un des arrondissements où la demande off-market est la plus forte.",
      },
      {
        q: "Quels documents pour vendre dans le 16e ?",
        a: "Titre, 3 dernières AG, règlement de copropriété, pré-état daté, carnet d'entretien, diagnostics complets (DPE, plomb avant 1949, amiante avant 1997, électricité, gaz, ERP, Carrez).",
      },
      {
        q: "Mon haussmannien intéresse-t-il les acheteurs internationaux ?",
        a: "Oui, fortement. Le haussmannien parisien reste l'actif refuge n°1 des acheteurs internationaux. Notre dossier de présentation est systématiquement bilingue FR/EN.",
      },
      {
        q: "Faut-il rénover avant de vendre dans le 16e ?",
        a: "Le marché du 16e valorise les biens en l'état d'origine pour les acheteurs souhaitant signer une rénovation à leur goût. Une rénovation lourde n'est pas toujours rentable.",
      },
      {
        q: "Quelle plus-value imposable ?",
        a: "Résidence principale exonérée. Investissement : abattement progressif jusqu'à exonération totale. Surtaxe au-delà de 50 000 € de plus-value imposable (2 à 6 %).",
      },
      {
        q: "Combien de temps pour vendre dans le 16e ?",
        a: "8 à 16 semaines selon le segment. Les biens d'exception (vue Bois, hôtels particuliers) peuvent se traiter en 4 à 6 semaines via notre réseau international.",
      },
    ],
  },

  "paris-15": {
    slug: "paris-15",
    metaTitle: "Vendre appartement Paris 15e (75015) — Emilio Immobilier",
    metaDescription:
      "Vendre votre appartement dans le 15ème arrondissement de Paris : estimation experte, marché familial dynamique et accompagnement complet.",
    heroIntro:
      "Vendre votre bien dans le 15e, l'un des arrondissements les plus liquides de Paris. Notre équipe maximise votre prix grâce à un réseau de familles parisiennes en recherche.",
    avgDelayCity: "70 jours",
    avgDelayUs: "45 jours",
    profilAcheteurs:
      "Familles parisiennes recherchant école + parc, jeunes couples primo-accédants, médecins/professions libérales (proximité Necker, Pasteur), investisseurs.",
    marketAngle:
      "Le 15e bénéficie d'une demande structurelle des familles parisiennes attirées par les écoles, les parcs (Citroën, Lenglen) et la qualité de vie. Les 3/4 pièces partent rapidement.",
    faqs: [
      {
        q: "Quel est le profil acheteur dans le 15e ?",
        a: "Très majoritairement des familles parisiennes (60 %), des jeunes couples (25 %) et des investisseurs (15 %). La résidence principale domine le marché.",
      },
      {
        q: "Quels documents pour vendre dans le 15e ?",
        a: "Titre, 3 dernières AG, règlement de copropriété, pré-état daté, diagnostics (DPE, plomb, amiante, électricité, gaz, ERP, Carrez). Notre équipe centralise.",
      },
      {
        q: "Faut-il valoriser la proximité école dans l'annonce ?",
        a: "Oui : c'est le critère n°1 des acheteurs familles dans le 15e. Notre dossier de présentation détaille systématiquement les écoles publiques et privées de secteur.",
      },
      {
        q: "Faut-il rénover avant de vendre ?",
        a: "Sur le 15e, une rénovation légère (cuisine, peintures) rapporte 8 à 10 %. Une rénovation lourde rarement. Notre équipe arbitre selon votre bien.",
      },
      {
        q: "Quelle plus-value imposable ?",
        a: "Résidence principale exonérée. Investissement : abattement progressif (exonération à 22 ans IR, 30 ans prélèvements sociaux).",
      },
      {
        q: "Combien de temps pour vendre dans le 15e ?",
        a: "6 à 10 semaines pour un bien correctement positionné. Marché très liquide notamment sur les 3/4 pièces familiaux avec extérieur.",
      },
    ],
  },

  "paris-7": {
    slug: "paris-7",
    metaTitle: "Vendre appartement Paris 7e (75007) — Emilio Immobilier",
    metaDescription:
      "Vendre votre appartement dans le 7ème arrondissement de Paris en toute confidentialité : estimation experte et réseau d'acheteurs internationaux.",
    heroIntro:
      "Vendre votre bien dans le 7e, adresse iconique de la rive gauche, avec discrétion absolue. Notre approche off-market protège votre vie privée et cible des acheteurs déjà qualifiés.",
    avgDelayCity: "120 jours",
    avgDelayUs: "70 jours",
    profilAcheteurs:
      "Acheteurs internationaux (Moyen-Orient, USA, Asie), family offices, dirigeants français, ambassadeurs et professions libérales d'élite.",
    marketAngle:
      "Le 7e est un marché ultra-confidentiel et international. La part d'acheteurs étrangers dépasse 30 %. Les biens vue Tour Eiffel ou Faubourg Saint-Germain conservent une valorisation premium en toutes circonstances.",
    faqs: [
      {
        q: "Pourquoi vendre off-market dans le 7e ?",
        a: "Confidentialité absolue, maîtrise du calendrier, ciblage international. Le 7e est l'arrondissement où la vente off-market est la plus utilisée à Paris.",
      },
      {
        q: "Quels documents pour vendre dans le 7e ?",
        a: "Titre, 3 dernières AG, règlement de copropriété, pré-état daté, carnet d'entretien, ensemble des diagnostics. Notre équipe coordonne notaire et syndic.",
      },
      {
        q: "Mon bien intéresse-t-il les acheteurs internationaux ?",
        a: "Oui, le 7e est l'une des trois adresses les plus demandées par les acheteurs internationaux en France. Dossier de présentation systématiquement bilingue FR/EN, et trilingue sur demande.",
      },
      {
        q: "Vendre un hôtel particulier dans le 7e : quelle stratégie ?",
        a: "Approche 100 % confidentielle, sélection manuelle d'acheteurs cibles via notre réseau international, aucune diffusion publique sans votre accord. Délai habituel : 6 à 12 semaines.",
      },
      {
        q: "Quelle plus-value imposable ?",
        a: "Résidence principale exonérée. Investissement : abattement progressif. Surtaxe au-delà de 50 000 € de plus-value (2 à 6 %).",
      },
      {
        q: "Combien de temps pour vendre dans le 7e ?",
        a: "10 à 16 semaines en moyenne. Sur un acheteur international cash, possibilité de signer en 6 à 8 semaines.",
      },
    ],
  },

  "paris-6": {
    slug: "paris-6",
    metaTitle: "Vendre appartement Paris 6e (75006) — Emilio Immobilier",
    metaDescription:
      "Vendre votre appartement dans le 6ème arrondissement de Paris en toute confidentialité : estimation experte et réseau d'acheteurs qualifiés.",
    heroIntro:
      "Vendre votre bien dans le 6e, cœur intellectuel et chic de la rive gauche, avec excellence et discrétion. Notre approche off-market valorise chaque mètre carré.",
    avgDelayCity: "130 jours",
    avgDelayUs: "75 jours",
    profilAcheteurs:
      "Acheteurs internationaux, family offices, intellectuels, professions libérales, familles patrimoniales françaises et étrangères.",
    marketAngle:
      "Le 6e est l'un des marchés les plus chers et les plus confidentiels de France. La rareté des biens (jardin du Luxembourg, immeubles classés) maintient une tension permanente, en particulier sur les vues Luxembourg et le carré Saint-Sulpice.",
    faqs: [
      {
        q: "Pourquoi vendre off-market dans le 6e ?",
        a: "Pour préserver votre vie privée, maîtriser le calendrier et cibler les acheteurs réellement qualifiés (family offices, internationaux). Aucune diffusion publique sans votre accord.",
      },
      {
        q: "Quels documents pour vendre dans le 6e ?",
        a: "Titre, 3 dernières AG, règlement de copropriété, pré-état daté, carnet d'entretien, diagnostics complets (DPE, plomb avant 1949, amiante avant 1997, électricité, gaz, ERP, Carrez).",
      },
      {
        q: "Mon bien vue Luxembourg : quelle stratégie ?",
        a: "Approche ultra-confidentielle, sélection de 3 à 5 acheteurs cibles via notre réseau international, dossier de présentation premium FR/EN. Les vues Luxembourg se traitent souvent en 4 à 8 semaines.",
      },
      {
        q: "Quelle valorisation pour un immeuble classé ?",
        a: "Les biens en immeuble classé du 6e bénéficient d'une décote zéro voire d'une prime patrimoniale. Notre dossier valorise le classement, l'historique de l'immeuble et le caractère.",
      },
      {
        q: "Quelle plus-value imposable ?",
        a: "Résidence principale exonérée. Investissement : abattement progressif. Surtaxe au-delà de 50 000 € de plus-value (2 à 6 %).",
      },
      {
        q: "Combien de temps pour vendre dans le 6e ?",
        a: "12 à 20 semaines. Sur un acheteur international cash, possibilité de signer en 6 à 10 semaines via notre réseau qualifié.",
      },
    ],
  },
};

export const getSellCityData = (slug: string): SellCityData | null => sellCities[slug] || null;
export const sellCityList = Object.values(sellCities);