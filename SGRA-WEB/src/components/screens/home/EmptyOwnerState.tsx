import LinkButton from "@/components/buttons/LinkButton";
import Detail from "@/components/text/content/Detail";
import Title from "@/components/text/heading/Title";

export default function EmptyOwnerState() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6">
            <div className="flex flex-col gap-1">
                <Title>Aún no tienes proyectos creados.</Title>
                <Detail>
                    Crea tu primer proyecto para comenzar a gestionar requisitos y tareas.
                </Detail>
            </div>
            <LinkButton
                label="Crear proyecto"
                href="/home/projects"
                showIcon
            />
        </div>
    );
}
