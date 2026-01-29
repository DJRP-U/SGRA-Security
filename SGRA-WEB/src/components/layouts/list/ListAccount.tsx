"use client";
import List from "./List";
import { RowAction } from "@/tipos/table/tableType";
import { AccountDTO } from "@/tipos/DTOs/accountDTO";
import { columnsAccount } from "@/tabla/account/teamColumns";

interface ListAccountProps {
    accounts: AccountDTO[]
    actionsAccount?: RowAction<AccountDTO>[]
}

export default function ListAccount({ accounts, actionsAccount }: ListAccountProps) {
    return (
        <List<AccountDTO>
            data={accounts}
            columns={columnsAccount}
            actions={actionsAccount}
        />
    );
}