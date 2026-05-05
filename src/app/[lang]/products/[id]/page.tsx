import { Language } from '@/lib/types';
import { languages } from '@/lib/i18n';
import { products } from '@/lib/products';
import ProductDetailPageClient from './ProductDetailPageClient';

export async function generateStaticParams() {
  const langs = languages.map(l => l.code);
  const ids = products.map(p => p.id);
  const params: { lang: Language; id: string }[] = [];
  for (const lang of langs) {
    for (const id of ids) {
      params.push({ lang, id });
    }
  }
  return params;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: Language; id: string }>;
}) {
  const { lang, id } = await params;
  return <ProductDetailPageClient lang={lang} id={id} />;
}
