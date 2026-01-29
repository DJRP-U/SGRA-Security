"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Title from "@/components/text/heading/Title";
import Subtitle from "@/components/text/heading/Subtitle";
import Detail from "@/components/text/content/Detail";
import Button from "@/components/buttons/Button";
import PermissionItem from "@/components/inputs/toggle/PermissionItem";
import { Permission } from "@/tipos/DTOs/permissionDTO";
import { updateRolePermissions } from "@/service/projectService";
import { PermissionDTO, ProjectRoleDTO } from "@/tipos/DTOs/projectDTO";
import ButtonForm from "@/components/buttons/FormButton";

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

interface Props {
    role: ProjectRoleDTO;
    allPermissions: PermissionDTO[];
}

export default function EditPermissionsScreen({ role, allPermissions }: Props) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedIds, setSelectedIds] = useState<string[]>(
        role.permisos.map(p => p.uuid)
    );

    const mappedPermissions = useMemo(() => {
        return allPermissions.map((p): Permission => ({
            uuid: p.uuid,
            nombre: p.nombre,
            descripcion: p.descripcion,
            seccion: mapSection(p.nombre)
        }));
    }, [allPermissions]);

    const sections: Permission["seccion"][] = ["Requisitos", "Historias", "Tareas", "Defectos", "Proyecto", "Sprint"];

    const handleToggle = (uuid: string) => {
        setSelectedIds(prev =>
            prev.includes(uuid) ? prev.filter(id => id !== uuid) : [...prev, uuid]
        );
    };

    const handleSave = async () => {
        try {
            setIsSubmitting(true);
            console.log(selectedIds);
            await updateRolePermissions(role.uuid, selectedIds);
            toast.success("Permisos actualizados correctamente");
            router.refresh();
            router.back();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4 pt-6 pb-10">
                <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
                    {/* Cabecera */}
                    <div className="flex justify-between items-center pb-4">
                        <Title>Modificar Permisos</Title>
                        <div className="flex gap-2">
                            <Button label="Regresar" secondary onClick={() => router.back()} />
                            <ButtonForm
                                label="Guardar"
                                onClick={handleSave}
                                loading={isSubmitting}
                            />
                        </div>
                    </div>
                    <div className="shrink-0">
                        <Title>{role.nombre}</Title>
                        <Detail>
                            {role.descripcion}
                        </Detail>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Subtitle>
                            Lista de permisos
                        </Subtitle>
                        {sections.map(section => {
                            const sectionPermissions = mappedPermissions.filter(p => p.seccion === section);
                            if (sectionPermissions.length === 0) return null;
                            return (
                                <div key={section} className="flex flex-col gap-3">
                                    <h4 className="text-neutral-500 font-semibold text-xl">{section}</h4>
                                    <div className="overflow-hidden">
                                        {sectionPermissions.map(p => (
                                            <PermissionItem
                                                key={p.uuid}
                                                permission={p}
                                                isSelected={selectedIds.includes(p.uuid)}
                                                onToggle={handleToggle}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}