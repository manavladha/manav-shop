import { getProducts } from "@/lib/getProducts";
import ShopClient from "./ShopClient";

// ISR: page regenerates at most once per hour automatically.
// Vercel will serve the cached version instantly while refreshing in background.
export const revalidate = 3600;

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopClient products={products} />;
}
