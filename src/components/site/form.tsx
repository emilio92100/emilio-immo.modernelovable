/* Champs et choix des formulaires (estimation, contact, recherche) */
import { type ReactNode, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Field = ({
  label,
  suffix,
  icon,
  className,
  area,
  ...rest
}: { label: string; suffix?: string; icon?: ReactNode; area?: boolean; className?: string } & InputHTMLAttributes<HTMLInputElement>) => (
  <label
    className={cn(
      "flex min-w-0 flex-col gap-1 rounded-xl border border-[#D5DEEA] bg-white px-3.5 py-2.5 transition focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgba(34,73,125,0.12)]",
      className,
    )}
  >
    <span className="text-[12.5px] font-bold text-brand-mut">{label}</span>
    <span className="flex items-center gap-2.5">
      {icon && <span className="inline-flex text-brand-mut">{icon}</span>}
      {area ? (
        <textarea
          rows={3}
          value={rest.value as string}
          onChange={rest.onChange as never}
          placeholder={rest.placeholder}
          className="w-full min-w-0 resize-none border-0 bg-transparent p-0 text-base text-brand-ink outline-none placeholder:text-[#8A97A8]"
        />
      ) : (
        <input {...rest} className="w-full min-w-0 border-0 bg-transparent p-0 text-base text-brand-ink outline-none placeholder:text-[#8A97A8]" />
      )}
      {suffix && <span className="text-[15px] font-bold text-brand-mut">{suffix}</span>}
    </span>
  </label>
);

export const Group = ({ title, optional, hint, children, className }: { title: string; optional?: boolean; hint?: string; children: ReactNode; className?: string }) => (
  <fieldset className={cn("m-0 flex min-w-0 flex-col gap-2.5 border-0 p-0", className)}>
    <legend className="mb-2.5 p-0 text-[14.5px] font-extrabold text-brand-ink">
      {title}
      {optional && <span className="font-semibold text-brand-mut"> (facultatif)</span>}
    </legend>
    {hint && <span className="-mt-1 text-[13.5px] text-brand-mut">{hint}</span>}
    {children}
  </fieldset>
);

/** Grande carte de choix avec icône (type de bien, projet…). */
export const Tile = ({ icon, label, sub, on, onClick, compact }: { icon: ReactNode; label: string; sub?: string; on: boolean; onClick: () => void; compact?: boolean }) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={cn(
      "relative flex min-w-0 text-left transition",
      compact ? "flex-row items-center gap-3 rounded-[14px] py-3 pl-3 pr-9" : "flex-col items-start gap-2.5 rounded-2xl p-4",
      on ? "border-[1.5px] border-brand-orange bg-[#FFF6EB] shadow-[0_10px_24px_-14px_rgba(184,98,11,0.6)]" : "border border-brand-line bg-white hover:border-brand/40",
    )}
  >
    <span className={cn("grid flex-none place-items-center rounded-xl", compact ? "h-9 w-9" : "h-11 w-11", on ? "bg-brand-orange text-brand-ink" : "bg-brand-tint text-brand")}>{icon}</span>
    <span className="flex flex-col gap-0.5">
      <span className="text-[15px] font-extrabold leading-tight text-brand-ink">{label}</span>
      {sub && <span className="text-[12.5px] leading-tight text-brand-mut">{sub}</span>}
    </span>
    {on && (
      <span className={cn("absolute right-2.5 grid h-[22px] w-[22px] place-items-center rounded-full bg-brand-orange text-brand-ink", compact ? "top-1/2 -translate-y-1/2" : "top-2.5")}>
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    )}
  </button>
);

/** Pastilles à choix (simple ou multiple). */
export function Pills<T extends string>({ options, value, onToggle, icon, size = "md" }: { options: readonly T[]; value: T[]; onToggle: (v: T) => void; icon?: ReactNode; size?: "sm" | "md" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(o)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 font-semibold transition",
              size === "sm" ? "h-10 text-[13.5px]" : "h-[42px] text-sm",
              on ? "border-brand bg-brand font-bold text-white" : "border-brand-line bg-white text-brand-ink hover:border-brand/40",
            )}
          >
            {icon && <span className={on ? "text-white" : "text-brand-orange-text"}>{icon}</span>}
            {o}
          </button>
        );
      })}
    </div>
  );
}

/** Choix segmenté (une seule valeur, ou plusieurs si `multi`). */
export function Segmented<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T[]; onChange: (v: T) => void }) {
  return (
    <div role="group" className="flex gap-1 rounded-[14px] border border-brand-line bg-brand-pale p-1">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o)}
            className={cn(
              "h-11 min-w-0 flex-1 rounded-[10px] px-1.5 text-[13.5px] leading-tight transition sm:text-[14.5px]",
              on ? "bg-white font-extrabold text-brand-ink shadow-[0_4px_12px_-6px_rgba(19,36,61,0.45),0_0_0_1.5px_#E68B23]" : "font-semibold text-brand-mut hover:text-brand-ink",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export const Toggle = ({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    onClick={onClick}
    className={cn("flex min-h-[52px] min-w-0 items-center justify-between gap-3 rounded-xl border px-3.5 transition", on ? "border-brand-orange bg-[#FFF6EB]" : "border-brand-line bg-white")}
  >
    <span className="text-[15px] font-bold text-brand-ink">{label}</span>
    <span aria-hidden className={cn("relative h-[26px] w-11 flex-none rounded-full transition", on ? "bg-brand" : "bg-[#CBD5E1]")}>
      <span className={cn("absolute top-[3px] h-5 w-5 rounded-full bg-white shadow transition-all", on ? "left-[21px]" : "left-[3px]")} />
    </span>
  </button>
);

export const Steps = ({ labels, current, compact }: { labels: string[]; current: number; compact?: boolean }) => (
  <div aria-label={`Étape ${Math.min(current, labels.length)} sur ${labels.length}`} className="flex items-center gap-2.5">
    {labels.map((t, i) => {
      const n = i + 1;
      const done = n < current;
      const now = n === current;
      return (
        <span key={t} className={cn("flex items-center gap-2.5", i < labels.length - 1 && "flex-1")}>
          <span className="flex flex-none items-center gap-2">
            <span
              className={cn(
                "grid h-[30px] w-[30px] place-items-center rounded-full text-[13.5px] font-extrabold",
                done && "bg-brand text-white",
                now && "bg-brand-orange text-brand-ink outline outline-4 outline-brand-orange/25",
                !done && !now && "bg-white text-brand-ink shadow-[0_0_0_1.5px_#C3CEDB]",
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : n}
            </span>
            {(!compact || now) && <span className={cn("whitespace-nowrap text-[13.5px]", now ? "font-extrabold text-brand-ink" : done ? "font-semibold text-brand-ink" : "font-semibold text-brand-mut")}>{t}</span>}
          </span>
          {i < labels.length - 1 && <span aria-hidden className={cn("h-0.5 min-w-3 flex-1 rounded", done ? "bg-brand" : "bg-brand-line")} />}
        </span>
      );
    })}
  </div>
);

export const Consent = ({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) => (
  <label className="flex items-start gap-2.5 text-[13.5px] leading-normal text-brand-txt">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-5 w-5 flex-none accent-brand" />
    <span>
      {children}{" "}
      <a href="/mentions-legales#donnees" target="_blank" rel="noreferrer" className="font-bold text-brand underline">
        Politique de confidentialité
      </a>
    </span>
  </label>
);

export function toggleIn<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}
