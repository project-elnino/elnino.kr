import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-12 text-blue-100 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* 회사 정보 */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="Elnino Logo" width={32} height={32} />
              <div>
                <span className="text-xl font-bold text-white">Elnino</span>
                <span className="text-xs text-blue-300 ml-2">Knoc</span>
              </div>
            </Link>
            <p className="text-sm text-blue-200/70 max-w-xs">
              AI 기반 실시간 번역 서비스로 언어 장벽 없는 소통을 지원합니다.
            </p>
          </div>

          {/* 링크 및 저작권 */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <nav className="flex gap-6">
              <Link
                href="/policy/terms"
                className="text-sm hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full"
              >
                이용약관
              </Link>
              <Link
                href="/policy/privacy"
                className="text-sm hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full"
              >
                개인정보처리방침
              </Link>
            </nav>
            <div className="h-px w-full md:w-48 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            <p className="text-xs text-blue-200/50">© 2026 Elnino. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}