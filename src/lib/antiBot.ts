/**
 * Protection anti-robots pour les formulaires publics.
 *
 * Règle d'or : on ne jette JAMAIS une demande à cause de ce qu'elle contient.
 * Un nom inhabituel (Schmitt, Schwartz, Nguyen, Kowalczyk…) est un client.
 * Les demandes douteuses arrivent quand même dans le CRM, qui les repère,
 * les range à part et n'envoie pas de mail pour elles : Alexandre fait le tri.
 *
 * Le site n'écarte que sur le COMPORTEMENT, jamais sur le contenu :
 *  1. Champ piège, invisible pour les humains, qu'un robot remplit.
 *     Son nom ne veut rien dire, pour que le remplissage automatique du
 *     navigateur (nom, société, site…) ne le remplisse jamais à la place
 *     d'un vrai visiteur.
 *  2. Temps minimum : un robot poste en moins de 3 secondes.
 *  3. Aucun vrai geste (clic, doigt, clavier) sur la page : un script qui
 *     remplit et envoie le formulaire tout seul.
 *  4. Anti-doublon : une demande toutes les 30 secondes (message affiché).
 */

const MIN_FILL_MS = 3000;
const RATE_LIMIT_KEY = "ei_last_submit";
const RATE_LIMIT_MS = 30_000;

export const honeypotFieldName = "ei_x7q";

/** Styles pour cacher le champ piège sans utiliser display:none (détecté par les bots). */
export const honeypotStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  width: "1px",
  height: "1px",
  opacity: 0,
  pointerEvents: "none",
};

/* Un vrai geste sur la page : un clic, un doigt, une touche. Les événements
   fabriqués par un script (element.click(), dispatchEvent) ne comptent pas. */
let geste = false;
if (typeof window !== "undefined") {
  const vu = (e: Event) => {
    if (e.isTrusted) geste = true;
  };
  for (const t of ["pointerdown", "mousedown", "touchstart", "keydown"]) {
    window.addEventListener(t, vu, { capture: true, passive: true });
  }
}

/** Téléphone : français (06 12 34 56 78, +33…) ou étranger (+32…, 0044…). */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[\s.\-()/]/g, "");
  if (/^(?:\+33|0033|0)[1-9]\d{8}$/.test(digits)) return true;
  return /^(?:\+|00)[1-9]\d{6,14}$/.test(digits);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

export type AntiBotInput = {
  honeypot: string;
  startedAt: number;
  /* Gardés pour les formulaires qui les passent : ils ne servent plus à
     écarter une demande (voir la règle d'or en haut). */
  name?: string;
  message?: string;
  phone?: string;
  email?: string;
  /** Le téléphone est-il obligatoire ? */
  requirePhone?: boolean;
};

export type AntiBotResult = { ok: boolean; reason?: string; silent?: boolean };

/**
 * Vérifie une soumission.
 * `silent: true` = comportement de robot avéré : on fait semblant de réussir sans rien enregistrer.
 * `silent: false` = une faute de saisie : le visiteur voit le message et corrige.
 */
export function checkSubmission(input: AntiBotInput): AntiBotResult {
  if (input.honeypot && input.honeypot.trim() !== "") {
    return { ok: false, reason: "honeypot", silent: true };
  }

  if (Date.now() - input.startedAt < MIN_FILL_MS) {
    return { ok: false, reason: "too_fast", silent: true };
  }

  if (typeof window !== "undefined" && !geste) {
    return { ok: false, reason: "no_gesture", silent: true };
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
    if (!isValidPhone(input.phone)) {
      return {
        ok: false,
        reason: "Merci d'indiquer un numéro de téléphone valide (ex. 06 12 34 56 78, ou +32 4 12 34 56 78).",
        silent: false,
      };
    }
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
