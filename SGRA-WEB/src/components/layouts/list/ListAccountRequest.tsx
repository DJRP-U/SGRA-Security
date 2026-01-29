"use client";
import List from "./List";
import { RequestAccountDTO, RespondRequestAccountDTO } from "@/tipos/DTOs/requestAccountDTO";
import { columnsAccountRequest } from "@/tabla/request-account/requestAccountColumns";
import { RowAction } from "@/tipos/table/tableType";
import { StatusRequest } from "@/enums/requestEnum";
import { RequestAccountService } from "@/service/requestAccountService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface ListAccountRequestProps {
    accountRequests: RequestAccountDTO[]
}

export default function ListAccountRequest({ accountRequests }: ListAccountRequestProps) {

    const router = useRouter();

    const actionsAccountRequest: RowAction<RequestAccountDTO>[] = [
        {
            key: 'approveStatus',
            label: () => "Aceptar solicitud",
            show: (item) => item.estado === StatusRequest.PENDING,
            onClick: (item) => {
                handleStatusRequest(String(item.uuid), StatusRequest.APPROVED);
            },
        },
        {
            key: 'rejectStatus',
            label: () => "Rechazar solicitud",
            show: (item) => item.estado === StatusRequest.PENDING,
            onClick: (item) => {
                handleStatusRequest(String(item.uuid), StatusRequest.REJECTED);
            },
        },
    ];

    const handleStatusRequest = async (uidRequest: string, option: StatusRequest) => {
        const toastId = toast.loading("Procesando solicitud...");
        const payload: RespondRequestAccountDTO = {
            uuid_usuario: uidRequest,
            decision: option
        }

        try {
            const response = await RequestAccountService.respond(payload);
            toast.success(response.msg, { id: toastId });
            router.refresh();
        } catch (error: any) {
            toast.error(error.detail, { id: toastId });
        }
    };

    return (
        <List<RequestAccountDTO>
            data={accountRequests}
            columns={columnsAccountRequest}
            actions={actionsAccountRequest}
        />
    );
}