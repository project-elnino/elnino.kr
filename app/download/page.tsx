'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowDownIcon, CheckCircle, LaptopIcon, AppleIcon } from 'lucide-react'

export default function DownloadPage() {
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

      {/* 중앙 섹션: 다운로드 링크 및 정보 */}
      <section className="bg-white py-20 flex-grow">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          {/* 주요 다운로드 영역 */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">최신 버전 v0.0.1</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">지금 바로 다운로드하세요</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Windows에서 사용 가능한 Knoc 클라이언트를 설치하고 빠르게 시작하세요.
            </p>
          </motion.div>

          {/* 플랫폼 선택 탭 */}
          <div className="max-w-4xl mx-auto mb-20 justify-center">
            <Tabs defaultValue="windows" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8 justify-center">
                <TabsTrigger value="windows" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                  <LaptopIcon className="h-5 w-5 mr-2" />
                  Windows
                </TabsTrigger>
                <TabsTrigger value="mac" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                  <AppleIcon className="h-5 w-5 mr-2" />
                  Mac OS
                </TabsTrigger>
              </TabsList>

              {/* Windows 콘텐츠 */}
              <TabsContent value="windows" className="mt-0">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* 이미지 섹션 */}
                    <div className="bg-gradient-to-br from-blue-50 to-white p-8 flex items-center justify-center">
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <div className="relative w-[280px] h-[200px] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                          <div className="h-6 bg-gray-100 flex items-center px-2 border-b border-gray-200">
                            <div className="flex space-x-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-400"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                              <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="h-4 w-3/4 bg-blue-100 rounded mb-2"></div>
                            <div className="h-3 w-full bg-gray-100 rounded mb-1.5"></div>
                            <div className="h-3 w-full bg-gray-100 rounded mb-1.5"></div>
                            <div className="h-3 w-4/5 bg-gray-100 rounded mb-3"></div>
                            <div className="h-16 w-full bg-blue-50 rounded border border-blue-100 flex items-center justify-center">
                              <div className="text-blue-500 text-center text-xs">Elnino 번역 중...</div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 w-12 h-12 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white">
                          <span className="font-bold">E</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* 다운로드 섹션 */}
                    <div className="bg-white p-8">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Windows 클라이언트</h3>
                          <p className="text-gray-600 mb-4">
                            Windows 7 이상의 환경에서 작동합니다. 설치 후 바로 사용이 가능합니다.
                          </p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">실시간 번역 및 자막 지원</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">다국어 변환 및 화면 표시</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">마이크 및 스피커 통합 지원</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <div className="text-sm text-gray-500 mb-2">
                            <span className="font-medium">파일 크기:</span> 45.8MB | <span className="font-medium">업데이트:</span> 2025.06.14
                          </div>
                          <a href="https://github.com/project-elnino/elnino.kr/releases/latest/download/KnocSetup.exe" download>
                            <Button size="lg" className="w-full py-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                              <motion.div whileHover={{ scale: 1.03 }} className="flex justify-center items-center">
                                <ArrowDownIcon className="mr-2 h-5 w-5" /> 다운로드
                              </motion.div>
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Mac OS 콘텐츠 */}
              <TabsContent value="mac" className="mt-0">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* 이미지 섹션 */}
                    <div className="bg-gradient-to-br from-blue-50 to-white p-8 flex items-center justify-center">
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <div className="relative w-[280px] h-[200px] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                          <div className="h-6 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center px-2 border-b border-gray-200">
                            <div className="flex space-x-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-400"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                              <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="h-4 w-3/4 bg-blue-100 rounded mb-2"></div>
                            <div className="h-3 w-full bg-gray-100 rounded mb-1.5"></div>
                            <div className="h-3 w-full bg-gray-100 rounded mb-1.5"></div>
                            <div className="h-3 w-4/5 bg-gray-100 rounded mb-3"></div>
                            <div className="h-16 w-full bg-blue-50 rounded border border-blue-100 flex items-center justify-center">
                              <div className="text-blue-500 text-center text-xs">Elnino 번역 중...</div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 w-12 h-12 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white">
                          <span className="font-bold">E</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* 다운로드 섹션 */}
                    <div className="bg-white p-8">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Mac OS 클라이언트</h3>
                          <p className="text-gray-600 mb-4">
                            macOS 10.13 (High Sierra) 이상의 환경에서 작동합니다.
                          </p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">Apple Silicon 및 Intel 칩 모두 지원</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">시스템 설정과 완벽 통합</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">Touch Bar 및 단축키 지원</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <div className="text-sm text-gray-500 mb-2">
                            <span className="font-medium">파일 크기:</span> 45.8MB | <span className="font-medium">업데이트:</span> 2025.05.21
                          </div>
                          <Button 
                            size="lg" 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 rounded-xl"
                          >
                            <motion.div
                              className="flex items-center justify-center w-full"
                              whileHover={{ scale: 1.03 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ArrowDownIcon className="mr-2 h-5 w-5" />
                              Mac OS 설치 파일 다운로드(준비 중)
                            </motion.div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* 설치 과정 안내 */}
          <motion.div 
            className="max-w-4xl mx-auto py-10 px-8 rounded-2xl bg-gray-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">간단한 설치 과정</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4">
                  <ArrowDownIcon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">1. 다운로드</h4>
                <p className="text-gray-600 text-sm">
                  운영체제에 맞는 클라이언트를 다운로드하세요.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4">
                  <LaptopIcon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">2. 설치 및 구동</h4>
                <p className="text-gray-600 text-sm">
                  안내에 따라 설치하고 실행하세요.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">3. 연결 시작</h4>
                <p className="text-gray-600 text-sm">
                  로그인 후 바로 번역 기능을 사용하세요.
                </p>
              </div>
            </div>
          </motion.div>

          
            
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