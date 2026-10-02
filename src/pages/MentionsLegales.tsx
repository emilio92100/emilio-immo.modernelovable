/* Mentions légales (refonte 2026) : même contenu juridique, nouvelle présentation. */
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { SITE_URL } from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import { Container, Crumbs, Eyebrow, FRAME_SHADOW, MAIL, TEL, TEL_HREF } from "@/components/site/ui";

const B = ({ children }: { children: ReactNode }) => <strong className="font-bold text-brand-ink">{children}</strong>;

const SECTIONS: { id: string; t: string; body: ReactNode }[] = [
  {
    id: "editeur",
    t: "Éditeur du site",
    body: (
      <>
        <p>Le site www.emilio-immo.com est édité par la société RT CONSEILS, société par actions simplifiée au capital de 1 000 euros. <B>emilio-immo.com</B> est édité par la société Emilio Immobilier, société par actions simplifiée au capital variable.</p>
        <ul>
          <li>Siège social : 10 avenue Kléber, 75016 Paris</li>
          <li>Directeur de la publication : <B>Alexandre ROGELET</B></li>
          <li>Téléphone : <a href={TEL_HREF}>{TEL}</a></li>
          <li>E-mail : <a href={`mailto:${MAIL}`}>{MAIL}</a></li>
        </ul>
      </>
    ),
  },
  {
    id: "activite",
    t: "Activité réglementée",
    body: <p>RT CONSEILS est titulaire de la carte professionnelle de transaction sur immeubles et fonds de commerce (carte T) numéro CPI 9201 2020 000 045 344, délivrée par la Chambre de commerce et d’industrie conformément à la loi n° 70-9 du 2 janvier 1970 (loi Hoguet) et au décret n° 72-678 du 20 juillet 1972.</p>,
  },
  {
    id: "assurance",
    t: "Assurance responsabilité civile professionnelle",
    body: (
      <>
        <p>Emilio Immobilier bénéficie d’une assurance de responsabilité civile professionnelle souscrite auprès de :</p>
        <p><B>MMA — Agence de Boulogne</B><br />85, route de la Reine<br />92100 Boulogne-Billancourt</p>
      </>
    ),
  },
  {
    id: "garantie",
    t: "Garantie financière",
    body: <p>La société RT CONSEILS, titulaire de la carte professionnelle délivrée par la CCI, déclare ne pas détenir de garantie financière, conformément aux dispositions de la loi n° 70-9 du 2 janvier 1970 et de son décret d’application n° 72-678 du 20 juillet 1972. La société s’interdit de recevoir, détenir ou manipuler des fonds, effets ou valeurs pour le compte de ses clients, à l’exception de sa rémunération ou de ses honoraires.</p>,
  },
  {
    id: "honoraires",
    t: "Honoraires",
    body: <p>Le barème de nos honoraires est consultable sur la page <Link to="/honoraires">Nos honoraires</Link>.</p>,
  },
  {
    id: "hebergement",
    t: "Hébergement",
    body: <p>Ce site est hébergé par Vercel (www.vercel.com).</p>,
  },
  {
    id: "propriete",
    t: "Propriété intellectuelle",
    body: <p>L’ensemble du contenu de ce site (textes, images, logos, éléments graphiques) est protégé par le droit d’auteur et le droit des marques. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l’autorisation écrite préalable d’Emilio Immobilier.</p>,
  },
  {
    id: "donnees",
    t: "Protection des données personnelles",
    body: (
      <>
        <p>Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition aux données personnelles vous concernant. Pour exercer ces droits, vous pouvez nous contacter à l’adresse : <a href={`mailto:${MAIL}`}>{MAIL}</a>.</p>
        <p>Les données collectées via les formulaires de contact et d’estimation sont utilisées exclusivement dans le cadre de votre projet immobilier et ne sont en aucun cas cédées à des tiers sans votre consentement.</p>
      </>
    ),
  },
  {
    id: "mediation",
    t: "Médiation",
    body: <p>Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, RT CONSEILS propose un dispositif de médiation de la consommation. Le médiateur retenu est accessible via le site de la Médiation de la consommation ou par courrier.</p>,
  },
  {
    id: "cookies",
    t: "Cookies",
    body: <p>Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de traçage n’est utilisé sans votre consentement préalable.</p>,
  },
];

const MentionsLegales = () => (
  <div className="min-h-screen bg-white">
    <SEOHead
      title="Mentions légales et confidentialité | Emilio Immobilier"
      description="Mentions légales d’Emilio Immobilier : éditeur, carte professionnelle, assurance, hébergement, protection des données personnelles et cookies."
      canonical={`${SITE_URL}/mentions-legales`}
    />
    <Navbar />
    <main>
      <section className="bg-brand-pale">
        <Container className="flex flex-col gap-[22px] pb-10 pt-6 md:pb-14 md:pt-10">
          <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Mentions légales" }]} />
          <Eyebrow>Informations légales</Eyebrow>
          <h1 className="m-0 font-display text-[clamp(34px,4.2vw,56px)] font-extrabold leading-[1.07] tracking-[-0.03em] text-brand-ink">Mentions légales</h1>
          <p className="m-0 max-w-[640px] text-lg leading-relaxed text-brand-txt">L’éditeur du site, notre carte professionnelle, l’utilisation de vos données et les cookies.</p>
        </Container>
      </section>
      <section className="bg-white">
        <Container className="grid grid-cols-1 items-start gap-x-14 gap-y-8 py-12 md:py-16 lg:grid-cols-[280px_minmax(0,1fr)]">
          <nav aria-label="Sommaire" className={cn("hidden flex-col gap-1 rounded-[20px] bg-white p-4 lg:sticky lg:top-28 lg:flex", FRAME_SHADOW)}>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-lg px-3 py-2 text-[14.5px] font-semibold text-brand-txt hover:bg-brand-pale hover:text-brand-ink">{s.t}</a>
            ))}
          </nav>
          <div className="flex min-w-0 max-w-[780px] flex-col gap-4">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="flex flex-col gap-3 rounded-[20px] border border-brand-line bg-white p-6 md:p-7 [&_a]:font-semibold [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_li]:list-disc [&_p]:m-0 [&_ul]:m-0 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1 [&_ul]:p-0">
                <h2 className="m-0 font-display text-[24px] font-extrabold text-brand-ink tracking-[-0.025em]">{s.t}</h2>
                <div className="flex flex-col gap-3 text-[16px] leading-relaxed text-brand-txt">{s.body}</div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </main>
    <Footer />
  </div>
);

export default MentionsLegales;
