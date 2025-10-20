"use client";

import { AppSidebar } from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="h-screen w-screen flex overflow-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-1 h-full bg-gray-50 p-2">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
