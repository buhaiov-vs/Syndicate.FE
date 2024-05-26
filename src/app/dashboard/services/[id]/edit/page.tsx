import { getService } from "../../_lib/data";
import ServiceDetailsHeaderEdit from "../_components/header/edit";
import ServiceDetailsForm from "../_components/serviceDetailsForm";

type ServiceEditPageProps = {
  params: { id: string }
}

export default async function ServiceEditPage({ params }: ServiceEditPageProps) {
  const [ service, error ] = await getService(params.id);

  return (error || !service) ? (
    <>
      Something went wrong. Please try again later.
    </>) : (    
      <>
      <div className="flex rounded-md flex-col">
        <ServiceDetailsHeaderEdit service={service}  />
      </div>  
      <div className="flex flex-1 bg-white rounded-md mt-2">
        <ServiceDetailsForm service={service} />
      </div>
    </>
  );
}