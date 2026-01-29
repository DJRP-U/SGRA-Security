"use client";
import { ProjectType } from "@/enums/projectEnum";
import { ProjectService } from "@/service/projectService";
import { UpdateProjectDTO } from "@/tipos/DTOs/projectDTO";
import { ProjectFormData } from "@/tipos/projectType";
import { toast } from "sonner";
import ProjectForm from "../forms/ProjectForm";
import { useState } from "react";
import CircleLoading from "../render/loading/CircleLoading";

interface UpdateProjectActionProps {
    uidProject: string
    project: ProjectFormData
}

export default function UpdateProjectAction({ uidProject, project }: UpdateProjectActionProps) {

    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: ProjectFormData) => {
        setLoading(true);
        
        const payload: UpdateProjectDTO = {
            ...values,
            descripcion: values.descripcion || '',
            fecha_fin: values.fecha_fin ? new Date(values.fecha_fin) : null,
            fecha_inicio: values.fecha_inicio ? new Date(values.fecha_inicio) : null,
            tipo: values.tipo as ProjectType,
        }

        try {
            const response = await ProjectService.update(uidProject, payload);
            toast.success(response.msg);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setLoading(false);
        }

    }

    if (loading) return <CircleLoading />

    return (
        <ProjectForm
            onSubmit={onSubmit}
            defaultValues={project}
            loading={loading}
            buttonText="Guardar"
        />
    );

} 