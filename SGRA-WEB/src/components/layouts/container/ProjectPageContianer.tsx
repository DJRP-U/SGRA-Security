
type Props = {
    children: React.ReactNode
}

export default function ProjectPageContainer({ children }: Props) {
    return (
        <section className="pt-1 overflow-hidden h-[75vh] flex flex-col gap-4">
            {children}
        </section>
    );
}