import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight, ArrowLeft, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EstimationPopup from "@/components/EstimationPopup";
import {
  getArticleBySlug,
  getCategory,
  getRelatedArticles,
  type ArticleSection,
} from "@/data/blogArticles";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

const SectionRenderer = ({ section }: { section: ArticleSection }) => {
  switch (section.type) {
    case "p":
      return (
        <p className="font-body text-[17px] leading-[1.85] text-foreground/85 mb-6">
          {section.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="font-display text-2xl md:text-3xl text-primary mt-14 mb-6 leading-tight">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-xl md:text-2xl text-primary mt-10 mb-4 leading-tight">
          {section.text}
        </h3>
      );
    case "list":
      return (
        <ul className="font-body text-[17px] leading-[1.8] text-foreground/85 mb-6 space-y-3">
          {section.items.map((item, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-accent mt-2 flex-shrink-0 h-1 w-1 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 pl-6 border-l-2 border-accent italic font-display text-xl leading-relaxed text-primary">
          « {section.text} »
          {section.author && (
            <cite className="block not-italic font-body text-sm text-muted-foreground mt-3">
              — {section.author}
            </cite>
          )}
        </blockquote>
      );
    case "callout":
      return (
        <aside className="my-10 p-7 bg-primary text-primary-foreground relative">
          <div className="absolute top-0 left-0 h-1 w-16 bg-accent" />
          <h4 className="font-display text-lg mb-3 text-accent">{section.title}</h4>
          <p className="font-body text-[15px] leading-relaxed text-primary-foreground/90">
            {section.text}
          </p>
        </aside>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse font-body text-sm">
            <thead>
              <tr className="border-b-2 border-primary">
                {section.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left py-3 px-4 font-display text-primary text-base"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr key={i} className="border-b border-border">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`py-3 px-4 ${j === 0 ? "font-semibold text-foreground" : "text-foreground/80"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "links":
      return (
        <div className="my-10 p-6 border border-border bg-cream/50">
          <div className="font-body text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
            {section.title}
          </div>
          <ul className="space-y-2">
            {section.items.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-2 font-body text-[15px] text-primary hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  <span className="underline underline-offset-4 decoration-accent/30 group-hover:decoration-accent">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
  }
};

const GuideArticle = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const cat = category ? getCategory(category) : undefined;

  if (!article || !cat || article.category !== cat.slug) {
    return <Navigate to="/guide-immobilier" replace />;
  }

  const related = getRelatedArticles(article.slug, article.category, 3);
  const canonical = `https://www.emilio-immo.com/guide-immobilier/${cat.slug}/${article.slug}`;

  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={article.keywords.join(", ")} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={article.date} />
        {article.updated && <meta property="article:modified_time" content={article.updated} />}
        <meta property="article:section" content={cat.label} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.metaDescription,
            datePublished: article.date,
            dateModified: article.updated || article.date,
            author: {
              "@type": "Organization",
              name: "Emilio Immobilier",
              url: "https://www.emilio-immo.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Emilio Immobilier",
              url: "https://www.emilio-immo.com",
            },
            mainEntityOfPage: canonical,
            articleSection: cat.label,
            keywords: article.keywords.join(", "),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.emilio-immo.com/" },
              { "@type": "ListItem", position: 2, name: "Guide Immobilier", item: "https://www.emilio-immo.com/guide-immobilier" },
              { "@type": "ListItem", position: 3, name: cat.label, item: `https://www.emilio-immo.com/guide-immobilier/${cat.slug}` },
              { "@type": "ListItem", position: 4, name: article.title, item: canonical },
            ],
          })}
        </script>
        {article.faq && article.faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: article.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            })}
          </script>
        )}
      </Helmet>

      <Navbar />

      <main className="pt-24 bg-background min-h-screen">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <nav className="flex items-center gap-2 text-xs font-body text-primary-foreground/60 mb-8 flex-wrap">
              <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
              <span>/</span>
              <Link to="/guide-immobilier" className="hover:text-accent transition-colors">Guide Immobilier</Link>
              <span>/</span>
              <Link to={`/guide-immobilier/${cat.slug}`} className="hover:text-accent transition-colors">
                {cat.label}
              </Link>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to={`/guide-immobilier/${cat.slug}`}
                className="inline-flex items-center gap-2 text-xs font-body tracking-[0.25em] uppercase text-accent mb-6 hover:opacity-80 transition-opacity"
              >
                {cat.label}
              </Link>
              <h1 className="font-display text-3xl md:text-5xl leading-[1.15] mb-6">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-sm font-body text-primary-foreground/70">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {article.readMinutes} min de lecture
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article body */}
        <article className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="font-body">
              <p className="text-xl md:text-2xl font-display leading-relaxed text-primary italic mb-12 pb-8 border-b border-border">
                {article.excerpt}
              </p>
              {article.sections.map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}
            </div>

            {/* FAQ */}
            {article.faq && article.faq.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border">
                <div className="flex items-center gap-3 mb-8">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  <h2 className="font-display text-2xl md:text-3xl text-primary leading-tight">
                    Questions fréquentes
                  </h2>
                </div>
                <div className="space-y-6">
                  {article.faq.map((item, i) => (
                    <details
                      key={i}
                      className="group border-l-2 border-accent/40 pl-6 py-2 hover:border-accent transition-colors"
                    >
                      <summary className="cursor-pointer font-display text-lg text-primary marker:hidden list-none flex items-start justify-between gap-4">
                        <span>{item.q}</span>
                        <span className="text-accent text-2xl leading-none flex-shrink-0 group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <p className="mt-4 font-body text-[16px] leading-[1.8] text-foreground/80">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* CTA Estimation */}
            <div className="mt-16 p-8 md:p-10 bg-cream border-l-4 border-accent">
              <span className="font-body text-xs tracking-[0.25em] uppercase text-accent">
                Passer à l'action
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-primary mt-3 mb-4">
                Envie d'une estimation sérieuse de votre bien ?
              </h3>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                Un conseiller vous rappelle sous 24h pour un avis de valeur argumenté,
                gratuit et sans engagement.
              </p>
              <EstimationPopup
                trigger={
                  <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors">
                    Estimer mon bien
                    <ArrowRight className="w-4 h-4" />
                  </button>
                }
              />
            </div>

            {/* Retour catégorie */}
            <div className="mt-12">
              <Link
                to={`/guide-immobilier/${cat.slug}`}
                className="inline-flex items-center gap-2 text-sm font-body text-primary hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à {cat.label}
              </Link>
            </div>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-16 md:py-20 bg-cream">
            <div className="container mx-auto px-6">
              <div className="flex items-center gap-3 mb-10">
                <span className="font-body text-xs tracking-[0.25em] uppercase text-accent">
                  À lire aussi
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((rel) => {
                  const relCat = getCategory(rel.category);
                  return (
                    <Link
                      key={rel.slug}
                      to={`/guide-immobilier/${rel.category}/${rel.slug}`}
                      className="group block bg-background border border-border hover:border-accent transition-all p-6"
                    >
                      <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-body font-semibold">
                        {relCat?.label}
                      </span>
                      <h4 className="font-display text-lg text-primary group-hover:text-accent transition-colors mt-3 mb-3 leading-tight">
                        {rel.title}
                      </h4>
                      <p className="font-body text-sm text-muted-foreground line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/guide-immobilier"
                  className="inline-flex items-center gap-2 text-sm font-body tracking-wider uppercase text-primary hover:text-accent transition-colors"
                >
                  Voir tout le Guide Immobilier
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default GuideArticle;