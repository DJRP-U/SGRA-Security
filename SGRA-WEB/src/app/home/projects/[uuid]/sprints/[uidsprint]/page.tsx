"use client";
import LinkButton from "@/components/buttons/LinkButton";
import ProjectPageContainer from "@/components/layouts/container/ProjectPageContianer";
import ProjectPageHeader from "@/components/layouts/header/ProjectPageHeader";
import List from "@/components/layouts/list/List";
import FilterSection from "@/components/page/FilterSection";
import CircleLoading from "@/components/render/loading/CircleLoading";
import { UserStoryService } from "@/service/useStoryService";
import { userStoryColumns } from "@/tabla/user-story/requirementsColumns";
import { UserStoryDTO } from "@/tipos/DTOs/userStoryDTO";
import { RowAction } from "@/tipos/table/tableType";
import { deleteAlert } from "@/utils/alerts/deleteAlert";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserStoryBySprintPage() {
    const { uuid, uidsprint } = useParams();
    const [userStories, setUserStories] = useState<UserStoryDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUserStories = async () => {
        try {
            const response = await UserStoryService.listBySprint(String(uidsprint));
            const historiasMapeadas = response.data.map((us: any) => ({
                ...us,
                creador: `${us.creador.nombre} ${us.creador.apellido}`,
            }));
            setUserStories(historiasMapeadas);
        } catch (error: any) {
            toast.error(error.detail);
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            if (!uuid) return;
            setLoading(true);
            try {
                await fetchUserStories();
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, [uuid]);

    const handleRemoveFromSprint = async (userStory: UserStoryDTO) => {
        const result = await deleteAlert({
            title: "¿Quitar del Sprint?",
            text: `La historia "${userStory.titulo}" volverá al backlog.`
        });
        if (!result.isConfirmed) return;
        try {
            const payload = {
                uuid_historia: userStory.uuid,
                uuid_sprint: String(uidsprint)
            };
            const response = await UserStoryService.removeFromSprint(payload);
            toast.success(response.msg);
            fetchUserStories();
        } catch (error: any) {
            toast.error(error.detail);
        }
    };

    const actionsUserStory: RowAction<UserStoryDTO>[] = [
        {
            key: 'removeFromSprint',
            label: () => "Quitar del sprint",
            onClick: (item) => handleRemoveFromSprint(item),
        }
    ];

    if (loading) {
        return <CircleLoading height="h-[50vh]" />;
    }

    return (
        <ProjectPageContainer>
            <ProjectPageHeader>
                <FilterSection placeholder="Buscar historia de usuario" />
                <LinkButton href={`/home/projects/${uuid}/sprints`} label="Regresar a la lista de sprints" />
            </ProjectPageHeader>
            <List<UserStoryDTO>
                data={userStories}
                columns={userStoryColumns}
                actions={actionsUserStory}
            />
        </ProjectPageContainer>
    );
}