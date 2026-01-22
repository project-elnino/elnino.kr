'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, ExternalLink } from "lucide-react";

export default function Topbar() {
  const pathname = usePathname();

  // Convert current path to Korean version
  const getKoreanPath = () => {
    if (pathname.startsWith('/en')) {
      const pathWithoutEn = pathname.slice(3);
      if (pathWithoutEn === '' || pathWithoutEn === '/') {
        return '/';
      }
      return pathWithoutEn;
    }
    if (pathname.startsWith('/ko')) {
      return pathname;
    }
    return pathname;
  };

  // Check if current path matches the link
  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <header className="w-full border-b absolute top-0 left-0 right-0 z-20 border-white/10 backdrop-blur-md bg-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/en" className="flex items-center gap-2.5 group">
          <Image src="/logo.png" alt="Elnino Logo" width={30} height={30} className="transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold text-white">
            Elnino
          </span>
        </Link>
        <ul className="flex gap-1 sm:gap-2 text-sm font-medium text-white items-center">
          <li>
            <Link
              href="https://cloud.elnino.kr/webclient"
              className="relative px-2 sm:px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-1"
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>
          </li>
          <li>
            <Link
              href="/en/pricing"
              className={`relative px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/en/pricing')
                  ? 'bg-white/15 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/en/contact"
              className={`relative px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/en/contact')
                  ? 'bg-white/15 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="https://cloud.elnino.kr/dashboard"
              className="relative px-2 sm:px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-1"
            >
              Dashboard
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>
          </li>
          <li className="ml-1 sm:ml-2 border-l border-white/20 pl-2 sm:pl-3">
            <Link
              href={getKoreanPath()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/10"
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