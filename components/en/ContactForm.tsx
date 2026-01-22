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
    title: 'One-time Support',
    description: 'One-time events such as conferences and workshops',
    icon: '🎯'
  },
  {
    id: 'subscription',
    title: 'Subscription',
    description: 'Monthly/yearly subscription for organizations',
    icon: '🔄'
  }
];

// Purpose options for subscription
const PURPOSE_OPTIONS = ['Meeting', 'Education/Lecture', 'Presentation', 'International Collaboration', 'Workshop', 'Other'];

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
      { field: formData.email, name: "Email" },
      { field: formData.name, name: "Name" },
      { field: formData.phone, name: "Phone" },
    ];

    for (const { field, name } of requiredFields) {
      if (!field.trim()) {
        return { isValid: false, message: `Please enter your ${name}.` };
      }
    }

    // Email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      return { isValid: false, message: "Please enter a valid email address." };
    }

    return { isValid: true };
  };

  // Step 2 validation: Support type and related fields
  const validateStep2 = (formData: FormData): ValidationResult => {
    // Support type selection is required
    if (!formData.supportType) {
      return { isValid: false, message: "Please select a support type." };
    }

    // Validate based on support type
    if (formData.supportType === 'one-time') {
      const requiredFields = [
        { field: formData.startDate, name: "Event start date" },
        { field: formData.endDate, name: "Event end date" },
        { field: formData.venue, name: "Event venue" },
      ];

      for (const { field, name } of requiredFields) {
        if (!field.trim()) {
          return { isValid: false, message: `Please enter the ${name}.` };
        }
      }

      // Check if start date is before end date
      if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
        return { isValid: false, message: "End date must be after start date." };
      }

    } else if (formData.supportType === 'subscription') {
      if (!formData.institutionInfo.trim()) {
        return { isValid: false, message: "Please enter the institution details and subscription purpose." };
      }
    }

    return { isValid: true };
  };

  // Step 3 validation: Privacy agreement
  const validateStep3 = (privacyConsent: boolean): ValidationResult => {
    if (!privacyConsent) {
      return { isValid: false, message: "Please agree to the Privacy Policy." };
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
      toast.error("Please check your input", { description: validation.message });
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
      toast.error("Privacy Policy Agreement", { description: validation.message });
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
        // One-time support fields
        start_date: form.startDate || null,
        end_date: form.endDate || null,
        start_time: form.startTime || null,
        end_time: form.endTime || null,
        venue: form.venue || null,
        event_details: form.eventDetails || null,
        // Subscription fields
        purposes: form.purposes.length > 0 ? form.purposes : null,
        institution_info: form.institutionInfo || null,
        // Common
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
        toast.success("Application submitted successfully.", {
          description: "We will contact you shortly.",
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
        });

        // Reset form
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

      let errorMessage = "An error occurred while submitting your inquiry.";

      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = "Please check your network connection.";
        } else if (error.message) {
          errorMessage = error.message;
        }
      }

      toast.error("Submission Failed", {
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
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="flex flex-col">
                      <Label htmlFor="email" className="font-medium mb-1">Email <span className="text-red-500">*</span></Label>
                      <Input id="email" name="email" type="email" required placeholder="example@company.com" value={form.email} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                    {/* Name */}
                    <div className="flex flex-col">
                      <Label htmlFor="name" className="font-medium mb-1">Name <span className="text-red-500">*</span></Label>
                      <Input id="name" name="name" required placeholder="John Doe" value={form.name} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col">
                      <Label htmlFor="phone" className="font-medium mb-1">Phone <span className="text-red-500">*</span></Label>
                      <Input id="phone" name="phone" required placeholder="010-1234-5678" value={form.phone} onChange={handleChange} className="h-12 placeholder-gray-400" />
                    </div>
                    {/* Company */}
                    <div className="flex flex-col">
                      <Label htmlFor="company" className="font-medium mb-1">Company</Label>
                      <Input id="company" name="company" placeholder="Company Inc." value={form.company} onChange={handleChange} className="h-12 placeholder-gray-400" />
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
                        Next
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
                    Support Information
                  </h2>

                  {/* Support Type Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Select Support Type</h3>
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
                            <Label htmlFor="startDate" className="font-medium mb-1">Event Start Date <span className="text-red-500">*</span></Label>
                            <Input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} className="h-12" />
                          </div>
                          <div>
                            <Label htmlFor="endDate" className="font-medium mb-1">Event End Date <span className="text-red-500">*</span></Label>
                            <Input id="endDate" name="endDate" type="date" value={form.endDate} onChange={handleChange} className="h-12" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startTime" className="font-medium mb-1">Start Time</Label>
                            <Input id="startTime" name="startTime" type="time" value={form.startTime} onChange={handleChange} className="h-12" />
                          </div>
                          <div>
                            <Label htmlFor="endTime" className="font-medium mb-1">End Time</Label>
                            <Input id="endTime" name="endTime" type="time" value={form.endTime} onChange={handleChange} className="h-12" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="venue" className="font-medium mb-1">Event Venue <span className="text-red-500">*</span></Label>
                          <Input id="venue" name="venue" placeholder="COEX Convention Center, Seoul" value={form.venue} onChange={handleChange} className="h-12" />
                        </div>

                        <div>
                          <Label htmlFor="eventDetails" className="font-medium mb-1">Event Details</Label>
                          <Textarea
                            id="eventDetails"
                            name="eventDetails"
                            placeholder="Please describe the purpose of the event, how it will be conducted, and any support requirements."
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
                          <Label className="font-medium mb-3 block">Primary Usage Purpose</Label>
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
                          <Label htmlFor="institutionInfo" className="font-medium mb-1">Institution Details & Subscription Purpose <span className="text-red-500">*</span></Label>
                          <Textarea
                            id="institutionInfo"
                            name="institutionInfo"
                            placeholder="Please describe your institution and the goals you want to achieve through the subscription service. Include expected usage scale or any special requirements."
                            value={form.institutionInfo}
                            onChange={handleChange}
                            className="min-h-[120px] max-h-[120px] resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {!form.supportType && (
                      <div className="text-center py-8 text-gray-500">
                        Please select a support type above
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
                        Previous
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
                        Next
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
                    Additional Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <Label htmlFor="additionalInfo" className="font-medium mb-2.5">Other Inquiries</Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        placeholder="Please enter any special requests or additional information you would like to share."
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
                          Privacy Policy Agreement <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-500">
                          The collected personal information will only be used for service provision purposes and will not be used for other purposes or provided to third parties.{" "}
                          <a href="/en/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
                            View full policy
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
                        Previous
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
                        {isSubmitting ? "Submitting..." : "Submit"}
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
