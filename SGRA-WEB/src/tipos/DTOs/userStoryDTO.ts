import { Priority } from "@/enums/baseEnum";
import { UserStoryStatus } from "@/enums/userStoryEnums";

export type UserStoryDTO = {
  uuid: string
  titulo: string
  identificador: string
  descripcion: string
  prioridad: Priority
  estado: UserStoryStatus
  estimacion: number
  criterios_aceptacion: string
  requisitos: RequirementIdUserStoryDTO[]
  creador: String
  fecha_creacion: Date
  fecha_ultima_modificacion: Date
};

export type CreateUserStoryDTO = {
  titulo: string
  descripcion: string
  prioridad: Priority
  criterios_aceptacion: string
  estimacion: number
  uuid_creador: string
  uuids_requisitos: string[]
  uuid_responsable: string
}

export type UpdateBaseUserStoryDTO = Partial<CreateUserStoryDTO> & {
  estado?: UserStoryStatus
}

export type UpdateUserStoryDTO = {
  uuid_historia: string
  uuid_creador: string
  datos: UpdateBaseUserStoryDTO
}

type RequirementIdUserStoryDTO = {
  uuid: string
  identificador: string
}

export interface AssignSprintDTO {
  uuid_historia: string;
  uuid_sprint: string;
}