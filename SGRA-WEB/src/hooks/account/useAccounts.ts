"use client";
import { useEffect, useState, useCallback } from "react";
import { AccountDTO } from "@/tipos/DTOs/accountDTO";
import { AccountService } from "@/service/accountService";

export function useAccounts() {
    const [accounts, setAccounts] = useState<AccountDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAccounts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await AccountService.list();

            setAccounts(response.data);
        } catch (err: any) {
            setError(err?.detail || "Error al cargar las cuentas");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    return {
        accounts,
        loading,
        error,
        refetch: fetchAccounts,
    };
}
