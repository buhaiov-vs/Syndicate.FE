import { ServicesList } from "../_components";
import { getServices } from "../_lib/data";

type ServicesListPageProps = {
  params: {
    id?: string
  }
}
export default async function ServicesListPage({ params }: ServicesListPageProps) {
  const [ services, error ] = await getServices()

  return (
    <div className="flex flex-col p-2 bg-white w-1/6 shadow-md rounded mr-4">
      { error ? (
      <>
        Something went wrong. Please try again later.
      </>) : (
        <ServicesList services={services} id={params.id} />
      )}
    </div>
  );
}