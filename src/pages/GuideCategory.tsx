import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCategory, getArticlesByCategory, CATEGORIES } from "@/data/blogArticles";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

const GuideCategory = () => {
  const { category } = useParams<{ category: string }>();
  const cat = category ? getCategory(category) : undefined;

  if (!cat) return <Navigate to="/guide-immobilier" replace />;

  const articles = getArticlesByCategory(cat.slug);
  const canonical = `https://www.emilio-immo.com/guide-immobilier/${cat.slug}`;

  return (
    <>
      <Helmet>
        <title>{cat.label} — Guide Immobilier | Emilio Immobilier</title>
        <meta name="description" content={cat.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${cat.label} — Guide Immobilier`} />
        <meta property="og:description" content={cat.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.emilio-immo.com/" },
              { "@type": "ListItem", position: 2, name: "Guide Immobilier", item: "https://www.emilio-immo.com/guide-immobilier" },
              { "@type": "ListItem", position: 3, name: cat.label, item: canonical },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="pt-24 bg-background min-h-screen">
        {/* Breadcrumb + Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-20">
          <div className="container mx-auto px-6">
            <nav className="flex items-center gap-2 text-xs font-body text-primary-foreground/60 mb-6">
              <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
              <span>/</span>
              <Link to="/guide-immobilier" className="hover:text-accent transition-colors">Guide Immobilier</Link>
              <span>/</span>
              <span className="text-accent">{cat.label}</span>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-accent" />
                <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent">
                  Catégorie
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl leading-tight mb-5">
                {cat.label}
              </h1>
              <p className="font-body text-base md:text-lg text-primary-foreground/80 leading-relaxed">
                {cat.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 md:py-20 container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, i) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/guide-immobilier/${cat.slug}/${article.slug}`}
                  className="group block h-full bg-card border border-border hover:border-accent transition-all duration-300 p-8"
                >
                  <div className="flex items-center gap-3 text-xs font-body text-muted-foreground mb-4">
                    <span>{formatDate(article.date)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readMinutes} min
                    </span>
                  </div>
                  <h2 className="font-display text-2xl leading-tight text-primary group-hover:text-accent transition-colors mb-4">
                    {article.title}
                  </h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-body text-sm">
                    <span className="tracking-wider uppercase">Lire l'article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Autres catégories */}
          <div className="mt-24 pt-12 border-t border-border">
            <h3 className="font-display text-2xl text-primary mb-6">Autres thématiques</h3>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
                <Link
                  key={c.slug}
                  to={`/guide-immobilier/${c.slug}`}
                  className="px-5 py-2.5 border border-border rounded-full text-sm font-body text-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default GuideCategory;