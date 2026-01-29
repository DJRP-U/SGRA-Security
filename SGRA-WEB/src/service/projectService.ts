import { api } from "./config/api";
import { AddUserDTO, ChangeRoleUserProjectDTO, CreateProjectDTO, UpdateProjectDTO } from "@/tipos/DTOs/projectDTO";

const PREFIX_PROJECT = "proyectos";

export const ProjectService = {
    create: async (dto: CreateProjectDTO) => {
        const { data } = await api.post(`${PREFIX_PROJECT}`, dto);
        return data;
    },

    update: async (uidProject: string, dto: UpdateProjectDTO) => {
        const { data } = await api.put(`${PREFIX_PROJECT}/${uidProject}`, dto);
        return data;
    },

    delete: async (projectId: string) => {
        const { data } = await api.delete(`${PREFIX_PROJECT}/${projectId}`);
        return data;
    },

    listByUser: async (userId: string) => {
        const { data } = await api.get(`${PREFIX_PROJECT}/por-usuario/${userId}`);
        return data;
    },

    getByUid: async (uidProject: string) => {
        const { data } = await api.get(`${PREFIX_PROJECT}/${uidProject}`);
        return data;
    },

    addUser: async (dto: AddUserDTO) => {
        const { data } = await api.post(
            `${PREFIX_PROJECT}/agregar-usuario`,
            null,
            {
                params: {
                    uuid_proyecto: dto.uuid_proyecto,
                    uuid_usuario: dto.uuid_usuario,
                },
            }
        );
        return data;
    },
    getNextProjectNumber: async (uidCuenta: string) => {
        const { data } = await api.get(`${PREFIX_PROJECT}/next-project-number/${uidCuenta}`);
        return data;
    },
};

// no se que voy hacer con esto supongo solo creo otro objeto o no se
export const getUsersByProject = async (uidProject: string) => {
    const response = await api.get('/rol-proyectos/usuarios-por-proyecto/' + uidProject)
    return response.data
}

export const createRolProject = async (value: any) => {
    const response = await api.post('/rol-proyectos/', value)
    return response.data
}

export const listRoleByProject = async (uidProject: string) => {
    const response = await api.get("rol-proyectos/por-proyecto/" + uidProject);
    return response.data
}

export const updateRolePermissions = async (roleUuid: string, permissionUuids: string[]) => {
    const response = await api.put(`rol-proyectos/${roleUuid}/permisos`, {
        permisos: permissionUuids
    });
    return response.data;
};

export const getRoleByUuid = async (uuidRol: string) => {
    const response = await api.get("rol-proyectos/" + uuidRol);
    return response.data;
}

export const assignRoleToUserProject = async (values: ChangeRoleUserProjectDTO) => {
    const response = await api.post("rol-proyectos/asignar-rol-cuenta/", values);
    return response.data
}

export const getProjectAccount = async (uuid_usuario: string, uuid_proyecto: string) => {
    const response = await api.get("cuenta-proyectos/obtener_unica/", {
        params: {
            uuid_usuario,
            uuid_proyecto
        }
    });
    return response.data
}

export const listPermissions = async () => {
    const response = await api.get("rol-proyectos");
    return response.data
}

export const assignPermission = async (rol_uuid: string, permiso_uuid: string) => {
    const { data } = await api.post(
        `rol-proyectos/asignar-permiso`,
        null,
        {
            params: {
                rol_uuid,
                permiso_uuid,
            },
        }
    );
    return data;
}

export const getPermissionsByUserProject = async (uidUser: string, uidProject: string) => {
    const responseProjectAccount = await getProjectAccount(uidUser, uidProject);
    const responseRole = await getRoleProjectByUid(responseProjectAccount.rol_proyecto_uuid);
    return responseRole.data.permisos;
}

export const getRoleProjectByUid = async (uidRole: string) => {
    const { data } = await api.get(`rol-proyectos/${uidRole}`);
    return data;
}