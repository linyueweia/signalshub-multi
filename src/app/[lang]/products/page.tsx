import { Language } from '@/lib/types';
import ProductsPageClient from './ProductsPageClient';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return <ProductsPageClient lang={lang} />;
}
