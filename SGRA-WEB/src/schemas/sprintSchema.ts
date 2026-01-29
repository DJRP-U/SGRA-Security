import { z } from "zod";

export const sprintSchema = z.object({
    nombre: z
        .string()
        .min(1, "El nombre es obligatorio")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "Máximo 100 caracteres"),

    fecha_inicio: z
        .string()
        .min(1, "La fecha inicio es obligatoria")
        .refine(
            (value) => !value || !Number.isNaN(Date.parse(value)),
            { message: "Fecha de inicio inválida" }
        ),

    fecha_fin: z
        .string()
        .min(1, "La fecha de finalización es obligatoria")
        .refine(
            (value) => !value || !Number.isNaN(Date.parse(value)),
            { message: "Fecha de finalización inválida" }
        ),

    objetivo: z
        .string()
        .min(1, "El objetivo es obligatorio")
        .min(10, "El objetivo debe tener al menos 10 caracteres")
        .max(100, "Máximo 100 caracteres"),
})
    .superRefine((data, ctx) => {
        if (data.fecha_inicio && data.fecha_fin) {
            const inicio = new Date(data.fecha_inicio);
            const fin = new Date(data.fecha_fin);

            if (fin <= inicio) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["fecha_fin"],
                    message: "La fecha de finalización debe ser posterior a la fecha de inicio",
                });
            }
        }
    });


export const assignSprintSchema = z.object({
    sprint: z
        .string()
        .min(1, "La selección del sprint es obligatoria")
});
