import SimpleHeader from '@/components/layouts/header/SimpleHeader';
import NavAdmin from '@/components/layouts/nav/NavAdmin';
import React from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col w-full h-full"> 
            <SimpleHeader homeHref='/panel/request?page=1' /> 
            <div className="flex flex-1 overflow-y-hidden"> 
                <NavAdmin />
                <main className="flex-1 px-8 py-4 h-full"> 
                    {children}
                </main>
            </div>
        </div>
    );
}