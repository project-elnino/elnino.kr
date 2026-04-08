'use client'

import { Zap, ScanSearch, Lock, ShieldCheck, Cloud, Monitor, Smartphone, Laptop, Timer, MessagesSquare } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from '@/lib/i18n'

export default function ServiceIntroPage() {
  const { t } = useTranslation()

  /* ── helpers ── */
  const inner = (children: React.ReactNode, style?: React.CSSProperties) => (
    <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', padding: '0 60px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...style }}>
      {children}
    </div>
  )

  const label = (text: string) => (
    <p style={{ fontSize: 11, fontWeight: 700, color: '#2563eb', letterSpacing: 1.5, textTransform: 'uppercase' as const, marginBottom: 8 }}>{text}</p>
  )

  const title = (text: string, mb = 16) => (
    <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.25, letterSpacing: -0.5, color: '#1b1f2b', marginBottom: mb }}>{text}</h2>
  )

  const subtitle = (text: string) => (
    <p style={{ fontSize: 15, color: '#6e7489', lineHeight: 1.75, marginBottom: 28, whiteSpace: 'pre-line' }}>{text}</p>
  )

  const checkList = (items: string[], color = '#2563eb') => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 14, color: '#3d4250', lineHeight: 2, paddingLeft: 24, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, color, fontWeight: 700 }}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* Deck */}
      <div className="deck-viewport">
      <div className="deck-track">

        {/* ── 1  COVER ── */}
        <section className="slide slide--cover">
          {inner(
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', flex: 1 }}>
              <Image src="/logo.png" alt="Knoc" width={52} height={52} style={{ marginBottom: 32 }} />
              {label(t('serviceIntro.cover.label'))}
              <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.15, color: '#fff', marginBottom: 20, letterSpacing: -0.5 }}>
                {t('serviceIntro.cover.title')}
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, whiteSpace: 'pre-line', maxWidth: 600 }}>
                {t('serviceIntro.cover.subtitle')}
              </p>
            </div>
          )}
        </section>

        {/* ── 2  PROBLEM ── */}
        <section className="slide">
          {inner(
            <>
              {label(t('serviceIntro.problem.label'))}
              {title(t('serviceIntro.problem.title'))}
              {subtitle(t('serviceIntro.problem.subtitle'))}
              <div className="slide__cards slide__cards--3">
                {[0, 1, 2].map(i => (
                  <div key={i} className="slide__card">
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#2563eb', lineHeight: 1.1 }}>{t(`serviceIntro.problem.cards.${i}.num`)}</div>
                    <div style={{ fontSize: 10, color: '#a5aab8', marginBottom: 12 }}>{t(`serviceIntro.problem.cards.${i}.unit`)}</div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{t(`serviceIntro.problem.cards.${i}.title`)}</h4>
                    <p style={{ fontSize: 12, color: '#6e7489', lineHeight: 1.6 }}>{t(`serviceIntro.problem.cards.${i}.desc`)}</p>
                  </div>
                ))}
              </div>
              <div style={{ padding: '16px 20px', borderRadius: 10, background: '#2563eb', marginTop: 20 }}>
                <p style={{ fontSize: 13, color: '#fff', fontWeight: 600, margin: 0 }}>{t('serviceIntro.problem.callout')}</p>
              </div>
            </>
          )}
        </section>

        {/* ── 3  SOLUTION + KEY FEATURES ── */}
        <section className="slide slide--muted">
          {inner(
            <>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                {label(t('serviceIntro.solution.label'))}
                {title(t('serviceIntro.solution.title'), 10)}
                {subtitle(t('serviceIntro.solution.subtitle'))}
              </div>

              {/* Checklist row */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
                {[0, 1, 2, 3].map(i => (
                  <span key={i} style={{ fontSize: 12, color: '#3d4250', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#2563eb', fontWeight: 700 }}>✓</span>
                    {t(`serviceIntro.solution.points.${i}`)}
                  </span>
                ))}
              </div>

              {/* Feature tiles 2×2 */}
              <div className="slide__cards slide__cards--2" style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
                {[0, 1, 2, 3].map(i => {
                  const icons = [Zap, Timer, ScanSearch, MessagesSquare]
                  const Icon = icons[i]
                  return (
                    <div key={i} className="slide__card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: '#eff4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={22} style={{ color: '#2563eb' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: '#1b1f2b' }}>{t(`serviceIntro.features.tiles.${i}.title`)}</h4>
                        <p style={{ fontSize: 12, color: '#6e7489', lineHeight: 1.6, margin: 0 }}>{t(`serviceIntro.features.tiles.${i}.desc`)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </section>

        {/* ── 4  FOR SPEAKERS — 발표자 준비 ── */}
        <section className="slide">
          {inner(
            <>
              <div style={{ marginBottom: 16 }}>
                {label(t('serviceIntro.howItWorks.label'))}
                {title(t('serviceIntro.howItWorks.title'), 20)}
                {subtitle(t('serviceIntro.howItWorks.subtitle'))}
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                  <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #dfe1e8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 10 }}>
                    <Image src="/images/webclient.png" alt="웹 클라이언트 방 설정" width={700} height={440} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1b1f2b', marginBottom: 2 }}>{t('serviceIntro.howItWorks.steps.0.title')}</div>
                  <div style={{ fontSize: 11, color: '#6e7489', lineHeight: 1.5 }}>{t('serviceIntro.howItWorks.steps.0.desc')}</div>
                </div>
                <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                  <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #dfe1e8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 10 }}>
                    <Image src="/images/webclient-qr-open.png" alt="QR 코드 공유" width={560} height={350} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1b1f2b', marginBottom: 2 }}>{t('serviceIntro.howItWorks.steps.1.title')}</div>
                  <div style={{ fontSize: 11, color: '#6e7489', lineHeight: 1.5 }}>{t('serviceIntro.howItWorks.steps.1.desc')}</div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* ── 5  ON-SITE SCREEN — 현장 스크린 자막 ── */}
        <section className="slide slide--muted">
          {inner(
            <>
              <div style={{ marginBottom: 16 }}>
                {label(t('serviceIntro.screen.label'))}
                {title(t('serviceIntro.screen.title'), 18)}
                <p style={{ fontSize: 11, color: '#6e7489', lineHeight: 1.6, marginTop: 6, maxWidth: '70%' }}>{t('serviceIntro.screen.subtitle')}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: 8 }}>
                  {[0, 1, 2, 3].map(i => (
                    <span key={i} style={{ fontSize: 10, color: '#4b5066', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
                      {t(`serviceIntro.screen.points.${i}`)}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px', maxWidth: 320, borderRadius: 10, overflow: 'hidden', border: '1px solid #dfe1e8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <Image src="/images/overlay-lang-select.png" alt="오버레이 언어 선택" width={400} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <div style={{ flex: '2 1 300px', borderRadius: 10, overflow: 'hidden', border: '1px solid #dfe1e8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <Image src="/images/overlay-with-real-video.png" alt="실제 영상 위 자막" width={960} height={540} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            </>
          )}
        </section>

        {/* ── 6  FOR PARTICIPANTS — 참가자 접속 ── */}
        <section className="slide slide--muted">
          {inner(
            <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 280px', minWidth: 0 }}>
                {label(t('serviceIntro.participant.label'))}
                {title(t('serviceIntro.participant.title'))}
                {subtitle(t('serviceIntro.participant.subtitle'))}
                {checkList([0, 1, 2, 3].map(i => t(`serviceIntro.participant.points.${i}`)))}
              </div>
              <div style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { src: '/images/subtitleroom-name-input.png', alt: '방 이름 입력', label: '방 이름 입력' },
                  { src: '/images/subtitleroom-langselect.png', alt: '언어 선택', label: '언어 선택' },
                  { src: '/images/subtitleroom.png', alt: '자막 수신', label: '자막 수신' },
                ].map((img, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div className="mockup-phone" style={{ width: 130 }}>
                        <div className="mockup-phone__notch"><span /></div>
                        <div style={{ height: 220, overflow: 'hidden' }}>
                          <Image src={img.src} alt={img.alt} width={360} height={640} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <div className="mockup-phone__bar"><span /></div>
                      </div>
                      <span style={{ fontSize: 10, color: '#6e7489', fontWeight: 600 }}>{img.label}</span>
                    </div>
                    {i < 2 && <span style={{ color: '#dfe1e8', fontSize: 18, flexShrink: 0 }}>→</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── 7  DASHBOARD ── */}
        <section className="slide">
          {inner(
            <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 250px', minWidth: 0 }}>
                {label('DASHBOARD')}
                {title(t('dashboard.title'), 20)}
                <p style={{ fontSize: 12, color: '#6e7489', lineHeight: 1.7, marginTop: 10 }}>{t('dashboard.description')}</p>
              </div>
              <div style={{ flex: '2 1 400px', minWidth: 0, borderRadius: 10, overflow: 'hidden', border: '1px solid #dfe1e8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <Image src="/images/dashboard.png" alt="Knoc Dashboard" width={960} height={540} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          )}
        </section>

        {/* ── 8  USE CASES ── */}
        <section className="slide">
          {inner(
            <>
              {label(t('serviceIntro.useCases.label'))}
              {title(t('serviceIntro.useCases.title'), 40)}
              <div className="slide__cards slide__cards--2" style={{ gap: 24 }}>
                {/* Enterprise */}
                <div style={{ padding: 28, borderRadius: 12, background: '#eff4ff' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#2563eb', marginBottom: 16 }}>{t('serviceIntro.useCases.enterprise.label')}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[0, 1, 2, 3].map(i => (
                      <li key={i} style={{ fontSize: 13, color: '#3d4250', lineHeight: 2, paddingLeft: 16, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>·</span>
                        {t(`serviceIntro.useCases.enterprise.items.${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Institution */}
                <div style={{ padding: 28, borderRadius: 12, background: '#ecfdf5' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#059669', marginBottom: 16 }}>{t('serviceIntro.useCases.institution.label')}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[0, 1, 2, 3].map(i => (
                      <li key={i} style={{ fontSize: 13, color: '#3d4250', lineHeight: 2, paddingLeft: 16, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#059669' }}>·</span>
                        {t(`serviceIntro.useCases.institution.items.${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </section>

        {/* ── 9  CASE STUDY ── */}
        <section className="slide slide--muted">
          {inner(
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                <Image src="/logos/konkuk.webp" alt="건국대학교" width={140} height={40} style={{ objectFit: 'contain' }} />
              </div>
              {label(t('serviceIntro.caseStudy.label'))}
              {title(t('serviceIntro.caseStudy.title'), 8)}
              <p style={{ fontSize: 13, color: '#6e7489', marginBottom: 28 }}>{t('serviceIntro.caseStudy.context')}</p>

              <div className="slide__cards slide__cards--2" style={{ gap: 20, marginBottom: 24 }}>
                {[0, 1].map(i => (
                  <div key={i} className="slide__quote">
                    <p style={{ fontSize: 13, color: '#3d4250', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                      &ldquo;{t(`serviceIntro.caseStudy.quotes.${i}.text`)}&rdquo;
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2563eb10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#2563eb' }}>
                        {t(`serviceIntro.caseStudy.quotes.${i}.name`).charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#1b1f2b' }}>{t(`serviceIntro.caseStudy.quotes.${i}.name`)}</div>
                        <div style={{ fontSize: 10, color: '#a5aab8' }}>{t(`serviceIntro.caseStudy.quotes.${i}.role`)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, padding: '12px 20px', borderRadius: 8, background: '#fff', border: '1px solid #dfe1e8' }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#2563eb' }}>{t('serviceIntro.caseStudy.stat')}</span>
                <span style={{ fontSize: 13, color: '#6e7489' }}>{t('serviceIntro.caseStudy.statLabel')}</span>
              </div>
            </>
          )}
        </section>

        {/* ── 10  SECURITY & COMPATIBILITY ── */}
        <section className="slide">
          {inner(
            <>
              {label(t('serviceIntro.security.label'))}
              {title(t('serviceIntro.security.title'), 40)}
              <div className="slide__cards slide__cards--2" style={{ gap: 48 }}>
                {/* Security */}
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1b1f2b', marginBottom: 20 }}>{t('serviceIntro.security.securityTitle')}</h3>
                  {[0, 1, 2].map(i => {
                    const icons = [Lock, ShieldCheck, Cloud]
                    const Icon = icons[i]
                    return (
                      <div key={i} className="slide__sec-item">
                        <div className="slide__sec-icon slide__sec-icon--blue"><Icon size={18} /></div>
                        <div>
                          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1b1f2b', marginBottom: 2 }}>{t(`serviceIntro.security.securityItems.${i}.title`)}</h4>
                          <p style={{ fontSize: 11, color: '#6e7489', lineHeight: 1.6, margin: 0 }}>{t(`serviceIntro.security.securityItems.${i}.desc`)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {/* Compatibility */}
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1b1f2b', marginBottom: 20 }}>{t('serviceIntro.security.compatTitle')}</h3>
                  {[0, 1, 2].map(i => {
                    const icons = [Monitor, Smartphone, Laptop]
                    const Icon = icons[i]
                    return (
                      <div key={i} className="slide__sec-item">
                        <div className="slide__sec-icon slide__sec-icon--green"><Icon size={18} /></div>
                        <div>
                          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1b1f2b', marginBottom: 2 }}>{t(`serviceIntro.security.compatItems.${i}.title`)}</h4>
                          <p style={{ fontSize: 11, color: '#6e7489', lineHeight: 1.6, margin: 0 }}>{t(`serviceIntro.security.compatItems.${i}.desc`)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </section>

        {/* ── 12  PRICING ── */}
        <section className="slide slide--muted">
          {inner(
            <>
              {label(t('serviceIntro.pricing.label'))}
              {title(t('serviceIntro.pricing.title'), 32)}
              <div className="slide__plans">
                {/* PAYG */}
                <div className="slide__plan slide__plan--std">
                  <div className="slide__plan-name">{t('serviceIntro.pricing.payg.name')}</div>
                  <div style={{ fontSize: 10, color: '#a5aab8', marginBottom: 14 }}>{t('serviceIntro.pricing.payg.sub')}</div>
                  <div className="slide__plan-price">{t('serviceIntro.pricing.payg.price')}</div>
                  <div className="slide__plan-unit">{t('serviceIntro.pricing.payg.unit')}</div>
                  <ul>{[0, 1, 2, 3].map(i => <li key={i}>{t(`serviceIntro.pricing.payg.features.${i}`)}</li>)}</ul>
                </div>
                {/* Custom */}
                <div className="slide__plan slide__plan--pro">
                  <div className="slide__plan-name">{t('serviceIntro.pricing.custom.name')}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>{t('serviceIntro.pricing.custom.sub')}</div>
                  <div className="slide__plan-price">{t('serviceIntro.pricing.custom.price')}</div>
                  <div className="slide__plan-unit">{t('serviceIntro.pricing.custom.unit')}</div>
                  <ul>{[0, 1, 2, 3].map(i => <li key={i}>{t(`serviceIntro.pricing.custom.features.${i}`)}</li>)}</ul>
                </div>
              </div>
              {/* Competitor comparison — horizontal bars */}
              <div style={{ padding: '20px 24px', borderRadius: 12, background: '#fff', border: '1px solid #dfe1e8', marginTop: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#6e7489', marginBottom: 16 }}>{t('serviceIntro.pricing.compareTitle')}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[0, 1, 2, 3].map(i => {
                    const isKnoc = i === 3
                    const widths = ['100%', '40%', '20%', '6.6%']
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 10, color: isKnoc ? '#2563eb' : '#6e7489', fontWeight: isKnoc ? 700 : 500, width: 130, flexShrink: 0, textAlign: 'right' }}>
                          {t(`serviceIntro.pricing.competitors.${i}.name`)}
                        </span>
                        <div style={{ flex: 1, height: 24, background: '#f4f5f8', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                          <div style={{
                            width: widths[i],
                            height: '100%',
                            background: isKnoc ? '#2563eb' : '#dfe1e8',
                            borderRadius: 4,
                            transition: 'width 0.6s ease',
                          }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: isKnoc ? '#2563eb' : '#3d4250', width: 50, flexShrink: 0 }}>
                          {t(`serviceIntro.pricing.competitors.${i}.price`)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </section>

        {/* ── 12  GET STARTED ── */}
        <section className="slide">
          {inner(
            <>
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                {label(t('serviceIntro.getStarted.label'))}
                {title(t('serviceIntro.getStarted.title'))}
                {subtitle(t('serviceIntro.getStarted.subtitle'))}
              </div>

              <div className="slide__steps" style={{ marginBottom: 32 }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'contents' }}>
                    <div className="slide__step">
                      <div className="slide__step-num">{i + 1}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{t(`serviceIntro.getStarted.steps.${i}.title`)}</div>
                      <div style={{ fontSize: 11, color: '#6e7489', lineHeight: 1.5 }}>{t(`serviceIntro.getStarted.steps.${i}.desc`)}</div>
                    </div>
                    {i < 3 && <div className="slide__arrow">→</div>}
                  </div>
                ))}
              </div>

              <div style={{ padding: '14px 20px', borderRadius: 8, background: '#ecfdf5', marginBottom: 28 }}>
                <strong style={{ fontSize: 12, color: '#059669' }}>{t('serviceIntro.getStarted.calloutTitle')}</strong>
                <p style={{ fontSize: 11, color: '#6e7489', margin: '4px 0 0' }}>{t('serviceIntro.getStarted.calloutDesc')}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24, marginBottom: 28 }}>
                {(['EMAIL', 'WEB', 'DASHBOARD', 'HOURS'] as const).map((k) => {
                  const keys: Record<string, string> = { EMAIL: 'contactEmail', WEB: 'contactWeb', DASHBOARD: 'contactDashboard', HOURS: 'contactHours' }
                  return (
                    <div key={k}>
                      <dt style={{ fontSize: 9, color: '#a5aab8', fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>{k}</dt>
                      <dd style={{ fontSize: 13, color: '#1b1f2b', fontWeight: 500, margin: 0 }}>{t(`serviceIntro.getStarted.${keys[k]}`)}</dd>
                    </div>
                  )
                })}
              </div>

              <div style={{ textAlign: 'center' }}>
                <a href={t('serviceIntro.getStarted.ctaLink')} className="slide__cta-link">
                  {t('serviceIntro.getStarted.ctaButton')}
                </a>
              </div>

              <p style={{ fontSize: 10, color: '#a5aab8', textAlign: 'center', marginTop: 24 }}>{t('serviceIntro.getStarted.legal')}</p>
            </>
          )}
        </section>

      </div>
      </div>
    </>
  )
}
