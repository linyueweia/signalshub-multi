'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Language, Product } from '@/lib/types';
import { getMessage } from '@/lib/i18n';
import { getFeaturedProducts, clientLogos, testimonials } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function HomePageClient({ lang }: { lang: Language }) {
  const m = getMessage(lang);
  const featured = getFeaturedProducts();
  const [quoteItems, setQuoteItems] = useState<{ product: Product; qty: number }[]>([]);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const testimonialTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gw_quote_items');
      if (saved) setQuoteItems(JSON.parse(saved));
    } catch { /* ignore */ }

    testimonialTimer.current = setInterval(() => {
      setTestimonialIdx(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => { if (testimonialTimer.current) clearInterval(testimonialTimer.current); };
  }, []);

  const handleAddToQuote = (product: Product) => {
    try {
      const saved = localStorage.getItem('gw_quote_items');
      const items: { product: Product; qty: number }[] = saved ? JSON.parse(saved) : [];
      if (!items.find(i => i.product.id === product.id)) {
        items.push({ product, qty: product.moq });
        localStorage.setItem('gw_quote_items', JSON.stringify(items));
        setQuoteItems(items);
      }
      setQuoteOpen(true);
    } catch { /* ignore */ }
  };

  const removeFromQuote = (productId: string) => {
    try {
      const saved = localStorage.getItem('gw_quote_items');
      const items: { product: Product; qty: number }[] = saved ? JSON.parse(saved) : [];
      const next = items.filter(i => i.product.id !== productId);
      localStorage.setItem('gw_quote_items', JSON.stringify(next));
      setQuoteItems(next);
    } catch { /* ignore */ }
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #0A0A0B 0%, #111113 50%, #1C1C1E 100%)' }}>
        {/* Background grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.06) 1px, transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
        {/* Glow */}
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 24px 80px', width: '100%', position: 'relative' }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 24 }}>
              <span style={{ display: 'block', width: 32, height: 2, background: '#C9A84C' }} />
              {lang === 'zh' ? '27年专业眼镜制造商' : '27 Years Professional Eyewear Manufacturer'}
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.02em' }}>
              {lang === 'zh'
                ? <>Premium sunglasses built for<br /><span style={{ color: '#C9A84C' }}>your brand</span>, not generics</>
                : <>OEM / ODM sunglasses<br />factory for <span style={{ color: '#C9A84C' }}>global brands</span></>}
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: '#9CA3AF', lineHeight: 1.75, marginBottom: 36, maxWidth: 560 }}>
              {lang === 'zh'
                ? '从设计到交付全链路服务，年产200万副，远销35国。为时尚品牌、零售连锁、电商平台提供一站式OEM/ODM解决方案。'
                : 'End-to-end service from design to delivery. 2M pairs/year capacity, exported to 35 countries. One-stop OEM/ODM solutions for fashion brands, retailers, and e-commerce platforms.'}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link href={`/${lang}/products`} className="btn-gold" style={{ padding: '16px 36px', fontSize: 15, fontWeight: 700 }}>
                {m.cta.browseProducts} →
              </Link>
              <Link href={`/${lang}/contact`} className="btn-outline" style={{ padding: '16px 36px', fontSize: 15 }}>
                {m.cta.getQuote}
              </Link>
            </div>

            {/* Trust indicators */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                { val: 'CE · FDA · ISO9001', label: lang === 'zh' ? '国际认证' : 'Certifications' },
                { val: '35+', label: lang === 'zh' ? '出口国家' : 'Export Countries' },
                { val: '2M+', label: lang === 'zh' ? '年产能(副)' : 'Annual Capacity' },
                { val: '24h', label: lang === 'zh' ? '报价响应' : 'Quote Response' },
              ].map(t => (
                <div key={t.label}>
                  <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 20, fontWeight: 900, color: '#C9A84C' }}>{t.val}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: '45%', height: '100%', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
          <div style={{ position: 'relative', width: '100%', height: '80%' }}>
            <Image src="https://picsum.photos/seed/hero-sunglasses-main/900/700" alt="Premium sunglasses" fill sizes="45vw" style={{ objectFit: 'contain', opacity: 0.7 }} priority />
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { value: '27', unit: lang === 'zh' ? '年' : 'Years', label: lang === 'zh' ? '行业经验' : 'Industry Experience' },
              { value: '200M+', unit: '', label: lang === 'zh' ? '累计产量' : 'Total Production' },
              { value: '500+', unit: '', label: lang === 'zh' ? '企业客户' : 'Corporate Clients' },
              { value: '35+', unit: '', label: lang === 'zh' ? '出口国家' : 'Countries Exported' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '28px 16px', borderRight: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 900, color: '#C9A84C', lineHeight: 1 }}>{s.value}<span style={{ fontSize: '0.45em' }}>{s.unit}</span></div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Logos ─────────────────────────────────── */}
      <section style={{ background: '#FAFAFA', padding: '40px 0', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
            {lang === 'zh' ? '受全球知名品牌信赖' : 'Trusted by Global Brands'}
          </div>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {clientLogos.map((logo, i) => (
              <div key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.05em', opacity: 0.6, transition: 'opacity 200ms' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.color = '#374151'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}>
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <div className="section-label"><span />{lang === 'zh' ? '精选产品' : 'Featured Products'}</div>
              <h2 className="section-title" style={{ marginTop: 8 }}>
                {lang === 'zh' ? '畅销款式' : 'Best-Selling Styles'}
              </h2>
            </div>
            <Link href={`/${lang}/products`} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#C9A84C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              {lang === 'zh' ? '查看全部 →' : 'View All →'}
            </Link>
          </div>
          <div className="product-grid">
            {featured.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} lang={lang} onAddToQuote={handleAddToQuote} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#0A0A0B', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: 'center', color: '#C9A84C' }}><span />{lang === 'zh' ? '为什么选择我们' : 'Why Choose Us'}</div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
              {lang === 'zh' ? '不只是供应商，是合作伙伴' : 'Not Just a Supplier — a Partner'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { icon: '🏭', title: lang === 'zh' ? '自建工厂' : 'Own Factory', desc: lang === 'zh' ? '15,000㎡生产基地，全产线自主，不外包' : '15,000㎡ production base, fully in-house manufacturing' },
              { icon: '💰', title: lang === 'zh' ? '价格竞争力' : 'Competitive Pricing', desc: lang === 'zh' ? '原厂直供，省去中间环节，性价比最高' : 'Factory-direct pricing, no middlemen, best value' },
              { icon: '🔬', title: lang === 'zh' ? '品质认证' : 'Quality Certified', desc: lang === 'zh' ? 'CE/FDA/ISO9001/BSCI，全流程AQL 2.5' : 'CE/FDA/ISO9001/BSCI, AQL 2.5 inspection' },
              { icon: '🎨', title: lang === 'zh' ? '深度定制' : 'Deep Customization', desc: lang === 'zh' ? 'Logo/包装/礼盒/镜片，全套定制服务' : 'Logo/packaging/lenses/boxes, full customization' },
              { icon: '🚢', title: lang === 'zh' ? '准时交付' : 'On-Time Delivery', desc: lang === 'zh' ? '95%订单准时出货，专业物流合作' : '95% on-time delivery with professional logistics' },
              { icon: '💬', title: lang === 'zh' ? '专属客服' : 'Dedicated Support', desc: lang === 'zh' ? '一对一项目经理，2小时内响应' : 'Dedicated project manager, 2-hour response' },
              { icon: '🧪', title: lang === 'zh' ? '免费样品' : 'Free Samples', desc: lang === 'zh' ? '首批样品免费，全程质量预览' : 'First sample free, full quality preview' },
              { icon: '🔒', title: lang === 'zh' ? '信息保密' : ' NDA Protection', desc: lang === 'zh' ? '签保密协议，保护客户设计资产' : 'NDA signed, client designs fully protected' },
            ].map((f, i) => (
              <div key={i} style={{ padding: '28px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', transition: 'all 250ms ease', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,168,76,0.06)'; el.style.borderColor = 'rgba(201,168,76,0.2)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, color: '#FFFFFF', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9CA3AF', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}><span />{lang === 'zh' ? '客户评价' : 'What Clients Say'}</div>
          <h2 className="section-title" style={{ marginTop: 8 }}>{lang === 'zh' ? '来自全球合作伙伴的声音' : 'Voices from Global Partners'}</h2>

          <div style={{ marginTop: 48, position: 'relative' }}>
            <div style={{ fontSize: 64, color: '#C9A84C', opacity: 0.2, fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: -20 }}>"</div>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#374151', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 24 }}>
              {(testimonials[testimonialIdx]?.text as Record<string, string>)?.[lang] || testimonials[testimonialIdx]?.text?.en}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: '#0A0A0B', marginBottom: 4 }}>{testimonials[testimonialIdx]?.author?.name}</div>
            <div style={{ fontSize: 13, color: '#9CA3AF' }}>{testimonials[testimonialIdx]?.author?.company}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} style={{ width: i === testimonialIdx ? 24 : 8, height: 8, borderRadius: 100, border: 'none', background: i === testimonialIdx ? '#C9A84C' : '#E5E7EB', cursor: 'pointer', transition: 'all 200ms' }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #0A0A0B 0%, #1C1C1E 100%)', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.15 }}>
            {lang === 'zh' ? '准备好开启您的眼镜品牌之路了吗？' : 'Ready to Build Your Eyewear Brand?'}
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#9CA3AF', lineHeight: 1.7, marginBottom: 32 }}>
            {lang === 'zh' ? '告诉我们您的需求，2小时内获得专业报价。无需 commitment。' : 'Tell us your requirements and get a professional quote within 2 hours. No commitment required.'}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${lang}/contact`} className="btn-gold" style={{ padding: '16px 40px', fontSize: 15, fontWeight: 700 }}>{m.cta.getQuote} →</Link>
            <Link href={`/${lang}/factory`} className="btn-outline" style={{ padding: '16px 40px', fontSize: 15 }}>{lang === 'zh' ? '参观工厂' : 'Visit Factory'} →</Link>
          </div>
        </div>
      </section>

      {/* ── Quote Sidebar ────────────────────────────────── */}
      {quoteOpen && (
        <>
          <div onClick={() => setQuoteOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 998 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: 420, height: '100vh', background: 'white', boxShadow: '-4px 0 40px rgba(0,0,0,0.15)', zIndex: 999, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, color: '#0A0A0B' }}>{m.quote.yourQuote}</h3>
                <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{quoteItems.length} {lang === 'zh' ? '款产品' : 'products'}</p>
              </div>
              <button onClick={() => setQuoteOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#6B7280' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {quoteItems.length === 0 ? (
                <p style={{ color: '#9CA3AF', textAlign: 'center', padding: 40, fontSize: 14 }}>{m.quote.addProducts}</p>
              ) : quoteItems.map(({ product }) => (
                <div key={product.id} style={{ display: 'flex', gap: 12, padding: 12, background: '#F9FAFB', borderRadius: 10, marginBottom: 10 }}>
                  <div style={{ width: 56, height: 56, background: '#E5E7EB', borderRadius: 6, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                    <Image src={product.images[0]} alt={product.name[lang]} fill sizes="56px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0A0A0B', lineHeight: 1.3 }}>{product.name[lang]}</div>
                    <div style={{ fontSize: 12, color: '#C9A84C', marginTop: 4 }}>{product.price}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>MOQ: {product.moq.toLocaleString()}</div>
                  </div>
                  <button onClick={() => removeFromQuote(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: 14, alignSelf: 'flex-start' }}>✕</button>
                </div>
              ))}
            </div>
            {quoteItems.length > 0 && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid #F3F4F6' }}>
                <Link href={`/${lang}/contact`} className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }} onClick={() => setQuoteOpen(false)}>{m.quote.submitQuote} →</Link>
                <button onClick={() => { localStorage.removeItem('gw_quote_items'); setQuoteItems([]); }} style={{ width: '100%', padding: '10px', background: 'none', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 13, color: '#9CA3AF', cursor: 'pointer' }}>{lang === 'zh' ? '清空列表' : 'Clear All'}</button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── WhatsApp Float ────────────────────────────────── */}
      <a href="https://wa.me/8613100395383" target="_blank" rel="noopener noreferrer" className="wa-float">
        💬
      </a>
    </>
  );
}
