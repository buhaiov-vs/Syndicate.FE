'use client';

import { IconButton } from "@/lib/components";
import Routes from "@/lib/routes";
import { ServiceStatus } from "@/lib/types/enums";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Service } from "../../_lib/types";
import clsx from "clsx";

type ServiceDetailsHeaderProps = {
    service: Service
}

export default function ServiceDetailsHeader({ service }: ServiceDetailsHeaderProps) {
  const router = useRouter();
  const isEdit = usePathname().includes("/edit");

  return (
    <div className="flex flex-row justify-between border-b border-cream items-center h-12 py-2 px-5 bg-white rounded-md">
      <div className="flex items-center flex-row flex-1">
        <div className="flex justify-center items-center bg-creamAccent rounded-md px-5 mr-3 h-8">
            {ServiceStatus[service.status]}
        </div>
        {service.name}
      </div>
      <div className="flex">
        <div className={clsx("flex flex-row", { "hidden": !isEdit })}>
          <button
            form="service-details-form"
            className="ripple px-4 w-36 h-8 text-primary hover:bg-creamLight rounded-md border border-primary" type="submit">
            SAVE
          </button>
          <IconButton
              className="w-36 pl-2 h-8 border-error hover:bg-error hover:text-white ml-5 justify-between"
              icon="/images/add.svg"
              iconClassName="rotate-45"
              prefix="CANCEL"
              alt="Cancel"
              h={32}
              w={32}
              onClick={router.back}
          />
        </div>
          <Link href={`${Routes.dashboardSevices}/${service.id}/edit`} className={clsx({ "hidden": isEdit })}>
            <IconButton
                className="w-36 h-8 pl-2 border-black"
                prefix="EDIT"
                icon="/images/pencil.svg"
                alt="Edit"
                h={32}
                w={32}
            />
          </Link>
      </div>
    </div>
  );
}
