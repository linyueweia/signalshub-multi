'use client';

import Link from 'next/link';
import { Language } from '@/lib/types';
import { getMessage } from '@/lib/i18n';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const m = getMessage(lang);

  const currentYear = new Date().getFullYear();

  const footerLinks = {
        products: [
      { href: `/${lang}/products?category=classic-aviator`, label: lang === 'zh' ? '经典飞行员款' : lang === 'es' ? 'Aviador Clásico' : lang === 'fr' ? 'Aviateur' : lang === 'pt' ? 'Aviador' : lang === 'ru' ? 'Авиатор' : 'Classic Aviator' },
      { href: `/${lang}/products?category=sport`, label: lang === 'zh' ? '运动款' : lang === 'es' ? 'Deportivo' : lang === 'fr' ? 'Sport' : lang === 'pt' ? 'Esportivo' : lang === 'ru' ? 'Спорт' : 'Sport' },
      { href: `/${lang}/products?category=cat-eye`, label: lang === 'zh' ? '猫眼镜' : lang === 'es' ? 'Ojo de Gato' : lang === 'fr' ? 'Chat Œil' : lang === 'pt' ? 'Olho de Gato' : lang === 'ru' ? 'Кошачий' : 'Cat Eye' },
      { href: `/${lang}/products?category=kids`, label: lang === 'zh' ? '儿童款' : lang === 'es' ? 'Infantil' : lang === 'fr' ? 'Enfants' : lang === 'pt' ? 'Infantil' : lang === 'ru' ? 'Детские' : 'Kids' },
      { href: `/${lang}/products?category=luxury`, label: lang === 'zh' ? '奢华款' : lang === 'es' ? 'Lujo' : lang === 'fr' ? 'Luxe' : lang === 'pt' ? 'Luxo' : lang === 'ru' ? 'Люкс' : 'Luxury' },
      { href: `/${lang}/products?category=polarized`, label: lang === 'zh' ? '偏光款' : lang === 'es' ? 'Polarizada' : lang === 'fr' ? 'Polarisé' : lang === 'pt' ? 'Polarizado' : lang === 'ru' ? 'Поляризованные' : 'Polarized' },
    ],
    company: [
      { href: `/${lang}/factory`, label: m.nav.factory },
      { href: `/${lang}/process`, label: m.nav.process },
      { href: `/${lang}/contact`, label: m.nav.contact },
    ],
    support: [
      { href: `/${lang}/contact`, label: m.nav.contact },
      { href: `/${lang}/products`, label: m.nav.products },
    ],
  };

  return (
    <footer style={{ background: '#0A0A0B', color: '#9CA3AF' }}>
      {/* Main Footer */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href={`/${lang}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #C9A84C 0%, #D4B85C 100%)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>GW</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, letterSpacing: '-0.3px', lineHeight: 1 }}>
                  <span style={{ color: '#FFFFFF' }}>GUANGWEI</span>
                </div>
                <div style={{ fontSize: 9, fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
                  OPTICS
                </div>
              </div>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 240, marginBottom: 20 }}>
              {lang === 'zh'
                ? '光威光学，专注太阳镜OEM/ODM制造27年。为全球200+品牌提供优质产品。'
                : 'Professional sunglasses OEM/ODM manufacturer since 1999. Trusted by 200+ global brands.'}
            </p>
            {/* Certifications */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['CE', 'FDA', 'ISO9001', 'BSCI'].map(cert => (
                <span key={cert} className="cert-badge" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#9CA3AF', fontSize: 11 }}>
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              {m.nav.products}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {footerLinks.products.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    color: '#9CA3AF', textDecoration: 'none', fontSize: 13,
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              {m.nav.about}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    color: '#9CA3AF', textDecoration: 'none', fontSize: 13,
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              {m.footer.contact}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '📧', text: 'info@guangwei-optics.com' },
                { icon: '📞', text: '+86 131 0039 5383' },
                { icon: '💬', text: 'WhatsApp: +86 131 0039 5383' },
                { icon: '📍', text: lang === 'zh' ? '中国浙江省温州市' : 'Wenzhou, Zhejiang, China' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13 }}>
                  <span style={{ fontSize: 14, marginTop: 1, flexShrink: 0 }}>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/8613100395383"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 20,
                padding: '10px 18px',
                background: '#25D366',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 700,
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'all 150ms ease',
              }}
            >
              💬 {m.whatsapp}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <p style={{ fontSize: 12, color: '#6B7280' }}>
            {m.footer.copyright}
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href={`/${lang}/privacy`} style={{ fontSize: 12, color: '#6B7280', textDecoration: 'none', transition: 'color 150ms ease' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
            >
              {m.footer.privacy}
            </Link>
            <Link href={`/${lang}/terms`} style={{ fontSize: 12, color: '#6B7280', textDecoration: 'none', transition: 'color 150ms ease' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
            >
              {m.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
