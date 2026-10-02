import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

const NewFeaturePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("new-feature-seen");
    if (!seen) {
      const t1 = setTimeout(() => setOpen(true), 5000);
      const t2 = setTimeout(() => {
        setOpen(false);
        sessionStorage.setItem("new-feature-seen", "1");
      }, 12000);
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="bg-card border border-accent/20 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-sm relative overflow-hidden text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative glows */}
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

            <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-accent" />
            </div>

            <p className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2 tracking-[-0.025em]">
              Nouveau ! 🎉
            </p>
            <p className="font-display text-base sm:text-lg font-extrabold text-accent mb-3 tracking-[-0.025em]">
              Détail des surfaces
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Consultez désormais le détail de chaque surface pièce par pièce directement sur la fiche d'un bien.
            </p>

            {/* Progress bar */}
            <div className="mt-5 h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 7, ease: "linear" }}
                className="h-full bg-accent rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewFeaturePopup;
