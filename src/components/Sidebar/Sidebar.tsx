'use client';

import Routes from "@/lib/routes";
import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { useCallback, useState } from "react";

export function Sidebar() {
  const [ open, toggle ] = useState(true);
  const onToggle = useCallback(() => {
    toggle(!open);
  }, [toggle, open])

  return (
    <div className={`sidebar ${open ? "w-64" : "w-4"} py-5 mr-4 bg-white shadow-md rounded-r relative`}>
        <div className={`${open ? "block" : "hidden"}`}>
          <ul>
            <SidebarMenuItem route={Routes.dashboard} img={"/images/dashboard_1.svg"} alt="D" w={40} h={40}>
                Dashboard
            </SidebarMenuItem>
            <SidebarMenuItem route={Routes.services} img={"/images/services_1.svg"} imgClassName="p-1.5" alt="D" w={30} h={30}>
                Services
            </SidebarMenuItem>
          </ul>
        </div>
        {/* Sidebar content like navigation items goes here */}
        <div className="sidebarCollapseButton cursor-pointer absolute -right-4 bg-white w-8 h-8 rounded-3xl border border-cream flex justify-center items-center" onClick={onToggle}>
          <Image
            src={"/images/left-arrow.svg"}
            className={`${open ? "" : "rotate-180 ml-1"}`}
            width={15}
            height={31}
            alt={`${open ? "←" : "→"}`} />
        </div>
    </div>
  )
}