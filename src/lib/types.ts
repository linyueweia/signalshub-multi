// ============================================================
// TypeScript 类型定义
// ============================================================

export type Language = 'en' | 'zh' | 'es' | 'fr' | 'pt' | 'ru';

export interface MoqTier {
  qty: string;
  price: string;
}

export interface Product {
  id: string;
  name: Record<Language, string>;
  shortDesc: Record<Language, string>;
  description: Record<Language, string>;
  price: string;
  priceRaw?: { min: number; max: number; currency: string };
  moq: number;
  category: string;
  tags: string[];
  images: string[];
  specs: Record<string, string>;
  featured?: boolean;
  badge?: string;
  moqTiers?: MoqTier[];
}

export interface ClientLogo {
  name: string;
  country: string;
}

export interface Testimonial {
  id: string;
  author: { name: string; company: string; country: string };
  text: Record<Language, string>;
  rating: number;
  product: string;
  year: string;
}

export interface InquiryFormData {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  productType: string;
  quantity: string;
  message: string;
}

export interface QuoteItem {
  productId: string;
  productName: Record<Language, string>;
  quantity: number;
  unitPrice?: number;
}

export interface InquiryRecord {
  id: string;
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
  status: 'submitted' | 'replied' | 'sampled' | 'ordered' | 'shipped' | 'closed';
  submittedAt: string;
  inquiryNumber: string;
}
