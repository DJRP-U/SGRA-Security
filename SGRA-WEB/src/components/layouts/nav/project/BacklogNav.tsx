"use client";
import { FileTextIcon, CheckSquare2Icon, BugIcon } from "lucide-react";
import BacklogNavItem from "../items/BacklogNavItem";

type BacklogNavProps = {
    projectUid: string;
}

export default function BacklogNav({ projectUid }: BacklogNavProps) {
    return (
        <div className="flex gap-1">
            <BacklogNavItem
                label="Historias"
                title="Historias de usuario"
                IconComponent={FileTextIcon}
                color="green"
                href={`/home/projects/${projectUid}/backlog`}
            />
            <BacklogNavItem
                label="Tareas"
                title="Tareas"
                IconComponent={CheckSquare2Icon}
                color="blue"
                href={`/home/projects/${projectUid}/backlog/task`}
            />
            <BacklogNavItem
                label="Defectos"
                title="Defectos"
                IconComponent={BugIcon}
                color="red"
                href={`/home/projects/${projectUid}/backlog/bug`}
            />
        </div>
    );
}
