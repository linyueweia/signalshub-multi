import { Language } from '@/lib/types';
import HomePageClient from './HomePageClient';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return <HomePageClient lang={lang} />;
}
