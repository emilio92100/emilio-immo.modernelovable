/* « Nos secteurs » : la vraie carte (Paris + Hauts-de-Seine) et les listes. */
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Route } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSiteModals } from "@/components/site/SiteModals";
import { Container, FRAME_SHADOW, SectionHead } from "@/components/site/ui";
import { CARTE_H, CARTE_W, ETIQUETTES, HDS_AUTRES, HDS_SECTEURS, PARIS_AUTRES, PARIS_SECTEURS, SEINE } from "@/data/secteursCarte";

const PARIS = [
  { n: "6", cp: "75006", to: "/achat-appartement-paris-6" },
  { n: "7", cp: "75007", to: "/achat-appartement-paris-7" },
  { n: "15", cp: "75015", to: "/achat-appartement-paris-15" },
  { n: "16", cp: "75016", to: "/achat-appartement-paris-16" },
  { n: "17", cp: "75017", to: "/achat-appartement-paris-17" },
];
const HDS = [
  ["Boulogne-Billancourt", "/achat-appartement-boulogne-billancourt"],
  ["Issy-les-Moulineaux", "/achat-appartement-issy-les-moulineaux"],
  ["Neuilly-sur-Seine", "/achat-appartement-neuilly-sur-seine"],
  ["Levallois-Perret", "/achat-appartement-levallois-perret"],
  ["Saint-Cloud", "/achat-appartement-saint-cloud"],
  ["Garches", "/achat-appartement-garches"],
  ["Clamart", "/achat-appartement-clamart"],
];
const COURT: Record<string, string> = {
  "Boulogne-Billancourt": "Boulogne", "Issy-les-Moulineaux": "Issy", "Neuilly-sur-Seine": "Neuilly", "Levallois-Perret": "Levallois",
  "Saint-Cloud": "Saint-Cloud", Garches: "Garches", Clamart: "Clamart",
};
const DECALE: Record<string, [number, number]> = { "7e": [-1.2, -2.2], "6e": [1, 1], "15e": [-0.5, 1.2], "16e": [-2, 0], "Boulogne-Billancourt": [0.8, 0], "Issy-les-Moulineaux": [1.5, -1], Garches: [-4.5, -1.5], "Saint-Cloud": [-3, 6] };
const DECALE_MOBILE: Record<string, [number, number]> = { "Saint-Cloud": [-5.5, 8.5], "Boulogne-Billancourt": [3, -2], Garches: [-5.5, -2] };

const Carte = ({ small }: { small: boolean }) => (
  <div className="relative w-full overflow-hidden rounded-2xl bg-brand-pale" style={{ aspectRatio: `${CARTE_W} / ${CARTE_H}` }}>
    <svg viewBox={`0 0 ${CARTE_W} ${CARTE_H}`} role="img" aria-label="Carte de nos secteurs : Paris 6e, 7e, 15e, 16e, 17e et les Hauts-de-Seine" className="absolute inset-0 block h-full w-full">
      <path d={HDS_AUTRES} fill="#E1E8F2" stroke="#FFFFFF" strokeWidth={1.6} />
      <path d={PARIS_AUTRES} fill="#EFF2F6" stroke="#D3DCE7" strokeWidth={1.2} />
      {Object.entries(HDS_SECTEURS).map(([k, d]) => <path key={k} d={d} className="secteur-zone" fill="#F7D7AE" stroke="#E68B23" strokeWidth={1.6} />)}
      {Object.entries(PARIS_SECTEURS).map(([k, d]) => <path key={k} d={d} className="secteur-zone secteur-paris" fill="#C7D4E8" stroke="#22497D" strokeWidth={1.6} />)}
      <path d={SEINE} fill="none" stroke="#8EBBE5" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" opacity={0.95} />
    </svg>
    {Object.entries(ETIQUETTES).map(([k, [x, y]]) => {
      const [dx, dy] = (small && DECALE_MOBILE[k]) || DECALE[k] || [0, 0];
      const paris = /^\d+e$/.test(k);
      return (
        <span
          key={k}
          className={cn(
            "pointer-events-none absolute z-[2] inline-flex -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-full font-extrabold shadow-[0_6px_14px_-8px_rgba(19,36,61,0.6)]",
            small ? "h-[18px] px-[7px] text-[9.5px]" : "h-6 px-[9px] text-[12.5px]",
            paris ? "bg-brand text-white" : "bg-white text-brand-ink ring-1 ring-brand-orange/60",
          )}
          style={{ left: `${x + dx}%`, top: `${y + dy}%` }}
        >
          {paris ? k : COURT[k] || k}
        </span>
      );
    })}
    <span className="pointer-events-none absolute left-[86%] top-[33%] -translate-x-1/2 -translate-y-1/2 text-xs font-extrabold tracking-[0.3em] text-brand/45">PARIS</span>
    <span className="pointer-events-none absolute left-[22%] top-[82%] -translate-x-1/2 -translate-y-1/2 text-center text-[11px] font-extrabold leading-relaxed tracking-[0.24em] text-brand/40">HAUTS-<br />DE-SEINE</span>
  </div>
);

const Legende = () => (
  <div className="flex flex-wrap gap-x-5 gap-y-2 px-2 pb-1 pt-3.5">
    {[["#C7D4E8", "#22497D", "Paris"], ["#F7D7AE", "#E68B23", "Hauts-de-Seine"], ["#E1E8F2", "#C3CEDC", "Autres communes du 92, sur demande"]].map(([c, b, t]) => (
      <span key={t} className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-txt">
        <span className="h-4 w-4 flex-none rounded-[5px]" style={{ background: c, boxShadow: `inset 0 0 0 1.5px ${b}` }} />
        {t}
      </span>
    ))}
  </div>
);

const Sectors = () => {
  const small = useIsMobile();
  const { openContact } = useSiteModals();
  const carte = (
    <div className="relative md:mb-4 md:mr-4">
      <span aria-hidden className="absolute -bottom-4 -right-4 hidden h-[60%] w-[60%] rounded-[28px] bg-brand-orange/90 md:block" />
      <div className={cn("relative z-[1] rounded-[24px] bg-white p-3", FRAME_SHADOW)}>
        <Carte small={small} />
        <Legende />
      </div>
    </div>
  );
  const grp = (t: string, children: React.ReactNode) => (
    <div className="flex flex-col gap-3">
      <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand">{t}</span>
      {children}
    </div>
  );
  return (
    <section id="secteurs" className="bg-brand-pale">
      <Container className="grid grid-cols-1 items-center gap-x-[72px] gap-y-7 py-11 md:grid-cols-2 md:py-[88px]">
        <div className="flex min-w-0 flex-col gap-6 md:gap-7">
          <SectionHead
            eyebrow="Nos secteurs"
            title={<>Paris Ouest et <span className="whitespace-nowrap">Hauts-de-Seine</span>, <em className="font-normal italic text-brand-orange-lt">nos secteurs</em></>}
            lead="Un périmètre volontairement resserré, pour bien connaître chaque quartier : ses prix, ses copropriétés, ses écoles et ses transports."
          />
          <div className="md:hidden">{carte}</div>
          {grp(
            "Paris",
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {PARIS.map((a) => (
                <Link key={a.n} to={a.to} className="flex min-w-0 flex-col gap-0.5 rounded-[14px] border border-brand-line bg-white px-3.5 py-3 text-brand-ink transition hover:border-brand-orange hover:bg-[#FFF1DF]">
                  <span className="font-display text-[28px] leading-none md:text-[32px]">{a.n}<span className="align-[0.7em] text-[15px] md:text-[17px]">e</span></span>
                  <span className="text-[12.5px] text-brand-mut">{a.cp}</span>
                </Link>
              ))}
            </div>,
          )}
          {grp(
            "Hauts-de-Seine",
            <div className="flex flex-wrap gap-2">
              {HDS.map(([n, to]) => (
                <Link key={n} to={to} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brand-line bg-white px-3.5 text-[14.5px] font-semibold text-brand-ink transition hover:border-brand-orange hover:bg-[#FFF1DF]">
                  <MapPin className="h-[15px] w-[15px] text-brand-orange-text" /> {n}
                </Link>
              ))}
            </div>,
          )}
          <div className="flex items-start gap-3.5 rounded-2xl border border-dashed border-[#B9C6D6] bg-white px-5 py-[18px]">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-brand-tint text-brand"><Route className="h-[19px] w-[19px]" /></span>
            <span className="flex flex-col gap-1">
              <span className="text-base font-bold text-brand-ink">Votre commune n’est pas dans la liste ?</span>
              <span className="text-[15px] leading-normal text-brand-txt">Nous intervenons aussi ailleurs dans les Hauts-de-Seine. Dites-nous où se trouve votre bien, on vous répond vite.</span>
              <button type="button" onClick={() => openContact({ objet: "Autre", message: "Mon bien se trouve à : " })} className="inline-flex min-h-[40px] items-center gap-1.5 self-start text-[15px] font-bold text-brand">
                Nous contacter <ArrowRight className="h-4 w-4 text-brand-orange" />
              </button>
            </span>
          </div>
        </div>
        <div className="hidden md:block">{carte}</div>
      </Container>
    </section>
  );
};

export default Sectors;
