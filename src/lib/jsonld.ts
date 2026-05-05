import { Product, Language } from './types';

export function organizationJsonLd(lang: Language) {
  const names: Record<Language, string> = {
    en: 'Guangwei Optics Co., Ltd.',
    zh: '光威光学有限公司',
    es: 'Guangwei Optics Co., Ltd.',
    fr: 'Guangwei Optics Co., Ltd.',
    pt: 'Guangwei Optics Co., Ltd.',
    ru: 'Guangwei Optics Co., Ltd.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: names[lang],
    url: 'https://guangwei-optics.com',
    logo: 'https://guangwei-optics.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-131-0039-5383',
      contactType: 'sales',
      availableLanguage: ['English', 'Chinese'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wenzhou',
      addressRegion: 'Zhejiang',
      addressCountry: 'CN',
    },
  };
}

export function productJsonLd(product: Product, lang: Language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[lang],
    description: product.description[lang],
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'Guangwei Optics',
    },
    offers: {
      '@type': 'Offer',
      price: product.price.replace(/[^0-9.]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      minimumOrderQuantity: product.moq,
    },
  };
}
