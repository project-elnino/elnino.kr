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
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

// Constants for better maintainability
const TOTAL_STEPS = 3;
const PROGRESS_STEP_PERCENTAGE = 33;
const KNOC_API_URL = process.env.NEXT_PUBLIC_KNOC_API_URL || "https://cloud.elnino.kr";

// Support types configuration
const SUPPORT_TYPES: SupportType[] = [
  {
    id: 'one-time',
    title: '단발성 지원',
    description: '컨퍼런스, 워크샵 등 일회성 행사',
    icon: '🎯'
  },
  {
    id: 'subscription',
    title: '구독형 지원',
    description: '기관 단위 월간/연간 정기 지원',
    icon: '🔄'
  }
];

// Purpose options for subscription
const PURPOSE_OPTIONS = ['회의/미팅', '교육/강의', '프레젠테이션', '국제 협업', '워크샵', '기타'];

// Validation result type for consistency
type ValidationResult = { isValid: true } | { isValid: false; message: string };

// Support type interface
interface SupportType {
  id: 'one-time' | 'subscription';
  title: string;
  description: string;
  icon: string;
}

// Form data interface
interface FormData {
  email: string;
  name: string;
  company: string;
  phone: string;
  // Support type selection
  supportType: 'one-time' | 'subscription' | '';
  // One-time event fields
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  eventDetails: string;
  // Subscription fields
  purposes: string[];
  institutionInfo: string;
  // Additional info
  additionalInfo: string;
}

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [form, setForm] = useState<FormData>({
    email: "", name: "", company: "", phone: "",
    supportType: "", startDate: "", endDate: "", startTime: "", endTime: "", 
    venue: "", eventDetails: "", purposes: [], institutionInfo: "", additionalInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSupportTypeChange = (selectedType: 'one-time' | 'subscription') => {
    setForm({ ...form, supportType: selectedType });
  };

  const handlePurposeChange = (purpose: string, checked: boolean) => {
    const updatedPurposes = checked 
      ? [...form.purposes, purpose]
      : form.purposes.filter(p => p !== purpose);
    setForm({ ...form, purposes: updatedPurposes });
  };

  // Step 1 validation: Basic information
  const validateStep1 = (formData: FormData): ValidationResult => {
    const requiredFields = [
      { field: formData.email, name: "이메일" },
      { field: formData.name, name: "성명" },
      { field: formData.phone, name: "연락처" },
    ];

    for (const { field, name } of requiredFields) {
      if (!field.trim()) {
        return { isValid: false, message: `${name}을(를) 입력해주세요.` };
      }
    }

    // Email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      return { isValid: false, message: "올바른 이메일 형식을 입력해주세요." };
    }

    return { isValid: true };
  };

  // Step 2 validation: Support type and related fields
  const validateStep2 = (formData: FormData): ValidationResult => {
    // Support type selection is required
    if (!formData.supportType) {
      return { isValid: false, message: "지원 유형을 선택해주세요." };
    }

    // Validate based on support type
    if (formData.supportType === 'one-time') {
      const requiredFields = [
        { field: formData.startDate, name: "행사 시작일" },
        { field: formData.endDate, name: "행사 종료일" },
        { field: formData.venue, name: "행사 장소" },
      ];

      for (const { field, name } of requiredFields) {
        if (!field.trim()) {
          return { isValid: false, message: `${name}을(를) 입력해주세요.` };
        }
      }

      // Check if start date is before end date
      if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
        return { isValid: false, message: "행사 종료일은 시작일보다 늦어야 합니다." };
      }

    } else if (formData.supportType === 'subscription') {
      if (!formData.institutionInfo.trim()) {
        return { isValid: false, message: "기관 소개 및 구독 목적을 입력해주세요." };
      }
    }
    
    return { isValid: true };
  };

  // Step 3 validation: Privacy agreement
  const validateStep3 = (privacyConsent: boolean): ValidationResult => {
    if (!privacyConsent) {
      return { isValid: false, message: "개인정보 처리방침에 동의해주세요." };
    }
    
    return { isValid: true };
  };

  // Unified validation function
  const validateCurrentStep = (): ValidationResult => {
    switch (step) {
      case 1:
        return validateStep1(form);
      case 2:
        return validateStep2(form);
      case 3:
        return validateStep3(privacyAgreed);
      default:
        return { isValid: true };
    }
  };

  const nextStep = () => {
    const validation = validateCurrentStep();
    
    if (!validation.isValid) {
      toast.error("입력 확인", { description: validation.message });
      return;
    }

    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < TOTAL_STEPS) {
      return nextStep();
    }
    
    // Final validation for step 3
    const validation = validateStep3(privacyAgreed);
    if (!validation.isValid) {
      toast.error("개인정보 처리방침 동의", { description: validation.message });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // knoc_server API로 문의사항 전송
      const inquiryData = {
        email: form.email,
        name: form.name,
        phone: form.phone,
        company: form.company || null,
        support_type: form.supportType,
        // 단발성 지원 필드
        start_date: form.startDate || null,
        end_date: form.endDate || null,
        start_time: form.startTime || null,
        end_time: form.endTime || null,
        venue: form.venue || null,
        event_details: form.eventDetails || null,
        // 구독형 지원 필드
        purposes: form.purposes.length > 0 ? form.purposes : null,
        institution_info: form.institutionInfo || null,
        // 공통
        additional_info: form.additionalInfo || null,
      };

      console.log('Submitting inquiry to KNOC API...');

      const response = await fetch(`${KNOC_API_URL}/api/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryData)
      });

      console.log('Response status:', response.status);

      const result = await response.json();
      console.log('API response:', result);

      if (result.status === 'success') {
        toast.success("신청이 완료되었습니다.", {
          description: "빠른 시일 내에 contact@elnino.kr에서 연락드리겠습니다.",
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
        });

        // 폼 초기화
        setForm({
          email: "", name: "", company: "", phone: "",
          supportType: "", startDate: "", endDate: "", startTime: "", endTime: "",
          venue: "", eventDetails: "", purposes: [], institutionInfo: "", additionalInfo: "",
        });
        setPrivacyAgreed(false);
        setStep(1);
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);

      let errorMessage = "문의 접수 중 오류가 발생했습니다.";

      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = "네트워크 연결을 확인해주세요.";
        } else if (error.message) {
          errorMessage = error.message;
        }
      }

      toast.error("전송 실패", {
        description: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress calculation
  const progressPercentage = `${PROGRESS_STEP_PERCENTAGE * step}%`;

  // Check if current step is valid for button state
  const isCurrentStepValid = (): boolean => {
    const validation = validateCurrentStep();
    return validation.isValid;
  };

  return (
    <div>
      <Toaster richColors position="top-center" />
      
      {/* Progress Bar */}
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
              {/* Step 1: Basic Information */}
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
                    {/* Email */}
                    <div className="flex flex-col">
                      <Label htmlFor="email" className="font-medium mb-1">이메일 <span className="text-red-500">*</span></Label>
                      <Input id="email" name="email" type="email" required placeholder="example@company.com" value={form.email} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                    {/* Name */}
                    <div className="flex flex-col">
                      <Label htmlFor="name" className="font-medium mb-1">성명 <span className="text-red-500">*</span></Label>
                      <Input id="name" name="name" required placeholder="홍길동" value={form.name} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col">
                      <Label htmlFor="phone" className="font-medium mb-1">연락처 <span className="text-red-500">*</span></Label>
                      <Input id="phone" name="phone" required placeholder="010-1234-5678" value={form.phone} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                    {/* Company */}
                    <div className="flex flex-col">
                      <Label htmlFor="company" className="font-medium mb-1">업체명</Label>
                      <Input id="company" name="company" placeholder="주식회사 예시" value={form.company} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                  </div>
                  <div className="mt-8 text-right">
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className={cn(
                        "px-8 py-6 rounded-full border border-blue-200",
                        isCurrentStepValid() 
                          ? "bg-white hover:bg-white text-blue-700" 
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: isCurrentStepValid() ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        다음
                      </motion.div>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Support Type Selection and Details */}
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
                    지원 정보 입력
                  </h2>

                  {/* Support Type Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">지원 유형 선택</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SUPPORT_TYPES.map((type) => (
                        <div
                          key={type.id}
                          className={cn(
                            "border-2 rounded-lg p-4 cursor-pointer transition-all",
                            form.supportType === type.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                          onClick={() => handleSupportTypeChange(type.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{type.icon}</span>
                            <div>
                              <h4 className="font-medium">{type.title}</h4>
                              <p className="text-sm text-gray-600">{type.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Form Content */}
                  <div className="bg-white p-6 rounded-lg">
                    {form.supportType === 'one-time' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startDate" className="font-medium mb-1">행사 시작일 <span className="text-red-500">*</span></Label>
                            <Input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} className="h-12" />
                          </div>
                          <div>
                            <Label htmlFor="endDate" className="font-medium mb-1">행사 종료일 <span className="text-red-500">*</span></Label>
                            <Input id="endDate" name="endDate" type="date" value={form.endDate} onChange={handleChange} className="h-12" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startTime" className="font-medium mb-1">이용 시작 시간</Label>
                            <Input id="startTime" name="startTime" type="time" value={form.startTime} onChange={handleChange} className="h-12" />
                          </div>
                          <div>
                            <Label htmlFor="endTime" className="font-medium mb-1">이용 종료 시간</Label>
                            <Input id="endTime" name="endTime" type="time" value={form.endTime} onChange={handleChange} className="h-12" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="venue" className="font-medium mb-1">행사 장소 <span className="text-red-500">*</span></Label>
                          <Input id="venue" name="venue" placeholder="서울 강남구 OO빌딩" value={form.venue} onChange={handleChange} className="h-12" />
                        </div>

                        <div>
                          <Label htmlFor="eventDetails" className="font-medium mb-1">행사 세부 내용</Label>
                          <Textarea 
                            id="eventDetails" 
                            name="eventDetails" 
                            placeholder="행사의 목적, 진행 방식, 필요한 지원 사항 등을 자세히 적어주세요." 
                            value={form.eventDetails} 
                            onChange={handleChange} 
                            className="min-h-[120px] max-h-[120px] resize-none" 
                          />
                        </div>
                      </div>
                    )}

                    {form.supportType === 'subscription' && (
                      <div className="space-y-6">
                        <div>
                          <Label className="font-medium mb-3 block">주요 사용 목적</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {PURPOSE_OPTIONS.map((purpose) => (
                              <label key={purpose} className="flex items-center space-x-2 cursor-pointer">
                                <Checkbox 
                                  checked={form.purposes.includes(purpose)}
                                  onCheckedChange={(checked) => handlePurposeChange(purpose, checked === true)}
                                />
                                <span className="text-sm">{purpose}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="institutionInfo" className="font-medium mb-1">기관 소개 및 구독 목적 <span className="text-red-500">*</span></Label>
                          <Textarea 
                            id="institutionInfo" 
                            name="institutionInfo" 
                            placeholder="기관의 특성과 구독 서비스를 통해 달성하고자 하는 목표를 자세히 설명해주세요. 예상 이용 규모나 특별한 요구사항이 있다면 함께 적어주세요." 
                            value={form.institutionInfo} 
                            onChange={handleChange} 
                            className="min-h-[120px] max-h-[120px] resize-none" 
                          />
                        </div>
                      </div>
                    )}

                    {!form.supportType && (
                      <div className="text-center py-8 text-gray-500">
                        위에서 지원 유형을 선택해주세요
                      </div>
                    )}
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
                      className={cn(
                        "px-8 py-6 rounded-full border border-blue-200",
                        isCurrentStepValid() 
                          ? "bg-white hover:bg-white text-blue-700" 
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: isCurrentStepValid() ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        다음
                      </motion.div>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Additional Information and Privacy Agreement */}
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
                      <Label htmlFor="additionalInfo" className="font-medium mb-2.5">기타 문의 사항</Label>
                      <Textarea 
                        id="additionalInfo" 
                        name="additionalInfo" 
                        placeholder="특별 요청 사항이나 추가로 전달하고 싶은 내용을 입력하세요." 
                        value={form.additionalInfo} 
                        onChange={handleChange} 
                        className="min-h-[120px] max-h-[120px] resize-none" 
                      />
                    </div>
                    
                    {/* Privacy Policy Agreement */}
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
                        "px-8 py-6 rounded-full",
                        isSubmitting || !isCurrentStepValid()
                          ? "bg-gray-400 text-white opacity-50 cursor-not-allowed" 
                          : "bg-blue-700 hover:bg-blue-800 text-white"
                      )}
                      disabled={isSubmitting || !isCurrentStepValid()}
                    >
                      <motion.div
                        whileHover={{ scale: (isSubmitting || !isCurrentStepValid()) ? 1 : 1.05 }}
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