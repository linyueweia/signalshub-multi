'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Language, Product } from '@/lib/types';
import { getMessage } from '@/lib/i18n';
import { getProductById, getRelatedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPageClient({ lang, id }: { lang: Language; id: string }) {
  const m = getMessage(lang);
  const product = getProductById(id);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 20, color: '#0A0A0B' }}>Product not found</h2>
        </div>
      </div>
    );
  }

  const [selectedImg, setSelectedImg] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const related = getRelatedProducts(product, 4);

  const handleAddToQuote = () => {
    try {
      const saved = localStorage.getItem('gw_quote_items');
      const items: { product: Product; qty: number }[] = saved ? JSON.parse(saved) : [];
      if (!items.find(i => i.product.id === product.id)) {
        items.push({ product, qty: product.moq });
        localStorage.setItem('gw_quote_items', JSON.stringify(items));
      }
      window.location.href = `/${lang}/contact`;
    } catch { /* ignore */ }
  };

  return (
    <>
      <div style={{ background: '#F9FAFB', borderBottom: '1px solid #F3F4F6', padding: '12px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#9CA3AF' }}>
            <Link href={`/${lang}`} style={{ color: '#9CA3AF', textDecoration: 'none' }}>{m.nav.home}</Link>
            <span>›</span>
            <Link href={`/${lang}/products`} style={{ color: '#9CA3AF', textDecoration: 'none' }}>{m.nav.products}</Link>
            <span>›</span>
            <span style={{ color: '#374151', fontWeight: 500 }}>{product.name[lang]}</span>
          </div>
        </div>
      </div>

      <section style={{ padding: '40px 0 80px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={{ position: 'relative', height: 480, background: '#F9FAFB', borderRadius: 16, overflow: 'hidden', marginBottom: 16, border: '1px solid #F3F4F6' }}>
                {!imgLoaded && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
                <Image src={product.images[selectedImg]} alt={product.name[lang]} fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: 'cover', opacity: imgLoaded ? 1 : 0, transition: 'opacity 300ms' }} onLoad={() => setImgLoaded(true)} priority />
                {product.badge && <div style={{ position: 'absolute', top: 16, left: 16, padding: '4px 12px', background: '#C9A84C', color: '#FFFFFF', fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: 6 }}>{product.badge}</div>}
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => { setSelectedImg(i); setImgLoaded(false); }} style={{ width: 80, height: 80, position: 'relative', background: '#F9FAFB', border: `2px solid ${i === selectedImg ? '#C9A84C' : '#E5E7EB'}`, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 150ms ease', flexShrink: 0 }}>
                    <Image src={img} alt="" fill sizes="80px" style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {product.tags.map(tag => <span key={tag} style={{ padding: '3px 10px', background: '#F3F4F6', color: '#6B7280', fontSize: 11, fontWeight: 600, borderRadius: 4 }}>{tag}</span>)}
              </div>
              <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0A0A0B', lineHeight: 1.15, marginBottom: 12 }}>{product.name[lang]}</h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 24 }}>{product.shortDesc[lang]}</p>

              <div style={{ padding: '20px 24px', background: '#F9FAFB', borderRadius: 12, border: '1px solid #F3F4F6', marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{lang === 'zh' ? '价格区间' : 'Price Range'}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 28, fontWeight: 900, color: '#C9A84C', lineHeight: 1 }}>{product.price}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>FOB {lang === 'zh' ? '温州' : 'Wenzhou'}</div>
                  </div>
                  <div style={{ borderLeft: '1px solid #E5E7EB', paddingLeft: 32 }}>
                    <div style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{m.products.moq}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 28, fontWeight: 900, color: '#0A0A0B', lineHeight: 1 }}>{product.moq.toLocaleString()}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{m.products.pcs} / {lang === 'zh' ? '款' : 'model'}</div>
                  </div>
                </div>
                {product.moqTiers && product.moqTiers.length > 0 && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{m.productDetail.tieredPricing}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {product.moqTiers.map((tier, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: i === 0 ? 'rgba(201,168,76,0.06)' : 'white', borderRadius: 8, border: `1px solid ${i === 0 ? 'rgba(201,168,76,0.2)' : '#E5E7EB'}`, fontSize: 13 }}>
                          <span style={{ fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#A8893A' : '#374151' }}>{tier.qty} {m.products.pcs}</span>
                          <span style={{ fontWeight: 700, color: i === 0 ? '#A8893A' : '#374151' }}>{tier.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  {Object.entries(product.specs).slice(0, 6).map(([key, val]) => (
                    <div key={key} style={{ padding: '10px 12px', background: '#FAFAFA', borderRadius: 8, border: '1px solid #F3F4F6' }}>
                      <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{key}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <button onClick={handleAddToQuote} className="btn-gold" style={{ flex: 1, justifyContent: 'center', padding: '14px 24px', fontSize: 15 }}>{m.productDetail.inquiry} →</button>
                <Link href={`/${lang}/contact`} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '14px 24px', fontSize: 15 }}>{m.productDetail.requestSample}</Link>
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {['CE / FDA Certified', '30-Day Production', 'Custom Logo Available', 'Secure Packaging'].map(badge => (
                  <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280' }}>
                    <span style={{ color: '#22C55E', fontWeight: 700 }}>✓</span>{badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0 80px', background: '#F9FAFB' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 20, color: '#0A0A0B', marginBottom: 20 }}>{lang === 'zh' ? '产品描述' : 'Product Description'}</h2>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#4B5563', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{product.description[lang]}</div>
            </div>
            <div>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 20, color: '#0A0A0B', marginBottom: 20 }}>{m.productDetail.specifications}</h2>
              <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                {Object.entries(product.specs).map(([key, val], i) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < Object.keys(product.specs).length - 1 ? '1px solid #F3F4F6' : 'none', fontSize: 13 }}>
                    <span style={{ fontWeight: 500, color: '#6B7280' }}>{key}</span>
                    <span style={{ fontWeight: 600, color: '#374151', textAlign: 'right', maxWidth: '60%' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ padding: '60px 0 80px', background: '#FFFFFF' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: '#0A0A0B', marginBottom: 32 }}>{m.productDetail.relatedProducts}</h2>
            <div className="product-grid">
              {related.map(p => <ProductCard key={p.id} product={p} lang={lang} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
