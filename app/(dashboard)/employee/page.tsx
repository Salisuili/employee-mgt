// app/(dashboard)/employee/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function EmployeeDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading dashboard...</p>;
  }

  if (!session) {
    redirect("/login");
  }

  if (session?.user?.role !== "EMPLOYEE") {
    redirect("/admin");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Employee Dashboard</h1>
      <p className="text-gray-600">Welcome, {session.user?.name || "Employee"} 👋</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold mb-2">Your Attendance</h2>
          <p className="text-sm text-gray-600">
            Track your daily attendance records here.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold mb-2">Notifications</h2>
          <p className="text-sm text-gray-600">
            Stay updated with important messages from admin.
          </p>
        </div>
      </div>
    </div>
  );
}
