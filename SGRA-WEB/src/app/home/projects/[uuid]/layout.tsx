import ProjectNav from '@/components/layouts/nav/project/ProjectNav';
import Title from '@/components/text/heading/Title';
import { AccountRoleEnum } from '@/enums/accountEnum';
import { ProjectService } from '@/service/projectService';
import { cookies } from 'next/headers';
import React from 'react';

export const dynamic = "force-dynamic";

export default async function HomeLayout({ children, params }: { children: React.ReactNode; params: { uuid: string } }) {

    const { uuid } = await params;

    const response = await ProjectService.getByUid(uuid);
    const cookieStore = cookies();

    const role = (await cookieStore).get("role");

    const nameProject = response.data.nombre;

    return (
        <div className="flex flex-col w-full h-full flex-1 gap-2">
            <Title>{nameProject}</Title>
            <ProjectNav
                project_uid={uuid}
                isOwner={String(role?.value) === AccountRoleEnum.PRODUCT_OWNER}
            />
            <div className='overflow-y-auto'>
                {children}
            </div>
        </div>
    );
}
