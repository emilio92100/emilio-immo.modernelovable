/* En-tête du site (refonte 2026, direction « Tuiles ») : logo, menu en pilule, téléphone et « Estimer mon bien ». */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Home, KeyRound, LineChart, Mail, Phone, Search, UserRound } from "lucide-react";
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

/* Le menu de l’ordinateur : la pastille bleue de la rubrique en cours glisse d’une rubrique à l’autre.
   Chaque page affiche son propre en-tête : on garde en mémoire où était la pastille sur la page d’avant,
   et la nouvelle page la fait partir de là. */
let pastillePrecedente: { x: number; w: number } | null = null;
const useMesure = typeof window === "undefined" ? useEffect : useLayoutEffect;

const MenuOrdi = () => {
  const { pathname } = useLocation();
  const calme = useReducedMotion();
  const liens = useRef<Record<string, HTMLAnchorElement | null>>({});
  const actif = NAV.find((n) => (n.to === "/" ? pathname === "/" : pathname === n.to || pathname.startsWith(n.to + "/")));
  const [pos, setPos] = useState<{ x: number; w: number } | null>(null);
  const [depart] = useState(() => pastillePrecedente);

  useMesure(() => {
    const mesurer = () => {
      const el = actif && liens.current[actif.to];
      const p = el ? { x: el.offsetLeft, w: el.offsetWidth } : null;
      setPos(p);
      pastillePrecedente = p;
    };
    mesurer();
    // les polices peuvent changer la largeur des mots une fois chargées
    document.fonts?.ready.then(mesurer).catch(() => {});
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, [actif]);

  return (
    <nav aria-label="Navigation principale" className="relative mx-auto hidden gap-1 rounded-full bg-brand-surf p-[5px] lg:flex">
      {pos && (
        <motion.span
          aria-hidden
          className="absolute bottom-[5px] left-0 top-[5px] rounded-full bg-brand shadow-[0_8px_18px_-8px_rgba(34,73,125,0.7)]"
          initial={depart && !calme ? { x: depart.x, width: depart.w, opacity: 1 } : { x: pos.x, width: pos.w, opacity: 0 }}
          animate={{ x: pos.x, width: pos.w, opacity: 1 }}
          transition={calme ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34, opacity: { duration: 0.2 } }}
        />
      )}
      {NAV.map((n) => {
        const on = n === actif;
        return (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === "/"}
            ref={(el) => (liens.current[n.to] = el)}
            className={cn(
              "relative z-[1] inline-flex h-[42px] items-center whitespace-nowrap rounded-full px-[18px] text-[14.5px] font-semibold transition-colors duration-300",
              // avant la mesure (page pré-générée), la rubrique en cours porte elle-même le fond bleu
              on ? cn("text-white", !pos && "bg-brand") : "text-brand-mut hover:bg-white/70 hover:text-brand-ink",
            )}
          >
            {n.label}
          </NavLink>
        );
      })}
    </nav>
  );
};

/* Le menu du téléphone : chaque rubrique avec son icône et une ligne d’explication */
const NAV_MOBILE = [
  { to: "/", t: "Accueil", d: "Votre projet, simplement", icon: Home },
  { to: "/biens", t: "Nos biens", d: "Ce qui est à vendre en ce moment", icon: Search },
  { to: "/vendre", t: "Vendre", d: "Estimation, mise en vente, suivi", icon: LineChart },
  { to: "/acheter", t: "Acheter", d: "Un chasseur et votre espace client", icon: KeyRound },
  { to: "/notre-histoire", t: "Notre histoire", d: "Alexandre et l’équipe", icon: UserRound },
  { to: "/guide-immobilier", t: "Guide immobilier", d: "Prix, conseils, fiscalité", icon: BookOpen },
];

/** Le bouton du menu : trois traits qui se changent en croix */
const Burger = ({ open }: { open: boolean }) => (
  <span aria-hidden className="relative block h-3.5 w-[18px]">
    <span className={cn("absolute left-0 top-0 h-[2px] w-full rounded-full bg-brand-ink transition-all duration-300", open && "top-1/2 -translate-y-1/2 rotate-45")} />
    <span className={cn("absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-brand-ink transition-all duration-200", open && "scale-x-0 opacity-0")} />
    <span className={cn("absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-brand-ink transition-all duration-300", open && "bottom-1/2 translate-y-1/2 -rotate-45")} />
  </span>
);

const Navbar = () => {
  const { openEstimation } = useSiteModals();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduit = !!useReducedMotion();
  useEffect(() => setOpen(false), [pathname]);
  /* Menu ouvert : la page derrière ne défile plus, Échap ferme */
  useEffect(() => {
    if (!open) return;
    const b = document.body;
    const avant = b.style.overflow;
    b.style.overflow = "hidden";
    const echap = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", echap);
    return () => {
      b.style.overflow = avant;
      document.removeEventListener("keydown", echap);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 font-jakarta backdrop-blur">
      <Container className="flex min-h-[72px] max-w-[1320px] items-center gap-3 px-4 sm:gap-6 sm:px-4 md:px-10 lg:min-h-[88px]">
        <Link to="/" className="block flex-none" aria-label="Emilio Immobilier, accueil">
          <img src={logo} alt="Emilio conseil immobilier" width={640} height={268} className="block aspect-[640/268] h-9 w-auto min-[420px]:h-10 lg:h-[46px]" />
        </Link>
        <MenuOrdi />
        <div className="ml-auto flex items-center gap-2 sm:gap-2.5 lg:ml-0">
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
          {/* Téléphone : « Estimer mon bien » en haut, à côté du téléphone (plus de barre en bas de l’écran) */}
          <button
            type="button"
            onClick={() => openEstimation()}
            className="btn-scintille relative inline-flex h-10 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full bg-brand-orange px-3 text-[13.5px] font-extrabold min-[420px]:px-3.5 text-brand-ink shadow-[0_8px_18px_-10px_rgba(230,139,35,0.9)] sm:hidden"
          >
            <LineChart className="relative h-4 w-4 flex-none max-[419px]:hidden" />
            <span className="relative">Estimer<span className="max-[379px]:hidden"> mon bien</span></span>
          </button>
          <a href={TEL_HREF} aria-label={`Appeler l’agence au ${TEL}`} className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand-surf text-brand-ink md:hidden">
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={cn("grid h-10 w-10 flex-none place-items-center rounded-full transition-colors duration-300 sm:h-11 sm:w-11 lg:hidden", open ? "bg-brand-sky" : "bg-brand-surf")}
          >
            <Burger open={open} />
          </button>
        </div>
      </Container>
      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            {/* Le voile sur la page */}
            <motion.div
              key="voile"
              className="absolute inset-x-0 top-full z-[1] h-[100svh] bg-[rgba(19,36,61,0.45)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            {/* Le panneau, qui descend sous l’en-tête */}
            <motion.div
              key="menu"
              className="absolute inset-x-0 top-full z-[2] max-h-[calc(100svh-72px)] overflow-y-auto rounded-b-[28px] bg-white shadow-[0_30px_60px_-30px_rgba(19,36,61,0.6)]"
              initial={reduit ? { opacity: 0 } : { opacity: 0, y: -16, clipPath: "inset(0 0 100% 0 round 0 0 28px 28px)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 0 0 28px 28px)" }}
              exit={reduit ? { opacity: 0 } : { opacity: 0, y: -10, clipPath: "inset(0 0 100% 0 round 0 0 28px 28px)", transition: { duration: 0.22 } }}
              transition={{ duration: 0.38, ease: [0.22, 0.8, 0.24, 1] }}
            >
              <motion.nav
                aria-label="Menu"
                className="flex flex-col gap-1.5 px-4 pb-5 pt-3"
                initial="ferme"
                animate="ouvert"
                variants={{ ouvert: { transition: { staggerChildren: reduit ? 0 : 0.045, delayChildren: 0.08 } }, ferme: {} }}
              >
                {NAV_MOBILE.map((n) => {
                  const Icon = n.icon;
                  return (
                    <motion.div key={n.to} variants={{ ferme: { opacity: 0, y: reduit ? 0 : 12 }, ouvert: { opacity: 1, y: 0 } }} transition={{ duration: 0.3, ease: [0.22, 0.8, 0.24, 1] }}>
                      <NavLink
                        to={n.to}
                        end={n.to === "/"}
                        className={({ isActive }) =>
                          cn("group flex min-h-[60px] items-center gap-3.5 rounded-[18px] px-3 py-2 transition-colors", isActive ? "bg-brand-surf" : "active:bg-brand-surf")
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className={cn("grid h-10 w-10 flex-none place-items-center rounded-[13px] transition-colors", isActive ? "bg-brand text-white" : "bg-brand-sky text-brand")}>
                              <Icon className="h-[18px] w-[18px]" />
                            </span>
                            <span className="flex min-w-0 flex-1 flex-col leading-tight">
                              <span className="text-[16.5px] font-extrabold text-brand-ink">{n.t}</span>
                              <span className="mt-0.5 truncate text-[13px] font-medium text-brand-mut">{n.d}</span>
                            </span>
                            <ArrowRight className={cn("h-4 w-4 flex-none transition-transform group-hover:translate-x-0.5", isActive ? "text-brand" : "text-[#A9B5C6]")} />
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  );
                })}
                <motion.div variants={{ ferme: { opacity: 0, y: reduit ? 0 : 12 }, ouvert: { opacity: 1, y: 0 } }} className="mt-2 grid grid-cols-2 gap-2">
                  <a href={TEL_HREF} className="inline-flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-brand-surf text-[15px] font-bold text-brand-ink">
                    <Phone className="h-[17px] w-[17px]" /> Appeler
                  </a>
                  <button
                    type="button"
                    onClick={() => { setOpen(false); openEstimation(); }}
                    className="inline-flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-brand-orange text-[15px] font-bold text-brand-ink"
                  >
                    <LineChart className="h-[17px] w-[17px]" /> Estimer
                  </button>
                </motion.div>
                <motion.a
                  variants={{ ferme: { opacity: 0 }, ouvert: { opacity: 1 } }}
                  href={`mailto:${MAIL}`}
                  className="mt-1 inline-flex min-h-[44px] items-center justify-center gap-2 text-[14px] font-semibold text-brand-mut"
                >
                  <Mail className="h-4 w-4 text-brand-orange-text" /> {MAIL}
                </motion.a>
              </motion.nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
