'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, Language } from '@/lib/types';
import { getMessage } from '@/lib/i18n';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onAddToQuote?: (product: Product) => void;
}

export default function ProductCard({ product, lang, onAddToQuote }: ProductCardProps) {
  const m = getMessage(lang);
  const [imgIdx, setImgIdx] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToQuote?.(product);
  };

  return (
    <div className="card" style={{ position: 'relative', overflow: 'visible' }}>
      {/* Badge */}
      {product.badge && (
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 10,
          padding: '3px 10px',
          background: '#C9A84C',
          color: '#FFFFFF',
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          borderRadius: 4,
        }}>
          {product.badge}
        </div>
      )}

      {/* Image */}
      <Link href={`/${lang}/products/${product.id}`} style={{ display: 'block', position: 'relative' }}>
        <div style={{
          position: 'relative',
          height: 220,
          background: '#F9FAFB',
          overflow: 'hidden',
        }}>
          {imgLoading && (
            <div className="skeleton" style={{ position: 'absolute', inset: 0, borderRadius: 0 }} />
          )}
          <Image
            src={product.images[imgIdx] || product.images[0]}
            alt={product.name[lang]}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: 'cover', opacity: imgLoading ? 0 : 1, transition: 'opacity 300ms ease' }}
            onLoad={() => setImgLoading(false)}
          />

          {/* Quick View */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,11,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 200ms ease',
          }}
          className="product-card-overlay"
          >
            <span style={{
              padding: '8px 16px',
              background: 'white',
              color: '#0A0A0B',
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 6,
              textDecoration: 'none',
            }}>
              {m.products.viewDetail}
            </span>
          </div>
        </div>

        {/* Image dots */}
        {product.images.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 4,
            zIndex: 5,
          }}>
            {product.images.slice(0, 3).map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setImgIdx(i);
                  setImgLoading(true);
                }}
                style={{
                  width: i === imgIdx ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  border: 'none',
                  background: i === imgIdx ? '#C9A84C' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Content */}
      <div style={{ padding: '16px 18px 18px' }}>
        {/* Category + Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
          {product.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              padding: '2px 8px',
              background: '#F3F4F6',
              color: '#6B7280',
              fontSize: 10,
              fontWeight: 600,
              borderRadius: 4,
              letterSpacing: '0.02em',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <Link href={`/${lang}/products/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 700,
            color: '#0A0A0B',
            lineHeight: 1.35,
            marginBottom: 6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {product.name[lang]}
          </h3>
        </Link>

        {/* Short Desc */}
        <p style={{
          fontSize: 12,
          color: '#6B7280',
          lineHeight: 1.5,
          marginBottom: 12,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.shortDesc[lang]}
        </p>

        {/* Price + MOQ */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 800, color: '#C9A84C', lineHeight: 1 }}>
              {product.price}
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>
              {m.products.moq}: {product.moq.toLocaleString()} {m.products.pcs}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            href={`/${lang}/products/${product.id}`}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '9px 12px',
              border: '1.5px solid #E5E7EB',
              borderRadius: 8,
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              color: '#374151',
              textDecoration: 'none',
              transition: 'all 150ms ease',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#C9A84C';
              e.currentTarget.style.color = '#C9A84C';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.color = '#374151';
            }}
          >
            {m.products.viewDetail}
          </Link>
          <button
            onClick={handleAddToQuote}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '9px 12px',
              background: '#C9A84C',
              border: 'none',
              borderRadius: 8,
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 700,
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#A8893A')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
          >
            + {m.products.addToQuote}
          </button>
        </div>
      </div>

      <style>{`
        .card:hover .product-card-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
