/* Page « Vendre » (refonte 2026) : sans honoraires (ils sont sur la page « Nos honoraires »). */
import type { ReactNode } from "react";
import {
  BarChart3, Camera, Check, ClipboardCheck, Euro, Handshake, Key,
  Megaphone, MessageCircle, Target, UserRound,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import { Confidential } from "@/components/home/HomeSections";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { EstimerCard } from "@/components/site/EstimerCard";
import { Checks, Container, Crumbs, Em, Eyebrow, FRAME_SHADOW, SectionHead, TEL, TEL_HREF, TextLink } from "@/components/site/ui";
import toits from "@/assets/refonte/paris-toits.webp";
import sejour from "@/assets/refonte/clamart-sejour.webp";
import terrasse from "@/assets/refonte/clamart-terrasse.webp";
import cuisine from "@/assets/refonte/clamart-cuisine.webp";

/* ── Haut de page ── */
const SUIVI: { st: "done" | "now" | "todo"; t: string }[] = [
  { st: "done", t: "Estimation remise" },
  { st: "done", t: "Photos et vidéo drone" },
  { st: "done", t: "Annonce en ligne" },
  { st: "now", t: "Visites en cours" },
  { st: "todo", t: "Compromis" },
  { st: "todo", t: "Remise des clés" },
];

const Hero = () => (
  <section className="bg-brand-pale">
    <Container className="flex flex-wrap items-center gap-x-14 gap-y-10 pb-14 pt-6 md:pb-[80px] md:pt-10">
      <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-[22px]">
        <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Vendre" }]} />
        <Eyebrow>Vendre avec Emilio</Eyebrow>
        <h1 className="m-0 font-display text-[clamp(36px,4.2vw,58px)] font-medium leading-[1.07] tracking-[-0.015em] text-brand-ink text-balance">
          Vendre votre bien <Em wrap>en toute sérénité</Em>
        </h1>
        <p className="m-0 max-w-[560px] text-lg leading-relaxed text-brand-txt text-pretty">
          De l’estimation à la remise des clés, un interlocuteur dédié prépare votre vente, la suit de près et vous explique chaque étape.
        </p>
        <div className="pt-1"><EstimerCard /></div>
        <span className="text-[14.5px] text-brand-mut">
          Vous préférez en parler ? <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center font-bold text-brand">{TEL}</a>
        </span>
      </div>
      <div className="min-w-0 flex-[1_1_440px]">
        <div className="relative mx-4 mb-4">
          <span aria-hidden className="absolute -bottom-4 -right-4 h-[64%] w-[58%] rounded-[28px] bg-brand-orange/90" />
          <div className={cn("relative rounded-[24px] bg-white p-3", FRAME_SHADOW)}>
            <div className="relative h-[420px] overflow-hidden rounded-2xl bg-brand-tint md:h-[600px]">
              <img src={toits} alt="Toits de Paris au coucher du soleil" className="absolute inset-0 h-full w-full object-cover" />
              <div className={cn("absolute bottom-4 left-4 right-4 flex max-w-[400px] flex-col gap-2.5 rounded-xl bg-white px-5 py-[18px] md:bottom-5 md:left-5", FRAME_SHADOW)}>
                <span className="text-[15.5px] font-extrabold text-brand-ink">Le suivi de votre vente</span>
                <ol className="m-0 flex list-none flex-col gap-0.5 p-0">
                  {SUIVI.map(({ st, t }) => (
                    <li key={t} className={cn("flex min-h-[32px] items-center gap-3 text-[14.5px]", st === "todo" ? "font-medium text-brand-mut" : st === "now" ? "font-extrabold text-brand-ink" : "font-semibold text-brand-ink")}>
                      {st === "done" && <span className="grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-brand"><Check className="h-[13px] w-[13px] text-white" strokeWidth={3} /></span>}
                      {st === "now" && <span className="grid h-[22px] w-[22px] flex-none place-items-center rounded-full border-2 border-brand-orange bg-[#FCEBD6]"><span className="anim-blink h-2 w-2 rounded-full bg-brand-orange" /></span>}
                      {st === "todo" && <span className="block h-[22px] w-[22px] flex-none rounded-full border-2 border-[#C3CEDB] bg-white" />}
                      {st === "now" ? (
                        <span className="flex flex-col py-1 leading-tight">
                          <span>{t}</span>
                          <span className="text-[12.5px] font-bold text-brand-orange-text">Un compte-rendu après chaque visite</span>
                        </span>
                      ) : (
                        <span>{t}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

/* ── Engagements ── */
const Engagements = () => {
  const data = [
    { icon: <Euro className="h-[23px] w-[23px]" />, t: "Des honoraires transparents", d: "Annoncés dès le départ, sans frais cachés." },
    { icon: <UserRound className="h-[23px] w-[23px]" />, t: "Un interlocuteur dédié", d: "Alexandre ou un membre de l’équipe suit votre vente du début à la fin, joignable 7 j/7." },
    { icon: <MessageCircle className="h-[23px] w-[23px]" />, t: "Des nouvelles régulières", d: "Un compte-rendu après chaque visite et un point chaque semaine." },
    { icon: <Target className="h-[23px] w-[23px]" />, t: "Un plan d’action clair", d: "Vous savez dès le début comment votre bien sera présenté et diffusé." },
  ];
  return (
    <section className="bg-white">
      <Container className="flex flex-col gap-11 py-14 md:py-[96px]">
        <SectionHead center eyebrow="Nos engagements" title={<>Quatre engagements, <Em>dès le départ</Em></>} className="max-w-[760px]" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((e) => (
            <div key={e.t} className={cn("flex flex-col gap-3.5 rounded-[20px] bg-white px-6 py-[26px] transition-transform duration-300 hover:-translate-y-1", FRAME_SHADOW)}>
              <span className="grid h-[50px] w-[50px] place-items-center rounded-xl bg-brand-tint text-brand">{e.icon}</span>
              <span className="font-display text-[22px] leading-tight text-brand-ink">{e.t}</span>
              <span className="text-[15.5px] leading-relaxed text-brand-txt text-pretty">{e.d}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

/* ── Le processus ── */
const Processus = () => {
  const steps: { icon: ReactNode; t: string; items: string[] }[] = [
    { icon: <ClipboardCheck className="h-[22px] w-[22px]" />, t: "Estimation gratuite et personnalisée", items: ["Visite sur place", "Analyse des ventes comparables du quartier", "Rapport d’estimation détaillé"] },
    { icon: <Camera className="h-[22px] w-[22px]" />, t: "Mise en valeur", items: ["Photos HDR", "Visite virtuelle 360°", "Conseils de home staging", "Annonce soignée"] },
    { icon: <BarChart3 className="h-[22px] w-[22px]" />, t: "Stratégie de commercialisation", items: ["Positionnement du prix", "Ciblage des acquéreurs", "Calendrier de mise en vente"] },
    { icon: <Megaphone className="h-[22px] w-[22px]" />, t: "Diffusion multicanal", items: ["Portails immobiliers", "Réseaux sociaux", "Base d’acheteurs privée", "Réseau off-market"] },
    { icon: <Handshake className="h-[22px] w-[22px]" />, t: "Sélection et négociation", items: ["Visites qualifiées", "Vérification du financement", "Négociation", "Rédaction du compromis"] },
    { icon: <Key className="h-[22px] w-[22px]" />, t: "Accompagnement jusqu’aux clés", items: ["Suivi avec le notaire", "Coordination jusqu’à la signature", "Remise des clés"] },
  ];
  return (
    <section id="processus" className="bg-brand-pale">
      <Container className="flex flex-col gap-11 py-14 md:py-[96px]">
        <SectionHead eyebrow="Le processus" title={<>Six étapes, <Em>jusqu’aux clés</Em></>} lead="Chaque étape est expliquée avant d’être lancée. Vous savez toujours où en est votre vente, et ce qui vient ensuite." />
        <ol className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className={cn("flex flex-col gap-4 rounded-[20px] bg-white px-[26px] pb-7 pt-[26px]", FRAME_SHADOW)}>
              <div className="flex items-center justify-between">
                <span className="flex items-baseline gap-2.5">
                  <span className="font-display text-[44px] italic leading-none text-brand-orange-lt">0{i + 1}</span>
                  <span className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-brand-mut">Étape</span>
                </span>
                <span className="grid h-[46px] w-[46px] place-items-center rounded-xl bg-brand-tint text-brand">{s.icon}</span>
              </div>
              <h3 className="m-0 font-display text-2xl font-medium leading-tight text-brand-ink text-balance">{s.t}</h3>
              <div className="h-px bg-brand-line2" />
              <Checks items={s.items} />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};

/* ── Mise en valeur ── */
const MiseEnValeur = () => (
  <section className="bg-white">
    <Container className="flex flex-wrap items-center gap-x-16 gap-y-12 py-14 md:py-[96px]">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
        <SectionHead eyebrow="Mise en valeur" title={<>Votre bien, <Em>sous son meilleur jour</Em></>} lead="Les acheteurs se font une idée en quelques secondes. Nous préparons des images et une annonce qui donnent envie de visiter." />
        <Checks items={["Photos HDR prises par un professionnel", "Visite virtuelle 360°", "Conseils de home staging avant les photos", "Une annonce soignée, relue et complète"]} />
        <span className="inline-flex items-start gap-2 text-sm leading-normal text-brand-mut">
          <Camera className="mt-0.5 h-4 w-4 flex-none" /> Photos d’une maison 5 pièces à Clamart, mise en vente par Emilio.
        </span>
        <div><TextLink to="/biens">Voir nos biens</TextLink></div>
      </div>
      <div className="relative min-w-0 flex-[1.4_1_520px]">
        <span aria-hidden className="absolute -bottom-4 -left-4 hidden h-[62%] w-[56%] rounded-[28px] bg-brand md:block" />
        <div className={cn("relative grid grid-cols-2 gap-2.5 rounded-[24px] bg-white p-3", FRAME_SHADOW)}>
          <img src={sejour} alt="Séjour meublé d’une maison 5 pièces à Clamart" loading="lazy" className="col-span-2 block h-[240px] w-full rounded-2xl object-cover md:h-[360px]" />
          <img src={terrasse} alt="Terrasse meublée sur le toit du séjour" loading="lazy" className="block h-[150px] w-full rounded-2xl object-cover md:h-[220px]" />
          <img src={cuisine} alt="Cuisine neuve avec sol en carreaux de ciment" loading="lazy" className="block h-[150px] w-full rounded-2xl object-cover md:h-[220px]" />
        </div>
      </div>
    </Container>
  </section>
);

/* ── Questions fréquentes ── */
const QUESTIONS = [
  { q: "L’estimation est-elle vraiment gratuite ?", a: "Oui. L’estimation est gratuite et sans engagement : visite sur place, analyse des ventes comparables du quartier et rapport d’estimation détaillé." },
  {
    q: "Quelle différence entre mandat simple et mandat exclusif ?",
    a: "Avec le mandat simple, vous restez libre de confier votre bien à d’autres agences : photos professionnelles, diffusion sur les portails, visites et comptes-rendus, accompagnement jusqu’au notaire. Avec le mandat exclusif, nous sommes seuls à vendre votre bien, et nous ajoutons la vidéo drone, une diffusion premium avec notre réseau off-market, une stratégie dédiée et un point détaillé chaque semaine.",
  },
  { q: "Puis-je vendre sans que mon bien apparaisse en ligne ?", a: "Oui, avec la vente confidentielle : votre bien est présenté uniquement à des acquéreurs vérifiés, sans aucune annonce en ligne." },
  { q: "Comment suis-je tenu au courant ?", a: "Vous avez un interlocuteur dédié, joignable 7 j/7. Vous recevez un compte-rendu après chaque visite, et nous faisons un point chaque semaine." },
  { q: "Jusqu’où m’accompagnez-vous ?", a: "Jusqu’à la remise des clés : vérification du financement des acquéreurs, négociation, rédaction du compromis, suivi avec le notaire et coordination jusqu’à la signature." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.emilio-immo.com/" },
        { "@type": "ListItem", position: 2, name: "Vendre", item: "https://www.emilio-immo.com/vendre" },
      ],
    },
    faqJsonLd(QUESTIONS),
  ],
};

const SellPage = () => (
  <div className="min-h-screen bg-white">
    <SEOHead
      title="Vendre votre bien — Emilio Immobilier | Paris & Hauts-de-Seine"
      description="Vendez votre bien à Paris et dans les Hauts-de-Seine avec Emilio Immobilier : estimation gratuite, mise en valeur, diffusion, négociation et accompagnement jusqu’aux clés."
      canonical="https://www.emilio-immo.com/vendre"
      jsonLd={JSON_LD}
    />
    <Navbar />
    <main>
      <Hero />
      <Engagements />
      <Processus />
      <MiseEnValeur />
      <Confidential />
      <FaqSection title={<>Vos questions, <Em>nos réponses</Em></>} items={QUESTIONS} />
    </main>
    <Footer />
  </div>
);

export default SellPage;
