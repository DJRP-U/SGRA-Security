"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toTitleCase } from "@/utils/format";
import SelectInputForm from "@/components/inputs/form/SelectInputForm";
import ButtonForm from "@/components/buttons/FormButton";
import Button from "@/components/buttons/Button";
import { ChangeRoleUserProjectFormData } from "@/tipos/projectType";
import { changeRoleUserProjectSchema } from "@/schemas/projectSchema";
import { RoleProjectDTO } from "@/tipos/DTOs/projectDTO";
import LinkButton from "@/components/buttons/LinkButton";
import Detail from "@/components/text/content/Detail";

interface ChangeUserRoleProjectFormProps {
    onSubmit: (data: ChangeRoleUserProjectFormData) => void
    onCancel: () => void
    roleOptions: RoleProjectDTO[]
    textButton: string
    projectUid: string
    defaultValues?: Partial<ChangeRoleUserProjectFormData>
    isSubmitting?: boolean; // Prop agregada
}

export default function ChangeUserRoleProjectForm({
    roleOptions,
    defaultValues,
    textButton,
    projectUid,
    onCancel,
    onSubmit,
    isSubmitting = false // Valor por defecto
}: ChangeUserRoleProjectFormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<ChangeRoleUserProjectFormData>({
        resolver: zodResolver(changeRoleUserProjectSchema),
        defaultValues,
    });

    const roles = roleOptions.map((role) => ({
        label: toTitleCase(role.nombre),
        value: role.uuid,
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            {roles.length > 0 ? (
                <>
                    <SelectInputForm
                        label="Rol"
                        id="role"
                        placeholder="Selecciona el nuevo rol"
                        options={roles}
                        register={register("rol")}
                        error={errors.rol}
                        required
                        disabled={isSubmitting} // Bloquear select durante el envío
                    />

                    <div className="flex justify-end gap-2 mt-2">
                        <Button
                            label="Cancelar"
                            onClick={onCancel}
                            secondary
                            disabled={isSubmitting} // Bloquear botón cancelar
                        />
                        <ButtonForm
                            label={textButton}
                            loading={isSubmitting} // Spinner activado
                        />
                    </div>
                </>
            ) : (
                <div className="p-4 text-center border border-dashed border-neutral-400 rounded-md flex flex-col gap-4">
                    <Detail>
                        No hay roles creados. Crea uno primero.
                    </Detail>
                    <LinkButton
                        label="Crear rol"
                        href={`/home/projects/${projectUid}/team/permission`}
                        showIcon
                    />
                </div>
            )}
        </form>
    );
}