import { taskStepOneSchema, taskStepTwoSchema, changeStatusTaskSchema, reviewCommentSchema } from "@/schemas/taskSchema";
import { z } from "zod";

export type TaskStepOneFormData = z.infer<typeof taskStepOneSchema>;
export type TaskStepTwoFormData = z.infer<typeof taskStepTwoSchema>;
export type ChangeStatusTaskFormData = z.infer<typeof changeStatusTaskSchema>;

export type TaskFormData = TaskStepOneFormData & TaskStepTwoFormData;
export type ReviewCommentFormData = z.infer<typeof reviewCommentSchema>;