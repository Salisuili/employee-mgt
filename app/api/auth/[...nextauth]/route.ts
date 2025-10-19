import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// NextAuth configuration
const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Compare password with hashed one in DB
        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt", // Use JWT for faster, stateless sessions
  },

  callbacks: {
    // Add the user role to the token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    // Add the role to the session object
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role ?? "employee";
      }
      return session;
    },
  },

  // Secret for encryption (must be in .env)
  secret: process.env.NEXTAUTH_SECRET,

  // Redirect users to your custom login page
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
