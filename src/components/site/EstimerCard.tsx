/* Petit formulaire « adresse du bien → Estimer gratuitement », ouvre le parcours d'estimation.
   Page Vendre, page Estimation, pages des villes. L'adresse est proposée au fil de la frappe, comme sur
   l'accueil (src/components/site/Suggestions.tsx) ; choisie dans la liste, elle remplit d'avance la rue,
   le code postal et la ville de l'estimation. */
import { useState } from "react";
import { ArrowRight, Check, LineChart } from "lucide-react";
import { useSiteModals } from "@/components/site/SiteModals";
import { ListeSuggestions, chercherAdresses, useSuggestions } from "@/components/site/Suggestions";

export const EstimerCard = ({ city, postalCode, placeholder = "Ex. 12 rue de Silly, Boulogne" }: { city?: string; postalCode?: string; placeholder?: string }) => {
  const { openEstimation, openContact } = useSiteModals();
  const [adresse, setAdresse] = useState("");
  const [lieu, setLieu] = useState<{ nom?: string; cp?: string; ville?: string }>({});
  const sugg = useSuggestions({
    value: adresse,
    chercheur: chercherAdresses,
    onChoisir: (s) => {
      setAdresse(s.label);
      setLieu({ nom: s.nom, cp: s.cp, ville: s.ville });
    },
  });
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-brand-line bg-white p-3.5 shadow-[0_22px_44px_-30px_rgba(19,36,61,0.55)]">
      <form
        className="flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          openEstimation(lieu.cp ? { address: lieu.nom || adresse, postalCode: lieu.cp, city: lieu.ville } : { address: adresse, city, postalCode });
        }}
      >
        <div ref={sugg.boite} className="relative min-w-0 flex-[1_1_220px]">
          <label className="flex min-w-0 flex-col gap-0.5 rounded-[10px] border border-[#D5DEEA] px-3.5 py-2 transition focus-within:border-brand">
            <span className="text-xs font-bold text-brand-mut">Adresse du bien</span>
            <input
              {...sugg.brancher((v) => {
                setAdresse(v);
                setLieu({});
              })}
              placeholder={placeholder}
              className="w-full min-w-0 border-0 bg-transparent p-0 text-base text-brand-ink outline-none placeholder:text-[#8A97A8]"
            />
          </label>
          <ListeSuggestions s={sugg} />
        </div>
        <button type="submit" className="inline-flex h-[54px] flex-[1_1_auto] items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] bg-brand-orange px-6 text-base font-extrabold text-brand-ink sm:flex-none">
          <LineChart className="h-[18px] w-[18px]" /> Estimer gratuitement
        </button>
      </form>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-semibold text-brand-mut">
          {["Gratuit, sans engagement", "Visite sur place", "Rapport détaillé"].map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5"><Check className="h-[15px] w-[15px] text-[#2E7D5B]" strokeWidth={2.6} />{c}</span>
          ))}
        </div>
        <button type="button" onClick={() => openContact({ objet: "Vendre" })} className="inline-flex min-h-[40px] items-center gap-1.5 text-[14px] font-bold text-brand">
          Plutôt un rendez-vous ? <ArrowRight className="h-4 w-4 text-brand-orange" />
        </button>
      </div>
    </div>
  );
};
