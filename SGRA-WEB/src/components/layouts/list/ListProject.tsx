import ProjectCard from "@/components/cards/ProjectCard";
import SectionTitle from "@/components/text/heading/SectionTitle";
import { ProjectDTO } from "@/tipos/DTOs/projectDTO";

export default function ProjectsList({ projects }: { projects: ProjectDTO[] }) {
    return (
        <div className="flex flex-col gap-2">
            <SectionTitle>Proyectos</SectionTitle>
            <div className="flex gap-4 flex-wrap">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        uuid={project.uuid}
                        title={project.nombre}
                        code={project.codigo}
                        status={project.estado}
                    />
                ))}
            </div>
        </div>
    );
}
