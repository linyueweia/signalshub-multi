'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Language } from '@/lib/types';
import { getMessage } from '@/lib/i18n';

export default function FactoryPageClient({ lang }: { lang: Language }) {
  const m = getMessage(lang);

  const stats = [
    { value: '15,000', unit: 'm²', label: lang === 'zh' ? '生产面积' : 'Production Area' },
    { value: '500+', unit: '', label: lang === 'zh' ? '员工人数' : 'Employees' },
    { value: '2M+', unit: '', label: lang === 'zh' ? '年产能(副)' : 'Annual Capacity' },
    { value: '35+', unit: '', label: lang === 'zh' ? '出口国家' : 'Export Countries' },
    { value: '12', unit: '', label: lang === 'zh' ? '生产线' : 'Production Lines' },
    { value: '50+', unit: '', label: lang === 'zh' ? '每年新品' : 'New Styles / Year' },
  ];

  const certs = [
    { name: 'CE', desc: lang === 'zh' ? '欧盟安全认证' : 'EU Safety Certification', issued: '2008' },
    { name: 'FDA', desc: lang === 'zh' ? '美国食品药物管理局' : 'US Food & Drug Admin', issued: '2010' },
    { name: 'ISO9001', desc: lang === 'zh' ? '质量管理体系' : 'Quality Management System', issued: '2012' },
    { name: 'BSCI', desc: lang === 'zh' ? '商业社会责任' : 'Business Social Compliance', issued: '2015' },
    { name: 'CPSIA', desc: lang === 'zh' ? '美国消费品安全' : 'US Consumer Product Safety', issued: '2016' },
    { name: 'REACH', desc: lang === 'zh' ? '欧盟化学品注册' : 'EU Chemical Registration', issued: '2018' },
  ];

  const facilities = [
    { emoji: '🏭', title: lang === 'zh' ? '注塑成型车间' : 'Injection Molding', desc: lang === 'zh' ? '12台注塑机，年产能200万副塑料框' : '12 machines, 2M pairs/year plastic frames' },
    { emoji: '⚙️', title: lang === 'zh' ? '金属加工车间' : 'Metal Processing', desc: lang === 'zh' ? '数控机床、激光切割、镀金生产线' : 'CNC, laser cutting, gold plating line' },
    { emoji: '🔬', title: lang === 'zh' ? '品质检测实验室' : 'QC Laboratory', desc: lang === 'zh' ? '分光计、冲击测试、UV透光率检测' : 'Spectrometer, impact test, UV transmittance' },
    { emoji: '📦', title: lang === 'zh' ? '自动化仓储' : 'Automated Warehouse', desc: lang === 'zh' ? '10,000㎡立体仓，条码管理系统' : '10,000㎡ automated storage, barcode system' },
    { emoji: '🧪', title: lang === 'zh' ? '镜片加工中心' : 'Lens Processing Center', desc: lang === 'zh' ? '全自动镜片切割、磨边、镀膜' : 'Auto lens cutting, edging, coating' },
    { emoji: '🎨', title: lang === 'zh' ? '印刷包装车间' : 'Print & Package', desc: lang === 'zh' ? '丝印、烫金、吸塑包装、礼盒包装' : 'Screen print, foil stamp, blister pack' },
  ];

  const team = [
    { name: lang === 'zh' ? '王总' : 'Mr. Wang', role: lang === 'zh' ? '总经理 · 创始人' : 'General Manager · Founder', exp: lang === 'zh' ? '27年行业经验' : '27 years industry experience', img: 'factory-manager' },
    { name: lang === 'zh' ? '李工' : 'Mr. Li', role: lang === 'zh' ? '技术总监' : 'Technical Director', exp: lang === 'zh' ? '光学工程专家，15年' : 'Optics engineering expert, 15 years', img: 'factory-tech' },
    { name: lang === 'zh' ? '张经理' : 'Ms. Zhang', role: lang === 'zh' ? '外贸部经理' : 'Export Manager', exp: lang === 'zh' ? '专业英语八级，12年出口经验' : 'TEM-8, 12 years export experience', img: 'factory-export' },
    { name: lang === 'zh' ? '陈工' : 'Mr. Chen', role: lang === 'zh' ? '品质总监' : 'Quality Director', exp: lang === 'zh' ? 'ISO审核员，品质体系20年' : 'ISO auditor, 20 years QA systems', img: 'factory-qc' },
  ];

  return (
    <>
      <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #0A0A0B 0%, #1C1C1E 100%)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="https://picsum.photos/seed/factory-overview/1600/900" alt="Guangwei Optics Factory" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.25 }} priority />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,11,0.8) 0%, rgba(10,10,11,0.4) 100%)' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px', width: '100%', position: 'relative' }}>
          <div className="section-label" style={{ color: '#C9A84C' }}><span />Factory</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: 16, maxWidth: 640 }}>{m.factory.title}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#9CA3AF', maxWidth: 560, lineHeight: 1.7 }}>{m.factory.subtitle}</p>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: '48px 0', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px 16px', borderRight: i < stats.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.4rem, 2vw, 2rem)', fontWeight: 900, color: '#C9A84C', lineHeight: 1 }}>{s.value}<span style={{ fontSize: '0.5em' }}>{s.unit}</span></div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="section-label"><span />About Guangwei</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>{lang === 'zh' ? '27年匠心制造' : '27 Years of Precision Manufacturing'}</h2>
              <div className="divider-gold" />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#4B5563', lineHeight: 1.8, marginBottom: 20 }}>
                {lang === 'zh' ? '光威光学有限公司成立于1999年，位于中国浙江省温州市。经过27年的发展，已成为国内规模最大、产品线最完整的太阳镜制造商之一。我们的客户遍及全球35个国家，包括多家世界500强零售企业和知名时尚品牌。'
                  : 'Guangwei Optics Co., Ltd. was founded in 1999 in Wenzhou, Zhejiang, China. After 27 years of development, we have become one of the largest and most complete eyewear manufacturers in China, serving clients across 35 countries including Fortune 500 retailers and renowned fashion brands.'}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#4B5563', lineHeight: 1.8 }}>
                {lang === 'zh' ? '从模具开发到批量生产，从镜片加工到包装出货，我们提供全流程一站式服务。严格的质量控制体系确保每副眼镜都达到或超过国际标准。'
                  : 'From mold development to mass production, from lens processing to packaging and shipping, we offer comprehensive one-stop service. Our strict quality control system ensures every pair meets or exceeds international standards.'}
              </p>
            </div>
            <div style={{ position: 'relative', height: 400, borderRadius: 16, overflow: 'hidden' }}>
              <Image src="https://picsum.photos/seed/factory-team/800/600" alt="Factory team" fill sizes="50vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#F9FAFB' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span />Facility</div>
            <h2 className="section-title">{lang === 'zh' ? '生产设施' : 'Production Facilities'}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {facilities.map((f, i) => (
              <div key={i} className="card" style={{ padding: '24px' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.emoji}</div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A0B', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span />Certifications</div>
            <h2 className="section-title">{m.factory.certifications}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6B7280', maxWidth: 560, margin: '0 auto' }}>{m.factory.certificationsDetail}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
            {certs.map(cert => (
              <div key={cert.name} style={{ padding: '28px 20px', background: '#FAFAFA', borderRadius: 12, border: '1px solid #E5E7EB', textAlign: 'center', transition: 'all 200ms ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; (e.currentTarget as HTMLElement).style.background = '#FFFBF0'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLElement).style.background = '#FAFAFA'; }}>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 28, fontWeight: 900, color: '#C9A84C', marginBottom: 8 }}>{cert.name}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', marginBottom: 4 }}>{cert.desc}</div>
                <div style={{ fontSize: 11, color: '#9CA3AF' }}>Since {cert.issued}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#F9FAFB' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span />Team</div>
            <h2 className="section-title">{m.factory.team}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
            {team.map(member => (
              <div key={member.name} className="card" style={{ textAlign: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: 200, background: '#F3F4F6' }}>
                  <Image src={`https://picsum.photos/seed/${member.img}/400/400`} alt={member.name} fill sizes="220px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px 16px' }}>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, color: '#0A0A0B', marginBottom: 4 }}>{member.name}</h3>
                  <div style={{ fontSize: 12, color: '#C9A84C', fontWeight: 600, marginBottom: 6 }}>{member.role}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{member.exp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0A0A0B', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: 16 }}>
            {lang === 'zh' ? '准备好参观我们的工厂了吗？' : 'Ready to Visit Our Factory?'}
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#9CA3AF', lineHeight: 1.7, marginBottom: 32 }}>
            {lang === 'zh' ? '我们可以安排视频参观或现场访问。请联系我们的外贸团队。' : 'We can arrange video tours or on-site visits. Contact our export team.'}
          </p>
          <Link href={`/${lang}/contact`} className="btn-gold" style={{ display: 'inline-flex', fontSize: 15, padding: '14px 36px' }}>{m.cta.button} →</Link>
        </div>
      </section>
    </>
  );
}
