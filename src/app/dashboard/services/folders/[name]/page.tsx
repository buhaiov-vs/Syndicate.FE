import { getServicesFolder } from "../../_lib/data";

type ServicesFolderPageProps = {
  params: { name: string }
}

export default async function FolderPage({ params }: ServicesFolderPageProps) {
  //const [ service, error ] = await getServicesFolder(params.name);

  return (false) ? (
    <>
      Something went wrong. Please try again later.
    </>) : (
    <div className="flex flex-1 bg-white rounded-md mt-2">
      FOLDER {params.name} view
    </div>
  );
}