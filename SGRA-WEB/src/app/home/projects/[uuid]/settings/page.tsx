import DeleteProjectAction from "@/components/actions/DeleteProjectAction";
import ManageRolesAction from "@/components/actions/ManageRolesAction";
import UpdateProjectAction from "@/components/actions/UpdateProjectAction";
import Subtitle from "@/components/text/heading/Subtitle";
import Title from "@/components/text/heading/Title";
import { ProjectService } from "@/service/projectService";
import { ProjectFormData } from "@/tipos/projectType";

interface ProjectUpdatePageProps {
    params: Promise<{ uuid: string }>
}

export default async function ProjectUpdateScreen({ params }: ProjectUpdatePageProps) {

    const { uuid } = await params;

    const response = await ProjectService.getByUid(uuid);

    const project: ProjectFormData = {
        ...response.data,
        fecha_inicio: response.data.fecha_inicio ?? '',
        fecha_fin: response.data.fecha_fin ?? '',
    }


    return (
        <div className="flex flex-col items-center pt-4 pb-8 gap-16">
            <div className="flex flex-col gap-4">
                <Title>
                    Ajustes
                </Title>
                <Subtitle>
                    Detalles general
                </Subtitle>
                <UpdateProjectAction
                    project={project}
                    uidProject={uuid}
                />
            </div>
            <div className="w-full flex flex-col items-center gap-4">
                <div className="w-2xl">
                    <Subtitle>
                        Acciones
                    </Subtitle>
                </div>
                <div className="flex flex-col gap-6">
                    <ManageRolesAction uidProject={uuid} />
                    <DeleteProjectAction uidProject={uuid} />
                </div>
            </div>
        </div>
    );
}
