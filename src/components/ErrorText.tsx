type ErrorTextProps = {
    children?: string,
    className?: string,
    condition?: any,
    placeholder?: string
}

export default function ErrorText({ children, className, condition, placeholder }: ErrorTextProps) {
    return (condition && <span className={`text-error ${className}`}>{children ?? ""}</span>) || (placeholder ? <span>{placeholder}</span> : null);
}