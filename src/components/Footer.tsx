/* Pied de page (refonte 2026, direction « Tuiles ») : clair, arrondi, avec nos secteurs et le contact. */
import { Link } from "react-router-dom";
import { LineChart, Mail, Phone } from "lucide-react";
import { useSiteModals } from "@/components/site/SiteModals";
import { MAIL, TEL, TEL_HREF } from "@/components/site/ui";
import logo from "@/assets/refonte/logo-bleu.webp";

const PARIS = [
  ["Paris 6e", "/achat-appartement-paris-6"],
  ["Paris 7e", "/achat-appartement-paris-7"],
  ["Paris 15e", "/achat-appartement-paris-15"],
  ["Paris 16e", "/achat-appartement-paris-16"],
  ["Paris 17e", "/achat-appartement-paris-17"],
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

const Col = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex min-w-0 flex-col">
    <span className="mb-1.5 text-sm font-extrabold text-brand-ink">{title}</span>
    {children}
  </div>
);
const L = ({ to, children, strong }: { to: string; children: React.ReactNode; strong?: boolean }) => (
  <Link to={to} className={`flex min-h-[40px] items-center text-[14.5px] leading-snug transition hover:text-brand-ink ${strong ? "font-bold text-brand-ink" : "font-medium text-brand-mut"}`}>
    {children}
  </Link>
);
const B = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button type="button" onClick={onClick} className="flex min-h-[40px] items-center text-left text-[14.5px] font-medium leading-snug text-brand-mut transition hover:text-brand-ink">
    {children}
  </button>
);

const Footer = () => {
  const { openEstimation, openContact } = useSiteModals();
  return (
    <>
      <footer className="mt-[72px] rounded-t-[32px] bg-brand-surf font-jakarta text-brand-mut md:mt-[110px] md:rounded-t-[40px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-10 px-5 pb-5 pt-12 md:px-10 md:pt-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-3 lg:grid-cols-[1.5fr_repeat(5,minmax(0,1fr))] lg:gap-x-8">
            <div className="col-span-2 flex max-w-[320px] flex-col gap-4 md:col-span-3 lg:col-span-1">
              <img src={logo} alt="Emilio conseil immobilier" className="h-12 w-auto self-start" />
              <p className="m-0 text-[14.5px] font-medium leading-relaxed">Paris, Hauts-de-Seine et d’autres villes, sur demande.</p>
              <span className="flex flex-col gap-1">
                <a href={TEL_HREF} className="inline-flex min-h-[40px] items-center gap-2 text-[15px] font-bold text-brand-ink"><Phone className="h-4 w-4 text-brand-orange-text" /> {TEL}</a>
                <a href={`mailto:${MAIL}`} className="inline-flex min-h-[40px] items-center gap-2 text-[14.5px] font-semibold text-brand-ink"><Mail className="h-4 w-4 text-brand-orange-text" /> {MAIL}</a>
              </span>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => openEstimation()} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-brand-orange px-5 text-[15px] font-bold text-brand-ink">
                  <LineChart className="h-[18px] w-[18px]" /> Estimer mon bien
                </button>
                <button type="button" onClick={() => openContact()} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-5 text-[15px] font-bold text-brand-ink">
                  <Mail className="h-4 w-4 text-brand-orange-text" /> Nous écrire
                </button>
              </div>
            </div>
            <Col title="Vendre">
              <B onClick={() => openEstimation()}>Estimer mon bien</B>
              <L to="/vendre">Vendre avec Emilio</L>
              <L to="/vendre#confidentiel">Vente confidentielle</L>
              <L to="/honoraires" strong>Nos honoraires</L>
            </Col>
            <Col title="Acheter">
              <L to="/biens">Nos biens</L>
              <L to="/acheter#recherche">Confier ma recherche</L>
              <L to="/acheter#espace">Mon espace client</L>
            </Col>
            <Col title="L’agence">
              <L to="/notre-histoire">Notre histoire</L>
              <L to="/guide-immobilier">Guide immobilier</L>
              <B onClick={() => openContact()}>Contact</B>
            </Col>
            <Col title="Paris">{PARIS.map(([n, to]) => <L key={n} to={to}>{n}</L>)}</Col>
            <Col title="Hauts-de-Seine">
              {HDS.map(([n, to]) => <L key={n} to={to}>{n}</L>)}
              <span className="py-2 text-[13.5px] leading-normal">et d’autres villes, sur demande</span>
            </Col>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-[#E2E8F0] pt-3 text-[13px]">
            <span>© {new Date().getFullYear()} Emilio Immobilier · RT Conseils SAS · Carte professionnelle CPI 9201 2020 000 045 344</span>
            <span className="flex flex-wrap gap-x-5 gap-y-0">
              <Link to="/mentions-legales" className="inline-flex min-h-[44px] items-center hover:text-brand-ink">Mentions légales</Link>
              <Link to="/honoraires" className="inline-flex min-h-[44px] items-center hover:text-brand-ink">Nos honoraires</Link>
              <Link to="/mentions-legales#donnees" className="inline-flex min-h-[44px] items-center hover:text-brand-ink">Confidentialité</Link>
            </span>
          </div>
        </div>
      </footer>
      {/* Barre fixe sur téléphone */}
      <div className="h-[76px] bg-brand-surf md:hidden" aria-hidden />
      <div className="fixed bottom-0 left-0 z-40 flex w-full max-w-[100vw] gap-2.5 border-t border-[#E2E8F0] bg-white/95 px-4 pt-3 font-jakarta backdrop-blur md:hidden" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
        <a href={TEL_HREF} className="inline-flex h-[50px] min-w-0 flex-[1_1_0%] items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-brand-surf px-2 text-[15px] font-bold text-brand-ink">
          <Phone className="h-[17px] w-[17px] flex-none" /> Appeler
        </a>
        <button type="button" onClick={() => openEstimation()} className="inline-flex h-[50px] min-w-0 flex-[1.4_1_0%] items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-brand-orange px-2 text-[15px] font-bold text-brand-ink">
          <LineChart className="h-[17px] w-[17px] flex-none max-[359px]:hidden" /> <span className="truncate">Estimer mon bien</span>
        </button>
      </div>
    </>
  );
};

export default Footer;
