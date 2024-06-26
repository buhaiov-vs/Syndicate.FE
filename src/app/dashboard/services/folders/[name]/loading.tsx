import { Loader } from "@/lib/components";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicePageLoader() {
  return <div className="flex flex-1 rounded-md flex-col bg-white items-center mt-2">
    <Loader wrapperClassName="justify-center" />
  </div>;
}
