'use client';

import { IconButton } from "@/lib/components";
import Routes from "@/lib/routes";
import { ServiceStatus } from "@/lib/types/enums";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Service } from "../../_lib/types";
import clsx from "clsx";
import { deactivateService, publishService } from "../../_lib/actions";
import { useCallback } from "react";
import { toast } from "react-toastify";

type ServiceDetailsHeaderProps = {
    service: Service
}

export default function ServiceDetailsHeader({ service }: ServiceDetailsHeaderProps) {
  const router = useRouter();
  const isEdit = usePathname().includes("/edit");

  const publish = useCallback(async () => {
    var [_, errors] = await publishService(service.id)

    if (errors?.length) {
      errors.forEach((value) => {
        toast.error(value.message, {
          toastId: service.id + value.message
        });
      })

      return;
    }
    
    router.refresh();
  }, [service])

  const deactivate = useCallback(async () => {
    var [_, errors] = await deactivateService(service.id)

    if (errors?.length) {
      errors.forEach((value) => {
        toast.error(value.message, {
          toastId: service.id + value.message
        });
      })

      return;
    }
    
    router.refresh();
  }, [service])

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
        <div className={clsx("flex flex-row", { "hidden": isEdit })}>
          {service.status === ServiceStatus.Active
            &&
            <IconButton
              className="w-36 pl-2 h-8 border-error hover:bg-error hover:text-white ml-5 justify-between"
              icon="/images/add.svg"
              iconClassName="rotate-45"
              prefix="DEACTIVATE"
              alt="Cancel"
              h={32}
              w={32}
              onClick={deactivate}
          />}
          {(service.status === ServiceStatus.Draft || service.status === ServiceStatus.Inactive)
            &&
            <button 
            onClick={publish}
            className="ripple px-4 w-36 h-8 text-primary hover:bg-success hover:text-white rounded-md border border-primary">
              PUBLISH
            </button>
          }
          <Link href={`${Routes.dashboardSevices}/${service.id}/edit`} className="w-36 pl-2 h-8 border-error ml-5 justify-between">
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
    </div>
  );
}
