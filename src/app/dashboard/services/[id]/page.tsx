import { getService } from "../_lib/data";

type ServicePageProps = {
  params: { id: string }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const [ service, error ] = await getService(params.id);

  return (error || !service) ? (
    <>
      Something went wrong. Please try again later.
    </>) : (
    <div className="flex flex-1 bg-white rounded-md px-5 mt-2">
      View: {service.name}
    </div>
  );
}