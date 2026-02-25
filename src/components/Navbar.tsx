import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Nos Biens", path: "/biens" },
  { label: "Le Directeur", path: "/directeur" },
  { label: "Vendre", path: "/vendre" },
  { label: "Mandat de Recherche", path: "/mandat-recherche" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Émilio Conseil Immobilier" className="h-12" />
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

        <a
          href="tel:+33658957632"
          className="hidden lg:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-body tracking-wide hover:bg-navy-light transition-colors rounded"
        >
          <Phone className="w-4 h-4" />
          06 58 95 76 32
        </a>

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
            <a
              href="tel:+33658957632"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-body tracking-wide rounded w-fit"
            >
              <Phone className="w-4 h-4" />
              06 58 95 76 32
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
