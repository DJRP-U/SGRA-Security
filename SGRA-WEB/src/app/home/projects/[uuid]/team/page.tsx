"use client"
import AddButton from "@/components/buttons/AddButton";
import LinkButton from "@/components/buttons/LinkButton";
import AddUserProjectForm from "@/components/forms/modal/AddUserProjectForm";
import ChangeUserRoleProjectForm from "@/components/forms/modal/ChangeUserRoleProjectForm";
import FormModal from "@/components/forms/modal/FormModal";
import ProjectPageContainer from "@/components/layouts/container/ProjectPageContianer";
import ProjectPageHeader from "@/components/layouts/header/ProjectPageHeader";
import List from "@/components/layouts/list/List";
import CircleLoading from "@/components/render/loading/CircleLoading";
import { assignRoleToUserProject, getUsersByProject, listRoleByProject, ProjectService } from "@/service/projectService";
import { teamColumns } from "@/tabla/account/teamColumns";
import { AddUserDTO, ChangeRoleUserProjectDTO, RoleProjectDTO, TeamProjectDTO } from "@/tipos/DTOs/projectDTO";
import { ChangeRoleUserProjectFormData } from "@/tipos/projectType";
import { RowAction } from "@/tipos/table/tableType";
import { UserCheckIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProjectTeamScreen() {

    const { uuid } = useParams();
    const [team, setTeam] = useState<TeamProjectDTO[]>([]);
    const [loading, SetLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para los formularios
    const [selectedMember, setSelectedMember] = useState<TeamProjectDTO | null>(null);
    const [modalTeam, setModalTeam] = useState<boolean>(false);
    const [emailMember, setEmailMember] = useState("");
    const [selectedAccountId, setSelectedAccountId] = useState("");
    const [rolesProject, setRolesProject] = useState<RoleProjectDTO[]>([]);
    const [openRoleModal, setOpenRoleModal] = useState(false);

    const fetchTeamByProject = async () => {
        try {
            const response = await getUsersByProject(String(uuid));
            const teamProject = response.data.map((item: TeamProjectDTO) => ({
                ...item,
                rol_nombre: item?.rol_nombre || "Sin asignar",
            }));
            setTeam(teamProject);
        } catch (error: any) {
            toast.error(error.detail);
        }
    };

    const fetchRolesByProject = async () => {
        try {
            const response = await listRoleByProject(String(uuid));
            setRolesProject(response.data);
        } catch (error: any) {
            toast.error(error.detail);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            if (!uuid) return;
            SetLoading(true);
            await Promise.all([
                fetchTeamByProject(),
                fetchRolesByProject()
            ]);
            SetLoading(false);
        };
        loadData();
    }, [uuid]);

    const handleAddUserToProject = async () => {
        const payload: AddUserDTO = {
            uuid_usuario: selectedAccountId,
            uuid_proyecto: String(uuid),
        }
        try {
            setIsSubmitting(true);
            const response = await ProjectService.addUser(payload);
            toast.success(response.msg);
            await fetchTeamByProject();
            setModalTeam(false);
            setEmailMember("");
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeUserRole = async (values: ChangeRoleUserProjectFormData) => {
        if (!selectedMember) return;
        try {
            setIsSubmitting(true);
            const payload: ChangeRoleUserProjectDTO = {
                cuenta_uuid: selectedMember.uuid,
                rol_proyecto_uuid: values.rol,
                proyecto_uuid: String(uuid),
            };
            const response = await assignRoleToUserProject(payload);
            toast.success(response.msg);
            await fetchTeamByProject();
            setOpenRoleModal(false);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const actions: RowAction<TeamProjectDTO>[] = [
        {
            key: 'assignRole',
            label: () => "Asignar rol",
            icon: <UserCheckIcon size={18} strokeWidth={2.5} />,
            onClick: (item) => {
                setSelectedMember(item);
                setOpenRoleModal(true);
            },
        },
    ];

    if (loading) return <CircleLoading height="h-[60vh]" />

    return (
        <ProjectPageContainer>
            <ProjectPageHeader>
                <div className="w-full flex gap-1 justify-end">
                    <LinkButton
                        label="Crear rol"
                        href={`/home/projects/${uuid}/team/permission`}
                        showIcon
                    />
                    <AddButton
                        label="Agregar usuario"
                        onClick={() => {
                            setModalTeam(true);
                        }}
                    />
                </div>
            </ProjectPageHeader>

            <List<TeamProjectDTO>
                columns={teamColumns}
                data={team}
                actions={actions}
            />

            <FormModal
                isOpen={modalTeam}
                onClose={() => !isSubmitting && setModalTeam(false)}
                title="Añadir usuario"
            >
                <AddUserProjectForm
                    emailMember={emailMember}
                    setEmailMember={setEmailMember}
                    setSelectedAccountId={setSelectedAccountId}
                    onSubmit={handleAddUserToProject}
                    onCancel={() => setModalTeam(false)}
                    isSubmitting={isSubmitting}
                />
            </FormModal>

            <FormModal
                isOpen={openRoleModal}
                onClose={() => !isSubmitting && setOpenRoleModal(false)}
                title="Cambiar rol"
            >
                <ChangeUserRoleProjectForm
                    onSubmit={handleChangeUserRole}
                    onCancel={() => setOpenRoleModal(false)}
                    roleOptions={rolesProject}
                    textButton="Guardar"
                    projectUid={String(uuid)}
                    isSubmitting={isSubmitting}
                />
            </FormModal>

        </ProjectPageContainer>
    );
}