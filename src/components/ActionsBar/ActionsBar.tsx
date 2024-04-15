'use client';

import { ReactNode } from "react";

type ActionsBarProps = {
    children?: any,
    className?: string,
}

export default function ActionsBar({ children, className }: ActionsBarProps) {
return (
        <>
            <div className={"flex w-full justify-end " + className}>
                {children}
            </div>
        </>
    );
}