import { Language } from '@/lib/types';
import { languages } from '@/lib/i18n';
import ContactPageClient from './ContactPageClient';

export async function generateStaticParams() {
  return languages.map(l => ({ lang: l.code }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return <ContactPageClient lang={lang} />;
}
