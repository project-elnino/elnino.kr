'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ExternalLink, Menu, X, ChevronDown, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, Locale } from "@/lib/i18n";

export default function Topbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, setLocale, t } = useTranslation();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const languageLabels: Record<Locale, string> = {
    ko: '한국어',
    en: 'English',
    ja: '日本語',
  };

  const LanguageDropdown = ({ className = "" }: { className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (newLocale: Locale) => {
      setLocale(newLocale);
      setIsOpen(false);
    };

    return (
      <div ref={ref} className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-foreground border border-border rounded-lg bg-white hover:bg-background transition-colors"
        >
          <Globe className="w-4 h-4" />
          {languageLabels[locale]}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute top-full right-0 mt-1 py-1 bg-white border border-border rounded-lg shadow-lg min-w-[120px] z-50">
            {(['ko', 'en', 'ja'] as Locale[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleChange(lang)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  locale === lang
                    ? 'text-primary bg-primary-light font-medium'
                    : 'text-slate-700 hover:bg-background'
                }`}
              >
                {languageLabels[lang]}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-7xl bg-white/80 backdrop-blur-md border border-border/50 shadow-lg shadow-black/5 rounded-xl">
      <div className="px-5 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer gap-2">
            <Image src="/logo.png" alt="Elnino Logo" width={28} height={28} />
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              ELNINO
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center gap-16">
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors ${
                isActive('/pricing')
                  ? 'text-primary'
                  : 'text-slate-700 hover:text-foreground'
              }`}
            >
              {t('nav.pricing')}
            </Link>
            <Link
              href="/faq"
              className={`text-sm font-medium transition-colors ${
                isActive('/faq')
                  ? 'text-primary'
                  : 'text-slate-700 hover:text-foreground'
              }`}
            >
              {t('nav.faq')}
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-primary'
                  : 'text-slate-700 hover:text-foreground'
              }`}
            >
              {t('nav.contact')}
            </Link>
            <Link
              href="/download"
              className={`text-sm font-medium transition-colors ${
                isActive('/download')
                  ? 'text-primary'
                  : 'text-slate-700 hover:text-foreground'
              }`}
            >
              {t('nav.overlay')}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageDropdown />
            <Link
              href="https://cloud.elnino.kr/dashboard"
              className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-border text-slate-700 bg-white hover:bg-background transition-colors font-heading"
            >
              {t('nav.dashboard')}
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>
            <Link
              href="https://cloud.elnino.kr/webclient"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-primary-foreground bg-primary hover:bg-primary-dark transition-colors font-heading"
            >
              {t('nav.start')}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageDropdown />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-border/50 rounded-b-2xl mt-1 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <nav className="px-5 py-4 space-y-3">
              {[
                { href: '/pricing', label: t('nav.pricing') },
                { href: '/faq', label: t('nav.faq') },
                { href: '/contact', label: t('nav.contact') },
                { href: '/download', label: t('nav.overlay') },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`block py-2 font-medium ${
                      isActive(item.href) ? 'text-primary' : 'text-slate-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="pt-4 border-t border-border space-y-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Link
                  href="https://cloud.elnino.kr/webclient"
                  className="block w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg text-primary-foreground bg-primary hover:bg-primary-dark transition-colors font-heading"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.start')}
                </Link>
                <Link
                  href="https://cloud.elnino.kr/dashboard"
                  className="flex items-center justify-center gap-1 w-full px-4 py-2.5 text-sm font-medium rounded-lg border border-border text-slate-700 bg-white hover:bg-background transition-colors font-heading"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.dashboard')}
                  <ExternalLink className="w-4 h-4 opacity-50" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
