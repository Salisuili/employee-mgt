import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password, department } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        department,
        role: "EMPLOYEE",
      },
    });

    // Remove password before returning user info
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ message: "User created", user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
