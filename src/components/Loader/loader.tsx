'use client';

type LoaderProps = {    
    wrapperClassName?: string,
    spinnerClassName?: string,
    text?: string
}

export default function Loader({ spinnerClassName = "", wrapperClassName = "", text }: LoaderProps) {

    return (
        <>
            <div className={"flex flex-1 flex-col self-center items-center " + wrapperClassName}>
                <span className={"loader w-12 h-12 " + spinnerClassName}></span>
                <p className="mt-2">{text}</p>
            </div>
        </>
    );
}