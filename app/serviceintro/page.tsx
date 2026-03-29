'use client'

import { Download } from 'lucide-react'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { useTranslation } from '@/lib/i18n'

export default function ServiceIntroPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white text-foreground">
      <div className="site-topbar"><Topbar /></div>

      <button className="si-download-btn" onClick={() => window.print()}>
        <Download size={14} />
        {t('serviceIntro.pdfDownload')}
      </button>
      <div className="si">

        {/* PAGE 1: COVER */}
        <div className="page cover">
          <div className="cover-inner">
            <div className="cover-nav">
              <div className="cover-wordmark">Knoc</div>
              <div className="cover-date">2026</div>
            </div>
            <div className="cover-hero">
              <div className="cover-strip"></div>
              <h1>{t('serviceIntro.cover.title')} <em>{t('serviceIntro.cover.titleHighlight')}</em>,<br />{t('serviceIntro.cover.titleAfter')}</h1>
              <p>{t('serviceIntro.cover.description')}</p>
            </div>
            <div className="cover-foot">
              <div className="cover-foot-left">elnino.kr<br />cloud.elnino.kr<br />contact@elnino.kr<br /><span style={{opacity: 0.5, fontSize: '6.5pt'}}>{t('serviceIntro.overlayNote')}</span></div>
              <dl className="cover-kpi">
                <div><dt>{t('serviceIntro.cover.kpiLanguages')}</dt><dd>{t('serviceIntro.cover.kpiLanguagesLabel')}</dd></div>
                <div><dt>{t('serviceIntro.cover.kpiAccuracy')}</dt><dd>{t('serviceIntro.cover.kpiAccuracyLabel')}</dd></div>
                <div><dt>{t('serviceIntro.cover.kpiConcurrent')}</dt><dd>{t('serviceIntro.cover.kpiConcurrentLabel')}</dd></div>
              </dl>
            </div>
          </div>
        </div>

        {/* PAGE 2: WHY NOW */}
        <div className="page">
          <div className="inner">
            <div className="topbar"><span className="left">Knoc by Elnino</span><span>{t('serviceIntro.topbar')}</span></div>
            <div className="sec-num">{t('serviceIntro.whyNow.num')}</div>
            <div className="sec-title">{t('serviceIntro.whyNow.title')}</div>
            <p className="lead">{t('serviceIntro.whyNow.lead')}</p>
            <div className="trend-cards">
              {[0, 1, 2].map((i) => (
                <div key={i} className="trend-card">
                  <div className="trend-num">{t(`serviceIntro.whyNow.trends.${i}.num`)}</div>
                  <div className="trend-unit">{t(`serviceIntro.whyNow.trends.${i}.unit`)}</div>
                  <div className="trend-desc">{t(`serviceIntro.whyNow.trends.${i}.desc`)}<br /><span className="trend-source">{t(`serviceIntro.whyNow.trends.${i}.source`)}</span></div>
                </div>
              ))}
            </div>
            <div className="contrast-row">
              <div className="contrast-box old">
                <h4>{t('serviceIntro.whyNow.oldTitle')}</h4>
                <ul>
                  {[0, 1, 2, 3].map((i) => <li key={i}>{t(`serviceIntro.whyNow.oldItems.${i}`)}</li>)}
                </ul>
              </div>
              <div className="contrast-box new">
                <h4>{t('serviceIntro.whyNow.newTitle')}</h4>
                <ul>
                  {[0, 1, 2, 3].map((i) => <li key={i}>{t(`serviceIntro.whyNow.newItems.${i}`)}</li>)}
                </ul>
              </div>
            </div>
            <div className="callout blue">
              <strong>{t('serviceIntro.whyNow.calloutTitle')}</strong>
              <p>{t('serviceIntro.whyNow.calloutDesc')}</p>
            </div>
          </div>
        </div>

        {/* PAGE 3: PROBLEMS */}
        <div className="page">
          <div className="inner">
            <div className="topbar"><span className="left">Knoc by Elnino</span><span>{t('serviceIntro.topbar')}</span></div>
            <div className="sec-num">{t('serviceIntro.problems.num')}</div>
            <div className="sec-title">{t('serviceIntro.problems.title')}</div>
            <p className="lead">{t('serviceIntro.problems.lead')}</p>
            <div className="problem-stack">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="problem-row">
                  <div className="n">{i + 1}</div>
                  <div>
                    <div className="t">{t(`serviceIntro.problems.items.${i}.title`)}</div>
                    <div className="d">{t(`serviceIntro.problems.items.${i}.desc`)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="stat-strip">
              {[0, 1, 2].map((i) => (
                <div key={i} className="stat-strip-item">
                  <span className="stat-strip-num">{t(`serviceIntro.problems.stats.${i}.value`)}</span>
                  <span className="stat-strip-label">{t(`serviceIntro.problems.stats.${i}.label`)}</span>
                </div>
              ))}
            </div>
            <div className="callout blue">
              <strong>{t('serviceIntro.problems.calloutTitle')}</strong>
              <p>{t('serviceIntro.problems.calloutDesc')}</p>
            </div>
          </div>
        </div>

        {/* PAGE 4: SOLUTION */}
        <div className="page">
          <div className="inner">
            <div className="topbar"><span className="left">Knoc by Elnino</span><span>{t('serviceIntro.topbar')}</span></div>
            <div className="sec-num">{t('serviceIntro.solution.num')}</div>
            <div className="sec-title">{t('serviceIntro.solution.title')}</div>
            <p className="lead">{t('serviceIntro.solution.lead')}</p>
            <div className="device-pc" style={{ marginBottom: 16, flex: 'none' }}>
              <div className="browser-bar">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span className="url-bar">cloud.elnino.kr</span>
              </div>
              <div className="screen-body" style={{ minHeight: 0, padding: 0, display: 'block', background: 'none', lineHeight: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/subtitlescreen.png" alt={t('serviceIntro.solution.screenshotAlt')} style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
            <div className="kpi-row">
              <div className="kpi-item"><div className="num">{t('serviceIntro.solution.kpiLanguages')}</div><div className="lbl">{t('serviceIntro.solution.kpiLanguagesLabel')}</div></div>
              <div className="kpi-item"><div className="num">{t('serviceIntro.solution.kpiAccuracy')}</div><div className="lbl">{t('serviceIntro.solution.kpiAccuracyLabel')}</div></div>
              <div className="kpi-item"><div className="num">{t('serviceIntro.solution.kpiConcurrent')}</div><div className="lbl">{t('serviceIntro.solution.kpiConcurrentLabel')}</div></div>
            </div>
          </div>
        </div>

        {/* PAGE 5: FEATURES */}
        <div className="page">
          <div className="inner">
            <div className="topbar"><span className="left">Knoc by Elnino</span><span>{t('serviceIntro.topbar')}</span></div>
            <div className="sec-num">{t('serviceIntro.features.num')}</div>
            <div className="sec-title">{t('serviceIntro.features.title')}</div>
            <div className="screen-row" style={{ gap: 14, marginBottom: 10, alignItems: 'end' }}>
              <div className="device-pc" style={{ flex: 1 }}>
                <div className="browser-bar">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                  <span className="url-bar">cloud.elnino.kr</span>
                </div>
                <div className="screen-body" style={{ minHeight: 0, padding: 0, display: 'block', lineHeight: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/webclient.png" alt="Knoc Web Client" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
              <div className="device-mobile" style={{ width: 130 }}>
                <div className="mobile-bar"><span className="notch" /></div>
                <div className="screen-body" style={{ minHeight: 0, padding: 0, display: 'block', lineHeight: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/subtitleroom.jpg" alt="Knoc Mobile" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </div>
            <div className="device-pc" style={{ marginBottom: 10, flex: 'none' }}>
              <div className="browser-bar">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span className="url-bar">cloud.elnino.kr — Dashboard</span>
              </div>
              <div className="screen-body" style={{ minHeight: 0, padding: 0, display: 'block', lineHeight: 0, maxHeight: 200, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard.png" alt="Knoc Dashboard" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
            <div className="tiles">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="tile">
                  <h4>{t(`serviceIntro.features.tiles.${i}.title`)}</h4>
                  <ul>
                    {[0, 1, 2].map((j) => <li key={j}>{t(`serviceIntro.features.tiles.${i}.items.${j}`)}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PAGE 6: COMPARISON + CASES */}
        <div className="page">
          <div className="inner">
            <div className="topbar"><span className="left">Knoc by Elnino</span><span>{t('serviceIntro.topbar')}</span></div>
            <div className="sec-num">{t('serviceIntro.comparison.num')}</div>
            <div className="sec-title">{t('serviceIntro.comparison.title')}</div>
            <p className="heading-md" style={{ marginTop: 0 }}>{t('serviceIntro.comparison.tableTitle')}</p>
            <table className="ctable">
              <thead><tr>{[0, 1, 2].map((i) => <th key={i}>{t(`serviceIntro.comparison.columns.${i}`)}</th>)}</tr></thead>
              <tbody>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td>{t(`serviceIntro.comparison.rows.${i}.label`)}</td>
                    <td>{t(`serviceIntro.comparison.rows.${i}.old`)}</td>
                    <td>{t(`serviceIntro.comparison.rows.${i}.new`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="spacer-sm" />
            <p className="heading-md">{t('serviceIntro.comparison.caseTitle')}</p>
            {[0, 1].map((i) => (
              <div key={i} className="case">
                <div className="org">{t(`serviceIntro.comparison.cases.${i}.name`)}</div>
                <div className="tag">{t(`serviceIntro.comparison.cases.${i}.org`)}</div>
                <div className="body">&ldquo;{t(`serviceIntro.comparison.cases.${i}.text`)}&rdquo;</div>
              </div>
            ))}
          </div>
        </div>

        {/* PAGE 7: SCENARIOS + SECURITY */}
        <div className="page">
          <div className="inner">
            <div className="topbar"><span className="left">Knoc by Elnino</span><span>{t('serviceIntro.topbar')}</span></div>
            <div className="sec-num">{t('serviceIntro.scenarios.num')}</div>
            <div className="sec-title">{t('serviceIntro.scenarios.title')}</div>
            <p className="lead">{t('serviceIntro.scenarios.lead')}</p>
            <div className="sc-list">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                const badge = t(`serviceIntro.scenarios.items.${i}.badge`)
                const isEnterprise = badge === 'enterprise'
                return (
                  <div key={i} className="sc-item">
                    <span className={`badge ${isEnterprise ? 'enterprise' : 'institution'}`}>
                      {isEnterprise ? t('serviceIntro.scenarios.badgeEnterprise') : t('serviceIntro.scenarios.badgeInstitution')}
                    </span>
                    <span>{t(`serviceIntro.scenarios.items.${i}.text`)}</span>
                  </div>
                )
              })}
            </div>
            <div className="spacer-sm" />
            <p className="heading-md">{t('serviceIntro.scenarios.securityTitle')}</p>
            <div className="sec-stack">
              {[0, 1, 2].map((i) => {
                const icons = ['🔒', '🌐', '☁️']
                return (
                  <div key={i} className="sec-item">
                    <div className="ic">{icons[i]}</div>
                    <div>
                      <h4>{t(`serviceIntro.scenarios.security.${i}.title`)}</h4>
                      <p>{t(`serviceIntro.scenarios.security.${i}.desc`)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* PAGE 8: PRICING */}
        <div className="page">
          <div className="inner">
            <div className="topbar"><span className="left">Knoc by Elnino</span><span>{t('serviceIntro.topbar')}</span></div>
            <div className="sec-num">{t('serviceIntro.pricing.num')}</div>
            <div className="sec-title">{t('serviceIntro.pricing.title')}</div>
            <div className="pricing-cols">
              <div className="plan std">
                <div className="plan-name">{t('serviceIntro.pricing.payg.name')}</div>
                <div className="plan-sub">{t('serviceIntro.pricing.payg.sub')}</div>
                <div className="plan-price">{t('serviceIntro.pricing.payg.price')}</div>
                <div className="plan-unit">{t('serviceIntro.pricing.payg.unit')}</div>
                <ul>{[0, 1, 2, 3].map((i) => <li key={i}>{t(`serviceIntro.pricing.payg.features.${i}`)}</li>)}</ul>
              </div>
              <div className="plan pro">
                <div className="plan-name">{t('serviceIntro.pricing.custom.name')}</div>
                <div className="plan-sub">{t('serviceIntro.pricing.custom.sub')}</div>
                <div className="plan-price">{t('serviceIntro.pricing.custom.price')}</div>
                <div className="plan-unit">{t('serviceIntro.pricing.custom.unit')}</div>
                <ul>{[0, 1, 2, 3].map((i) => <li key={i}>{t(`serviceIntro.pricing.custom.features.${i}`)}</li>)}</ul>
                <p style={{ fontSize: '6.5pt', color: 'rgba(255,255,255,0.35)', marginTop: 10, lineHeight: 1.5 }}>{t('serviceIntro.pricing.custom.note')}</p>
              </div>
            </div>
            <p className="heading-md">{t('serviceIntro.pricing.effectsTitle')}</p>
            <div className="effect-row">
              {[0, 1].map((i) => (
                <div key={i} className="effect"><h4>{t(`serviceIntro.pricing.effects.${i}.title`)}</h4><p>{t(`serviceIntro.pricing.effects.${i}.desc`)}</p></div>
              ))}
            </div>
            <div className="effect-row">
              {[2, 3].map((i) => (
                <div key={i} className="effect"><h4>{t(`serviceIntro.pricing.effects.${i}.title`)}</h4><p>{t(`serviceIntro.pricing.effects.${i}.desc`)}</p></div>
              ))}
            </div>
            <div className="cost-box">
              <div className="cost-title">{t('serviceIntro.pricing.competitorTitle')}</div>
              {[0, 1, 2].map((i) => (
                <div key={i} className="cost-row"><span>{t(`serviceIntro.pricing.competitors.${i}.name`)}</span><span>{t(`serviceIntro.pricing.competitors.${i}.price`)}</span></div>
              ))}
              <div className="cost-row big"><span>{t('serviceIntro.pricing.competitors.3.name')}</span><span>{t('serviceIntro.pricing.competitors.3.price')}</span></div>
            </div>
          </div>
        </div>

        {/* PAGE 9: PROCESS + CTA */}
        <div className="page">
          <div className="inner">
            <div className="topbar"><span className="left">Knoc by Elnino</span><span>{t('serviceIntro.topbar')}</span></div>
            <div className="sec-num">{t('serviceIntro.process.num')}</div>
            <div className="sec-title">{t('serviceIntro.process.title')}</div>
            <div className="steps">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ display: 'contents' }}>
                  <div className="step">
                    <div className="circle">{i + 1}</div>
                    <div className="st-title">{t(`serviceIntro.process.steps.${i}.title`)}</div>
                    <div className="st-desc">{t(`serviceIntro.process.steps.${i}.desc`)}</div>
                  </div>
                  {i < 3 && <div className="arrow">→</div>}
                </div>
              ))}
            </div>
            <div className="callout green" style={{ marginTop: 14 }}>
              <strong>{t('serviceIntro.process.calloutTitle')}</strong>
              <p>{t('serviceIntro.process.calloutDesc')}</p>
            </div>
            <div style={{ height: 16 }} />
            <div className="cta-box">
              <h2>{t('serviceIntro.process.ctaTitle')}</h2>
              <p>{t('serviceIntro.process.ctaDesc')}</p>
              <a href="https://cloud.elnino.kr/webclient" className="cta-link">{t('serviceIntro.process.ctaButton')}</a>
            </div>
            <dl className="contact-pairs" style={{ marginTop: 16 }}>
              <div><dt>EMAIL</dt><dd>{t('serviceIntro.process.contactEmail')}</dd></div>
              <div><dt>WEB</dt><dd>{t('serviceIntro.process.contactWeb')}</dd></div>
              <div><dt>DASHBOARD</dt><dd>{t('serviceIntro.process.contactDashboard')}</dd></div>
              <div><dt>HOURS</dt><dd>{t('serviceIntro.process.contactHours')}</dd></div>
            </dl>
            <div className="legal">© 2026 Elnino. All rights reserved.</div>
          </div>
        </div>

      </div>

      <div className="site-footer"><Footer /></div>
    </div>
  )
}
