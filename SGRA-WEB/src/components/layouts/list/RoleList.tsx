"use client";
import { ProjectRoleDTO } from "@/tipos/DTOs/projectDTO";
import List from "./List";
import { columnsProjectRoles } from "@/tabla/projectRoleColumns";
import { useParams, useRouter } from "next/navigation";
import { RowAction } from "@/tipos/table/tableType";
import { ShieldCheck } from "lucide-react";

interface RoleListProps {
    roles: ProjectRoleDTO[];
}

export default function RoleList({ roles }: RoleListProps) {

    const { uuid } = useParams();
    const router = useRouter();

    const roleActions: RowAction<ProjectRoleDTO>[] = [
        {
            key: "editPermissions",
            label: () => "Editar permisos",
            icon: <ShieldCheck size={18} />,
            show: () => true,
            onClick: (item) => router.push(`/home/projects/${uuid}/settings/role/${item.uuid}`),
        },
    ];

    return (
        <List<ProjectRoleDTO>
            columns={columnsProjectRoles}
            data={roles}
            actions={roleActions}
        />
    );
}