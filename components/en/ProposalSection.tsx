'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRightIcon,  CheckCircle, ChevronDown, Globe, X } from "lucide-react"
import Topbar from "@/components/en/Topbar"
import Footer from "@/components/en/Footer"

// Service introduction URL
const SERVICE_INTRODUCTION_URL = "https://gamma.app/embed/6eqrunekf378rz0";

// Data type definitions
interface Stat {
  label: string;
  value: string;
}

interface Differentiator {
  id: string;
  title: string;
  description: string;
  highlight: string;
  stats: Stat[];
}

interface Feature {
  icon: string;
  title:string;
  description: string;
  details: string;
}

// Differentiator data
const differentiators: Differentiator[] = [
  {
    id: "boosting-model",
    title: "Word & Context Boosting Model",
    description: "AI model specialized for specific industries and fields, boosting both keywords and context simultaneously. Guarantees up to 99% accuracy in professional fields such as medicine, law, IT, and finance.",
    highlight: "Enhanced accuracy compared to competitors",
    stats: [
      { label: "Accuracy", value: "99%" },
      { label: "Supported Fields", value: "10+" },
      { label: "Customizable", value: "Yes" }
    ]
  },
  {
    id: "scalable-solution",
    title: "Support for Various Scales",
    description: "Provides stable performance in all environments, from small 5-person meetings to large conferences with over 5,000 participants. Automatically optimizes according to network conditions.",
    highlight: "Supports up to 5,000 simultaneous connections",
    stats: [
      { label: "Max Participants", value: "5,000+" },
      { label: "Min Participants", value: "1" },
      { label: "Auto Network Optimization", value: "Yes" }
    ]
  },
  {
    id: "easy-setup",
    title: "Easy Installation & Use",
    description: "System setup is complete with just program installation. Presenters need only a laptop, and participants can enjoy smooth translation services with just their smartphones.",
    highlight: "Installation takes only 1 minute",
    stats: [
      { label: "Installation Steps", value: "1 Step" },
      { label: "Required Equipment", value: "1 Laptop" },
      { label: "Technical Support", value: "24/7" }
    ]
  }
]

// Common features data
const commonFeatures: Feature[] = [
  {
    icon: "⚡",
    title: "Fast Speed",
    description: "Immediate translation after speech maintains natural conversation flow",
    details: "Experience smooth conversations with minimal delay using AI-optimized algorithms. Enjoy seamless dialogue considering context before and after."
  },
  {
    icon: "🗣️",
    title: "101 Languages Support",
    description: "Wide support from major world languages to minority languages",
    details: "Supports languages from English and Chinese to rare languages. All languages support bidirectional translation and are continuously updated."
  },
  {
    icon: "🌐",
    title: "No Language Survey Needed",
    description: "Participants can select their own language directly",
    details: "Speakers and participants select their own languages directly. Quick setup is possible even right before the meeting without prior surveys."
  },
  {
    icon: "💰",
    title: "Reasonable Pricing",
    description: "Maximize cost efficiency with reasonable pricing plans",
    details: "Provides reasonable and transparent billing with monthly subscriptions. Choose from various pricing plans based on company size or number of users."
  }
]

// Component Props type definitions
interface DifferentiatorItemProps {
  item: Differentiator;
  index: number;
}

interface FeatureItemProps {
  feature: Feature;
  index: number;
}

// Differentiator item component
function DifferentiatorItem({ item, index }: DifferentiatorItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
    >
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 overflow-hidden">
        {/* Background large number design element */}
        <div className="absolute top-4 right-8 text-8xl md:text-9xl font-black text-gray-200/80 select-none z-0">
          {(index + 1).toString().padStart(2, '0')}
        </div>

        {/* Background blur effects */}
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full filter blur-3xl opacity-50"
          animate={{ x: [0, 10, -5, 0], y: [0, -5, 10, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full filter blur-3xl opacity-50"
          animate={{ x: [0, -10, 5, 0], y: [0, 5, -10, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        />

        {/* Text content area */}
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {item.title}
          </h3>
          <div className="h-1 w-16 bg-blue-500 mb-6"></div>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl">
            {item.description}
          </p>

          {/* Statistics - grid layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 max-w-lg">
            {item.stats.map((stat, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center transform transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md border border-gray-200/50">
                <p className="text-blue-600 font-bold text-2xl mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Highlight info */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-lg shadow-sm">
            <CheckCircle className="inline-block h-5 w-5 mr-2 text-blue-600" />
            {item.highlight}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Feature item component
function FeatureItem({ feature }: FeatureItemProps) {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top content area */}
      <div className="p-6 flex-1">
        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-xl text-xl mb-4 shadow-sm">
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-700 text-sm">{feature.description}</p>
      </div>
      
      {/* Divider line */}
      <div className="px-6">
        <div className="h-px bg-gray-200"></div>
      </div>
      
      {/* Detail content */}
      <div className="bg-blue-50 px-6 py-4">
        <p className="text-gray-700 text-sm leading-relaxed">{feature.details}</p>
      </div>
    </motion.div>
  );
}

export default function ProposalSection() {
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [showIntroduction, setShowIntroduction] = useState(false)
  const [iframeLoading, setIframeLoading] = useState(true)
  
  // Section references
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const commonRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  // Scroll progress - using Framer Motion
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Prevent horizontal scroll
  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  // Prevent scroll and ESC key handler when modal is open
  useEffect(() => {
    if (showIntroduction) {
      document.body.style.overflow = 'hidden';
      
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowIntroduction(false);
        }
      };
      
      window.addEventListener('keydown', handleEsc);
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [showIntroduction]);

  // Determine active section
  useEffect(() => {
    const handleScroll = () => {      
      const scrollPosition = window.scrollY + 100
      const windowHeight = window.innerHeight
      const bodyHeight = document.body.scrollHeight
      
      if (window.scrollY + windowHeight >= bodyHeight - 100) {
        setActiveSection("cta")
      } else if (ctaRef.current && scrollPosition >= ctaRef.current.offsetTop) {
        setActiveSection("cta")
      } else if (commonRef.current && scrollPosition >= commonRef.current.offsetTop) {
        setActiveSection("common")
      } else if (featuresRef.current && scrollPosition >= featuresRef.current.offsetTop) {
        setActiveSection("features")
      } else {
        setActiveSection("hero")
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to specific section
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <Topbar />
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-blue-600 origin-left"
          style={{ scaleX }}
        ></motion.div>
      </div>
      
      {/* Side navigation */}
      <div className="fixed right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center space-y-6">
          <button 
            onClick={() => scrollToSection(heroRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'hero' ? 'bg-blue-600 w-4 h-4' : 'bg-gray-400'}`}
            aria-label="Go to hero section"
          />
          <button 
            onClick={() => scrollToSection(featuresRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'features' ? 'bg-blue-600 w-4 h-4' : 'bg-gray-400'}`}
            aria-label="Go to differentiators section"
          />
          <button 
            onClick={() => scrollToSection(commonRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'common' ? 'bg-blue-600 w-4 h-4' : 'bg-gray-400'}`}
            aria-label="Go to features section"
          />
          <button 
            onClick={() => scrollToSection(ctaRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'cta' ? 'bg-blue-600 w-4 h-4' : 'bg-gray-400'}`}
            aria-label="Go to CTA section"
          />
        </div>
      </div>

      {/* Hero section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden"
      >
        {/* Background animation elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
          <motion.div 
            className="absolute top-20 left-5 w-48 h-48 lg:w-64 lg:h-64 bg-blue-800 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, 15, -10, 0],
              y: [0, -10, 10, 0],
              scale: [1, 1.05, 0.95, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-5 w-60 h-60 lg:w-80 lg:h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, -15, 10, 0],
              y: [0, 10, -10, 0],
              scale: [1, 0.95, 1.05, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
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
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-blue-100 font-medium text-sm mb-6 mt-8 backdrop-blur-sm">
              AI Real-time Translation Service
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Creating a World<br />Without Language Barriers
            </h1>
            <div className="h-1 w-24 bg-blue-300 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 text-blue-100">
              Experience perfect translation in any environment
              <br />from small meetings to large conferences with field-specific custom models.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4 mb-8">
              <Button 
                size="default" 
                className="bg-white hover:bg-white text-blue-700 text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full"
                asChild
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/en/contact">
                    <span className="flex items-center justify-center">
                      Apply Now
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5" />
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>
              </Button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  variant="outline" 
                  size="default" 
                  className="bg-white hover:bg-white text-blue-700 text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full"
                  onClick={() => {
                    setShowIntroduction(true);
                    setIframeLoading(true);
                  }}
                >
                  Service Introduction
                </Button>
              </motion.div>
            </div>
            
            {/* Enter Interpretation Room button */}
            <div className="flex justify-center mb-16">
              <Button 
                variant="outline" 
                size="default" 
                className="bg-transparent border-2 border-white/30 hover:bg-white/10 text-white text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full backdrop-blur-sm"
                asChild
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <a href="https://cloud.elnino.kr/" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center justify-center">
                      <Globe className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      Enter Interpretation Room
                    </span>
                  </a>
                </motion.div>
              </Button>
            </div>
            
            {/* Scroll down indicator */}
            <motion.div 
              className="absolute bottom-9 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <button 
                onClick={() => scrollToSection(featuresRef)} 
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Scroll down"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ transform: 'translateY(1px)' }}>
          <svg
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ marginBottom: '-1px', display: 'block' }}
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,32L48,48C96,64,192,96,288,96C384,96,480,64,576,48C672,32,768,32,864,48C960,64,1056,96,1152,96C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Differentiators section */}
      <section 
        ref={featuresRef}
        className="py-24 bg-gray-50 overflow-hidden -mt-px"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">Differentiated Technology</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Knoc&apos;s Unique Differentiators</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide stable and accurate translation services with field-specific translation model technology that sets us apart from other services.
            </p>
          </motion.div>

          <div className="space-y-24">
            {differentiators.map((item, index) => (
              <DifferentiatorItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Common features section */}
      <section 
        ref={commonRef}
        className="pt-24 pb-8 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4">Core Features</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Essential Features You Can&apos;t Miss</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We have all the essential features for the best translation experience.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-x-8 gap-y-4 items-stretch"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
          >
            {commonFeatures.map((feature, index) => (
              <FeatureItem key={index} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section 
        ref={ctaRef}
        className="py-24 bg-gradient-to-br from-blue-700 to-indigo-800 text-white relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 right-0 w-72 h-72 lg:w-96 lg:h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, -10, 5, 0],
              y: [0, 5, -8, 0],
              scale: [1, 1.02, 0.98, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-72 h-72 lg:w-96 lg:h-96 bg-indigo-700 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, 10, -5, 0],
              y: [0, -5, 8, 0],
              scale: [1, 0.98, 1.02, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>
        
        <motion.div 
          className="container mx-auto px-4 text-center relative z-10 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Get Started Now</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            From installation to utilization, possible within 1 minute.
          </p>
          
          {/* Expected benefits checklist */}
          <div className="max-w-md mx-auto mb-10 text-left">
            <p className="text-lg font-semibold mb-4 text-center">Expected Benefits</p>
            <ul className="space-y-3">
              {[
                'Increased participation in international meetings',
                'Enhanced participant understanding'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-2 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* CTA button */}
          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Link href="/en/contact" className="group bg-white text-blue-700 text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full inline-flex items-center justify-center font-semibold shadow-sm">
                Contact for Implementation
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Fixed button - scroll to top */}
      <motion.div 
        className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 z-50"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <button 
          onClick={() => scrollToSection(heroRef)}
          className="bg-white p-3 lg:p-4 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 transition-colors"
          aria-label="Go to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </motion.div>

      {/* Service introduction iframe modal */}
      {showIntroduction && (
        <motion.div 
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowIntroduction(false)}
        >
          <motion.div 
            className="bg-white rounded-lg w-full max-w-6xl h-[90vh] relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-semibold text-gray-900">Service Introduction</h3>
              <button 
                onClick={() => setShowIntroduction(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* iframe container */}
            <div className="pt-16 h-full">
              {/* Loading indicator */}
              {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white pt-16">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                  </div>
                </div>
              )}
              <iframe 
                src={SERVICE_INTRODUCTION_URL}
                className="w-full h-full border-0"
                title="Service Introduction"
                allowFullScreen
                onLoad={() => setIframeLoading(false)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <style jsx global>{`
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px);
          background-size: 30px 30px;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Footer />
    </div>
  )
}