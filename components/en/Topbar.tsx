'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-2 text-sm font-medium text-white items-center">
          <li>
            <Link
              href="https://cloud.elnino.kr/webclient"
              className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-1"
            >
              Get Started
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>
          </li>
          <li>
            <Link
              href="/en/pricing"
              className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${
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
              className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${
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
              className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-1"
            >
              Dashboard
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>
          </li>
          <li className="ml-2 border-l border-white/20 pl-3">
            <Link
              href={getKoreanPath()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/10"
              title="한국어로 전환"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium text-sm">KO</span>
            </Link>
          </li>
        </ul>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href={getKoreanPath()}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/10"
            title="한국어로 전환"
          >
            <Globe className="w-3.5 h-3.5 text-white" />
            <span className="font-medium text-xs text-white">KO</span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-white"
            aria-label="Open menu"
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
                Get Started
                <ExternalLink className="w-4 h-4 opacity-50" />
              </Link>
            </li>
            <li>
              <Link
                href="/en/pricing"
                className={`block px-6 py-3 transition-all duration-200 ${
                  isActive('/en/pricing')
                    ? 'bg-white/15 text-white'
                    : 'hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/en/contact"
                className={`block px-6 py-3 transition-all duration-200 ${
                  isActive('/en/contact')
                    ? 'bg-white/15 text-white'
                    : 'hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="https://cloud.elnino.kr/dashboard"
                className="flex items-center justify-between px-6 py-3 hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
                <ExternalLink className="w-4 h-4 opacity-50" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}