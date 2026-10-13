export interface SEOOpenGraph {
  title?: string;
  description?: string;
  image?: string;
}

export interface SEOTwitter {
  title?: string;
  description?: string;
  image?: string;
}

export interface SEOPageConfig {
  pageKey: string; // e.g. 'home', 'about', 'calculator', 'projects', 'contact', 'products', 'project:{id}', 'product:{id}'
  title: string;
  description: string;
  canonicalUrl?: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  openGraph?: SEOOpenGraph;
  twitter?: SEOTwitter;
  keywords?: string;
  structuredDataJson?: string;
  updatedAt: number;
}

export type SEOMetadata = SEOPageConfig;
