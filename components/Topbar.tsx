'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 현재 경로를 영어 버전으로 변환
  const getEnglishPath = () => {
    if (pathname.startsWith('/en')) {
      return pathname;
    }
    if (pathname.startsWith('/ko')) {
      return pathname.replace('/ko', '/en');
    }
    if (pathname === '/') {
      return '/en';
    }
    return `/en${pathname}`;
  };

  // 현재 경로가 해당 링크와 일치하는지 확인
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="w-full border-b absolute top-0 left-0 right-0 z-20 border-white/10 backdrop-blur-md bg-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/logo.png" alt="Elnino Logo" width={30} height={30} className="transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold text-white">
            Elnino
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-2 text-sm font-medium text-white items-center">
          <li>
            <Link
              href="https://cloud.elnino.kr/webclient"
              className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-1"
            >
              시작하기
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/pricing')
                  ? 'bg-white/15 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              가격 정책
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/contact')
                  ? 'bg-white/15 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              문의
            </Link>
          </li>
          <li>
            <Link
              href="https://cloud.elnino.kr/dashboard"
              className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-1"
            >
              대시보드
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>
          </li>
          <li className="ml-2 border-l border-white/20 pl-3">
            <Link
              href={getEnglishPath()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/10"
              title="Switch to English"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium text-sm">EN</span>
            </Link>
          </li>
        </ul>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href={getEnglishPath()}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/10"
            title="Switch to English"
          >
            <Globe className="w-3.5 h-3.5 text-white" />
            <span className="font-medium text-xs text-white">EN</span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-white"
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md">
          <ul className="flex flex-col py-2 text-sm font-medium text-white">
            <li>
              <Link
                href="https://cloud.elnino.kr/webclient"
                className="flex items-center justify-between px-6 py-3 hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                시작하기
                <ExternalLink className="w-4 h-4 opacity-50" />
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={`block px-6 py-3 transition-all duration-200 ${
                  isActive('/pricing')
                    ? 'bg-white/15 text-white'
                    : 'hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                가격 정책
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`block px-6 py-3 transition-all duration-200 ${
                  isActive('/contact')
                    ? 'bg-white/15 text-white'
                    : 'hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                문의
              </Link>
            </li>
            <li>
              <Link
                href="https://cloud.elnino.kr/dashboard"
                className="flex items-center justify-between px-6 py-3 hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                대시보드
                <ExternalLink className="w-4 h-4 opacity-50" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}