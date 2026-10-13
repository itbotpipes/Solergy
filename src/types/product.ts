export type ProductStatus = 'draft' | 'published' | 'archived';

export interface ProductFeature {
  id: string;
  title: string;
  description?: string | null;
}

export interface ProductSpecification {
  id: string;
  label: string;
  value: string;
}

export interface ProductMedia {
  id: string;
  publicId: string;
  secureUrl: string;
  resourceType: 'image' | 'video';
  altText?: string | null;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId?: string | null;
  categoryName?: string | null;
  shortDescription: string;
  fullDescription: string;
  features: ProductFeature[];
  specifications: ProductSpecification[];
  featuredImage?: ProductMedia | null;
  gallery: ProductMedia[];
  status: ProductStatus;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: number;
  updatedAt: number;
  publishedAt?: number | null;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}
