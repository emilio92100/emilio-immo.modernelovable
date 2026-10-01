/* Page « Notre histoire » (refonte 2026). Pas encore de photos d'équipe : pas de section équipe. */
import { LineChart, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { Btn, Container, Crumbs, Em, Eyebrow, Filet, FRAME_SHADOW, SectionHead } from "@/components/site/ui";
import alexandre from "@/assets/refonte/alexandre-detoure.webp";
import seine from "@/assets/refonte/paris-seine.webp";

const Ctas = ({ estimate = "blue" }: { estimate?: "blue" | "orange" }) => {
  const { openEstimation, openContact } = useSiteModals();
  return (
    <div className="flex flex-wrap gap-3 pt-1">
      <Btn variant={estimate} onClick={() => openEstimation()} iconLeft={<LineChart className="h-[18px] w-[18px]" />}>Estimer mon bien</Btn>
      <Btn variant="outline" onClick={() => openContact()} iconLeft={<Mail className="h-[18px] w-[18px]" />}>Nous écrire</Btn>
    </div>
  );
};

/* ── Haut de page : portrait, titre, citation ── */
const Hero = () => (
  <section className="bg-white">
    <Container className="flex flex-wrap items-center gap-x-14 gap-y-8 pb-10 pt-5 md:pb-16 md:pt-8">
      <div className="flex min-w-0 flex-[1_1_540px] flex-col gap-[18px]">
        <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Notre histoire" }]} />
        <Eyebrow>Notre histoire</Eyebrow>
        <h1 className="m-0 font-display text-[clamp(32px,3.6vw,50px)] font-medium leading-[1.08] tracking-[-0.015em] text-brand-ink text-balance">
          Une agence née d’une <Em>idée simple</Em>
        </h1>
        <figure className="m-0 flex flex-col gap-3">
          <blockquote className="m-0 font-display text-[clamp(19px,1.7vw,24px)] font-normal italic leading-[1.4] text-brand-ink text-balance">
            <span aria-hidden className="mr-1 text-[1.3em] leading-[0] text-brand-orange">“</span>
            Offrir à mes clients le service que j’aurais aimé recevoir moi-même.
            <span aria-hidden className="ml-0.5 text-[1.3em] leading-[0] text-brand-orange">”</span>
          </blockquote>
          <figcaption className="flex items-center gap-3">
            <Filet />
            <span className="text-[15px] font-bold text-brand-ink">Alexandre, fondateur et directeur</span>
          </figcaption>
        </figure>
        <p className="m-0 max-w-[560px] text-[15.5px] leading-relaxed text-brand-txt text-pretty md:text-base">
          Emilio a été créée en septembre 2020 à Boulogne-Billancourt par Alexandre, après plusieurs années passées dans différentes agences, des réseaux généralistes à l’immobilier de prestige.
        </p>
        <p className="m-0 max-w-[560px] text-[15.5px] leading-relaxed text-brand-txt text-pretty md:text-base">
          Aujourd’hui, il dirige une petite équipe de cinq collaborateurs. Chaque client est suivi personnellement, par quelqu’un qui connaît son dossier et qui répond quand on l’appelle.
        </p>
        <Ctas />
      </div>
      <div className="mx-auto w-full min-w-0 max-w-[440px] flex-[1_1_360px]">
        <div className="relative mx-4 mb-4">
          <span aria-hidden className="absolute -bottom-4 -right-4 h-[58%] w-[64%] rounded-[28px] bg-brand-orange" />
          <div className={cn("relative rounded-[26px] bg-white p-3", FRAME_SHADOW)}>
            <div className="relative h-[300px] overflow-hidden rounded-[18px] md:h-[400px]" style={{ background: "linear-gradient(180deg, #EAF0F7 0%, #DCE6F2 100%)" }}>
              <span aria-hidden className="absolute left-1/2 top-[34px] block aspect-square w-[72%] max-w-[300px] -translate-x-1/2 rounded-full border-[1.5px] border-brand-orange opacity-60" />
              <img src={alexandre} alt="Alexandre, fondateur et directeur d’Emilio Immobilier" className="absolute bottom-0 left-1/2 block h-[94%] w-auto max-w-none -translate-x-1/2" />
              <div className={cn("absolute bottom-4 left-4 flex flex-col rounded-xl bg-white px-3.5 py-2.5", FRAME_SHADOW)}>
                <span className="text-[15px] font-extrabold text-brand-ink">Alexandre</span>
                <span className="text-[13px] text-brand-mut">Fondateur et directeur</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

/* ── L'agence en bref (remontée) : une équipe, pas une personne seule ── */
const EnBref = () => {
  const stats = [
    ["6", "personnes dans l’équipe", "Alexandre et cinq collaborateurs"],
    ["Depuis 2020", "agence indépendante", "née à Boulogne-Billancourt"],
    ["200+", "clients accompagnés", "vendeurs et acheteurs"],
    ["10+ ans", "de métier", "sur le terrain"],
  ];
  return (
    <section className="bg-brand">
      <Container className="flex flex-col gap-7 py-10 md:py-14">
        <h2 className="m-0 font-display text-[clamp(24px,2.2vw,32px)] font-medium leading-[1.15] text-white">
          Une petite équipe,
          <br />
          <Em dark>un vrai suivi</Em>
        </h2>
        <div className="grid grid-cols-2 gap-x-0 gap-y-6 lg:grid-cols-4">
          {stats.map(([a, b, c], i) => (
            <div key={a} className={cn("flex flex-col gap-1.5 py-1 pr-4", i % 2 === 1 && "border-l border-white/15 pl-5 lg:pl-8", i === 2 && "lg:border-l lg:border-white/15 lg:pl-8")}>
              <span className="font-display text-[28px] leading-none text-brand-orange md:text-[34px]">{a}</span>
              <span className="text-[15.5px] font-bold text-white">{b}</span>
              <span className="text-[13.5px] text-brand-bt">{c}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

/* ── Le parcours ── */
const Parcours = () => {
  const tl = [
    ["Septembre 2020", "La création", "Alexandre crée Emilio à Boulogne-Billancourt : une agence indépendante, avec un suivi personnel pour chaque client."],
    ["2021", "Les villes voisines", "Le bouche-à-oreille fait le reste : Neuilly-sur-Seine, Saint-Cloud, Garches et Issy-les-Moulineaux."],
    ["2023", "L’arrivée à Paris", "Les 6e, 7e, 15e et 16e arrondissements, où l’agence est aujourd’hui bien installée."],
    ["Aujourd’hui", "Une équipe de six", "Paris 6e, 7e, 15e, 16e, 17e et les Hauts-de-Seine. Plus de 200 clients accompagnés."],
  ];
  return (
    <section className="bg-white">
      <Container className="flex flex-col gap-9 py-10 md:py-16">
        <SectionHead eyebrow="Notre parcours" title={<>De l’expérience <Em>à l’indépendance</Em></>} />
        <ol className="relative m-0 grid list-none grid-cols-1 gap-x-9 gap-y-7 p-0 sm:grid-cols-2 lg:grid-cols-4">
          <span aria-hidden className="absolute left-[9px] right-0 top-2 hidden h-[2px] lg:block" style={{ background: "linear-gradient(90deg, #E68B23 0%, rgba(230,139,35,0.25) 100%)" }} />
          {tl.map(([y, t, d], i) => (
            <li key={y} className="relative flex flex-col gap-2 pt-[30px]">
              <span aria-hidden className={cn("absolute left-0 top-0 block h-[18px] w-[18px] rounded-full shadow-[0_0_0_2px_#E68B23]", i === tl.length - 1 ? "bg-brand-orange" : "bg-white")} />
              <span className="font-display text-[23px] leading-tight text-brand-ink md:text-[25px]">{y}</span>
              <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">{t}</span>
              <span className="max-w-[340px] text-[15px] leading-relaxed text-brand-txt text-pretty">{d}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};

/* ── Ce qui nous guide ── */
const Principes = () => {
  const vals = [
    ["Indépendante", "Pas de réseau ni de franchise : nos conseils ne dépendent que de votre intérêt."],
    ["Un suivi personnel", "Un interlocuteur dédié, du premier rendez-vous à la signature, joignable 7 j/7."],
    ["Transparente", "Des honoraires annoncés dès le départ, un compte-rendu après chaque visite."],
  ];
  return (
    <section className="bg-brand-pale">
      <Container className="flex flex-col gap-8 py-10 md:py-16">
        <SectionHead eyebrow="Ce qui nous guide" title={<>Trois principes, <Em>tous les jours</Em></>} />
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3">
          {vals.map(([t, d], i) => (
            <div key={t} className={cn("flex flex-col gap-2.5 py-1 md:pr-8", i > 0 && "border-t border-brand-line pt-6 md:border-l md:border-t-0 md:pl-9 md:pt-2")}>
              <span className="font-display text-lg italic text-brand-orange-lt">0{i + 1}</span>
              <span className="font-display text-[23px] leading-tight text-brand-ink md:text-[25px]">{t}</span>
              <span className="text-[15px] leading-relaxed text-brand-txt text-pretty">{d}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

/* ── Notre terrain ── */
const Terrain = () => (
  <section className="bg-white">
    <Container className="grid grid-cols-1 items-center gap-x-14 gap-y-8 py-10 md:grid-cols-2 md:py-16">
      <div className="relative mx-4 mb-4">
        <span aria-hidden className="absolute -bottom-4 -left-4 h-[60%] w-[60%] rounded-[28px] bg-brand" />
        <div className={cn("relative rounded-[24px] bg-white p-3", FRAME_SHADOW)}>
          <img src={seine} alt="La Seine et ses ponts vus du ciel" loading="lazy" className="block h-[220px] w-full rounded-2xl object-cover md:h-[320px]" />
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-[22px]">
        <SectionHead eyebrow="Notre terrain" title={<>Paris Ouest et <Em>Hauts-de-Seine</Em></>} lead="Un périmètre resserré, que l’on connaît rue par rue : les prix, les copropriétés, les écoles et les transports de chaque quartier." />
        <Ctas estimate="orange" />
      </div>
    </Container>
  </section>
);

const Director = () => (
  <div className="min-h-screen bg-white">
    <SEOHead
      title="Notre histoire — Emilio Immobilier | Alexandre et son équipe"
      description="Emilio Immobilier, agence indépendante créée en 2020 à Boulogne-Billancourt par Alexandre. Une petite équipe, un vrai suivi, à Paris et dans les Hauts-de-Seine."
      canonical="https://www.emilio-immo.com/notre-histoire"
    />
    <Navbar />
    <main>
      <Hero />
      <EnBref />
      <Parcours />
      <Principes />
      <Terrain />
    </main>
    <Footer />
  </div>
);

export default Director;
