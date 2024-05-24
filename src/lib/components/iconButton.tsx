import clsx from "clsx";
import Image from "next/image";

export type IconButtonProps = {
    onClick?: () => void,
    className?: string,
    iconClassName?: string,
    icon: string,
    alt: string,
    h: number,
    w: number,
    prefix?: string,
    suffix?: string
}

export const IconButton = ({
  onClick,
  prefix,
  suffix,
  className,
  iconClassName,
  alt,
  h,
  w,
  icon
}: IconButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx("flex cursor-pointer select-none justify-center items-center border border-cream rounded-md hover:bg-cream active:bg-creamAccent", className)}>
        {prefix ? (
            <div className="flex flex-1 justify-center">
              {prefix}
            </div>
          ) : (
            null
          )
        }
        <Image
            src={icon}
            className={iconClassName}
            alt={alt}
            height={h}
            width={w}
        />
        {suffix}
    </div>
  );
}
