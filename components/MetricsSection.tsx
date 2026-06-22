const ACCENT_MAP: Record<string, string> = {
  yellow: "#FFD84D",
  red: "#FF5C5C",
  blue: "#5CC8FF",
  mint: "#7BE495",
  purple: "#A678FF",
};

interface Metric {
  id: string;
  value: string;
  label: string;
  icon: string;
  accent: string;
}

export default function MetricsSection({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="px-4 py-4">
      <h2 className="font-display font-bold text-[18px] text-[#1E1E1E] mb-3">
        By the numbers ✦
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m) => {
          const bg = ACCENT_MAP[m.accent] ?? "#FFD84D";
          return (
            <div
              key={m.id}
              className="rounded-2xl p-3 flex flex-col gap-1"
              style={{
                backgroundColor: bg,
                border: "2.5px solid #1E1E1E",
                boxShadow: "4px 4px 0px #1E1E1E",
              }}
            >
              <span className="text-2xl">{m.icon}</span>
              <p className="font-display font-bold text-[20px] text-[#1E1E1E] leading-tight">
                {m.value}
              </p>
              <p className="font-body text-[11px] text-[#1E1E1E]/70 leading-snug">
                {m.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
