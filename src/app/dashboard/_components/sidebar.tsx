"use client";

import Routes from "@/lib/routes";
import Image from "next/image";
import { useCallback, useState } from "react";
import { SidebarItem } from "./sidebarItem";
import clsx from "clsx";

export default function Sidebar() {
  const [ open, toggle ] = useState(true);
  const onToggle = useCallback(() => {
    toggle(!open);
  }, [toggle, open])

  return (
    <div className={clsx("sidebar py-5 mr-4 bg-white shadow-md rounded-r relative", {
      "w-64": open,
      "w-4": !open,
      })}>
        <div className={clsx({ "block": open, "hidden": !open})}>
          <ul>
            <SidebarItem route={Routes.dashboard} exact img={"/images/dashboard_1.svg"} alt="D" w={40} h={40}>
                Dashboard
            </SidebarItem>
            <SidebarItem route={Routes.dashboardSevices} img={"/images/services_1.svg"} imgClassName="p-1.5" alt="D" w={30} h={30}>
                Services
            </SidebarItem>
          </ul>
        </div>
        <div className="sidebarCollapseButton cursor-pointer absolute -right-4 bg-white w-8 h-8 rounded-3xl border border-cream flex justify-center items-center" onClick={onToggle}>
          <Image
            src={"/images/left-arrow.svg"}
            className={clsx({ "rotate-180 ml-1": !open })}
            width={15}
            height={31}
            alt={`${open ? "←" : "→"}`} />
        </div>
    </div>
  )
}