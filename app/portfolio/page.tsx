import portfolioData from "@/data/portfolio.json";
import PortfolioHero from "@/components/PortfolioHero";
import MetricsSection from "@/components/MetricsSection";
import BrandLogos from "@/components/BrandLogos";
import CTASection from "@/components/CTASection";

export const revalidate = 3600;

function formatFollowers(count: number): string {
  const val = Math.floor(count / 100) / 10;
  return (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)) + "k+";
}

export default async function PortfolioPage() {
  const { hero, metrics, brands, formats, cta } = portfolioData;

  let followersValue = metrics.find((m) => m.id === "followers")?.value ?? "23k+";
  try {
    const res = await fetch("https://followers-2papqmteka-uc.a.run.app/", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.followers_count === "number") {
        followersValue = formatFollowers(data.followers_count);
      }
    }
  } catch {
    // keep static fallback
  }

  const liveMetrics = metrics.map((m) =>
    m.id === "followers" ? { ...m, value: followersValue } : m
  );

  return (
    <>
      <PortfolioHero title={hero.title} subtext={hero.subtext} />

      <MetricsSection metrics={liveMetrics} />

      {/* What I create section */}
      <div className="px-4 py-4">
        <h2 className="font-display font-bold text-[18px] text-[#1E1E1E] mb-3">
          {formats.title} ⚡
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {formats.list.map((f, i) => {
            const accentColors = ["#FFD84D", "#5CC8FF", "#FF5C5C", "#7BE495", "#A678FF", "#FFD84D"];
            const bg = accentColors[i % accentColors.length];
            return (
              <div
                key={f.id}
                className="flex items-center gap-2 bg-white px-3 py-3 rounded-xl"
                style={{ border: "2px solid #1E1E1E", boxShadow: "2px 2px 0px #1E1E1E" }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[18px] flex-shrink-0"
                  style={{ backgroundColor: bg, border: "1.5px solid #1E1E1E" }}
                >
                  {f.icon}
                </span>
                <span className="font-body font-semibold text-[13px] text-[#1E1E1E] leading-tight">
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <BrandLogos title={brands.title} brands={brands.list} />

      {/* Divider */}
      <div className="mx-4 my-2 h-[2px] bg-[#1E1E1E]/10 rounded-full" />

      <CTASection
        title={cta.title}
        subtext={cta.subtext}
        email={cta.email}
        instagram={cta.instagram}
      />
    </>
  );
}
