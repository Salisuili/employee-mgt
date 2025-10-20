"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export default function Topbar() {
  const { data: session } = useSession();
  const { toggleSidebar } = useSidebar(); // hook to open/close sidebar

  return (
    <header className="flex justify-between items-center px-6 py-3 border-b bg-white">
      <div className="flex items-center gap-3">
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">{session?.user?.name}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
