import { AssignResponsibleDTO, ChangeStatusBugDTO, CreateBugDTO, UpdateBugDTO } from "@/tipos/DTOs/bugDTO";
import { api } from "./config/api";
const PREFIX_BUG = "defectos";

export const BugService = {
    listByProject: async (
        uidProject: string,
        page: number = 1,
        pageSize: number = 10,
        tipo_defecto?: string,
        prioridad?: string,
        severidad?: string,
        estado?: string
    ) => {
        const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
        });

        if (tipo_defecto) params.append("tipo_defecto", tipo_defecto);
        if (prioridad) params.append("prioridad", prioridad);
        if (severidad) params.append("severidad", severidad);
        if (estado) params.append("estado", estado);

        const { data } = await api.get(
            `${PREFIX_BUG}/listar/${uidProject}?${params.toString()}`
        );
        return data;
    },
    create: async (dto: CreateBugDTO) => {
        const { data } = await api.post(`${PREFIX_BUG}`, dto);
        return data;
    },
    update: async (uidUS: string, dto: UpdateBugDTO) => {
        const { data } = await api.put(`${PREFIX_BUG}/${uidUS}`, dto);
        return data;
    },
    changeStatus: async (uidBug: string, status: ChangeStatusBugDTO) => {
        const { data } = await api.patch(`${PREFIX_BUG}/${uidBug}/estado`, status);
        return data;
    },
    delete: async (uidBug: string) => {
        const { data } = await api.delete(`${PREFIX_BUG}/${uidBug}`);
        return data;
    },
    assignResponsible: async (uidBug: string, dto: AssignResponsibleDTO) => {
        const { data } = await api.patch(`${PREFIX_BUG}/${uidBug}/asignar`, dto);
        return data;
    },
};  