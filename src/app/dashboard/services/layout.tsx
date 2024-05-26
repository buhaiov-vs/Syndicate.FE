import type { Metadata } from "next";
import { ServicesList } from "./_components";
import { getServices } from "./_lib/data";

export const metadata: Metadata = {
  title: "Services",
};

export default async function ServicesLayout({
  children,
}: Readonly<{
  list: React.ReactNode;
  children: React.ReactNode;  
}>) {
  const [ services, error ] = await getServices();

  return (
    <div className="flex flex-row mb-4 h-full">
      <div className="flex flex-col p-2 bg-white w-1/6 shadow-md rounded mr-4">
        <ServicesList services={services} />
      </div>
      {children}
    </div>
  );
}
