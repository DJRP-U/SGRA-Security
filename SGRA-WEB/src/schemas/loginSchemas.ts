import { z } from "zod";

export const loginSchema = z.object({
    correo: z.string().min(1, "El correo electrónico es obligatorio").email("El correo electrónico no es válido"),
    contrasena: z.string().min(1, "La contraseña es obligatoria"),
})

export const recoveryPasswordSchema = z.object({
    email: z.string().min(1, "El correo electrónico es obligatorio").email("El correo electrónico no es válido"),
})
