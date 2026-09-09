/**
 * Protection anti-robots pour les formulaires publics.
 *
 * 3 couches :
 *  1. Champ piège (honeypot) invisible pour les humains, souvent rempli par les bots.
 *  2. Temps de remplissage minimum (un bot poste en moins de 3 secondes).
 *  3. Heuristiques de contenu : texte aléatoire, téléphone non français, email jetable.
 */

const MIN_FILL_MS = 3000;
const RATE_LIMIT_KEY = "ei_last_submit";
const RATE_LIMIT_MS = 30_000;

export const honeypotFieldName = "company_website";

/** Styles pour cacher le champ piège sans utiliser display:none (détecté par les bots). */
export const honeypotStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  width: "1px",
  height: "1px",
  opacity: 0,
  pointerEvents: "none",
};

const VOWELS = /[aeiouyàâéèêëîïôöûü]/i;

/** Détecte les chaînes générées aléatoirement (ex: "SJyjnmHmgjnCTrcqXYVl"). */
export function looksRandom(value: string): boolean {
  const cleaned = value.trim();
  if (cleaned.length < 8) return false;

  const words = cleaned.split(/\s+/).filter((w) => w.length >= 6);
  if (words.length === 0) return false;

  let suspicious = 0;
  for (const word of words) {
    const letters = word.replace(/[^a-zA-ZÀ-ÿ]/g, "");
    if (letters.length < 6) continue;

    const vowelCount = (letters.match(/[aeiouyàâéèêëîïôöûü]/gi) || []).length;
    const vowelRatio = vowelCount / letters.length;

    // Alternance de casse en milieu de mot (typique du charabia généré)
    const caseSwitches = letters
      .slice(1)
      .split("")
      .filter((c, i) => /[A-Z]/.test(c) !== /[A-Z]/.test(letters[i])).length;

    if (!VOWELS.test(letters) || vowelRatio < 0.25 || caseSwitches >= 4) {
      suspicious++;
    }
  }

  return suspicious >= 1 && suspicious >= Math.ceil(words.length / 2);
}

/** Numéro français : 0X XX XX XX XX ou +33... */
export function isValidFrenchPhone(phone: string): boolean {
  const digits = phone.replace(/[\s.\-()]/g, "");
  return /^(?:\+33|0033|0)[1-9]\d{8}$/.test(digits);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

export type AntiBotInput = {
  honeypot: string;
  startedAt: number;
  name?: string;
  message?: string;
  phone?: string;
  email?: string;
  /** Le téléphone est-il obligatoire et doit-il être français ? */
  requirePhone?: boolean;
};

export type AntiBotResult = { ok: boolean; reason?: string; silent?: boolean };

/**
 * Vérifie une soumission.
 * `silent: true` = comportement de bot avéré : on fait semblant de réussir sans rien enregistrer.
 */
export function checkSubmission(input: AntiBotInput): AntiBotResult {
  if (input.honeypot && input.honeypot.trim() !== "") {
    return { ok: false, reason: "honeypot", silent: true };
  }

  if (Date.now() - input.startedAt < MIN_FILL_MS) {
    return { ok: false, reason: "too_fast", silent: true };
  }

  let last = 0;
  try {
    last = Number(sessionStorage.getItem(RATE_LIMIT_KEY) || 0);
  } catch {
    last = 0;
  }

  if (last && Date.now() - last < RATE_LIMIT_MS) {
    return {
      ok: false,
      reason: "Vous venez déjà d'envoyer une demande. Merci de patienter quelques instants.",
      silent: false,
    };
  }

  if (input.email !== undefined && input.email !== "" && !isValidEmail(input.email)) {
    return { ok: false, reason: "Merci d'indiquer une adresse email valide.", silent: false };
  }

  if (input.phone !== undefined && (input.requirePhone || input.phone.trim() !== "")) {
    if (!isValidFrenchPhone(input.phone)) {
      return {
        ok: false,
        reason: "Merci d'indiquer un numéro de téléphone français valide (ex. 06 12 34 56 78).",
        silent: false,
      };
    }
  }

  if (input.name && looksRandom(input.name)) {
    return { ok: false, reason: "spam_name", silent: true };
  }

  if (input.message && looksRandom(input.message)) {
    return { ok: false, reason: "spam_message", silent: true };
  }

  return { ok: true };
}

export function markSubmitted() {
  try {
    sessionStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
  } catch {
    // sessionStorage indisponible : on ignore
  }
}
