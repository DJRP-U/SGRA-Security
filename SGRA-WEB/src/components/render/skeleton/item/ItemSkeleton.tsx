
interface SkeletonProps {
    className?: string;
}

export default function ItemSkeleton({ className = "" }: SkeletonProps) {
    return (
        <div className={`bg-neutral-150 rounded-md ${className}`}></div>
    );
}
