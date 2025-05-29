import Link from "next/link";
import Image from "next/image";

export default function Topbar() {
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
        <ul className="flex gap-6 text-sm font-medium text-white">
          <li>
            <Link href="/contact" className="hover:text-blue-500 transition-colors">
              이용 신청
            </Link>
          </li>
          <li>
            <Link href="/download" className="hover:text-blue-500 transition-colors">
              다운로드
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
