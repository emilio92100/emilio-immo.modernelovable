/* L’écran de l’espace client acheteur, tel qu’on le voit sur le téléphone.
   Utilisé sur la page Acheter et dans la fenêtre « Vos futurs biens, dans votre poche ». */
import { CalendarDays, EyeOff, Heart, Home, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ESP_BLUE = "linear-gradient(160deg, #4d6c9e 0%, #3a5886 55%, #46659a 100%)";

export const PhoneScreen = ({ photos }: { photos: string[] }) => {
  const [a, b] = [photos[0], photos[1] || photos[0]];
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f4f6fa] font-jakarta">
      <div className="relative overflow-hidden pb-[18px]" style={{ background: ESP_BLUE }}>
        <div className="flex items-center justify-between px-[18px] pb-1 pt-2.5 text-[11.5px] font-bold text-white"><span>9:41</span><span className="h-[9px] w-4 rounded-[2px] border-[1.5px] border-white" /></div>
        <span aria-hidden className="absolute -right-10 -top-8 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(236,210,138,0.35) 0%, rgba(236,210,138,0) 70%)" }} />
        <div className="relative flex flex-col gap-1.5 px-[18px] pt-2">
          <span className="text-[9.5px] font-extrabold tracking-[0.24em] text-[#ecd28a]">EMILIO IMMOBILIER</span>
          <span className="text-[21px] font-extrabold text-white">Bonjour Claire</span>
          <span className="font-body text-xs leading-snug text-white/85">Un 5 pièces familial à Boulogne-Billancourt</span>
          <span className="inline-flex h-6 items-center gap-1.5 self-start rounded-full bg-[rgba(22,163,74,0.2)] px-2.5 text-[11px] font-extrabold text-[#bbf7d0]"><span className="anim-blink h-1.5 w-1.5 rounded-full bg-[#4ade80]" />Recherche en cours</span>
        </div>
      </div>
      <div className="flex flex-col gap-[7px] px-3.5 pt-3">
        <span className="text-[13px] font-extrabold text-[#1a2332]">Aujourd’hui pour vous</span>
        <div className="flex gap-1.5">
          {[["2", "nouveaux biens", "#e0822e"], ["1", "avis à donner", "#1a2332"], ["1", "visite prévue", "#7b6ba8"]].map(([n, t, c]) => (
            <div key={t} className="flex flex-1 flex-col gap-px rounded-xl bg-white px-2 py-[9px] shadow-[0_6px_14px_-10px_rgba(26,35,50,0.4)]">
              <span className="text-[19px] font-extrabold" style={{ color: c }}>{n}</span>
              <span className="font-body text-[10px] leading-tight text-[#64748b]">{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-3.5 mt-2.5 h-[146px] overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1.5px_#e0822e,0_12px_24px_-14px_rgba(26,35,50,0.5)]">
        {[{ img: a, p: "1 099 000 €", l: "5 pièces · 112 m² · Boulogne-Billancourt", pc: 96 }, { img: b, p: "1 650 000 €", l: "5 pièces · 100 m² · Paris 6e", pc: 91 }].map((s, i) => (
          <div key={i} className="absolute inset-0" style={{ animation: "ec-swap 10s ease-in-out infinite both", animationDelay: i ? "-5s" : "0s", opacity: i ? 0 : 1 }}>
            <div className="relative h-[92px]">
              <img src={s.img} alt="" className="block h-full w-full object-cover" />
              <span className="absolute left-2 top-2 inline-flex h-5 items-center rounded-full bg-[#e0822e] px-2 text-[10px] font-extrabold text-white">Nouveau</span>
              <span className="absolute bottom-2 right-2 inline-flex h-[22px] items-center rounded-full bg-white/95 px-2 text-[10px] font-extrabold text-[#1a2332]">{s.pc} % correspondance</span>
            </div>
            <div className="flex flex-col gap-0.5 bg-white px-[11px] pb-2.5 pt-[9px]">
              <span className="text-[15px] font-extrabold text-[#1a2332]">{s.p}</span>
              <span className="font-body text-[11px] text-[#64748b]">{s.l}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-3.5 mt-2 flex flex-col gap-[7px] rounded-[14px] bg-white p-[9px] shadow-[0_8px_18px_-12px_rgba(26,35,50,0.45)]">
        <span className="text-[11.5px] font-extrabold text-[#1a2332]">Qu’en pensez-vous ?</span>
        <div className="flex gap-[5px]">
          {[[<Heart key="h" className="h-4 w-4" />, "Ça me plaît", "#dcfce7", "#15803d"], [<CalendarDays key="c" className="h-4 w-4" />, "Je veux visiter", "#ede9fe", "#6d28d9"], [<EyeOff key="e" className="h-4 w-4" />, "Pas pour moi", "#f3e8e6", "#8a5a54"]].map(([ic, t, bg, fg], k) => (
            <span key={k} className="relative flex flex-1 flex-col items-center gap-[3px] overflow-hidden rounded-[10px] px-0.5 py-[7px]" style={{ background: bg as string, color: fg as string }}>
              {ic}
              <span className="whitespace-nowrap text-[9.5px] font-extrabold">{t}</span>
              {k === 0 && <span aria-hidden className="anim-tap absolute left-1/2 top-1/2 -ml-[23px] -mt-[23px] h-[46px] w-[46px] rounded-full bg-[rgba(22,163,74,0.35)]" />}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-[#e3e8f0] bg-white px-2.5 pb-3.5 pt-2">
        {[[Home, "Accueil"], [Sparkles, "Nouveautés"], [Heart, "Consultés"], [Search, "Recherche"], [CalendarDays, "Visites"]].map(([I, t], i) => {
          const Icon = I as typeof Home;
          return (
            <span key={t as string} className={cn("flex flex-col items-center gap-0.5", i === 0 ? "text-[#3a5886]" : "text-[#94a3b8]")}>
              <Icon className="h-[17px] w-[17px]" />
              <span className="text-[9px] font-bold">{t as string}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
