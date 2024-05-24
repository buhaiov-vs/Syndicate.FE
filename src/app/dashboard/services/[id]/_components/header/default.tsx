import { IconButton } from "@/lib/components";
import { ServiceStatus } from "@/lib/types/enums";
import Link from "next/link";
import { Service } from "../../../_lib/types";
import Routes from "@/lib/routes";

type ServiceDetailsHeaderProps = {
    service: Service
}

export default function ServiceDetailsHeader({ service }: ServiceDetailsHeaderProps) {
  return (
    <div className={"flex flex-row justify-between border-b border-cream items-center h-12 py-2 px-5 bg-white rounded-md"}>
      <div className="flex items-center flex-row flex-1">
        <div className="flex justify-center items-center bg-creamAccent rounded-md px-5 mr-3 h-8">
            {ServiceStatus[service.status]}
        </div>
        {service.name}
      </div>
      <div className="flex">
        <div>
          <Link href={`${Routes.dashboardSevices}/${service.id}/edit`}>
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
