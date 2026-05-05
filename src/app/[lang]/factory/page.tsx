import { Language } from '@/lib/types';
import FactoryPageClient from './FactoryPageClient';

export default async function FactoryPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return <FactoryPageClient lang={lang} />;
}
