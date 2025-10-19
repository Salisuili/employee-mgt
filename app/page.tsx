"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white text-center p-6">
      <motion.h1
        className="text-4xl sm:text-6xl font-bold text-blue-700 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Employee Management System
      </motion.h1>

      <motion.p
        className="text-gray-600 max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Manage employees, attendance, departments, and notifications easily —
        all in one secure platform.
      </motion.p>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Link href="/login">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl">
            Login
          </Button>
        </Link>

        <Link href="/signup">
          <Button variant="outline" className="px-6 py-2 rounded-xl">
            Sign Up
          </Button>
        </Link>
      </motion.div>

      <footer className="mt-16 text-sm text-gray-400">
        © {new Date().getFullYear()} Employee Management System — All Rights Reserved
      </footer>
    </main>
  );
}
