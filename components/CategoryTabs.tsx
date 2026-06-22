"use client";

const CATEGORIES = [
  { id: "All", label: "All ✦" },
  { id: "Featured", label: "⭐ Featured" },
  { id: "Gadgets", label: "⚡ Gadgets" },
  { id: "Toys", label: "🧸 Toys" },
  { id: "Collectibles", label: "💎 Collectibles" },
  { id: "Gifting", label: "🎁 Gifting" },
  { id: "Amazon", label: "📦 Amazon" },
  { id: "Flipkart", label: "🛒 Flipkart" },
  { id: "Sponsored", label: "✅ Sponsored" },
];

const CHIP_COLORS: Record<string, { bg: string; activeBg: string }> = {
  All: { bg: "bg-white", activeBg: "bg-[#1E1E1E]" },
  Featured: { bg: "bg-white", activeBg: "bg-[#FFD84D]" },
  Gadgets: { bg: "bg-white", activeBg: "bg-[#5CC8FF]" },
  Toys: { bg: "bg-white", activeBg: "bg-[#FF5C5C]" },
  Collectibles: { bg: "bg-white", activeBg: "bg-[#A678FF]" },
  Gifting: { bg: "bg-white", activeBg: "bg-[#7BE495]" },
  Amazon: { bg: "bg-white", activeBg: "bg-[#FFD84D]" },
  Flipkart: { bg: "bg-white", activeBg: "bg-[#5CC8FF]" },
  Sponsored: { bg: "bg-white", activeBg: "bg-[#7BE495]" },
};

interface CategoryTabsProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="px-4 py-2">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          const colors = CHIP_COLORS[cat.id] ?? CHIP_COLORS.All;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-xl font-display font-semibold text-[13px]
                transition-all duration-150
                ${isActive
                  ? `${colors.activeBg} ${cat.id === "All" ? "text-white" : "text-[#1E1E1E]"}`
                  : "bg-white text-[#1E1E1E]/70 hover:text-[#1E1E1E]"
                }
              `}
              style={{
                border: "2px solid #1E1E1E",
                boxShadow: isActive ? "2px 2px 0px #1E1E1E" : "2px 2px 0px #1E1E1E",
                transform: isActive ? "translate(-1px, -1px)" : "none",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
