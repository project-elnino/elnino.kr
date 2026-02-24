'use client';

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#F8F9FA] border-t border-[#E2E8F0] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Elnino Logo" width={32} height={32} />
              <span className="font-['Manrope'] font-bold text-2xl tracking-tight text-[#0F172A]">
                ELNINO
              </span>
            </Link>
            <p className="mt-4 text-sm text-[#334155] font-['Noto_Sans'] leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] tracking-wider uppercase font-['Manrope'] mb-4">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="https://cloud.elnino.kr/webclient" className="text-[#334155] hover:text-[#0EA5E9] text-sm font-['Noto_Sans'] transition-colors">
                  {t('footer.realtime')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#334155] hover:text-[#0EA5E9] text-sm font-['Noto_Sans'] transition-colors">
                  {t('nav.pricing')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#334155] hover:text-[#0EA5E9] text-sm font-['Noto_Sans'] transition-colors">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link href="https://cloud.elnino.kr/dashboard" className="text-[#334155] hover:text-[#0EA5E9] text-sm font-['Noto_Sans'] transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] tracking-wider uppercase font-['Manrope'] mb-4">
              {t('footer.company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-[#334155] hover:text-[#0EA5E9] text-sm font-['Noto_Sans'] transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#334155] hover:text-[#0EA5E9] text-sm font-['Noto_Sans'] transition-colors">
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link href="/policy/privacy" className="text-[#334155] hover:text-[#0EA5E9] text-sm font-['Noto_Sans'] transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/policy/terms" className="text-[#334155] hover:text-[#0EA5E9] text-sm font-['Noto_Sans'] transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] tracking-wider uppercase font-['Manrope'] mb-4">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#0EA5E9] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-[#334155] text-sm font-['Noto_Sans']">{t('footer.location')}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#0EA5E9] mr-2 flex-shrink-0" />
                <span className="text-[#334155] text-sm font-['Noto_Sans']">contact@elnino.kr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#E2E8F0] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-[#94A3B8] font-['Noto_Sans']">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/policy/terms" className="text-xs text-[#94A3B8] hover:text-[#0EA5E9] font-['Noto_Sans'] transition-colors">
              {t('footer.terms')}
            </Link>
            <Link href="/policy/privacy" className="text-xs text-[#94A3B8] hover:text-[#0EA5E9] font-['Noto_Sans'] transition-colors">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
