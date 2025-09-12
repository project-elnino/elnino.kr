'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Topbar from '@/components/en/Topbar'
import Footer from '@/components/en/Footer'
import { 
  Download, 
  Monitor,
  Calendar,
  HardDrive,
  CheckCircle
} from 'lucide-react'

export default function DownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = (url: string) => {
    setIsDownloading(true)
    window.location.href = url
    
    setTimeout(() => {
      setIsDownloading(false)
    }, 3000)
  }

  const windowsPlatform = {
    name: 'Windows',
    icon: Monitor,
    color: '#0078D4',
    version: 'v0.0.1',
    releaseDate: '2025.07.30',
    fileSize: '108 MB',
    downloadUrl: 'https://github.com/project-elnino/elnino.kr/releases/latest/download/KnocSetup.exe',
    requirements: 'Windows 7 or higher • 4GB RAM • 200MB storage'
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      {/* Top section: Blue background with title */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 py-32 relative overflow-hidden">
        {/* Background animation elements */}
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

        {/* Title content */}
        <div className="container max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-extrabold text-white mb-6">Client Download</h1>
            <div className="h-1 w-24 bg-blue-300 mx-auto mb-10"></div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Complete all setup in just 1 minute.</p>
          </motion.div>
        </div>
      </section>

      {/* Middle section: White background with download content */}
      <section className="bg-white py-14 flex-grow">
        <div className="container max-w-4xl mx-auto px-6 lg:px-8">
          {/* Windows download section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Windows platform info card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-10 h-10" style={{ color: windowsPlatform.color }} />
                </div>
                
                {/* Info and download */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {windowsPlatform.name} {windowsPlatform.version}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {windowsPlatform.releaseDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-4 h-4" />
                          {windowsPlatform.fileSize}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {windowsPlatform.requirements}
                      </p>
                    </div>
                    
                    {/* Download button */}
                    <motion.button
                      onClick={() => handleDownload(windowsPlatform.downloadUrl)}
                      disabled={isDownloading}
                      className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-white transition-all ${
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
                          Download Started
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Download
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Help text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-sm text-gray-500"
            >
              If the download doesn&apos;t start automatically, please click the download button again
            </motion.p>

            {/* Additional info */}
            <motion.div 
              className="mt-12 grid grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Download</h3>
                <p className="text-sm text-gray-600">Download the installation file</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Install</h3>
                <p className="text-sm text-gray-600">Run the file to install</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Start</h3>
                <p className="text-sm text-gray-600">Login and start using</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CSS styles */}
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