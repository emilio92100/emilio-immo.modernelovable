import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Smile } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-6 gap-10">
        <div className="md:col-span-1">
          <img src={logo} alt="Emilio" className="h-14 brightness-0 invert mb-4" />
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
              { label: "Vendre", path: "/vendre" },
              { label: "Acheter", path: "/mandat-recherche" },
              { label: "Notre Histoire", path: "/notre-histoire" },
              { label: "Mentions légales", path: "/mentions-legales" },
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
          <h4 className="font-display text-lg mb-4">Nos secteurs</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Boulogne-Billancourt", path: "/achat-appartement-boulogne-billancourt" },
              { label: "Neuilly-sur-Seine", path: "/achat-appartement-neuilly-sur-seine" },
              { label: "Levallois-Perret", path: "/achat-appartement-levallois-perret" },
              { label: "Issy-les-Moulineaux", path: "/achat-appartement-issy-les-moulineaux" },
              { label: "Paris 6e", path: "/achat-appartement-paris-6" },
              { label: "Paris 7e", path: "/achat-appartement-paris-7" },
              { label: "Paris 15e", path: "/achat-appartement-paris-15" },
              { label: "Paris 16e", path: "/achat-appartement-paris-16" },
            ].map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="text-sm text-primary-foreground/70 hover:text-accent transition-colors font-body"
              >
                {s.label}
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
            <a href="mailto:agence@emilio-immo.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" /> agence@emilio-immo.com
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Adresse</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/70 font-body">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Paris & Hauts-de-Seine (92)
            </p>
            <p className="flex items-start gap-2">
              <Smile className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
              <span className="italic text-primary-foreground/50">...et surtout, chez vous !</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/50 font-body">
        <span>© {new Date().getFullYear()} Emilio Immobilier. Tous droits réservés.</span>
        <Link to="/mentions-legales" className="hover:text-accent transition-colors">Mentions légales</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
