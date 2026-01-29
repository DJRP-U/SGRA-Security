"use client";
import { AccountService } from "@/service/accountService";
import { recoveryPasswordFormData } from "@/tipos/loginTipos";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const useRecoveryAccount = () => {

    const router = useRouter();

    const recovery = async (values: recoveryPasswordFormData) => {
        
        try {

            await AccountService.recoveryPassword(values);

            router.push(
                `/auth/restore/info?email=${encodeURIComponent(values.email)}`
            );
        } catch (error: any) {
            Swal.fire(
                "Error",
                error?.detail || "Error inesperado",
                "error"
            );
        }
    };

    return { recovery };
};