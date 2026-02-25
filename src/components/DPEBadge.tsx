interface DPEBadgeProps {
  label: string;
  value?: string;
  type: "energy" | "ges";
  consoValue?: number;
}

const energyColors: Record<string, string> = {
  A: "bg-green-600",
  B: "bg-green-400",
  C: "bg-yellow-400",
  D: "bg-yellow-500",
  E: "bg-orange-400",
  F: "bg-orange-600",
  G: "bg-red-600",
};

const gesColors: Record<string, string> = {
  A: "bg-indigo-200",
  B: "bg-indigo-300",
  C: "bg-indigo-400",
  D: "bg-indigo-500",
  E: "bg-indigo-600",
  F: "bg-indigo-700",
  G: "bg-indigo-800",
};

const allLetters = ["A", "B", "C", "D", "E", "F", "G"];

const DPEBadge = ({ label, value, type, consoValue }: DPEBadgeProps) => {
  const colors = type === "energy" ? energyColors : gesColors;
  const unit = type === "energy" ? "kWh/m²/an" : "kg CO₂/m²/an";

  if (!value) {
    return (
      <div>
        <h4 className="font-display text-sm font-semibold text-foreground mb-3">{label}</h4>
        <div className="bg-muted/50 border border-border rounded p-4 text-center">
          <p className="font-body text-muted-foreground text-sm font-semibold">DPE NON DISPONIBLE</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="font-display text-sm font-semibold text-foreground mb-3">{label}</h4>
      <div className="flex flex-col gap-1">
        {allLetters.map((letter) => {
          const isActive = letter === value.toUpperCase();
          const widthPercent = 30 + allLetters.indexOf(letter) * 10;
          return (
            <div
              key={letter}
              className={`flex items-center justify-between rounded-r-full px-3 py-0.5 text-xs font-bold transition-all ${
                colors[letter]
              } ${isActive ? "ring-2 ring-foreground/30 scale-105 shadow-md" : "opacity-40"}`}
              style={{ width: `${widthPercent}%`, minWidth: "40px" }}
            >
              <span className="text-white">{letter}</span>
              {isActive && consoValue ? (
                <span className="text-white text-[10px] font-semibold ml-1 whitespace-nowrap">
                  {consoValue} {unit}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DPEBadge;
