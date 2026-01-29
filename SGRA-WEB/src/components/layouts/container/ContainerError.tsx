interface ContainerErrorProps {
    children?: React.ReactNode
}

export default function ContainerError({ children }: ContainerErrorProps) {

    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4">
            {children}
        </div>
    );
}