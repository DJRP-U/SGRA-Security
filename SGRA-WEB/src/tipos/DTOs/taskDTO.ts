import { Priority } from "@/enums/baseEnum"
import { TaskStatus } from "@/enums/taskEnum"

type TaskBase = {
    titulo: string
    descripcion: string
    criterios_entrada: string
    criterios_salida: string
    fecha_limite: Date
    tipo_tarea: string
    estimacion_horas: number
    prioridad: Priority
    cuenta_proyecto_uuid: string
}

export type TaskDTO = TaskBase & {
    uuid: string
    estado: TaskStatus
    identificador: string
    comentario_para_ajustes?: string
    historia_usuario: {
        uuid: string
        identificador: string
        titulo: string
    }
    responsable: {
        nombre: string
        apellido: string
        uuid_cuenta_proyecto: string
    }
    responsable_nombre_completo?: string
}


export type CreateTaskDTO = TaskBase & {
    historia_usuario_uuid: string
}

export type UpdateTaskDTO = {
    titulo?: string
    descripcion?: string
    criterios_entrada?: string
    criterios_salida?: string
    fecha_limite?: Date
    tipo_tarea?: string
    estimacion_horas?: number
    prioridad?: Priority
    cuenta_proyecto_uuid?: string
    responsable_cambio_uuid: string
};

export type ChangeStatusTaskDTO = {
    nuevo_estado: TaskStatus
    responsable_cambio_uuid: string
}

export interface ReviewTaskDTO {
    aprobado: boolean;
    comentario?: string;
    responsable_cambio_uuid: string;
}
