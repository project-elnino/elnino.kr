"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import koData from '@/public/locales/ko.json';
import enData from '@/public/locales/en.json';
import jaData from '@/public/locales/ja.json';

export type Locale = 'ko' | 'en' | 'ja';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Locale, unknown> = {
  ko: koData,
  en: enData,
  ja: jaData,
};

// Detect browser language and return appropriate locale
const detectBrowserLocale = (): Locale => {
  if (typeof navigator === 'undefined') return 'en';

  const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
  const langCode = browserLang.toLowerCase().split('-')[0];

  if (langCode === 'ko') return 'ko';
  if (langCode === 'ja') return 'ja';
  return 'en';
};

// Helper function to get nested value from object (supports arrays)
const getNestedValue = (obj: unknown, path: string): string => {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current == null || typeof current === 'string') return path;
    if (Array.isArray(current)) {
      const index = parseInt(key, 10);
      if (isNaN(index) || index < 0 || index >= current.length) return path;
      current = current[index];
    } else if (typeof current === 'object') {
      current = (current as Record<string, unknown>)[key];
      if (current === undefined) return path;
    } else {
      return path;
    }
  }

  return typeof current === 'string' ? current : path;
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ko');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    let resolvedLocale: Locale;
    if (savedLocale && ['ko', 'en', 'ja'].includes(savedLocale)) {
      resolvedLocale = savedLocale;
    } else {
      resolvedLocale = detectBrowserLocale();
    }
    setLocaleState(resolvedLocale);
    document.documentElement.lang = resolvedLocale;
    setIsMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;
    }
  };

  const t = (key: string): string => {
    if (!isMounted) return '';
    return getNestedValue(translations[locale], key);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

export function useLocale() {
  const { locale, setLocale } = useTranslation();
  return { locale, setLocale };
}
