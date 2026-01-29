import SimpleHeader from '@/components/layouts/header/SimpleHeader';
import NavUser from '@/components/layouts/nav/NavUser';
import { ProjectService } from '@/service/projectService';
import { ProjectInfo } from '@/tipos/projectType';
import { cookies } from 'next/headers';
import React from 'react';

export const dynamic = "force-dynamic";

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const cookieStore = cookies();
    const user = (await cookieStore).get("user");
    const userName = (await cookieStore).get("userName");
    const response = await ProjectService.listByUser(String(user?.value));

    const projectList: ProjectInfo[] = response.data.map((p: any) => ({
        uuid: p.uuid,
        name: p.nombre
    }));

    return (
        <div className="flex flex-col w-full h-full">
            <SimpleHeader userName={String(userName?.value)} />
            <div className="flex flex-1 overflow-y-hidden">
                <NavUser showProjects={projectList.length > 0} projects={projectList} />
                <main className="px-8 py-4 flex-1 h-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
