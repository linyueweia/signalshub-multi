import { Language } from '@/lib/types';
import { languages } from '@/lib/i18n';
import FactoryPageClient from './FactoryPageClient';

export async function generateStaticParams() {
  return languages.map(l => ({ lang: l.code }));
}

export default async function FactoryPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return <FactoryPageClient lang={lang} />;
}
