'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Language } from '@/lib/types';
import { getMessage } from '@/lib/i18n';

export default function ProcessPageClient({ lang }: { lang: Language }) {
  const m = getMessage(lang);

  const steps = [
    { num: '01', title: m.process.step1, desc: m.process.step1Desc, duration: lang === 'zh' ? '2小时内回复' : 'Reply within 2 hours', icon: '💬', deliverable: lang === 'zh' ? '确认收到回复' : 'Acknowledgment + brief' },
    { num: '02', title: m.process.step2, desc: m.process.step2Desc, duration: lang === 'zh' ? '24小时内' : 'Within 24 hours', icon: '📋', deliverable: lang === 'zh' ? '详细报价单(PDF)' : 'Detailed quote (PDF)' },
    { num: '03', title: m.process.step3, desc: m.process.step3Desc, duration: lang === 'zh' ? '7-10天' : '7–10 days', icon: '🧪', deliverable: lang === 'zh' ? '样品+测试报告' : 'Sample + test report' },
    { num: '04', title: m.process.step4, desc: m.process.step4Desc, duration: lang === 'zh' ? '确认后生产' : 'Starts on confirmation', icon: '🏭', deliverable: lang === 'zh' ? '生产进度照片/视频' : 'Production photos/video' },
    { num: '05', title: m.process.step5, desc: m.process.step5Desc, duration: lang === 'zh' ? '20-30天' : '20–30 days', icon: '🚢', deliverable: lang === 'zh' ? '提单+检验报告' : 'B/L + inspection report' },
  ];

  const faqs = [
    { q: lang === 'zh' ? '你们的最低起订量是多少？' : 'What is your minimum order quantity?', a: lang === 'zh' ? '大多数款式MOQ为3,000副/款。奢华款（如纯钛）MOQ为1,000副。部分特价款MOQ可降至1,000副。批量订单可协商更优惠的价格。' : 'Most styles have MOQ of 3,000 pcs/model. Luxury styles (e.g. pure titanium) start at 1,000 pcs. Some promotional styles can go as low as 1,000. Volume discounts are negotiable.' },
    { q: lang === 'zh' ? '样品费用是多少？' : 'How much do samples cost?', a: lang === 'zh' ? '样品费用根据款式复杂度，一般为$15–50/副，含运费。我们会在您下批量订单时全额抵扣样品费用（限一次）。' : 'Sample cost varies by style complexity, typically $15–50/pair including shipping. We credit sample costs toward your first bulk order (one time).' },
    { q: lang === 'zh' ? '生产周期多长？' : 'What is the production lead time?', a: lang === 'zh' ? '从确认订单并收到定金起，标准生产周期为20-30天。样品制作7-10天。旺季（3-9月）可能需要35-40天，请提前规划。' : 'Standard production is 20–30 days from order confirmation and deposit. Sample production is 7–10 days. Peak season (Mar–Sep) may require 35–40 days — please plan ahead.' },
    { q: lang === 'zh' ? '支持哪些付款方式？' : 'What payment methods do you accept?', a: lang === 'zh' ? '批量订单：30%定金，70%发货前付清。支持T/T电汇、西联汇款。样品：PayPal或信用卡。长期合作客户可申请信用额度。' : 'Bulk orders: 30% deposit, 70% before shipment. We accept T/T wire transfer and Western Union. Samples: PayPal or credit card. Long-term clients may apply for credit terms.' },
    { q: lang === 'zh' ? '可以贴我们的品牌吗？' : 'Can we use our own brand / logo?', a: lang === 'zh' ? '完全可以。我们提供全套定制服务：镜腿logo印刷（丝印/激光/压印）、镜片激光刻字、金属铭牌、礼盒包装定制。全部在工厂内完成，品质可控。' : 'Absolutely. We offer full customization: temple logo printing (screen/laser/emboss), lens laser engraving, metal logo plaques, and custom gift boxes. All done in-house for quality control.' },
    { q: lang === 'zh' ? '如何保证品质？' : 'How do you ensure quality?', a: lang === 'zh' ? '每批货发货前，我们的QC团队会按AQL 2.5标准抽检。偏光镜片的偏光率、UV透光率都会用专业设备检测。我们可以提供检测报告和出货视频。' : 'Every batch is inspected by our QC team to AQL 2.5 standards before shipment. Polarized lens polarizing rate and UV transmittance are tested with professional equipment. We provide inspection reports and loading videos.' },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <section style={{ background: 'linear-gradient(160deg, #0A0A0B 0%, #1C1C1E 100%)', padding: '64px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div className="section-label" style={{ justifyContent: 'center', color: '#C9A84C' }}><span />Process</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: 12 }}>{m.process.title}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#9CA3AF', maxWidth: 480, margin: '0 auto' }}>{m.process.subtitle}</p>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 0, alignItems: 'center' }}>
                <div style={{ padding: '32px 40px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-block', padding: '2px 10px', background: 'rgba(201,168,76,0.1)', color: '#A8893A', fontSize: 11, fontWeight: 700, borderRadius: 100, marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{step.duration}</div>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, color: '#0A0A0B', marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 12 }}>{step.desc}</p>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}><span style={{ fontWeight: 600, color: '#C9A84C' }}>{lang === 'zh' ? '交付物：' : 'Deliverable: '}</span>{step.deliverable}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, position: 'relative' }}>
                  <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #C9A84C 0%, #D4B85C 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: '0 4px 16px rgba(201,168,76,0.3)', zIndex: 1 }}>{step.icon}</div>
                  <div style={{ width: 2, flex: 1, minHeight: 60, background: 'linear-gradient(to bottom, #C9A84C, #E5E7EB)' }} />
                </div>
                <div style={{ padding: '32px 40px' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0A0A0B', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: 16 }}>{lang === 'zh' ? '从第一步开始' : 'Start From Step One'}</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#9CA3AF', marginBottom: 32 }}>{lang === 'zh' ? '告诉我们您的需求，2小时内获得专业回复。' : 'Tell us your requirements and get a professional reply within 2 hours.'}</p>
          <Link href={`/${lang}/contact`} className="btn-gold" style={{ display: 'inline-flex', fontSize: 15, padding: '14px 36px' }}>{m.cta.button} →</Link>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#F9FAFB' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span />FAQ</div>
            <h2 className="section-title">{lang === 'zh' ? '常见问题' : 'Frequently Asked Questions'}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A0B' }}>{faq.q}</span>
                  <span style={{ fontSize: 20, color: '#C9A84C', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 200ms ease', flexShrink: 0 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', borderTop: '1px solid #F3F4F6' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', lineHeight: 1.75, paddingTop: 16 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
