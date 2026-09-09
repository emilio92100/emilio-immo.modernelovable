import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import Director from "./pages/Director";
import SellPage from "./pages/SellPage";
import BuyerMandate from "./pages/BuyerMandate";
import PropertyDetail from "./pages/PropertyDetail";
import AdminSubmissions from "./pages/AdminSubmissions";
import AdminLogin from "./pages/AdminLogin";
import ResetPassword from "./pages/ResetPassword";
import MentionsLegales from "./pages/MentionsLegales";
import AchatBoulogneBillancourt from "./pages/AchatBoulogneBillancourt";
import AchatNeuillySurSeine from "./pages/AchatNeuillySurSeine";
import AchatIssyLesMoulineaux from "./pages/AchatIssyLesMoulineaux";
import AchatLevalloisPerret from "./pages/AchatLevalloisPerret";
import AchatParis16 from "./pages/AchatParis16";
import AchatParis15 from "./pages/AchatParis15";
import AchatParis7 from "./pages/AchatParis7";
import AchatParis6 from "./pages/AchatParis6";
import VendreBoulogneBillancourt from "./pages/VendreBoulogneBillancourt";
import VendreNeuillySurSeine from "./pages/VendreNeuillySurSeine";
import VendreIssyLesMoulineaux from "./pages/VendreIssyLesMoulineaux";
import VendreLevalloisPerret from "./pages/VendreLevalloisPerret";
import VendreParis16 from "./pages/VendreParis16";
import VendreParis15 from "./pages/VendreParis15";
import VendreParis7 from "./pages/VendreParis7";
import VendreParis6 from "./pages/VendreParis6";
import Estimation from "./pages/Estimation";
import GuideImmobilier from "./pages/GuideImmobilier";
import GuideCategory from "./pages/GuideCategory";
import GuideArticle from "./pages/GuideArticle";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/biens" element={<Properties />} />
          <Route path="/biens/:id" element={<PropertyDetail />} />
          <Route path="/notre-histoire" element={<Director />} />
          <Route path="/vendre" element={<SellPage />} />
          <Route path="/estimation" element={<Estimation />} />
          <Route path="/mandat-recherche" element={<BuyerMandate />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin/demandes" element={<AdminSubmissions />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          {/* Redirections des anciennes URLs (ancien prestataire) vers les pages actuelles */}
          <Route path="/detail/*" element={<Navigate to="/biens" replace />} />
          <Route path="/visio-cam" element={<Navigate to="/" replace />} />
          <Route path="/visio-cam/*" element={<Navigate to="/" replace />} />
          <Route path="/achat-appartement-boulogne-billancourt" element={<AchatBoulogneBillancourt />} />
          <Route path="/achat-appartement-neuilly-sur-seine" element={<AchatNeuillySurSeine />} />
          <Route path="/achat-appartement-issy-les-moulineaux" element={<AchatIssyLesMoulineaux />} />
          <Route path="/achat-appartement-levallois-perret" element={<AchatLevalloisPerret />} />
          <Route path="/achat-appartement-paris-16" element={<AchatParis16 />} />
          <Route path="/achat-appartement-paris-15" element={<AchatParis15 />} />
          <Route path="/achat-appartement-paris-7" element={<AchatParis7 />} />
          <Route path="/achat-appartement-paris-6" element={<AchatParis6 />} />
          <Route path="/vendre-appartement-boulogne-billancourt" element={<VendreBoulogneBillancourt />} />
          <Route path="/vendre-appartement-neuilly-sur-seine" element={<VendreNeuillySurSeine />} />
          <Route path="/vendre-appartement-issy-les-moulineaux" element={<VendreIssyLesMoulineaux />} />
          <Route path="/vendre-appartement-levallois-perret" element={<VendreLevalloisPerret />} />
          <Route path="/vendre-appartement-paris-16" element={<VendreParis16 />} />
          <Route path="/vendre-appartement-paris-15" element={<VendreParis15 />} />
          <Route path="/vendre-appartement-paris-7" element={<VendreParis7 />} />
          <Route path="/vendre-appartement-paris-6" element={<VendreParis6 />} />
          {/* Guide Immobilier (blog) */}
          <Route path="/guide-immobilier" element={<GuideImmobilier />} />
          <Route path="/guide-immobilier/:category" element={<GuideCategory />} />
          <Route path="/guide-immobilier/:category/:slug" element={<GuideArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
