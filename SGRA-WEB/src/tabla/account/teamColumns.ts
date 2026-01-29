import { AccountStatesEnum } from "@/enums/accountEnum";
import { AccountDTO } from "@/tipos/DTOs/accountDTO";
import { TeamProjectDTO } from "@/tipos/DTOs/projectDTO";
import { ColumnDefinition } from "@/tipos/table/tableType";
import { toTitleCase } from "@/utils/format";


export const columnsAccount: ColumnDefinition<AccountDTO>[] = [
    { key: 'nombre', title: 'Nombre', type: 'text' },
    { key: 'correo', title: 'Correo electrónico', type: 'email' },
    { key: 'rol', title: 'Rol', type: 'text' },
    {
        key: 'estadoCuenta',
        title: 'Estado',
        type: 'select',
        options: [
            {
                value: AccountStatesEnum.ACTIVE,
                label: toTitleCase(AccountStatesEnum.ACTIVE),
                className: "bg-green-300"
            }, {
                value: AccountStatesEnum.INACTIVE,
                label: toTitleCase(AccountStatesEnum.INACTIVE),
                className: "bg-red-300"
            }
        ]
    },
];


export const teamColumns: ColumnDefinition<TeamProjectDTO>[] = [
    {
        key: "nombre",
        title: "Nombre",
        type: "text"
    },
    {
        key: "rol_nombre",
        title: "Rol",
        type: "text"
    },
]