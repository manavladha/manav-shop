import type { Product } from "@/components/ProductCard";
import productsJson from "@/data/products.json";

const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "1lqqg31prkXGnzq_eeufYInO0D884TKWhkuNf5fFNbdc";
const SHEET_GID = process.env.GOOGLE_SHEET_GID ?? "0";

/**
 * Returns products from Google Sheets if GOOGLE_SHEET_ID is set,
 * otherwise falls back to data/products.json (useful for local dev).
 *
 * Sheet column order (row 1 must be these exact headers):
 * id | title | category | price | image | buyLink | platform | tags | isFeatured | isSponsored | badge | createdAt
 *
 * Tip: leave the `image` column blank — the server will automatically
 * fetch the og:image from the buyLink URL and use that instead.
 *
 * Boolean columns (isFeatured, isSponsored): use TRUE or FALSE
 * tags: comma-separated, e.g.  rc,car,drift
 * price: optional, e.g.  ₹1,299  (leave blank to hide)
 * badge: optional — one of  NEW | VIRAL | FROM REEL  (leave blank for none)
 */
export async function getProducts(): Promise<Product[]> {
  if (!SHEET_ID) {
    return productsJson.products as Product[];
  }

  const sheetUrl =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

  const res = await fetch(sheetUrl, {
    next: { revalidate: 3600 }, // ISR: refresh at most once per hour
  });

  if (!res.ok) {
    console.error(`Sheet fetch failed: ${res.status}. Falling back to JSON.`);
    return productsJson.products as Product[];
  }

  const csv = await res.text();
  const products = parseSheet(csv);

  // For any product with no image, fetch og:image from its buyLink in parallel.
  await Promise.all(
    products
      .filter((p) => !p.image && p.buyLink && p.buyLink !== "#")
      .map(async (p) => {
        const img = await fetchOgImage(p.buyLink);
        if (img) p.image = img;
      })
  );

  return products;
}

// ─── og:image fetcher ─────────────────────────────────────────────────────────

/**
 * Uses the Microlink API to extract og:image from any URL.
 * Handles Amazon/Flipkart bot protection. Cached 24h per URL via Next.js fetch cache.
 * Free tier: 1000 requests/month — plenty for a personal shop.
 */
async function fetchOgImage(url: string): Promise<string> {
  try {
    const api = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
    const res = await fetch(api, {
      next: { revalidate: 86400 }, // cache each product image URL for 24 hours
    });
    if (!res.ok) return "";
    const json = await res.json();
    return json?.data?.image?.url ?? "";
  } catch {
    return "";
  }
}

// ─── CSV parser ───────────────────────────────────────────────────────────────

function parseSheet(csv: string): Product[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = parseRow(lines[0]).map((h) => h.trim());

  return lines
    .slice(1)
    .map((line) => {
      const values = parseRow(line);
      const row: Record<string, string> = {};
      headers.forEach((h, i) => {
        row[h] = (values[i] ?? "").trim();
      });

      return {
        id: row.id || slugify(row.title),
        title: row.title,
        category: row.category,
        price: row.price || undefined,
        image: row.image || "",
        buyLink: row.buyLink || "#",
        reelLink: row.reelLink || null,
        platform: row.platform || "Other",
        tags: row.tags ? row.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        isFeatured: isTruthy(row.isFeatured),
        isSponsored: isTruthy(row.isSponsored),
        badge: row.badge || null,
        createdAt: row.createdAt || new Date().toISOString().split("T")[0],
      } satisfies Product;
    })
    .filter((p) => p.title); // drop blank rows
}

/** Handle CSV fields that may be wrapped in double-quotes */
function parseRow(row: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function isTruthy(val: string): boolean {
  return ["true", "yes", "1"].includes((val ?? "").toLowerCase());
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
