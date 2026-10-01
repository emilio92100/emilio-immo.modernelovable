/* Briques du guide immobilier. */
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, type Article } from "@/data/blogArticles";
import { FRAME_SHADOW } from "@/components/site/ui";

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return `${d === 1 ? "1er" : d} ${mois[m - 1]} ${y}`;
};

export const articleUrl = (a: Article) => `/guide-immobilier/${a.category}/${a.slug}`;

export const ArticleCard = ({ a, dark, big }: { a: Article; dark?: boolean; big?: boolean }) => {
  const cat = CATEGORIES.find((c) => c.slug === a.category);
  return (
    <Link
      to={articleUrl(a)}
      className={cn(
        "group flex h-full flex-col gap-3.5 rounded-[22px] p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7",
        dark ? "bg-brand text-brand-bt" : cn("bg-white", FRAME_SHADOW),
      )}
    >
      <span className={cn("inline-flex h-7 items-center self-start rounded-full px-3 text-[12px] font-extrabold uppercase tracking-[0.12em]", dark ? "bg-white/10 text-brand-orange-soft" : "bg-brand-tint text-brand")}>{cat?.label}</span>
      <h3 className={cn("m-0 font-display font-medium leading-tight text-balance", big ? "text-[19.5px] sm:text-[23px] sm:text-[28px] md:text-[34px]" : "text-[19px] sm:text-[22px]", dark ? "text-white" : "text-brand-ink group-hover:text-brand")}>{a.title}</h3>
      <p className={cn("m-0 text-[15px] leading-relaxed text-pretty", big ? "line-clamp-4" : "line-clamp-3", dark ? "text-brand-bt" : "text-brand-txt")}>{a.excerpt}</p>
      <div className={cn("mt-auto flex items-center justify-between gap-3 border-t pt-4 text-[13px] font-semibold", dark ? "border-white/15 text-brand-bt" : "border-brand-line2 text-brand-mut")}>
        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> <time dateTime={a.updated || a.date}>{formatDate(a.updated || a.date)}</time> · {a.readMinutes} min</span>
        <span className={cn("inline-flex items-center gap-1.5 font-bold", dark ? "text-white" : "text-brand")}>Lire <ArrowRight className="h-4 w-4 text-brand-orange transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
};

/** Identifiant d'ancre à partir d'un titre. */
export const slugify = (t: string) =>
  t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
