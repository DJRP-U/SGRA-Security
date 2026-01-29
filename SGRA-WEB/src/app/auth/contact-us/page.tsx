import ContainerPage from "@/components/layouts/container/ContainerPage";
import Detail from "@/components/text/content/Detail";
import TitlePage from "@/components/text/heading/TitlePage";
import { FanIcon, MailIcon } from "lucide-react";

export default function ContactUsPage() {
    return (
        <ContainerPage paddingTop="lg" >
            <FanIcon size={64} />
            <div className="flex flex-col items-center">
                <TitlePage>Contactate con nosotros</TitlePage>
                <Detail>Si tienes algún problema, duda o sugerencia, escríbenos al siguente correo.</Detail>
            </div>
            <div className="flex gap-2 items-center text-xl text-neutral-700 font-medium">
                <MailIcon /> <span>soporte@sgra.com</span>
            </div>
        </ContainerPage>
    );
}