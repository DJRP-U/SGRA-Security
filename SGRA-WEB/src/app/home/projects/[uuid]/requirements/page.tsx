"use client";
import AddButton from "@/components/buttons/AddButton";
import RequirementDetailCard from "@/components/cards/details/RequirementDetailCard";
import DeprecateRequirementForm from "@/components/forms/modal/DeprecateRequirementForm";
import FormModal from "@/components/forms/modal/FormModal";
import RequirementForm from "@/components/forms/RequirementForm";
import ProjectPageContainer from "@/components/layouts/container/ProjectPageContianer";
import ProjectPageHeader from "@/components/layouts/header/ProjectPageHeader";
import ListRequirement from "@/components/layouts/list/ListRequirement";
import RequirementFilters from "@/components/layouts/section/RequirementFilters";
import SideModal from "@/components/modals/SideModal";
import Pagination from "@/components/pagination/Pagination";
import CircleLoading from "@/components/render/loading/CircleLoading";
import { AccountRoleEnum } from "@/enums/accountEnum";
import { Priority } from "@/enums/baseEnum";
import { RequirementStatus, RequirementType } from "@/enums/requirementEnum";
import { useCookie } from "@/hooks/useCookie";
import { getPermissionsByUserProject } from "@/service/projectService";
import { RequirementService } from "@/service/requirementService";
import { PermissionDTO } from "@/tipos/DTOs/projectDTO";
import { ApproveOrRejectRequirementDTO, CreateRequirementDTO, RequirementChangeStatusDTO, RequirementDTO } from "@/tipos/DTOs/requirementDTO";
import { deprecateRequirementFormData, RequirementFormData } from "@/tipos/requirementType";
import { confirmAlert } from "@/utils/alerts/confirmAlert";
import { deleteAlert } from "@/utils/alerts/deleteAlert";
import { PAGE_SIZE_PAGINATION } from "@/utils/utils";
import { useParams, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProjectDetailRequirementsScreen() {

    const { uuid } = useParams();

    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const currentTipo = searchParams.get("tipo") || "";
    const currentPrioridad = searchParams.get("prioridad") || null;
    const currentEstado = searchParams.get("estado") || null;
    const [totalRecords, setTotalRecords] = useState(0);

    const [createRequirementModal, setCreateRequirementModal] = useState(false);
    const [openSide, setOpenSide] = useState(false);
    const [requirements, setRequirements] = useState<RequirementDTO[]>([]);
    const [permissions, setPermissions] = useState<PermissionDTO[]>([]);
    const [reloadKey, setReloadKey] = useState(0);

    const [loading, setLoading] = useState(true);
    const [loadingPermissions, setLoadingPermissions] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isReview, setIsReview] = useState(false);

    const role = useCookie("role");
    const user = useCookie("user");

    const [selectedRequirement, setSelectedRequirement] = useState<RequirementDTO | null>(null);

    const openModalRequirement = () => setCreateRequirementModal(true);
    const closeModalRequirement = () => setCreateRequirementModal(false);

    useEffect(() => {
        if (!user) return;
        fetchPermissions();
    }, [user]);

    useEffect(() => {
        if (!uuid) return;
        fetchRequirements();
    }, [uuid, currentPage, currentTipo, currentPrioridad, currentEstado, reloadKey]);

    const handleRefetch = () => {
        setReloadKey(prev => prev + 1);
    };

    const fetchPermissions = async () => {
        setLoadingPermissions(true);
        try {
            const response = await getPermissionsByUserProject(String(user), String(uuid));
            setPermissions(response);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setLoadingPermissions(false);
        }
    }

    const fetchRequirements = async () => {
        setLoading(true);
        try {
            const response = await RequirementService.listByProject(
                String(uuid),
                currentPage,
                PAGE_SIZE_PAGINATION,
                currentTipo || undefined,
                currentPrioridad || undefined,
                currentEstado || undefined
            );
            setRequirements(response.data.requisitos);
            setTotalRecords(response.data.total);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setLoading(false);
        }
    };

    if (loading || loadingPermissions) {
        return <CircleLoading height="h-[50vh]" />
    }

    const handleCreateRequirement = async (values: RequirementFormData) => {
        setIsSubmitting(true);
        const payload: CreateRequirementDTO = {
            ...values,
            proyecto_uuid: String(uuid),
            tipo_requisito: values.tipo_requisito as RequirementType,
            prioridad: values.prioridad as Priority,
            horas_esfuerzo_estimado: Number(values.horas_esfuerzo_estimado),
        }

        try {
            const response = await RequirementService.create(payload);
            toast.success(response.msg);
            fetchRequirements();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            closeModalRequirement();
            setIsSubmitting(false);
        }
    }

    const handleDeprecateRequirement = async (values: deprecateRequirementFormData) => {

        setIsSubmitting(true);

        if (!selectedRequirement) return;

        if (values.action !== "OBSOLETE") {
            const payload: ApproveOrRejectRequirementDTO = {
                motivo_rechazo: values.reason,
                requisito_uuid: selectedRequirement.uuid,
                aprobar: values.action === "APPROVE"
            };

            let result;

            if (values.action === "APPROVE") {
                result = await confirmAlert({
                    title: "Aprobar requisito",
                    text: "¿Estás seguro de aprobar este requisito?",
                    confirmText: "Aprobar",
                    cancelText: "Cancelar",
                });
            } else {
                result = await deleteAlert({
                    title: "Rechazar requisito",
                    text: "¿Estás seguro de rechazar este requisito?",
                    confirmText: "Rechazar",
                    cancelText: "Cancelar",
                });
            }

            if (!result.isConfirmed) {
                setIsSubmitting(false);
                return;
            }
            try {
                const reponse = await RequirementService.respondApproval(payload);
                toast.success(reponse.msg);
                fetchRequirements();
            } catch (error: any) {
                toast.error(error.detail ?? "Error al procesar la solicitud");
            } finally {
                setOpenSide(false);
                setIsSubmitting(false);
            }
            return;
        }


        const payload: RequirementChangeStatusDTO = {
            requisito_uuid: selectedRequirement.uuid,
            nuevo_estado: RequirementStatus.OBSOLETE,
            razon_obsoleto: values.reason,
        }

        const result = await deleteAlert({
            title: "Marcar requisito como obsoleto",
            text: "¿Estás seguro de que quieres marcar este requisito como obsoleto?",
            cancelText: "Cancelar",
            confirmText: "Marcar como obsoleto"
        });

        if (!result.isConfirmed) {
            setIsSubmitting(false);
            return;
        }

        try {
            await RequirementService.changeStatus(payload);
            toast.success("Requisito eliminado correctamente");
            setOpenSide(false);
            fetchRequirements();
        } catch (error: any) {
            toast.error(error.datail);
        } finally {
            setIsSubmitting(false);
        }
    }

    const hasFilters = !!currentTipo || !!currentPrioridad || !!currentEstado;

    const emptyState: "no-data" | "no-results" =
        requirements.length === 0
            ? hasFilters
                ? "no-results"
                : "no-data"
            : "no-data";

    const isProductOwner = role === AccountRoleEnum.PRODUCT_OWNER;

    const hasRequirements = requirements.length || 0 > 0;

    const showCreateButton = isProductOwner && (hasRequirements || emptyState === "no-results");

    return (
        <ProjectPageContainer>
            <ProjectPageHeader>
                <RequirementFilters />
                {showCreateButton && (
                    <AddButton
                        label="Crear requisito"
                        onClick={openModalRequirement}
                    />
                )}
            </ProjectPageHeader>
            <ListRequirement
                requirements={requirements}
                isProductOwner={isProductOwner}
                actionNotExistRequirements={openModalRequirement}
                selectedRequirement={selectedRequirement}
                setSelectedRequirement={setSelectedRequirement}
                setModalDetailRequirement={setOpenSide}
                projectUuid={String(uuid)}
                emptyState={emptyState}
                permissions={permissions}
                setReview={setIsReview}
                updateRequirements={handleRefetch}
            />
            <Pagination
                totalRecords={totalRecords}
                pageSize={PAGE_SIZE_PAGINATION}
            />
            <FormModal
                isOpen={createRequirementModal}
                onClose={closeModalRequirement}
                title={"Crear requisito"}
            >
                <RequirementForm
                    textButton="Guardar"
                    onCancel={closeModalRequirement}
                    onSubmit={handleCreateRequirement}
                    isSubmitting={isSubmitting}
                />
            </FormModal>
            <SideModal
                isOpen={openSide}
                onClose={() => setOpenSide(false)}
                title={selectedRequirement?.nombre}
            >
                <RequirementDetailCard
                    requirement={selectedRequirement}
                />
                {isReview && (
                    <DeprecateRequirementForm
                        setOpen={setOpenSide}
                        onSubmit={handleDeprecateRequirement}
                        textButton="Obsoleto"
                        isSubmitting={isSubmitting}
                    />
                )}
            </SideModal>
        </ProjectPageContainer>
    );
}
