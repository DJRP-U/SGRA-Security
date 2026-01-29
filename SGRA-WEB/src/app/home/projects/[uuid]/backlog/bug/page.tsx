"use client";
import BugDetailCard from "@/components/cards/details/BugDetailCard";
import BugForm from "@/components/forms/BugForm";
import AssignResponsibleForm from "@/components/forms/modal/AssignBugResponsibleForm";
import BugActionCommentForm from "@/components/forms/modal/BugActionCommentForm";
import ChangeStatusBugForm from "@/components/forms/modal/ChangeStatusBugForm";
import FormModal from "@/components/forms/modal/FormModal";
import ProjectPageContainer from "@/components/layouts/container/ProjectPageContianer";
import ProjectPageHeader from "@/components/layouts/header/ProjectPageHeader";
import List from "@/components/layouts/list/List";
import BacklogNav from "@/components/layouts/nav/project/BacklogNav";
import BugFilters from "@/components/layouts/section/BugFilters";
import SideModal from "@/components/modals/SideModal";
import Pagination from "@/components/pagination/Pagination";
import CircleLoading from "@/components/render/loading/CircleLoading";
import { Priority } from "@/enums/baseEnum";
import { BugSeverity, BugStatus, BugType } from "@/enums/bugEnum";
import { BugService } from "@/service/bugService";
import { columnsBug } from "@/tabla/bug/bugColumns";
import { BugFormData, ChangeStatusBugFormData } from "@/tipos/bugType";
import { AssignResponsibleDTO, BugDTO, ChangeStatusBugDTO, UpdateBugDTO } from "@/tipos/DTOs/bugDTO";
import { RowAction } from "@/tipos/table/tableType";
import { ReviewCommentFormData } from "@/tipos/taskType";
import { deleteAlert } from "@/utils/alerts/deleteAlert";
import { PAGE_SIZE_PAGINATION } from "@/utils/utils";
import { BanIcon, CheckCircleIcon, CheckIcon, EyeIcon, FileTextIcon, PencilIcon, RotateCcwIcon, UserPlusIcon, WrenchIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BugPage() {

    const { uuid } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;
    const currentTipo = searchParams.get("tipo_defecto") || null;
    const currentPrioridad = searchParams.get("prioridad") || null;
    const currentSeveridad = searchParams.get("severidad") || null;
    const currentEstado = searchParams.get("estado") || null;
    const [totalRecords, setTotalRecords] = useState(0);

    const [bugs, setBugs] = useState<BugDTO[]>([]);
    const [selectedBug, setSelectedBug] = useState<BugDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [openModalBug, setOpenModalBug] = useState<boolean>(false);
    const [openModalBugStatus, setOpenModalBugStatus] = useState<boolean>(false);

    const [openAssignModal, setOpenAssignModal] = useState(false);
    const [selectedBugUid, setSelectedBugUid] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState("");
    const [selectedUserUuid, setSelectedUserUuid] = useState("");
    const [openSideBug, setOpenSideBug] = useState(false);
    const [bugAction, setBugAction] = useState<"REOPEN" | "CANCEL" | null>(null);
    const [openBugAction, setOpenBugAction] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const closeBugDetail = () => {
        setOpenSideBug(false);
        setSelectedBug(null);
    };

    const handleOpenAssign = (bugUid: string) => {
        setSelectedBugUid(bugUid);
        setUserEmail("");
        setSelectedUserUuid("");
        setOpenAssignModal(true);
    };

    const openReopenBug = (bug: BugDTO) => {
        setSelectedBug(bug);
        setBugAction("REOPEN");
        setOpenBugAction(true);
    };

    const openCancelBug = (bug: BugDTO) => {
        setSelectedBug(bug);
        setBugAction("CANCEL");
        setOpenBugAction(true);
    };

    const closeModalBugForm = () => setOpenModalBug(false);
    const closeModalBugStatusForm = () => setOpenModalBugStatus(false);

    const updateFilters = (newParams: {
        tipo_defecto?: string | null;
        prioridad?: string | null;
        severidad?: string | null;
        estado?: string | null;
        page?: number;
    }) => {
        const params = new URLSearchParams(searchParams.toString());

        const filterKeys: ('tipo_defecto' | 'prioridad' | 'severidad' | 'estado')[] =
            ['tipo_defecto', 'prioridad', 'severidad', 'estado'];

        filterKeys.forEach(key => {
            if (newParams[key] !== undefined) {
                const value = newParams[key];
                if (value) params.set(key, value as string);
                else params.delete(key);
                params.set("page", "1");
            }
        });

        if (newParams.page) {
            params.set("page", newParams.page.toString());
        }

        router.push(`?${params.toString()}`);
    };

    const fetchBugs = async () => {
        setLoading(true);
        try {
            const response = await BugService.listByProject(
                String(uuid),
                currentPage,
                PAGE_SIZE_PAGINATION,
                currentTipo || undefined,
                currentPrioridad || undefined,
                currentSeveridad || undefined,
                currentEstado || undefined
            );
            setBugs(response.data.items);
            setTotalRecords(response.data.total);
        } catch (error: any) {
            toast.error(error.detail || "Error al cargar defectos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    useEffect(() => {
        if (!uuid) return;
        fetchBugs();
    }, [uuid, currentPage, currentTipo, currentPrioridad, currentSeveridad, currentEstado]);

    if (loading) {
        return <CircleLoading />;
    }

    const hasFilters = !!currentTipo || !!currentPrioridad || !!currentSeveridad || !!currentEstado;

    const emptyState: "no-data" | "no-results" =
        bugs.length === 0
            ? hasFilters
                ? "no-results"
                : "no-data"
            : "no-data";

    const handlerUpdateBug = async (values: BugFormData) => {
        if (!selectedBug) return;

        const payload: UpdateBugDTO = {
            titulo: values.titulo,
            descripcion_detallada: values.descripcion_detallada,
            foto: values.foto,
            tipo_defecto: values.tipo_defecto as BugType,
            prioridad: values.prioridad as Priority,
            severidad: values.severidad as BugSeverity,
            fecha_limite: new Date(values.fecha_limite),
        };

        try {
            setIsSubmitting(true);
            const response = await BugService.update(selectedBug.uuid, payload);
            toast.success(response.msg);
            closeModalBugForm();
            fetchBugs();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handlerChangeStatusBug = async (values: ChangeStatusBugFormData) => {
        if (!selectedBug) return;

        const payload: ChangeStatusBugDTO = {
            estado: values.estado as BugStatus
        }

        try {
            setIsSubmitting(true);
            const response = await BugService.changeStatus(selectedBug.uuid, payload);
            toast.success(response.msg);
            closeModalBugStatusForm();
            fetchBugs();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleStartRepairBug = async (bug: BugDTO) => {
        // 1. Iniciamos el loader de Sonner inmediatamente
        const toastId = toast.loading("Iniciando la reparación del error...");

        const payload: ChangeStatusBugDTO = {
            estado: BugStatus.EN_DESARROLLO,
        };

        try {
            const response = await BugService.changeStatus(bug.uuid, payload);

            // 2. Éxito: Transformamos el loader en un mensaje de éxito
            toast.success(response.msg, { id: toastId });

            fetchBugs();
        } catch (error: any) {
            // 3. Error: Transformamos el loader en un mensaje de error con el detalle
            toast.error(error.detail || "Error al iniciar la reparación", { id: toastId });
        }
        // El bloque finally y setIsSubmitting han sido eliminados
    };

    const handleReopenBug = async (data: ReviewCommentFormData) => {
        if (!selectedBug) return;

        const payload: ChangeStatusBugDTO = {
            estado: BugStatus.PENDIENTE,
            comentario: data.comment,
        };

        try {
            setIsSubmitting(true);
            const response = await BugService.changeStatus(selectedBug.uuid, payload);
            toast.success(response.msg);
            setOpenBugAction(false);
            fetchBugs();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelBug = async (data: ReviewCommentFormData) => {
        if (!selectedBug) return;

        const payload: ChangeStatusBugDTO = {
            estado: BugStatus.CANCELADO,
            comentario: data.comment,
        };

        try {
            setIsSubmitting(true);
            const response = await BugService.changeStatus(selectedBug.uuid, payload);
            toast.success(response.msg);
            setOpenBugAction(false);
            fetchBugs();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAssignResponsible = async () => {
        if (!selectedBugUid || !selectedUserUuid) return toast.error("Usuario no encontrado");

        const payload: AssignResponsibleDTO = {
            cuenta_proyecto_uuid: selectedUserUuid
        }

        try {
            setIsSubmitting(true);
            await BugService.assignResponsible(selectedBugUid, payload);
            toast.success("Responsable asignado correctamente");
            fetchBugs();
            setOpenAssignModal(false);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSendBugToReview = async (bug: BugDTO) => {
        // 1. Iniciamos el loader de Sonner
        const toastId = toast.loading("Enviando reporte a revisión...");

        const payload: ChangeStatusBugDTO = {
            estado: BugStatus.EN_REVISION,
        };

        try {
            const response = await BugService.changeStatus(bug.uuid, payload);

            // 2. Éxito: Transformamos el loader en éxito usando el id
            toast.success(response.msg, { id: toastId });

            fetchBugs();
        } catch (error: any) {
            // 3. Error: Transformamos el loader en error con el detalle
            toast.error(error.detail || "Error al enviar el reporte a revisión", { id: toastId });
        }
        // setIsSubmitting eliminado por completo
    };

    const handleResolved = async (bug: BugDTO) => {
        // 1. Iniciamos el loader inmediatamente
        const toastId = toast.loading("Marcando error como resuelto...");

        const payload: ChangeStatusBugDTO = {
            estado: BugStatus.RESUELTO,
        };

        try {
            const response = await BugService.changeStatus(bug.uuid, payload);

            // 2. Éxito: Transformamos el loader
            toast.success(response.msg, { id: toastId });

            fetchBugs();
        } catch (error: any) {
            // 3. Error: Transformamos el loader para mostrar el detalle
            toast.error(error.detail || "No se pudo actualizar el estado del bug", { id: toastId });
        }
        // setIsSubmitting eliminado
    };

    const actionsBug: RowAction<BugDTO>[] = [
        {
            key: 'updateUserStory',
            label: () => "Editar",
            icon: <PencilIcon size={18} />,
            show: (item) => item.estado === BugStatus.PENDIENTE,
            onClick: (item) => {
                setSelectedBug(item);
                setOpenModalBug(true);
            },
        },
        {
            key: 'assignResponsible',
            label: () => "Asignar Responsable",
            icon: <UserPlusIcon size={18} strokeWidth={2.4} />,
            show: (item) => item.estado === BugStatus.PENDIENTE,
            onClick: (item) => handleOpenAssign(item.uuid),
        },
        {
            key: 'startFix',
            label: () => "Iniciar reparación",
            icon: <WrenchIcon size={18} />,
            show: (item) => item.estado === BugStatus.ASIGNADO,
            onClick: (item) => {
                handleStartRepairBug(item);
            },
        },
        {
            key: "sendToReview",
            label: () => "Enviar a revisión",
            icon: <EyeIcon size={18} />,
            show: (item) => item.estado === BugStatus.EN_DESARROLLO,
            onClick: (item) => handleSendBugToReview(item),
        },
        {
            key: "reopenBug",
            label: () => "Reabrir defecto",
            icon: <RotateCcwIcon size={18} />,
            show: (item) => item.estado === BugStatus.EN_REVISION || item.estado === BugStatus.ATRASADO,
            onClick: (item) => {
                setSelectedBug(item);
                setBugAction("REOPEN");
                setOpenBugAction(true);
            },
        },
        {
            key: "cancelBug",
            label: () => "Cancelar defecto",
            icon: <BanIcon size={18} />,
            show: (item) => item.estado === BugStatus.EN_REVISION || item.estado === BugStatus.ATRASADO,
            onClick: (item) => {
                setSelectedBug(item);
                setBugAction("CANCEL");
                setOpenBugAction(true);
            },
        },
        {
            key: "resolveIssue",
            label: () => "Marcar como resuelto",
            show: (item) => item.estado === BugStatus.EN_REVISION,
            icon: <CheckIcon size={18} strokeWidth={2.4} />,
            onClick: (item) => {
                handleResolved(item);
            },
        },
        {
            key: "showDetails",
            label: () => "Ver detalles",
            icon: <FileTextIcon size={18} />,
            onClick: (item) => {
                setSelectedBug(item);
                setOpenSideBug(true);
            },
        },
    ];

    return (
        <ProjectPageContainer>
            <ProjectPageHeader>
                <BugFilters
                    currentTipo={currentTipo}
                    currentPrioridad={currentPrioridad}
                    currentSeveridad={currentSeveridad}
                    currentEstado={currentEstado}
                    onFilterChange={updateFilters}
                />
                <BacklogNav projectUid={String(uuid)} />
            </ProjectPageHeader>

            <List
                columns={columnsBug}
                data={bugs}
                actions={actionsBug}
                emptyState={emptyState}
            />

            <Pagination
                currentPage={currentPage}
                totalRecords={totalRecords}
                pageSize={PAGE_SIZE_PAGINATION}
                onPageChange={(page) => updateFilters({ page })}
            />

            {/* Modal: Editar Defecto */}
            <FormModal
                isOpen={openModalBug}
                onClose={() => !isSubmitting && closeModalBugForm()}
                title="Editar defecto"
            >
                <BugForm
                    onSubmit={handlerUpdateBug}
                    onCancel={closeModalBugForm}
                    textButton="Guardar"
                    isSubmitting={isSubmitting} // <-- Agregado
                    defaultValues={selectedBug || undefined}
                />
            </FormModal>

            {/* Modal: Cambiar Estado de Defecto */}
            <FormModal
                isOpen={openModalBugStatus}
                onClose={() => !isSubmitting && closeModalBugStatusForm()}
                title="Editar estado del defecto"
            >
                <ChangeStatusBugForm
                    onSubmit={handlerChangeStatusBug}
                    onCancel={closeModalBugStatusForm}
                    textButton="Guardar"
                    isSubmitting={isSubmitting} // <-- Agregado
                    defaultValues={selectedBug || undefined}
                />
            </FormModal>

            {/* Modal: Asignar Responsable */}
            <FormModal
                isOpen={openAssignModal}
                onClose={() => !isSubmitting && setOpenAssignModal(false)}
                title="Asignar responsable"
            >
                <AssignResponsibleForm
                    onSubmit={handleAssignResponsible}
                    emailMember={userEmail}
                    setEmailMember={setUserEmail}
                    setSelectedUserId={setSelectedUserUuid}
                    onCancel={() => setOpenAssignModal(false)}
                    projectUuid={String(uuid)}
                    isSubmitting={isSubmitting} // <-- Agregado
                />
            </FormModal>

            {/* SideModal: Detalles */}
            <SideModal
                isOpen={openSideBug}
                onClose={closeBugDetail}
                title={selectedBug?.titulo}
            >
                <BugDetailCard bug={selectedBug} />
            </SideModal>

            {/* SideModal: Acciones Reabrir/Cancelar */}
            <SideModal
                isOpen={openBugAction}
                onClose={() => !isSubmitting && setOpenBugAction(false)}
                title={
                    bugAction === "REOPEN"
                        ? "Reabrir defecto"
                        : "Cancelar defecto"
                }
            >
                <BugDetailCard bug={selectedBug} />
                <BugActionCommentForm
                    actionLabel={
                        bugAction === "REOPEN"
                            ? "Reabrir"
                            : "Cancelar"
                    }
                    onSubmit={
                        bugAction === "REOPEN"
                            ? handleReopenBug
                            : handleCancelBug
                    }
                    setOpen={setOpenBugAction}
                    isSubmitting={isSubmitting} // <-- Agregado
                />
            </SideModal>

        </ProjectPageContainer>
    );
}