import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { SiteModalsProvider } from "./components/site/SiteModals";
import Acheter from "./pages/Acheter";
import Honoraires from "./pages/Honoraires";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import Director from "./pages/Director";
import SellPage from "./pages/SellPage";
import PropertyDetail from "./pages/PropertyDetail";
import MentionsLegales from "./pages/MentionsLegales";
import Estimation from "./pages/Estimation";
import GuideImmobilier from "./pages/GuideImmobilier";
import GuideCategory from "./pages/GuideCategory";
import GuideArticle from "./pages/GuideArticle";
import NotFound from "./pages/NotFound";
import CityPageTemplate from "./components/CityPageTemplate";
import SellCityPageTemplate from "./components/SellCityPageTemplate";
import { cityList } from "./lib/cities";
import { getSellCityData } from "./lib/sellCities";
const queryClient = new QueryClient();

/** Fournisseurs communs (navigateur et pré-génération des pages). */
export const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

/** Toutes les routes du site. */
export const AppRoutes = () => (
  <SiteModalsProvider>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/biens" element={<Properties />} />
      <Route path="/biens/:id" element={<PropertyDetail />} />
      <Route path="/notre-histoire" element={<Director />} />
      <Route path="/vendre" element={<SellPage />} />
      <Route path="/estimation" element={<Estimation />} />
      <Route path="/acheter" element={<Acheter />} />
      <Route path="/mandat-recherche" element={<Navigate to="/acheter" replace />} />
      <Route path="/honoraires" element={<Honoraires />} />
      {/* L'ancien espace admin (Lovable) : les demandes arrivent dans le CRM. */}
      <Route path="/admin/*" element={<Navigate to="/" replace />} />
      <Route path="/reset-password" element={<Navigate to="/" replace />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      {/* Redirections des anciennes URLs (ancien prestataire) vers les pages actuelles */}
      <Route path="/detail/*" element={<Navigate to="/biens" replace />} />
      <Route path="/visio-cam" element={<Navigate to="/" replace />} />
      <Route path="/visio-cam/*" element={<Navigate to="/" replace />} />
      {/* Pages par secteur (référencement local) */}
      {cityList.map((c) => (
        <Route key={`a-${c.slug}`} path={`/achat-appartement-${c.slug}`} element={<CityPageTemplate city={c} />} />
      ))}
      {cityList.map((c) => {
        const sell = getSellCityData(c.slug);
        return sell ? <Route key={`v-${c.slug}`} path={`/vendre-appartement-${c.slug}`} element={<SellCityPageTemplate city={c} sell={sell} />} /> : null;
      })}
      {/* Guide Immobilier (blog) */}
      <Route path="/guide-immobilier" element={<GuideImmobilier />} />
      <Route path="/guide-immobilier/:category" element={<GuideCategory />} />
      <Route path="/guide-immobilier/:category/:slug" element={<GuideArticle />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </SiteModalsProvider>
);

const App = () => (
  <Providers>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </Providers>
);

export default App;
