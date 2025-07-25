'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  Monitor, 
  Apple,
  Calendar,
  HardDrive,
  CheckCircle
} from 'lucide-react'

export default function DownloadPage() {
  const [selectedOS, setSelectedOS] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  // OS 자동 감지
  useEffect(() => {
    const userAgent = navigator.userAgent
    if (userAgent.includes('Win')) {
      setSelectedOS('windows')
    } else if (userAgent.includes('Mac')) {
      setSelectedOS('mac')
    }
  }, [])

  const handleDownload = (url: string) => {
    setIsDownloading(true)
    window.location.href = url
    
    setTimeout(() => {
      setIsDownloading(false)
    }, 3000)
  }

  const platforms = {
    windows: {
      id: 'windows',
      name: 'Windows',
      icon: Monitor,
      color: '#0078D4',
      version: 'v0.0.1',
      releaseDate: '2025.01.25',
      fileSize: '108 MB',
      downloadUrl: 'https://github.com/project-elnino/elnino.kr/releases/latest/download/KnocSetup.exe',
      requirements: 'Windows 7 이상 • 4GB RAM • 500MB 저장공간'
    },
    mac: {
      id: 'mac',
      name: 'macOS',
      icon: Apple,
      color: '#000000',
      version: 'Coming Soon',
      releaseDate: '2025 Q2',
      fileSize: '45.8 MB',
      downloadUrl: null,
      requirements: 'macOS 10.13 이상 • 4GB RAM • 300MB 저장공간'
    }
  }

  const currentPlatform = selectedOS ? platforms[selectedOS as keyof typeof platforms] : null

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
            <h1 className="text-5xl font-extrabold text-white mb-6">클라이언트 다운로드</h1>
            <div className="h-1 w-24 bg-blue-300 mx-auto mb-10"></div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">1분 만에 모든 설정을 끝냅니다.</p>
          </motion.div>
        </div>
      </section>

      {/* 중단 섹션: 흰색 배경에 다운로드 컨텐츠 - 패딩 줄임 */}
      <section className="bg-white py-14 flex-grow">
        <div className="container max-w-4xl mx-auto px-6 lg:px-8">
          {/* 플랫폼 선택 */}
          <div className="mb-16">
            <div className="border-l-4 border-blue-500 pl-4 mb-8">
              <h2 className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-1">
                Step 01
              </h2>
              <h3 className="text-2xl font-bold text-gray-900">
                운영체제 선택
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(platforms).map(([key, platform]) => {
                const Icon = platform.icon
                return (
                  <motion.button
                    key={key}
                    onClick={() => setSelectedOS(key)}
                    className={`relative p-8 rounded-xl border-2 transition-all ${
                      selectedOS === key 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon 
                      className="w-12 h-12 mx-auto mb-3" 
                      style={{ color: selectedOS === key ? platform.color : '#6B7280' }}
                    />
                    <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{platform.version}</p>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* 다운로드 섹션 */}
          <AnimatePresence mode="wait">
            {currentPlatform && (
              <motion.div
                key={selectedOS}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Step 02 표시 */}
                <div className="border-l-4 border-blue-500 pl-4 mb-6">
                  <h2 className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-1">
                    Step 02
                  </h2>
                  <h3 className="text-2xl font-bold text-gray-900">
                    다운로드 실행
                  </h3>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-10 space-y-6">
                  {/* 플랫폼 정보 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {currentPlatform.name} {currentPlatform.version}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {currentPlatform.releaseDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-4 h-4" />
                          {currentPlatform.fileSize}
                        </span>
                      </div>
                    </div>
                    
                    {/* 다운로드 버튼 */}
                    {currentPlatform.downloadUrl ? (
                      <motion.button
                        onClick={() => handleDownload(currentPlatform.downloadUrl)}
                        disabled={isDownloading}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all ${
                          isDownloading 
                            ? 'bg-green-600' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isDownloading ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            다운로드 시작됨
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5" />
                            다운로드
                          </>
                        )}
                      </motion.button>
                    ) : (
                      <div className="px-6 py-3 bg-gray-200 text-gray-500 rounded-lg font-medium">
                        준비 중
                      </div>
                    )}
                  </div>

                  {/* 시스템 요구사항 */}
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-700">시스템 요구사항:</span> {currentPlatform.requirements}
                    </p>
                  </div>
                </div>

                {/* 도움말 */}
                {currentPlatform.downloadUrl && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-center text-sm text-gray-500"
                  >
                    다운로드가 자동으로 시작되지 않으면 다운로드 버튼을 다시 클릭해주세요
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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