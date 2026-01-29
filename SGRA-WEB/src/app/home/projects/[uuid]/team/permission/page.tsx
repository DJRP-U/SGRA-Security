"use client"
import { useEffect, useState } from "react";
import { RoleProjectFormData } from "@/tipos/projectType";
import RoleProjectForm from "@/components/forms/RoleProjectForm";
import Title from "@/components/text/heading/Title";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/buttons/Button";
import CircleLoading from "@/components/render/loading/CircleLoading";
import { createRolProject, listPermissions } from "@/service/projectService";
import { toast } from "sonner";
import { Permission } from "@/tipos/DTOs/permissionDTO";

const mapSection = (nombre: string): Permission["seccion"] => {
    const lowerName = nombre.toLowerCase();
    if (lowerName.startsWith("requisito")) return "Requisitos";
    if (lowerName.startsWith("historia")) return "Historias";
    if (lowerName.startsWith("tarea")) return "Tareas";
    if (lowerName.startsWith("defecto")) return "Defectos";
    if (lowerName.startsWith("proyecto")) return "Proyecto";
    if (lowerName.startsWith("sprint")) return "Sprint";
    return "Tareas";
};

export default function PermissionPage() {

    const { uuid } = useParams();

    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchPermissions = async (): Promise<void> => {
            try {
                setIsLoading(true);
                const response = await listPermissions();
                const mappedData: Permission[] = response.data.map((p: any) => ({
                    ...p,
                    seccion: mapSection(p.nombre)
                }));
                setPermissions(mappedData);
            } catch (error: any) {
                toast.error(error.detail)
            } finally {
                setIsLoading(false);
            }
        };

        fetchPermissions();
    }, []);

    const handlePermissionToggle = (uuid: string): void => {
        setSelectedPermissions((prev) =>
            prev.includes(uuid)
                ? prev.filter((id) => id !== uuid)
                : [...prev, uuid]
        );
    };

    const handleCreateRolProject = async (values: RoleProjectFormData) => {

        const payload = {
            nombre: values.nombre,
            descripcion: values.descripcion,
            permisos_uuids: selectedPermissions,
            proyecto_uuid: String(uuid)
        };

        try {
            setIsSubmitting(true);
            const response = await createRolProject(payload);
            toast.success(response.msg);
            router.refresh();
            setTimeout(() => {
                router.back();
            }, 100);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = (): void => {
        router.back();
    };

    if (isLoading) return <CircleLoading />;

    return (
        <div className="flex flex-col items-center pt-4 pb-8 gap-16">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <Title>Crear rol</Title>
                    <Button
                        label="Regresar"
                        secondary
                        onClick={handleCancel}
                    />
                </div>
                <RoleProjectForm
                    onSubmit={handleCreateRolProject}
                    onCancel={handleCancel}
                    availablePermissions={permissions}
                    selectedPermissions={selectedPermissions}
                    onPermissionToggle={handlePermissionToggle}
                    btnName="Guardar"
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}
