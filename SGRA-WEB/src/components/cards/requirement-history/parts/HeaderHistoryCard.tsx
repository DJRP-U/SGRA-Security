import ItemHistoryCard from "./ItemHistoryCard";

interface HeaderHistoryCardProps {
    id: string
    date: string
}

export default function HeaderHistoryCard({ id, date }: HeaderHistoryCardProps) {
    return (
        <div className="flex items-center justify-between">
            <ItemHistoryCard title >#{id}</ItemHistoryCard>
            <ItemHistoryCard secondary >{date}</ItemHistoryCard>
        </div>
    );
}