import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import EstimationPopup from "@/components/EstimationPopup";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Nos Biens", path: "/biens" },
  { label: "Vendre", path: "/vendre" },
  { label: "Acheter", path: "/mandat-recherche" },
  { label: "Notre Histoire", path: "/notre-histoire" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Emilio Immobilier" className="h-12" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-sm tracking-wider uppercase transition-colors hover:text-accent ${
                location.pathname === item.path ? "text-accent font-semibold" : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Estimer mon bien - animated */}
        <div className="hidden lg:block">
          <EstimationPopup
            trigger={
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 hsla(38, 80%, 52%, 0.45)",
                    "0 0 0 10px hsla(38, 80%, 52%, 0)",
                    "0 0 0 0 hsla(38, 80%, 52%, 0)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-accent to-[hsl(32_85%_58%)] text-accent-foreground pl-4 pr-5 py-2.5 rounded-full font-body font-semibold text-sm tracking-wide shadow-md hover:shadow-lg hover:brightness-105 transition-all"
              >
                <span className="flex w-7 h-7 rounded-full bg-white/20 items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
                Estimer mon bien
                <Sparkles className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            }
          />
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`font-body text-sm tracking-wider uppercase py-2 ${
                  location.pathname === item.path ? "text-accent font-semibold" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <EstimationPopup
              trigger={
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-[hsl(32_85%_58%)] text-accent-foreground pl-4 pr-5 py-2.5 rounded-full font-body font-semibold text-sm shadow-md w-fit">
                  <span className="flex w-6 h-6 rounded-full bg-white/20 items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </span>
                  Estimer mon bien
                </button>
              }
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
