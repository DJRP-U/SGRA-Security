import { ProjectRoleDTO } from "@/tipos/DTOs/projectDTO";
import { ColumnDefinition } from "@/tipos/table/tableType";


export const columnsProjectRoles: ColumnDefinition<ProjectRoleDTO>[] = [
    { 
        key: 'nombre', 
        title: 'Nombre', 
        type: 'text' 
    },
    { 
        key: 'descripcion', 
        title: 'Descripción', 
        type: 'text' 
    },
];