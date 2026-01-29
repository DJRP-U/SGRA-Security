import { LoginResponseDTO } from "@/tipos/DTOs/accountDTO";
import { api } from "./config/api";
import { LoginFormData } from "@/tipos/loginTipos";


export async function login(data: LoginFormData): Promise<LoginResponseDTO> {
    const response = await api.post("cuenta/login", data);
    return response.data.data;
};


