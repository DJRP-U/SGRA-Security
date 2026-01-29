type ContainerPageProps = {
    children: React.ReactNode
    paddingTop?: "sm" | "md" | "lg"
};

const paddingMap = {
    sm: "pt-8",
    md: "pt-16",
    lg: "pt-24",
};

export default function ContainerPage({
    children,
    paddingTop = "sm",
}: ContainerPageProps) {
    return (
        <main
            className={`
                h-full w-full
                flex flex-col items-center
                gap-6
                ${paddingMap[paddingTop]}
            `}
        >
            {children}
        </main>
    );
}
