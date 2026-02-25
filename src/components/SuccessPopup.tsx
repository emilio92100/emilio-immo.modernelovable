import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessPopupProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  duration?: number;
}

const SuccessPopup = ({
  open,
  onClose,
  title = "Message envoyé !",
  description = "Nous vous recontacterons dans les plus brefs délais.",
  duration = 10000,
}: SuccessPopupProps) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background border border-border rounded-lg shadow-xl px-8 py-8 max-w-sm w-full mx-4 text-center relative"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">{title}</h3>
            <p className="font-body text-sm text-muted-foreground">{description}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessPopup;
