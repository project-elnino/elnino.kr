import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

interface TopbarProps {
  variant?: "light" | "dark";
}

export default function Topbar({ variant = "light" }: TopbarProps) {
  const isDark = variant === "dark";

  return (
    <header
      className={clsx(
        "w-full border-b",
        isDark ? "absolute top-0 left-0 right-0 z-20 border-white/10" : "bg-white shadow-sm",
        isDark && "backdrop-blur-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Elnino Logo" width={28} height={28} />
          <span className={clsx("text-xl font-bold", isDark ? "text-white" : "text-gray-900")}>
            Elnino
          </span>
        </Link>
        <ul className={clsx("flex gap-6 text-sm font-medium", isDark ? "text-white" : "text-gray-700")}>
          <li>
            <Link href="/proposal" className="hover:text-blue-500 transition-colors">
              서비스 소개
            </Link>
          </li>
          <li>
            <Link href="/proposal?apply=true" className="hover:text-blue-500 transition-colors">
              이용 신청
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
