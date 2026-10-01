/* Page « Nos honoraires » (lien du pied de page) : les trois mandats côte à côte, puis l’achat et l’estimation.
   Mise en page resserrée, dans l’esprit de « Notre histoire ». */
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Euro, Home, LineChart, Search, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { Btn, Checks, Container, Crumbs, Em, Eyebrow, FRAME_SHADOW } from "@/components/site/ui";

type Kind = "simple" | "exclusif" | "recherche";

const MANDATS: Record<Kind, { label: string; name: string; pct: string; base: string; items: string[] }> = {
  simple: {
    label: "Vente",
    name: "Mandat simple",
    pct: "5",
    base: "TTC du prix de vente",
    items: ["Estimation offerte", "Photos professionnelles", "Diffusion sur les portails", "Visites et comptes-rendus", "Accompagnement jusqu’au notaire"],
  },
  exclusif: {
    label: "Vente",
    name: "Mandat exclusif",
    pct: "4",
    base: "TTC du prix de vente",
    items: ["Estimation offerte", "Photos et vidéo drone", "Diffusion premium et réseau off-market", "Une stratégie dédiée à votre bien", "Un point détaillé chaque semaine"],
  },
  recherche: {
    label: "Achat",
    name: "Mandat de recherche",
    pct: "2,5",
    base: "TTC du prix d’acquisition",
    items: ["Biens hors marché et réseau de confrères", "Visites présélectionnées pour vous", "Étude du dossier et de la copropriété", "Négociation à vos côtés", "Votre espace client pour suivre la recherche"],
  },
};

const MandatCard = ({ kind, dark, cta, id }: { kind: Kind; dark?: boolean; cta: ReactNode; id?: string }) => {
  const m = MANDATS[kind];
  return (
    <article
      id={id}
      className={cn(
        "flex flex-col gap-4 rounded-[22px] border p-6 md:p-7",
        dark ? "border-brand bg-brand shadow-[0_40px_80px_-40px_rgba(19,36,61,0.75)]" : cn("border-brand-line bg-white", FRAME_SHADOW),
      )}
    >
      <div className="flex min-h-[28px] flex-wrap items-center justify-between gap-2">
        <span className={cn("inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]", dark ? "text-brand-orange" : "text-brand-orange-text")}>
          {kind === "recherche" ? <Search className="h-3.5 w-3.5" /> : <Home className="h-3.5 w-3.5" />}
          {m.label}
        </span>
        {kind === "exclusif" && (
          <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-brand-orange px-3 text-[12px] font-extrabold text-brand-ink"><Star className="h-3.5 w-3.5" /> Recommandé</span>
        )}
        {kind === "recherche" && <span className="inline-flex h-7 items-center rounded-full bg-brand-tint px-3 text-[12px] font-bold text-brand">Payé seulement si vous achetez</span>}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={cn("m-0 font-display text-[22px] font-medium", dark ? "text-white" : "text-brand-ink")}>{m.name}</h3>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
          <span className={cn("whitespace-nowrap font-display text-[44px] font-medium leading-none", dark ? "text-brand-orange" : "text-brand-ink")}>
            {m.pct}<span className="ml-0.5 text-[26px]">%</span>
          </span>
          <span className={cn("text-[14px]", dark ? "text-brand-bt" : "text-brand-txt")}>{m.base}</span>
        </div>
      </div>
      <div className={cn("h-px", dark ? "bg-white/15" : "bg-brand-line2")} />
      <Checks items={m.items} dark={dark} className="gap-2 [&_li]:text-[15px]" />
      <div className="mt-auto pt-1">{cta}</div>
    </article>
  );
};

const Raccourci = ({ icon, eyebrow, title, text, href, dark }: { icon: ReactNode; eyebrow: string; title: string; text: string; href: string; dark?: boolean }) => (
  <a
    href={href}
    className={cn(
      "flex min-w-0 flex-[1_1_300px] items-center gap-4 rounded-[18px] px-5 py-4 transition-transform duration-300 hover:-translate-y-0.5",
      dark ? "bg-brand text-white" : "bg-white text-brand-ink",
      FRAME_SHADOW,
    )}
  >
    <span className={cn("grid h-12 w-12 flex-none place-items-center rounded-[14px]", dark ? "bg-brand-orange text-brand-ink" : "bg-brand-tint text-brand")}>{icon}</span>
    <span className="flex min-w-0 flex-auto flex-col gap-0.5">
      <span className={cn("text-[11.5px] font-extrabold uppercase tracking-[0.16em]", dark ? "text-brand-orange" : "text-brand-orange-text")}>{eyebrow}</span>
      <span className="font-display text-[20px] leading-tight">{title}</span>
      <span className={cn("text-[13.5px]", dark ? "text-brand-bt" : "text-brand-txt")}>{text}</span>
    </span>
    <ArrowRight className="h-5 w-5 flex-none text-brand-orange" />
  </a>
);

const Ligne = ({ a, b, top }: { a: string; b: string; top?: boolean }) => (
  <div className={cn("flex justify-between gap-3 text-[15px] text-brand-txt", top && "border-t border-brand-line2 pt-2.5")}>
    <span>{a}</span>
    <strong className="whitespace-nowrap text-brand-ink">{b}</strong>
  </div>
);

const Honoraires = () => {
  const { openContact, openEstimation } = useSiteModals();
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Nos honoraires — Emilio Immobilier | Paris & Hauts-de-Seine"
        description="Les honoraires d’Emilio Immobilier : mandat simple 5 % TTC, mandat exclusif 4 % TTC, mandat de recherche 2,5 % TTC, payé seulement si vous achetez."
        canonical="https://www.emilio-immo.com/honoraires"
      />
      <Navbar />
      <main>
        {/* Haut de page */}
        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-[18px] pb-10 pt-5 md:pb-14 md:pt-8">
            <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Nos honoraires" }]} />
            <Eyebrow>Nos honoraires</Eyebrow>
            <h1 className="m-0 max-w-[820px] font-display text-[clamp(30px,3.4vw,46px)] font-medium leading-[1.1] tracking-[-0.015em] text-brand-ink text-balance">
              Des honoraires clairs, <Em wrap>annoncés dès le départ</Em>
            </h1>
            <p className="m-0 max-w-[620px] text-[15.5px] leading-relaxed text-brand-txt text-pretty md:text-base">
              Pas de frais cachés : vous savez tout de suite ce que vous paierez, et pour quel service. Nos honoraires sont exprimés TTC.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-1.5">
              <Raccourci icon={<Home className="h-6 w-6" />} eyebrow="Vous vendez" title="Vendre votre bien" text="Mandat simple ou mandat exclusif" href="#vente" />
              <Raccourci dark icon={<Search className="h-6 w-6" />} eyebrow="Vous achetez" title="Trouver votre bien" text="Mandat de recherche, avec un chasseur" href="#achat" />
            </div>
          </Container>
        </section>

        {/* Les trois mandats, côte à côte */}
        <section id="vente" className="bg-white">
          <Container className="flex flex-col gap-7 py-10 md:gap-8 md:py-16">
            <div className="flex max-w-[760px] flex-col gap-3">
              <Eyebrow>Nos mandats</Eyebrow>
              <h2 className="m-0 font-display text-[clamp(26px,2.4vw,34px)] font-medium leading-[1.15] text-brand-ink">
                Trois mandats, <Em>des taux simples</Em>
              </h2>
              <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt text-pretty">
                Pour vendre, deux mandats au choix : le mandat simple vous laisse libre de confier votre bien à d’autres agences ; avec le mandat exclusif, nous sommes seuls à le vendre, et nous en faisons plus. Pour acheter, un chasseur qui reste de votre côté.
              </p>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
              <MandatCard
                kind="simple"
                cta={<Btn full variant="outline" onClick={() => openContact({ objet: "Vendre", message: "Je souhaite des informations sur le mandat simple." })}>Choisir le mandat simple</Btn>}
              />
              <MandatCard kind="exclusif" dark cta={<Btn full onClick={() => openEstimation()}>Demander une estimation</Btn>} />
              <MandatCard id="achat" kind="recherche" cta={<Btn full variant="outline" to="/acheter#recherche">Confier ma recherche</Btn>} />
            </div>
          </Container>
        </section>

        {/* Achat : payé seulement si vous achetez · Estimation */}
        <section className="bg-brand-pale">
          <Container className="grid grid-cols-1 items-stretch gap-5 py-10 md:grid-cols-2 md:py-16">
            <div className={cn("flex flex-col gap-4 rounded-[22px] bg-white p-6 md:p-7", FRAME_SHADOW)}>
              <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-brand text-white"><Euro className="h-5 w-5" /></span>
              <h3 className="m-0 font-display text-[22px] font-medium leading-tight text-brand-ink">Payé seulement si vous achetez</h3>
              <p className="m-0 text-[15px] leading-relaxed text-brand-txt">
                Si la recherche n’aboutit pas, vous ne nous devez rien. Et votre budget s’entend <strong className="text-brand-ink">honoraires compris</strong> : ils ne viennent pas s’ajouter à ce que vous avez prévu.
              </p>
              <div className="flex flex-col gap-2.5 rounded-2xl border border-brand-line bg-brand-pale px-5 py-4">
                <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-brand-orange-text">Un calcul simple</span>
                <Ligne a="Votre budget total" b="800 000 €" />
                <Ligne a="Prix du bien, jusqu’à" b="environ 780 500 €" />
                <Ligne top a="Nos honoraires (2,5 %)" b="environ 19 500 €" />
              </div>
            </div>
            <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-[22px] bg-brand p-6 md:p-8">
              <span aria-hidden className="absolute -bottom-24 -right-16 h-60 w-60 rounded-full border-[40px] border-white/5" />
              <div className="relative flex flex-col gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-brand-orange text-brand-ink"><LineChart className="h-5 w-5" /></span>
                <span className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-brand-orange">Estimation</span>
                <h2 className="m-0 font-display text-[clamp(24px,2.2vw,30px)] font-medium leading-tight text-white">
                  Gratuite et <Em dark>sans engagement</Em>
                </h2>
                <p className="m-0 text-[15px] leading-relaxed text-brand-bt">Visite sur place, analyse des ventes comparables du quartier et rapport d’estimation détaillé.</p>
              </div>
              <div className="relative">
                <Btn onClick={() => openEstimation()} iconLeft={<LineChart className="h-[18px] w-[18px]" />} icon={<ArrowRight className="h-[18px] w-[18px]" />}>Estimer mon bien</Btn>
              </div>
            </div>
            <p className="m-0 max-w-[860px] text-[13px] leading-relaxed text-brand-mut md:col-span-2">
              Honoraires exprimés TTC, au taux de TVA en vigueur. Emilio Immobilier · RT Conseils SAS · Carte professionnelle CPI 9201 2020 000 045 344.{" "}
              <Link to="/mentions-legales" className="font-semibold text-brand underline-offset-2 hover:underline">Mentions légales</Link>
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Honoraires;
