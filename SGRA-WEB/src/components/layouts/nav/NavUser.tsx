"use client";
import { ProjectInfo } from "@/tipos/projectType";
import NavGroupItems from "./items/NavGroupItems";
import NavItem from "./items/NavItem";
import AsideMenuPanel from "./AsideMenuPanel";
import { BoxIcon, BriefcaseBusinessIcon, HouseIcon, LogOutIcon } from "lucide-react";

type Props = {
    projects: ProjectInfo[];
    showProjects: boolean
};

export default function NavUser({ projects, showProjects }: Props) {
    return (
        <AsideMenuPanel
            header={
                <NavItem
                    href="/home"
                    IconComponent={HouseIcon}
                    label="Inicio"
                />
            }
            footer={
                <NavItem
                    href="/logout"
                    IconComponent={LogOutIcon}
                    label="Cerrar sesión"
                />
            }
        >
            {showProjects && (
                <div className="border-t border-neutral-300 mt-2 pt-2">
                    <NavGroupItems
                        title="Proyectos"
                        IconComponent={BriefcaseBusinessIcon}
                        width={16}
                        height={16}
                        subItems={projects.map((p) => ({
                            label: p.name,
                            href: `/home/projects/${p.uuid}`,
                            IconComponent: BoxIcon
                        }))}
                    />
                </div>
            )}
        </AsideMenuPanel>
    );
}
