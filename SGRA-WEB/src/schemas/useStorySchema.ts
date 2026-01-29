import { z } from "zod";

export const userStorySchema = z.object({
    titulo: z.string()
        .min(1, "El titulo es obligatório")
        .refine(val => val.length > 10, {
            message: "El titulo debe tener al menos 10 caracteres",
        }),
    descripcion: z.string()
        .min(1, "La descripción es obligatória")
        .refine(val => val.length > 60, {
            message: "La descripción tener al menos 60 caracteres",
        }),
    prioridad: z.string().min(1, "La prioridad es obligatório"),
    criterios_aceptacion: z.string().min(1, "Los criterios de aceptación son obligatórios"),
    estimacion: z
        .string()
        .min(1, "La estimación es obligatória")
        .refine((val) => /^\d+$/.test(val), {
            message: "La estimación debe ser un número entero",
        })
})

export const changeStatusUserStorySchema = z.object({
    status: z.string().min(1, "Debes selecciona un estado")
});