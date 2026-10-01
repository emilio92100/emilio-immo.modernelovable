/* Pied de page (refonte 2026) : le contact est ici, avec « Nous écrire ». */
import { Link } from "react-router-dom";
import { LineChart, Mail, Phone } from "lucide-react";
import { useSiteModals } from "@/components/site/SiteModals";
import { Container, MAIL, TEL, TEL_HREF } from "@/components/site/ui";
import logoBlanc from "@/assets/refonte/logo-blanc.webp";

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
  <div className="flex flex-col">
    <span className="mb-2 font-display text-xl text-white">{title}</span>
    {children}
  </div>
);
const L = ({ to, children, strong }: { to: string; children: React.ReactNode; strong?: boolean }) => (
  <Link to={to} className={`block py-2 text-[15px] leading-6 hover:text-white ${strong ? "font-bold text-white" : "font-medium text-brand-bt"}`}>
    {children}
  </Link>
);

const Footer = () => {
  const { openEstimation, openContact } = useSiteModals();
  return (
    <>
      <footer className="bg-brand text-brand-bt">
        <Container className="flex flex-col gap-9 pb-[18px] pt-16 lg:pt-[72px]">
          <div className="flex flex-wrap gap-x-14 gap-y-10">
            <div className="flex min-w-0 max-w-[300px] flex-[1_1_260px] flex-col gap-[18px]">
              <img src={logoBlanc} alt="Emilio conseil immobilier" className="h-[52px] w-auto self-start" />
              <p className="m-0 text-[15px] leading-relaxed">Agence immobilière indépendante à Paris et dans les Hauts-de-Seine, créée en 2020 à Boulogne-Billancourt.</p>
              <button type="button" onClick={() => openEstimation()} className="inline-flex h-12 items-center gap-2 self-start rounded-[10px] bg-brand-orange px-5 text-[15px] font-bold text-brand-ink">
                <LineChart className="h-[18px] w-[18px]" /> Estimer mon bien
              </button>
            </div>
            <div className="grid min-w-0 flex-[3_1_640px] grid-cols-2 gap-x-7 gap-y-8 sm:grid-cols-[1fr_0.8fr_1.15fr_1.35fr]">
              <Col title="Navigation">
                <L to="/biens">Nos biens</L>
                <L to="/vendre">Vendre</L>
                <L to="/acheter">Acheter</L>
                <L to="/notre-histoire">Notre histoire</L>
                <L to="/guide-immobilier">Guide immobilier</L>
                <L to="/honoraires" strong>Nos honoraires</L>
              </Col>
              <Col title="Paris">{PARIS.map(([n, to]) => <L key={n} to={to}>{n}</L>)}</Col>
              <Col title="Hauts-de-Seine">
                {HDS.map(([n, to]) => <L key={n} to={to}>{n}</L>)}
                <span className="py-2 text-sm leading-normal">et d’autres communes du 92</span>
              </Col>
              <Col title="Contact">
                <a href={TEL_HREF} className="flex items-center gap-2 py-2 text-[15px] font-bold text-white"><Phone className="h-4 w-4 text-brand-orange" /> {TEL}</a>
                <a href={`mailto:${MAIL}`} className="block py-2 text-[15px] text-brand-bt hover:text-white">{MAIL.split("@")[0]}<wbr />@{MAIL.split("@")[1]}</a>
                <button type="button" onClick={() => openContact()} className="mt-2 inline-flex h-11 items-center gap-2 self-start rounded-[10px] border-[1.5px] border-white/50 px-4 text-[14.5px] font-bold text-white hover:bg-white/10">
                  <Mail className="h-4 w-4 text-brand-orange" /> Nous écrire
                </button>
              </Col>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-white/15 pt-3 text-[13.5px]">
            <span>© {new Date().getFullYear()} Emilio Immobilier · RT Conseils SAS · Carte professionnelle CPI 9201 2020 000 045 344</span>
            <span className="flex flex-wrap gap-x-5 gap-y-0">
              <Link to="/mentions-legales" className="inline-flex min-h-[44px] items-center hover:text-white">Mentions légales</Link>
              <Link to="/honoraires" className="inline-flex min-h-[44px] items-center hover:text-white">Nos honoraires</Link>
              <Link to="/mentions-legales#donnees" className="inline-flex min-h-[44px] items-center hover:text-white">Confidentialité</Link>
            </span>
          </div>
        </Container>
      </footer>
      {/* Barre fixe sur téléphone */}
      <div className="h-[84px] md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-brand-line bg-white px-4 pb-3.5 pt-3 shadow-[0_-10px_28px_-18px_rgba(19,36,61,0.45)] md:hidden">
        <a href={TEL_HREF} className="inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-brand text-[15.5px] font-bold text-brand">
          <Phone className="h-[18px] w-[18px]" /> Appeler
        </a>
        <button type="button" onClick={() => openEstimation()} className="inline-flex h-[52px] flex-[1.5] items-center justify-center gap-2 rounded-[10px] bg-brand-orange text-[15.5px] font-extrabold text-brand-ink">
          <LineChart className="h-[18px] w-[18px]" /> Estimer mon bien
        </button>
      </div>
    </>
  );
};

export default Footer;
