"use client";
import AddButton from "@/components/buttons/AddButton";
import LinkButton from "@/components/buttons/LinkButton";
import FormModal from "@/components/forms/modal/FormModal";
import SprintForm from "@/components/forms/SprintForm";
import ProjectPageContainer from "@/components/layouts/container/ProjectPageContianer";
import ProjectPageHeader from "@/components/layouts/header/ProjectPageHeader";
import ListSprint from "@/components/layouts/list/ListSprint";
import FilterSection from "@/components/page/FilterSection";
import CircleLoading from "@/components/render/loading/CircleLoading";
import { AccountRoleEnum } from "@/enums/accountEnum";
import { SprintStatus } from "@/enums/sprintEnum";
import { useCookie } from "@/hooks/useCookie";
import { SprintService } from "@/service/sprintService";
import { ChangeSprintStatusDTO, CreateSprintDTO, SprintDTO, UpdateSprintDTO } from "@/tipos/DTOs/sprintDTO";
import { SprintFormData } from "@/tipos/sprintType";
import { RowAction } from "@/tipos/table/tableType";
import { deleteAlert } from "@/utils/alerts/deleteAlert";
import { CheckCircleIcon, FileTextIcon, PencilIcon, PlayIcon, Trash2Icon, XCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type SprintFormMode = "create" | "edit";

export default function ProjectSprintsScreen() {
    const { uuid } = useParams();
    const router = useRouter();
    const [sprints, setSprints] = useState<SprintDTO[]>([]);
    const [selectedSprint, setSelectedSprint] = useState<SprintDTO | undefined>();
    const [mode, setMode] = useState<SprintFormMode>("create");
    const [loading, SetLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para los formularios
    const [openModalSprintForm, setOpenModalSprintForm] = useState<boolean>(false);
    const role = useCookie("role");

    const closeModalSprint = () => {
        if (isSubmitting) return;
        setOpenModalSprintForm(false);
    };

    const fetchSprints = async () => {
        try {
            const response = await SprintService.list(String(uuid));
            setSprints(response.data);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            SetLoading(false);
        }
    }

    useEffect(() => {
        if (!uuid) return;
        fetchSprints();
    }, [uuid]);

    const handlerCreateSprint = async (values: SprintFormData) => {
        const payload: CreateSprintDTO = {
            ...values,
            fecha_inicio: new Date(values.fecha_inicio),
            fecha_fin: new Date(values.fecha_fin),
            uuid_proyecto: String(uuid),
        };

        try {
            setIsSubmitting(true);
            const response = await SprintService.create(payload);
            toast.success(response.msg);
            await fetchSprints();
            closeModalSprint();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlerUpdateSprint = async (values: SprintFormData) => {
        if (!selectedSprint) return;

        const payload: UpdateSprintDTO = {
            ...values,
            fecha_inicio: new Date(values.fecha_inicio),
            fecha_fin: new Date(values.fecha_fin)
        };

        try {
            setIsSubmitting(true);
            const response = await SprintService.update(selectedSprint.uuid, payload);
            toast.success(response.msg);
            await fetchSprints();
            closeModalSprint();
            setSelectedSprint(undefined);
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlerDeleteSprint = async (sprint: SprintDTO) => {
        const result = await deleteAlert({ title: "Eliminar sprint" });

        if (!result.isConfirmed) return;

        try {
            setIsSubmitting(true);
            const response = await SprintService.delete(sprint.uuid);
            toast.success(response.msg);
            await fetchSprints();
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateStatus = async (uidSprint: string, newStatus: SprintStatus) => {
        // 1. Iniciamos el loader de Sonner
        const toastId = toast.loading("Actualizando el estado del sprint...");

        try {
            const payload: ChangeSprintStatusDTO = {
                estado: newStatus
            };

            const response = await SprintService.changeStatus(uidSprint, payload);

            // 2. Éxito: Transformamos el loader en éxito con el mensaje de la API
            toast.success(response.msg, { id: toastId });

            // Refrescamos los datos en segundo plano
            await fetchSprints();
        } catch (error: any) {
            // 3. Error: Transformamos el loader en error con el detalle del fallo
            toast.error(error.detail || "No se pudo actualizar el estado del sprint", { id: toastId });
        }
        // El bloque finally y setIsSubmitting han sido eliminados
    };

    const actionsSprint: RowAction<SprintDTO>[] = [
        {
            key: 'updateSprint',
            label: () => "Editar",
            icon: <PencilIcon size={18} />,
            onClick: (item) => {
                setMode("edit");
                setSelectedSprint(item);
                setOpenModalSprintForm(true);
            },
        },
        {
            key: "deleteSprint",
            label: () => "Eliminar",
            icon: <Trash2Icon size={18} />,
            onClick: (item) => {
                handlerDeleteSprint(item);
            },
        },
        {
            key: "startSprint",
            label: () => "Iniciar Sprint",
            icon: <PlayIcon size={18} />,
            show: (item) => item.estado === SprintStatus.PLANNING,
            onClick: (item) => handleUpdateStatus(item.uuid, SprintStatus.IN_PROGRESS),
        },
        {
            key: "completeSprint",
            label: () => "Completar Sprint",
            icon: <CheckCircleIcon size={18} />,
            show: (item) => item.estado === SprintStatus.IN_PROGRESS,
            onClick: (item) => handleUpdateStatus(item.uuid, SprintStatus.DONE),
        },
        {
            key: "cancelSprint",
            label: () => "Cancelar Sprint",
            icon: <XCircleIcon size={18} />,
            show: (item) => item.estado === SprintStatus.IN_PROGRESS,
            onClick: (item) => handleUpdateStatus(item.uuid, SprintStatus.CANCELED),
        },
        {
            key: "showHuSprint",
            label: () => "Ver historias de usuario",
            icon: <FileTextIcon size={18} />,
            onClick: (item) => {
                router.push(`/home/projects/${uuid}/sprints/${item.uuid}`);
            },
        },
    ];

    const isProductOwner = role === AccountRoleEnum.PRODUCT_OWNER;
    const hasSprints = sprints.length > 0;

    const mapSprintToFormData = (
        sprint?: SprintDTO
    ): Partial<SprintFormData> | undefined => {
        if (!sprint) return undefined;

        return {
            nombre: sprint.nombre,
            objetivo: sprint.objetivo,
            fecha_inicio: sprint.fecha_inicio
                ? new Date(sprint.fecha_inicio).toISOString().split("T")[0]
                : undefined,
            fecha_fin: sprint.fecha_fin
                ? new Date(sprint.fecha_fin).toISOString().split("T")[0]
                : undefined,
        };
    };

    if (loading) {
        return <CircleLoading height="h-[50vh]" />
    }

    return (
        <ProjectPageContainer>
            <ProjectPageHeader>
                {isProductOwner && hasSprints && (
                    <div className="flex justify-end w-full">
                        <AddButton
                            label="Crear sprint"
                            onClick={() => {
                                setMode("create");
                                setSelectedSprint(undefined);
                                setOpenModalSprintForm(true);
                            }}
                        />
                    </div>
                )}
            </ProjectPageHeader>
            <ListSprint
                sprints={sprints}
                actionsSprint={actionsSprint}
                isProductOwner={isProductOwner}
                actionNotExistSprints={() => setOpenModalSprintForm(true)}
            />
            <FormModal
                title={mode === "create" ? "Crear sprint" : "Editar sprint"}
                isOpen={openModalSprintForm}
                onClose={closeModalSprint}
            >
                <SprintForm
                    textButton={"Guardar"}
                    onSubmit={mode === "create" ? handlerCreateSprint : handlerUpdateSprint}
                    onCancel={closeModalSprint}
                    isSubmitting={isSubmitting} // Prop de carga
                    defaultValues={
                        mode === "edit"
                            ? mapSprintToFormData(selectedSprint)
                            : undefined
                    }
                />
            </FormModal>
        </ProjectPageContainer>
    );
}