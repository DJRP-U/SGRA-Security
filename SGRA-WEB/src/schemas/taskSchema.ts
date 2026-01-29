import { z } from "zod";

export const taskStepOneSchema = z.object({
    titulo: z
        .string()
        .min(1, "El título es obligatorio")
        .max(100, "Máximo 100 caracteres"),
    descripcion: z
        .string()
        .min(1, "La descripción es obligatoria"),
    tipo_tarea: z
        .string()
        .min(1, "El tipo de tarea es obligatorio"),
    prioridad: z
        .string()
        .min(1, "La prioridad es obligatorio"),
});


export const taskStepTwoSchema = z.object({
    criterios_entrada: z
        .string()
        .min(1, "Los criterios de entrada son obligatorios"),

    criterios_salida: z
        .string()
        .min(1, "Los criterios de salida son obligatorios"),

    fecha_limite: z
        .string()
        .min(1, "La fecha límite es requerida")
        .refine(
            (value) => {
                if (!value) return false;
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today;
            },
            { message: "La fecha límite no puede ser anterior a la fecha actual" }
        ),
    estimacion: z
        .string()
        .min(1, "La estimación es obligatoria")
        .max(3, "Máximo 3 caracteres"),
});

export const changeStatusTaskSchema = z.object({
    nuevo_estado: z
        .string()
        .min(1, "El estado es obligatorio")
})

export const reviewCommentSchema = z.object({
    comment: z
        .string()
        .min(1, "El comentario es obligatorio")
        .trim(),
});
