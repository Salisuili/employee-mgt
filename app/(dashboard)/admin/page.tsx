"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading dashboard...</p>;
  }

  if (!session) {
    redirect("/login");
  }

  if (session?.user?.role !== "ADMIN") {
    redirect("/employee");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600">Welcome, {session.user?.name || "Admin"} </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold mb-2">Employee Management</h2>
          <p className="text-sm text-gray-600">
            Add, edit, or remove employees in your organization.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold mb-2">Department Overview</h2>
          <p className="text-sm text-gray-600">
            Manage and organize departments efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}
