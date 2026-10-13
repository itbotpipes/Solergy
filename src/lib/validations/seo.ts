import { z } from 'zod';

export const seoSchema = z.object({
  pageKey: z.string().min(1, 'Page key is required').max(150),
  pageTitle: z.string().min(2, 'Page title must be at least 2 characters').max(120),
  metaDescription: z.string().min(10, 'Description must be at least 10 characters').max(320),
  canonicalUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  robotsIndex: z.boolean().default(true),
  robotsFollow: z.boolean().default(true),
  ogTitle: z.string().max(120).optional().or(z.literal('')),
  ogDescription: z.string().max(320).optional().or(z.literal('')),
  ogImage: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
  twitterTitle: z.string().max(120).optional().or(z.literal('')),
  twitterDescription: z.string().max(320).optional().or(z.literal('')),
  twitterImage: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
  keywords: z.string().max(300).optional().or(z.literal('')),
  structuredDataJson: z.string().optional().or(z.literal('')),
});

export type SEOInput = z.infer<typeof seoSchema>;
