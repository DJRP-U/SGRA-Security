"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BugIcon, CalendarCheckIcon, CheckIcon, FileTextIcon, PencilIcon, PlusIcon } from "lucide-react";

import Button from "@/components/buttons/Button";
import UserStoryDetailCard from "@/components/cards/details/UserStoryDetailCard";
import BugForm from "@/components/forms/BugForm";
import AssignSprintForm from "@/components/forms/modal/AssignSprintForm";
import FormModal from "@/components/forms/modal/FormModal";
import TaskForm from "@/components/forms/TaskForm";
import UserStoryForm from "@/components/forms/UserStoryForm";
import ProjectPageContainer from "@/components/layouts/container/ProjectPageContianer";
import ProjectPageHeader from "@/components/layouts/header/ProjectPageHeader";
import List from "@/components/layouts/list/List";
import BacklogNav from "@/components/layouts/nav/project/BacklogNav";
import UserStoryFilters from "@/components/layouts/section/UserStoryFilters";
import SideModal from "@/components/modals/SideModal";
import Pagination from "@/components/pagination/Pagination";
import CircleLoading from "@/components/render/loading/CircleLoading";

import { AccountRoleEnum } from "@/enums/accountEnum";
import { Priority } from "@/enums/baseEnum";
import { BugSeverity, BugType } from "@/enums/bugEnum";
import { SprintStatus } from "@/enums/sprintEnum";
import { UserStoryStatus } from "@/enums/userStoryEnums";
import { useCookie } from "@/hooks/useCookie";
import { BugService } from "@/service/bugService";
import { SprintService } from "@/service/sprintService";
import { TaskService } from "@/service/taskService";
import { UserStoryService } from "@/service/useStoryService";
import { userStoryColumns } from "@/tabla/user-story/requirementsColumns";
import { BugFormData } from "@/tipos/bugType";
import { CreateBugDTO } from "@/tipos/DTOs/bugDTO";
import { SprintDTO } from "@/tipos/DTOs/sprintDTO";
import { CreateTaskDTO } from "@/tipos/DTOs/taskDTO";
import { AssignSprintDTO, UpdateBaseUserStoryDTO, UpdateUserStoryDTO, UserStoryDTO } from "@/tipos/DTOs/userStoryDTO";
import { AssignSprintFormData } from "@/tipos/sprintType";
import { RowAction } from "@/tipos/table/tableType";
import { TaskFormData } from "@/tipos/taskType";
import { UserStoryFormData } from "@/tipos/userStoryType";
import { confirmAlert } from "@/utils/alerts/confirmAlert";
import { deleteAlert } from "@/utils/alerts/deleteAlert";
import { PAGE_SIZE_PAGINATION } from "@/utils/utils";
import ButtonForm from "@/components/buttons/FormButton";

export default function ProjectBacklogScreen() {
    const { uuid } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;
    const currentPrioridad = searchParams.get("prioridad") || null;
    const currentEstado = searchParams.get("estado") || null;

    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [userStories, setUserStories] = useState<UserStoryDTO[]>([]);
    const [sprints, setSprints] = useState<SprintDTO[]>([]);
    const [selectedUserStory, setSelectedUserStory] = useState<UserStoryDTO>();

    // Modales
    const [openModal, setOpenModal] = useState(false);
    const [openModalTaskForm, setOpenModalTaskForm] = useState(false);
    const [openModalBugForm, setopenModalBugForm] = useState(false);
    const [openSideModal, setSideModal] = useState(false);
    const [openModalAssignSprint, setOpenModalAssignSprint] = useState(false);

    const user = useCookie("user");
    const role = useCookie("role");

    const closeHUModal = () => setOpenModal(false);
    const closeTaskModal = () => setOpenModalTaskForm(false);

    const updateFilters = (newParams: {
        prioridad?: string | null;
        estado?: string | null;
        page?: number;
    }) => {
        const params = new URLSearchParams(searchParams.toString());
        const filterKeys: ('prioridad' | 'estado')[] = ['prioridad', 'estado'];

        filterKeys.forEach(key => {
            if (newParams[key] !== undefined) {
                if (newParams[key]) params.set(key, newParams[key] as string);
                else params.delete(key);
                params.set("page", "1");
            }
        });

        if (newParams.page) {
            params.set("page", newParams.page.toString());
        }
        router.push(`?${params.toString()}`);
    };

    const fetchUserStories = async () => {
        try {
            const response = await UserStoryService.listByProject(
                String(uuid),
                currentPage,
                PAGE_SIZE_PAGINATION,
                currentPrioridad || undefined,
                currentEstado || undefined
            );

            console.log(response.data.historias)
            setUserStories(response.data.historias.map((historia: any) => ({
                ...historia,
                creador: `${historia.creador.nombre} ${historia.creador.apellido}`,
            })));
            setTotalRecords(response.data.total);
        } catch (error: any) {
            toast.error(error.detail);
        }
    };

    const fetchSprints = async () => {
        try {
            const response = await SprintService.list(String(uuid));
            const planningSprints = response.data.filter(
                (sprint: SprintDTO) => sprint.estado === SprintStatus.PLANNING
            );
            setSprints(planningSprints);
        } catch (error: any) {
            toast.error(error.detail);
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            if (!uuid) return;
            setLoading(true);
            await Promise.all([fetchUserStories(), fetchSprints()]);
            setLoading(false);
        };
        loadInitialData();
    }, [uuid, currentPage, currentPrioridad, currentEstado]);

    const handleUpdateUserStory = async (values: UserStoryFormData) => {
        setIsSubmitting(true);
        try {
            const userStorysData: UpdateBaseUserStoryDTO = {
                ...values,
                prioridad: values.prioridad as Priority,
                estimacion: Number(values.estimacion),
            };
            const payload: UpdateUserStoryDTO = {
                uuid_historia: selectedUserStory?.uuid || "",
                uuid_creador: user || "",
                datos: userStorysData
            };
            const response = await UserStoryService.update(payload);
            toast.success(response.msg);
            await fetchUserStories();
            setOpenModal(false);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeprecateUserStory = async () => {
        if (!selectedUserStory?.uuid) return;
        const result = await deleteAlert({
            title: "Marcar historia como obsoleto",
            text: "¿Estás seguro de que quieres marcar esta historia como obsoleto?",
            cancelText: "Cancelar",
            confirmText: "Marcar obsoleto"
        });
        if (!result.isConfirmed) return;

        setIsSubmitting(true);
        try {
            const payload = {
                uuid_historia: selectedUserStory.uuid,
                nuevo_estado: UserStoryStatus.OBSOLETE
            };
            const response = await UserStoryService.changeStatus(payload);
            toast.success(response.msg);
            setSideModal(false);
            await fetchUserStories();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCompleteUserStory = async () => {
        if (!selectedUserStory?.uuid) return;

        const result = await confirmAlert({
            title: "Completar requisito",
            text: "¿Confirmas que esta historia de usuario ha sido finalizada?",
            confirmText: "Completar",
            cancelText: "Cancelar"
        });

        if (!result.isConfirmed) return;

        // 1. Iniciamos el loader de Sonner justo después de confirmar
        const toastId = toast.loading("Finalizando historia de usuario...");

        try {
            const payload = {
                uuid_historia: selectedUserStory.uuid,
                nuevo_estado: UserStoryStatus.COMPLETED
            };

            const response = await UserStoryService.changeStatus(payload);

            // 2. Transformamos el loader en éxito
            toast.success(response.msg, { id: toastId });

            await fetchUserStories();
        } catch (error: any) {
            // 3. Transformamos el loader en error
            toast.error(error.detail || "Error al completar la historia", { id: toastId });
        }
        // Ya no es necesario el finally para setIsSubmitting si no lo usas
    };

    const handlerCreateTask = async (values: TaskFormData) => {
        if (!selectedUserStory) return;
        setIsSubmitting(true);
        try {
            const payload: CreateTaskDTO = {
                ...values,
                cuenta_proyecto_uuid: "",
                estimacion_horas: Number(values.estimacion),
                fecha_limite: new Date(values.fecha_limite),
                prioridad: values.prioridad as Priority,
                historia_usuario_uuid: selectedUserStory.uuid
            };
            const response = await TaskService.create(payload);
            toast.success(response.msg);
            await fetchUserStories();
            setOpenModalTaskForm(false);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReportBug = async (values: BugFormData) => {
        if (!selectedUserStory) return;
        setIsSubmitting(true);
        try {
            const payload: CreateBugDTO = {
                ...values,
                tipo_defecto: values.tipo_defecto as BugType,
                prioridad: values.prioridad as Priority,
                severidad: values.severidad as BugSeverity,
                historia_usuario_uuid: selectedUserStory.uuid,
                fecha_limite: new Date(values.fecha_limite)
            };
            const response = await BugService.create(payload);
            toast.success(response.msg);
            setopenModalBugForm(false);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAssignSprint = async (values: AssignSprintFormData) => {
        if (!selectedUserStory) return;
        setIsSubmitting(true);
        try {
            const payload: AssignSprintDTO = {
                uuid_historia: selectedUserStory.uuid,
                uuid_sprint: values.sprint
            };
            const response = await UserStoryService.assignToSprint(payload);
            toast.success(response.msg);
            setOpenModalAssignSprint(false);
            await fetchUserStories();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const actionsUserStory: RowAction<UserStoryDTO>[] = [
        {
            key: 'updateUserStory',
            label: () => "Editar",
            icon: <PencilIcon size={18} />,
            show: (item) => item.estado === UserStoryStatus.PENDING && role === AccountRoleEnum.PRODUCT_OWNER,
            onClick: (item) => {
                setSelectedUserStory(item);
                setOpenModal(true);
            },
        },
        {
            key: 'completeUserStory',
            label: () => "Completar historia",
            icon: <CheckIcon size={18} />,
            show: (item) => item.estado === UserStoryStatus.IN_PROGRESS,
            onClick: (item) => {
                setSelectedUserStory(item);
                handleCompleteUserStory();
            }
        },
        {
            key: 'addTask',
            label: () => "Agregar tarea",
            icon: <PlusIcon size={18} />,
            show: (item) => item.estado === UserStoryStatus.IN_PROGRESS || item.estado === UserStoryStatus.PENDING,
            onClick: (item) => {
                setSelectedUserStory(item);
                setOpenModalTaskForm(true);
            }
        },
        {
            key: 'addBug',
            label: () => "Reportar defecto",
            icon: <BugIcon size={18} />,
            show: (item) => item.estado === UserStoryStatus.IN_PROGRESS || item.estado === UserStoryStatus.COMPLETED,
            onClick: (item) => {
                setSelectedUserStory(item);
                setopenModalBugForm(true);
            }
        },
        {
            key: 'assignSprint',
            label: () => "Asignar a un sprint",
            icon: <CalendarCheckIcon size={18} />,
            show: () => sprints.length !== 0,
            onClick: (item) => {
                setSelectedUserStory(item);
                setOpenModalAssignSprint(true);
            }
        },
        {
            key: 'showDetail',
            label: () => "Ver detalles",
            icon: <FileTextIcon size={18} />,
            onClick: (item) => {
                setSelectedUserStory(item);
                setSideModal(true);
            }
        },
    ];

    if (loading) return <CircleLoading height="h-[50vh]" />;

    const hasFilters = !!currentPrioridad || !!currentEstado;
    const emptyState = userStories.length === 0 ? (hasFilters ? "no-results" : "no-data") : "no-data";

    return (
        <ProjectPageContainer>
            <ProjectPageHeader>
                <UserStoryFilters
                    currentPrioridad={currentPrioridad}
                    currentEstado={currentEstado}
                    onFilterChange={updateFilters}
                />
                <BacklogNav projectUid={String(uuid)} />
            </ProjectPageHeader>

            <List<UserStoryDTO>
                data={userStories}
                columns={userStoryColumns}
                actions={actionsUserStory}
                emptyState={emptyState as any}
            />

            <Pagination
                currentPage={currentPage}
                totalRecords={totalRecords}
                pageSize={PAGE_SIZE_PAGINATION}
                onPageChange={(page) => updateFilters({ page })}
            />

            <FormModal isOpen={openModal} title="Editar historia de usuario" onClose={closeHUModal}>
                <UserStoryForm
                    textButton="Guardar"
                    onSubmit={handleUpdateUserStory}
                    onCancel={closeHUModal}
                    isSubmitting={isSubmitting}
                    defaultValues={selectedUserStory ? {
                        ...selectedUserStory,
                        estimacion: String(selectedUserStory.estimacion)
                    } : undefined}
                />
            </FormModal>

            <SideModal
                isOpen={openSideModal}
                onClose={() => setSideModal(false)}
                title={selectedUserStory?.titulo}
            >
                <UserStoryDetailCard userStory={selectedUserStory} />
                {(selectedUserStory?.estado === UserStoryStatus.PENDING || selectedUserStory?.estado === UserStoryStatus.IN_PROGRESS) && (
                    <div className="flex gap-1 justify-end mt-4">
                        <Button label="Cancelar" onClick={() => setSideModal(false)} secondary disabled={isSubmitting} />
                        <ButtonForm
                            label="Descartar"
                            onClick={handleDeprecateUserStory}
                            loading={isSubmitting}
                            className="bg-red-400 hover:bg-red-500 text-white"
                        />
                    </div>
                )}
            </SideModal>

            <FormModal title="Crear tarea" isOpen={openModalTaskForm} onClose={() => setOpenModalTaskForm(false)}>
                <TaskForm
                    onSubmit={handlerCreateTask}
                    onCancel={() => setOpenModalTaskForm(false)}
                    textButton="Guardar"
                    isSubmitting={isSubmitting}
                />
            </FormModal>

            <FormModal title="Crear defecto" isOpen={openModalBugForm} onClose={() => setopenModalBugForm(false)}>
                <BugForm
                    onSubmit={handleReportBug}
                    onCancel={() => setopenModalBugForm(false)}
                    textButton="Guardar"
                    isSubmitting={isSubmitting}
                />
            </FormModal>

            <FormModal title="Asignar Sprint" isOpen={openModalAssignSprint} onClose={() => setOpenModalAssignSprint(false)}>
                <AssignSprintForm
                    sprintOptions={sprints}
                    onSubmit={handleAssignSprint}
                    onCancel={() => setOpenModalAssignSprint(false)}
                    textButton="Guardar"
                    isSubmitting={isSubmitting}
                />
            </FormModal>
        </ProjectPageContainer>
    );
}