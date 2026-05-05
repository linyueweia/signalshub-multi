import { MetadataRoute } from 'next';
import { products } from '../lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://guangwei-optics.com';
  const langs = ['en', 'zh', 'es', 'fr', 'pt', 'ru'];

  const staticPages = ['', '/products', '/factory', '/contact'];

  const pages: MetadataRoute.Sitemap = [];

  for (const lang of langs) {
    for (const staticPath of staticPages) {
      pages.push({
        url: `${base}/${lang}${staticPath}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: staticPath === '' ? 1.0 : 0.8,
      });
    }

    for (const product of products) {
      pages.push({
        url: `${base}/${lang}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return pages;
}
