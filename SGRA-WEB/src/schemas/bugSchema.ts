import { z } from "zod";

export const bugSchema = z.object({
    titulo: z
        .string()
        .min(1, "El título es obligatorio")
        .max(100, "Máximo 100 caracteres"),
    descripcion_detallada: z
        .string()
        .min(1, "La descripción detallada es obligatoria"),
    foto: z
        .string()
        .min(1, "La foto es obligatoria")
        .url("Debe ser una URL válida que empiece con http:// o https://")
        .regex(
            /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i,
            "El enlace debe apuntar a un archivo de imagen (.jpg, .png, etc.)"
        ),
    tipo_defecto: z
        .string()
        .min(1, "El tipo de defecto es obligatorio"),
    prioridad: z
        .string()
        .min(1, "La prioridad es obligatoria"),
    severidad: z
        .string()
        .min(1, "La severidad es obligatoria"),
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
});

export const changeStatusBugSchema = z.object({
    estado: z
        .string()
        .min(1, "El titulo es obligatorio")
})