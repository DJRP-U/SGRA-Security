import { requestAccountSchema } from "@/schemas/requestAccountSchemas";
import z from "zod";

export type RequestAccountFormData = z.infer<typeof requestAccountSchema>;