'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function Topbar() {
  const pathname = usePathname();
  
  // 현재 경로를 한국어 버전으로 변환
  const getKoreanPath = () => {
    // /en으로 시작하면 /en을 제거하거나 /ko로 교체
    if (pathname.startsWith('/en')) {
      const pathWithoutEn = pathname.slice(3); // '/en' 제거
      
      // /en만 있으면 루트로
      if (pathWithoutEn === '' || pathWithoutEn === '/') {
        return '/';
      }
      
      // 그 외는 /ko 붙여서 반환 (옵션)
      // return `/ko${pathWithoutEn}`;
      
      // 또는 그냥 경로만 반환 (현재 구조상 이게 맞음)
      return pathWithoutEn;
    }
    
    // /ko로 시작하면 그대로 반환
    if (pathname.startsWith('/ko')) {
      return pathname;
    }
    
    // 그 외의 경우는 그대로 반환
    return pathname;
  };

  return (
    <header
      className="w-full border-b absolute top-0 left-0 right-0 z-20 border-white/10 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/en" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Elnino Logo" width={28} height={28} />
          <span className="text-xl font-bold text-white">
            Elnino
          </span>
        </Link>
        <ul className="flex gap-3 sm:gap-6 text-sm font-medium text-white items-center">
          <li>
            <Link href="/en/pricing" className="hover:text-blue-500 transition-colors">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/en/contact" className="hover:text-blue-500 transition-colors">
              Apply
            </Link>
          </li>
          <li>
            <Link href="/en/download" className="hover:text-blue-500 transition-colors">
              Download
            </Link>
          </li>
          <li>
            <Link href="https://dev.elnino.kr/dashboard" className="hover:text-blue-500 transition-colors">
              Dashboard
            </Link>
          </li>
          <li className="ml-1 sm:ml-2 border-l border-white/20 pl-3 sm:pl-4">
            <Link 
              href={getKoreanPath()} 
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              title="한국어로 전환"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium text-xs sm:text-sm">KO</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}