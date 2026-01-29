"use client";
import { useEffect, useState, useRef } from "react";
import { LabelForm } from "./form/parts/LabelForm";
import { toast } from "sonner";
import { getUsersByProject } from "@/service/projectService";
import { UserProjectDTO } from "@/tipos/DTOs/projectDTO";

type Props = {
    label: string
    id: string
    projectUuid: string
    placeholder?: string
    required?: boolean
    width?: string
    value: string
    onChange: (value: string) => void
    onSelectedIdChange: (uuid: string) => void
};

export default function ProjectUserAutocomplete({
    label,
    id,
    projectUuid,
    placeholder,
    required = false,
    width = "min-w-sm max-w-sm",
    value,
    onChange,
    onSelectedIdChange,
}: Props) {
    const [hasValue, setHasValue] = useState(false);
    const [users, setUsers] = useState<UserProjectDTO[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserProjectDTO[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 1. Nuevo estado de carga

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!projectUuid) return;
            setIsLoading(true); // 2. Iniciar carga
            try {
                const response = await getUsersByProject(projectUuid);
                setUsers(response.data);
            } catch (error: any) {
                toast.error(error.detail);
            } finally {
                setIsLoading(false); // 3. Finalizar carga
            }
        };

        fetchUsers();
    }, [projectUuid]);

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
            setFilteredUsers([]);
            setShowOptions(false);
            return;
        }

        const lower = newValue.toLowerCase();

        const results = users
            .filter(user =>
                user.correo.toLowerCase().includes(lower) ||
                user.nombre.toLowerCase().includes(lower)
            )
            .slice(0, 5);

        setFilteredUsers(results);
        setShowOptions(true); // Siempre mostrar si hay texto para poder ver el loader
    };

    const handleSelectUser = (user: UserProjectDTO) => {
        onChange(user.correo);
        onSelectedIdChange(user.uuid);
        setHasValue(true);
        setShowOptions(false);
    };

    return (
        <div ref={containerRef} className={`${width} tracking-tighter relative mb-3`}>
            <LabelForm
                label={label}
                required={required}
                htmlFor={id}
            />

            <input
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                autoComplete="off"
                className={`
                    text-lg text-neutral-600 w-full
                    flex items-center px-3 py-2 cursor-text bg-white rounded-xs transition-all
                    ${hasValue
                        ? "outline outline-2 outline-blue-400"
                        : "outline outline-1 outline-neutral-400"}
                `}
            />

            {showOptions && (
                <ul className="absolute z-20 w-full mt-1 bg-white border border-neutral-300 rounded-xs shadow-md max-h-48 overflow-y-auto">
                    {/* 4. Mostrar spinner si está cargando los usuarios del proyecto */}
                    {isLoading ? (
                        <li className="px-4 py-6 flex flex-col items-center justify-center gap-2 text-neutral-500">
                            <div className="w-6 h-6 border-2 border-neutral-300 border-t-blue-500 rounded-full animate-spin" />
                            <span className="text-sm">Buscando usuarios...</span>
                        </li>
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <li
                                key={user.uuid}
                                className="px-4 py-2 cursor-pointer hover:bg-neutral-100 flex flex-col border-b border-neutral-200 last:border-0"
                                onClick={() => handleSelectUser(user)}
                            >
                                <span className="text-base font-medium text-neutral-700">{user.nombre}</span>
                                <span className="text-sm text-neutral-500">
                                    {user.correo} · <span className="italic text-blue-600">{user.rol_nombre}</span>
                                </span>
                            </li>
                        ))
                    ) : (
                        // 5. Mensaje si no hay resultados tras filtrar
                        <li className="px-4 py-3 text-sm text-neutral-500 italic">
                            No se encontraron usuarios
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}