import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Guangwei Optics — Professional Sunglasses OEM/ODM Manufacturer',
    template: '%s | Guangwei Optics',
  },
  description: 'Professional sunglasses OEM/ODM manufacturer since 1999. CE, FDA, ISO9001 certified. 27 years experience, 200+ global brands. MOQ 3,000 pcs. Factory direct pricing.',
  keywords: ['sunglasses OEM', 'sunglasses ODM', 'sunglasses manufacturer China', 'wholesale sunglasses', 'sunglasses factory', 'OEM sunglasses supplier', 'sunglasses MOQ 3000'],
  authors: [{ name: 'Guangwei Optics' }],
  creator: 'Guangwei Optics Co., Ltd.',
  publisher: 'Guangwei Optics Co., Ltd.',
  metadataBase: new URL('https://guangwei-optics.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guangwei-optics.com',
    siteName: 'Guangwei Optics',
    title: 'Guangwei Optics — Professional Sunglasses OEM/ODM Manufacturer',
    description: 'Professional sunglasses OEM/ODM manufacturer since 1999. CE, FDA, ISO9001 certified. 27 years experience, 200+ global brands.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guangwei Optics — Professional Sunglasses OEM/ODM Manufacturer',
    description: 'Professional sunglasses OEM/ODM manufacturer since 1999. CE, FDA, ISO9001 certified.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
