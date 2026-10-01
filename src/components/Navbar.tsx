/* En-tête du site (refonte 2026, direction « Tuiles ») : logo, menu en pilule, téléphone et « Estimer mon bien ». */
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LineChart, Mail, Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { Container, MAIL, TEL, TEL_HREF } from "@/components/site/ui";
import logo from "@/assets/refonte/logo-bleu.webp";

export const NAV = [
  { label: "Accueil", to: "/" },
  { label: "Nos biens", to: "/biens" },
  { label: "Vendre", to: "/vendre" },
  { label: "Acheter", to: "/acheter" },
  { label: "Notre histoire", to: "/notre-histoire" },
];

const Navbar = () => {
  const { openEstimation } = useSiteModals();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 font-jakarta backdrop-blur">
      <Container className="flex min-h-[72px] max-w-[1320px] items-center gap-6 px-4 sm:px-4 md:px-10 lg:min-h-[88px]">
        <Link to="/" className="block flex-none" aria-label="Emilio Immobilier, accueil">
          <img src={logo} alt="Emilio conseil immobilier" className="block h-10 w-auto lg:h-[46px]" />
        </Link>
        <nav aria-label="Navigation principale" className="mx-auto hidden gap-1 rounded-full bg-brand-surf p-[5px] lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                cn(
                  "inline-flex h-[42px] items-center whitespace-nowrap rounded-full px-[18px] text-[14.5px] font-semibold transition",
                  isActive ? "bg-white text-brand-ink shadow-[0_2px_8px_-2px_rgba(19,36,61,0.15)]" : "text-brand-mut hover:text-brand-ink",
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
          <a href={TEL_HREF} aria-label={`Appeler l’agence au ${TEL}`} className="hidden h-12 items-center gap-2.5 rounded-full pl-1.5 pr-1.5 text-[15px] font-bold text-brand-ink md:inline-flex xl:pr-4">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-orl text-brand-orange-text"><Phone className="h-4 w-4" /></span>
            <span className="hidden whitespace-nowrap xl:inline">{TEL}</span>
          </a>
          <button
            type="button"
            onClick={() => openEstimation()}
            className="hidden h-12 items-center gap-2 whitespace-nowrap rounded-2xl bg-brand px-6 text-[15px] font-bold text-white transition hover:-translate-y-px sm:inline-flex"
          >
            Estimer mon bien
          </button>
          <a href={TEL_HREF} aria-label={`Appeler l’agence au ${TEL}`} className="grid h-11 w-11 place-items-center rounded-full bg-brand-surf text-brand-ink md:hidden">
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-full bg-brand-surf text-brand-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
      {open && (
        <div className="border-t border-[#E2E8F0] bg-white lg:hidden">
          <Container className="flex max-w-[1320px] flex-col gap-1 px-4 py-3 sm:px-4 md:px-10">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) => cn("flex min-h-[52px] items-center rounded-2xl px-4 text-[17px]", isActive ? "bg-brand-surf font-bold text-brand-ink" : "font-semibold text-brand-ink")}
              >
                {n.label}
              </NavLink>
            ))}
            <a href={`mailto:${MAIL}`} className="flex min-h-[52px] items-center gap-2.5 px-4 text-[16px] font-semibold text-brand-ink">
              <Mail className="h-[18px] w-[18px] text-brand-orange-text" /> {MAIL}
            </a>
            <button
              type="button"
              onClick={() => { setOpen(false); openEstimation(); }}
              className="mt-2 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-brand-orange text-[15.5px] font-bold text-brand-ink"
            >
              <LineChart className="h-[18px] w-[18px]" /> Estimer mon bien
            </button>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;
