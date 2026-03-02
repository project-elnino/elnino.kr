"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'ko' | 'en' | 'ja';

interface Translations {
  [key: string]: string | Translations;
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translation files will be loaded dynamically
const translations: Record<Locale, Translations> = {
  ko: {},
  en: {},
  ja: {},
};

let translationsLoaded = false;

// Detect browser language and return appropriate locale
const detectBrowserLocale = (): Locale => {
  if (typeof navigator === 'undefined') return 'en';

  const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
  const langCode = browserLang.toLowerCase().split('-')[0];

  if (langCode === 'ko') return 'ko';
  if (langCode === 'ja') return 'ja';
  return 'en'; // Default to English for all other languages
};

// Helper function to get nested value from object (supports arrays)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedValue = (obj: Translations, path: string): string => {
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mark as mounted after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load translations and saved locale from localStorage together
  useEffect(() => {
    const loadTranslations = async () => {
      if (translationsLoaded) {
        setIsLoaded(true);
        // Load saved locale or detect from browser
        const savedLocale = localStorage.getItem('locale') as Locale | null;
        if (savedLocale && ['ko', 'en', 'ja'].includes(savedLocale)) {
          setLocaleState(savedLocale);
        } else {
          setLocaleState(detectBrowserLocale());
        }
        return;
      }

      try {
        const [koData, enData, jaData] = await Promise.all([
          fetch('/locales/ko.json').then(res => res.json()),
          fetch('/locales/en.json').then(res => res.json()),
          fetch('/locales/ja.json').then(res => res.json()),
        ]);

        translations.ko = koData;
        translations.en = enData;
        translations.ja = jaData;
        translationsLoaded = true;
        setIsLoaded(true);

        // Load saved locale or detect from browser
        const savedLocale = localStorage.getItem('locale') as Locale | null;
        if (savedLocale && ['ko', 'en', 'ja'].includes(savedLocale)) {
          setLocaleState(savedLocale);
        } else {
          setLocaleState(detectBrowserLocale());
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        setIsLoaded(true);
      }
    };

    if (isMounted) {
      loadTranslations();
    }
  }, [isMounted]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  };

  const t = (key: string): string => {
    if (!isLoaded) return key;
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
