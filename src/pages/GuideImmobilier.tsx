/* Accueil du guide immobilier (refonte 2026). */
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calculator, Home, LineChart, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { SITE_URL } from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import { ARTICLES, CATEGORIES } from "@/data/blogArticles";
import { Container, Crumbs, Em, Eyebrow, FRAME_SHADOW, SectionHead } from "@/components/site/ui";
import { ArticleCard, articleUrl } from "@/components/site/GuideParts";

const ICONS: Record<string, JSX.Element> = {
  "prix-marche": <LineChart className="h-6 w-6" />,
  vendre: <Home className="h-6 w-6" />,
  acheter: <Search className="h-6 w-6" />,
  "fiscalite-juridique": <Calculator className="h-6 w-6" />,
};

const GuideImmobilier = () => {
  const tries = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  const [une, ...autres] = tries;
  const url = `${SITE_URL}/guide-immobilier`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        name: "Le guide immobilier d’Emilio",
        description: "Prix, vente, achat et fiscalité : les conseils d’Emilio Immobilier pour Paris Ouest et les Hauts-de-Seine.",
        url,
        inLanguage: "fr-FR",
        publisher: { "@type": "Organization", name: "Emilio Immobilier", url: SITE_URL },
        blogPost: tries.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: `${SITE_URL}${articleUrl(a)}`, datePublished: a.date, dateModified: a.updated || a.date })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Guide immobilier", item: url },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Guide immobilier Paris Ouest et Hauts-de-Seine : prix, vente, achat | Emilio"
        description="Prix au m², conseils pour vendre ou acheter, fiscalité : le guide immobilier d’Emilio Immobilier pour Paris 6e, 7e, 15e, 16e, 17e, Boulogne, Neuilly et les Hauts-de-Seine."
        canonical={url}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <section className="bg-brand-pale">
          <Container className="flex flex-wrap items-center gap-x-14 gap-y-10 pb-14 pt-6 md:pb-[80px] md:pt-10">
            <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[22px]">
              <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Guide immobilier" }]} />
              <Eyebrow>Le guide</Eyebrow>
              <h1 className="m-0 font-display text-[clamp(34px,4.2vw,58px)] font-medium leading-[1.07] tracking-[-0.015em] text-brand-ink text-balance">
                Le guide immobilier de <Em wrap>Paris Ouest et des Hauts-de-Seine</Em>
              </h1>
              <p className="m-0 max-w-[580px] text-lg leading-relaxed text-brand-txt text-pretty">
                Prix au m², conseils pour vendre ou acheter, fiscalité : des articles écrits par l’équipe, à partir de ce que l’on voit chaque semaine sur le terrain.
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Link key={c.slug} to={`/guide-immobilier/${c.slug}`} className="inline-flex min-h-[42px] items-center rounded-full border border-brand-line bg-white px-4 text-[14.5px] font-semibold text-brand-ink transition hover:border-brand-orange hover:bg-[#FFF1DF]">{c.label}</Link>
                ))}
              </div>
            </div>
            {une && (
              <div className="min-w-0 flex-[1_1_440px]">
                <div className="relative mx-4 mb-4">
                  <span aria-hidden className="absolute -bottom-4 -right-4 h-[60%] w-[60%] rounded-[28px] bg-brand-orange/90" />
                  <div className="relative">
                    <ArticleCard a={une} dark big />
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>

        <section className="bg-white">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead eyebrow="Explorer par thème" title={<>Quatre thèmes, <Em>pour avancer</Em></>} />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {CATEGORIES.map((cat) => {
                const n = ARTICLES.filter((a) => a.category === cat.slug).length;
                return (
                  <Link key={cat.slug} to={`/guide-immobilier/${cat.slug}`} className={cn("group flex gap-5 rounded-[22px] bg-white p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7", FRAME_SHADOW)}>
                    <span className="grid h-[54px] w-[54px] flex-none place-items-center rounded-2xl bg-brand text-white">{ICONS[cat.slug] || <BookOpen className="h-6 w-6" />}</span>
                    <span className="flex min-w-0 flex-col gap-2">
                      <span className="text-[12.5px] font-extrabold uppercase tracking-[0.14em] text-brand-orange-text">{n} article{n > 1 ? "s" : ""}</span>
                      <h2 className="m-0 font-display text-[26px] font-medium leading-tight text-brand-ink">{cat.label}</h2>
                      <span className="text-[15.5px] leading-relaxed text-brand-txt text-pretty">{cat.description}</span>
                      <span className="inline-flex items-center gap-1.5 pt-1 text-[15px] font-bold text-brand">Découvrir <ArrowRight className="h-4 w-4 text-brand-orange transition-transform group-hover:translate-x-1" /></span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead eyebrow="Tous les articles" title={<>Les derniers <Em>articles</Em></>} />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {autres.map((a) => <ArticleCard key={a.slug} a={a} />)}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuideImmobilier;
