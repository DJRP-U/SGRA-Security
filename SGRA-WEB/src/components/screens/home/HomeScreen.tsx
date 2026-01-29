import { ProjectDTO } from "@/tipos/DTOs/projectDTO";
import EmptyOwnerState from "./EmptyOwnerState";
import EmptyMemberState from "./EmptyMemberState";
import ProjectsList from "@/components/layouts/list/ListProject";

export type HomeViewState =
    | "EMPTY_OWNER"
    | "EMPTY_MEMBER"
    | "WITH_PROJECTS";


export default function HomeContent({
    state,
    projects,
}: {
    state: HomeViewState;
    projects: ProjectDTO[];
}) {
    switch (state) {
        case "EMPTY_OWNER":
            return <EmptyOwnerState />;
        case "EMPTY_MEMBER":
            return <EmptyMemberState />;
        case "WITH_PROJECTS":
            return <ProjectsList projects={projects} />;
        default:
            return null;
    }
}
