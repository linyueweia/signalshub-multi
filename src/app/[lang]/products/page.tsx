import { Language } from '@/lib/types';
import { languages } from '@/lib/i18n';
import ProductsPageClient from './ProductsPageClient';

export async function generateStaticParams() {
  return languages.map(l => ({ lang: l.code }));
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return <ProductsPageClient lang={lang} />;
}
