"use client";
import { useState } from "react";
import List, { EmptyState } from "./List";
import { RowAction } from "@/tipos/table/tableType";
import { RequirementDTO, UpdateRequirementDTO } from "@/tipos/DTOs/requirementDTO";
import { requirementColumns } from "@/tabla/requirement/requirementsColumns";
import { FileTextIcon, HistoryIcon, PencilIcon, PlusIcon, SquarePenIcon } from "lucide-react";
import { RequirementStatus, RequirementType } from "@/enums/requirementEnum";
import FormModal from "@/components/forms/modal/FormModal";
import RequirementForm from "@/components/forms/RequirementForm";
import { RequirementFormData } from "@/tipos/requirementType";
import { Priority } from "@/enums/baseEnum";
import { RequirementService } from "@/service/requirementService";
import { toast } from "sonner";
import UserStoryForm from "@/components/forms/UserStoryForm";
import { UserStoryFormData } from "@/tipos/userStoryType";
import { CreateUserStoryDTO } from "@/tipos/DTOs/userStoryDTO";
import { UserStoryService } from "@/service/useStoryService";
import { useCookie } from "@/hooks/useCookie";
import { useRouter } from "next/navigation";
import RequirementHistoryList from "./RequirementHistoryList";
import SideModal from "@/components/modals/SideModal";
import Detail from "@/components/text/content/Detail";
import { PermissionDTO } from "@/tipos/DTOs/projectDTO";
import { hasPermission } from "@/utils/security/permission";
import { RequirementHistoryDTO } from "@/components/cards/requirement-history/RequirementHistoryCard";

interface ListRequirementProps {
    requirements: RequirementDTO[]
    isProductOwner?: boolean
    actionNotExistRequirements: () => void
    emptyState?: EmptyState
    projectUuid: string
    selectedRequirement: RequirementDTO | null
    setSelectedRequirement: (requirement: RequirementDTO | null) => void
    setModalDetailRequirement: (state: boolean) => void
    setReview: (state: boolean) => void
    permissions: PermissionDTO[]
    updateRequirements: () => void
}

export default function ListRequirement({
    requirements,
    isProductOwner = false,
    actionNotExistRequirements,
    emptyState,
    projectUuid,
    selectedRequirement,
    setSelectedRequirement,
    setModalDetailRequirement,
    setReview,
    updateRequirements,
    permissions,
}: ListRequirementProps) {

    const router = useRouter();

    const user = useCookie("user");

    const [editRequetModal, setEditRequetModal] = useState<boolean>(false);
    const [createUSModal, setCreateUSModal] = useState<boolean>(false);
    const [historyModal, setHistoryModal] = useState<boolean>(false);

    const [historyRequirement, setHistoryRequirement] = useState<RequirementHistoryDTO[]>([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasPermissionAction = (permissionName: string) => {
        return hasPermission(permissions, permissionName);
    }

    const requirementActions: RowAction<RequirementDTO>[] = [
        {
            key: "edit",
            label: () => "Editar",
            icon: <PencilIcon size={18} />,
            show: (item) => hasPermissionAction("requisito:gestion") && (item.estado === RequirementStatus.PENDING || item.estado === RequirementStatus.REJECTED),
            onClick: (item) => {
                setSelectedRequirement(item);
                setEditRequetModal(true);
            },
        },
        {
            key: "review",
            label: () => "Revisar requisito",
            icon: <SquarePenIcon size={18} />,
            show: (item) => item.estado === RequirementStatus.PENDING,
            onClick: (item) => {
                setSelectedRequirement(item);
                setModalDetailRequirement(true);
                setReview(true);
            },
        },
        {
            key: "details",
            label: () => "Ver detalles",
            icon: <FileTextIcon size={18} />,
            onClick: (item) => {
                setSelectedRequirement(item);
                setModalDetailRequirement(true);
            },
        },
        {
            key: "createUserStory",
            label: () => "Crear historia de usuario",
            icon: <PlusIcon size={18} />,
            show: (item) =>
                item.estado !== RequirementStatus.PENDING &&
                item.estado !== RequirementStatus.REJECTED &&
                item.estado !== RequirementStatus.OBSOLETE,
            onClick: (item) => {
                setSelectedRequirement(item);
                setCreateUSModal(true);
            },
        },
        {
            key: "showHistory",
            label: () => "Historial",
            icon: <HistoryIcon size={18} />,
            onClick: (item) => {
                setHistoryModal(true);
                handleHistoryRequirement(item.uuid);
            },
        },
    ];

    const startSubmitting = () => setIsSubmitting(true);
    const stopSubmitting = () => setIsSubmitting(false);
    const closeCreateUSModal = () => setCreateUSModal(false);

    const handleUpdateRequirement = async (values: RequirementFormData) => {
        startSubmitting();
        const payload: UpdateRequirementDTO = {
            ...values,
            requisito_uuid: selectedRequirement?.uuid || "",
            tipo_requisito: values.tipo_requisito as RequirementType,
            prioridad: values.prioridad as Priority,
            horas_esfuerzo_estimado: Number(values.horas_esfuerzo_estimado)
        }
        try {
            const response = await RequirementService.update(payload);
            toast.success(response.msg);
            updateRequirements();
        } catch (error: any) {
            toast.error(error.datail);
        } finally {
            setEditRequetModal(false);
            stopSubmitting();
        }
    }

    const handleCreateUserStory = async (values: UserStoryFormData) => {
        startSubmitting();
        const payload: CreateUserStoryDTO = {
            ...values,
            prioridad: values.prioridad as Priority,
            estimacion: Number(values.estimacion),
            uuid_creador: user || "",
            uuids_requisitos: [`${selectedRequirement?.uuid}`],
            uuid_responsable: ""
        }

        try {
            const response = await UserStoryService.create(payload);
            toast.success(response.msg);
            router.push(`/home/projects/${projectUuid}/backlog`)
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            stopSubmitting();
        }
    }

    const handleHistoryRequirement = async (uidRequirement: string) => {
        startSubmitting();
        try {
            const response = await RequirementService.listHistory(uidRequirement);
            setHistoryRequirement(response.data);
            console.log(response.data);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            stopSubmitting();
        }
    };

    return (
        <div>
            <List<RequirementDTO>
                data={requirements}
                columns={requirementColumns}
                actions={requirementActions}
                emptyState={emptyState}
                emptyTitle={
                    isProductOwner
                        ? "No hay requisitos creados."
                        : "No hay requisitos disponibles."
                }
                emptyDescription={
                    isProductOwner
                        ? "Crea un requisito para empezar a planificar."
                        : "Espera a que agreguen el primero."
                }
                emptyAction={
                    isProductOwner
                        ? {
                            label: "Crear requisito",
                            onClick: actionNotExistRequirements
                        }
                        : undefined
                }
            />
            <FormModal
                isOpen={editRequetModal}
                onClose={() => setEditRequetModal(false)}
                title={"Editar requisito"}
            >
                <RequirementForm
                    textButton="Guardar"
                    onCancel={() => setEditRequetModal(false)}
                    defaultValues={{
                        ...selectedRequirement,
                        tipo_requisito: selectedRequirement?.tipo as RequirementType,
                        prioridad: selectedRequirement?.prioridad as Priority,
                        horas_esfuerzo_estimado: String(selectedRequirement?.horas_esfuerzo_estimado)
                    }}
                    onSubmit={handleUpdateRequirement}
                    isSubmitting={isSubmitting}
                    edition
                />
            </FormModal>
            <FormModal
                isOpen={createUSModal}
                title="Crear historia  de usuario"
                onClose={closeCreateUSModal}
            >
                <UserStoryForm
                    textButton="Guardar"
                    onSubmit={handleCreateUserStory}
                    onCancel={closeCreateUSModal}
                    isSubmitting={isSubmitting}
                />
            </FormModal>
            <FormModal
                isOpen={historyModal}
                onClose={() => setHistoryModal(false)}
                title="Historial del requisito"
            >
                {historyRequirement.length === 0 ? (
                    <Detail>
                        No hay historial registrado para este requisito.
                    </Detail>
                ) : (
                    <RequirementHistoryList history={historyRequirement} />
                )}
            </FormModal>
        </div>
    );
}