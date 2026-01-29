import { SIZE_PAGES } from "@/components/pagination/page";
import { api } from "./config/api";
import { CreateRequestAccountDTO, RespondRequestAccountDTO } from "@/tipos/DTOs/requestAccountDTO";

const PREFIX_REQUEST = "solicitud"

export const RequestAccountService = {
    create: async (dto: CreateRequestAccountDTO) => {
        const { data } = await api.post(`${PREFIX_REQUEST}/crear-solicitud`, dto);
        return data;
    },

    list: async (page: string) => {
        const { data } = await api.get(PREFIX_REQUEST, {
            params: {
                page: page,
                page_size: SIZE_PAGES,
            },
        });
        return data.data;
    },

    respond: async (dto: RespondRequestAccountDTO) => {
        const { data } = await api.post(`${PREFIX_REQUEST}/responder`, dto);
        return data;
    },
};