/* Menu déroulant au style du site (remplace la liste native du navigateur).
   Au clavier : flèches, Entrée, Échap. Au doigt : un appui ouvre, un appui choisit.
   Deux formes : « champ » (pastille d’icône + libellé, dans les recherches) et « pilule » (tri, petits réglages). */
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type Option = { v: string; t: string; d?: string };

export const Choix = ({
  icon,
  label,
  value,
  options,
  onChange,
  className,
  pilule,
  placeholder,
  droite,
}: {
  icon: JSX.Element;
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  className?: string;
  /** Petit bouton arrondi au lieu du grand champ */
  pilule?: boolean;
  /** Texte affiché quand aucune option n’est choisie */
  placeholder?: string;
  /** La liste s’aligne sur le bord droit du bouton */
  droite?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const [haut, setHaut] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const courant = options.find((o) => o.v === value) || (placeholder ? undefined : options[0]);

  useEffect(() => {
    if (!open) return;
    /* Pas assez de place en dessous (barre du bas sur téléphone) : on ouvre vers le haut. */
    const r = btn.current?.getBoundingClientRect();
    const besoin = Math.min(320, options.length * 58 + 16);
    setHaut(!!r && window.innerHeight - r.bottom - 96 < besoin && r.top > besoin + 80);
    setHi(Math.max(0, options.findIndex((o) => o.v === value)));
    const dehors = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", dehors);
    return () => document.removeEventListener("pointerdown", dehors);
  }, [open, options, value]);

  useEffect(() => {
    if (open) list.current?.querySelector<HTMLElement>(`[data-i="${hi}"]`)?.scrollIntoView({ block: "nearest" });
  }, [hi, open]);

  const choisir = (v: string) => {
    onChange(v);
    setOpen(false);
    btn.current?.focus();
  };

  const clavier = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return setOpen(true);
      setHi((h) => (e.key === "ArrowDown" ? Math.min(h + 1, options.length - 1) : Math.max(h - 1, 0)));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) choisir(options[hi].v);
      else setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={box} className={cn("relative min-w-0", !pilule && "flex-1", className)}>
      {pilule ? (
        <button
          ref={btn}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${label} : ${courant?.t ?? placeholder ?? ""}`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={clavier}
          className={cn(
            "inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[14.5px] font-bold transition",
            open ? "bg-white text-brand-ink shadow-[0_0_0_2px_#22497D]" : courant ? "bg-brand-sky text-brand" : "bg-brand-surf text-brand-ink hover:bg-[#EAEFF5]",
          )}
        >
          <span className="flex-none text-brand">{icon}</span>
          {courant?.t ?? placeholder}
          <ChevronDown className={cn("h-4 w-4 flex-none text-brand-mut transition-transform duration-200", open && "rotate-180 text-brand")} />
        </button>
      ) : (
      <button
        ref={btn}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={clavier}
        className={cn(
          "flex h-[58px] w-full min-w-0 items-center gap-3 rounded-[18px] px-3.5 text-left transition md:h-[68px] md:gap-3.5 md:rounded-[20px] md:px-5",
          open ? "bg-white shadow-[0_0_0_2px_#22497D]" : "bg-brand-surf hover:bg-[#EAEFF5]",
        )}
      >
        <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[11px] bg-white text-brand md:h-[38px] md:w-[38px] md:rounded-xl">{icon}</span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[11.5px] font-bold text-brand-mut md:text-xs">{label}</span>
          <span className="truncate text-base font-semibold text-brand-ink">{courant?.t ?? placeholder}</span>
        </span>
        <ChevronDown className={cn("h-[18px] w-[18px] flex-none text-brand-mut transition-transform duration-200", open && "rotate-180 text-brand")} />
      </button>
      )}
      {open && (
        <ul
          ref={list}
          id={id}
          role="listbox"
          aria-label={label}
          className={cn("absolute z-40", pilule ? (droite ? "left-0 sm:left-auto sm:right-0" : "left-0") : "left-0 right-0", haut ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]", " m-0 max-h-[320px] min-w-[260px] list-none overflow-y-auto rounded-[22px] bg-white p-2 shadow-[0_30px_60px_-24px_rgba(19,36,61,0.45),0_0_0_1px_rgba(19,36,61,0.06)]")}
          style={{ animation: "fade-up .18s ease both" }}
        >
          {options.map((o, i) => {
            const sel = o.v === value;
            return (
              <li key={o.v} role="option" aria-selected={sel} data-i={i}>
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => setHi(i)}
                  onClick={() => choisir(o.v)}
                  className={cn(
                    "flex min-h-[48px] w-full items-center justify-between gap-3 rounded-[14px] px-3.5 py-2 text-left transition",
                    sel ? "bg-brand-sky" : i === hi ? "bg-brand-surf" : "bg-white",
                  )}
                >
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className={cn("text-[15px]", sel ? "font-extrabold text-brand" : "font-semibold text-brand-ink")}>{o.t}</span>
                    {o.d && <span className="mt-0.5 text-[12.5px] font-medium text-brand-mut">{o.d}</span>}
                  </span>
                  {sel && (
                    <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-brand text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
