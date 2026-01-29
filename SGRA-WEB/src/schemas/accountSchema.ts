import { z } from "zod";

export const changeRoleAccountSchema = z.object({
    role: z.string().min(1, "El rol es obligatorio"),
});

