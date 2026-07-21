"use client";

import { useState, useCallback } from "react";

export interface ValidationRule<T> {
  step: number;
  validate: (data: T) => Record<string, string>;
}

export interface UseMultiStepFormOptions<T> {
  initialData: T;
  totalSteps: number;
  validationRules?: ValidationRule<T>[];
}

export function useMultiStepForm<T extends Record<string, any>>({
  initialData,
  totalSteps,
  validationRules = [],
}: UseMultiStepFormOptions<T>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update field value in form state
  const updateField = useCallback((field: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for edited field
    setErrors((prev) => {
      if (!prev[field as string]) return prev;
      const updated = { ...prev };
      delete updated[field as string];
      return updated;
    });
  }, []);

  // Validate fields for current active step
  const validateStep = useCallback(
    (step: number): boolean => {
      const rule = validationRules.find((r) => r.step === step);
      if (!rule) {
        setErrors({});
        return true;
      }

      const stepErrors = rule.validate(formData);
      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    },
    [formData, validationRules]
  );

  // Advance to next step (validates mandatory fields first)
  const nextStep = useCallback(() => {
    const isValid = validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps, validateStep]);

  // Safely return to previous step (preserves entered data without clearing)
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setErrors({}); // Clear validation error popups when moving backward
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // Jump to specific step
  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        // Only allow going forward if current step is valid
        if (step > currentStep && !validateStep(currentStep)) return;
        setErrors({});
        setCurrentStep(step);
      }
    },
    [currentStep, totalSteps, validateStep]
  );

  return {
    currentStep,
    totalSteps,
    formData,
    errors,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    isSubmitted,
    setIsSubmitted,
  };
}
