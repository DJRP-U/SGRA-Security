
interface ItemHistoryCard {
    children: React.ReactNode
    secondary?: boolean
    title?: boolean
}

export default function ItemHistoryCard({ children, secondary = false, title = false }: ItemHistoryCard) {

    const base = "font-medium";

    const textSize = secondary ? "text-base " : "text-xl";

    const textColor = title ? "text-neutral-600 font-semibold" : "text-neutral-500" 

    const style = `${base} ${textColor} ${textSize}`;

    return (
        <p className={style}>
            {children}
        </p>
    );
}