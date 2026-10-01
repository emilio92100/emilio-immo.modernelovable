/* En-tête du site (refonte 2026) : bandeau bleu + menu. */
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
    <>
      <div className="bg-brand">
        <Container className="flex min-h-[44px] items-center justify-between gap-6">
          <span className="hidden text-[13.5px] text-brand-bt sm:inline">Agence immobilière indépendante à Paris et dans les Hauts-de-Seine, depuis 2020</span>
          <div className="ml-auto flex items-center gap-5">
            <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center gap-2 text-[13.5px] font-bold text-white">
              <Phone className="h-[15px] w-[15px] text-brand-orange" /> {TEL}
            </a>
            <a href={`mailto:${MAIL}`} className="hidden min-h-[44px] items-center gap-2 text-[13.5px] font-semibold text-brand-bt sm:inline-flex">
              <Mail className="h-[15px] w-[15px] text-brand-orange" /> {MAIL}
            </a>
          </div>
        </Container>
      </div>
      <header className="sticky top-0 z-50 border-b border-brand-line bg-white/95 backdrop-blur">
        <Container className="flex min-h-[76px] items-center gap-7 lg:min-h-[84px]">
          <Link to="/" className="block flex-none" aria-label="Emilio Immobilier, accueil">
            <img src={logo} alt="Emilio conseil immobilier" className="block h-[40px] w-auto lg:h-[46px]" />
          </Link>
          <nav aria-label="Navigation principale" className="mx-auto hidden gap-1 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "inline-flex h-11 items-center px-3.5 text-[13px] uppercase tracking-[0.1em] transition-colors",
                    isActive ? "font-bold text-brand-orange-text shadow-[inset_0_-2px_0_#E68B23]" : "font-semibold text-brand hover:text-brand-orange-text",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
            <button
              type="button"
              onClick={() => openEstimation()}
              className="hidden h-[46px] items-center gap-2.5 rounded-[10px] bg-brand-orange px-5 text-[15px] font-bold text-brand-ink transition hover:brightness-105 sm:inline-flex"
            >
              <LineChart className="h-[18px] w-[18px]" /> Estimer mon bien
            </button>
            <a href={TEL_HREF} aria-label="Appeler l’agence" className="grid h-11 w-11 place-items-center rounded-[10px] border border-brand-line text-brand sm:hidden">
              <Phone className="h-5 w-5" />
            </a>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="grid h-11 w-11 place-items-center rounded-[10px] bg-brand text-white lg:hidden"
            >
              {open ? <X className="h-[22px] w-[22px]" /> : <Menu className="h-[22px] w-[22px]" />}
            </button>
          </div>
        </Container>
        {open && (
          <div className="border-t border-brand-line bg-white lg:hidden">
            <Container className="flex flex-col py-3">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  className={({ isActive }) => cn("flex min-h-[52px] items-center border-b border-brand-line2 text-[17px]", isActive ? "font-bold text-brand-orange-text" : "font-semibold text-brand-ink")}
                >
                  {n.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={() => { setOpen(false); openEstimation(); }}
                className="mt-4 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-brand-orange text-[15.5px] font-extrabold text-brand-ink"
              >
                <LineChart className="h-[18px] w-[18px]" /> Estimer mon bien
              </button>
            </Container>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
