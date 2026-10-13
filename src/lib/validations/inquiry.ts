import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).optional().or(z.literal('')),
  email: z.string().email('Invalid email address').max(150).optional().or(z.literal('')),
  phone: z.string().min(7, 'Phone number is too short').max(20, 'Phone number is too long').regex(/^[0-9+\s\-()]+$/, 'Invalid phone number format'),
  company: z.string().max(100).optional().or(z.literal('')),
  city: z.string().max(100).optional().or(z.literal('')),
  subject: z.string().max(150).optional().or(z.literal('')),
  message: z.string().max(2000).optional().or(z.literal('')),
  inquiryType: z.string().min(1).max(50),
  sourcePage: z.string().min(1).max(250),
  productId: z.string().optional(),
  productName: z.string().optional(),
  projectId: z.string().optional(),
  projectName: z.string().optional(),
  formData: z.record(z.string(), z.unknown()).default({}),
  calculatorData: z.record(z.string(), z.unknown()).optional(),
  // Honeypot for spam prevention
  _hp: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
