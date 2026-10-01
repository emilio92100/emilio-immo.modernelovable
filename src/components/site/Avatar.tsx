/* Avatar « sphère » des acheteurs (famille, couple, personne) */
import { cn } from "@/lib/utils";

export type AvatarKind = "famille" | "couple" | "personne" | "invest";
export type AvatarColor = "navy" | "orange" | "bleu";

const BG: Record<AvatarColor, string> = {
  navy: "radial-gradient(circle at 34% 28%, #6B92CC 0%, #2E5893 42%, #1A3560 100%)",
  orange: "radial-gradient(circle at 34% 28%, #FFD39B 0%, #EE9A3A 45%, #B8620B 100%)",
  bleu: "radial-gradient(circle at 34% 28%, #9CC0EE 0%, #4F7FC4 45%, #28508E 100%)",
};

const ICON: Record<AvatarKind, JSX.Element> = {
  personne: <><circle cx="12" cy="8.2" r="3.7" /><path d="M4.6 20.2c.9-4 3.8-6.1 7.4-6.1s6.5 2.1 7.4 6.1z" /></>,
  invest: <><circle cx="12" cy="8.2" r="3.7" /><path d="M4.6 20.2c.9-4 3.8-6.1 7.4-6.1s6.5 2.1 7.4 6.1z" /></>,
  couple: <><circle cx="8.8" cy="8.6" r="3.2" /><circle cx="15.4" cy="8.6" r="3.2" /><path d="M2.6 19.8c.6-3.6 3-5.6 6.2-5.6 1.4 0 2.6.4 3.6 1.1 1-.7 2.2-1.1 3.6-1.1 3.2 0 5.6 2 6.2 5.6z" /></>,
  famille: <><circle cx="7.4" cy="7.4" r="2.8" /><circle cx="16.6" cy="7.4" r="2.8" /><circle cx="12" cy="12.6" r="2.2" /><path d="M2.4 19.6c.4-3.4 2.4-5.4 5-5.4 1 0 1.9.3 2.6.8-.6.8-1 1.8-1.1 2.9h-.2v1.7zM21.6 19.6c-.4-3.4-2.4-5.4-5-5.4-1 0-1.9.3-2.6.8.6.8 1 1.8 1.1 2.9h.2v1.7zM8.6 20.4c.3-2.4 1.7-3.8 3.4-3.8s3.1 1.4 3.4 3.8z" /></>,
};

export const Avatar = ({ kind, color, size = 36, className }: { kind: AvatarKind; color: AvatarColor; size?: number; className?: string }) => (
  <span
    className={cn("relative flex flex-none items-center justify-center rounded-full", className)}
    style={{ width: size, height: size, background: BG[color], boxShadow: "0 0 0 2.5px #FFFFFF, 0 6px 12px -4px rgba(19,36,61,.55), inset 0 -4px 8px rgba(0,0,0,.18)" }}
  >
    <svg viewBox="0 0 24 24" aria-hidden style={{ width: Math.round(size * 0.58), height: Math.round(size * 0.58), fill: "#FFFFFF", filter: "drop-shadow(0 1px 1px rgba(0,0,0,.25))" }}>
      {ICON[kind]}
    </svg>
    <span aria-hidden className="absolute rounded-[50%] bg-white/45 blur-[1px]" style={{ left: "22%", top: "12%", width: "34%", height: "22%" }} />
  </span>
);

/* Pictogramme fin des recherches au centre de l'orbite */
const PICTO: Record<AvatarKind, JSX.Element> = {
  famille: <><circle cx="7.6" cy="6.6" r="2.5" /><circle cx="16.4" cy="6.6" r="2.5" /><circle cx="12" cy="12.4" r="1.9" /><path d="M3.2 20v-2.3a4.2 4.2 0 0 1 4.2-4.2h1.2" /><path d="M20.8 20v-2.3a4.2 4.2 0 0 0-4.2-4.2h-1.2" /><path d="M8.9 20v-1a3.1 3.1 0 0 1 6.2 0v1" /></>,
  couple: <><circle cx="8.6" cy="7.4" r="3" /><circle cx="16.2" cy="8.2" r="2.5" /><path d="M2.8 20v-.8a5.2 5.2 0 0 1 5.2-5.2h1.2a5.2 5.2 0 0 1 5.2 5.2v.8" /><path d="M15.6 13.6h1.1a4.5 4.5 0 0 1 4.5 4.5V20" /></>,
  invest: <><circle cx="8.8" cy="7.6" r="3.1" /><path d="M2.8 20v-.6a5.6 5.6 0 0 1 5.6-5.6h.9" /><path d="M13.6 19.2l2.9-3 2 1.9 3-3.8" /><path d="M19.2 14.3h2.3v2.3" /></>,
  personne: <><circle cx="12" cy="7.8" r="3.4" /><path d="M5 20v-.4a6.4 6.4 0 0 1 6.4-6.4h1.2a6.4 6.4 0 0 1 6.4 6.4v.4" /></>,
};
const BADGE = {
  appart: <><rect x="5.5" y="3.5" width="13" height="17" rx="1.6" /><path d="M9.2 7.5h1.6M13.2 7.5h1.6M9.2 11.2h1.6M13.2 11.2h1.6M10.5 20.5v-4h3v4" /></>,
  maison: <><path d="M3.5 11.2 12 4.5l8.5 6.7" /><path d="M5.8 9.6V20h12.4V9.6" /><path d="M10.2 20v-4.6h3.6V20" /></>,
  cle: <><circle cx="8.2" cy="15.3" r="3.9" /><path d="M11 12.5l8.6-8.6M16.6 6.9l2.1 2.1M14.4 9.1l1.8 1.8" /></>,
};
const TINT: Record<AvatarColor, [string, string, string]> = {
  orange: ["#FFF1DF", "#F6D2A6", "#B8620B"],
  navy: ["#E7EDF6", "#C3D0E3", "#22497D"],
  bleu: ["#E5EEFA", "#BFD2EE", "#3C6CB0"],
};

export const Picto = ({ kind, color, badge, size = 56 }: { kind: AvatarKind; color: AvatarColor; badge: keyof typeof BADGE; size?: number }) => {
  const [bg, bd, fg] = TINT[color];
  const sw = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const b = Math.round(size * 0.43);
  return (
    <span
      className="relative flex flex-none items-center justify-center rounded-full"
      style={{ width: size, height: size, color: fg, background: `radial-gradient(circle at 32% 26%, #FFFFFF 0%, ${bg} 72%)`, boxShadow: `inset 0 0 0 1px ${bd}, 0 8px 18px -10px rgba(19,36,61,.45)` }}
    >
      <svg viewBox="0 0 24 24" aria-hidden style={{ width: Math.round(size * 0.52), height: Math.round(size * 0.52), ...sw }}>{PICTO[kind]}</svg>
      <span
        className="absolute flex items-center justify-center rounded-full bg-white"
        style={{ right: -Math.round(size * 0.06), bottom: -Math.round(size * 0.04), width: b, height: b, color: fg, boxShadow: `0 0 0 1px ${bd}, 0 4px 10px -4px rgba(19,36,61,.4)` }}
      >
        <svg viewBox="0 0 24 24" aria-hidden style={{ width: Math.round(b * 0.58), height: Math.round(b * 0.58), ...sw, strokeWidth: 1.9 }}>{BADGE[badge]}</svg>
      </span>
    </span>
  );
};
