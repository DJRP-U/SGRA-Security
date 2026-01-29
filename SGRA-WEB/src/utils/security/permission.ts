import { PermissionDTO } from "@/tipos/DTOs/projectDTO";


export const hasPermission = (
    permissions: PermissionDTO[],
    permissionName: string
): boolean => {
    if (!permissions || !permissionName) return false;

    return permissions.some(p =>
        p.nombre.trim().toLowerCase() === permissionName.trim().toLowerCase()
    );
};