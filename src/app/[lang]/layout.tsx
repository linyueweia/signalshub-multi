import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Language } from '@/lib/types';

export async function generateMetadata({
  params,
}: {
  params: { lang: Language };
}): Promise<Metadata> {
  const lang = params.lang;

  const titles: Record<Language, string> = {
    en: 'Guangwei Optics — Professional Sunglasses OEM/ODM Manufacturer | Since 1999',
    zh: '光威光学 — 专业太阳镜OEM/ODM制造商 | 始于1999年',
    es: 'Guangwei Optics — Fabricante Profesional de Gafas de Sol OEM/ODM | Desde 1999',
    fr: 'Guangwei Optics — Fabricant Professionnel de Lunettes de Soleil OEM/ODM | Depuis 1999',
    pt: 'Guangwei Optics — Fabricante Profissional de Óculos de Sol OEM/ODM | Desde 1999',
    ru: 'Guangwei Optics — Профессиональный Производитель Солнцезащитных Очков OEM/ODM | С 1999',
  };

  const descriptions: Record<Language, string> = {
    en: 'Professional sunglasses OEM/ODM manufacturer since 1999. CE, FDA, ISO9001 certified. 27 years experience, 200+ global brands. MOQ 3,000 pcs. Factory direct pricing.',
    zh: '专业太阳镜OEM/ODM制造商，始于1999年。CE、FDA、ISO9001认证。27年经验，200+全球品牌。起订量3,000副。工厂直销价格。',
    es: 'Fabricante profesional OEM/ODM de gafas de sol desde 1999. Certificado CE, FDA, ISO9001. 27 años de experiencia, 200+ marcas globales.',
    fr: "Fabricant OEM/ODM professionnel de lunettes de soleil depuis 1999. Certifié CE, FDA, ISO9001. 27 ans d'expérience, 200+ marques mondiales.",
    pt: 'Fabricante OEM/ODM profissional de óculos de sol desde 1999. Certificado CE, FDA, ISO9001. 27 anos de experiência, 200+ marcas globais.',
    ru: 'Профессиональный OEM/ODM производитель солнцезащитных очков с 1999 года. Сертификаты CE, FDA, ISO9001. 27 лет опыта, 200+ глобальных брендов.',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: `https://guangwei-optics.com/${lang}`,
      languages: {
        en: '/en',
        zh: '/zh',
        es: '/es',
        fr: '/fr',
        pt: '/pt',
        ru: '/ru',
      },
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  return (
    <>
      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Guangwei Optics Co., Ltd.',
            url: 'https://guangwei-optics.com',
            logo: 'https://guangwei-optics.com/logo.png',
            description: 'Professional sunglasses OEM/ODM manufacturer since 1999',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+86-131-0039-5383',
              contactType: 'sales',
              availableLanguage: ['English', 'Chinese', 'Spanish', 'French', 'Portuguese', 'Russian'],
              hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00', timeZone: 'Asia/Shanghai' },
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Wenzhou',
              addressRegion: 'Zhejiang',
              addressCountry: 'CN',
            },
            foundingDate: '1999',
            industry: 'Eyewear Manufacturing',
            numberOfEmployees: { '@type': 'QuantitativeValue', value: 500 },
          }),
        }}
      />
      <Header lang={params.lang} />
      <main>{children}</main>
      <Footer lang={params.lang} />
    </>
  );
}
