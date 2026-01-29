import ItemSkeleton from "../item/ItemSkeleton";

const ROWS = 8;

const COLUMNS = [
    "w-16 h-2",
    "w-128 h-2",
    "w-16 h-2",
    "w-32 h-2",
    "w-64 h-2",
    "w-16 h-2",
];

export default function AdminPanelSectionSkeleton() {

    return (

        <div className="h-full animate-pulse flex flex-col gap-4">
            <div className="py-2">
                <ItemSkeleton className="w-32 h-6" />
            </div>
            <div className="flex justify-between py-2">
                <ItemSkeleton className="min-w-xs h-6" />
                <ItemSkeleton className="w-16 h-6" />
            </div>
            <div className="flex flex-col gap-1 pt-2">
                <div className="flex flex-col gap-3">
                    <div className="flex w-full justify-around py-3">
                        <ItemSkeleton className="w-16 h-2" />
                        <ItemSkeleton className="w-128 h-2" />
                        <ItemSkeleton className="w-16 h-2" />
                        <ItemSkeleton className="w-32 h-2" />
                        <ItemSkeleton className="w-64 h-2" />
                        <ItemSkeleton className="w-16 h-2" />
                    </div>
                    <ItemSkeleton className="w-full h-1" />
                </div>
                <div className="flex flex-col gap-1">
                    {Array.from({ length: ROWS }).map((_, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex w-full justify-around py-4"
                        >
                            {COLUMNS.map((cls, colIndex) => (
                                <ItemSkeleton
                                    key={colIndex}
                                    className={cls}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex w-full justify-center">
                <ItemSkeleton className="w-48 h-4" />
            </div>
        </div>

    );

}