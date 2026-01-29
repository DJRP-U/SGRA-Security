import RecoveryAccountForm from '@/components/forms/RecoveryAccountForm';
import ContainerPage from '@/components/layouts/container/ContainerPage';
import Detail from '@/components/text/content/Detail';
import TitlePage from '@/components/text/heading/TitlePage';
import { RotateCcwKey } from 'lucide-react';

export default function RecoveryPasswordPage() {

    return (
        <ContainerPage paddingTop='lg'>
            <RotateCcwKey
                className="text-neutral-700"
                size={64}
            />
            <div className="text-center flex flex-col gap-2">
                <TitlePage>¿Olvidaste tu contraseña?</TitlePage>
                <Detail>
                    Ingresa tu correo electrónico para restablecer la contraseña.
                </Detail>
            </div>
            <RecoveryAccountForm />
        </ContainerPage>
    );

}