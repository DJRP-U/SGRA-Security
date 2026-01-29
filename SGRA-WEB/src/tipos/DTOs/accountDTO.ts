import { AccountRoleEnum, AccountStatesEnum } from "@/enums/accountEnum";

export type AccountDTO = {
    id: number;
    uuid: string;
    nombre: string;
    apellido: string;
    correo: string;
    estadoCuenta: AccountStatesEnum;
    rol: string;
    rol_id: number;
};

export type StatusAccountDTO = {
    estadoCuenta: string
}

export type ChangeRoleAccountDTO = {
    uuid_usuario: string;
    rol_nombre: string;
};

export type RecoveryPasswordDTO = {
    email: string
}

export type LoginResponseDTO = {
    uuid: string
    nombre: string
    apellido: string
    rol: AccountRoleEnum
    access_token: string
}