import { z } from "zod";

export const requirementStepOneSchema = z.object({
    nombre: z
        .string()
        .min(1, "El nombre es obligatório")
        .min(5, "El nombre debe tener mínimo 5 caracteres"),
    descripcion: z
        .string()
        .min(1, "La descripción es obligatoria"),
    tipo_requisito: z
        .string()
        .min(1, "Debe seleccionar un tipo de requisito"),
    prioridad: z
        .string()
        .min(1, "Debe seleccionar una prioridad"),
});

export const requirementStepTwoSchema = z.object({
    metodo_verificacion: z
        .string()
        .min(1, "El método de verificación es obligatorio"),
    categoria: z
        .string()
        .min(1, "La categoría es obligatoria"),
    fuente: z
        .string()
        .optional(),
    horas_esfuerzo_estimado: z
        .string()
        .optional()
        .refine((val) => {
            if (!val) return true;
            const num = Number(val);
            return (
                !isNaN(num) &&
                Number.isInteger(num) &&
                num >= 1 &&
                num <= 40
            );
        }, {
            message:
                "El máximo de horas estimadas permitido es de 40 horas.",
        }),
    riesgo: z
        .string()
        .min(1, "El riesgo es obligatorio"),
    comentarios: z
        .string()
        .optional(),
});


export const deprecateRequirementSchema = z
    .object({
        action: z.enum(["APPROVE", "REJECT", "OBSOLETE"]),
        reason: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.action !== "APPROVE" && !data.reason?.trim()) {
            ctx.addIssue({
                path: ["reason"],
                message: "El motivo es obligatorio para esta acción",
                code: z.ZodIssueCode.custom,
            });
        }
    });
