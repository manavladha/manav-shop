"use client";

import { useState, useMemo } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard, { Product } from "@/components/ProductCard";

export default function ShopClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory === "Featured") {
      list = list.filter((p) => p.isFeatured);
    } else if (activeCategory === "Sponsored") {
      list = list.filter((p) => p.isSponsored);
    } else if (activeCategory === "Amazon") {
      list = list.filter((p) => p.platform === "Amazon");
    } else if (activeCategory === "Flipkart") {
      list = list.filter((p) => p.platform === "Flipkart");
    } else if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.platform.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Featured first
    list.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });

    return list;
  }, [products, query, activeCategory]);

  return (
    <>
      <ProfileHeader />

      <div className="sticky top-0 z-40 bg-[#FFF4D8] pb-1">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Product count */}
      <div className="px-4 pt-3 pb-1">
        <p className="font-body text-[12px] text-[#1E1E1E]/50">
          {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          {query && ` for "${query}"`}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState query={query} category={activeCategory} />
      )}
    </>
  );
}

function EmptyState({ query, category }: { query: string; category: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div
        className="w-24 h-24 rounded-3xl bg-[#FFD84D] flex items-center justify-center text-5xl mb-5"
        style={{ border: "2.5px solid #1E1E1E", boxShadow: "4px 4px 0px #1E1E1E" }}
      >
        🔭
      </div>
      <h3 className="font-display font-bold text-[20px] text-[#1E1E1E] mb-2">
        Nothing found!
      </h3>
      <p className="font-body text-[14px] text-[#1E1E1E]/60 max-w-[240px]">
        {query
          ? `No products match "${query}". Try a different search term.`
          : `No products in the "${category}" category yet. Check back soon!`}
      </p>
      <div className="flex gap-1 mt-4 text-2xl select-none">
        <span>🧸</span>
        <span>⚡</span>
        <span>🎮</span>
      </div>
    </div>
  );
}
