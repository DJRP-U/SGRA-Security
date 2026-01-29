import { ChangeSprintStatusDTO, CreateSprintDTO, UpdateSprintDTO } from "@/tipos/DTOs/sprintDTO";
import { api } from "./config/api";
const PREFIX_SPRINT = "sprints";

export const SprintService = {
    list: async (uidProject: string) => {
        const { data } = await api.get(`${PREFIX_SPRINT}/proyecto/${uidProject}`);
        return data;
    },
    create: async (dto: CreateSprintDTO) => {
        const { data } = await api.post(`${PREFIX_SPRINT}`, dto);
        return data;
    },
    update: async (uidSprint: string, dto: UpdateSprintDTO) => {
        const { data } = await api.put(`${PREFIX_SPRINT}/${uidSprint}`, dto);
        return data;
    },
    changeStatus: async (uidSprint: string, dto: ChangeSprintStatusDTO) => {
        const { data } = await api.put(`${PREFIX_SPRINT}/${uidSprint}`, dto);
        return data;
    },
    delete: async (uidSprint: string) => {
        const { data } = await api.delete(`${PREFIX_SPRINT}/${uidSprint}`);
        return data;
    },
};  