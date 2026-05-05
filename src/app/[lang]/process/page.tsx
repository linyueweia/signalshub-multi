import { Language } from '@/lib/types';
import ProcessPageClient from './ProcessPageClient';

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return <ProcessPageClient lang={lang} />;
}
