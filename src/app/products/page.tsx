import { Metadata } from "next";
import { getPublishedProducts } from "@/services/products";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import ProductsHero from "@/components/ProductsPage/ProductsHero";
import ProductsGrid from "@/components/ProductsPage/ProductsGrid";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata("products", {
    title: "Solar Hardware & Products | Solergy Equipment Catalog",
    description:
      "Explore Tier-1 solar panels, string and hybrid inverters, and utility-scale energy storage batteries supplied and installed by Solergy.",
  });
}

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <main>
      <ProductsHero />
      <ProductsGrid initialProducts={products} />
    </main>
  );
}
