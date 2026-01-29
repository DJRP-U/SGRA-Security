import Link from "next/link";
import { ProjectCurrentStatus, ProjectStatus } from "@/enums/projectEnum";
import { toTitleCase } from "@/utils/format";
import getStatusBgColor from "@/utils/utils";

interface ProjectCardProps {
    uuid: string
    title: string
    code: string
    status: ProjectStatus
}

export default function ProjectCard({ uuid, title, code, status }: ProjectCardProps) {

    const statusText = status === ProjectStatus.ACTIVE ? "bg-green-300" : "bg-red-400";

    return (
        <Link
            href={`/home/projects/${uuid}/requirements`}
            className={`
                border border-neutral-200 px-4 py-5 w-3xs
                rounded-xs block cursor-pointer
                transition-all duration-500 ease-out
                hover:shadow-[4px_4px_12px_#e5e5e5]
                bg-white
            `}
        >
            <div className="flex flex-col h-full overflow-hidden">
                <div className="flex-1 mb-2">
                    <h4 className="text-lg text-neutral-600 font-medium mr-2 leading-tight break-words">
                        {title}
                    </h4>
                    <h4 className="text-sm text-neutral-500 truncate">
                        #{code}
                    </h4>
                </div>
                <div>
                    <span className={`px-2 text-sm rounded-sm text-neutral-600 font-medium py-1 ${statusText}`}>
                        {toTitleCase(status)}
                    </span>
                </div>
            </div>
        </Link>
    );
}