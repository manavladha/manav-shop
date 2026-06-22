interface Brand {
  id: string;
  name: string;
  emoji: string;
}

export default function BrandLogos({
  title,
  brands,
}: {
  title: string;
  brands: Brand[];
}) {
  return (
    <div className="px-4 py-4">
      <h2 className="font-display font-bold text-[18px] text-[#1E1E1E] mb-3">{title} 🎮</h2>
      <div className="flex flex-wrap gap-2">
        {brands.map((brand, i) => {
          const colors = ["#FFD84D", "#FF5C5C", "#5CC8FF", "#7BE495", "#A678FF", "#FFD84D", "#FF5C5C"];
          const bg = colors[i % colors.length];
          return (
            <div
              key={brand.id}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white"
              style={{ border: "2px solid #1E1E1E", boxShadow: "2px 2px 0px #1E1E1E" }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[16px]"
                style={{ backgroundColor: bg, border: "1.5px solid #1E1E1E" }}
              >
                {brand.emoji}
              </span>
              <span className="font-display font-bold text-[13px] text-[#1E1E1E]">
                {brand.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
