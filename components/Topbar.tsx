'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ExternalLink, Menu, X, ChevronDown, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer gap-2">
            <Image src="/logo.png" alt="Elnino Logo" width={28} height={28} />
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              ELNINO
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center gap-8">
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
              href="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about')
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
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <nav className="px-4 py-4 space-y-3">
            <Link
              href="/pricing"
              className={`block py-2 font-medium ${
                isActive('/pricing') ? 'text-primary' : 'text-slate-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.pricing')}
            </Link>
            <Link
              href="/about"
              className={`block py-2 font-medium ${
                isActive('/about') ? 'text-primary' : 'text-slate-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.faq')}
            </Link>
            <Link
              href="/contact"
              className={`block py-2 font-medium ${
                isActive('/contact') ? 'text-primary' : 'text-slate-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <div className="pt-4 border-t border-border space-y-3">
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
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
