import LinkButton from '@/components/buttons/LinkButton';
import ContainerPage from '@/components/layouts/container/ContainerPage';
import Detail from '@/components/text/content/Detail';
import TitlePage from '@/components/text/heading/TitlePage';
import TextLink from '@/components/text/links/TextLink';
import { MailCheck } from 'lucide-react';

interface InfoRecoveryPasswordPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function InfoRecoveryPasswordPage({ searchParams }: InfoRecoveryPasswordPageProps) {

    const email = (await searchParams).email;

    return (
        <ContainerPage paddingTop='lg'>
            <MailCheck
                className='text-neutral-700'
                size={64}
            />
            <div className='text-center flex flex-col gap-2'>
                <TitlePage>
                    Revisa tu correo
                </TitlePage>
                <div>
                    <Detail>
                        Si existe una cuenta asociada al correo
                        <span className='font-semibold'> "{email}"</span>,
                    </Detail>
                    <Detail>
                        recibirás una contraseña temporal para acceder a tu cuenta.
                    </Detail>
                </div>
            </div>
            <LinkButton
                href='/'
                label='Volver al inicio de sesión'
            />
            <TextLink
                href='/auth/restore'
                text=''
                linkText='¿No recibiste el correo?'
            />
        </ContainerPage>
    );
}
