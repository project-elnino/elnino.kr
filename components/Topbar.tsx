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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t } = useTranslation();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsLangOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageLabels: Record<Locale, string> = {
    ko: '한국어',
    en: 'English',
    ja: '日本語',
  };

  const LanguageDropdown = ({ className = "" }: { className?: string }) => (
    <div ref={langRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#334155] hover:text-[#0F172A] border border-[#E2E8F0] rounded-lg bg-[#FFFFFF] hover:bg-[#F8F9FA] transition-colors font-['Noto_Sans']"
      >
        <Globe className="w-4 h-4" />
        {languageLabels[locale]}
        <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
      </button>
      {isLangOpen && (
        <div className="absolute top-full right-0 mt-1 py-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded-lg shadow-lg min-w-[120px] z-50">
          {(['ko', 'en', 'ja'] as Locale[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full px-4 py-2 text-left text-sm font-['Noto_Sans'] transition-colors ${
                locale === lang
                  ? 'text-[#0EA5E9] bg-[#F0F9FF] font-medium'
                  : 'text-[#334155] hover:bg-[#F8F9FA]'
              }`}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F8F9FA]/95 backdrop-blur-sm border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer gap-2">
            <Image src="/logo.png" alt="Elnino Logo" width={28} height={28} />
            <span className="font-['Manrope'] font-bold text-xl tracking-tight text-[#0F172A]">
              ELNINO
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className={`font-['Noto_Sans'] text-sm font-medium transition-colors ${
                isActive('/pricing')
                  ? 'text-[#0EA5E9]'
                  : 'text-[#334155] hover:text-[#0F172A]'
              }`}
            >
              {t('nav.pricing')}
            </Link>
            <Link
              href="/blog"
              className={`font-['Noto_Sans'] text-sm font-medium transition-colors ${
                isActive('/blog')
                  ? 'text-[#0EA5E9]'
                  : 'text-[#334155] hover:text-[#0F172A]'
              }`}
            >
              {t('nav.blog')}
            </Link>
            <Link
              href="/about"
              className={`font-['Noto_Sans'] text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-[#0EA5E9]'
                  : 'text-[#334155] hover:text-[#0F172A]'
              }`}
            >
              {t('nav.faq')}
            </Link>
            <Link
              href="/contact"
              className={`font-['Noto_Sans'] text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-[#0EA5E9]'
                  : 'text-[#334155] hover:text-[#0F172A]'
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
              className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-[#E2E8F0] text-[#334155] bg-[#FFFFFF] hover:bg-[#F8F9FA] transition-colors font-['Manrope']"
            >
              {t('nav.dashboard')}
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>
            <Link
              href="https://cloud.elnino.kr/webclient"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-[#FFFFFF] bg-[#0EA5E9] hover:bg-[#0284C7] transition-colors font-['Manrope']"
            >
              {t('nav.start')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#334155]"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-t border-[#E2E8F0]">
          <nav className="px-4 py-4 space-y-3">
            <Link
              href="/pricing"
              className={`block py-2 font-['Noto_Sans'] font-medium ${
                isActive('/pricing') ? 'text-[#0EA5E9]' : 'text-[#334155]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.pricing')}
            </Link>
            <Link
              href="/blog"
              className={`block py-2 font-['Noto_Sans'] font-medium ${
                isActive('/blog') ? 'text-[#0EA5E9]' : 'text-[#334155]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <Link
              href="/about"
              className={`block py-2 font-['Noto_Sans'] font-medium ${
                isActive('/about') ? 'text-[#0EA5E9]' : 'text-[#334155]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.faq')}
            </Link>
            <Link
              href="/contact"
              className={`block py-2 font-['Noto_Sans'] font-medium ${
                isActive('/contact') ? 'text-[#0EA5E9]' : 'text-[#334155]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
              {/* Mobile Language Select */}
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value as Locale)}
                className="w-full px-4 py-2.5 text-sm font-medium rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] text-[#334155] font-['Noto_Sans']"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
              <Link
                href="https://cloud.elnino.kr/webclient"
                className="block w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg text-[#FFFFFF] bg-[#0EA5E9] hover:bg-[#0284C7] transition-colors font-['Manrope']"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.start')}
              </Link>
              <Link
                href="https://cloud.elnino.kr/dashboard"
                className="flex items-center justify-center gap-1 w-full px-4 py-2.5 text-sm font-medium rounded-lg border border-[#E2E8F0] text-[#334155] bg-[#FFFFFF] hover:bg-[#F8F9FA] transition-colors font-['Manrope']"
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
