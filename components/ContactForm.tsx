"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CheckCircle2, Phone, Mail, Clock, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

const KNOC_API_URL = process.env.NEXT_PUBLIC_KNOC_API_URL || "https://dev.elnino.kr";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export default function ContactForm() {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", company: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = (): { isValid: boolean; message?: string } => {
    if (!form.name.trim()) return { isValid: false, message: t('contact.form.name') + " required" };
    if (!form.email.trim()) return { isValid: false, message: t('contact.form.email') + " required" };
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(form.email)) return { isValid: false, message: "Invalid email format" };
    if (!form.message.trim()) return { isValid: false, message: t('contact.form.message') + " required" };
    return { isValid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
      toast.error("Error", { description: validation.message });
      return;
    }

    setIsSubmitting(true);
    try {
      const inquiryData = {
        email: form.email,
        name: form.name,
        phone: form.phone || null,
        company: form.company || null,
        message: form.message,
      };

      const response = await fetch(`${KNOC_API_URL}/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryData)
      });

      const result = await response.json();

      if (result.status === 'success') {
        setIsSuccess(true);
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      let errorMessage = "Submission error occurred";
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = "Check your network connection";
        } else if (error.message) {
          errorMessage = error.message;
        }
      }
      toast.error("Error", { description: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-extrabold text-foreground font-heading mb-4">
          {t('contact.success.title')}
        </h2>
        <p className="text-lg text-slate-700 mb-8">
          {t('contact.success.description')}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-white bg-primary hover:bg-primary-dark transition-colors font-heading"
        >
          {t('contact.success.button')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Toaster richColors position="top-center" />

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-foreground font-heading mb-6">{t('contact.info.title')}</h3>
            <div className="space-y-5">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-foreground font-heading">{t('contact.info.phone')}</p>
                  <p className="text-slate-700 text-sm">{t('contact.info.phoneValue')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-foreground font-heading">{t('contact.info.email')}</p>
                  <p className="text-slate-700 text-sm">peteryoung0414@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-foreground font-heading">{t('contact.info.hours')}</p>
                  <p className="text-slate-700 text-sm">{t('contact.info.hoursValue')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-light p-6 rounded-lg border border-[#BAE6FD]">
            <h4 className="font-bold text-foreground font-heading mb-2 flex items-center">
              <Info className="h-4 w-4 mr-2 text-primary" />
              {t('contact.info.urgentTitle')}
            </h4>
            <p className="text-sm text-[#0C4A6E]">
              {t('contact.info.urgentDescription')}
            </p>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-border">
            {/* Row 1: Name, Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-foreground uppercase tracking-wider font-heading mb-2">
                  {t('contact.form.name')} <span className="text-[#EF4444]">{t('contact.form.required')}</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-background border-b-2 border-border py-3 px-4 focus:outline-none focus:border-primary transition-colors text-foreground placeholder-slate-400"
                  placeholder={t('contact.placeholders.name')}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-foreground uppercase tracking-wider font-heading mb-2">
                  {t('contact.form.email')} <span className="text-[#EF4444]">{t('contact.form.required')}</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-background border-b-2 border-border py-3 px-4 focus:outline-none focus:border-primary transition-colors text-foreground placeholder-slate-400"
                  placeholder={t('contact.placeholders.email')}
                />
              </div>
            </div>

            {/* Row 2: Phone, Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-foreground uppercase tracking-wider font-heading mb-2">
                  {t('contact.form.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-background border-b-2 border-border py-3 px-4 focus:outline-none focus:border-primary transition-colors text-foreground placeholder-slate-400"
                  placeholder={t('contact.placeholders.phone')}
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-xs font-bold text-foreground uppercase tracking-wider font-heading mb-2">
                  {t('contact.form.company')}
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full bg-background border-b-2 border-border py-3 px-4 focus:outline-none focus:border-primary transition-colors text-foreground placeholder-slate-400"
                  placeholder={t('contact.placeholders.company')}
                />
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="mb-10">
              <label htmlFor="message" className="block text-xs font-bold text-foreground uppercase tracking-wider font-heading mb-2">
                {t('contact.form.message')} <span className="text-[#EF4444]">{t('contact.form.required')}</span>
              </label>
              <textarea
                name="message"
                id="message"
                rows={7}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-background border-b-2 border-border py-3 px-4 focus:outline-none focus:border-primary transition-colors text-foreground placeholder-slate-400 resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex justify-center py-6 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold font-heading transition-colors",
                  isSubmitting
                    ? "bg-slate-400 cursor-not-allowed text-white"
                    : "bg-primary hover:bg-primary-dark text-white"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    {t('contact.form.submitting')}
                  </span>
                ) : (
                  t('contact.form.submit')
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
