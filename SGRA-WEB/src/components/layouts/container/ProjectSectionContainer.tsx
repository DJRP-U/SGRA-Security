interface Props {
    children: React.ReactNode;
}

export default function ProjectSectionContainer({ children }: Props) {
    return (
        <div className="mt-3 pt-1 overflow-hidden h-[75vh]">
            {children}
        </div>
    );
}