import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

/* Copie de la page d'application (sans contenu pré-généré) : sert de repli pour les adresses
   qui ne sont pas pré-générées (fiches des biens, etc.). Voir vercel.json et scripts/prerender.mjs. */
const spaFallback = (): Plugin => {
  let outDir = "dist";
  let ssr = false;
  return {
    name: "emilio-spa-fallback",
    apply: "build",
    configResolved(c) {
      outDir = path.resolve(c.root, c.build.outDir);
      ssr = !!c.build.ssr;
    },
    closeBundle() {
      const index = path.join(outDir, "index.html");
      if (!ssr && fs.existsSync(index)) fs.copyFileSync(index, path.join(outDir, "spa.html"));
    },
  };
};

export default defineConfig(({ mode }) => ({
  base: "/",   // ← IMPORTANT

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  plugins: [
    react(),
    spaFallback(),
    mode === "development" && componentTagger()
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
