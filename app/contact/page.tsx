'use client'

import ContactForm from '@/components/ContactForm'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      {/* 상단 섹션: 파란색 배경에 타이틀 */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-900 pt-28 sm:pt-32 pb-20 relative overflow-hidden">
        {/* 배경 요소 - 정적 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-20" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500 rounded-full filter blur-[120px] opacity-20" />
        </div>

        {/* 타이틀 콘텐츠 */}
        <div className="container max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">이용 신청 및 문의</h1>
            <div className="h-1 w-24 bg-blue-300 mx-auto mb-8"></div>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">간단한 3단계로 신청을 완료하세요.</p>
          </div>
        </div>
      </section>

      {/* 중단 섹션: 흰색 배경에 제출 폼 - 패딩 줄임 */}
      <section className="bg-white py-14 flex-grow">
        <div className="container max-w-4xl mx-auto px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
      {/* CSS 스타일 */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px);
          background-size: 30px 30px;
        }
      `}</style>
      <Footer />
    </div>
  )
}