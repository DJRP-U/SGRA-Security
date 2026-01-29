"use client";
import { useRef, useState } from "react";
import SearchIcon from "../icons/SearchIcon";

interface SearchInputProps {
    placeholder?: string;
    onChange?: (value: string) => void;
}

export default function SearchInput({
    placeholder = "Buscar",
    onChange,
}: SearchInputProps) {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState("");

    const handleWrapperClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
        onChange?.(val);
    };

    return (
        <div
            onClick={handleWrapperClick}
            className={`flex items-center min-w-xs ml-[1px] px-3 py-2 cursor-text bg-white rounded-xs transition-all
                        ${value.length > 0
                    ? "outline outline-2 outline-blue-400"
                    : "outline outline-1 outline-neutral-400 text-neutral-500"}`}
        >

            <SearchIcon width={24} height={24} />
            <input
                ref={inputRef}
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                className="ml-2 flex-1 border-0 outline-none text-lg text-neutral-500 bg-transparent"
            />
        </div>
    );
}
