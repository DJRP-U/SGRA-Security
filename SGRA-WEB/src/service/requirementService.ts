import { ApproveOrRejectRequirementDTO, CreateRequirementDTO, RequirementChangeStatusDTO, UpdateRequirementDTO } from "@/tipos/DTOs/requirementDTO";
import { api } from "./config/api";

const PREFIX_REQUIREMENT = "requisito";

export const RequirementService = {
    create: async (dto: CreateRequirementDTO) => {
        const { data } = await api.post(`${PREFIX_REQUIREMENT}/guardar-requisito`, dto);
        return data;
    },
    update: async (dto: UpdateRequirementDTO) => {
        const { data } = await api.post(`${PREFIX_REQUIREMENT}/modificar-requisito`, dto);
        return data;
    },
    changeStatus: async (dto: RequirementChangeStatusDTO) => {
        const { data } = await api.patch(`${PREFIX_REQUIREMENT}/eliminar`, dto);
        return data;
    },
    listByProject: async (
        uidProject: string,
        page: number = 1,
        pageSize: number = 10,
        tipo?: string,
        prioridad?: string,
        estado?: string
    ) => {
        const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
        });

        if (tipo) params.append("tipo", tipo);
        if (prioridad) params.append("prioridad", prioridad);
        if (estado) params.append("estado", estado);

        const { data } = await api.get(`${PREFIX_REQUIREMENT}/listar-requisitos/${uidProject}?${params.toString()}`);
        return data;
    },
    listDprecatedByProject: async (uidProject: string) => {
        const { data } = await api.get(`${PREFIX_REQUIREMENT}/listar-obsoletos/${uidProject}`);
        return data;
    },
    listHistory: async (uidRequirement: string) => {
        const { data } = await api.get(`${PREFIX_REQUIREMENT}/listar-historial/${uidRequirement}`);
        return data;
    },
    respondApproval: async (dto: ApproveOrRejectRequirementDTO) => {
        const { data } = await api.post(`${PREFIX_REQUIREMENT}/responder-aprobacion`, dto);
        return data;
    },
};
