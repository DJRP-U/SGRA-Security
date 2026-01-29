"use client";
import { useState } from "react";
import { TaskFormData, TaskStepOneFormData, TaskStepTwoFormData } from "@/tipos/taskType";
import TaskStepOneForm from "./form-steps/task/TaskStepOneForm";
import TaskStepTwoForm from "./form-steps/task/TaskStepTwoForm";

interface TaskFormProps {
    onSubmit: (data: TaskFormData) => void;
    onCancel: () => void;
    defaultValues?: Partial<TaskFormData>;
    textButton: string;
    edition?: boolean;
    isSubmitting?: boolean; // Nueva prop agregada
}

export default function TaskForm({
    onSubmit,
    onCancel,
    defaultValues,
    textButton,
    edition = false,
    isSubmitting = false, // Valor por defecto
}: TaskFormProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [stepOneData, setStepOneData] = useState<TaskStepOneFormData | null>(null);
    const [stepTwoData, setStepTwoData] = useState<TaskStepTwoFormData | null>(null);

    const handleNext = (data: TaskStepOneFormData) => {
        setStepOneData(data);
        setStep(2);
    };

    const handleSaveDirect = (data: TaskStepOneFormData) => {
        onSubmit({
            ...(defaultValues as TaskFormData),
            ...data
        });
    };

    return (
        <>
            {step === 1 && (
                <TaskStepOneForm
                    edition={edition}
                    textButton={textButton}
                    defaultValues={stepOneData ?? defaultValues}
                    onCancel={onCancel}
                    onNext={handleNext}
                    onSaveDirect={handleSaveDirect}
                    isSubmitting={isSubmitting} // Pasamos el loading al paso 1
                />
            )}

            {step === 2 && (
                <TaskStepTwoForm
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
                        onSubmit({ ...stepOneData, ...data } as TaskFormData);
                    }}
                    isSubmitting={isSubmitting} // Pasamos el loading al paso 2
                />
            )}
        </>
    );
}