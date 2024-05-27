import type { Metadata } from "next";
import { getService } from "../_lib/data";
import ServiceDetailsHeader from "./_components/header";

export const metadata: Metadata = {
  title: "Services",
};

export default async function ServicesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string }
}>) {
  const [ service, error ] = await getService(params.id);

  return <div className="w-5/6 rounded mr-4 flex">
    {(error || !service) ? (
    <>
      Something went wrong. Please try again later.
    </>) : ( 
    <div className="flex flex-1 rounded-md flex-col">
      <div className="flex rounded-md flex-col">
        <ServiceDetailsHeader service={service} />
      </div>  
      <div className="flex flex-1 rounded-md flex-col">
        {children}
      </div>
    </div>)}
  </div>;
}
