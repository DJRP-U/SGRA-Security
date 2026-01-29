import { Priority } from "@/enums/baseEnum"
import { RequirementCategory, RequirementRisk, RequirementStatus, RequirementType, RequirementVerificationMethod } from "@/enums/requirementEnum"

export type CreateRequirementDTO = {
    proyecto_uuid: string
    nombre: string
    descripcion: string
    tipo_requisito: RequirementType
    prioridad: Priority
    fuente?: string
    metodo_verificacion?: string
    categoria?: string
    horas_esfuerzo_estimado?: number
    riesgo?: string
    comentarios?: string
}

export type UpdateRequirementDTO = {
    requisito_uuid: string
    nombre: string
    descripcion: string
    tipo_requisito: RequirementType
    prioridad: Priority
    fuente?: string
    metodo_verificacion?: string
    categoria?: string
    horas_esfuerzo_estimado?: number
    riesgo?: string
    comentarios?: string
}

export type RequirementChangeStatusDTO = {
    requisito_uuid: string
    nuevo_estado: RequirementStatus
    razon_obsoleto?: string
}

export type RequirementDTO = {
    uuid: string
    identificador: string
    versionActual: number
    nombre: string
    descripcion: string
    fecha_creacion: Date
    fecha_ultima_modificacion: Date
    tipo: RequirementType
    prioridad: Priority
    estado: RequirementStatus
    fuente: string
    metodo_verificacion: RequirementVerificationMethod
    categoria: RequirementCategory
    horas_esfuerzo_estimado: number
    riesgo: RequirementRisk
    comentarios: string
    motivo_rechazo?: string
    razon_obsoleto?: string
}

export type ApproveOrRejectRequirementDTO = {
    requisito_uuid: string;
    aprobar: boolean;
    motivo_rechazo?: string;
};
