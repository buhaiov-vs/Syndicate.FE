import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
    route: string, 
    img: string,
    alt: string,
    w: number,
    h: number,
    imgClassName?: string,
    children: any,
    exact?: boolean
}

export const SidebarItem = ({route, img, imgClassName, children, alt, w, h, exact }: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <li className={`flex items-center px-5 py-2 hover:bg-creamAccent ${exact ? pathname === route : (pathname.includes(route)) ? "bg-creamLight border-r-8 border-creamAccent" : ""}`}>
      <Link href={route} className="text-xl flex flex-1 items-center">
        <Image className={`inline w-10 mr-2 ${imgClassName}`} src={img} alt={alt || route} width={w} height={h}/>
        {children}
      </Link>
    </li>
  );
}