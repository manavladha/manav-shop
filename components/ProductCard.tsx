"use client";
import Image from "next/image";
import { track } from "@vercel/analytics";

export interface Product {
  id: string;
  title: string;
  category: string;
  price?: string;
  image: string;
  buyLink: string;
  reelLink?: string | null;
  platform: string;
  tags: string[];
  isFeatured: boolean;
  isSponsored: boolean;
  badge?: string | null;
  createdAt: string;
}

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  Amazon: { bg: "#FFD84D", text: "#1E1E1E" },
  Flipkart: { bg: "#5CC8FF", text: "#1E1E1E" },
  Other: { bg: "#A678FF", text: "#1E1E1E" },
};

const BADGE_COLORS: Record<string, string> = {
  NEW: "bg-[#7BE495]",
  VIRAL: "bg-[#FF5C5C] text-white",
  "FROM REEL": "bg-[#A678FF] text-white",
};

export default function ProductCard({ product }: { product: Product }) {
  const platformStyle = PLATFORM_COLORS[product.platform] ?? PLATFORM_COLORS.Other;

  return (
    <div
      className="card-lift relative bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ border: "2.5px solid #1E1E1E", boxShadow: "4px 4px 0px #1E1E1E" }}
    >
      {/* Badges top-left */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isFeatured && (
          <span
            className="font-pixel text-[8px] bg-[#FFD84D] text-[#1E1E1E] px-1.5 py-0.5 rounded"
            style={{ border: "1.5px solid #1E1E1E" }}
          >
            ⭐ FEAT
          </span>
        )}
        {product.badge && (
          <span
            className={`font-pixel text-[8px] px-1.5 py-0.5 rounded ${BADGE_COLORS[product.badge] ?? "bg-[#5CC8FF]"}`}
            style={{ border: "1.5px solid #1E1E1E" }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Sponsored badge top-right */}
      {product.isSponsored && (
        <div className="absolute top-2 right-2 z-10">
          <span
            className="font-pixel text-[8px] bg-[#7BE495] text-[#1E1E1E] px-1.5 py-0.5 rounded"
            style={{ border: "1.5px solid #1E1E1E" }}
          >
            AD
          </span>
        </div>
      )}

      {/* Image — falls back to a category-coloured placeholder if og:image wasn't found */}
      <div className="relative w-full aspect-square bg-[#F7EDD0] overflow-hidden flex items-center justify-center">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <span className="text-5xl select-none opacity-60">🛍️</span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        {/* Category + platform row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-body font-medium text-[#1E1E1E]/50">
            {product.category}
          </span>
          <span className="text-[#1E1E1E]/30 text-[10px]">·</span>
          <span
            className="text-[10px] font-pixel px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: platformStyle.bg,
              color: platformStyle.text,
              border: "1.5px solid #1E1E1E",
            }}
          >
            {product.platform}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-[15px] text-[#1E1E1E] leading-tight">
          {product.title}
        </h3>

        {/* Price */}
        {product.price && (
          <p className="font-display font-bold text-[17px] text-[#1E1E1E]">
            {product.price}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-1">
          <a
            href={product.buyLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("product_click", {
              id: product.id,
              title: product.title,
              category: product.category,
              platform: product.platform,
            })}
            className="btn-arcade w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-display font-bold text-[13px] bg-[#FFD84D] text-[#1E1E1E]"
            style={{ border: "2px solid #1E1E1E" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Grab this →
          </a>

        </div>
      </div>
    </div>
  );
}
