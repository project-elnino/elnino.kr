'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { useTranslation } from '@/lib/i18n'

type OS = 'windows' | 'mac' | 'unknown'

function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return 'mac'
  if (ua.includes('win')) return 'windows'
  return 'unknown'
}

export default function DownloadPage() {
  const { t } = useTranslation()
  const [os, setOS] = useState<OS>('unknown')

  useEffect(() => {
    setOS(detectOS())
  }, [])

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Topbar />

      <main className="pt-36 pb-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 font-heading">
              {t('download.title')}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
              {t('download.description')}
            </p>
          </motion.div>

          {/* Download Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Windows */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              {os === 'windows' ? (
                <div className="text-center mb-2">
                  <span className="text-xs font-semibold text-primary">
                    {t('download.recommended')}
                  </span>
                </div>
              ) : <div className="h-5" />}
              <div className={`bg-white border rounded-xl p-6 flex flex-col flex-1 ${os === 'windows' ? 'border-primary shadow-md' : 'border-border'}`}>
                <div className="flex flex-col items-center text-center gap-2 mb-4">
                  <Image src="/icons/windows.svg" alt="Windows" width={32} height={32} />
                  <h2 className="text-lg font-bold text-foreground">Windows</h2>
                  <p className="text-xs text-slate-400">x64</p>
                </div>
                <Link
                  href="https://github.com/project-elnino/elnino.kr/releases/latest/download/Knoc-Overlay-Setup.exe"
                  target="_blank"
                  className={`mt-auto inline-flex items-center justify-center w-full px-6 py-3 text-sm font-bold rounded-lg transition-colors font-heading ${
                    os === 'windows'
                      ? 'text-primary-foreground bg-primary hover:bg-primary-dark'
                      : 'border border-border text-foreground bg-white hover:bg-slate-50'
                  }`}
                >
                  {t('download.ctaBtn')}
                </Link>
              </div>
            </motion.div>

            {/* macOS */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            >
              {os === 'mac' ? (
                <div className="text-center mb-2">
                  <span className="text-xs font-semibold text-primary">
                    {t('download.recommended')}
                  </span>
                </div>
              ) : <div className="h-5" />}
              <div className={`bg-white border rounded-xl p-6 flex flex-col flex-1 ${os === 'mac' ? 'border-primary shadow-md' : 'border-border'}`}>
                <div className="flex flex-col items-center text-center gap-2 mb-4">
                  <Image src="/icons/apple.svg" alt="macOS" width={32} height={32} />
                  <h2 className="text-lg font-bold text-foreground">macOS</h2>
                  <p className="text-xs text-slate-400">Apple Silicon / Intel</p>
                </div>
                <Link
                  href="https://github.com/project-elnino/elnino.kr/releases/latest/download/Knoc-Overlay.dmg"
                  target="_blank"
                  className={`mt-auto inline-flex items-center justify-center w-full px-6 py-3 text-sm font-bold rounded-lg transition-colors font-heading ${
                    os === 'mac'
                      ? 'text-primary-foreground bg-primary hover:bg-primary-dark'
                      : 'border border-border text-foreground bg-white hover:bg-slate-50'
                  }`}
                >
                  {t('download.ctaBtn')}
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Note */}
          <motion.p
            className="text-center text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('download.note')}
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
