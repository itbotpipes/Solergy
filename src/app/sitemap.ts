import type { MetadataRoute } from 'next';
import PROJECTS from '@/data/projects';
import { getPublishedProducts } from '@/services/products';
import { getAllSEOPages } from '@/services/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solergyindia.com';
  const seoPages = await getAllSEOPages();
  const publishedProducts = await getPublishedProducts();

  const seoMap = new Map(seoPages.map((p) => [p.pageKey, p]));

  const staticRoutes = [
    { key: 'home', path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { key: 'about', path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { key: 'calculator', path: '/calculator', priority: 0.9, changeFrequency: 'monthly' as const },
    { key: 'projects', path: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
    { key: 'products', path: '/products', priority: 0.9, changeFrequency: 'weekly' as const },
    { key: 'contact', path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Add static public pages if indexable
  for (const route of staticRoutes) {
    const seo = seoMap.get(route.key);
    if (!seo || seo.robotsIndex !== false) {
      entries.push({
        url: `${siteUrl}${route.path}`,
        lastModified: seo ? new Date(seo.updatedAt) : new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  // Add project pages if indexable
  for (const project of PROJECTS) {
    const seo = seoMap.get(`project:${project.id}`);
    if (!seo || seo.robotsIndex !== false) {
      entries.push({
        url: `${siteUrl}/project/${project.id}`,
        lastModified: seo ? new Date(seo.updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // Add published product pages
  for (const product of publishedProducts) {
    const seo = seoMap.get(`product:${product.id}`);
    if (!seo || seo.robotsIndex !== false) {
      entries.push({
        url: `${siteUrl}/products/${product.slug}`,
        lastModified: new Date(product.updatedAt || product.createdAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
