import { changeStatusUserStorySchema, userStorySchema } from "@/schemas/useStorySchema";
import z from "zod";

export type UserStoryFormData = z.infer<typeof userStorySchema>;

export type ChangeStatusUserStoryFormData = z.infer<typeof changeStatusUserStorySchema>; 