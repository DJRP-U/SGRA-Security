import { ProjectCurrentStatus, ProjectStatus, ProjectType } from "@/enums/projectEnum"

export type CreateProjectDTO = {
    codigo: string
    nombre: string
    descripcion?: string
    fecha_inicio?: Date | null
    fecha_fin?: Date | null
    tipo: ProjectType
    uuid_usuario: string
}

export type UpdateProjectDTO = {
    codigo: string
    nombre: string
    descripcion?: string
    fecha_inicio?: Date | null
    fecha_fin?: Date | null
    tipo: ProjectType
}

export type ProjectDTO = {
    uuid: string
    codigo: string
    nombre: string
    descripcion: string
    fecha_inicio: Date | null
    fecha_fin: Date | null
    tipo: ProjectType
    id: number
    version_actual: number
    estado: ProjectStatus
    estado_actual: ProjectCurrentStatus
};

export type AddUserDTO = {
    uuid_proyecto: string;
    uuid_usuario: string;
};

export type TeamProjectDTO = {
    uuid: string
    cuenta_uuid: string
    correo: string
    nombre: string
    apellido: string
    rol_uuid?: string
    rol_nombre?: string
    permisos: any
}

export type ChangeRoleUserProjectDTO = {
    cuenta_uuid: string
    rol_proyecto_uuid: string
    proyecto_uuid: string
}

export type RoleProjectDTO = {
    uuid: string
    nombre: string
    descripcion: string
}

export type GetProjectAccountDTO = {
    uuid_cuenta: string
    uuid_proyecto: string
}

export type UserProjectDTO = {
    uuid: string
    nombre: string
    correo: string
    rol_nombre: string
}


// roles

export interface PermissionDTO {
    id: number;
    uuid: string;
    nombre: string;
    descripcion: string;
}

export interface ProjectRoleDTO {
    id: number;
    uuid: string;
    nombre: string;
    descripcion: string;
    permisos: PermissionDTO[];
}