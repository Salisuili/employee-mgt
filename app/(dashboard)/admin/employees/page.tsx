"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    attendance: string[];
};

export default function EmployeeList() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);


    
        useEffect(() => {
            const token = session?.user.accessToken
            // Wait for session to load first
            if (status === "loading") return;

            if (status === "unauthenticated") {
                router.replace("/login");
                return;
            }

            if (session?.user.role !== "ADMIN") {
                router.replace("/unauthorized");
                return;
            }

            if (users.length === 0) {
            const fetchUsers = async () => {
                try {
                    setLoading(true);

                    const res = await fetch("/api/users", {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (!res.ok) throw new Error("Failed to fetch users");

                    const data = await res.json();
                    setUsers(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
        

            fetchUsers();
        }
        }, [session, status]);
    

    if (loading || status === "loading") {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <div className="h-screen flex-col rounded-2xl">
            <h2 className="text-2xl text-grey-600 font-semibold">Employee List</h2>
            <div className="bg-white">
                {users.length === 0 ? (
                    <p>No employees found.</p>
                ) : (
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
