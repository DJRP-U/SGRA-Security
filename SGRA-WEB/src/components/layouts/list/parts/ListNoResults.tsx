import Detail from "@/components/text/content/Detail";
import Subtitle from "@/components/text/heading/Subtitle";
import { BrushCleaningIcon, SearchXIcon } from "lucide-react";

type ListNoResultsProps = {
  colSpan: number;
  title?: string;
  description?: string;
};

export default function ListNoResults({
  colSpan,
  title = "Sin resultados",
  description = "No se encontraron resultados para la búsqueda o filtros aplicados.",
}: ListNoResultsProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <SearchXIcon size={72} className="text-neutral-500" />
          <div>
            <Subtitle>{title}</Subtitle>
            <Detail>{description}</Detail>
          </div>
        </div>
      </td>
    </tr>
  );
}
