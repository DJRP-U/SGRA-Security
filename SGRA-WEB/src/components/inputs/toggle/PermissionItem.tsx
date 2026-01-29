import { PermissionDTO } from "@/tipos/DTOs/permissionDTO";

interface PermissionItemProps {
    permission: PermissionDTO;
    isSelected: boolean;
    onToggle: (id: string) => void;
}

export default function PermissionItem({ permission, isSelected, onToggle }: PermissionItemProps) {
    return (
        <div className="flex items-center gap-4 py-1 px-2 transition-colors">
            <input
                type="checkbox"
                id={permission.uuid}
                checked={isSelected}
                onChange={() => onToggle(permission.uuid)}
                className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor={permission.uuid} className="flex-1 cursor-pointer grid grid-cols-2 items-center">
                <span className="text-lg font-medium text-neutral-600">{permission.nombre}</span>
                <span className="text-base text-neutral-500">{permission.descripcion}</span>
            </label>
        </div>
    );
}