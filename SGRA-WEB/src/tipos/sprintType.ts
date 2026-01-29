import { assignSprintSchema, sprintSchema } from "@/schemas/sprintSchema";
import { z } from "zod";

export type SprintFormData = z.infer<typeof sprintSchema>;
export type AssignSprintFormData = z.infer<typeof assignSprintSchema>