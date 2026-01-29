"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TaskService } from "@/service/taskService";
import { PAGE_SIZE_PAGINATION } from "@/utils/utils";
import TaskFilters from "@/components/layouts/section/TaskFilters";
import Pagination from "@/components/pagination/Pagination";
import CircleLoading from "@/components/render/loading/CircleLoading";
import ProjectPageContainer from "@/components/layouts/container/ProjectPageContianer";
import ProjectPageHeader from "@/components/layouts/header/ProjectPageHeader";
import List from "@/components/layouts/list/List";
import BacklogNav from "@/components/layouts/nav/project/BacklogNav";
import FormModal from "@/components/forms/modal/FormModal";
import TaskForm from "@/components/forms/TaskForm";
import ChangeStatusTaskForm from "@/components/forms/modal/ChangeStatusTaskForm";
import { columnsTask } from "@/tabla/task/taskColumns";
import { TaskDTO, UpdateTaskDTO, ChangeStatusTaskDTO, ReviewTaskDTO } from "@/tipos/DTOs/taskDTO";
import { Priority } from "@/enums/baseEnum";
import { useCookie } from "@/hooks/useCookie";
import { RowAction } from "@/tipos/table/tableType";
import { ReviewCommentFormData, TaskFormData } from "@/tipos/taskType";
import { CheckIcon, FileTextIcon, PencilIcon, PlayIcon, RotateCcwIcon, SendIcon, UserPlusIcon } from "lucide-react";
import SideModal from "@/components/modals/SideModal";
import TaskDetailCard from "@/components/cards/details/TaskDetailCard";
import { getProjectAccount } from "@/service/projectService";
import { TaskStatus } from "@/enums/taskEnum";
import AssignResponsibleForm from "@/components/forms/modal/AssignBugResponsibleForm";
import { confirmAlert } from "@/utils/alerts/confirmAlert";
import ReviewCommentForm from "@/components/forms/modal/ReviewCommentForm";

export default function TaskPage() {
    const { uuid } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;
    const currentPrioridad = searchParams.get("prioridad") || null;
    const currentEstado = searchParams.get("estado") || null;
    const currentHU = searchParams.get("historia_usuario_uuid");

    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedTask, setSelectedTask] = useState<TaskDTO | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const user = useCookie("user");

    const [openModalTask, setOpenModalTask] = useState<boolean>(false);
    const [openSideTask, setOpenSideTask] = useState(false);
    const [openAssignModal, setOpenAssignModal] = useState(false);
    const [selectedTaskUid, setSelectedTaskUid] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState("");
    const [selectedUserUuid, setSelectedUserUuid] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateFilters = (newParams: {
        prioridad?: string | null;
        estado?: string | null;
        historia_usuario_uuid?: string | null; // Agregado
        page?: number;
    }) => {
        const params = new URLSearchParams(searchParams.toString());
        // Añadimos la nueva key a la lista de filtros
        const filterKeys: ('prioridad' | 'estado' | 'historia_usuario_uuid')[] =
            ['prioridad', 'estado', 'historia_usuario_uuid'];

        filterKeys.forEach(key => {
            if (newParams[key] !== undefined) {
                if (newParams[key]) params.set(key, newParams[key] as string);
                else params.delete(key);
                params.set("page", "1"); // Resetear a página 1 al filtrar
            }
        });

        if (newParams.page) params.set("page", newParams.page.toString());
        router.push(`?${params.toString()}`);
    };

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await TaskService.list(
                String(uuid),
                currentPage,
                PAGE_SIZE_PAGINATION,
                currentPrioridad || undefined,
                currentEstado || undefined,
                currentHU || undefined // Nuevo argumento enviado al backend
            );
            if (response.data) {
                const tareasConNombre = (response.data.tareas || []).map((task: TaskDTO) => ({
                    ...task,
                    responsable_nombre_completo: task.responsable
                        ? `${task.responsable.nombre} ${task.responsable.apellido}`
                        : "No asignado",
                }));
                setTasks(tareasConNombre);
                setTotalRecords(response.data.total || 0);
            }
        } catch (error: any) {
            toast.error(error.detail || "Error al cargar tareas");
        } finally {
            setLoading(false);
        }
    };

    // 4. No olvides actualizar las dependencias del useEffect
    useEffect(() => {
        if (uuid) fetchTasks();
    }, [uuid, currentPage, currentPrioridad, currentEstado, currentHU]);

    const handleOpenAssign = () => {
        setUserEmail("");
        setSelectedUserUuid("");
        setOpenAssignModal(true);
    };

    if (loading) return <CircleLoading height="h-[50vh]" />;

    const closeTaskDetail = () => {
        setOpenSideTask(false);
        setSelectedTask(null);
    };

    const hasFilters = !!currentPrioridad || !!currentEstado;
    const emptyState: "no-data" | "no-results" =
        tasks.length === 0
            ? (hasFilters ? "no-results" : "no-data")
            : "no-data";

    const handlerUpdateTask = async (values: TaskFormData) => {
        if (!selectedTask) return;
        try {
            setIsSubmitting(true);
            const projectAccount = await getProjectAccount(String(user), String(uuid));
            const payload: UpdateTaskDTO = {
                ...values,
                responsable_cambio_uuid: projectAccount.uuid,
                fecha_limite: values.fecha_limite ? new Date(values.fecha_limite) : undefined,
                prioridad: values.prioridad as Priority,
                cuenta_proyecto_uuid: selectedTask.cuenta_proyecto_uuid
            };
            const response = await TaskService.update(selectedTask.uuid, payload);
            toast.success(response.msg);
            setOpenModalTask(false);
            fetchTasks();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStartTask = async (task: TaskDTO) => {
        const result = await confirmAlert({
            title: "Iniciar tarea",
            text: "¿Estás seguro de iniciar el progreso de esta tarea?",
            confirmText: "Iniciar",
            cancelText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        // 1. Iniciamos el loader de Sonner
        const toastId = toast.loading("Iniciando tarea...");

        try {
            // Obtenemos los datos necesarios (puedes envolver esto también en el try para capturar errores de cuenta)
            const projectAccount = await getProjectAccount(String(user), String(uuid));

            const response = await TaskService.startProgress(
                task.uuid,
                projectAccount.uuid
            );

            // 2. Éxito: Transformamos el toast
            toast.success(response.msg, { id: toastId });

            // Refrescamos la lista de tareas
            fetchTasks();
        } catch (error: any) {
            // 3. Error: Transformamos el toast
            toast.error(error.detail || "Error al iniciar la tarea", { id: toastId });
        }
    };

    const handlerAssignTaskResponsible = async () => {
        if (!selectedTask) return;

        try {
            setIsSubmitting(true);
            const projectAccount = await getProjectAccount(String(user), String(uuid));
            const payload: UpdateTaskDTO = {
                cuenta_proyecto_uuid: selectedUserUuid,
                responsable_cambio_uuid: projectAccount.uuid
            };
            const response = await TaskService.update(selectedTask.uuid, payload);
            toast.success(response.msg);
            fetchTasks();
            setOpenAssignModal(false);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleSendToReview = async (task: TaskDTO) => {
        const result = await confirmAlert({
            title: "Enviar a revisión",
            text: "¿Estás seguro de enviar la tarea a revisión?",
            confirmText: "Enviar",
            cancelText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        // 1. Iniciamos el loader de Sonner
        const toastId = toast.loading("Enviando tarea a revisión...");

        try {
            // Obtenemos la cuenta del proyecto
            const projectAccount = await getProjectAccount(String(user), String(uuid));

            // Enviamos a revisión
            const response = await TaskService.sendToReview(task.uuid, projectAccount.uuid);

            // 2. Éxito: Transformamos el toast existente
            toast.success(response.msg, { id: toastId });

            fetchTasks();
        } catch (error: any) {
            // 3. Error: Transformamos el toast para mostrar el detalle del fallo
            toast.error(error.detail || "Error al enviar a revisión", { id: toastId });
        }
        // Eliminado setIsSubmitting y el bloque finally
    };

    const handleSendToCorrection = async (values: ReviewCommentFormData) => {
        if (!selectedTask || !user) return;

        const result = await confirmAlert({
            title: "Enviar comentario",
            text: "Se enviará un comentario indicando que faltan correcciones en la tarea.",
            confirmText: "Enviar",
            cancelText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        try {
            setIsSubmitting(true);
            const projectAccount = await getProjectAccount(
                String(user),
                String(uuid)
            );
            const payload: ReviewTaskDTO = {
                aprobado: false,
                comentario: values.comment,
                responsable_cambio_uuid: projectAccount.uuid,
            };
            const response = await TaskService.review(selectedTask.uuid, payload);
            toast.success(response.msg);
            setOpenSideTask(false);
            fetchTasks();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCompleteTask = async (task: TaskDTO) => {
        if (!user) return;

        const result = await confirmAlert({
            title: "Completar tarea",
            text: "¿Estás seguro de marcar esta tarea como completada?",
            confirmText: "Completar",
            cancelText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        // 1. Iniciamos el loader de Sonner
        const toastId = toast.loading("Registrando finalización de tarea...");

        try {
            const projectAccount = await getProjectAccount(
                String(user),
                String(uuid)
            );

            const payload: ReviewTaskDTO = {
                aprobado: true,
                responsable_cambio_uuid: projectAccount.uuid,
                comentario: ""
            };

            const response = await TaskService.review(task.uuid, payload);

            // 2. Éxito: Transformamos el toast con el mensaje del servidor
            toast.success(response.msg || "Tarea completada exitosamente", { id: toastId });

            fetchTasks();
        } catch (error: any) {
            // 3. Error: Transformamos el toast para mostrar el fallo
            toast.error(
                error?.detail || "Error al completar la tarea",
                { id: toastId }
            );
        }
        // El bloque finally y setIsSubmitting han sido eliminados
    };


    const handlerChangeStatusTask = async (values: any) => {
        if (!selectedTask) return;

        try {
            setIsSubmitting(true);
            const payload: ChangeStatusTaskDTO = {
                ...values,
                responsable_cambio_uuid: String(user)
            };
            const response = await TaskService.changeStatus(selectedTask.uuid, payload);
            toast.success(response.msg);
            fetchTasks();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const actionsTask: RowAction<TaskDTO>[] = [
        {
            key: "updateTask",
            label: () => "Editar",
            icon: <PencilIcon size={16} />,
            show: (item) =>
                item.estado === TaskStatus.PENDING ||
                item.estado === TaskStatus.PENDING_REVIEW,
            onClick: (item) => {
                setSelectedTask(item);
                setOpenModalTask(true);
            },
        },
        {
            key: "assignResponsible",
            label: () => "Asignar responsable",
            show: (item) =>
                item.estado === TaskStatus.PENDING ||
                item.estado === TaskStatus.PENDING_REVIEW,
            icon: <UserPlusIcon size={18} strokeWidth={2.4} />,
            onClick: (item) => {
                setSelectedTask(item);
                handleOpenAssign();
            },
        },
        {
            key: "startTask",
            label: () => "Iniciar tarea",
            icon: <PlayIcon size={16} />,
            show: (item) => item.estado === TaskStatus.ASSIGNED || item.estado === TaskStatus.CHANGES_REQUIRED,
            onClick: (item) => handleStartTask(item),
        },
        {
            key: "sendToReview",
            label: () => "Pasar a revisión",
            icon: <SendIcon size={16} />,
            show: (item) => item.estado === TaskStatus.IN_PROGRESS,
            onClick: (item) => handleSendToReview(item),
        },
        {
            key: "requestChanges",
            label: () => "Solicitar ajustes",
            icon: <RotateCcwIcon size={16} strokeWidth={2.4} />,
            show: (item) => item.estado === TaskStatus.PENDING_REVIEW,
            onClick: (item) => {
                setSelectedTask(item);
                setOpenSideTask(true);
            },
        }, {
            key: "completeTask",
            label: () => "Completar tarea",
            icon: <CheckIcon size={16} strokeWidth={2.4} />,
            show: (item) => item.estado === TaskStatus.PENDING_REVIEW,
            onClick: (item) => handleCompleteTask(item),
        },
        {
            key: "showDetails",
            label: () => "Ver detalles",
            icon: <FileTextIcon size={18} />,
            onClick: (item) => {
                setSelectedTask(item);
                setOpenSideTask(true);
            },
        }
    ];

    return (
        <ProjectPageContainer>
            <ProjectPageHeader>
                <TaskFilters
                    currentPrioridad={currentPrioridad}
                    currentEstado={currentEstado}
                    onFilterChange={updateFilters}
                    currentHU={currentHU}
                    projectId={String(uuid)}
                />
                <BacklogNav projectUid={String(uuid)} />
            </ProjectPageHeader>

            <List
                columns={columnsTask}
                data={tasks}
                actions={actionsTask}
                emptyState={emptyState}
            />

            <Pagination
                totalRecords={totalRecords}
                pageSize={PAGE_SIZE_PAGINATION}
            />

            <FormModal
                isOpen={openModalTask}
                onClose={() => !isSubmitting && setOpenModalTask(false)}
                title="Editar tarea"
            >
                <TaskForm
                    onSubmit={handlerUpdateTask}
                    onCancel={() => setOpenModalTask(false)}
                    textButton="Guardar"
                    isSubmitting={isSubmitting}
                    defaultValues={{
                        ...selectedTask,
                        fecha_limite: selectedTask?.fecha_limite ? new Date(selectedTask.fecha_limite).toISOString().split('T')[0] : undefined,
                        estimacion: String(selectedTask?.estimacion_horas || "")
                    }}
                    edition
                />
            </FormModal>

            <SideModal
                isOpen={openSideTask}
                onClose={closeTaskDetail}
                title={selectedTask?.titulo}
            >
                <TaskDetailCard task={selectedTask || null} />

                {selectedTask?.estado === TaskStatus.PENDING_REVIEW && (
                    <ReviewCommentForm
                        setOpen={setOpenSideTask}
                        onSubmit={handleSendToCorrection}
                        isSubmitting={isSubmitting}
                    />
                )}
            </SideModal>

            <FormModal
                isOpen={openAssignModal}
                onClose={() => !isSubmitting && setOpenAssignModal(false)}
                title="Asignar responsable"
            >
                <AssignResponsibleForm
                    onSubmit={handlerAssignTaskResponsible}
                    emailMember={userEmail}
                    setEmailMember={setUserEmail}
                    setSelectedUserId={setSelectedUserUuid}
                    onCancel={() => setOpenAssignModal(false)}
                    projectUuid={String(uuid)}
                    isSubmitting={isSubmitting} // <-- Agregado
                />
            </FormModal>
        </ProjectPageContainer>
    );
}