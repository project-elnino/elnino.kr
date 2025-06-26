'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Mail, Github, Award, Users, Rocket, ChevronDown } from 'lucide-react'
//import { Button } from "@/components/ui/button"

// 팀원 데이터 타입
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  github?: string;
}

// 업적 데이터 타입
interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// 팀원 데이터
const teamMembers: TeamMember[] = [
  {
    id: 'member1',
    name: '김경민',
    role: 'Co-founder',
    bio: '',
    image: '/kdr.jpg',
    email: 'kdrkdrkdr@hanyang.ac.kr',
    github: 'https://github.com/kdrkdrkdr'
  },
  {
    id: 'member2',
    name: '김영준',
    role: 'Co-founder',
    bio: '',
    image: '/angjun.jpg',
    email: 'peteryoung04@hanyang.ac.kr',
    github: 'https://github.com/angjun04'
  }
]

// 팀 업적/레퍼런스 데이터
const achievements: Achievement[] = [
  {
    icon: <Award className="h-6 w-6" />,
    title: "U300+ 선정",
    description: "2024년 교육부 & 과학기술정보통신부 주관 창업유망팀 성장트랙 선정"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "대한영상의학기술학회 협업",
    description: "대한영상의학기술학회와 협업하여 국제학술대회에 번역 서비스 제공 및 기술장려금 수상"
  },
]

// 파트너사/고객사 로고 (예시)
const partners = [
  { name: "Gladia", logo: "" },
  { name: "Oracle", logo: "" },
]

export default function TeamPage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // 스크롤 다운 함수
  const scrollToTeam = () => {
    const teamSection = document.getElementById('team-section')
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* 스크롤 프로그레스 바 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-blue-600 origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* 히어로 섹션 */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden"
      >
        {/* 배경 애니메이션 요소 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-blue-800 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, 20, -15, 0],
              y: [0, -15, 10, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, -20, 15, 0],
              y: [0, 15, -10, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <motion.div 
          className="container mx-auto px-4 relative z-10 py-16 max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="max-w-3xl">
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-white/10 text-blue-100 font-medium text-sm mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Meet Our Team
            </motion.span>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Team Elnino
            </motion.h1>
            
            <motion.div 
              className="h-1 w-24 bg-blue-300 mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            
            <motion.p 
              className="text-xl text-blue-100 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              언어의 장벽이 완전히 무너지는 그날까지,
              <br />
              우리는 Team Elnino 입니다.
            </motion.p>
            
            {/* 스크롤 다운 인디케이터 */}
            <motion.div 
              className="absolute bottom-1 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <button 
                onClick={scrollToTeam} 
                className="text-white/70 hover:text-white transition-colors"
                aria-label="아래로 스크롤"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 팀원 소개 섹션 */}
      <section id="team-section" className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
              Co-founders
            </span>
            <h2 className="text-4xl font-bold text-gray-900">창업자 소개</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id} 
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* 배경 그라데이션 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50"></div>
                  
                  {/* 프로필 이미지 */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* 정보 */}
                  <div className="relative p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-blue-600 font-medium">{member.role}</p>
                      </div>
                      {/* 연락처 아이콘 */}
                      <div className="flex gap-3">
                        {member.email && (
                          <motion.a
                            href={`mailto:${member.email}`}
                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Mail className="h-5 w-5" />
                          </motion.a>
                        )}
                        {member.github && (
                          <motion.a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="h-5 w-5" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 팀 업적/레퍼런스 섹션 */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4">
              Achievements
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">레퍼런스</h2>
            {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              짧은 시간 동안 놀라운 성과를 이루어냈습니다
            </p> */}
          </motion.div>

          {/* 업적 카드 */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>

          {/* 파트너사 로고 섹션 */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">함께하는 파트너</h3>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  /> */}
                  <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-600 font-medium">{partner.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  )
}