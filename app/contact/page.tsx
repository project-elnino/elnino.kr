'use client'

import ContactForm from '@/components/ContactForm'
import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 상단 섹션: 파란색 배경에 타이틀 - 패딩 증가 */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 py-32 relative overflow-hidden">
        {/* 배경 애니메이션 요소 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-blue-800 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, 30, -20, 0],
              y: [0, -20, 20, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, -30, 20, 0],
              y: [0, 20, -20, 0],
              scale: [1, 0.9, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* 타이틀 콘텐츠 */}
        <div className="container max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-extrabold text-white mb-6">이용 신청 및 문의</h1>
            <div className="h-1 w-24 bg-blue-300 mx-auto mb-10"></div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">간단한 3단계로 신청을 완료하세요.</p>
          </motion.div>
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
    </div>
  )
}