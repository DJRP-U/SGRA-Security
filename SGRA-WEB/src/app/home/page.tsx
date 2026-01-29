import LinkButton from "@/components/buttons/LinkButton";
import { MainContainer } from "@/components/layouts/container/MainContainer";
import HomeContent, { HomeViewState } from "@/components/screens/home/HomeScreen";
import Title from "@/components/text/heading/Title";
import { AccountRoleEnum } from "@/enums/accountEnum";
import { ProjectService } from "@/service/projectService";
import { ProjectDTO } from "@/tipos/DTOs/projectDTO";
import { cookies } from "next/headers";

export default async function HomePage() {

    const cookieStore = cookies();

    const role = (await cookieStore).get("role");
    const user = (await cookieStore).get("user");

    const response = await ProjectService.listByUser(String(user?.value));

    let projects: ProjectDTO[] = response.data;
    let numProjects = projects.length;

    const isProductOwner = String(role?.value) === AccountRoleEnum.PRODUCT_OWNER;

    const viewState: HomeViewState =
        numProjects === 0
            ? isProductOwner
                ? "EMPTY_OWNER"
                : "EMPTY_MEMBER"
            : "WITH_PROJECTS";

    return (
        <MainContainer>
            <div className="flex justify-between items-center">
                <Title>
                    Inicio
                </Title>
                {isProductOwner && numProjects > 0 && (
                    <LinkButton
                        label="Crear proyecto"
                        href="/home/projects"
                        showIcon
                    />
                )}
            </div>
            <HomeContent
                state={viewState}
                projects={projects}
            />
        </MainContainer>
    );
}
