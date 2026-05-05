import { Language } from '@/lib/types';
import ProductDetailPageClient from './ProductDetailPageClient';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: Language; id: string }>;
}) {
  const { lang, id } = await params;
  return <ProductDetailPageClient lang={lang} id={id} />;
}
