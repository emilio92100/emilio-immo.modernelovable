/* ═══ Accueil « Tuiles » : haut de page ═══════════════════════════════════════
   Maquette B (8 oct. 2026, choisie par Alexandre) : Paris en vidéo sous un voile clair ;
   à gauche, le titre et les trois engagements ; à droite, la carte Estimer / Vendre / Acheter.
   Sur un PC portable, tout se voit en arrivant, sans faire défiler. Au téléphone : la vidéo et
   le titre, puis la carte de recherche juste en dessous.
   La vidéo : celle d'Alexandre, en entier (53 s, 30 images par seconde) ; la dernière seconde se fond
   dans la première, la boucle ne saute pas.
   Deux fichiers : la version HD (1920 px) pour l'ordinateur et la tablette, et une version carrée,
   plus légère, pour le téléphone (le navigateur prend la bonne tout seul). Si l'appareil demande
   moins d'animations ou d'économiser les données, on montre l'image fixe.
   Les cases de la carte proposent au fil de la frappe : une adresse (Estimer, Vendre), une ville
   (Acheter), comme sur « Estimer mon bien » (Alexandre, 8 oct.). */
import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Bell, CalendarDays, Check, Home, KeyRound, LineChart, MapPin, MessageCircle, Phone, Search, UserRound, Wallet } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { chercherVilles } from "@/components/site/SearchControls";
import { Souligne } from "@/components/site/ui";
import { Choix, type Option } from "@/components/home/tuiles/Choix";
import affiche from "@/assets/refonte/accueil-paris-affiche.webp";

const VIDEO_HD = "/videos/accueil-hd.mp4"; // 1920 × 1080, ordinateur et tablette
const VIDEO_TEL = "/videos/accueil-tel.mp4"; // 720 × 720, téléphone

type Onglet = "estimer" | "vendre" | "acheter";

const ONGLETS: { k: Onglet; label: string; icon: JSX.Element }[] = [
  { k: "estimer", label: "Estimer", icon: <LineChart className="h-4 w-4" /> },
  { k: "vendre", label: "Vendre", icon: <Home className="h-4 w-4" /> },
  { k: "acheter", label: "Acheter", icon: <KeyRound className="h-4 w-4" /> },
];

const DELAIS: Option[] = [
  { v: "Dès que possible", t: "Dès que possible", d: "Je suis prêt à mettre en vente" },
  { v: "Dans les 3 mois", t: "Dans les 3 mois", d: "Le projet est bien avancé" },
  { v: "Dans l’année", t: "Dans l’année", d: "Je prépare mon projet" },
  { v: "Je me renseigne", t: "Je me renseigne", d: "Je veux d’abord connaître le prix" },
];
const nf = new Intl.NumberFormat("fr-FR");
const BUDGETS: Option[] = [
  { v: "", t: "Tous les budgets" },
  ...[500000, 800000, 1000000, 1500000, 2000000, 3000000].map((b) => ({ v: String(b), t: `Jusqu’à ${nf.format(b)} €` })),
];

/** Un champ du module de recherche : pastille d’icône, petit libellé, saisie. */
const Champ = ({ icon, label, children, className }: { icon: JSX.Element; label: string; children: React.ReactNode; className?: string }) => (
  <label className={cn("relative flex h-[58px] min-w-0 flex-none items-center gap-3 rounded-[18px] bg-brand-surf px-3.5 transition focus-within:bg-white focus-within:shadow-[0_0_0_2px_#22497D] md:h-[64px] md:gap-3.5 md:px-4", className)}>
    <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[11px] bg-white text-brand md:h-[38px] md:w-[38px] md:rounded-xl">{icon}</span>
    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
      <span className="text-[11.5px] font-bold text-brand-mut md:text-xs">{label}</span>
      {children}
    </span>
  </label>
);

const inputCls = "w-full min-w-0 border-0 bg-transparent p-0 text-base font-semibold text-brand-ink outline-none placeholder:font-medium placeholder:text-[#8794A6] max-md:text-[16px]";

/* ── Les suggestions sous les cases ── */
type Sugg = { label: string; titre: string; sous: string; nom?: string; cp?: string; ville?: string };
type Chercheur = (q: string, signal: AbortSignal) => Promise<Sugg[]>;
type FeatureAdresse = { properties?: { label?: string; name?: string; postcode?: string; city?: string } };

/* Base Adresse Nationale, puis le Géoplateforme de l’IGN si elle ne répond pas ; les adresses
   proches de Paris d’abord. */
const chercherAdresses: Chercheur = async (q, signal) => {
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
const chercherVillesSugg: Chercheur = async (q, signal) => (await chercherVilles(q, signal)).map((v) => ({ label: v.label, titre: v.label, sous: v.sub }));

/** Une case qui propose au fil de la frappe : flèches et Entrée au clavier, un clic, ou on continue à taper. */
const ChampSuggere = ({ icon, label, value, onChange, onChoisir, placeholder, chercheur, min = 3 }: {
  icon: JSX.Element;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onChoisir: (s: Sugg) => void;
  placeholder: string;
  chercheur: Chercheur;
  min?: number;
}) => {
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

  const choisir = (s: Sugg) => {
    setFige(true);
    setOuvert(false);
    setListe([]);
    onChoisir(s);
  };
  const visible = ouvert && liste.length > 0;
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  return (
    <div ref={boite} className="relative flex-none">
      <Champ icon={icon} label={label}>
        <input
          value={value}
          onChange={(e) => {
            setFige(false);
            setOuvert(true);
            onChange(e.target.value);
          }}
          onFocus={() => setOuvert(true)}
          onBlur={() => setOuvert(false)}
          onKeyDown={onKey}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          role="combobox"
          aria-expanded={visible}
          aria-controls={id}
          aria-autocomplete="list"
          aria-activedescendant={visible ? `${id}-${hi}` : undefined}
          className={inputCls}
        />
      </Champ>
      {visible && (
        /* mousedown sans effet : la case garde la main, le clic choisit (Safari compris) */
        <ul
          id={id}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
          className="fx-fade absolute inset-x-0 top-[calc(100%+6px)] z-30 m-0 max-h-[300px] list-none overflow-y-auto rounded-[18px] border border-brand-line bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(19,36,61,0.45)]"
        >
          {liste.map((s, k) => (
            <li key={s.label} id={`${id}-${k}`} role="option" aria-selected={k === hi}>
              <button
                type="button"
                tabIndex={-1}
                onMouseEnter={() => setHi(k)}
                onClick={() => choisir(s)}
                className={cn("flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition", k === hi ? "bg-brand-pale" : "bg-white")}
              >
                <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-brand-surf text-brand">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate text-[14.5px] font-bold text-brand-ink">{s.titre}</span>
                  {s.sous && <span className="truncate text-[12.5px] font-medium text-brand-mut">{s.sous}</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Recherche = () => {
  const { openEstimation, openContact } = useSiteModals();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Onglet>("estimer");
  const [adresse, setAdresse] = useState("");
  /* L’adresse choisie dans la liste : rue, code postal et ville, pour remplir l’estimation d’avance. */
  const [lieu, setLieu] = useState<{ nom?: string; cp?: string; ville?: string }>({});
  const [delai, setDelai] = useState(DELAIS[1].v);
  const [ville, setVille] = useState("");
  const [budget, setBudget] = useState("");

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "estimer") openEstimation(lieu.cp ? { address: lieu.nom || adresse, postalCode: lieu.cp, city: lieu.ville } : { address: adresse });
    else if (tab === "vendre")
      openContact({ objet: "Vendre", message: `Bonjour, je souhaite vendre mon bien${adresse.trim() ? ` situé ${adresse.trim()}` : ""}. Délai : ${delai.toLowerCase()}.` });
    else {
      const q = new URLSearchParams();
      if (ville.trim()) q.set("ville", ville.trim());
      if (budget) q.set("budget", budget);
      navigate(`/biens${q.toString() ? `?${q}` : ""}`);
    }
  };

  const bouton = { estimer: "Estimer gratuitement", vendre: "Être rappelé", acheter: "Voir les biens" }[tab];

  return (
    /* Ordinateur : une boîte invisible, de la hauteur du titre et des engagements, centrée comme eux ;
       la carte se cale en haut de cette boîte, donc en face du titre (Alexandre : « aligner ce qui est
       à droite »). Elle ne bouge pas quand on change d'onglet : elle grandit vers le bas. Les hauteurs
       sont celles du bloc de gauche (titre sur 3 lignes + 3 engagements) ; à revoir si ce texte change.
       Téléphone : la boîte s'efface (display: contents), la carte reste sous la vidéo. */
    <div className="contents lg:absolute lg:bottom-[98px] lg:right-8 lg:top-[74px] lg:z-[3] lg:my-auto lg:block lg:h-[313px] xl:right-11 xl:h-[338px]">
      <form
        onSubmit={envoyer}
        className="relative z-[3] mx-3 -mt-10 flex flex-col rounded-[24px] bg-white p-3 shadow-[0_30px_60px_-30px_rgba(19,36,61,0.6),0_0_0_1px_rgba(19,36,61,0.05)] sm:mx-auto sm:max-w-[520px] lg:mx-0 lg:mt-0 lg:w-[380px] lg:max-w-none lg:rounded-[28px] lg:p-[18px] xl:w-[410px]"
      >
        {/* Un espace entre les onglets et la case (Alexandre : « avoir un petit espace supplémentaire ») */}
        <div role="tablist" aria-label="Votre projet" className="mb-3.5 flex gap-1 rounded-[16px] bg-brand-surf p-1 md:mb-4">
          {ONGLETS.map((o) => (
            <button
              key={o.k}
              type="button"
              role="tab"
              aria-selected={tab === o.k}
              onClick={() => setTab(o.k)}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-[12px] px-2 text-[14px] font-bold transition md:h-11 md:gap-2 md:rounded-[14px] md:text-[14.5px]",
                tab === o.k ? "bg-brand text-white" : "text-brand-mut hover:text-brand-ink",
              )}
            >
              <span className="max-[359px]:hidden">{o.icon}</span>
              {o.label}
            </button>
          ))}
        </div>
        <div key={tab} className="fx-fade flex flex-col gap-2.5">
          {tab !== "acheter" ? (
            <ChampSuggere
              icon={<MapPin className="h-[18px] w-[18px]" />}
              label={tab === "estimer" ? "Adresse de votre bien" : "Adresse du bien à vendre"}
              value={adresse}
              onChange={(v) => {
                setAdresse(v);
                setLieu({});
              }}
              onChoisir={(s) => {
                setAdresse(s.label);
                setLieu({ nom: s.nom, cp: s.cp, ville: s.ville });
              }}
              placeholder="Ex. 12 rue de Silly, Boulogne"
              chercheur={chercherAdresses}
            />
          ) : (
            <ChampSuggere
              icon={<Search className="h-[18px] w-[18px]" />}
              label="Où cherchez-vous ?"
              value={ville}
              onChange={setVille}
              onChoisir={(s) => setVille(s.label)}
              placeholder="Paris 15e, Boulogne, Neuilly…"
              chercheur={chercherVillesSugg}
              min={2}
            />
          )}
          {tab === "vendre" && (
            <Choix icon={<CalendarDays className="h-[18px] w-[18px]" />} label="Votre délai" value={delai} options={DELAIS} onChange={setDelai} className="flex-none" />
          )}
          {tab === "acheter" && (
            <Choix icon={<Wallet className="h-[18px] w-[18px]" />} label="Budget maximum" value={budget} options={BUDGETS} onChange={setBudget} className="flex-none" />
          )}
          <button type="submit" className="inline-flex h-[54px] flex-none items-center justify-center gap-2.5 whitespace-nowrap rounded-[18px] bg-brand-orange px-7 text-[15.5px] font-bold text-brand-ink shadow-[0_14px_26px_-16px_rgba(230,139,35,0.95)] transition hover:brightness-105 md:h-[60px] md:text-base">
            {bouton} <ArrowRight className="h-[18px] w-[18px]" />
          </button>
        </div>
        {tab !== "acheter" && (
          <span className="mt-3 inline-flex items-center justify-center gap-1.5 text-[12.5px] font-bold text-[#0F7A4F]">
            <Check className="h-3.5 w-3.5" strokeWidth={2.6} /> Gratuit et sans engagement
          </span>
        )}
      </form>
    </div>
  );
};

const CONFIANCE = [
  { icon: <UserRound className="h-4 w-4" />, t: "200+ clients accompagnés", chiffre: "200+", court: "clients accompagnés" },
  { icon: <KeyRound className="h-4 w-4" />, t: "10+ ans de métier", chiffre: "10+ ans", court: "de métier" },
  { icon: <LineChart className="h-4 w-4" />, t: "Estimation gratuite", chiffre: "Gratuite", court: "estimation sans engagement" },
];

/* Les trois engagements, en liste avec leurs pictos (Alexandre : « le texte… mieux l'afficher »). */
const ENGAGEMENTS = [
  { icon: <Phone className="h-[15px] w-[15px]" />, t: "Une équipe qui vous répond" },
  { icon: <MessageCircle className="h-[15px] w-[15px]" />, t: "Qui vous conseille" },
  { icon: <Bell className="h-[15px] w-[15px]" />, t: "Et vous tient au courant à chaque étape" },
];

/** Paris en vidéo, ou l'image fixe quand l'appareil demande moins d'animations ou d'économiser les données. */
const Fond = () => {
  const calme = !!useReducedMotion();
  const [eco, setEco] = useState(false);
  useEffect(() => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (c?.saveData) setEco(true);
  }, []);
  const classe = "h-full w-full object-cover object-[56%_50%]";
  return calme || eco ? (
    <img src={affiche} alt="" {...({ fetchpriority: "high" } as object)} className={classe} />
  ) : (
    <video poster={affiche} autoPlay muted loop playsInline preload="auto" aria-hidden className={classe}>
      <source src={VIDEO_HD} media="(min-width: 640px)" type="video/mp4" />
      <source src={VIDEO_TEL} type="video/mp4" />
    </video>
  );
};

const TuilesHero = () => (
  <section className="mx-auto w-full max-w-[1560px] px-3 md:px-6">
    <div className="relative">
      <div className="relative h-[440px] overflow-hidden rounded-[30px] bg-[#DFE8F2] sm:h-[460px] lg:h-[clamp(560px,calc(100vh_-_112px),720px)] lg:rounded-[36px]">
        {/* Paris et son voile : clair à gauche (ordinateur) ou en haut (téléphone), là où est le texte */}
        <div className="absolute inset-0">
          <Fond />
        </div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.9)_52%,rgba(255,255,255,0.5)_76%,rgba(255,255,255,0)_94%)] lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.87)_32%,rgba(255,255,255,0.3)_46%,rgba(255,255,255,0)_56%)]" />
        {/* Le texte. Ordinateur : « Vendre · Acheter · Faire estimer » reste en haut ; le titre et les engagements
            se placent au milieu de la place qui reste au-dessus des trois repères du bas. */}
        <div className="relative z-[1] px-[22px] pt-6 lg:flex lg:h-full lg:max-w-[580px] lg:flex-col lg:pb-[98px] lg:pl-[76px] lg:pr-14 lg:pt-[54px] xl:max-w-[660px]">
          <span className="fx-fade text-[11.5px] font-extrabold uppercase tracking-[0.14em] text-brand-orange-text lg:text-[13px]">Vendre · Acheter · Faire estimer</span>
          <div className="lg:my-auto">
            <h1 className="fx-fade m-0 mt-2.5 text-[36px] font-extrabold leading-[1.05] tracking-[-0.035em] text-brand-ink sm:text-[44px] lg:mt-0 lg:text-[54px] lg:leading-[1.03] xl:text-[62px]">
              <span className="sr-only">Agence immobilière à Paris et dans les Hauts-de-Seine : </span>
              Votre projet immobilier,{" "}
              <Souligne>simplement.</Souligne>
            </h1>
            <ul className="fx-fade m-0 mt-5 flex list-none flex-col gap-2 p-0 lg:mt-6 lg:gap-2.5">
              {ENGAGEMENTS.map((e) => (
                <li key={e.t} className="flex items-center gap-2.5 text-[14.5px] font-bold text-[#33445B] lg:gap-3 lg:text-[17px]">
                  <span className="grid h-[30px] w-[30px] flex-none place-items-center rounded-[10px] bg-white text-brand shadow-[0_4px_12px_-6px_rgba(19,36,61,0.35)] lg:h-[34px] lg:w-[34px] lg:rounded-[11px]">{e.icon}</span>
                  {e.t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Ordinateur : les trois repères, en bas à gauche, sur la vidéo */}
        <div className="absolute bottom-[30px] left-[76px] z-[1] hidden flex-nowrap gap-2 lg:flex">
          {CONFIANCE.map((c) => (
            <span key={c.t} className="inline-flex h-[38px] items-center gap-2 whitespace-nowrap rounded-full bg-white/[0.82] py-1 pl-1.5 pr-4 text-[13.5px] font-semibold text-[#33445B] backdrop-blur-md">
              <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-white text-brand">{c.icon}</span>
              {c.t}
            </span>
          ))}
        </div>
      </div>
      <Recherche />
    </div>
    {/* Téléphone et tablette : les trois repères côte à côte dans une seule carte, sans défilement */}
    <div className="mx-1 mt-4 grid grid-cols-3 divide-x divide-[#DCE4EE] rounded-[22px] bg-brand-surf px-1 py-3 sm:mx-auto sm:max-w-[520px] lg:hidden">
      {CONFIANCE.map((c) => (
        <div key={c.t} className="flex min-w-0 flex-col items-center gap-1 px-1.5 text-center">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-brand">{c.icon}</span>
          <span className="text-[15px] font-extrabold leading-tight tracking-[-0.02em] text-brand-ink">{c.chiffre}</span>
          <span className="text-[11.5px] font-semibold leading-tight text-brand-mut">{c.court}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TuilesHero;
