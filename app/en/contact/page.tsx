'use client'

import ContactForm from '@/components/en/ContactForm'
import Topbar from '@/components/en/Topbar'
import Footer from '@/components/en/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      {/* Top section: Blue background with title */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-900 pt-28 sm:pt-32 pb-20 relative overflow-hidden">
        {/* Background elements - static */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-20" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500 rounded-full filter blur-[120px] opacity-20" />
        </div>

        {/* Title content */}
        <div className="container max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Application & Inquiry</h1>
            <div className="h-1 w-24 bg-blue-300 mx-auto mb-8"></div>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">Complete your application in 3 simple steps.</p>
          </div>
        </div>
      </section>

      {/* Middle section: White background with form */}
      <section className="bg-white py-14 flex-grow">
        <div className="container max-w-4xl mx-auto px-6 lg:px-8">
          <ContactForm />
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