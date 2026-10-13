import type { Metadata } from "next";
import { getSEOConfig } from "@/services/seo";

export interface FallbackSEOMetadata {
  title?: string;
  description?: string;
  openGraphImage?: string;
  canonicalUrl?: string;
}

export async function generateSEOMetadata(
  pageKey: string,
  fallback?: FallbackSEOMetadata
): Promise<Metadata> {
  const seo = await getSEOConfig(pageKey);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://solergyindia.com";

  const title = seo?.title || fallback?.title || "Solergy — Solar Energy Solutions";
  const description =
    seo?.description ||
    fallback?.description ||
    "Solergy designs and installs turnkey solar power systems.";
  const canonical =
    seo?.canonicalUrl ||
    fallback?.canonicalUrl ||
    `${siteUrl}/${pageKey === "home" ? "" : pageKey.replace(":", "/")}`;

  const ogTitle = seo?.openGraph?.title || title;
  const ogDesc = seo?.openGraph?.description || description;
  const ogImg = seo?.openGraph?.image || fallback?.openGraphImage;

  const twTitle = seo?.twitter?.title || ogTitle;
  const twDesc = seo?.twitter?.description || ogDesc;
  const twImg = seo?.twitter?.image || ogImg;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: seo?.robotsIndex ?? true,
      follow: seo?.robotsFollow ?? true,
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: canonical,
      siteName: "Solergy India",
      images: ogImg ? [{ url: ogImg }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: twTitle,
      description: twDesc,
      images: twImg ? [twImg] : undefined,
    },
  };
}

export const generatePageMetadata = generateSEOMetadata;
