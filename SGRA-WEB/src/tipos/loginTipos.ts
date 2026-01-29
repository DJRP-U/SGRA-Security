import z from "zod";
import { loginSchema, recoveryPasswordSchema } from "@/schemas/loginSchemas";

export type LoginFormData = z.infer<typeof loginSchema>;

export type recoveryPasswordFormData = z.infer<typeof recoveryPasswordSchema>;

export type Cuenta = {
    uuid: string
    token: string
};
