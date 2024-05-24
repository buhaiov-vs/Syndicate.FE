type ActionsBarProps = {
    children?: any,
    className?: string,
}

export const ActionsBar = ({ children, className }: ActionsBarProps) => {
  return (
    <>
        <div className={"flex w-full justify-end " + className}>
            {children}
        </div>
    </>
  );
}