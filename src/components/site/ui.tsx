/* ═══ Briques communes du site (refonte 2026, direction « Tuiles ») ═══════════
   Bleu Emilio #22497D, encre #13243D, orange #E68B23.
   Tout en Plus Jakarta Sans : titres très gras, mots mis en valeur en bleu Emilio. */
import { forwardRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const TEL = "01 84 80 14 00";
export const TEL_HREF = "tel:+33184801400";
export const MAIL = "agence@emilio-immo.com";

/** Ombre « cadre » des cartes encadrées. */
export const FRAME_SHADOW = "shadow-[0_0_0_1px_rgba(19,36,61,0.06),0_2px_4px_rgba(19,36,61,0.03),0_28px_56px_-34px_rgba(19,36,61,0.42)]";

export const Container = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mx-auto w-full max-w-[1296px] px-5 sm:px-8", className)}>{children}</div>
);

export const Section = ({ children, className, id, tone = "white" }: { children: ReactNode; className?: string; id?: string; tone?: "white" | "pale" | "blue" }) => (
  <section
    id={id}
    className={cn(
      "relative",
      tone === "white" && "bg-white",
      tone === "pale" && "bg-brand-pale",
      tone === "blue" && "bg-brand text-brand-bt",
      className,
    )}
  >
    {children}
  </section>
);

/** Surtitre : une petite pastille au-dessus du titre. */
export const Eyebrow = ({ children, dark, center, icon }: { children: ReactNode; dark?: boolean; center?: boolean; line?: boolean; icon?: ReactNode }) => (
  <span
    className={cn(
      "inline-flex min-h-8 max-w-full items-center gap-2 self-start rounded-full px-3.5 py-1 text-[12.5px] font-extrabold uppercase leading-tight tracking-[0.12em]",
      dark ? "bg-white/10 text-[#F9C98A]" : "bg-brand-sky text-brand",
      center && "self-center",
    )}
  >
    {icon ?? <span aria-hidden className={cn("h-1.5 w-1.5 flex-none rounded-full", dark ? "bg-brand-orange" : "bg-brand-orange")} />}
    <span>{children}</span>
  </span>
);

export const Em = ({ children, dark, wrap }: { children: ReactNode; dark?: boolean; wrap?: boolean }) => (
  <em className={cn("not-italic", dark ? "text-[#F9C98A]" : "text-brand", !wrap && "whitespace-nowrap")}>{children}</em>
);

/** Le trait bleu Emilio sous un mot : le même partout sur le site (accueil, nos biens, fenêtres…). */
export const Souligne = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("relative z-0 whitespace-nowrap", className)}>
    {children}
    <svg aria-hidden viewBox="0 0 300 22" preserveAspectRatio="none" className="pointer-events-none absolute -left-[0.04em] top-full -mt-[0.15em] h-[0.29em] w-[calc(100%-0.02em)] overflow-visible">
      <path d="M4 15 C 70 6, 170 3, 296 9" fill="none" stroke="#22497D" strokeWidth="7" strokeLinecap="round" pathLength={1} className="trait-dessine" />
    </svg>
  </span>
);

/** Ancien filet orange sous les titres : retiré avec le nouveau style (gardé pour ne rien casser). */
export const Filet = (_: { center?: boolean }) => null;

/** En-tête de section : surtitre, titre, filet orange, chapô. */
export const SectionHead = ({
  eyebrow,
  title,
  lead,
  center,
  dark,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) => (
  <div className={cn("flex max-w-[760px] flex-col gap-3 sm:gap-4", center && "mx-auto items-center text-center", className)}>
    {eyebrow && <Eyebrow dark={dark} center={center}>{eyebrow}</Eyebrow>}
    <Tag
      className={cn(
        "m-0 font-display font-extrabold leading-[1.08] tracking-[-0.03em] text-balance",
        Tag === "h1" ? "text-[30px] sm:text-[clamp(36px,4.2vw,58px)] leading-[1.04] sm:tracking-[-0.035em]" : "text-[27px] sm:text-[clamp(30px,3.2vw,46px)] sm:tracking-[-0.035em]",
        dark ? "text-white" : "text-brand-ink",
      )}
    >
      {title}
    </Tag>
    <Filet center={center} />
    {lead && <p className={cn("m-0 max-w-[640px] text-[15px] font-medium leading-relaxed text-pretty sm:text-[17px]", dark ? "text-brand-bt" : "text-brand-mut")}>{lead}</p>}
  </div>
);

type BtnVariant = "orange" | "blue" | "outline" | "ghost" | "white";
const BTN: Record<BtnVariant, string> = {
  orange: "bg-brand-orange text-brand-ink hover:brightness-105",
  blue: "bg-brand text-white hover:bg-brand-deep",
  outline: "bg-brand-surf text-brand-ink hover:bg-brand-sky",
  ghost: "bg-transparent text-white border-[1.5px] border-white/55 hover:bg-white/10",
  white: "bg-white text-brand-ink hover:bg-brand-surf",
};

type BtnProps = {
  children: ReactNode;
  variant?: BtnVariant;
  to?: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  iconLeft?: ReactNode;
  full?: boolean;
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export const Btn = forwardRef<HTMLElement, BtnProps>(function Btn(
  { children, variant = "orange", to, href, onClick, icon, iconLeft, full, size = "md", className, type = "button", disabled },
  ref,
) {
  const cls = cn(
    "inline-flex max-w-full items-center justify-center gap-2.5 rounded-2xl py-2 text-center font-bold leading-tight transition-all hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50 sm:whitespace-nowrap [&>svg]:flex-none",
    size === "lg" ? "min-h-[54px] px-6 text-base" : "min-h-[50px] px-5 text-[15.5px]",
    BTN[variant],
    full && "w-full",
    className,
  );
  const inner = (
    <>
      {iconLeft}
      {children}
      {icon}
    </>
  );
  if (to) return <Link ref={ref as never} to={to} className={cls} onClick={onClick}>{inner}</Link>;
  if (href) return <a ref={ref as never} href={href} className={cls} onClick={onClick}>{inner}</a>;
  return (
    <button ref={ref as never} type={type} className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
});

export const Chip = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("inline-flex h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[13px] font-bold text-brand-ink", className)}>{children}</span>
);

/** Fil d'Ariane simple. */
export const Crumbs = ({ items }: { items: { label: string; to?: string }[] }) => (
  <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
    {items.map((it, i) => (
      <span key={it.label} className="inline-flex items-center gap-2.5">
        {it.to ? (
          <Link to={it.to} className="inline-flex min-h-[44px] items-center font-medium text-brand-mut hover:text-brand-orange-text">
            {it.label}
          </Link>
        ) : (
          <span aria-current="page" className="font-semibold text-brand-ink">{it.label}</span>
        )}
        {i < items.length - 1 && <span aria-hidden className="text-[#9AA7B8]">/</span>}
      </span>
    ))}
  </nav>
);

/** Ligne de confiance : les seuls chiffres validés. */
export const TrustRow = ({ dark, className }: { dark?: boolean; className?: string }) => (
  <div className={cn("flex flex-wrap gap-x-9 gap-y-4", className)}>
    {[
      ["Depuis 2020", "agence indépendante"],
      ["200+", "clients accompagnés"],
      ["10+ ans", "de métier"],
    ].map(([a, b]) => (
      <div key={a} className="flex flex-col leading-tight">
        <span className={cn("font-display text-[20px] sm:text-2xl font-extrabold tracking-[-0.025em]", dark ? "text-white" : "text-brand-ink")}>{a}</span>
        <span className={cn("text-[13px] font-semibold", dark ? "text-brand-bt" : "text-brand-mut")}>{b}</span>
      </div>
    ))}
  </div>
);

/** Liste à coches orange. */
export const Checks = ({ items, dark, className }: { items: ReactNode[]; dark?: boolean; className?: string }) => (
  <ul className={cn("m-0 flex list-none flex-col gap-2.5 p-0", className)}>
    {items.map((it, i) => (
      <li key={i} className={cn("flex items-start gap-2.5 text-[14.5px] leading-normal sm:text-[15.5px]", dark ? "text-brand-bt" : "text-brand-txt")}>
        <svg viewBox="0 0 24 24" aria-hidden className={cn("mt-0.5 h-[18px] w-[18px] flex-none fill-none stroke-[2.4]", dark ? "stroke-brand-orange" : "stroke-brand-orange-text")} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

/** Petit lien texte avec flèche. */
export const TextLink = ({ children, to, onClick, dark }: { children: ReactNode; to?: string; onClick?: () => void; dark?: boolean }) => {
  const cls = cn("inline-flex min-h-[44px] items-center gap-1.5 text-[15.5px] font-bold", dark ? "text-white" : "text-brand hover:text-brand-orange-text");
  const arrow = (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-none stroke-brand-orange stroke-[2.2]" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
  if (to) return <Link to={to} className={cls}>{children}{arrow}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{children}{arrow}</button>;
};
