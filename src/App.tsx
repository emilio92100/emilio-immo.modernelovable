import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import Director from "./pages/Director";
import SellPage from "./pages/SellPage";
import BuyerMandate from "./pages/BuyerMandate";
import PropertyDetail from "./pages/PropertyDetail";
import AdminSubmissions from "./pages/AdminSubmissions";
import AdminLogin from "./pages/AdminLogin";
import MentionsLegales from "./pages/MentionsLegales";
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
          <Route path="/mandat-recherche" element={<BuyerMandate />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/demandes" element={<AdminSubmissions />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
