import { z } from "zod";

export const requestAccountSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio").max(30, "Maximo 30 caracteres"),
    apellido: z.string().min(1, "El apellido es obligatorio").max(30, "Maximo 30 caracteres"),
    correo: z.string().min(1, "El correo electrónico es obligatorio").email("Correo no válido"),
    contrasena: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
        .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
    contrasenaConfirmacion: z.string().min(1, "Debes confirmar tu contraseña"),
}).refine((data) => data.contrasena === data.contrasenaConfirmacion, {
    message: "Las contraseñas deben coincidir",
    path: ["contrasenaConfirmacion"],
});
