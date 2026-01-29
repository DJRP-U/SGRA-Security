import { AssignSprintDTO, CreateUserStoryDTO, UpdateUserStoryDTO } from "@/tipos/DTOs/userStoryDTO";
import { api } from "./config/api";

const PREFIX_USER_STORY = "historias_usuario";

export const UserStoryService = {
    create: async (dto: CreateUserStoryDTO) => {
        const { data } = await api.post(`${PREFIX_USER_STORY}/crear`, dto);
        return data;
    },

    update: async (dto: UpdateUserStoryDTO) => {
        const { data } = await api.put(`${PREFIX_USER_STORY}/editar`, dto);
        return data;
    },

    delete: async (uidUserStory: string, uidUser: string) => {
        const { data } = await api.delete(
            `${PREFIX_USER_STORY}/eliminar`,
            {
                data: {
                    uuid_historia: uidUserStory,
                    uuid_creador: uidUser,
                },
            }
        );
        return data;
    },

    changeStatus: async (values: any) => {
        const { data } = await api.patch(`${PREFIX_USER_STORY}/cambiar-estado`, values);
        return data;
    },
    listByProject: async (
        uidProject: string,
        page: number = 1,
        pageSize: number = 10,
        prioridad?: string,
        estado?: string
    ) => {
        const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
        });
        if (prioridad) params.append("prioridad", prioridad);
        if (estado) params.append("estado", estado);
        const { data } = await api.get(
            `${PREFIX_USER_STORY}/listar/${uidProject}?${params.toString()}`
        );
        return data;
    },
    listBySprint: async (uidSprint: string) => {
        const { data } = await api.get(`${PREFIX_USER_STORY}/sprint/${uidSprint}`);
        return data;
    },
    assignToSprint: async (dto: AssignSprintDTO) => {
        const { data } = await api.post(`${PREFIX_USER_STORY}/agregar-a-sprint`, dto);
        return data;
    },
    removeFromSprint: async (dto: AssignSprintDTO) => {
        const { data } = await api.post(`${PREFIX_USER_STORY}/quitar-de-sprint`, dto);
        return data;
    },
};