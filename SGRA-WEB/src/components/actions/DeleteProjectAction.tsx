"use client";
import Swal from "sweetalert2";
import Button from "../buttons/Button";
import ContainerAction from "./parts/ContainerAction";
import { ProjectService } from "@/service/projectService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UpdateProjectActionProps {
    uidProject: string
}

export default function DeleteProjectAction({ uidProject }: UpdateProjectActionProps) {

    const router = useRouter();

    const onSubmitDelete = async () => {

        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, continuar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const response = await ProjectService.delete(uidProject);
            toast.success(response.msg);
            router.push("/home");
            router.refresh();
        } catch (error: any) {
            toast.error(error.detail);
        }
    }

    return (
        <ContainerAction>
            <div className="flex flex-col justify-center max-w-md gap-1">
                <h4 className="text-neutral-500 font-semibold text-xl">Eliminar el proyecto</h4>
                <span className="text-neutral-500 text-lg leading-5 ">Esta acción es irreversible. Al eliminar el proyecto, no podrá recuperarse.</span>
            </div>
            <Button
                label="Eliminar proyecto"
                className="bg-red-400 hover:bg-red-500 px-4 text-white"
                onClick={onSubmitDelete}
            />
        </ContainerAction>
    );
}   