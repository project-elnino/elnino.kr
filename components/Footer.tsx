import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-700 to-indigo-800 py-10 text-blue-100">
      <div className="container max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Elnino</h3>
            <address className="not-italic">
              <p>이메일: contact@elnino.kr</p>
            </address>
          </div>
          
          <div className="flex flex-col text-right">
            <nav className="space-x-6 mb-2">
              <Link 
                href="/policy/terms" 
                className="hover:text-white transition-colors"
              >
                이용약관
              </Link>
              <Link 
                href="/policy/privacy" 
                className="hover:text-white transition-colors"
              >
                개인정보처리방침
              </Link>
            </nav>
            <p>© 2025 Elnino. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}