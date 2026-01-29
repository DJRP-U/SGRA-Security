"use client";
import ProjectForm from "@/components/forms/ProjectForm";
import { MainContainer } from "@/components/layouts/container/MainContainer";
import CircleLoading from "@/components/render/loading/CircleLoading";
import Title from "@/components/text/heading/Title";
import { ProjectType } from "@/enums/projectEnum";
import { useCookie } from "@/hooks/useCookie";
import { ProjectService } from "@/service/projectService";
import { CreateProjectDTO } from "@/tipos/DTOs/projectDTO";
import { ProjectFormData } from "@/tipos/projectType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProjectScreen() {

    const router = useRouter();
    const user = useCookie("user");
    const [loading, setLoading] = useState(false);
    const [codeNumber, setCodeNumber] = useState<number | null>(null);
    const [loadingCode, setLoadingCode] = useState(true);

    useEffect(() => {

        if (!user) return;

        const fetchNextNumber = async () => {
            setLoadingCode(true);
            try {
                const data = await ProjectService.getNextProjectNumber(String(user));
                setCodeNumber(data.data);
            } catch (error: any) {
                toast.error(error.detail);
            } finally {
                setLoadingCode(false);
            }
        };

        fetchNextNumber();
    }, [user]);

    if (loadingCode) {
        return <CircleLoading />;
    }


    const createProject = async (values: ProjectFormData) => {

        if (!user) {
            toast.error("Ha ocurrido un error, intentalo otro vez");
            return;
        }

        const payload: CreateProjectDTO = {
            ...values,
            descripcion: values.descripcion || "",
            fecha_inicio: values.fecha_inicio ? new Date(values.fecha_inicio) : null,
            fecha_fin: values.fecha_fin ? new Date(values.fecha_fin) : null,
            tipo: values.tipo as ProjectType,
            uuid_usuario: user || "",
        };

        try {
            setLoading(true);
            const response = await ProjectService.create(payload);
            toast.success(response.msg);
            router.push("/home");
            router.refresh();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainContainer>
            <Title>
                Crear proyecto
            </Title>
            <div className="flex flex-col items-center">
                <ProjectForm
                    buttonText="Guardar"
                    loading={loading}
                    onSubmit={createProject}
                    codeNumber={codeNumber || 1}
                />
            </div>
        </MainContainer>
    );
}   