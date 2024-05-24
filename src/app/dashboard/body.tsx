type BodyProps = {
  children: any
}

export default function Body({ children }: BodyProps) {
  return (
    <div className="flex flex-col px-2 flex-1 h-full">
      <div className="h-full">
        {children}
      </div>
    </div>
  )
}