"use client";
import Button from "../buttons/Button";
import ContainerAction from "./parts/ContainerAction";
import { useRouter } from "next/navigation";

interface ManageRolesActionProps {
    uidProject: string
}

export default function ManageRolesAction({ uidProject }: ManageRolesActionProps) {
    const router = useRouter();

    const handleRedirect = () => {
        router.push(`/home/projects/${uidProject}/settings/role`);
    };

    return (
        <ContainerAction>
            <div className="flex flex-col justify-center max-w-md gap-1">
                <h4 className="text-neutral-500 font-semibold text-xl">
                    Gestionar roles del proyecto
                </h4>
                <span className="text-neutral-500 text-lg leading-5">
                    Administra los permisos y roles del este proyecto.
                </span>
            </div>
            <Button
                label="Gestionar roles"
                className="bg-blue-400 hover:bg-blue-500 px-4 text-white"
                onClick={handleRedirect}
            />
        </ContainerAction>
    );
}