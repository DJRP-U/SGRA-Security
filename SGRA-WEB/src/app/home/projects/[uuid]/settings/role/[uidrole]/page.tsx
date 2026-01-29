import ProjectPageContainer from "@/components/layouts/container/ProjectPageContianer";
import EditPermissionsScreen from "@/components/layouts/section/EditPermissionsScreen";
import { getRoleByUuid, listPermissions } from "@/service/projectService";

interface EditPermissionsPageProps {
    params: Promise<{
        uuid: string
        uidrole: string
    }>;
}

export default async function EditPermissionsPage({ params }: EditPermissionsPageProps) {

    const { uuid, uidrole } = await params;

    const [roleData, allPermissionsResponse] = await Promise.all([
        getRoleByUuid(uidrole),
        listPermissions()
    ]);

    return (
        <ProjectPageContainer>
            <EditPermissionsScreen
                role={roleData.data}
                allPermissions={allPermissionsResponse.data}
            />
        </ProjectPageContainer>
    );
}