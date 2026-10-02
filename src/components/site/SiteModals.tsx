/* ═══ Fenêtres du site : estimation et demande d'informations ═══════════════
   Un seul exemplaire de chaque fenêtre pour tout le site. N'importe quel bouton
   les ouvre avec `useSiteModals()`. */
import { createContext, lazy, Suspense, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const EstimationFlow = lazy(() => import("./EstimationFlow"));
const ContactModal = lazy(() => import("./ContactModal"));

export type EstimationPrefill = { address?: string; city?: string; postalCode?: string };
export type ContactObjet = "Vendre" | "Acheter" | "Estimer" | "Visiter un bien" | "Autre";
export type ContactPrefill = { objet?: ContactObjet; message?: string; propertyRef?: string; propertyTitle?: string; propertyImage?: string; propertyPrice?: string };

type Ctx = {
  openEstimation: (p?: EstimationPrefill) => void;
  openContact: (p?: ContactPrefill) => void;
};

const SiteModalsContext = createContext<Ctx>({ openEstimation: () => {}, openContact: () => {} });

export const useSiteModals = () => useContext(SiteModalsContext);

export function SiteModalsProvider({ children }: { children: ReactNode }) {
  const [estimation, setEstimation] = useState<{ open: boolean; prefill: EstimationPrefill; key: number }>({ open: false, prefill: {}, key: 0 });
  const [contact, setContact] = useState<{ open: boolean; prefill: ContactPrefill; key: number }>({ open: false, prefill: {}, key: 0 });
  const [loaded, setLoaded] = useState({ e: false, c: false });

  const openEstimation = useCallback((p: EstimationPrefill = {}) => {
    setLoaded((l) => ({ ...l, e: true }));
    setEstimation((s) => ({ open: true, prefill: p, key: s.key + 1 }));
  }, []);
  const openContact = useCallback((p: ContactPrefill = {}) => {
    setLoaded((l) => ({ ...l, c: true }));
    setContact((s) => ({ open: true, prefill: p, key: s.key + 1 }));
  }, []);

  const value = useMemo(() => ({ openEstimation, openContact }), [openEstimation, openContact]);

  return (
    <SiteModalsContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        {loaded.e && (
          <EstimationFlow
            key={estimation.key}
            open={estimation.open}
            prefill={estimation.prefill}
            onClose={() => setEstimation((s) => ({ ...s, open: false }))}
            onContact={() => {
              setEstimation((s) => ({ ...s, open: false }));
              openContact({ objet: "Estimer", message: "Je souhaite convenir d’un rendez-vous pour l’avis de valeur sur place." });
            }}
          />
        )}
        {loaded.c && <ContactModal key={contact.key} open={contact.open} prefill={contact.prefill} onClose={() => setContact((s) => ({ ...s, open: false }))} />}
      </Suspense>
    </SiteModalsContext.Provider>
  );
}
