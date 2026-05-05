'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Language } from '@/lib/types';
import { getMessage, languages } from '@/lib/i18n';

interface HeaderProps {
  lang: Language;
}

export default function Header({ lang }: HeaderProps) {
  const m = getMessage(lang);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: `/${lang}`, label: m.nav.home },
    { href: `/${lang}/products`, label: m.nav.products },
    { href: `/${lang}/factory`, label: m.nav.factory },
    { href: `/${lang}/process`, label: m.nav.process },
    { href: `/${lang}/contact`, label: m.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}`) return pathname === `/${lang}`;
    return pathname.startsWith(href);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,1)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? '#E5E7EB' : 'transparent'}`,
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 300ms ease',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          {/* Logo */}
          <Link href={`/${lang}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #C9A84C 0%, #D4B85C 100%)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 14, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px' }}>GW</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, letterSpacing: '-0.3px', lineHeight: 1 }}>
                <span style={{ color: '#0A0A0B' }}>GUANGWEI</span>
                <span style={{ color: '#C9A84C' }}> OPTICS</span>
              </div>
              <div style={{ fontSize: 9, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
                Since 1999 · Wenzhou, China
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '6px 14px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: isActive(link.href) ? 700 : 500,
                  color: isActive(link.href) ? '#C9A84C' : '#374151',
                  textDecoration: 'none',
                  borderRadius: 6,
                  transition: 'all 150ms ease',
                  background: isActive(link.href) ? 'rgba(201,168,76,0.06)' : 'transparent',
                  position: 'relative',
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span style={{
                    position: 'absolute',
                    bottom: -1,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 20,
                    height: 2,
                    background: '#C9A84C',
                    borderRadius: 2,
                  }} />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Lang Switcher */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 10px',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: 8,
                  background: 'white',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#374151',
                  transition: 'border-color 150ms ease',
                }}
              >
                <span style={{ fontSize: 16 }}>{languages.find(l => l.code === lang)?.flag}</span>
                <span>{lang.toUpperCase()}</span>
                <span style={{ fontSize: 10, color: '#9CA3AF' }}>▼</span>
              </button>
              {langOpen && (
                <div
                  className="animate-slideDown"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: 180,
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    padding: '6px',
                    zIndex: 200,
                  }}
                >
                  {languages.map(l => (
                    <Link
                      key={l.code}
                      href={`/${l.code}${pathname.replace(`/${lang}`, '')}`}
                      onClick={() => setLangOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 12px',
                        borderRadius: 8,
                        textDecoration: 'none',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 13,
                        fontWeight: l.code === lang ? 700 : 500,
                        color: l.code === lang ? '#C9A84C' : '#374151',
                        transition: 'background 100ms ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ fontSize: 18 }}>{l.flag}</span>
                      <span>{l.label}</span>
                      {l.code === lang && <span style={{ marginLeft: 'auto', color: '#C9A84C' }}>✓</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Get Quote CTA */}
            <Link
              href={`/${lang}/contact`}
              className="btn-gold hide-mobile"
              style={{ fontSize: 13, padding: '8px 20px' }}
            >
              {m.nav.getQuote}
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="hide-desktop"
              style={{
                display: 'none',
                padding: 8,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                borderRadius: 6,
              }}
              aria-label="Menu"
            >
              <div style={{ width: 22, height: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ display: 'block', height: 2, background: '#1F2937', borderRadius: 2, transition: 'all 200ms', transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
                <span style={{ display: 'block', height: 2, background: '#1F2937', borderRadius: 2, opacity: mobileOpen ? 0 : 1, transition: 'opacity 200ms' }} />
                <span style={{ display: 'block', height: 2, background: '#1F2937', borderRadius: 2, transition: 'all 200ms', transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="animate-slideDown"
            style={{
              padding: '16px 0 20px',
              borderTop: '1px solid #F3F4F6',
            }}
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 0',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 15,
                  fontWeight: isActive(link.href) ? 700 : 500,
                  color: isActive(link.href) ? '#C9A84C' : '#374151',
                  textDecoration: 'none',
                  borderBottom: '1px solid #F3F4F6',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${lang}/contact`}
              onClick={() => setMobileOpen(false)}
              className="btn-gold"
              style={{ display: 'flex', marginTop: 16, justifyContent: 'center' }}
            >
              {m.nav.getQuote}
            </Link>
          </div>
        )}
      </div>

      {/* Click outside to close lang */}
      {langOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100 }}
          onClick={() => setLangOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .hide-desktop { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
