"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"; // 이 부분을 수정했습니다
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    company: "",
    phone: "",
    date: "",
    duration: "",
    venue: "",
    language: "",
    screenOutput: "",
    additionalInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("신청이 완료되었습니다.", {
          description: "빠른 시일 내에 연락드리겠습니다.",
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        });
        
        setForm({
          email: "",
          name: "",
          company: "",
          phone: "",
          date: "",
          duration: "",
          venue: "",
          language: "",
          screenOutput: "",
          additionalInfo: "",
        });
        
        if (onSuccess) onSuccess();
      } else {
        toast.error("오류가 발생했습니다.", {
          description: "잠시 후 다시 시도해 주세요.",
        });
      }
    } catch (error) {
      toast.error("서버 오류가 발생했습니다.", {
        description: "잠시 후 다시 시도해 주세요.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      <Toaster richColors position="top-center" />
      
      <Card className="border-0 shadow-xl rounded-xl bg-white">
        <CardHeader className="bg-blue-600 text-white rounded-t-xl">
          <CardTitle className="text-3xl font-bold">이용 신청 및 문의</CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  이메일 <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="email"
                  required 
                  name="email" 
                  type="email"
                  placeholder="example@company.com"
                  value={form.email} 
                  onChange={handleChange}
                  className="h-12 border-gray-300" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">
                  성명 <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="name"
                  required 
                  name="name" 
                  placeholder="홍길동"
                  value={form.name} 
                  onChange={handleChange}
                  className="h-12 border-gray-300" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-base font-medium">업체명</Label>
                <Input 
                  id="company"
                  name="company" 
                  placeholder="주식회사 예시"
                  value={form.company} 
                  onChange={handleChange}
                  className="h-12 border-gray-300" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium">
                  연락처 <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="phone"
                  required 
                  name="phone" 
                  placeholder="010-1234-5678"
                  value={form.phone} 
                  onChange={handleChange}
                  className="h-12 border-gray-300" 
                />
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">행사 정보</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-base font-medium">이용 희망 일정</Label>
                  <div className="relative">
                    <Input 
                      id="date"
                      type="date" 
                      name="date" 
                      value={form.date} 
                      onChange={handleChange}
                      className="h-12 border-gray-300 pl-12" 
                    />
                    <CalendarIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-base font-medium">이용 시간</Label>
                  <Input 
                    id="duration"
                    name="duration" 
                    placeholder="예: 오후 2시 ~ 4시" 
                    value={form.duration} 
                    onChange={handleChange}
                    className="h-12 border-gray-300" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="venue" className="text-base font-medium">행사 장소</Label>
                  <Input 
                    id="venue"
                    name="venue" 
                    placeholder="예: 서울시 강남구 OO빌딩 회의실"
                    value={form.venue} 
                    onChange={handleChange}
                    className="h-12 border-gray-300" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-base font-medium">필요 언어</Label>
                  <Input 
                    id="language"
                    name="language" 
                    placeholder="예: 영어→한국어" 
                    value={form.language} 
                    onChange={handleChange}
                    className="h-12 border-gray-300" 
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <Label htmlFor="screenOutput" className="text-base font-medium">스크린 송출 여부</Label>
                <Input 
                  id="screenOutput"
                  name="screenOutput" 
                  placeholder="예 / 아니오" 
                  value={form.screenOutput} 
                  onChange={handleChange}
                  className="h-12 border-gray-300" 
                />
              </div>
              
              <div className="mt-6 space-y-2">
                <Label htmlFor="additionalInfo" className="text-base font-medium">기타 문의 정보</Label>
                <Textarea 
                  id="additionalInfo"
                  name="additionalInfo" 
                  placeholder="추가 문의 사항이나 특별 요청 사항이 있다면 작성해주세요."
                  value={form.additionalInfo} 
                  onChange={handleChange}
                  className="min-h-32 border-gray-300" 
                />
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="px-8 pb-8 pt-0 flex justify-end">
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={cn(
              "w-full md:w-auto px-8 py-6 text-lg font-medium rounded-full",
              "bg-blue-600 hover:bg-blue-700 text-white transition-all"
            )}
          >
            {isSubmitting ? "제출 중..." : "신청하기"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}