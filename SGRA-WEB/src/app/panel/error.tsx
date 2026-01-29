'use client';
import ContainerError from '@/components/layouts/container/ContainerError';
import Detail from '@/components/text/content/Detail';
import Subtitle from '@/components/text/heading/Subtitle';
import { CircleAlertIcon } from 'lucide-react';
import { useEffect } from 'react'

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
}) {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <ContainerError>
            <CircleAlertIcon size={48} className='text-neutral-700' />
            <div className='text-center'>
                <Subtitle>¡Ha ocurrido un problema!</Subtitle>
                <Detail>Inténtalo nuevamente más tarde.</Detail>
            </div>
        </ContainerError>
    )
}