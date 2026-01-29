import LinkButton from "@/components/buttons/LinkButton";
import ProjectPageContainer from "@/components/layouts/container/ProjectPageContianer";
import ProjectPageHeader from "@/components/layouts/header/ProjectPageHeader";
import RoleList from "@/components/layouts/list/RoleList";
import { listRoleByProject } from "@/service/projectService";

interface ProjectUpdatePageProps {
    params: Promise<{ uuid: string }>;
}

export default async function RolePage({ params }: ProjectUpdatePageProps) {
    const { uuid } = await params;

    const response = await listRoleByProject(uuid);

    return (
        <ProjectPageContainer>
            <ProjectPageHeader>
                <div className="w-full flex gap-1 justify-end">
                    <LinkButton
                        label="Crear rol"
                        href={`/home/projects/${uuid}/team/permission`}
                        showIcon
                    />
                    <LinkButton
                        label="Regresar"
                        href={`/home/projects/${uuid}/settings`}
                        secondary
                    />
                </div>
            </ProjectPageHeader>
            <RoleList
                roles={response.data}
            />
        </ProjectPageContainer>
    );
}