import RequestAccountForm from "@/components/forms/RequestAccountForm";
import ContainerPage from "@/components/layouts/container/ContainerPage";
import TitlePage from "@/components/text/heading/TitlePage";
import TextLink from "@/components/text/links/TextLink";

export default function RequestAccountPage() {

    return (
        <ContainerPage>
            <TitlePage>Solicitud de cuenta</TitlePage>
            <RequestAccountForm />
            <TextLink 
                text="¿Ya tienes una cuenta?"
                href="/"
                linkText="Inicia sesión"
            />
        </ContainerPage>
    );
}
