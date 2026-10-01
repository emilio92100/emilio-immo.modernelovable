/* Page « Nos honoraires » (lien du pied de page) : vente d'un côté, achat de l'autre. */
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

const MandatCard = ({ kind, dark, cta }: { kind: Kind; dark?: boolean; cta: ReactNode }) => {
  const m = MANDATS[kind];
  return (
    <article
      className={cn(
        "flex flex-col gap-5 rounded-[22px] border p-7 md:p-8",
        dark ? "border-brand bg-brand shadow-[0_40px_80px_-40px_rgba(19,36,61,0.75)]" : cn("border-brand-line bg-white", FRAME_SHADOW),
      )}
    >
      <div className="flex min-h-[28px] flex-wrap items-center justify-between gap-3">
        <span className={cn("text-[12.5px] font-bold uppercase tracking-[0.16em]", dark ? "text-brand-orange" : "text-brand-orange-text")}>{m.label}</span>
        {kind === "exclusif" && (
          <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-brand-orange px-3 text-[12.5px] font-extrabold text-brand-ink"><Star className="h-3.5 w-3.5" /> Recommandé</span>
        )}
        {kind === "recherche" && <span className="inline-flex h-7 items-center rounded-full bg-brand-tint px-3 text-[12.5px] font-bold text-brand">Payé seulement si vous achetez</span>}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={cn("m-0 font-display text-[26px] font-medium", dark ? "text-white" : "text-brand-ink")}>{m.name}</h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-2.5">
          <span className={cn("whitespace-nowrap font-display text-[60px] font-medium leading-none", dark ? "text-brand-orange" : "text-brand-ink")}>
            {m.pct}<span className="ml-1 text-[36px]">%</span>
          </span>
          <span className={cn("text-[15px]", dark ? "text-brand-bt" : "text-brand-txt")}>{m.base}</span>
        </div>
      </div>
      <div className={cn("h-px", dark ? "bg-white/15" : "bg-brand-line2")} />
      <Checks items={m.items} dark={dark} />
      <div className="mt-auto pt-1.5">{cta}</div>
    </article>
  );
};

const Bande = ({ icon, eyebrow, title, text, dark }: { icon: ReactNode; eyebrow: string; title: ReactNode; text: string; dark?: boolean }) => (
  <div className="flex flex-wrap items-center gap-5">
    <span className={cn("grid h-[72px] w-[72px] flex-none place-items-center rounded-[22px] shadow-[0_16px_30px_-16px_rgba(19,36,61,0.7)]", dark ? "bg-brand text-white" : "bg-brand-orange text-brand-ink")}>{icon}</span>
    <div className="flex max-w-[760px] flex-col gap-1.5">
      <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">{eyebrow}</span>
      <h2 className="m-0 font-display text-[clamp(32px,3.2vw,46px)] font-medium leading-[1.1] text-brand-ink">{title}</h2>
      <p className="m-0 text-[16.5px] leading-relaxed text-brand-txt text-pretty">{text}</p>
    </div>
  </div>
);

const Choix = ({ icon, eyebrow, title, text, href, dark }: { icon: ReactNode; eyebrow: string; title: string; text: string; href: string; dark?: boolean }) => (
  <a
    href={href}
    className={cn(
      "flex min-w-0 flex-[1_1_340px] items-center gap-[18px] rounded-[22px] px-6 py-[22px] transition-transform duration-300 hover:-translate-y-1",
      dark ? "bg-brand text-white" : "bg-white text-brand-ink",
      FRAME_SHADOW,
    )}
  >
    <span className={cn("grid h-[60px] w-[60px] flex-none place-items-center rounded-[18px]", dark ? "bg-brand-orange text-brand-ink" : "bg-brand-tint text-brand")}>{icon}</span>
    <span className="flex min-w-0 flex-auto flex-col gap-[3px]">
      <span className={cn("text-[12.5px] font-extrabold uppercase tracking-[0.16em]", dark ? "text-brand-orange" : "text-brand-orange-text")}>{eyebrow}</span>
      <span className="font-display text-[26px] leading-tight">{title}</span>
      <span className={cn("text-[14.5px]", dark ? "text-brand-bt" : "text-brand-txt")}>{text}</span>
    </span>
    <ArrowRight className="h-[22px] w-[22px] flex-none text-brand-orange" />
  </a>
);

const Ligne = ({ a, b, top }: { a: string; b: string; top?: boolean }) => (
  <div className={cn("flex justify-between gap-3 text-[15.5px] text-brand-txt", top && "border-t border-brand-line2 pt-2.5")}>
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
        {/* Haut de page : deux choix */}
        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-[22px] pb-14 pt-6 md:pb-[72px] md:pt-10">
            <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Nos honoraires" }]} />
            <Eyebrow>Nos honoraires</Eyebrow>
            <h1 className="m-0 max-w-[900px] font-display text-[clamp(36px,4.2vw,58px)] font-medium leading-[1.08] tracking-[-0.015em] text-brand-ink text-balance">
              Des honoraires clairs, <Em wrap>annoncés dès le départ</Em>
            </h1>
            <p className="m-0 max-w-[640px] text-lg leading-relaxed text-brand-txt text-pretty">
              Pas de frais cachés : vous savez tout de suite ce que vous paierez, et pour quel service. Nos honoraires sont exprimés TTC.
            </p>
            <div className="flex flex-wrap gap-[18px] pt-2.5">
              <Choix icon={<Home className="h-7 w-7" />} eyebrow="Vous vendez" title="Vendre votre bien" text="Mandat simple ou mandat exclusif" href="#vente" />
              <Choix dark icon={<Search className="h-7 w-7" />} eyebrow="Vous achetez" title="Trouver votre bien" text="Mandat de recherche, avec un chasseur" href="#achat" />
            </div>
          </Container>
        </section>

        {/* Vente */}
        <section id="vente" className="bg-white">
          <Container className="flex flex-col gap-9 py-14 md:pb-[88px] md:pt-[96px]">
            <Bande
              icon={<Home className="h-[34px] w-[34px]" />}
              eyebrow="Vous vendez"
              title={<>Honoraires de <Em>vente</Em></>}
              text="Deux mandats au choix. Le mandat simple vous laisse libre de confier votre bien à d’autres agences. Avec le mandat exclusif, nous sommes seuls à le vendre, et nous en faisons plus."
            />
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
              <MandatCard
                kind="simple"
                cta={<Btn full variant="outline" onClick={() => openContact({ objet: "Vendre", message: "Je souhaite des informations sur le mandat simple." })}>Choisir le mandat simple</Btn>}
              />
              <MandatCard kind="exclusif" dark cta={<Btn full onClick={() => openEstimation()}>Demander une estimation</Btn>} />
            </div>
          </Container>
        </section>

        {/* Achat */}
        <section id="achat" className="bg-brand-pale">
          <Container className="flex flex-col gap-9 py-14 md:py-[96px]">
            <Bande
              dark
              icon={<Search className="h-[34px] w-[34px]" />}
              eyebrow="Vous achetez"
              title={<>Honoraires de <Em>recherche</Em></>}
              text="Un chasseur qui cherche pour vous, et qui reste de votre côté : biens hors marché, réseau de confrères, étude du dossier et négociation."
            />
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
              <MandatCard kind="recherche" cta={<Btn full variant="outline" to="/acheter#recherche">Confier ma recherche</Btn>} />
              <div className={cn("flex flex-col gap-[18px] rounded-[22px] bg-white p-7 md:p-[30px]", FRAME_SHADOW)}>
                <span className="grid h-[50px] w-[50px] place-items-center rounded-[14px] bg-brand text-white"><Euro className="h-[22px] w-[22px]" /></span>
                <h3 className="m-0 font-display text-[26px] font-medium leading-tight text-brand-ink">Payé seulement si vous achetez</h3>
                <p className="m-0 text-base leading-relaxed text-brand-txt">
                  Si la recherche n’aboutit pas, vous ne nous devez rien. Et votre budget s’entend <strong className="text-brand-ink">honoraires compris</strong> : ils ne viennent pas s’ajouter à ce que vous avez prévu.
                </p>
                <div className="flex flex-col gap-2.5 rounded-2xl border border-brand-line bg-brand-pale px-5 py-[18px]">
                  <span className="text-[12.5px] font-extrabold uppercase tracking-[0.14em] text-brand-orange-text">Un calcul simple</span>
                  <Ligne a="Votre budget total" b="800 000 €" />
                  <Ligne a="Prix du bien, jusqu’à" b="environ 780 500 €" />
                  <Ligne top a="Nos honoraires (2,5 %)" b="environ 19 500 €" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Estimation + mentions */}
        <section className="bg-white">
          <Container className="flex flex-col gap-7 pb-16 pt-14 md:pb-16 md:pt-[88px]">
            <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-7 rounded-[24px] bg-brand p-[clamp(26px,3.6vw,48px)]">
              <div className="flex max-w-[640px] flex-col gap-3">
                <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange">Estimation</span>
                <h2 className="m-0 font-display text-[clamp(28px,2.8vw,40px)] font-medium leading-tight text-white">
                  Gratuite et <Em dark>sans engagement</Em>
                </h2>
                <p className="m-0 text-[16.5px] leading-relaxed text-brand-bt">Visite sur place, analyse des ventes comparables du quartier et rapport d’estimation détaillé.</p>
              </div>
              <Btn onClick={() => openEstimation()} iconLeft={<LineChart className="h-[18px] w-[18px]" />} icon={<ArrowRight className="h-[18px] w-[18px]" />}>Estimer mon bien</Btn>
            </div>
            <p className="m-0 max-w-[860px] text-[13.5px] leading-relaxed text-brand-mut">
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
