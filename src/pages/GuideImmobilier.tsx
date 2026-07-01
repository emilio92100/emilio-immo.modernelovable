import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ARTICLES, CATEGORIES } from "@/data/blogArticles";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

const GuideImmobilier = () => {
  const latest = [...ARTICLES]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <>
      <Helmet>
        <title>Guide Immobilier — Conseils, prix et fiscalité | Emilio Immobilier</title>
        <meta
          name="description"
          content="Analyses, conseils et guides pour vendre, acheter et comprendre le marché immobilier de Paris Ouest et des Hauts-de-Seine. Rédigés par un expert local."
        />
        <link rel="canonical" href="https://www.emilio-immo.com/guide-immobilier" />
        <meta property="og:title" content="Guide Immobilier | Emilio Immobilier" />
        <meta
          property="og:description"
          content="Analyses et conseils pour vendre, acheter et comprendre le marché immobilier de Paris Ouest et du 92."
        />
        <meta property="og:url" content="https://www.emilio-immo.com/guide-immobilier" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Guide Immobilier Emilio",
            description:
              "Analyses et conseils immobilier pour Paris Ouest et les Hauts-de-Seine",
            url: "https://www.emilio-immo.com/guide-immobilier",
            publisher: {
              "@type": "Organization",
              name: "Emilio Immobilier",
              url: "https://www.emilio-immo.com",
            },
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="pt-24 bg-background min-h-screen">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 20% 30%, hsl(var(--accent)) 0%, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--accent)) 0%, transparent 40%)"
            }} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-accent" />
                <span className="font-body text-xs tracking-[0.3em] uppercase text-accent">
                  Le Guide
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">
                Guide Immobilier
              </h1>
              <p className="font-body text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
                Analyses de marché, conseils de vente, décryptages fiscaux. Des articles
                rédigés par notre équipe, ancrés dans la réalité du terrain de Paris Ouest
                et des Hauts-de-Seine.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 md:py-24 container mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-accent">
              Explorer par thème
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {CATEGORIES.map((cat, i) => {
              const count = ARTICLES.filter((a) => a.category === cat.slug).length;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    to={`/guide-immobilier/${cat.slug}`}
                    className="group block p-8 md:p-10 border border-border bg-card hover:border-accent transition-all duration-300 h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 h-24 w-24 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity">
                      <BookOpen className="w-full h-full text-accent" />
                    </div>
                    <div className="relative">
                      <span className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                        {count} article{count > 1 ? "s" : ""}
                      </span>
                      <h2 className="font-display text-2xl md:text-3xl text-primary mt-3 mb-3 group-hover:text-accent transition-colors">
                        {cat.label}
                      </h2>
                      <p className="font-body text-muted-foreground leading-relaxed mb-6">
                        {cat.description}
                      </p>
                      <div className="flex items-center gap-2 text-accent font-body text-sm">
                        <span className="tracking-wider uppercase">Découvrir</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Latest articles */}
        <section className="py-20 md:py-24 bg-cream">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-10">
              <span className="font-body text-xs tracking-[0.25em] uppercase text-accent">
                Derniers articles
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latest.map((article, i) => {
                const cat = CATEGORIES.find((c) => c.slug === article.category);
                return (
                  <motion.article
                    key={article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                  >
                    <Link
                      to={`/guide-immobilier/${article.category}/${article.slug}`}
                      className="group block h-full bg-background border border-border hover:border-accent transition-all duration-300 p-7"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-body font-semibold">
                          {cat?.label}
                        </span>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                      <h3 className="font-display text-xl leading-tight text-primary group-hover:text-accent transition-colors mb-3">
                        {article.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-body pt-4 border-t border-border">
                        <span>{formatDate(article.date)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readMinutes} min
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default GuideImmobilier;