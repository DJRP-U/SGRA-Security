import { bugSchema, changeStatusBugSchema } from "@/schemas/bugSchema";
import z from "zod";

export type BugFormData = z.infer<typeof bugSchema>;
export type ChangeStatusBugFormData = z.infer<typeof changeStatusBugSchema>;