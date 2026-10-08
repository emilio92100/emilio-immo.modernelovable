/* Les suggestions d’adresse et de ville sous une case, les mêmes partout sur le site (Alexandre, 8 oct. :
   « il faut que ce soit cohérent partout… quand la personne met une adresse, ça sélectionne »).
   Utilisé par la carte Estimer / Vendre / Acheter de l’accueil (TuilesHero) et par la carte
   « Adresse du bien · Estimer gratuitement » (EstimerCard : page Vendre, page Estimation, pages des villes).
   Le parcours d’estimation (EstimationFlow) et « Confier ma recherche » (CityPicker) ont déjà les leurs,
   sur les mêmes sources. */
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { chercherVilles } from "@/components/site/SearchControls";

/* useLayoutEffect côté navigateur (la liste ne saute pas), rien pendant la pré-génération des pages. */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type Sugg = { label: string; titre: string; sous: string; nom?: string; cp?: string; ville?: string };
export type Chercheur = (q: string, signal: AbortSignal) => Promise<Sugg[]>;
type FeatureAdresse = { properties?: { label?: string; name?: string; postcode?: string; city?: string } };

/* Base Adresse Nationale, puis le Géoplateforme de l’IGN si elle ne répond pas ; les adresses proches de
   Paris d’abord. */
export const chercherAdresses: Chercheur = async (q, signal) => {
  const e = encodeURIComponent(q);
  for (const url of [
    `https://api-adresse.data.gouv.fr/search/?q=${e}&limit=6&autocomplete=1&lat=48.85&lon=2.3`,
    `https://data.geopf.fr/geocodage/search?q=${e}&index=address&limit=6&autocomplete=1&lat=48.85&lon=2.3`,
  ]) {
    try {
      const r = await fetch(url, { signal });
      if (!r.ok) continue;
      const d = (await r.json()) as { features?: FeatureAdresse[] };
      const vus = new Set<string>();
      const out: Sugg[] = [];
      for (const f of d.features || []) {
        const p = f.properties || {};
        if (!p.label || vus.has(p.label)) continue;
        vus.add(p.label);
        out.push({ label: p.label, titre: p.name || p.label, sous: [p.postcode, p.city].filter(Boolean).join(" "), nom: p.name, cp: p.postcode, ville: p.city });
      }
      return out;
    } catch (err) {
      if ((err as Error).name === "AbortError") throw err;
    }
  }
  return [];
};

/** Les villes et arrondissements, comme dans « Confier ma recherche ». */
export const chercherVillesSugg: Chercheur = async (q, signal) => (await chercherVilles(q, signal)).map((v) => ({ label: v.label, titre: v.label, sous: v.sub }));

/** Tout ce qu’il faut à une case qui propose au fil de la frappe : la liste, le clavier (flèches, Entrée,
    Échap), la fermeture quand on clique ailleurs. `brancher(onChange)` donne les propriétés de l’<input>. */
export function useSuggestions({ value, chercheur, min = 3, onChoisir }: { value: string; chercheur: Chercheur; min?: number; onChoisir: (s: Sugg) => void }) {
  const [liste, setListe] = useState<Sugg[]>([]);
  const [ouvert, setOuvert] = useState(false);
  const [fige, setFige] = useState(false); // juste après un choix : on ne relance pas la recherche
  const [hi, setHi] = useState(0);
  const boite = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const t = value.trim();
    if (fige || t.length < min) {
      setListe([]);
      return;
    }
    const ctrl = new AbortController();
    const minuterie = window.setTimeout(() => {
      chercheur(t, ctrl.signal)
        .then((l) => {
          setListe(l);
          setHi(0);
        })
        .catch(() => undefined);
    }, 220);
    return () => {
      ctrl.abort();
      window.clearTimeout(minuterie);
    };
  }, [value, fige, chercheur, min]);

  useEffect(() => {
    const dehors = (e: PointerEvent) => {
      if (!boite.current?.contains(e.target as Node)) setOuvert(false);
    };
    document.addEventListener("pointerdown", dehors);
    return () => document.removeEventListener("pointerdown", dehors);
  }, []);

  /* Ordinateur : pas assez de place sous la case (la barre de recherche du haut de l’accueil, près du bas de
     l’écran), la liste s’ouvre au-dessus. Le téléphone garde la liste en dessous. */
  const [haut, setHaut] = useState(false);
  const visibleAvant = ouvert && liste.length > 0;
  useIsoLayoutEffect(() => {
    if (!visibleAvant) return;
    const r = boite.current?.getBoundingClientRect();
    const besoin = Math.min(300, liste.length * 58 + 16);
    setHaut(!!r && window.matchMedia("(min-width: 1024px)").matches && window.innerHeight - r.bottom < besoin + 12 && r.top > besoin + 96);
  }, [visibleAvant, liste.length]);

  const choisir = (s: Sugg) => {
    setFige(true);
    setOuvert(false);
    setListe([]);
    onChoisir(s);
  };
  const visible = ouvert && liste.length > 0;

  const brancher = (onChange: (v: string) => void) => ({
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFige(false);
      setOuvert(true);
      onChange(e.target.value);
    },
    onFocus: () => setOuvert(true),
    onBlur: () => setOuvert(false),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!visible) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHi((h) => Math.min(h + 1, liste.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHi((h) => Math.max(h - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        choisir(liste[hi] || liste[0]);
      } else if (e.key === "Escape") {
        setOuvert(false);
      }
    },
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: false,
    role: "combobox" as const,
    "aria-expanded": visible,
    "aria-controls": id,
    "aria-autocomplete": "list" as const,
    "aria-activedescendant": visible ? `${id}-${hi}` : undefined,
  });

  return { boite, id, liste, hi, setHi, visible, haut, choisir, brancher };
}

/** La liste sous la case : une ligne par suggestion, avec un picto, le nom en gras et le détail dessous. */
export const ListeSuggestions = ({ s, className }: { s: ReturnType<typeof useSuggestions>; className?: string }) =>
  s.visible ? (
    /* mousedown sans effet : la case garde la main, le clic choisit (Safari compris) */
    <ul
      id={s.id}
      role="listbox"
      onMouseDown={(e) => e.preventDefault()}
      className={cn(
        "fx-fade absolute inset-x-0 z-30 m-0 max-h-[300px] list-none overflow-y-auto rounded-[18px] border border-brand-line bg-white p-1.5 text-left shadow-[0_24px_50px_-20px_rgba(19,36,61,0.45)]",
        s.haut ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]",
        className,
      )}
    >
      {s.liste.map((x, k) => (
        <li key={x.label} id={`${s.id}-${k}`} role="option" aria-selected={k === s.hi}>
          <button
            type="button"
            tabIndex={-1}
            onMouseEnter={() => s.setHi(k)}
            onClick={() => s.choisir(x)}
            className={cn("flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition", k === s.hi ? "bg-brand-pale" : "bg-white")}
          >
            <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-brand-surf text-brand">
              <MapPin className="h-4 w-4" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[14.5px] font-bold text-brand-ink">{x.titre}</span>
              {x.sous && <span className="truncate text-[12.5px] font-medium text-brand-mut">{x.sous}</span>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  ) : null;
