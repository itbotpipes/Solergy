import { z } from 'zod';

export const productFeatureSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Feature title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
});

export const productSpecificationSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Spec label is required').max(100),
  value: z.string().min(1, 'Spec value is required').max(300),
});

export const productMediaSchema = z.object({
  id: z.string(),
  publicId: z.string(),
  secureUrl: z.string().url('Invalid media URL'),
  resourceType: z.enum(['image', 'video']),
  altText: z.string().max(200).optional().nullable(),
  sortOrder: z.number().int().nonnegative().default(0),
});

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required').max(200),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  categoryId: z.string().optional().nullable(),
  categoryName: z.string().optional().nullable(),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters').max(500),
  fullDescription: z.string().min(20, 'Full description must be at least 20 characters').max(10000),
  features: z.array(productFeatureSchema).default([]),
  specifications: z.array(productSpecificationSchema).default([]),
  featuredImage: productMediaSchema.optional().nullable(),
  gallery: z.array(productMediaSchema).default([]),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export const updateProductSchema = z.object({
  name: z.string().min(2, 'Product name is required').max(200).optional(),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
    .optional(),
  categoryId: z.string().optional().nullable(),
  categoryName: z.string().optional().nullable(),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters').max(500).optional(),
  fullDescription: z.string().min(20, 'Full description must be at least 20 characters').max(10000).optional(),
  features: z.array(productFeatureSchema).optional(),
  specifications: z.array(productSpecificationSchema).optional(),
  featuredImage: productMediaSchema.optional().nullable(),
  gallery: z.array(productMediaSchema).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
