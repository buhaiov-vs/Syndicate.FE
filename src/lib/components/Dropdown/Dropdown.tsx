import useOutsideClick from "@/lib/hooks/useClickOutside";
import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";

export type DropdownProps = {
  title: string;
  value?: string | null;
  children: React.ReactNode;
  className?: string;
  error?: string;
  isOpen: boolean;
  onToggle: (state?: boolean) => void;
}

export const Dropdown = ({
  title,
  value,
  children,
  className,
  isOpen,
  onToggle,
}: DropdownProps) => {
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    onToggle();
  }
  
  useOutsideClick(dropdownRef, () => {
    onToggle(false);
  });

  return (
    <div ref={dropdownRef} className="relative text-left cursor-pointer mr-4">
      <div
        className={clsx(
          "flex rounded-md py-2.5 px-4 border border-creamAccent",
          (value ? "justify-center" : ""),
          (isOpen ? "outline-auto" : ""),
          className,
        )}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        <div>
          {value ? value : title }
        </div>
        {value ? (
            <label className="absolute -top-6 -left-0.5">
              {title}
            </label>
          ) : (null)
        }
        <div
          className="cursor-pointer absolute -right-4 top-2 bg-white w-8 h-8 rounded-3xl border border-cream flex justify-center items-center">
          <Image
            src={"/images/left-arrow.svg"}
            className={`${isOpen ? "rotate-90" : "-rotate-90"}`}
            width={15}
            height={31}
            alt={`${isOpen ? "←" : "→"}`} />
        </div>
      </div>

      {isOpen ? children : null} 
    </div>
  );
}
