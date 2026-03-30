'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Download } from 'lucide-react'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { useTranslation } from '@/lib/i18n'

type OS = 'windows' | 'mac' | 'unknown'

const OS_CONFIG = {
  windows: {
    icon: '/icons/windows.svg',
    name: 'Windows',
    arch: 'x64',
    href: 'https://github.com/project-elnino/elnino.kr/releases/latest/download/Knoc-Overlay-Setup.exe',
    ctaKey: 'download.ctaWindows' as const,
  },
  mac: {
    icon: '/icons/apple.svg',
    name: 'macOS',
    arch: 'Apple Silicon / Intel',
    href: 'https://github.com/project-elnino/elnino.kr/releases/latest/download/Knoc-Overlay.dmg',
    ctaKey: 'download.ctaMac' as const,
  },
} as const

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

  const primaryOS = os === 'unknown' ? 'windows' : os
  const secondaryOS = primaryOS === 'windows' ? 'mac' : 'windows'
  const primary = OS_CONFIG[primaryOS]
  const secondary = OS_CONFIG[secondaryOS]

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Topbar />

      <main className="pt-36 pb-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 font-heading">
              {t('download.title')}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('download.description')}
            </p>
          </motion.div>

          {/* Primary OS — Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="bg-white border border-primary/30 rounded-2xl p-8 shadow-lg mb-6"
          >
            {/* OS Badge */}
            <div className="flex items-center gap-3 mb-6">
              <Image src={primary.icon} alt={primary.name} width={40} height={40} />
              <div>
                <h2 className="text-xl font-bold text-foreground">{primary.name}</h2>
                <p className="text-xs text-slate-400">{primary.arch}</p>
              </div>
              {os !== 'unknown' && (
                <span className="ml-auto text-xs font-medium text-slate-400">
                  {t('download.recommended')}
                </span>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {t(`download.features.${i}`)}
                </li>
              ))}
            </ul>

            {/* Primary CTA */}
            <Link
              href={primary.href}
              target="_blank"
              className="group flex items-center justify-center gap-2 w-full px-6 py-4 text-base font-bold rounded-xl text-primary-foreground bg-primary hover:bg-primary-dark hover:scale-[1.01] transition-all duration-200 font-heading shadow-md hover:shadow-lg"
            >
              <Download className="w-5 h-5" />
              {t(primary.ctaKey)}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Secondary OS — Compact Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center justify-center gap-3 py-4 mb-6"
          >
            <Image src={secondary.icon} alt={secondary.name} width={20} height={20} className="opacity-50" />
            <Link
              href={secondary.href}
              target="_blank"
              className="text-sm text-slate-500 hover:text-primary transition-colors"
            >
              {t(secondary.ctaKey)}
            </Link>
          </motion.div>

          {/* Note */}
          <motion.p
            className="text-center text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {t('download.note')}
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
