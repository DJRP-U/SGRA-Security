import LoginForm from "@/components/forms/LoginForm";
import ContainerPage from "@/components/layouts/container/ContainerPage";
import HeaderPage from "@/components/layouts/header/HeaderPage";
import TitlePage from "@/components/text/heading/TitlePage";
import TextLink from "@/components/text/links/TextLink";

export default async function Home() {

    return (
        <div>
            <HeaderPage />
            <ContainerPage paddingTop="lg">
                <TitlePage>Inicio de sesión</TitlePage>
                <LoginForm />
                <div>
                    <TextLink
                        text="¿No tienes una cuenta?"
                        href="/auth/request-register"
                        linkText="Regístrate"
                    />
                    <TextLink
                        text="¿Olvidaste tu contraseña?"
                        href="/auth/restore"
                        linkText="Restablecer contraseña"
                    />
                </div>
            </ContainerPage>
        </div>
    );
}
