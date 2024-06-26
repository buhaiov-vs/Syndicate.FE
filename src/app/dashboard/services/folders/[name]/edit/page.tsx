import { getServicesFolder } from "../../../_lib/data";
import { ServicesFolderDetailsForm } from "../_components";

type ServicesFolderEditPageProps = {
  params: { name: string }
}

export default async function ServicesFolderEditPage({ params }: ServicesFolderEditPageProps) {
  const [ folder, error ] = await getServicesFolder(params.name);

  return (error || !folder) ? (
    <>
      Something went wrong. Please try again later.
    </>) : (    
    <div className="flex flex-1 bg-white rounded-md mt-2">
      <ServicesFolderDetailsForm folder={folder} />
    </div>
  );
}