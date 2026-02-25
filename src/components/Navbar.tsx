import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import EstimationForm from "@/components/EstimationForm";

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
          <EstimationForm
            trigger={
              <motion.button
                animate={{
                  boxShadow: [
                    "0 0 0 0 hsla(38, 55%, 55%, 0.4)",
                    "0 0 0 8px hsla(38, 55%, 55%, 0)",
                    "0 0 0 0 hsla(38, 55%, 55%, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all"
              >
                <Home className="w-4 h-4" />
                Estimer mon bien
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
            <EstimationForm
              trigger={
                <button className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded font-body font-semibold text-sm w-fit">
                  <Home className="w-4 h-4" /> Estimer mon bien
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
