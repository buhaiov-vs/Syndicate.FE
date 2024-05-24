import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import Body from "./body";
import Sidebar from "./_components/sidebar";

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
        <div className="h-full flex flex-row py-3 pr-3 overflow-hidden">
            <Sidebar />
            <Body>{children}</Body>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
        </div>
    </div>
  );
}
