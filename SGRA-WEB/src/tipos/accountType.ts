import z from "zod";
import { recoveryPasswordSchema } from "@/schemas/loginSchemas";
import { changeRoleAccountSchema } from "@/schemas/accountSchema";

export type ChangeRoleAccountFormData = z.infer<typeof changeRoleAccountSchema>;

export type recoveryPasswordFormData = z.infer<typeof recoveryPasswordSchema>;
