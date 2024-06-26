import type { Metadata } from "next";
import { ServicesFolderDetailsHeader } from "./_components";
import { getServicesFolder } from "../../_lib/data";

export const metadata: Metadata = {
  title: "Services",
};

export default async function FolderLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { name: string }
}>) {
  const [ folder, error ] = await getServicesFolder(params.name);

  return <div className="w-5/6 rounded mr-4 flex">
    {(error || !folder) ? (
    <>
      Something went wrong. Please try again later.
    </>) : ( 
    <div className="flex flex-1 rounded-md flex-col">
      <div className="flex rounded-md flex-col">
        <ServicesFolderDetailsHeader folder={folder} />
      </div>  
      <div className="flex flex-1 rounded-md flex-col">
        {children}
      </div>
    </div>)}
  </div>;
}
