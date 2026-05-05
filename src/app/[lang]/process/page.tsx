import { Language } from '@/lib/types';
import { languages } from '@/lib/i18n';
import ProcessPageClient from './ProcessPageClient';

export async function generateStaticParams() {
  return languages.map(l => ({ lang: l.code }));
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return <ProcessPageClient lang={lang} />;
}
