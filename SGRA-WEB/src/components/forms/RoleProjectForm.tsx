"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import TextInputForm from "../inputs/form/TextInputForm";
import { useForm } from "react-hook-form";
import { RoleProjectFormData } from "@/tipos/projectType";
import { roleProjectSchema } from "@/schemas/projectSchema";
import ButtonForm from "../buttons/FormButton";
import PermissionItem from "../inputs/toggle/PermissionItem";
import Subtitle from "../text/heading/Subtitle";
import Detail from "../text/content/Detail";
import TextAreaInputForm from "../inputs/form/TextAreaForm";
import Button from "../buttons/Button";
import { Permission } from "@/tipos/DTOs/permissionDTO";

type ProjectFormProps = {
    onSubmit: (data: RoleProjectFormData) => void
    btnName: string
    onCancel: () => void
    availablePermissions: Permission[]
    selectedPermissions: string[]
    onPermissionToggle: (uuid: string) => void
    isSubmitting: boolean
}

export default function RoleProjectForm({
    onSubmit,
    btnName,
    onCancel,
    availablePermissions,
    selectedPermissions,
    onPermissionToggle,
    isSubmitting
}: ProjectFormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<RoleProjectFormData>({
        resolver: zodResolver(roleProjectSchema),
    });

    const sections = ["Requisitos", "Historias", "Tareas", "Defectos", "Proyecto", "Sprint"];

    return (

        <form
            className="flex flex-col gap-2 max-w-3xl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-1">
                <TextInputForm
                    label="Nombre"
                    id="nameRole"
                    placeholder="Escriba el nombre del rol (ej. Administrador)"
                    type="text"
                    register={register("nombre")}
                    error={errors.nombre}
                    required
                    width="w-lg"
                />
                <TextAreaInputForm
                    label="Descripción"
                    id="descriptionRole"
                    placeholder="Describa las responsabilidades principales del rol (ej.: gestión de usuarios y permisos)"
                    register={register("descripcion")}
                    error={errors.descripcion}
                    rows={4}
                    required
                    width="w-lg"
                />
            </div>
            <div className="w-full flex flex-col gap-4">
                <div>
                    <Subtitle>
                        Asignar permisos
                    </Subtitle>
                    <Detail>
                        Selecciona los permisos que deseas asignar a este rol.
                    </Detail>
                </div>
                {sections.map(section => (
                    <div key={section} className="flex flex-col gap-2">
                        <h4 className="text-neutral-500 font-semibold text-xl">{section}</h4>
                        <div className="overflow-hidden">
                            {availablePermissions
                                .filter(p => p.seccion === section)
                                .map(p => (
                                    <PermissionItem
                                        key={p.uuid}
                                        permission={p}
                                        isSelected={selectedPermissions.includes(p.uuid)}
                                        onToggle={onPermissionToggle}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-start gap-2 mt-6">
                <ButtonForm label={btnName} loading={isSubmitting} />
                <Button onClick={onCancel} secondary label="Cancelar" />
            </div>
        </form>

    );
}
