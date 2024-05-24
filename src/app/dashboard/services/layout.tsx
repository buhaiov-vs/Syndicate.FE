import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesLayout({
  list,
  children,
}: Readonly<{
  list: React.ReactNode;
  children: React.ReactNode;  
}>) {
  return (
    <div className="flex flex-row mb-4 h-full">
      {list}
      {children}
    </div>
  );
}
