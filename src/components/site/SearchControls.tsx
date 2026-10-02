/* Champs du formulaire « Confier ma recherche » :
   - villes et arrondissements tapés librement, avec les suggestions de la Base Adresse Nationale ;
   - curseurs pour le budget et la surface. */
import { useEffect, useRef, useState } from "react";
import { Check, Loader2, MapPin, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Villes ── */
type Ville = { label: string; sub: string };

const nomVille = (name: string) =>
  name.replace(/^Paris (\d+)(?:er|e) Arrondissement$/i, (_, n) => `Paris ${n}${n === "1" ? "er" : "e"}`)
    .replace(/^(Lyon|Marseille) (\d+)(?:er|e) Arrondissement$/i, (_, v, n) => `${v} ${n}${n === "1" ? "er" : "e"}`);

const SOURCES = [
  (q: string) => `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&type=municipality&autocomplete=1&limit=7&lat=48.8566&lon=2.3522`,
  (q: string) => `https://data.geopf.fr/geocodage/search?q=${encodeURIComponent(q)}&index=address&type=municipality&autocomplete=1&limit=7&lat=48.8566&lon=2.3522`,
];

type Feature = { properties: { name?: string; label?: string; postcode?: string; context?: string } };

async function chercherVilles(q: string, signal: AbortSignal): Promise<Ville[]> {
  for (const url of SOURCES) {
    try {
      const r = await fetch(url(q), { signal });
      if (!r.ok) continue;
      const d = (await r.json()) as { features?: Feature[] };
      const seen = new Set<string>();
      const out: Ville[] = [];
      for (const f of d.features || []) {
        const p = f.properties || {};
        const label = nomVille(p.name || p.label || "");
        if (!label || seen.has(label)) continue;
        seen.add(label);
        const dep = (p.context || "").split(",").map((s) => s.trim())[1] || "";
        const ville = /^(Paris|Lyon|Marseille)$/i.test(label);
        out.push({ label, sub: ville ? `Toute la ville · ${dep}` : [p.postcode, dep].filter(Boolean).join(" · ") });
      }
      return out;
    } catch (e) {
      if ((e as Error).name === "AbortError") throw e;
    }
  }
  return [];
}

export const CityPicker = ({ value, onChange, placeholder = "Une ville, un arrondissement…" }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) => {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<Ville[]>([]);
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = q.trim();
    if (t.length < 2) {
      setRes([]);
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    const id = window.setTimeout(() => {
      chercherVilles(t, ctrl.signal)
        .then((list) => {
          setRes(list);
          setHi(0);
          setLoading(false);
        })
        .catch(() => undefined);
    }, 220);
    return () => {
      ctrl.abort();
      window.clearTimeout(id);
    };
  }, [q]);

  useEffect(() => {
    const out = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", out);
    return () => document.removeEventListener("pointerdown", out);
  }, []);

  const add = (label: string) => {
    const l = label.trim();
    if (!l) return;
    if (!value.some((v) => v.toLowerCase() === l.toLowerCase())) onChange([...value, l]);
    setQ("");
    setRes([]);
    input.current?.focus();
  };
  const list = res.filter((v) => !value.includes(v.label));
  const libre = q.trim().length >= 2 && !loading && !list.some((v) => v.label.toLowerCase() === q.trim().toLowerCase());
  const items: { label: string; sub: string; free?: boolean }[] = [...list, ...(libre ? [{ label: q.trim(), sub: "Ajouter tel quel", free: true }] : [])];

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHi((h) => Math.min(h + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" || e.key === ",") {
      if (!q.trim()) return;
      e.preventDefault();
      add(items[hi]?.label || q);
    } else if (e.key === "Backspace" && !q && value.length) {
      onChange(value.slice(0, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={box} className="relative">
      <div
        className="flex min-h-[56px] flex-wrap items-center gap-2 rounded-2xl border border-[#D5DEEA] bg-white px-3 py-2.5 transition focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgba(34,73,125,0.12)]"
        onClick={() => input.current?.focus()}
      >
        <MapPin className="ml-0.5 h-[18px] w-[18px] flex-none text-brand-orange-text" />
        {value.map((v) => (
          <span key={v} className="inline-flex h-9 max-w-full items-center gap-1.5 rounded-full bg-brand pl-3.5 pr-1.5 text-[14px] font-bold text-white">
            <span className="truncate">{v}</span>
            <button type="button" aria-label={`Retirer ${v}`} onClick={(e) => { e.stopPropagation(); onChange(value.filter((x) => x !== v)); }} className="grid h-6 w-6 flex-none place-items-center rounded-full bg-white/15 hover:bg-white/30">
              <X className="h-3.5 w-3.5" strokeWidth={2.6} />
            </button>
          </span>
        ))}
        <input
          ref={input}
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={value.length ? "Ajouter une autre ville…" : placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="done"
          aria-label="Ville ou arrondissement"
          className="h-9 min-w-[150px] flex-1 border-0 bg-transparent p-0 text-base text-brand-ink outline-none placeholder:text-[#8A97A8]"
        />
        {loading && <Loader2 className="h-4 w-4 flex-none animate-spin text-brand-mut" />}
      </div>
      {value.length > 0 && (
        <span className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-[#2E7D5B]">
          <Check className="h-4 w-4" strokeWidth={2.6} />
          {value.length === 1 ? "1 ville choisie" : `${value.length} villes choisies`} : tapez-en une autre pour l’ajouter.
        </span>
      )}
      {open && items.length > 0 && (
        <ul role="listbox" className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 m-0 max-h-[290px] list-none overflow-y-auto rounded-2xl border border-brand-line bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(19,36,61,0.45)]" style={{ animation: "fade-up .18s ease both" }}>
          {items.map((v, k) => (
            <li key={v.label + (v.free ? "+" : "")} role="option" aria-selected={k === hi}>
              <button
                type="button"
                onMouseEnter={() => setHi(k)}
                onClick={() => add(v.label)}
                className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition", k === hi ? "bg-brand-pale" : "bg-white")}
              >
                <span className={cn("grid h-9 w-9 flex-none place-items-center rounded-lg", v.free ? "bg-[#FFF3E6] text-brand-orange-text" : "bg-brand-tint text-brand")}>
                  {v.free ? <Plus className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate text-[15px] font-bold text-brand-ink">{v.free ? `« ${v.label} »` : v.label}</span>
                  {v.sub && <span className="text-[12.5px] text-brand-mut">{v.sub}</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ── Curseurs ── */
export const BUDGET_STEPS = (() => {
  const a: number[] = [];
  for (let v = 100_000; v < 1_000_000; v += 25_000) a.push(v);
  for (let v = 1_000_000; v < 2_000_000; v += 50_000) a.push(v);
  for (let v = 2_000_000; v <= 5_000_000; v += 100_000) a.push(v);
  return a;
})();

const nf = new Intl.NumberFormat("fr-FR");
export const euros = (v: number) => `${nf.format(v)} €`;

/** Curseur à deux poignées (minimum et maximum). */
export const RangeDual = ({
  steps,
  lo,
  hi,
  onChange,
  format,
  labels = ["minimum", "maximum"],
}: {
  steps: number[];
  lo: number;
  hi: number;
  onChange: (lo: number, hi: number) => void;
  format: (v: number, last: boolean) => string;
  labels?: [string, string];
}) => {
  const max = steps.length - 1;
  const pct = (i: number) => (i / max) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-display text-[23px] font-extrabold leading-tight text-brand-ink sm:text-[26px] tracking-[-0.025em]">
        <span>{format(steps[lo], false)}</span>
        <span className="text-brand-mut">–</span>
        <span>{format(steps[hi], hi === max)}</span>
      </div>
      <div className="em-range-wrap relative h-10">
        <div className="absolute inset-y-0 left-[14px] right-[14px]">
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-line" />
          <div className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-orange" style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }} />
        </div>
        <input type="range" min={0} max={max} step={1} value={lo} aria-label={labels[0]} aria-valuetext={format(steps[lo], false)} onChange={(e) => onChange(Math.min(+e.target.value, hi - 1), hi)} className="em-range" style={{ zIndex: lo > max - 4 ? 4 : 3 }} />
        <input type="range" min={0} max={max} step={1} value={hi} aria-label={labels[1]} aria-valuetext={format(steps[hi], hi === max)} onChange={(e) => onChange(lo, Math.max(+e.target.value, lo + 1))} className="em-range" style={{ zIndex: 3 }} />
      </div>
      <div className="flex justify-between text-[12.5px] font-semibold text-brand-mut">
        <span>{format(steps[0], false)}</span>
        <span>{format(steps[max], true)}</span>
      </div>
    </div>
  );
};

/** Curseur simple. */
export const RangeOne = ({ min, max, step, value, onChange, format, label }: { min: number; max: number; step: number; value: number; onChange: (v: number) => void; format: (v: number) => string; label: string }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="font-display text-[22px] font-extrabold leading-tight text-brand-ink tracking-[-0.025em]">{format(value)}</div>
      <div className="em-range-wrap relative h-10">
        <div className="absolute inset-y-0 left-[14px] right-[14px]">
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-line" />
          <div className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-orange" style={{ width: `${pct}%` }} />
        </div>
        <input type="range" min={min} max={max} step={step} value={value} aria-label={label} aria-valuetext={format(value)} onChange={(e) => onChange(+e.target.value)} className="em-range em-range-one" />
      </div>
    </div>
  );
};
