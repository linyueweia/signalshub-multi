import { Language } from '@/lib/types';
import { languages } from '@/lib/i18n';
import HomePageClient from './HomePageClient';

export async function generateStaticParams() {
  return languages.map(l => ({ lang: l.code }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return <HomePageClient lang={lang} />;
}
