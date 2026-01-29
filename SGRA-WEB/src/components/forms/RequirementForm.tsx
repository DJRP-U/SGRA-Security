"use client";
import { RequirementFormData, RequirementStepOneFormData, RequirementStepTwoFormData } from "@/tipos/requirementType";
import { useState } from "react";
import RequirementStepOneForm from "./form-steps/requirement/RequirementStepOneForm";
import RequirementStepTwoForm from "./form-steps/requirement/RequirementStepTwoForm";

interface RequirementFormProps {
    onSubmit: (data: RequirementFormData) => void
    onCancel: () => void
    defaultValues?: Partial<RequirementFormData>
    textButton: string
    edition?: boolean
    isSubmitting?: boolean
}

export default function RequirementForm({
    onSubmit,
    onCancel,
    defaultValues,
    textButton,
    edition = false,
    isSubmitting = false
}: RequirementFormProps) {

    const [step, setStep] = useState<1 | 2>(1);
    const [stepOneData, setStepOneData] = useState<RequirementStepOneFormData | null>(null);
    const [stepTwoData, setStepTwoData] = useState<RequirementStepTwoFormData | null>(null);

    const handleNext = (data: RequirementStepOneFormData) => {
        setStepOneData(data);
        setStep(2);
    };

    const handleSaveDirect = (data: RequirementStepOneFormData) => {
        onSubmit({
            ...(defaultValues as RequirementFormData),
            ...data
        });
    };

    return (
        <>
            {step === 1 && (
                <RequirementStepOneForm
                    edition={edition}
                    textButton={textButton}
                    defaultValues={stepOneData ?? defaultValues}
                    onCancel={onCancel}
                    onNext={handleNext}
                    onSaveDirect={handleSaveDirect}
                    isSubmitting={isSubmitting}
                />
            )}

            {step === 2 && (
                <RequirementStepTwoForm
                    textButton={textButton}
                    defaultValues={{
                        ...defaultValues,
                        ...stepOneData,
                        ...stepTwoData,
                    }}
                    onBack={(data) => {
                        setStepTwoData(data);
                        setStep(1);
                    }}
                    onCancel={onCancel}
                    onSubmit={(data) => {
                        onSubmit({ ...stepOneData, ...data } as RequirementFormData);
                    }}
                    isSubmitting={isSubmitting}
                />
            )}
        </>
    );
}