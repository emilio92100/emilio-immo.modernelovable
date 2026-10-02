/* Page « Estimation » (refonte 2026). Le formulaire est la fenêtre d'estimation commune (CRM + DVF). */
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, Database, FileText, LineChart, Lock, MapPin, Phone, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { SITE_URL } from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import { cityList } from "@/lib/cities";
import { useSiteModals } from "@/components/site/SiteModals";
import { Btn, Checks, Container, Crumbs, Em, Eyebrow, FRAME_SHADOW, SectionHead, TEL, TEL_HREF } from "@/components/site/ui";
import { EstimerCard } from "@/components/site/EstimerCard";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { eurM2 } from "@/components/site/CityParts";

const URL = `${SITE_URL}/estimation`;

const FAQS = [
  {
    q: "L’estimation est-elle vraiment gratuite et sans engagement ?",
    a: "Oui. L’estimation en ligne est gratuite et sans engagement : vous voyez une première fourchette tout de suite, puis un membre de l’équipe vous rappelle sous 24 h pour l’affiner. Si vous le souhaitez, nous venons voir le bien et vous remettons un avis de valeur écrit, sans frais ni obligation de mandat.",
  },
  {
    q: "Comment calculez-vous la valeur de mon appartement ?",
    a: "À partir de trois sources : la base DVF (Demandes de valeurs foncières) publiée par l’État, qui recense les ventes enregistrées chez les notaires ; les biens comparables actuellement en vente ; et notre connaissance du terrain : étage, exposition, vue, état de la copropriété, DPE.",
  },
  {
    q: "Combien de temps prend l’estimation ?",
    a: "Deux minutes pour remplir le formulaire et voir une première fourchette. Un membre de l’équipe vous rappelle ensuite sous 24 h. Pour un avis de valeur écrit après visite, comptez 24 à 48 h après notre passage.",
  },
  {
    q: "Mes données sont-elles confidentielles ?",
    a: "Oui. Vos coordonnées et l’adresse de votre bien ne sont jamais revendues ni transmises à d’autres agences. Elles servent uniquement à vous répondre et à suivre votre demande.",
  },
  {
    q: "Sur quels secteurs intervenez-vous ?",
    a: "À Paris dans les 6e, 7e, 15e, 16e et 17e arrondissements, et dans les Hauts-de-Seine : Boulogne-Billancourt, Neuilly-sur-Seine, Issy-les-Moulineaux, Levallois-Perret, Saint-Cloud, Garches, Clamart et d’autres communes du 92. Pour une autre commune, contactez-nous.",
  },
  {
    q: "Quelle différence entre l’estimation en ligne et l’avis de valeur ?",
    a: "L’estimation en ligne donne une fourchette indicative, à partir des ventes du secteur. L’avis de valeur tient compte de la visite du bien (étage, vue, travaux, prestations de l’immeuble) : c’est un document écrit et argumenté, utile pour une mise en vente, une succession ou un partage.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Estimation immobilière gratuite",
      serviceType: "Estimation immobilière",
      provider: { "@type": "RealEstateAgent", name: "Emilio Immobilier", url: SITE_URL, telephone: "+33184801400" },
      areaServed: ["Paris 6e", "Paris 7e", "Paris 15e", "Paris 16e", "Paris 17e", "Boulogne-Billancourt", "Neuilly-sur-Seine", "Issy-les-Moulineaux", "Levallois-Perret", "Hauts-de-Seine"].map((name) => ({ "@type": "Place", name })),
      description: "Estimation gratuite de votre appartement ou de votre maison à Paris et dans les Hauts-de-Seine, à partir des ventes DVF et de la connaissance du terrain.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      url: URL,
    },
    faqJsonLd(FAQS),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Estimation", item: URL },
      ],
    },
  ],
};

const EstimationPage = () => {
  const { openEstimation } = useSiteModals();
  const etapes = [
    { t: "Votre bien en 2 minutes", d: "L’adresse, le type de bien, la surface et votre projet." },
    { t: "Une première fourchette", d: "Calculée tout de suite à partir des ventes récentes du secteur." },
    { t: "L’avis d’un membre de l’équipe", d: "Il vous rappelle sous 24 h, et peut venir voir le bien si vous le souhaitez." },
  ];
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Estimation immobilière gratuite à Paris et dans les Hauts-de-Seine | Emilio"
        description="Estimez gratuitement votre appartement ou votre maison à Paris 6e, 7e, 15e, 16e, 17e, Boulogne, Neuilly, Issy, Levallois : première fourchette immédiate, puis l’avis d’un membre de l’équipe sous 24 h."
        canonical={URL}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <section className="bg-brand-pale">
          <Container className="flex flex-wrap items-center gap-x-14 gap-y-10 pb-14 pt-6 md:pb-[80px] md:pt-10">
            <div className="flex min-w-0 flex-[1_1_540px] flex-col gap-[22px]">
              <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Estimation" }]} />
              <Eyebrow>Gratuit · sans engagement</Eyebrow>
              <h1 className="m-0 font-display text-[29px] sm:text-[clamp(34px,4.2vw,58px)] font-extrabold leading-[1.07] tracking-[-0.03em] text-brand-ink text-balance">
                Estimation immobilière gratuite, <Em wrap>à Paris et dans les Hauts-de-Seine</Em>
              </h1>
              <p className="m-0 max-w-[580px] text-base leading-relaxed text-brand-txt text-pretty sm:text-lg">
                Une première fourchette tout de suite, à partir des ventes notariées du secteur. Puis l’avis d’un membre de l’équipe, qui connaît votre quartier.
              </p>
              <div className="pt-1"><EstimerCard /></div>
              <span className="text-[14.5px] text-brand-mut">
                Vous préférez en parler ? <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center font-bold text-brand">{TEL}</a>
              </span>
            </div>
            <div className="min-w-0 flex-[1_1_420px]">
              <div className="relative mx-4 mb-4">
                <span aria-hidden className="absolute -bottom-4 -right-4 h-[62%] w-[60%] rounded-[28px] bg-brand" />
                <ol className={cn("relative m-0 flex list-none flex-col gap-5 rounded-[24px] bg-white p-6 md:p-8", FRAME_SHADOW)}>
                  <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">Comment ça marche</span>
                  {etapes.map((e, i) => (
                    <li key={e.t} className="flex gap-4">
                      <span className={cn("grid h-11 w-11 flex-none place-items-center rounded-full font-display text-[20px] font-extrabold tracking-[-0.025em]", i === 0 ? "bg-brand-orange text-brand-ink" : "bg-brand-tint text-brand")}>{i + 1}</span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-[16.5px] font-bold text-brand-ink">{e.t}</span>
                        <span className="text-[15px] leading-relaxed text-brand-txt">{e.d}</span>
                      </span>
                    </li>
                  ))}
                  <Btn onClick={() => openEstimation()} full iconLeft={<LineChart className="h-[18px] w-[18px]" />}>Commencer mon estimation</Btn>
                </ol>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead center eyebrow="Notre méthode" title={<>Une estimation <Em>fiable</Em>, pas un chiffre au hasard</>} lead="Trois sources pour un prix réaliste, que vous pourrez défendre face aux acheteurs." className="max-w-[780px]" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                { icon: Database, t: "Les ventes DVF", d: "La base publiée par l’État, qui recense les ventes enregistrées chez les notaires dans votre secteur ces dernières années." },
                { icon: MapPin, t: "Le terrain", d: "Étage, exposition, vue, état de la copropriété, DPE : ce que les algorithmes ne voient pas, et que nous connaissons rue par rue." },
                { icon: FileText, t: "Un avis de valeur écrit", d: "Au-delà du chiffre, un document argumenté, comparables à l’appui, que vous pouvez garder pour la suite de votre projet." },
              ].map((m) => (
                <article key={m.t} className={cn("flex flex-col gap-3 rounded-[22px] bg-white p-7", FRAME_SHADOW)}>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white"><m.icon className="h-[22px] w-[22px]" /></span>
                  <h3 className="m-0 font-display text-[20px] sm:text-[24px] font-extrabold text-brand-ink tracking-[-0.025em]">{m.t}</h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt text-pretty">{m.d}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead eyebrow="Prix au m²" title={<>Combien vaut un appartement <Em>dans votre ville</Em>{"\u00a0"}?</>} lead="Les prix moyens sur nos secteurs. Ouvrez votre ville pour le détail par quartier." />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cityList.map((c) => (
                <Link key={c.slug} to={`/vendre-appartement-${c.slug}`} className={cn("group flex flex-col gap-2 rounded-[20px] bg-white p-5 transition-transform duration-300 hover:-translate-y-1", FRAME_SHADOW)}>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-mut"><MapPin className="h-3.5 w-3.5 text-brand-orange-text" /> {c.postalCodes.join(" · ")}</span>
                  <span className="font-display text-[20px] sm:text-[24px] leading-tight text-brand-ink font-extrabold tracking-[-0.025em]">{c.name}</span>
                  <span className="text-[15px] text-brand-txt">≈ <strong className="text-brand-ink">{eurM2(c.pricePerSqm.mid)}</strong></span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-[14.5px] font-bold text-brand">Vendre {c.name.startsWith("Paris") ? "dans le " + c.name.replace("Paris ", "") : "à " + c.name} <ArrowRight className="h-4 w-4 text-brand-orange transition-transform group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="grid grid-cols-1 items-center gap-x-16 gap-y-10 py-14 md:grid-cols-2 md:py-[96px]">
            <div className="flex flex-col gap-6">
              <SectionHead eyebrow="Pourquoi nous" title={<>Une estimation que vous pouvez <Em>défendre</Em></>} lead="Surévaluer un bien, c’est le laisser sans visites. Le sous-évaluer, c’est offrir des milliers d’euros à l’acheteur. Notre seul objectif : le juste prix du marché." />
              <Checks items={["Une méthode transparente : les ventes comparables vous sont communiquées", "Un avis de valeur écrit, si vous le souhaitez", "Une valeur mise à jour quand le marché bouge", "La sincérité plutôt qu’un prix gonflé pour vous séduire"]} />
              <div className="flex flex-wrap gap-3 pt-1">
                <Btn onClick={() => openEstimation()} iconLeft={<LineChart className="h-[18px] w-[18px]" />}>Estimer mon bien</Btn>
                <Btn variant="outline" href={TEL_HREF} iconLeft={<Phone className="h-[18px] w-[18px]" />}>{TEL}</Btn>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-[24px] bg-brand p-7 text-brand-bt md:p-9">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-orange text-brand-ink"><Lock className="h-[22px] w-[22px]" /></span>
              <h2 className="m-0 font-display text-[19.5px] sm:text-[23px] sm:text-[28px] font-extrabold leading-tight text-white tracking-[-0.025em]">Vos informations restent <Em dark>confidentielles</Em></h2>
              <p className="m-0 text-[16px] leading-relaxed">Vos coordonnées et l’adresse de votre bien ne sont jamais diffusées, jamais revendues, jamais transmises à d’autres agences.</p>
              <div className="flex flex-col gap-2.5 pt-1">
                {[[ShieldCheck, "Données protégées, conformément au RGPD"], [ClipboardCheck, "Une réponse personnelle sous 24 h"]].map(([I, t]) => {
                  const Icon = I as typeof Lock;
                  return <span key={t as string} className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-white"><Icon className="h-[18px] w-[18px] text-brand-orange" /> {t as string}</span>;
                })}
              </div>
              <Link to="/mentions-legales#donnees" className="inline-flex min-h-[44px] items-center gap-1.5 self-start text-[14.5px] font-bold text-white underline-offset-4 hover:underline">Notre politique de confidentialité <ArrowRight className="h-4 w-4 text-brand-orange" /></Link>
            </div>
          </Container>
        </section>

        <FaqSection title={<>L’estimation, <Em>vos questions</Em></>} items={FAQS} />
      </main>
      <Footer />
    </div>
  );
};

export default EstimationPage;
