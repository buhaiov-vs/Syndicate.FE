import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string }
}>) {
  return <div className="w-5/6 rounded mr-4 flex">
    <div className="flex flex-1 rounded-md flex-col">
      {children}
    </div>
  </div>;
}
