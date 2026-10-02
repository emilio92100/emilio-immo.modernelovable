/* Pages « achat-appartement-… » (refonte 2026) : même adresse, même contenu, nouvelle présentation. */
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, LineChart, Phone, Search, Train, Trees } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SEOHead from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import { Property, fetchPropertiesFromFeed, mockProperties } from "@/lib/properties";
import type { CityData } from "@/lib/cities";
import { useSiteModals } from "@/components/site/SiteModals";
import { Btn, Container, Crumbs, Em, Eyebrow, FRAME_SHADOW, SectionHead, TEL, TEL_HREF, TextLink } from "@/components/site/ui";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AutresSecteurs, PrixCard, SITE, agentLd, aVille, md } from "@/components/site/CityParts";

const CityPageTemplate = ({ city }: { city: CityData }) => {
  const { openEstimation } = useSiteModals();
  const [properties, setProperties] = useState<Property[] | null>(null);
  const url = `${SITE}/achat-appartement-${city.slug}`;
  const estimer = () => openEstimation({ city: city.name.startsWith("Paris") ? "Paris" : city.name, postalCode: city.postalCodes[0] });

  useEffect(() => {
    let on = true;
    fetchPropertiesFromFeed()
      .then((d) => on && setProperties(d))
      .catch(() => on && setProperties(mockProperties));
    return () => {
      on = false;
    };
  }, []);

  const biens = (properties || [])
    .filter((p) => !p.id.includes("fictif"))
    .filter((p) => city.postalCodes.includes(p.postalCode) || city.cityMatch.some((m) => p.city.toLowerCase().includes(m)))
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      agentLd(city, url),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Acheter", item: `${SITE}/acheter` },
          { "@type": "ListItem", position: 3, name: `Achat appartement ${city.name}`, item: url },
        ],
      },
      faqJsonLd(city.faqs),
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead title={city.metaTitle} description={city.metaDescription} canonical={url} jsonLd={jsonLd} />
      <Navbar />
      <main>
        {/* Haut de page */}
        <section className="bg-brand-pale">
          <Container className="flex flex-wrap items-center gap-x-14 gap-y-10 pb-14 pt-6 md:pb-[80px] md:pt-10">
            <div className="flex min-w-0 flex-[1_1_540px] flex-col gap-[22px]">
              <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Acheter", to: "/acheter" }, { label: city.name }]} />
              <Eyebrow>{city.postalLabel}</Eyebrow>
              <h1 className="m-0 font-display text-[29px] sm:text-[clamp(34px,4.2vw,58px)] font-extrabold leading-[1.07] tracking-[-0.03em] text-brand-ink text-balance">
                Achat et vente d’appartement <Em wrap>{aVille(city)}</Em>
              </h1>
              <p className="m-0 max-w-[580px] text-base leading-relaxed text-brand-txt text-pretty sm:text-lg">{city.heroIntro}</p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Btn href="#biens" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Voir les biens</Btn>
                <Btn variant="outline" onClick={estimer} iconLeft={<LineChart className="h-[18px] w-[18px]" />}>Estimer mon bien</Btn>
              </div>
              <span className="text-[14.5px] text-brand-mut">
                Un projet {aVille(city)} ? <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center font-bold text-brand">{TEL}</a>
              </span>
            </div>
            <div className="min-w-0 flex-[1_1_440px]">
              <PrixCard city={city} />
            </div>
          </Container>
        </section>

        {/* Le marché */}
        <section className="bg-white">
          <Container className="grid grid-cols-1 items-start gap-x-16 gap-y-10 py-14 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:py-[96px]">
            <div className="flex min-w-0 flex-col gap-6">
              <SectionHead eyebrow="Le marché" title={<>Le marché immobilier <Em wrap>{aVille(city)}</Em></>} />
              <div className="flex max-w-[680px] flex-col gap-5 text-[17px] leading-relaxed text-brand-txt text-pretty">
                {city.marketParagraphs.map((p, i) => <p key={i} className="m-0">{md(p)}</p>)}
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-4 rounded-[24px] bg-brand p-7 text-brand-bt md:sticky md:top-28 md:p-8">
              <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-soft">Estimation gratuite</span>
              <h2 className="m-0 font-display text-[18.5px] sm:text-[21px] sm:text-[26px] font-extrabold leading-tight text-white md:text-[30px] text-balance tracking-[-0.025em]">{city.estimationCta}</h2>
              <p className="m-0 text-[15.5px] leading-relaxed">Une première fourchette tout de suite, à partir des ventes récentes du secteur. Puis un membre de l’équipe vous rappelle pour l’affiner.</p>
              <Btn onClick={estimer} iconLeft={<LineChart className="h-[18px] w-[18px]" />} icon={<ArrowRight className="h-[18px] w-[18px]" />} className="self-start">Estimer mon bien</Btn>
            </div>
          </Container>
        </section>

        {/* Les quartiers */}
        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead eyebrow="Les quartiers" title={<>Où acheter <Em wrap>{aVille(city)}</Em>{"\u00a0"}?</>} lead="Chaque quartier a son identité, ses prix et ses acheteurs. Voici nos repères pour vous aider à cibler." />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {city.quartiers.map((q, i) => (
                <article key={q.name} className={cn("flex flex-col gap-3 rounded-[20px] bg-white p-6 transition-transform duration-300 hover:-translate-y-1", FRAME_SHADOW)}>
                  <span className="font-display text-[27px] sm:text-[34px] leading-none text-brand-orange-lt font-extrabold tracking-[-0.025em]">0{i + 1}</span>
                  <h3 className="m-0 font-display text-[19.5px] sm:text-[23px] font-extrabold leading-tight text-brand-ink tracking-[-0.025em]">{q.name}</h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt text-pretty">{q.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Les biens du secteur */}
        <section id="biens" className="bg-white">
          <Container className="flex flex-col gap-9 py-14 md:py-[96px]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead eyebrow="À vendre" title={<>Nos biens <Em wrap>{aVille(city)}</Em></>} />
              <TextLink to="/biens">Voir tous nos biens</TextLink>
            </div>
            {!properties ? (
              <div className="h-[360px] animate-pulse rounded-[22px] bg-brand-pale" />
            ) : biens.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {biens.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
              </div>
            ) : (
              <div className={cn("flex flex-wrap items-center justify-between gap-6 rounded-[22px] bg-brand-pale p-7 md:p-9")}>
                <div className="flex max-w-[640px] flex-col gap-2">
                  <span className="font-display text-[18.5px] sm:text-[21px] sm:text-[26px] leading-tight text-brand-ink font-extrabold tracking-[-0.025em]">Aucun bien publié {aVille(city)} en ce moment</span>
                  <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt">Certains biens se vendent sans annonce. Confiez-nous votre recherche : on vous présente ceux qui vous correspondent, y compris hors marché.</p>
                </div>
                <Btn to="/acheter#recherche" iconLeft={<Search className="h-[18px] w-[18px]" />}>Confier ma recherche</Btn>
              </div>
            )}
          </Container>
        </section>

        {/* Cadre de vie */}
        <section className="bg-brand">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead dark eyebrow="Cadre de vie" title={<>Pourquoi vivre <Em dark>{aVille(city)}</Em>{"\u00a0"}?</>} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-[22px] border border-white/15 bg-white/[0.06] p-6 md:p-7">
                <span className="inline-flex items-center gap-3 font-display text-[20px] sm:text-[24px] text-white font-extrabold tracking-[-0.025em]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orange text-brand-ink"><Train className="h-5 w-5" /></span>Transports</span>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {city.transports.map((t) => (
                    <li key={t.line} className="flex flex-col gap-0.5 border-t border-white/10 pt-3 first:border-0 first:pt-0 sm:flex-row sm:gap-4">
                      <span className="w-[150px] flex-none text-[15px] font-extrabold text-brand-orange-soft">{t.line}</span>
                      <span className="text-[15px] leading-normal text-brand-bt">{t.stations}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4 rounded-[22px] border border-white/15 bg-white/[0.06] p-6 md:p-7">
                <span className="inline-flex items-center gap-3 font-display text-[20px] sm:text-[24px] text-white font-extrabold tracking-[-0.025em]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orange text-brand-ink"><Trees className="h-5 w-5" /></span>Atouts</span>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {city.atouts.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-[15.5px] leading-normal text-brand-bt">
                      <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] flex-none text-brand-orange" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Btn to="/acheter#recherche" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Confier ma recherche {aVille(city)}</Btn>
              <Btn href={TEL_HREF} variant="ghost" iconLeft={<Phone className="h-[18px] w-[18px]" />}>{TEL}</Btn>
            </div>
          </Container>
        </section>

        <FaqSection title={<>{city.name}{"\u00a0"}: <Em>vos questions</Em></>} items={city.faqs} />
        <AutresSecteurs current={city} kind="achat" />
      </main>
      <Footer />
    </div>
  );
};

export default CityPageTemplate;
