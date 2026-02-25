import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Nos Biens", path: "/biens" },
  { label: "Notre Histoire", path: "/notre-histoire" },
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
          href="tel:+33184801400"
          className="hidden lg:flex items-center gap-2 text-foreground hover:text-accent px-4 py-2 text-sm font-body tracking-wide transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="text-muted-foreground text-xs mr-1">Appelez-nous</span>
          01 84 80 14 00
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
              href="tel:+33184801400"
              className="flex items-center gap-2 text-foreground px-2 py-2 text-sm font-body tracking-wide w-fit"
            >
              <Phone className="w-4 h-4" />
              <span className="text-muted-foreground text-xs mr-1">Appelez-nous</span>
              01 84 80 14 00
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
