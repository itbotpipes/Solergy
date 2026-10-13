export type InquiryStatus =
  | 'new'
  | 'contacted'
  | 'in_progress'
  | 'converted'
  | 'closed'
  | 'spam';

export interface InquiryNote {
  id: string;
  content: string;
  createdAt: number;
  author?: string;
  authorEmail?: string;
}

export interface Inquiry {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  subject?: string;
  message?: string;
  inquiryType: string; // e.g. 'home', 'business', 'industry', 'product_inquiry', 'quote_request', 'calculator_lead'
  sourcePage: string; // e.g. '/', '/contact', '/products/[slug]', '/calculator'
  productId?: string;
  productName?: string;
  projectId?: string;
  projectName?: string;
  formData: Record<string, unknown>;
  calculatorData?: Record<string, unknown>;
  status: InquiryStatus;
  notes?: InquiryNote[];
  createdAt: number;
  updatedAt: number;
}
