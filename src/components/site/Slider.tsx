/* Photos qui glissent : flèches, clavier et glisser au doigt (ou à la souris).
   Seules trois photos sont dans la page (précédente, actuelle, suivante), le passage de l'une à l'autre est animé. */
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Affiche son contenu directement dans <body>, à l'abri des blocs animés de la page. */
export const Portal = ({ children }: { children: ReactNode }) => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => setEl(document.body), []);
  return el ? createPortal(children, el) : null;
};

/** Bloque le défilement de la page tant qu'une fenêtre est ouverte. */
export const useLockScroll = (on: boolean) => {
  useEffect(() => {
    if (!on) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [on]);
};

const EASE = "transform .44s cubic-bezier(.22,.8,.24,1)";

type SliderProps = {
  images: string[];
  index: number;
  onIndex: (i: number) => void;
  alt: (i: number) => string;
  fit?: "cover" | "contain";
  className?: string;
  imgClassName?: string;
  /** Appui simple sur la photo (sans glisser) */
  onTap?: () => void;
  /** Flèches : claires (sur photo) ou sombres (plein écran) */
  arrows?: "light" | "dark" | false;
  /** Flèches du clavier */
  keys?: boolean;
  arrowSize?: "sm" | "md";
};

export const Slider = ({ images, index, onIndex, alt, fit = "cover", className, imgClassName, onTap, arrows = "light", keys, arrowSize = "md" }: SliderProps) => {
  const n = images.length;
  const box = useRef<HTMLDivElement>(null);
  const [dx, setDx] = useState(0);
  const [anim, setAnim] = useState(false);
  const busy = useRef(false);
  const timer = useRef<number>();
  const drag = useRef<{ x: number; y: number; t: number; id: number; h: boolean | null } | null>(null);
  const width = () => box.current?.offsetWidth || 1;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const settle = useCallback((target: number, then?: () => void) => {
    setAnim(true);
    setDx(target);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setAnim(false);
      then?.();
    }, 440);
  }, []);

  const go = useCallback(
    (d: number) => {
      if (n < 2 || busy.current) return;
      busy.current = true;
      settle(-d * width(), () => {
        onIndex((index + d + n) % n);
        setDx(0);
        busy.current = false;
      });
    },
    [n, index, onIndex, settle],
  );

  useEffect(() => {
    if (!keys) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keys, go]);

  const onDown = (e: React.PointerEvent) => {
    if (busy.current || (e.target as HTMLElement).closest("button,a")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, t: Date.now(), id: e.pointerId, h: null };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const mx = e.clientX - d.x;
    const my = e.clientY - d.y;
    if (d.h === null && (Math.abs(mx) > 6 || Math.abs(my) > 6)) {
      d.h = Math.abs(mx) > Math.abs(my);
      if (d.h) (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    }
    if (d.h) {
      setAnim(false);
      setDx(n < 2 ? mx * 0.25 : mx);
    }
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const mx = e.clientX - d.x;
    if (!d.h) {
      if (d.h === null) onTap?.();
      return;
    }
    const fast = Math.abs(mx) > 30 && Date.now() - d.t < 260;
    if (n > 1 && (Math.abs(mx) > width() * 0.18 || fast)) go(mx < 0 ? 1 : -1);
    else settle(0);
  };
  const onCancel = () => {
    if (drag.current?.h) settle(0);
    drag.current = null;
  };

  if (!n) return <div className={cn("bg-brand-tint", className)} />;

  const slides = n === 1 ? [0] : [-1, 0, 1];
  const btn =
    arrows === "dark"
      ? "bg-white/10 text-white hover:bg-white/20"
      : "bg-white/90 text-brand-ink shadow-md hover:bg-white";
  const sz = arrowSize === "sm" ? "h-9 w-9" : "h-11 w-11";

  return (
    <div
      ref={box}
      className={cn("relative touch-pan-y select-none overflow-hidden", onTap && "cursor-zoom-in", className)}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onCancel}
    >
      {slides.map((k) => {
        const i = (index + k + n) % n;
        return (
          <div
            key={n >= 3 ? String(i) : `${i}:${k}`}
            className="absolute inset-0"
            style={{ transform: `translateX(calc(${k * 100}% + ${dx}px))`, transition: anim ? EASE : "none" }}
            aria-hidden={k !== 0}
          >
            <img
              src={images[i]}
              alt={k === 0 ? alt(i) : ""}
              draggable={false}
              data-fx="1"
              className={cn("pointer-events-none h-full w-full", fit === "cover" ? "object-cover" : "object-contain", imgClassName)}
            />
          </div>
        );
      })}
      {arrows && n > 1 && (
        <>
          <button type="button" aria-label="Photo précédente" onClick={() => go(-1)} className={cn("absolute left-3 top-1/2 z-[2] grid -translate-y-1/2 place-items-center rounded-full transition", sz, btn)}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Photo suivante" onClick={() => go(1)} className={cn("absolute right-3 top-1/2 z-[2] grid -translate-y-1/2 place-items-center rounded-full transition", sz, btn)}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
};
