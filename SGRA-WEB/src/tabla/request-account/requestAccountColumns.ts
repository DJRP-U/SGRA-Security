import { StatusRequest } from "@/enums/requestEnum";
import { RequestAccountDTO } from "@/tipos/DTOs/requestAccountDTO";
import { ColumnDefinition } from "@/tipos/table/tableType";
import { toTitleCase } from "@/utils/format";

export const columnsAccountRequest: ColumnDefinition<RequestAccountDTO>[] = [
    { key: 'nombre', title: 'Nombre', type: 'text' },
    { key: 'correo', title: 'Correo electrónico', type: 'email' },
    { key: 'fecha_solicitud', title: 'Fecha de registro', type: 'date' },
    {
        key: 'estado',
        title: 'Estado',
        type: 'select',
        options: [
            {
                value: StatusRequest.APPROVED,
                label: toTitleCase(StatusRequest.APPROVED),
                className: "bg-green-300"
            }, {
                value: StatusRequest.REJECTED,
                label: toTitleCase(StatusRequest.REJECTED),
                className: "bg-red-300"
            }, {
                value: StatusRequest.PENDING,
                label: toTitleCase(StatusRequest.PENDING),
                className: "bg-sky-300"
            },
        ]
    },
];