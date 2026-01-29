import { api } from "./config/api";

const PREFIX_ROLE = "rol"

export const listRoles = async () => {
    const response = await api.get(PREFIX_ROLE + "/roles");
    return response.data;
};


