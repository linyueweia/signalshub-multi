import { Language } from '@/lib/types';
import ContactPageClient from './ContactPageClient';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return <ContactPageClient lang={lang} />;
}
