import { SprintStatus } from "@/enums/sprintEnum"

export type SprintDTO = {
    uuid: string
    nombre: string
    fecha_inicio: Date
    fecha_fin: Date
    objetivo: string
    estado: SprintStatus
}

export type CreateSprintDTO = {
    nombre: string
    fecha_inicio: Date
    fecha_fin: Date
    objetivo: string
    uuid_proyecto: string
}

export type UpdateSprintDTO = {
    nombre: string
    fecha_inicio: Date
    fecha_fin: Date
    objetivo: string
}

export type ChangeSprintStatusDTO = {
    estado: SprintStatus;
}