
type Props = {
    children: React.ReactNode
}

export default function ProjectPageHeader({ children }: Props) {
    return (
        <section className="flex items-center justify-between gap-x-4 pl-0.5">
            {children}
        </section>
    );
}