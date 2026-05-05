'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Language, Product } from '@/lib/types';
import { getMessage } from '@/lib/i18n';
import { products, categories, getProductsByCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

function ProductsContent({ lang }: { lang: Language }) {
  const m = getMessage(lang);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [quoteItems, setQuoteItems] = useState<{ product: Product; qty: number }[]>([]);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gw_quote_items');
      if (saved) setQuoteItems(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setCategory(cat);
  }, [searchParams]);

  let filtered = category === 'all' ? products : getProductsByCategory(category);

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name[lang].toLowerCase().includes(q) || p.shortDesc[lang].toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (materialFilter !== 'all') {
    filtered = filtered.filter(p => p.tags.some(t => t.toLowerCase() === materialFilter.toLowerCase()));
  }

  if (genderFilter !== 'all') {
    const genderMap: Record<string, string[]> = { men: ['Men', 'Unisex'], women: ['Women', 'Unisex'], kids: ['Kids'], unisex: ['Unisex'] };
    filtered = filtered.filter(p => genderMap[genderFilter]?.some(g => p.tags.includes(g)));
  }

  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => (a.priceRaw?.min ?? 0) - (b.priceRaw?.min ?? 0));
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => (b.priceRaw?.min ?? 0) - (a.priceRaw?.min ?? 0));
  }

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
      <section style={{ background: 'linear-gradient(160deg, #0A0A0B 0%, #1C1C1E 100%)', padding: '64px 0 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.1) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div className="section-label" style={{ color: '#C9A84C' }}><span />Sunglasses</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: 12 }}>{m.products.title}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#9CA3AF', maxWidth: 560 }}>{m.products.subtitle}</p>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #F3F4F6', position: 'sticky', top: 68, zIndex: 90 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 320 }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={m.products.search} className="form-input" style={{ paddingLeft: 38, fontSize: 13 }} />
            </div>
            <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)} className="form-input" style={{ width: 'auto', minWidth: 130, fontSize: 13 }}>
              <option value="all">{lang === 'zh' ? '全部性别' : 'All Gender'}</option>
              <option value="unisex">Unisex</option>
              <option value="women">{lang === 'zh' ? '女性' : 'Women'}</option>
              <option value="men">{lang === 'zh' ? '男性' : 'Men'}</option>
              <option value="kids">{lang === 'zh' ? '儿童' : 'Kids'}</option>
            </select>
            <select value={materialFilter} onChange={e => setMaterialFilter(e.target.value)} className="form-input" style={{ width: 'auto', minWidth: 130, fontSize: 13 }}>
              <option value="all">{lang === 'zh' ? '全部材质' : 'All Materials'}</option>
              <option value="metal">{lang === 'zh' ? '金属' : 'Metal'}</option>
              <option value="acetate">{lang === 'zh' ? '板材' : 'Acetate'}</option>
              <option value="tr90">{lang === 'zh' ? 'TR90' : 'TR90'}</option>
              <option value="titanium">{lang === 'zh' ? '钛' : 'Titanium'}</option>
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="form-input" style={{ width: 'auto', minWidth: 150, fontSize: 13 }}>
              <option value="default">{m.products.newest}</option>
              <option value="price-asc">{m.products.priceAsc}</option>
              <option value="price-desc">{m.products.priceDesc}</option>
            </select>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9CA3AF', marginLeft: 'auto' }}>{filtered.length} {lang === 'zh' ? '款产品' : 'products'}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            {categories.map(cat => (
              <button key={cat.key} onClick={() => { setCategory(cat.key); router.push(`/${lang}/products${cat.key !== 'all' ? `?category=${cat.key}` : ''}`, { scroll: false }); }} style={{ padding: '5px 14px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: category === cat.key ? 700 : 500, border: '1.5px solid', borderColor: category === cat.key ? '#C9A84C' : '#E5E7EB', borderRadius: 100, background: category === cat.key ? 'rgba(201,168,76,0.08)' : 'transparent', color: category === cat.key ? '#C9A84C' : '#6B7280', cursor: 'pointer', transition: 'all 150ms ease' }}>
                {(cat.label as Record<string, string>)[lang] || cat.label.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 80px', background: '#F9FAFB', minHeight: 400 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          {filtered.length > 0 ? (
            <div className="product-grid">
              {filtered.map(product => <ProductCard key={product.id} product={product} lang={lang} onAddToQuote={handleAddToQuote} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 700, color: '#374151', marginBottom: 8 }}>{m.products.noResults}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9CA3AF' }}>{m.products.tryAdjust}</p>
            </div>
          )}
        </div>
      </section>

      {quoteOpen && (
        <>
          <div onClick={() => setQuoteOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 998 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: 420, height: '100vh', background: 'white', boxShadow: '-4px 0 40px rgba(0,0,0,0.15)', zIndex: 999, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, color: '#0A0A0B' }}>{m.quote.yourQuote}</h3>
              <button onClick={() => setQuoteOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {quoteItems.length === 0 ? <p style={{ color: '#9CA3AF', textAlign: 'center', padding: 40, fontSize: 14 }}>{m.quote.addProducts}</p> : quoteItems.map(({ product }) => (
                <div key={product.id} style={{ display: 'flex', gap: 12, padding: 12, background: '#F9FAFB', borderRadius: 10, marginBottom: 10 }}>
                  <div style={{ width: 56, height: 56, background: '#E5E7EB', borderRadius: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0A0A0B', lineHeight: 1.3 }}>{product.name[lang]}</div>
                    <div style={{ fontSize: 12, color: '#C9A84C', marginTop: 4 }}>{product.price}</div>
                  </div>
                  <button onClick={() => removeFromQuote(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: 14, alignSelf: 'flex-start' }}>✕</button>
                </div>
              ))}
            </div>
            {quoteItems.length > 0 && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid #F3F4F6' }}>
                <Link href={`/${lang}/contact`} className="btn-gold" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setQuoteOpen(false)}>{m.quote.submitQuote} →</Link>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default function ProductsPageClient({ lang }: { lang: Language }) {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <ProductsContent lang={lang} />
    </Suspense>
  );
}
