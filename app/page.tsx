import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">

      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-white">
        <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl text-center">
          Welcome to Elnino
        </h1>
        <p className="mt-5 text-xl max-w-prose text-center">
          차세대 실시간 번역 자막 서비스 Elnino입니다.
        </p>
        <div className="mt-10">
          <Link href="/proposal">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Started
            </Button>
          </Link>
        </div>
      </main>

      <footer className="text-white text-opacity-80 text-center py-3 text-sm">
        © 2025 Elnino. All rights reserved.
      </footer>
    </div>
  )
}
