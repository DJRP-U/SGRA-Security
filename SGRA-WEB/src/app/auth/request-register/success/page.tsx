import LinkButton from "@/components/buttons/LinkButton";
import ContainerPage from "@/components/layouts/container/ContainerPage";
import Detail from "@/components/text/content/Detail";
import TitlePage from "@/components/text/heading/TitlePage";
import { MailCheck } from "lucide-react";

export default function SuccesRequestAccountPage() {
    
    return (
        <ContainerPage paddingTop="lg">
            <MailCheck
                className="text-neutral-700"
                size={64}
            />
            <div className="text-center flex flex-col gap-2">
                <TitlePage>
                    ¡Solicitud Enviada con Éxito!
                </TitlePage>
                <div>
                    <Detail>
                        Tu solicitud de cuenta ha sido enviada correctamente.
                    </Detail>
                    <Detail>
                        Por favor, espera a que un administrador la revise y acepte.
                    </Detail>
                </div>
            </div>
            <LinkButton
                className="w-full"
                href="/"
                label="Regresar al inicio"
            />
        </ContainerPage>
    );
}
