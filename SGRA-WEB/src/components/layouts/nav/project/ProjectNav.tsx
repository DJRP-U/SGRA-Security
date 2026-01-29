"use client"
import ProjectNavItem from "../items/ProjectNavItem";
import { ClipboardListIcon, Columns3Icon, LucideSettings, Rows3Icon, ScrollTextIcon, UsersRoundIcon } from "lucide-react";

type ProjectNavProps = {
    project_uid: string
    isOwner: boolean
}

export default function ProjectNav({ project_uid, isOwner = false }: ProjectNavProps) {

    return (
        <section className="w-full border-b border-neutral-400 flex gap-4">
            <ProjectNavItem
                key={2}
                href={`/home/projects/${project_uid}/requirements`}
                label="Requisitos"
                IconComponent={ClipboardListIcon}
            />
            <ProjectNavItem
                key={4}
                href={`/home/projects/${project_uid}/backlog`}
                label="Backlog"
                IconComponent={Rows3Icon}
            />
            <ProjectNavItem
                key={5}
                href={`/home/projects/${project_uid}/sprints`}
                label="Sprints"
                IconComponent={Columns3Icon}
            />

            {
                isOwner && (
                    <ProjectNavItem
                        key={6}
                        href={`/home/projects/${project_uid}/team`}
                        label="Equipo"
                        IconComponent={UsersRoundIcon}
                    />
                )
            }
            {
                isOwner && (
                    <ProjectNavItem
                        key={7}
                        href={`/home/projects/${project_uid}/settings`}
                        label="Ajustes"
                        IconComponent={LucideSettings}
                    />
                )
            }
        </section>
    );
}