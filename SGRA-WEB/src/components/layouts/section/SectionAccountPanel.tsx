
"use client";
import { AccountDTO, StatusAccountDTO } from "@/tipos/DTOs/accountDTO";
import { RowAction } from "@/tipos/table/tableType";
import { useState } from "react";
import ListAccount from "../list/ListAccount";
import { AccountStatesEnum } from "@/enums/accountEnum";
import FormModal from "@/components/forms/modal/FormModal";
import ChangeRoleAccountForm from "@/components/forms/ChangeRoleAccountForm";
import { RoleDTO } from "@/tipos/roleType";
import { AccountService } from "@/service/accountService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SectionAccountProps {
    accounts: AccountDTO[]
    roles: RoleDTO[]
}

export default function SectionAccount({ accounts, roles }: SectionAccountProps) {

    const router = useRouter();
    const [account, setAccount] = useState<AccountDTO | null>(null);

    const actionsAccount: RowAction<AccountDTO>[] = [
        {
            key: 'changeRoleAccount',
            label: () => "Cambiar rol cuenta",
            show: (item) => item.estadoCuenta !== AccountStatesEnum.INACTIVE,
            onClick: (item) => {
                setAccount(item);
            },
        },
        {
            key: 'chageStatusAccount',
            label: (item) => item.estadoCuenta === AccountStatesEnum.ACTIVE ? "Desactivar cuenta" : "Activar cuenta",
            onClick: (item) => {
                const newStatus = item.estadoCuenta === AccountStatesEnum.ACTIVE ?
                    AccountStatesEnum.INACTIVE :
                    AccountStatesEnum.ACTIVE;
                handleChangeStatusAccount(String(item.uuid), newStatus);
            },
        }
    ];

    const handleChangeStatusAccount = async (uidAccount: string, newStatus: AccountStatesEnum) => {
        // 1. Creamos el toast de carga y guardamos su ID
        const toastId = toast.loading("Actualizando estado de la cuenta...");

        const newstatusAccount: StatusAccountDTO = {
            estadoCuenta: newStatus,
        };

        try {
            const response = await AccountService.changeStatus(uidAccount, newstatusAccount);

            // 2. Usamos el ID para transformar el loader en un mensaje de éxito
            toast.success(response.msg, { id: toastId });

            router.refresh();
        } catch (error: any) {
            // 3. Usamos el ID para transformar el loader en un mensaje de error
            // Si error.detail no existe, ponemos un mensaje por defecto
            toast.error(error.detail || "Ocurrió un error al cambiar el estado", { id: toastId });
        }
    };

    return (
        <>
            <ListAccount
                accounts={accounts}
                actionsAccount={actionsAccount}
            />

            {account && (
                <FormModal
                    isOpen={!!account}
                    onClose={() => setAccount(null)}
                    title="Cambiar rol"
                >
                    <ChangeRoleAccountForm
                        roleOptions={roles}
                        account={account}
                        textButton="Guardar"
                        defaultValues={{ role: account.rol }}
                        onSuccess={() => { setAccount(null) }}
                    />
                </FormModal>
            )}
        </>
    );
}
