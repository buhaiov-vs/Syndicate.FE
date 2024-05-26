import clsx from "clsx";

export type LoaderProps = {    
    wrapperClassName?: string,
    spinnerClassName?: string,
    text?: string
}

export const Loader = ({ spinnerClassName = "", wrapperClassName = "", text }: LoaderProps) => {
  return (
    <>
      <div className={clsx("flex flex-1 flex-col self-center items-center", wrapperClassName)}>
        <span className={clsx("loader w-12 h-12", spinnerClassName)}></span>
        <p className="mt-2">{text}</p>
      </div>
    </>
  );
}