/* Briques des pages communes (achat-appartement-… / vendre-appartement-…). */
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Info, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { cityList, type CityData } from "@/lib/cities";
import { Container, FRAME_SHADOW } from "@/components/site/ui";

export const SITE = "https://www.emilio-immo.com";
const nf = new Intl.NumberFormat("fr-FR");
export const eurM2 = (n: number) => `${nf.format(n)} €/m²`;

/** « **gras** » → <strong>. */
export const md = (txt: string) =>
  txt.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-bold text-brand-ink">{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );

/** « à Paris 16e » / « à Boulogne-Billancourt ». */
export const aVille = (c: CityData) => `à ${c.name}`;

/** Carte « prix au m² » encadrée, avec la fourchette et les chiffres clés. */
export const PrixCard = ({ city, relief = "orange", stats = true }: { city: CityData; relief?: "orange" | "blue"; stats?: boolean }) => {
  const { low, mid, high, description } = city.pricePerSqm;
  const pos = Math.min(88, Math.max(12, ((mid - low) / Math.max(1, high - low)) * 100));
  return (
    <div className="relative mx-4 mb-4">
      <span aria-hidden className={cn("absolute -bottom-4 -right-4 h-[62%] w-[60%] rounded-[28px]", relief === "orange" ? "bg-brand-orange/90" : "bg-brand")} />
      <div className={cn("relative flex flex-col gap-5 rounded-[24px] bg-white p-6 md:p-7", FRAME_SHADOW)}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">Le marché {aVille(city)}</span>
          <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-brand-tint px-2.5 text-[12.5px] font-bold text-brand"><MapPin className="h-3.5 w-3.5" />{city.postalCodes.join(" · ")}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[14.5px] font-semibold text-brand-mut">Prix moyen d’un appartement</span>
          <span className="font-display text-[32px] sm:text-[40px] leading-none text-brand-ink md:text-[48px]">≈ {eurM2(mid)}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative h-2.5 rounded-full bg-brand-tint">
            <span className="absolute inset-y-0 left-0 right-0 rounded-full bg-gradient-to-r from-[#AFC2DF] via-brand-orange-soft to-brand-orange" />
            <span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_3px_#E68B23]" style={{ left: `${pos}%` }} />
          </div>
          <div className="flex justify-between text-[13px] font-bold text-brand-ink">
            <span>{eurM2(low)}</span>
            <span>{eurM2(high)}</span>
          </div>
        </div>
        <p className="m-0 text-[15px] leading-relaxed text-brand-txt">{description}</p>
        {stats && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {city.stats.filter((s) => !/prix/i.test(s.label)).map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl bg-brand-pale px-3 py-3 sm:flex-col sm:items-start sm:gap-1.5">
                <s.icon className="h-5 w-5 flex-none text-brand-orange-text" />
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-[15.5px] font-bold text-brand-ink">{s.val}</span>
                  <span className="text-[12.5px] text-brand-mut">{s.label}</span>
                </span>
              </div>
            ))}
          </div>
        )}
        <span className="inline-flex items-start gap-1.5 text-[12.5px] leading-snug text-brand-mut">
          <Info className="mt-px h-3.5 w-3.5 flex-none" /> Ordres de grandeur, qui varient selon l’étage, l’état, l’extérieur et la rue. Seule une visite permet un prix précis.
        </span>
      </div>
    </div>
  );
};

/** Maillage interne : les autres pages communes + le lien croisé achat/vente. */
export const AutresSecteurs = ({ current, kind }: { current: CityData; kind: "achat" | "vendre" }) => {
  const autres = cityList.filter((c) => c.slug !== current.slug);
  const prefix = kind === "achat" ? "/achat-appartement-" : "/vendre-appartement-";
  const cross = kind === "achat"
    ? { to: `/vendre-appartement-${current.slug}`, t: `Vous vendez ${aVille(current)} ?`, d: "Prix au m², délais, méthode : tout pour bien vendre votre appartement.", cta: `Vendre ${aVille(current)}` }
    : { to: `/achat-appartement-${current.slug}`, t: `Vous achetez ${aVille(current)} ?`, d: "Les quartiers, les prix et nos biens en vente dans le secteur.", cta: `Acheter ${aVille(current)}` };
  return (
    <section className="bg-white">
      <Container className="grid grid-cols-1 gap-6 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:py-[72px]">
        <Link to={cross.to} className={cn("group flex flex-col gap-2.5 rounded-[22px] bg-brand p-6 text-white transition-transform hover:-translate-y-1 md:p-7", FRAME_SHADOW)}>
          <span className="font-display text-[18.5px] sm:text-[21px] sm:text-[26px] leading-tight">{cross.t}</span>
          <span className="text-[15px] leading-relaxed text-brand-bt">{cross.d}</span>
          <span className="mt-1 inline-flex items-center gap-1.5 text-[15px] font-bold text-white">{cross.cta} <ArrowRight className="h-4 w-4 text-brand-orange transition-transform group-hover:translate-x-1" /></span>
        </Link>
        <div className="flex flex-col gap-3.5 rounded-[22px] border border-brand-line bg-brand-pale p-6 md:p-7">
          <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">{kind === "achat" ? "Acheter dans nos autres secteurs" : "Vendre dans nos autres secteurs"}</span>
          <div className="flex flex-wrap gap-2">
            {autres.map((c) => (
              <Link key={c.slug} to={`${prefix}${c.slug}`} className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-brand-line bg-white px-3.5 text-[14px] font-semibold text-brand-ink transition hover:border-brand-orange hover:bg-[#FFF1DF]">
                <MapPin className="h-3.5 w-3.5 text-brand-orange-text" /> {c.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1 text-[14.5px] font-bold">
            <Link to={kind === "achat" ? "/acheter" : "/vendre"} className="inline-flex min-h-[40px] items-center gap-1.5 text-brand hover:text-brand-orange-text">{kind === "achat" ? "Acheter avec Emilio" : "Vendre avec Emilio"} <ArrowRight className="h-4 w-4 text-brand-orange" /></Link>
            <Link to="/guide-immobilier" className="inline-flex min-h-[40px] items-center gap-1.5 text-brand hover:text-brand-orange-text">Le guide immobilier <ArrowRight className="h-4 w-4 text-brand-orange" /></Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

/** Données structurées communes aux pages de secteur. */
export const agentLd = (city: CityData, url: string) => ({
  "@type": "RealEstateAgent",
  "@id": `${SITE}/#agence`,
  name: "Emilio Immobilier",
  url: SITE,
  telephone: "+33184801400",
  email: "agence@emilio-immo.com",
  areaServed: { "@type": city.slug.startsWith("paris") ? "AdministrativeArea" : "City", name: city.name },
  mainEntityOfPage: url,
});
