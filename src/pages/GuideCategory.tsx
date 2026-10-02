/* Un thème du guide immobilier (refonte 2026). */
import { Link, Navigate, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { SITE_URL } from "@/components/SEOHead";
import { CATEGORIES, getArticlesByCategory, getCategory } from "@/data/blogArticles";
import { cityList } from "@/lib/cities";
import { Container, Crumbs, Eyebrow } from "@/components/site/ui";
import { ArticleCard, articleUrl } from "@/components/site/GuideParts";

const GuideCategory = () => {
  const { category } = useParams<{ category: string }>();
  const cat = category ? getCategory(category) : undefined;
  if (!cat) return <Navigate to="/guide-immobilier" replace />;

  const articles = getArticlesByCategory(cat.slug);
  const url = `${SITE_URL}/guide-immobilier/${cat.slug}`;
  const pages = cat.slug === "vendre" ? "vendre" : cat.slug === "acheter" ? "achat" : null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${cat.label} — Guide immobilier`,
        description: cat.description,
        url,
        inLanguage: "fr-FR",
        hasPart: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: `${SITE_URL}${articleUrl(a)}` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Guide immobilier", item: `${SITE_URL}/guide-immobilier` },
          { "@type": "ListItem", position: 3, name: cat.label, item: url },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead title={`${cat.label} : conseils et analyses | Guide immobilier Emilio`} description={cat.description} canonical={url} jsonLd={jsonLd} />
      <Navbar />
      <main>
        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-[22px] pb-12 pt-6 md:pb-[72px] md:pt-10">
            <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Guide immobilier", to: "/guide-immobilier" }, { label: cat.label }]} />
            <Eyebrow>{cat.short}</Eyebrow>
            <h1 className="m-0 max-w-[900px] font-display text-[29px] sm:text-[clamp(34px,4.2vw,58px)] font-extrabold leading-[1.07] tracking-[-0.03em] text-brand-ink text-balance">{cat.label}</h1>
            <p className="m-0 max-w-[700px] text-base leading-relaxed text-brand-txt text-pretty sm:text-lg">{cat.description}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
                <Link key={c.slug} to={`/guide-immobilier/${c.slug}`} className="inline-flex min-h-[42px] items-center rounded-full border border-brand-line bg-white px-4 text-[14.5px] font-semibold text-brand-ink transition hover:border-brand-orange hover:bg-[#FFF1DF]">{c.label}</Link>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="flex flex-col gap-12 py-14 md:py-[88px]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => <ArticleCard key={a.slug} a={a} />)}
            </div>
            {pages && (
              <div className="flex flex-col gap-3.5 rounded-[22px] border border-brand-line bg-brand-pale p-6 md:p-7">
                <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">{pages === "vendre" ? "Vendre dans votre secteur" : "Acheter dans votre secteur"}</span>
                <div className="flex flex-wrap gap-2">
                  {cityList.map((c) => (
                    <Link key={c.slug} to={`/${pages === "vendre" ? "vendre" : "achat"}-appartement-${c.slug}`} className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-brand-line bg-white px-3.5 text-[14px] font-semibold text-brand-ink transition hover:border-brand-orange hover:bg-[#FFF1DF]">
                      <MapPin className="h-3.5 w-3.5 text-brand-orange-text" /> {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuideCategory;
