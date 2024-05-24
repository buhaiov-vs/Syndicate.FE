import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-5/6 rounded mr-4 flex">
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  </div>;
}
