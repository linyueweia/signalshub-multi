'use client';

import { useState, useEffect } from 'react';
import { Language, InquiryRecord } from '@/lib/types';
import { getMessage } from '@/lib/i18n';
import { products } from '@/lib/products';

const STORAGE_KEY = 'guangwei_inquiries';

function generateInquiryNumber(): string {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `GW-${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}

interface ContactPageClientProps {
  lang: Language;
  prefillProduct?: string;
}

export default function ContactPageClient({ lang, prefillProduct = '' }: ContactPageClientProps) {
  const m = getMessage(lang);

  const [form, setForm] = useState({
    name: '', company: '', country: '', email: '', phone: '',
    product: prefillProduct, quantity: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryNumber, setInquiryNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<InquiryRecord[]>([]);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setHistory(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = lang === 'zh' ? '必填' : 'Required';
    if (!form.company.trim()) errs.company = lang === 'zh' ? '必填' : 'Required';
    if (!form.country.trim()) errs.country = lang === 'zh' ? '必填' : 'Required';
    if (!form.email.trim()) errs.email = lang === 'zh' ? '必填' : 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = lang === 'zh' ? '邮箱格式错误' : 'Invalid email';
    if (!form.message.trim()) errs.message = lang === 'zh' ? '必填' : 'Required';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, company: form.company, country: form.country,
          email: form.email, phone: form.phone,
          productType: form.product, quantity: form.quantity, message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiryNumber(data.inquiryNumber);
        setSubmitted(true);
        const record: InquiryRecord = {
          id: data.inquiryNumber,
          name: form.name, company: form.company, country: form.country,
          email: form.email, phone: form.phone,
          product: form.product, quantity: form.quantity, message: form.message,
          status: 'submitted',
          submittedAt: new Date().toISOString(),
          inquiryNumber: data.inquiryNumber,
        };
        const updated = [record, ...history];
        setHistory(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } else {
        setSubmitError(data.error?.message || 'Submission failed.');
      }
    } catch {
      setSubmitError(lang === 'zh' ? '网络错误，请重试' : 'Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [field]: e.target.value });

  return (
    <>
      <section style={{ background: 'linear-gradient(160deg, #0A0A0B 0%, #1C1C1E 100%)', padding: '64px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            <span style={{ display: 'block', width: 24, height: 2, background: '#C9A84C' }} />
            Contact
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: 12 }}>
            {m.contact.title}
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#9CA3AF', maxWidth: 480, margin: '0 auto' }}>
            {m.contact.subtitle}
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 0 80px', background: '#F9FAFB' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'start' }}>
            <div className="card" style={{ padding: '32px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                  <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 22, color: '#0A0A0B', marginBottom: 8 }}>{m.contact.success}</h2>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', marginBottom: 24 }}>{m.contact.successDesc}</p>
                  <div style={{ display: 'inline-block', padding: '16px 32px', background: '#FFFBF0', borderRadius: 12, border: '2px solid rgba(201,168,76,0.3)', marginBottom: 24 }}>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>{m.contact.inquiryNumber}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 900, color: '#C9A84C' }}>{inquiryNumber}</div>
                  </div>
                  <button onClick={() => { setSubmitted(false); setForm({ name:'',company:'',country:'',email:'',phone:'',product:'',quantity:'',message:'' }); }} className="btn-outline" style={{ display: 'inline-flex' }}>
                    {lang === 'zh' ? '提交新询盘' : 'Submit Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, color: '#0A0A0B', marginBottom: 24 }}>{lang === 'zh' ? '填写询盘表单' : 'Fill in the Inquiry Form'}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label className="form-label">{m.contact.name} *</label>
                      <input type="text" value={form.name} onChange={update('name')} className={`form-input${errors.name ? ' error' : ''}`} placeholder="John Smith" />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="form-label">{m.contact.company} *</label>
                      <input type="text" value={form.company} onChange={update('company')} className={`form-input${errors.company ? ' error' : ''}`} placeholder="ABC Eyewear Co." />
                      {errors.company && <p className="form-error">{errors.company}</p>}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label className="form-label">{m.contact.email} *</label>
                      <input type="email" value={form.email} onChange={update('email')} className={`form-input${errors.email ? ' error' : ''}`} placeholder="john@abceyewear.com" />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="form-label">{m.contact.country} *</label>
                      <input type="text" value={form.country} onChange={update('country')} className={`form-input${errors.country ? ' error' : ''}`} placeholder="United States" />
                      {errors.country && <p className="form-error">{errors.country}</p>}
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="form-label">{m.contact.phone}</label>
                    <input type="tel" value={form.phone} onChange={update('phone')} className="form-input" placeholder="+1 555 123 4567" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label className="form-label">{m.contact.product}</label>
                      <select value={form.product} onChange={update('product')} className="form-input">
                        <option value="">{lang === 'zh' ? '选择产品（可选）' : 'Select product (optional)'}</option>
                        {products.map(p => <option key={p.id} value={p.name[lang]}>{p.name[lang]}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">{m.contact.quantity}</label>
                      <input type="text" value={form.quantity} onChange={update('quantity')} className="form-input" placeholder={m.contact.quantityPlaceholder} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label className="form-label">{m.contact.message} *</label>
                    <textarea value={form.message} onChange={update('message')} className={`form-input${errors.message ? ' error' : ''}`} rows={5} placeholder={m.contact.emailPlaceholder} />
                    {errors.message && <p className="form-error">{errors.message}</p>}
                  </div>
                  {submitError && <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, color: '#DC2626', fontSize: 13, marginBottom: 16 }}>{submitError}</div>}
                  <button type="submit" disabled={submitting} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}>
                    {submitting ? `⏳ ${m.contact.submitting}` : `📨 ${m.contact.submit} →`}
                  </button>
                  <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 12, textAlign: 'center' }}>{m.contact.required}</p>
                </form>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, color: '#0A0A0B', marginBottom: 20 }}>{lang === 'zh' ? '联系方式' : 'Contact Info'}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { emoji: '📧', label: 'Email', value: 'info@guangwei-optics.com' },
                    { emoji: '📞', label: lang === 'zh' ? '电话' : 'Phone', value: '+86 131 0039 5383' },
                    { emoji: '💬', label: 'WhatsApp', value: '+86 131 0039 5383' },
                    { emoji: '📍', label: lang === 'zh' ? '地址' : 'Address', value: lang === 'zh' ? '中国浙江省温州市' : 'Wenzhou, Zhejiang, China' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{item.emoji}</span>
                      <div>
                        <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="https://wa.me/8613100395383" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: 20, background: '#25D366' }}>
                  💬 {m.whatsapp}
                </a>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, color: '#0A0A0B', marginBottom: 16 }}>📋 {m.contact.history}</h3>
                {history.length === 0 ? (
                  <p style={{ fontSize: 13, color: '#9CA3AF' }}>{m.contact.noHistory}</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {history.slice(0, 5).map(record => (
                      <div key={record.id} style={{ padding: '12px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #F3F4F6' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#9CA3AF' }}>#{record.inquiryNumber}</span>
                          <span className="badge badge-gold" style={{ fontSize: 9 }}>{m.contact.status[record.status]}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>{record.product || record.company || record.name}</div>
                        <div style={{ fontSize: 11, color: '#9CA3AF' }}>{new Date(record.submittedAt).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.04))', borderRadius: 12, border: '1px solid rgba(201,168,76,0.2)', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⚡</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 14, color: '#0A0A0B', marginBottom: 4 }}>
                  {lang === 'zh' ? '2小时响应保证' : '2-Hour Response Guarantee'}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280' }}>
                  {lang === 'zh' ? '每个询盘2小时内必有专业回复' : 'Every inquiry gets a reply within 2 hours'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
