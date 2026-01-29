"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ButtonForm from "../buttons/FormButton";
import { ChangeRoleAccountFormData } from "@/tipos/accountType";
import { changeRoleAccountSchema } from "@/schemas/accountSchema";
import SelectInputForm from "../inputs/form/SelectInputForm";
import { RoleDTO } from "@/tipos/roleType";
import { AccountService } from "@/service/accountService";
import { AccountDTO, ChangeRoleAccountDTO } from "@/tipos/DTOs/accountDTO";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { toTitleCase } from "@/utils/format";
import Button from "../buttons/Button";
import { useState } from "react";

interface ChangeRoleAccountFormProps {
    account: AccountDTO
    roleOptions: RoleDTO[]
    defaultValues?: Partial<ChangeRoleAccountFormData>
    textButton: string
    onSuccess?: () => void
}

export default function ChangeRoleAccountForm({ roleOptions, defaultValues, textButton, account, onSuccess }: ChangeRoleAccountFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false); // Estado manual de carga

    const { register, handleSubmit, formState: { errors } } = useForm<ChangeRoleAccountFormData>({
        resolver: zodResolver(changeRoleAccountSchema),
        defaultValues,
    });

    const roles = roleOptions.map((role) => ({
        label: toTitleCase(role.nombre),
        value: role.nombre
    }));

    const handleChangeRole = async (values: ChangeRoleAccountFormData) => {
        if (values.role === account.rol) {
            onSuccess?.();
            return;
        }

        setIsLoading(true); // 1. Activamos carga

        const paylaod: ChangeRoleAccountDTO = {
            uuid_usuario: account.uuid,
            rol_nombre: values.role,
        }

        try {
            const response = await AccountService.changeRole(paylaod);
            toast.success(response.msg);
            onSuccess?.();
            router.refresh();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsLoading(false); // 2. Desactivamos carga pase lo que pase
        }
    };

    return (
        <form onSubmit={handleSubmit(handleChangeRole)} className="flex flex-col gap-3">
            <SelectInputForm
                label="Rol"
                id="role"
                options={roles}
                register={register("role")}
                error={errors.role}
                disabled={isLoading} // Opcional: deshabilitar select al cargar
            />

            <div className="flex justify-end gap-1">
                <Button
                    label="Cancelar"
                    onClick={onSuccess}
                    secondary
                    disabled={isLoading} // Pasamos el estado al botón
                />
                <ButtonForm
                    label={textButton}
                    loading={isLoading} // Pasamos el estado al botón de envío
                />
            </div>
        </form>
    );
}