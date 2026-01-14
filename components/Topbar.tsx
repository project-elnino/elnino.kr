'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function Topbar() {
  const pathname = usePathname();
  
  // 현재 경로를 영어 버전으로 변환
  const getEnglishPath = () => {
    // 이미 /en으로 시작하면 그대로 반환
    if (pathname.startsWith('/en')) {
      return pathname;
    }
    
    // /ko로 시작하면 /ko를 /en으로 교체
    if (pathname.startsWith('/ko')) {
      return pathname.replace('/ko', '/en');
    }
    
    // 루트 경로면 /en으로
    if (pathname === '/') {
      return '/en';
    }
    
    // 그 외의 경로는 앞에 /en 추가
    return `/en${pathname}`;
  };

  return (
    <header
      className="w-full border-b absolute top-0 left-0 right-0 z-20 border-white/10 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Elnino Logo" width={28} height={28} />
          <span className="text-xl font-bold text-white">
            Elnino
          </span>
        </Link>
        <ul className="flex gap-3 sm:gap-6 text-sm font-medium text-white items-center">
          <li>
            <Link href="/pricing" className="hover:text-blue-500 transition-colors">
              <span className="hidden sm:inline">가격 정책</span>
              <span className="sm:hidden">가격</span>
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-500 transition-colors">
              <span className="hidden sm:inline">이용 신청</span>
              <span className="sm:hidden">신청</span>
            </Link>
          </li>
          <li>
            <Link href="/download" className="hover:text-blue-500 transition-colors">
              <span className="hidden sm:inline">다운로드</span>
              <span className="sm:hidden">다운로드</span>
            </Link>
          </li>
          <li>
            <Link href="https://cloud.elnino.kr/dashboard" className="hover:text-blue-500 transition-colors">
              <span className="hidden sm:inline">대시보드</span>
              <span className="sm:hidden">대시보드</span>
            </Link>
          </li>
          <li className="ml-1 sm:ml-2 border-l border-white/20 pl-3 sm:pl-4">
            <Link 
              href={getEnglishPath()} 
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              title="Switch to English"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium text-xs sm:text-sm">EN</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}