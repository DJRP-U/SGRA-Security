import RequirementHistoryCard, { RequirementHistoryDTO } from "@/components/cards/requirement-history/RequirementHistoryCard";
import Detail from "@/components/text/content/Detail";
import { InfoIcon } from "lucide-react";

type Props = {
    history: RequirementHistoryDTO[];
};

export default function RequirementHistoryList({ history }: Props) {
    return (
        <div className="flex flex-col gap-4 max-w-6xl py-4">
            <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-200 border border-red-100"></span>
                        <span className="text-base text-neutral-500">Valor Reemplazado</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-green-200 border border-green-200"></span>
                        <span className="text-base text-neutral-500">Valor Actualizado</span>
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-neutral-200 pl-4">
                        <span className="w-3 h-3 rounded-full bg-white border border-neutral-300"></span>
                        <span className="text-base text-neutral-500">Sin cambios</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-12 pb-4 overflow-x-auto whitespace-nowrap">
                {history.map((item, index) => (
                    <RequirementHistoryCard
                        key={`${item.requirement.identificador}-${item.version}-${index}`}
                        history={item}
                        previousHistoryChanges={index > 0 ? history[index - 1].cambios : []}
                    />
                ))}
            </div>
        </div>
    );
}



