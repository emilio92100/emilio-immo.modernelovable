/* ═══ Accueil « Tuiles » : haut de page ═══════════════════════════════════════
   Paris sous un voile clair, le titre, puis la recherche à onglets (Estimer / Vendre / Acheter). */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, Home, KeyRound, LineChart, MapPin, Search, UserRound, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { Choix, type Option } from "@/components/home/tuiles/Choix";
import panorama from "@/assets/refonte/paris-panorama.webp";

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
  <label className={cn("relative flex h-16 min-w-0 flex-1 items-center gap-3.5 rounded-[20px] bg-brand-surf px-4 transition focus-within:bg-white focus-within:shadow-[0_0_0_2px_#22497D] md:h-[68px] md:px-5", className)}>
    <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-xl bg-white text-brand">{icon}</span>
    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
      <span className="text-xs font-bold text-brand-mut">{label}</span>
      {children}
    </span>
  </label>
);

const inputCls = "w-full min-w-0 border-0 bg-transparent p-0 text-base font-semibold text-brand-ink outline-none placeholder:font-medium placeholder:text-[#8794A6]";

const Recherche = () => {
  const { openEstimation, openContact } = useSiteModals();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Onglet>("estimer");
  const [adresse, setAdresse] = useState("");
  const [delai, setDelai] = useState(DELAIS[1].v);
  const [ville, setVille] = useState("");
  const [budget, setBudget] = useState("");

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "estimer") openEstimation({ address: adresse });
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
    <form
      onSubmit={envoyer}
      className="relative z-[3] mx-2.5 rounded-[26px] bg-white p-2.5 shadow-[0_40px_70px_-40px_rgba(19,36,61,0.55),0_0_0_1px_rgba(19,36,61,0.06)] md:absolute md:bottom-[-64px] md:left-1/2 md:mx-0 md:w-[min(1060px,calc(100%-80px))] md:-translate-x-1/2 md:rounded-[30px] md:p-3"
    >
      <div role="tablist" aria-label="Votre projet" className="mb-2.5 flex gap-1 rounded-[18px] bg-brand-surf p-1 md:inline-flex">
        {ONGLETS.map((o) => (
          <button
            key={o.k}
            type="button"
            role="tab"
            aria-selected={tab === o.k}
            onClick={() => setTab(o.k)}
            className={cn(
              "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[14px] px-2 text-[14.5px] font-bold transition md:flex-none md:px-5",
              tab === o.k ? "bg-brand text-white" : "text-brand-mut hover:text-brand-ink",
            )}
          >
            <span className="hidden md:inline">{o.icon}</span>
            {o.label}
          </button>
        ))}
      </div>
      <div key={tab} className="fx-fade flex flex-col gap-2 md:flex-row md:items-stretch">
        {tab !== "acheter" ? (
          <Champ icon={<MapPin className="h-[18px] w-[18px]" />} label={tab === "estimer" ? "Adresse de votre bien" : "Adresse du bien à vendre"}>
            <input value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="Ex. 12 rue de Silly, Boulogne" autoComplete="street-address" className={inputCls} />
          </Champ>
        ) : (
          <Champ icon={<Search className="h-[18px] w-[18px]" />} label="Où cherchez-vous ?">
            <input value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Paris 15e, Boulogne, Neuilly…" className={inputCls} />
          </Champ>
        )}
        {tab === "vendre" && (
          <Choix icon={<CalendarDays className="h-[18px] w-[18px]" />} label="Votre délai" value={delai} options={DELAIS} onChange={setDelai} className="md:max-w-[300px]" />
        )}
        {tab === "acheter" && (
          <Choix icon={<Wallet className="h-[18px] w-[18px]" />} label="Budget maximum" value={budget} options={BUDGETS} onChange={setBudget} className="md:max-w-[300px]" />
        )}
        <button type="submit" className="inline-flex h-14 flex-none items-center justify-center gap-2.5 whitespace-nowrap rounded-[20px] bg-brand-orange px-7 text-base font-bold text-brand-ink transition hover:brightness-105 md:h-[68px]">
          {bouton} <ArrowRight className="h-[18px] w-[18px]" />
        </button>
      </div>
    </form>
  );
};

const CONFIANCE = [
  { icon: <UserRound className="h-4 w-4" />, t: "200+ clients accompagnés" },
  { icon: <KeyRound className="h-4 w-4" />, t: "10+ ans de métier" },
  { icon: <LineChart className="h-4 w-4" />, t: "Estimation gratuite et sans engagement" },
];

const TuilesHero = () => (
  <section className="mx-auto w-full max-w-[1320px] px-4 md:px-10">
    <div className="relative rounded-[30px] md:h-[640px] md:rounded-[40px]">
      {/* La photo et son voile */}
      <div className="absolute inset-x-0 top-0 h-[600px] overflow-hidden rounded-[30px] bg-[#DFE8F2] md:inset-0 md:h-auto md:rounded-[40px]">
        <img
          src={panorama}
          alt="Les toits de Paris et la tour Eiffel"
          {...({ fetchpriority: "high" } as object)}
          className="h-full w-full object-cover object-[54%_0%] md:object-[0%_0%]"
        />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.72)_40%,rgba(255,255,255,0.1)_64%,rgba(255,255,255,0)_72%)] md:bg-[linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.86)_34%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0)_60%)]" />
      </div>
      {/* Le texte */}
      <div className="relative z-[1] max-w-[700px] px-[22px] pb-[210px] pt-[26px] md:px-16 md:pb-0 md:pt-16">
        <span className="fx-fade inline-flex min-h-[34px] max-w-full items-center gap-2 rounded-[17px] bg-white px-3.5 py-1 text-[12.5px] font-bold leading-tight text-brand-ink shadow-[0_4px_14px_-6px_rgba(19,36,61,0.25)] sm:text-[13px]">
          <MapPin className="h-[15px] w-[15px] flex-none text-brand-orange-lt" /> Paris · Hauts-de-Seine · et au-delà
        </span>
        <h1 className="fx-fade m-0 mb-3.5 mt-4 text-[42px] font-extrabold leading-[1.02] tracking-[-0.035em] text-brand-ink md:mb-5 md:mt-[22px] md:text-[76px]">
          <span className="sr-only">Agence immobilière à Paris et dans les Hauts-de-Seine : </span>
          Votre projet immobilier,{" "}
          <span className="relative z-0 whitespace-nowrap">
            simplement.
            <span aria-hidden className="absolute -left-0.5 -right-1 bottom-1 -z-10 h-3.5 rounded-full bg-[#FAD3A0] md:bottom-2 md:h-[18px]" />
          </span>
        </h1>
        <p className="fx-fade m-0 max-w-[600px] text-base font-medium leading-[1.55] text-[#33445B] md:text-[19px]">
          Vendre, acheter, faire estimer : une équipe qui vous répond, vous conseille et vous tient au courant à chaque étape.
        </p>
      </div>
      <Recherche />
    </div>
    <div className="mt-[22px] flex flex-wrap justify-start gap-2 md:mt-[100px] md:justify-center md:gap-3">
      {CONFIANCE.map((c) => (
        <span key={c.t} className="inline-flex min-h-10 items-center gap-2.5 rounded-[20px] bg-brand-surf py-1 pl-2 pr-[18px] text-[13.5px] font-semibold leading-tight text-[#33445B] md:min-h-11 md:rounded-full md:text-[14.5px]">
          <span className="grid h-[30px] w-[30px] flex-none place-items-center rounded-full bg-white text-brand">{c.icon}</span>
          {c.t}
        </span>
      ))}
    </div>
  </section>
);

export default TuilesHero;
