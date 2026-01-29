import { MainContainer } from "@/components/layouts/container/MainContainer";
import SectionAccount from "@/components/layouts/section/SectionAccountPanel";
import Title from "@/components/text/heading/Title";
import { AccountService } from "@/service/accountService";
import { listRoles } from "@/service/roleService";

export default async function DashboardUsuariosScreen() {

    const accounts = await AccountService.list();
    const roles = await listRoles();

    return (
        <MainContainer>
            <Title>
                Cuentas
            </Title>
            <SectionAccount
                accounts={accounts.data}
                roles={roles.data}
            />
        </MainContainer>
    );
}