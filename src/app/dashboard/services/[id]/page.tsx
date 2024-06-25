import { getService } from "../_lib/data";
import ServiceDetailsView from "./_components/serviceDetailsView";

type ServicePageProps = {
  params: { id: string }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const [ service, error ] = await getService(params.id);

  return (error || !service) ? (
    <>
      Something went wrong. Please try again later.
    </>) : (
    <div className="flex flex-1 bg-white rounded-md mt-2">
      <ServiceDetailsView service={service} />
    </div>
  );
}