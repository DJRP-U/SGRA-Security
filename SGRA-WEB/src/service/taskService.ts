import { api } from "./config/api";
import { ChangeStatusTaskDTO, CreateTaskDTO, ReviewTaskDTO, UpdateTaskDTO } from "@/tipos/DTOs/taskDTO";
const PREFIX_TASK = "tarea";

export const TaskService = {
    list: async (
        uidProject: string,
        page: number = 1,
        pageSize: number = 10,
        prioridad?: string,
        estado?: string,
        historiaUsuarioUuid?: string // Agregamos el nuevo parámetro opcional
    ) => {
        const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
        });

        if (prioridad) params.append("prioridad", prioridad);
        if (estado) params.append("estado", estado);

        // Importante: El nombre de la llave debe ser igual a como 
        // lo espera FastAPI (historia_usuario_uuid)
        if (historiaUsuarioUuid) {
            params.append("historia_usuario_uuid", historiaUsuarioUuid);
        }

        const { data } = await api.get(
            `${PREFIX_TASK}/listar/${uidProject}?${params.toString()}`
        );
        return data;
    },
    create: async (dto: CreateTaskDTO) => {
        const { data } = await api.post(`${PREFIX_TASK}/crear`, dto);
        return data;
    },
    update: async (uidTask: string, dto: UpdateTaskDTO) => {
        const { data } = await api.put(`${PREFIX_TASK}/modificar/${uidTask}`, dto);
        return data;
    },
    changeStatus: async (uidTask: string, status: ChangeStatusTaskDTO) => {
        const { data } = await api.patch(`${PREFIX_TASK}/cambiar-estado/${uidTask}`, status);
        return data;
    },
    delete: async (uidTask: string) => {
        const { data } = await api.delete(`${PREFIX_TASK}/eliminar/${uidTask}`);
        return data;
    },
    startProgress: async (uidTask: string, responsableCambioUuid: string) => {
        const { data } = await api.patch(
            `${PREFIX_TASK}/iniciar-progreso/${uidTask}`,
            {
                responsable_cambio_uuid: responsableCambioUuid,
            }
        );
        return data;
    },
    sendToReview: async (uidTask: string, responsableCambioUuid: string) => {
        const { data } = await api.patch(
            `${PREFIX_TASK}/enviar-revision/${uidTask}`,
            { responsable_cambio_uuid: responsableCambioUuid }
        );
        return data;
    },
    review: async (uidTask: string, dto: ReviewTaskDTO) => {
        const { data } = await api.patch(
            `${PREFIX_TASK}/revisar/${uidTask}`,
            dto
        );
        return data;
    },
};  