interface ContainerActionProps {
    children?: React.ReactNode
}

export default function ContainerAction({ children }: ContainerActionProps) {
    return (
        <div className="w-2xl flex justify-between items-center">
            {children}
        </div>
    );
}