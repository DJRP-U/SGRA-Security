import { z } from "zod";

export const projectSchema = z.object({
    codigo: z.string().min(1, "El código es obligatorio").max(50, "Máximo 50 caracteres"),
    nombre: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
    descripcion: z.string().max(255, "Máximo 255 caracteres").optional().or(z.literal("")),
    fecha_inicio: z.string().optional().refine(
        (value) => !value || !Number.isNaN(Date.parse(value)),
        { message: "Fecha de inicio inválida" }
    ),
    fecha_fin: z.string().optional().refine(
        (value) => !value || !Number.isNaN(Date.parse(value)),
        { message: "Fecha de fin inválida" }
    ),
    tipo: z.string().min(1, "Tipo de proyecto requerido"),
})
    .superRefine((data, ctx) => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (data.fecha_inicio) {
            const inicio = new Date(data.fecha_inicio);
            inicio.setHours(0, 0, 0, 0);
            if (inicio < hoy) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["fecha_inicio"],
                    message: "La fecha de inicio no puede ser anterior a hoy",
                });
            }
        }

        if (data.fecha_fin && !data.fecha_inicio) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["fecha_fin"],
                message: "No puedes definir una fecha fin sin una fecha de inicio",
            });
            return;
        }

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


export const roleProjectSchema = z.object({
    nombre: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(100, "Máximo 100 caracteres"),
    descripcion: z
        .string()
        .min(1, "La descripción es obligatoria")
        .max(255, "Máximo 255 caracteres")
})

export const changeRoleUserProjectSchema = z.object({
    rol: z.string().min(1, "El rol es obligatorio")
});