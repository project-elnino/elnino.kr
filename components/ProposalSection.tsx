'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation' // Next.js 13의 app router 사용
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css' // AOS 스타일시트 임포트
import { Button } from "@/components/ui/button" // shadcn/ui 버튼 임포트

export default function ProposalSection() {
  const router = useRouter()

  // AOS 초기화 - 애니메이션 설정 수정
  useEffect(() => {
    AOS.init({
      duration: 1000, // 애니메이션 지속 시간
      once: true, // 한 번만 실행
      offset: 150, // 오프셋 약간 줄임
      easing: 'ease-out-cubic',
    })
  }, [])

  const items = [
    {
      text: "🌐 실시간 번역 자막 제공",
      description: "이용신청 후 간단한 클라이언트 설치만으로 모든 참석자에게 실시간 번역 자막을 제공합니다.",
      imageUrl: "/images/realtime-translation.png"
    },
    {
      text: "🗣️ 최대 101개 언어 동시 지원",
      description: "신청한 언어로 room을 생성하면 최대 101개 언어의 동시인식과 동시통역이 가능합니다.",
      imageUrl: "/images/multiple-languages.png"
    },
    {
      text: "🏢 다양한 규모에 맞춤 적용",
      description: "대형 컨퍼런스 스크린부터 소규모 교실까지 모든 환경에서 원활하게 사용 가능합니다.",
      imageUrl: "/images/scalable-solution.png"
    },
    {
      text: "💻 발화자는 노트북 한 대면 충분",
      description: "발화자는 마이크가 연결된 노트북 한 대만 있으면 번역 시스템을 운영할 수 있습니다.",
      imageUrl: "/images/speaker-setup.png"
    },
    {
      text: "📱 참가자는 스마트폰으로 간편 접속",
      description: "참가자들은 별도 앱 설치 없이 스마트폰으로 웹에 접속하여 원하는 언어의 자막을 볼 수 있습니다.",
      imageUrl: "/images/mobile-access.png"
    },
    {
      text: "⚡ 복잡한 설정 없이 바로 이용",
      description: "기술적 지식이 없어도 누구나 쉽게 설치하고 바로 사용할 수 있는 직관적인 인터페이스를 제공합니다.",
      imageUrl: "/images/easy-setup.png"
    }
  ]

  const handleButtonClick = () => {
    router.push('/contact')
  }

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">서비스 특징</h2>
        
        <div className="space-y-16">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              {/* 홀수 인덱스에서는 텍스트가 먼저 나오고, 짝수 인덱스에서는 이미지가 먼저 나옴 */}
              {index % 2 === 0 ? (
                <>
                  <div className="md:w-1/2" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
                    <div className="bg-white shadow-md rounded-xl overflow-hidden" style={{ height: '180px' }}>
                      <img 
                        src={item.imageUrl} 
                        alt={`${item.text} 이미지`} 
                        className="w-full h-full object-contain p-3"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 py-3" data-aos="fade-left" data-aos-delay="300" data-aos-duration="1000">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-3">{item.text}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:w-1/2 md:order-2" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
                    <div className="bg-white shadow-md rounded-xl overflow-hidden" style={{ height: '180px' }}>
                      <img 
                        src={item.imageUrl} 
                        alt={`${item.text} 이미지`} 
                        className="w-full h-full object-contain p-3"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:order-1 py-3" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-3">{item.text}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* 고정 버튼 - Next.js Link와 useRouter 적용 */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Button 
          className="shadow-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 px-10 rounded-full text-lg transition-all"
          onClick={handleButtonClick}
          asChild
        >
          <Link href="/contact">
            이용 신청 및 문의
          </Link>
        </Button>
      </div>
    </section>
  )
}