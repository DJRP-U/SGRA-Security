import { LoaderCircle, StoneIcon } from "lucide-react";

export default function Loading(){
    return(
        <div className="w-full h-screen flex flex-col items-center">
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-500">
                <LoaderCircle className="animate-spin" strokeWidth={1.3} size={64} />
            </div>
            <div className="flex gap-2 py-8 items-center">
                <StoneIcon size={32} />
                <span className="text-xl font-semibold">SGRA</span>
            </div>
        </div>
    );
}