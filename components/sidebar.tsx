"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  Bell,
  Building,
  ClipboardList,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export function AppSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;

  const adminLinks = [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    { title: "Employees", href: "/dashboard/employees", icon: Users },
    { title: "Departments", href: "/dashboard/departments", icon: Building },
    { title: "Attendance", href: "/dashboard/attendance", icon: ClipboardList },
    { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ];

  const employeeLinks = [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    { title: "Profile", href: "/dashboard/profile", icon: UserCircle2 },
    { title: "Attendance", href: "/dashboard/attendance", icon: ClipboardList },
    { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ];

  const links = role === "ADMIN" ? adminLinks : employeeLinks;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>EmployeeMS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
