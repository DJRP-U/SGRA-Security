import { Priority } from "@/enums/baseEnum";
import { BugSeverity, BugStatus, BugType } from "@/enums/bugEnum"

export type CreateBugDTO = {
    titulo: string
    descripcion_detallada: string
    foto: string
    tipo_defecto: BugType
    prioridad: Priority
    severidad: BugSeverity
    fecha_limite: Date
    historia_usuario_uuid: string
};

export type UpdateBugDTO = {
    titulo?: string
    descripcion_detallada?: string
    foto?: string
    tipo_defecto?: BugType
    prioridad?: Priority
    severidad?: BugSeverity
    fecha_limite?: Date
};

export type ChangeStatusBugDTO = {
    estado: BugStatus
    comentario?: string
}

export type BugDTO = {
    uuid: string
    titulo: string
    descripcion_detallada: string
    foto: string
    severidad: BugSeverity
    tipo_defecto: BugType
    prioridad: Priority
    codigo: string
    estado: BugStatus
    fecha_creacion: string
    fecha_limite: string
}


export interface AssignResponsibleDTO {
    cuenta_proyecto_uuid: string;
}