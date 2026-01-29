"use client";
import { listRoles } from "@/service/roleService";
import { RoleDTO } from "@/tipos/roleType";
import { useEffect, useState, useCallback } from "react";

export function useRoles() {
    const [roles, setRoles] = useState<RoleDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRoles = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await listRoles();

            const listaRoles: RoleDTO[] = response.data || [];

            setRoles(listaRoles);

        } catch (err: any) {
            setError(err?.detail || "Error al cargar los roles");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    return {
        roles,
        loadingRole: loading,
        errorRole: error,
        refetchRoles: fetchRoles,
    };
}
