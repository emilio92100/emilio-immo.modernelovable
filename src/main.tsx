import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Page pré-générée : on reprend le HTML déjà affiché (pas de clignotement). Sinon, rendu classique.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
