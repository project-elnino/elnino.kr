import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <header className="absolute top-0 left-0 right-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl text-white">Knoc</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-white">
        <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl text-center">
          Welcome to Knoc
        </h1>
        <p className="mt-5 text-xl max-w-prose text-center">
          다양한 언어권의 사람들과 서로 소통하고, 의견을 나눠보세요!<br/> 차세대 실시간 통역 커뮤니케이션 플랫폼 Knoc입니다. 
        </p>
        <div className="mt-10">
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">Get Started</Button>
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 bg-transparent">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white text-opacity-80">
            © 2024 Knoc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}