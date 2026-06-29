"use client";
import Image from "next/image";
import { track } from "@vercel/analytics";

export default function PortfolioHero({
  title,
  subtext,
}: {
  title: string;
  subtext: string;
}) {
  return (
    <div className="px-4 pt-8 pb-6 relative">
      {/* Decorative elements */}
      <span className="absolute top-6 right-6 text-[#FFD84D] text-3xl select-none">✦</span>
      <span className="absolute top-14 right-12 text-[#FF5C5C] text-sm select-none">★</span>
      <span className="absolute top-10 left-2 text-[#5CC8FF] text-lg select-none">◆</span>

      {/* Label */}
      <div className="mb-4">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-pixel text-[9px] bg-[#A678FF] text-white"
          style={{ border: "2px solid #1E1E1E", boxShadow: "2px 2px 0px #1E1E1E" }}
        >
          🎬 MEDIA KIT
        </span>
      </div>

      {/* Main title */}
      <h1 className="font-display font-bold text-[28px] sm:text-[34px] leading-tight text-[#1E1E1E] mb-4">
        {title}
      </h1>

      {/* Underline accent */}
      <div
        className="w-20 h-[5px] rounded-full bg-[#FFD84D] mb-4"
        style={{ border: "1.5px solid #1E1E1E" }}
      />

      {/* Subtext */}
      <p className="font-body text-[15px] text-[#1E1E1E]/70 leading-relaxed max-w-sm">
        {subtext}
      </p>

      {/* Manav Ladha card */}
      <div
        onClick={() => track("portfolio_open_click")}
        className="mt-6 flex items-center justify-between gap-3 bg-white px-4 py-3 rounded-2xl cursor-pointer"
        style={{ border: "2.5px solid #1E1E1E", boxShadow: "4px 4px 0px #1E1E1E" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0"
            style={{ border: "2px solid #1E1E1E" }}
          >
            <Image
              src="/manav.png"
              alt="Manav Ladha"
              width={40}
              height={40}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p className="font-display font-bold text-[15px] text-[#1E1E1E] leading-tight">
              Manav Ladha
            </p>
            <p className="font-body text-[12px] text-[#1E1E1E]/50">@manavladha · Creator</p>
          </div>
        </div>
        <span
          className="font-pixel text-[8px] bg-[#7BE495] text-[#1E1E1E] px-2 py-1 rounded flex-shrink-0"
          style={{ border: "1.5px solid #1E1E1E" }}
        >
          ✦ OPEN
        </span>
      </div>
    </div>
  );
}
