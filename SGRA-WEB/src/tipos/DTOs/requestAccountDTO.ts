import { StatusRequest } from "@/enums/requestEnum"

export type CreateRequestAccountDTO = {
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
}

export type RespondRequestAccountDTO = {
    uuid_usuario: string;
    decision: StatusRequest;
}

export type RequestAccountDTO = {
    uuid: string
    nombre: string
    apellido: string
    correo: string
    fecha_solicitud: Date
    estado: StatusRequest
}