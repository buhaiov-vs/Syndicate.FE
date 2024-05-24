type ErrorTextProps = {
    children?: string,
    className?: string,
    placeholder?: string
}

export const ErrorText = ({ children, className, placeholder = '\xa0'}: ErrorTextProps) => {
  return children ? (
    <span className={`text-errorText ${className}`}>
      {children ?? ""}
    </span>
  ) : (
    <span className={"select-none " + className}>
      {placeholder}
    </span>
  );
}