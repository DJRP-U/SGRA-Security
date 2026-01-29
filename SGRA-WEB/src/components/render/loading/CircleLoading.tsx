import { LoaderCircleIcon } from "lucide-react";

interface CircleLoadingProps {
    height?: string
}

export default function CircleLoading({ height = "h-screen" }: CircleLoadingProps) {
    return (
        <div className={`${height} flex flex-col items-center overflow-hidden`} >
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-500">
                <LoaderCircleIcon className="animate-spin" strokeWidth={1.3} size={64} />
            </div>
        </div >
    );
}
