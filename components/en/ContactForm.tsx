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
const WEB3FORMS_ACCESS_KEY = "ffaed6ff-0f74-45a2-bf4c-edd6107d3078";

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

// Form data interface - Unified for all support types
interface FormData {
  // Step 1: Common fields
  name: string;
  email: string;
  phone: string;
  company: string;
  supportType: 'one-time' | 'subscription' | null;
  // Step 2: Conditional fields based on supportType
  eventDate?: string;
  eventName?: string;
  eventLocation?: string;
  participantCount?: string;
  targetLanguages?: string;
  expectedUsers?: string;
  usagePurpose?: string[];
  monthlyUsageFrequency?: string;
  // Step 3: Common field
  additionalRequests: string;
}

// Phone number formatter function
function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/[^\d]/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
}

// Common validation functions
const validateName = (name: string): ValidationResult => {
  if (!name.trim()) return { isValid: false, message: "Please enter your name." };
  if (name.trim().length < 2) return { isValid: false, message: "Name must be at least 2 characters." };
  return { isValid: true };
};

const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) return { isValid: false, message: "Please enter your email." };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { isValid: false, message: "Please enter a valid email address." };
  return { isValid: true };
};

const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) return { isValid: false, message: "Please enter your phone number." };
  const phoneNumbers = phone.replace(/[^\d]/g, '');
  if (phoneNumbers.length < 10) return { isValid: false, message: "Please enter a valid phone number." };
  return { isValid: true };
};

const validateCompany = (company: string): ValidationResult => {
  if (!company.trim()) return { isValid: false, message: "Please enter your company/organization name." };
  return { isValid: true };
};

const validateSupportType = (supportType: FormData['supportType']): ValidationResult => {
  if (!supportType) return { isValid: false, message: "Please select a support type." };
  return { isValid: true };
};

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    supportType: null,
    eventDate: '',
    eventName: '',
    eventLocation: '',
    participantCount: '',
    targetLanguages: '',
    expectedUsers: '',
    usagePurpose: [],
    monthlyUsageFrequency: '',
    additionalRequests: ''
  });

  // Input update handler with phone number formatting
  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    if (field === 'phone' && typeof value === 'string') {
      setFormData(prev => ({ ...prev, [field]: formatPhoneNumber(value) }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Purpose checkbox handler
  const handlePurposeToggle = (purpose: string) => {
    setFormData(prev => ({
      ...prev,
      usagePurpose: prev.usagePurpose?.includes(purpose)
        ? prev.usagePurpose.filter(p => p !== purpose)
        : [...(prev.usagePurpose || []), purpose]
    }));
  };

  // Step validation
  const validateStep = (step: number): ValidationResult => {
    switch (step) {
      case 1:
        const nameValidation = validateName(formData.name);
        if (!nameValidation.isValid) return nameValidation;
        
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.isValid) return emailValidation;
        
        const phoneValidation = validatePhone(formData.phone);
        if (!phoneValidation.isValid) return phoneValidation;
        
        const companyValidation = validateCompany(formData.company);
        if (!companyValidation.isValid) return companyValidation;
        
        const supportTypeValidation = validateSupportType(formData.supportType);
        if (!supportTypeValidation.isValid) return supportTypeValidation;
        
        return { isValid: true };

      case 2:
        if (formData.supportType === 'one-time') {
          if (!formData.eventDate) return { isValid: false, message: "Please select an event date." };
          const selectedDate = new Date(formData.eventDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) return { isValid: false, message: "Event date cannot be in the past." };
          if (!formData.eventName?.trim()) return { isValid: false, message: "Please enter the event name." };
          if (!formData.eventLocation?.trim()) return { isValid: false, message: "Please enter the event location." };
          if (!formData.participantCount || parseInt(formData.participantCount) < 1) 
            return { isValid: false, message: "Please enter the number of participants." };
          if (!formData.targetLanguages?.trim()) return { isValid: false, message: "Please enter the target languages." };
        } else if (formData.supportType === 'subscription') {
          if (!formData.expectedUsers || parseInt(formData.expectedUsers) < 1)
            return { isValid: false, message: "Please enter the expected number of users." };
          if (!formData.usagePurpose || formData.usagePurpose.length === 0)
            return { isValid: false, message: "Please select at least one usage purpose." };
          if (!formData.monthlyUsageFrequency) 
            return { isValid: false, message: "Please select the monthly usage frequency." };
        }
        return { isValid: true };

      case 3:
        return { isValid: true };

      default:
        return { isValid: false, message: "Invalid step" };
    }
  };

  // Step navigation
  const handleNext = () => {
    const validation = validateStep(currentStep);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Prepare form data for Web3Forms
      const submissionData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        ...formData,
        usagePurpose: formData.usagePurpose?.join(', '),
        submitted_at: new Date().toISOString()
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Application submitted successfully! We will contact you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          supportType: null,
          eventDate: '',
          eventName: '',
          eventLocation: '',
          participantCount: '',
          targetLanguages: '',
          expectedUsers: '',
          usagePurpose: [],
          monthlyUsageFrequency: '',
          additionalRequests: ''
        });
        setCurrentStep(1);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress percentage calculation
  const progressPercentage = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-center" richColors />
      
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 md:p-10 shadow-2xl border-0 bg-white/95 backdrop-blur">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Form steps */}
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Information & Support Type Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Basic Information
                  </h2>
                  <p className="text-gray-600">
                    Please provide your basic information and select the support type you need.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="010-1234-5678"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company/Organization *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Enter your company or organization name"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Support Type Selection */}
                <div className="space-y-3">
                  <Label>Support Type *</Label>
                  <div className="grid gap-3">
                    {SUPPORT_TYPES.map((type) => (
                      <motion.div
                        key={type.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <button
                          type="button"
                          onClick={() => handleInputChange('supportType', type.id)}
                          className={cn(
                            "w-full p-4 rounded-lg border-2 transition-all text-left",
                            formData.supportType === type.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{type.icon}</span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {type.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {type.description}
                              </p>
                            </div>
                            {formData.supportType === type.id && (
                              <CheckCircle2 className="w-5 h-5 text-blue-500 mt-1" />
                            )}
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleNext} size="lg">
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Detailed Information (conditional based on support type) */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {formData.supportType === 'one-time' ? 'Event Details' : 'Usage Details'}
                  </h2>
                  <p className="text-gray-600">
                    {formData.supportType === 'one-time' 
                      ? 'Please provide information about your event.'
                      : 'Please provide information about your expected usage.'}
                  </p>
                </div>

                {formData.supportType === 'one-time' ? (
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="eventDate">Event Date *</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => handleInputChange('eventDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="eventName">Event Name *</Label>
                      <Input
                        id="eventName"
                        value={formData.eventName}
                        onChange={(e) => handleInputChange('eventName', e.target.value)}
                        placeholder="e.g., International Business Conference 2025"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="eventLocation">Event Location *</Label>
                      <Input
                        id="eventLocation"
                        value={formData.eventLocation}
                        onChange={(e) => handleInputChange('eventLocation', e.target.value)}
                        placeholder="e.g., COEX Convention Center, Seoul"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="participantCount">Number of Participants *</Label>
                      <Input
                        id="participantCount"
                        type="number"
                        min="1"
                        value={formData.participantCount}
                        onChange={(e) => handleInputChange('participantCount', e.target.value)}
                        placeholder="Expected number of participants"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="targetLanguages">Target Languages *</Label>
                      <Input
                        id="targetLanguages"
                        value={formData.targetLanguages}
                        onChange={(e) => handleInputChange('targetLanguages', e.target.value)}
                        placeholder="e.g., Korean, English, Chinese, Japanese"
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Please list all languages you need for interpretation
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="expectedUsers">Expected Number of Users *</Label>
                      <Input
                        id="expectedUsers"
                        type="number"
                        min="1"
                        value={formData.expectedUsers}
                        onChange={(e) => handleInputChange('expectedUsers', e.target.value)}
                        placeholder="Number of users who will use the service"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Usage Purpose * (Select all that apply)</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {PURPOSE_OPTIONS.map((purpose) => (
                          <div key={purpose} className="flex items-center space-x-2">
                            <Checkbox
                              id={purpose}
                              checked={formData.usagePurpose?.includes(purpose) || false}
                              onCheckedChange={() => handlePurposeToggle(purpose)}
                            />
                            <Label
                              htmlFor={purpose}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {purpose}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="monthlyUsageFrequency">Monthly Usage Frequency *</Label>
                      <select
                        id="monthlyUsageFrequency"
                        value={formData.monthlyUsageFrequency}
                        onChange={(e) => handleInputChange('monthlyUsageFrequency', e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select frequency</option>
                        <option value="1-5">1-5 times</option>
                        <option value="6-10">6-10 times</option>
                        <option value="11-20">11-20 times</option>
                        <option value="21+">21+ times</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button onClick={handlePrev} variant="outline" size="lg">
                    Previous
                  </Button>
                  <Button onClick={handleNext} size="lg">
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Additional Requests */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Additional Requests
                  </h2>
                  <p className="text-gray-600">
                    Please let us know if you have any additional requirements or questions.
                  </p>
                </div>

                <div>
                  <Label htmlFor="additionalRequests">Additional Requests (Optional)</Label>
                  <Textarea
                    id="additionalRequests"
                    value={formData.additionalRequests}
                    onChange={(e) => handleInputChange('additionalRequests', e.target.value)}
                    placeholder="Please share any specific requirements, questions, or additional information..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Application Summary</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Name:</dt>
                      <dd className="font-medium">{formData.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Company:</dt>
                      <dd className="font-medium">{formData.company}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Support Type:</dt>
                      <dd className="font-medium">
                        {SUPPORT_TYPES.find(t => t.id === formData.supportType)?.title}
                      </dd>
                    </div>
                    {formData.supportType === 'one-time' && (
                      <>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Event Date:</dt>
                          <dd className="font-medium">{formData.eventDate}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Participants:</dt>
                          <dd className="font-medium">{formData.participantCount}</dd>
                        </div>
                      </>
                    )}
                    {formData.supportType === 'subscription' && (
                      <>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Expected Users:</dt>
                          <dd className="font-medium">{formData.expectedUsers}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Monthly Usage:</dt>
                          <dd className="font-medium">{formData.monthlyUsageFrequency} times</dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>

                <div className="flex justify-between pt-4">
                  <Button onClick={handlePrev} variant="outline" size="lg">
                    Previous
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}