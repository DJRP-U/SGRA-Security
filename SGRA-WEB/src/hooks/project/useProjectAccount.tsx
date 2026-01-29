"use client";
import { ProjectAccount } from "@/service/accountService";
import { GetProjectAccountDTO } from "@/tipos/DTOs/projectDTO";
import { useEffect, useState } from "react";

interface UseProjectUserProps {
    uidAccount: string;
    uidProject: string;
}

export function useProjectUser({
    uidAccount,
    uidProject,
}: UseProjectUserProps) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);
                const payload: GetProjectAccountDTO = {
                    uuid_cuenta: uidAccount,
                    uuid_proyecto: uidProject
                }
                const response = await ProjectAccount.getUser(payload);
                setUser(response);
            } catch {
                setError("Error al obtener el usuario del proyecto");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [uidAccount, uidProject]);

    return {
        user,
        loading,
        error,
    };
}
