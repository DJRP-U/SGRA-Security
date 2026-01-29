"use client";
import { AccountService } from "@/service/accountService";
import { AccountDTO } from "@/tipos/DTOs/accountDTO";
import { useEffect, useState, useRef } from "react";
import { LabelForm } from "./form/parts/LabelForm";
import { toast } from "sonner";
import { toTitleCase } from "@/utils/format";

type Props = {
    label: string
    id: string
    placeholder?: string
    required?: boolean
    width?: string
    value: string
    onChange: (value: string) => void
    onSelectedIdChange: (uuid: string) => void
};

export default function AccountEmailAutocomplete({
    label,
    id,
    placeholder,
    required = false,
    width = "min-w-sm max-w-sm",
    value,
    onChange,
    onSelectedIdChange,
}: Props) {
    const [hasValue, setHasValue] = useState(false);
    const [accounts, setAccounts] = useState<AccountDTO[]>([]);
    const [filteredAccounts, setFilteredAccounts] = useState<AccountDTO[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Estado para el loader

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            setIsLoading(true);
            try {
                const response = await AccountService.list();
                const data = response.data ?? response;
                setAccounts(data);
            } catch (error: any) {
                toast.error(error.detail);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setShowOptions(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        setHasValue(newValue.trim() !== "");

        if (!newValue.trim()) {
            setFilteredAccounts([]);
            setShowOptions(false);
            return;
        }

        const lower = newValue.toLowerCase();

        const results = accounts
            .filter(acc => acc.correo.toLowerCase().includes(lower))
            .slice(0, 5);

        setFilteredAccounts(results);
        setShowOptions(true); // Se activa para mostrar loader o resultados
    };

    const handleSelectAccount = (acc: AccountDTO) => {
        onChange(acc.correo);
        onSelectedIdChange(acc.uuid);
        setHasValue(true);
        setShowOptions(false);
    };

    return (
        <div ref={containerRef} className={`${width} tracking-tighter mb-1 relative mb-3`}>
            <LabelForm
                label={label}
                required={required}
                htmlFor="asd"
            />

            <input
                id={id}
                type="email"
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                autoComplete="off"
                className={`
                        text-lg text-neutral-600
                        flex items-center min-w-xs ml-[1px] px-3 py-2 cursor-text bg-white rounded-xs transition-all
                        ${hasValue
                        ? "outline outline-2 outline-blue-400"
                        : "outline outline-1 outline-neutral-400 text-neutral-600"}
                `}
            />

            {showOptions && (
                <ul className="absolute z-20 w-full mt-1 bg-white border border-neutral-300 rounded-xs shadow-sm max-h-40 overflow-y-auto text-xs">
                    {isLoading ? (
                        <li className="px-4 py-4 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-neutral-300 border-t-blue-500 rounded-full animate-spin" />
                        </li>
                    ) : filteredAccounts.length > 0 ? (
                        filteredAccounts.map(acc => (
                            <li
                                key={acc.uuid}
                                className="px-4 py-1 cursor-pointer hover:bg-neutral-100 flex flex-col"
                                onClick={() => handleSelectAccount(acc)}
                            >
                                <span className="text-lg font-medium text-neutral-700">{acc.correo}</span>
                                <span className="text-base text-neutral-500">
                                    {acc.nombre} {acc.apellido} · {toTitleCase(acc.rol)}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-neutral-500 italic">No hay resultados</li>
                    )}
                </ul>
            )}
        </div>
    );
}