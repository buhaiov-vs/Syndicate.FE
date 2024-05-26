import { ServiceStatus } from "@/lib/types/enums";
import { getService } from "../_lib/data";
import Link from "next/link";
import Routes from "@/lib/routes";
import { IconButton } from "@/lib/components";

type ServicePageProps = {
  params: { id: string }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const [ service, error ] = await getService(params.id);

  return (error || !service) ? (
    <>
      Something went wrong. Please try again later.
    </>) : (
    <>
      <div className="flex rounded-md flex-col">
        <div className={"flex flex-row justify-between border-b border-cream items-center h-12 py-2 px-5 bg-white rounded-md"}>
          <div className="flex items-center flex-row flex-1">
            <div className="flex justify-center items-center bg-creamAccent rounded-md px-5 mr-3 h-8">
                {ServiceStatus[service!.status]}
            </div>
            {service!.name}
          </div>
          <div className="flex">
            <div>
              <Link href={`${Routes.dashboardSevices}/${service!.id}/edit`}>
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
      </div>
      <div className="flex flex-1 bg-white rounded-md px-5 mt-2">
        View: {service.name}
      </div>
    </>
  );
}