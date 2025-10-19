"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center px-6 py-3 border-b bg-white">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">{session?.user?.email}</span>
        <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </Button>
      </div>
    </header>
  );
}
