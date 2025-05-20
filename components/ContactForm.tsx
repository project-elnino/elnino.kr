"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [form, setForm] = useState({
    email: "", name: "", company: "", phone: "",
    date: "", duration: "", venue: "", language: "", screenOutput: "", additionalInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) return nextStep();
    
    // 개인정보 처리방침 동의 확인
    if (!privacyAgreed) {
      toast.error("개인정보 처리방침 동의", { description: "개인정보 처리방침에 동의해주세요." });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // API 호출 시뮬레이션 (실제 환경에서는 이 부분 수정)
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("신청이 완료되었습니다.", { 
        description: "빠른 시일 내에 연락드리겠습니다.", 
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" /> 
      });
      onSuccess?.();
    } catch {
      toast.error("서버 오류", { description: "잠시 후 다시 시도해 주세요." });
    } finally { 
      setIsSubmitting(false); 
    }
  };

  // 단계 프로그레스 계산
  const progressPercentage = `${33 * step}%`;

  return (
    <div>
      <Toaster richColors position="top-center" />
      
      {/* 단계 표시 ProgressBar */}
      <div className="w-full bg-blue-100 rounded-full h-3 mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: progressPercentage }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="rounded-3xl shadow-xl overflow-hidden border-0">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            <AnimatePresence mode="wait">
              {/* 1단계: 기본정보 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 bg-white"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
                      01
                    </div>
                    기본 정보 입력
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 이메일 */}
                    <div className="flex flex-col">
                      <Label htmlFor="email" className="font-medium mb-1">이메일 <span className="text-red-500">*</span></Label>
                      <Input id="email" name="email" type="email" required placeholder="example@company.com" value={form.email} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                    {/* 성명 */}
                    <div className="flex flex-col">
                      <Label htmlFor="name" className="font-medium mb-1">성명 <span className="text-red-500">*</span></Label>
                      <Input id="name" name="name" required placeholder="홍길동" value={form.name} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                    {/* 연락처 */}
                    <div className="flex flex-col">
                      <Label htmlFor="phone" className="font-medium mb-1">연락처 <span className="text-red-500">*</span></Label>
                      <Input id="phone" name="phone" required placeholder="010-1234-5678" value={form.phone} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                    {/* 업체명 */}
                    <div className="flex flex-col">
                      <Label htmlFor="company" className="font-medium mb-1">업체명</Label>
                      <Input id="company" name="company" placeholder="주식회사 예시" value={form.company} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                  </div>
                  <div className="mt-8 text-right">
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className="bg-white hover:bg-white text-blue-700 px-8 py-6 rounded-full border border-blue-200"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        다음
                      </motion.div>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* 2단계: 행사 정보 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 bg-gray-50"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
                      02
                    </div>
                    행사 정보 입력
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Label htmlFor="date" className="font-medium mb-1">희망 일정</Label>
                      <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} className="h-12 pl-10" />
                      <CalendarIcon className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="duration" className="font-medium mb-1">이용 시간</Label>
                      <Input id="duration" name="duration" placeholder="예: 오후 2시~4시" value={form.duration} onChange={handleChange} className="h-12" />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="venue" className="font-medium mb-1">행사 장소</Label>
                      <Input id="venue" name="venue" placeholder="서울 강남구 OO빌딩" value={form.venue} onChange={handleChange} className="h-12" />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="language" className="font-medium mb-1">필요 언어</Label>
                      <Input id="language" name="language" placeholder="영어→한국어" value={form.language} onChange={handleChange} className="h-12" />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <Button 
                      type="button" 
                      onClick={prevStep} 
                      variant="outline" 
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-6 rounded-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        이전
                      </motion.div>
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className="bg-white hover:bg-white text-blue-700 px-8 py-6 rounded-full border border-blue-200"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        다음
                      </motion.div>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* 3단계: 기타/완료 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 bg-white"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
                      03
                    </div>
                    추가 정보 입력
                  </h2>
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <Label htmlFor="screenOutput" className="font-medium mb-1">스크린 송출</Label>
                      <Input id="screenOutput" name="screenOutput" placeholder="예 / 아니오" value={form.screenOutput} onChange={handleChange} className="h-12" />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="additionalInfo" className="font-medium mb-1">기타 문의 사항</Label>
                      <Textarea 
                        id="additionalInfo" 
                        name="additionalInfo" 
                        placeholder="특별 요청 사항을 입력하세요." 
                        value={form.additionalInfo} 
                        onChange={handleChange} 
                        className="min-h-[120px] max-h-[120px] resize-none" 
                      />
                    </div>
                    
                    {/* 개인정보 처리방침 동의 체크박스 */}
                    <div className="flex items-start space-x-2 mt-6 p-4 bg-gray-50 rounded-lg">
                      <Checkbox 
                        id="privacy" 
                        checked={privacyAgreed}
                        onCheckedChange={(checked) => setPrivacyAgreed(checked === true)}
                        className="mt-1"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="privacy"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          개인정보 처리방침 동의 <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-500">
                          수집된 개인정보는 서비스 제공 목적으로만 사용되며, 이용 목적 외 활용 및 제3자 제공은 이루어지지 않습니다.{" "}
                          <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
                            전문 보기
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <Button 
                      type="button" 
                      onClick={prevStep} 
                      variant="outline" 
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-6 rounded-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        이전
                      </motion.div>
                    </Button>
                    <Button 
                      type="submit" 
                      className={cn(
                        "bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 rounded-full",
                        isSubmitting && "opacity-50 pointer-events-none"
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isSubmitting ? "제출 중..." : "신청하기"}
                      </motion.div>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}