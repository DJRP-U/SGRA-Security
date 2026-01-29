import Header from '@/components/layouts/header/HeaderPage';
import React from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full h-full flex flex-col">
            <Header />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}