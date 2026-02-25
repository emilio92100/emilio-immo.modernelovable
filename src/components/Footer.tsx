import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <img src={logo} alt="Émilio" className="h-14 brightness-0 invert mb-4" />
          <p className="text-primary-foreground/70 text-sm font-body leading-relaxed">
            Votre partenaire de confiance pour tous vos projets immobiliers en Île-de-France.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Navigation</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Accueil", path: "/" },
              { label: "Nos Biens", path: "/biens" },
              { label: "Le Directeur", path: "/directeur" },
              { label: "Vendre", path: "/vendre" },
              { label: "Mandat de Recherche", path: "/mandat-recherche" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-primary-foreground/70 hover:text-accent transition-colors font-body"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/70 font-body">
            <a href="tel:+33184801400" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" /> 01 84 80 14 00
            </a>
            <a href="tel:+33658957632" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" /> 06 58 95 76 32
            </a>
            <a href="mailto:agence@emilio-immo.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" /> agence@emilio-immo.com
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Adresse</h4>
          <p className="flex items-start gap-2 text-sm text-primary-foreground/70 font-body">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            Île-de-France
          </p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-xs text-primary-foreground/50 font-body">
        © {new Date().getFullYear()} Émilio Conseil Immobilier. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
