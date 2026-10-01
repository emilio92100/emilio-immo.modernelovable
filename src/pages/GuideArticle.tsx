/* Article du guide immobilier (refonte 2026) : sommaire, mise en page lisible, FAQ, articles liés. */
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, LineChart, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { SITE_URL } from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import { getArticleBySlug, getCategory, getRelatedArticles, type ArticleSection } from "@/data/blogArticles";
import { useSiteModals } from "@/components/site/SiteModals";
import { Btn, Container, Crumbs, FRAME_SHADOW, SectionHead, Em, TEL, TEL_HREF } from "@/components/site/ui";
import { FaqList } from "@/components/site/Faq";
import { ArticleCard, formatDate, slugify } from "@/components/site/GuideParts";
import alexandre from "@/assets/refonte/alexandre-detoure.webp";

const Bloc = ({ s }: { s: ArticleSection }) => {
  switch (s.type) {
    case "p":
      return <p className="m-0 text-[17.5px] leading-[1.8] text-brand-txt text-pretty">{s.text}</p>;
    case "h2":
      return <h2 id={slugify(s.text)} className="m-0 mt-8 font-display text-[19px] sm:text-[22px] sm:text-[clamp(26px,2.4vw,32px)] font-medium leading-tight text-brand-ink text-balance">{s.text}</h2>;
    case "h3":
      return <h3 className="m-0 mt-3 font-display text-[19px] sm:text-[22px] font-medium leading-tight text-brand-ink">{s.text}</h3>;
    case "list":
      return (
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {s.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[17px] leading-[1.7] text-brand-txt">
              <span aria-hidden className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-brand-orange" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure className="m-0 my-2 border-l-2 border-brand-orange pl-6">
          <blockquote className="m-0 font-display text-[19px] sm:text-[22px] italic leading-relaxed text-brand-ink">« {s.text} »</blockquote>
          {s.author && <figcaption className="mt-2 text-sm font-semibold text-brand-mut">{s.author}</figcaption>}
        </figure>
      );
    case "callout":
      return (
        <aside className="my-2 flex flex-col gap-2 rounded-[20px] bg-brand p-6 md:p-7">
          <span className="font-display text-[18.5px] sm:text-[21px] leading-tight text-brand-orange-soft">{s.title}</span>
          <p className="m-0 text-[16px] leading-relaxed text-brand-bt">{s.text}</p>
        </aside>
      );
    case "table":
      return (
        <div className="my-2 overflow-x-auto rounded-[18px] border border-brand-line">
          <table className="w-full min-w-[520px] border-collapse text-[15px]">
            <thead className="bg-brand-pale">
              <tr>{s.headers.map((h, i) => <th key={i} className="px-4 py-3 text-left font-extrabold text-brand-ink">{h}</th>)}</tr>
            </thead>
            <tbody>
              {s.rows.map((row, i) => (
                <tr key={i} className="border-t border-brand-line2">
                  {row.map((c, j) => <td key={j} className={cn("px-4 py-3", j === 0 ? "font-semibold text-brand-ink" : "text-brand-txt")}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "links":
      return (
        <div className="my-2 flex flex-col gap-3 rounded-[18px] border border-brand-line bg-brand-pale p-5 md:p-6">
          <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">{s.title}</span>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {s.items.map((it, i) => (
              <li key={i}>
                <Link to={it.to} className="group inline-flex min-h-[36px] items-center gap-2 text-[15.5px] font-semibold text-brand hover:text-brand-orange-text">
                  <ArrowRight className="h-4 w-4 flex-none text-brand-orange" />
                  <span className="underline decoration-brand-orange/30 underline-offset-4 group-hover:decoration-brand-orange">{it.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
  }
};

const GuideArticle = () => {
  const { openEstimation } = useSiteModals();
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const cat = category ? getCategory(category) : undefined;
  if (!article || !cat || article.category !== cat.slug) return <Navigate to="/guide-immobilier" replace />;

  const related = getRelatedArticles(article.slug, article.category, 3);
  const url = `${SITE_URL}/guide-immobilier/${cat.slug}/${article.slug}`;
  const sommaire = article.sections.filter((s): s is { type: "h2"; text: string } => s.type === "h2");
  const author = { "@type": "Person", name: "Alexandre Rogelet", jobTitle: "Fondateur d’Emilio Immobilier", url: `${SITE_URL}/notre-histoire` };
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.metaDescription,
      datePublished: article.date,
      dateModified: article.updated || article.date,
      inLanguage: "fr-FR",
      author,
      publisher: { "@type": "Organization", name: "Emilio Immobilier", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` } },
      image: `${SITE_URL}/og-image.jpg`,
      mainEntityOfPage: url,
      articleSection: cat.label,
      keywords: article.keywords.join(", "),
      wordCount: article.sections.reduce((n, s) => n + ("text" in s ? s.text.split(/\s+/).length : "items" in s ? s.items.join(" ").split(/\s+/).length : 0), 0),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guide immobilier", item: `${SITE_URL}/guide-immobilier` },
        { "@type": "ListItem", position: 3, name: cat.label, item: `${SITE_URL}/guide-immobilier/${cat.slug}` },
        { "@type": "ListItem", position: 4, name: article.title, item: url },
      ],
    },
    ...(article.faq?.length
      ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: article.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead title={article.metaTitle} description={article.metaDescription} canonical={url} jsonLd={jsonLd} type="article">
        <meta property="article:published_time" content={article.date} />
        <meta property="article:modified_time" content={article.updated || article.date} />
        <meta property="article:section" content={cat.label} />
      </SEOHead>
      <Navbar />
      <main>
        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-5 pb-12 pt-6 md:pb-[64px] md:pt-10">
            <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Guide immobilier", to: "/guide-immobilier" }, { label: cat.label, to: `/guide-immobilier/${cat.slug}` }]} />
            <Link to={`/guide-immobilier/${cat.slug}`} className="inline-flex h-8 items-center self-start rounded-full bg-brand-tint px-3.5 text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-brand">{cat.label}</Link>
            <h1 className="m-0 max-w-[920px] font-display text-[27px] sm:text-[clamp(32px,3.9vw,54px)] font-medium leading-[1.1] tracking-[-0.01em] text-brand-ink text-balance">{article.title}</h1>
            <p className="m-0 max-w-[760px] text-base leading-relaxed text-brand-txt text-pretty sm:text-lg">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 text-[14px] text-brand-mut">
              <span className="inline-flex items-center gap-2.5">
                <span className="block h-10 w-10 flex-none overflow-hidden rounded-full bg-brand-tint"><img src={alexandre} alt="" className="block h-[58px] w-10 object-cover object-top" /></span>
                <span className="flex flex-col leading-tight"><span className="font-bold text-brand-ink">Alexandre Rogelet</span><span>Fondateur d’Emilio Immobilier</span></span>
              </span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {article.updated ? <>Mis à jour le <time dateTime={article.updated}>{formatDate(article.updated)}</time></> : <>Publié le <time dateTime={article.date}>{formatDate(article.date)}</time></>}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.readMinutes} min de lecture</span>
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="grid grid-cols-1 items-start gap-x-16 gap-y-10 py-12 md:py-[72px] lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="flex min-w-0 max-w-[740px] flex-col gap-5">
              {article.sections.map((s, i) => <Bloc key={i} s={s} />)}

              {article.faq && article.faq.length > 0 && (
                <div className="mt-10 flex flex-col gap-5 border-t border-brand-line2 pt-10">
                  <h2 id="questions-frequentes" className="m-0 font-display text-[19px] sm:text-[22px] sm:text-[clamp(26px,2.4vw,32px)] font-medium leading-tight text-brand-ink">Questions fréquentes</h2>
                  <FaqList items={article.faq} />
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-[22px] bg-brand-pale p-6 md:p-8">
                <div className="flex max-w-[460px] flex-col gap-2">
                  <span className="font-display text-[18.5px] sm:text-[21px] sm:text-[26px] leading-tight text-brand-ink">Envie d’un avis de valeur sérieux ?</span>
                  <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt">Une première fourchette tout de suite, puis un membre de l’équipe vous rappelle sous 24 h. Gratuit et sans engagement.</p>
                </div>
                <Btn onClick={() => openEstimation()} iconLeft={<LineChart className="h-[18px] w-[18px]" />}>Estimer mon bien</Btn>
              </div>
              <Link to={`/guide-immobilier/${cat.slug}`} className="inline-flex min-h-[44px] items-center gap-2 self-start text-[15px] font-bold text-brand hover:text-brand-orange-text">
                <ArrowLeft className="h-4 w-4 text-brand-orange" /> Tous les articles « {cat.label} »
              </Link>
            </article>

            <aside className="hidden flex-col gap-5 lg:sticky lg:top-28 lg:flex">
              {sommaire.length > 2 && (
                <nav aria-label="Sommaire" className={cn("flex flex-col gap-3 rounded-[20px] bg-white p-5", FRAME_SHADOW)}>
                  <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">Sommaire</span>
                  <ol className="m-0 flex list-none flex-col gap-1 p-0">
                    {sommaire.map((h, i) => (
                      <li key={i}>
                        <a href={`#${slugify(h.text)}`} className="flex gap-2.5 rounded-lg px-2 py-1.5 text-[14px] leading-snug text-brand-txt hover:bg-brand-pale hover:text-brand-ink">
                          <span className="font-display italic text-brand-orange-lt">{String(i + 1).padStart(2, "0")}</span>
                          <span>{h.text}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="flex flex-col gap-3 rounded-[20px] bg-brand p-5 text-brand-bt">
                <span className="font-display text-[19px] sm:text-[22px] leading-tight text-white">Un projet à Paris Ouest ou dans le 92 ?</span>
                <span className="text-[14.5px] leading-relaxed">Parlez-en avec l’équipe, sans engagement.</span>
                <Btn onClick={() => openEstimation()} full iconLeft={<LineChart className="h-[18px] w-[18px]" />}>Estimer mon bien</Btn>
                <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center justify-center gap-2 text-[15px] font-bold text-white"><Phone className="h-4 w-4 text-brand-orange" /> {TEL}</a>
              </div>
            </aside>
          </Container>
        </section>

        {related.length > 0 && (
          <section className="bg-brand-pale">
            <Container className="flex flex-col gap-10 py-14 md:py-[88px]">
              <SectionHead eyebrow="À lire aussi" title={<>Sur le même <Em>sujet</Em></>} />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {related.map((a) => <ArticleCard key={a.slug} a={a} />)}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GuideArticle;
