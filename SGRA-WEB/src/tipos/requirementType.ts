import { requirementStepOneSchema, requirementStepTwoSchema } from "@/schemas/requirementSchema";
import z from "zod";

export type RequirementAction = "APPROVE" | "REJECT" | "OBSOLETE";

export type RequirementStepOneFormData = z.infer<typeof requirementStepOneSchema>;

export type RequirementStepTwoFormData = z.infer<typeof requirementStepTwoSchema>;

export type RequirementFormData = RequirementStepOneFormData & RequirementStepTwoFormData;

export type deprecateRequirementFormData = {
    action: RequirementAction;
    reason?: string;
}
