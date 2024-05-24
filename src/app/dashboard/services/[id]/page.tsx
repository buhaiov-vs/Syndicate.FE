import { getService } from "../_lib/data";
import ServiceDetailsHeader from "./_components/header/default";

type ServicePageProps = {
  params: { id: string }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const [ service, error ] = await getService(params.id);

  return (error || !service) ? (
    <>
      Something went wrong. Please try again later.
    </>) : (
    <div className="flex flex-1 rounded-md flex-col">
      <ServiceDetailsHeader service={service} />
      <div className="flex flex-1 bg-white rounded-md px-5">
        View: {service.name}
      </div>
    </div>
  );
}