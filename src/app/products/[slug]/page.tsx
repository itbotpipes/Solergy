import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getPublishedProducts } from "@/services/products";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import ProductDetailClient from "@/components/ProductDetailPage/ProductDetailClient";

interface ProductSlugPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || product.status !== "published") {
    return {
      title: "Product Not Found | Solergy",
    };
  }

  const pageKey = `product:${product.id}`;
  return generateSEOMetadata(pageKey, {
    title: `${product.name} | Solergy Solar Equipment`,
    description: product.shortDescription,
    openGraphImage:
      product.featuredImage?.secureUrl || product.gallery?.[0]?.secureUrl,
  });
}

export default async function ProductDetailPage({
  params,
}: ProductSlugPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // Return 404 for missing or draft/archived products in public route
  if (!product || product.status !== "published") {
    notFound();
  }

  const allPublished = await getPublishedProducts();
  const relatedProducts = allPublished
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <main>
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </main>
  );
}
