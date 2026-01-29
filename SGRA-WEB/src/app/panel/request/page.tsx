import { MainContainer } from '@/components/layouts/container/MainContainer';
import ListAccountRequest from '@/components/layouts/list/ListAccountRequest';
import Title from '@/components/text/heading/Title';
import { RequestAccountService } from '@/service/requestAccountService';
import { RequestAccountDTO } from '@/tipos/DTOs/requestAccountDTO';

interface PanelRequestAccountProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PanelRequestAccountScreen({ searchParams }: PanelRequestAccountProps) {

    const page = (await searchParams).page;

    const { solicitudes, total }: {
        solicitudes: RequestAccountDTO[];
        total: number;
    } = await RequestAccountService.list(String(page));


    return (
        <MainContainer>
            <Title>
                Solicitudes de registro
            </Title>
            <ListAccountRequest
                accountRequests={solicitudes}
            />
        </MainContainer>
    );
}
