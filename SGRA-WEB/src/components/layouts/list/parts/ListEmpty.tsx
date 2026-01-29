import AddButton from "@/components/buttons/AddButton";
import Detail from "@/components/text/content/Detail";
import { BrushCleaningIcon, PackageOpenIcon } from "lucide-react";

type ListEmptyAction = {
  label: string;
  onClick: () => void;
};

type ListEmptyProps = {
  columnsCount: number;
  hasActions: boolean;
  title?: string;
  description?: string;
  action?: ListEmptyAction;
};

export default function ListEmpty({
  columnsCount,
  hasActions,
  title = "Sin registros",
  description = "No hay información disponible para mostrar.",
  action,
}: ListEmptyProps) {
  return (
    <tr>
      <td
        colSpan={columnsCount + (hasActions ? 1 : 0)}
        className="py-16 text-center"
      >
        <div className="flex flex-col items-center gap-5">
          <PackageOpenIcon className="text-neutral-600" size={80} />
          <div>
            <Detail>{title}</Detail>
            {description && <Detail>{description}</Detail>}
          </div>
          {action && (
            <AddButton
              className="py-1!"
              onClick={action.onClick}
              label={action.label}
            />
          )}
        </div>
      </td>
    </tr>
  );
}