import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET
export async function GET() {
    // Finds all users but does not return registrations
    const users = await prisma.user.findMany({
        include: { registrations: false },
    });
    return NextResponse.json(users);
}

// POST
export async function POST(req: Request) {
    const body = await req.json();
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
        },
    });
    return NextResponse.json(user);
}
