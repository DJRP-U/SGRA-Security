"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AccountRoleEnum } from "@/enums/accountEnum";
import { login } from "@/service/loginService";
import { LoginResponseDTO } from "@/tipos/DTOs/accountDTO";
import { LoginFormData } from "@/tipos/loginTipos";
import { setUserSession } from "@/utils/auth";
import { toast } from "sonner";
import { saveSessionAction } from "@/actions/cookies";

const ROUTES_BY_ROLE: Record<AccountRoleEnum, string> = {
    [AccountRoleEnum.ADMIN]: "/panel/request?page=1",
    [AccountRoleEnum.PRODUCT_OWNER]: "/home",
    [AccountRoleEnum.USER]: "/home",
};

export function useLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLoginSuccess = async (values: LoginResponseDTO) => {
        setUserSession({
            uuid: values.uuid,
            name: values.nombre,
            role: values.rol,
        });
        if (values.access_token) {
            const user = values.nombre + " " + values.apellido;
            await saveSessionAction(values.access_token, user);
        }
        router.push(ROUTES_BY_ROLE[values.rol]);
    };

    const onSubmit = async (values: LoginFormData) => {
        if (loading) return;

        try {
            setLoading(true);
            const response = await login(values);
            await handleLoginSuccess(response);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setLoading(false);
        }
    };

    return {
        onSubmit,
        loading,
    };
}
