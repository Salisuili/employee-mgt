import { NextResponse } from "next/server";

export async function GET(req: Request){
     const { PrismaClient } = await import("@/lib/generated/prisma");
     const prisma = new PrismaClient();

     try{
        const header = req.headers.get("authorization");
        const token = header?.replace("Bearer ", "").trim();
        if(!token){
            return NextResponse.json({
                error: "unauthorized",
                status: 401,
            })
        }

        const users = await prisma.user.findMany({
            select:{id:true, name: true, email: true, role:true, department:true, attendances: true},
            orderBy:{createdAt: "desc"}
        });
        if (users){
            return NextResponse.json(users)
        }
     }catch(error){
        console.log(error);
     }


}