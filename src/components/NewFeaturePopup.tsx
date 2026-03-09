import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

const NewFeaturePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("new-feature-seen");
    if (!seen) {
      const t1 = setTimeout(() => setOpen(true), 800);
      const t2 = setTimeout(() => {
        setOpen(false);
        sessionStorage.setItem("new-feature-seen", "1");
      }, 5800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("new-feature-seen", "1");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md"
        >
          <div className="bg-card border border-accent/30 rounded-2xl shadow-2xl px-6 py-5 flex items-start gap-4 relative overflow-hidden">
            {/* Accent glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-semibold text-foreground mb-1">
                Nouveau ! Détail des surfaces 🎉
              </p>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Consultez désormais le détail de chaque surface pièce par pièce directement sur la fiche d'un bien.
              </p>
            </div>

            <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors mt-0.5">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewFeaturePopup;
