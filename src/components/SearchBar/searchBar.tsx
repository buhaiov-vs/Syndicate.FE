'use client';

import Image from "next/image";

type SearchBarProps = {
    children?: string,
    placeholder?: string,
    className?: string,
    onChange: (search: string) => void;
}

export function SearchBar({ placeholder, onChange }: SearchBarProps) {

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => { 
        onChange(e.currentTarget.value);
    }

    return (
        <>
            <div className="flex w-full relative">
                <input 
                    id="search"
                    type="text"
                    placeholder={placeholder}
                    className="w-full appearance-none border border-creamAccent rounded-md text-primary py-2.5 px-4 pr-12"
                    onChange={changeHandler}
                />
                <div className="absolute self-center right-2">
                    <Image
                        src="/images/search.svg"
                        alt="search"
                        width={32}
                        height={32}
                    />
                </div>
            </div>
        </>
    );
}