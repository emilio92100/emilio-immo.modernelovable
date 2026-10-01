/* Page introuvable (refonte 2026). */
import { Link } from "react-router-dom";
import { ArrowRight, Home, LineChart, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useSiteModals } from "@/components/site/SiteModals";
import { Btn, Container, Em } from "@/components/site/ui";

const NotFound = () => {
  const { openEstimation } = useSiteModals();
  return (
    <div className="min-h-screen bg-white">
      <SEOHead title="Page introuvable | Emilio Immobilier" description="Cette page n’existe pas ou a été déplacée. Retrouvez nos biens à vendre à Paris et dans les Hauts-de-Seine." noindex />
      <Navbar />
      <main className="bg-brand-pale">
        <Container className="flex flex-col items-center gap-6 py-20 text-center md:py-28">
          <span className="font-display text-[96px] italic leading-none text-brand-orange-lt md:text-[132px]">404</span>
          <h1 className="m-0 font-display text-[clamp(30px,3.6vw,48px)] font-medium leading-tight text-brand-ink">Cette page est <Em>introuvable</Em></h1>
          <p className="m-0 max-w-[520px] text-[17px] leading-relaxed text-brand-txt">Elle a peut-être été déplacée, ou le bien a déjà trouvé preneur. Voici par où continuer.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Btn to="/" iconLeft={<Home className="h-[18px] w-[18px]" />}>Retour à l’accueil</Btn>
            <Btn to="/biens" variant="outline" iconLeft={<Search className="h-[18px] w-[18px]" />}>Voir nos biens</Btn>
            <Btn variant="outline" onClick={() => openEstimation()} iconLeft={<LineChart className="h-[18px] w-[18px]" />}>Estimer mon bien</Btn>
          </div>
          <Link to="/guide-immobilier" className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-bold text-brand">Lire le guide immobilier <ArrowRight className="h-4 w-4 text-brand-orange" /></Link>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
