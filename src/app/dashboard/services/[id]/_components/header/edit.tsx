import { IconButton } from "@/lib/components";
import { ServiceStatus } from "@/lib/types/enums";
import Link from "next/link";
import { Service } from "../../../_lib/types";
import Routes from "@/lib/routes";

type ServiceDetailsHeaderProps = {
    service: Service
}

export default function ServiceDetailsHeaderEdit({ service }: ServiceDetailsHeaderProps) {
  return (
    <div className="flex flex-row justify-between border-b border-cream items-center h-12 py-2 px-5 bg-white rounded-md">
      <div className="flex items-center flex-row flex-1">
        <div className="flex justify-center items-center bg-creamAccent rounded-md px-5 mr-3 h-8">
            {ServiceStatus[service.status]}
        </div>
        {service.name}
      </div>
      <div className="flex">
      <div className="flex flex-row">
            <button
              form="service-details-form"
              className="ripple px-4 w-36 h-8 text-primary hover:bg-creamLight rounded-md border border-primary" type="submit">
              SAVE
            </button>
            <Link href={`${Routes.dashboardSevices}/${service.id}`}>
              <IconButton
                  className="w-36 pl-2 h-8 border-error hover:bg-error hover:text-white ml-5 justify-between"
                  icon="/images/add.svg"
                  iconClassName="rotate-45"
                  prefix="CANCEL"
                  alt="Cancel"
                  h={32}
                  w={32}
              />
            </Link>
          </div>
      </div>
    </div>
  );
}
