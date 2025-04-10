"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
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

    const res = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("신청이 완료되었습니다.");
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
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label>Email</Label>
      <Input required name="email" value={form.email} onChange={handleChange} />

      <Label>성명</Label>
      <Input required name="name" value={form.name} onChange={handleChange} />

      <Label>업체명</Label>
      <Input name="company" value={form.company} onChange={handleChange} />

      <Label>연락처</Label>
      <Input required name="phone" value={form.phone} onChange={handleChange} />

      <Label>이용 희망 일정</Label>
      <Input type="date" name="date" value={form.date} onChange={handleChange} />

      <Label>이용 시간</Label>
      <Input name="duration" placeholder="예: 오후 2시 ~ 4시" value={form.duration} onChange={handleChange} />

      <Label>행사 장소</Label>
      <Input name="venue" value={form.venue} onChange={handleChange} />

      <Label>필요 언어</Label>
      <Input name="language" placeholder="예: 영어→한국어" value={form.language} onChange={handleChange} />

      <Label>스크린 송출 여부</Label>
      <Input name="screenOutput" placeholder="예 / 아니오" value={form.screenOutput} onChange={handleChange} />

      <Label>기타 문의 정보</Label>
      <Textarea name="additionalInfo" value={form.additionalInfo} onChange={handleChange} />

      <Button type="submit" className="mt-4">
        신청하기
      </Button>
    </form>
  );
}
