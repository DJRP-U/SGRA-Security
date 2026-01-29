import { api } from "@/service/config/api";
import { ChangeRoleAccountDTO, RecoveryPasswordDTO, StatusAccountDTO } from "@/tipos/DTOs/accountDTO";
import { GetProjectAccountDTO } from "@/tipos/DTOs/projectDTO";

const PREFIX_ACCOUNT = "cuenta"

export const AccountService = {
    
    list: async () => {
        const { data } = await api.get(`${PREFIX_ACCOUNT}/usuarios`);
        return data;
    },

    changeStatus: async (uid: string, dto: StatusAccountDTO) => {
        const { data } = await api.post(`${PREFIX_ACCOUNT}/${uid}/estado`, dto);
        return data;
    },

    changeRole: async (dto: ChangeRoleAccountDTO) => {
        const { data } = await api.post(`${PREFIX_ACCOUNT}/cambiar-rol`, dto);
        return data;
    },

    recoveryPassword: async (dto: RecoveryPasswordDTO) => {
        const { data } = await api.post(`${PREFIX_ACCOUNT}solicitud/recuperar-password`, dto);
        return data;
    },

};



export const ProjectAccount = {

    getUser: async (dto: GetProjectAccountDTO) => {
        const { data } = await api.post("");
    }
}