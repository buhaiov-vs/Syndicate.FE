import Body from "@/components/Body/Body";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col bg-cream">
        <Header />
        <div className="main flex flex-row py-3 pr-3 overflow-hidden">
            <Sidebar />
            <Body>{children}</Body>
        </div>
    </div>
  );
}
