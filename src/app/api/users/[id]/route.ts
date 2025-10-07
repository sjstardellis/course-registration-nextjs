import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET
export async function GET(_: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    // Not valid Id
    if (!id)
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

    // User object to be found
    const user = await prisma.user.findUnique({
        where: { id },
        include: { registrations: { include: { course: true } } },
    });

    return user
        ? NextResponse.json(user)
        // User not found
        : NextResponse.json({ error: "User not found" }, { status: 404 });
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    // Not valid Id
    if (!id)
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

    // User object to be deleted
    try {
        const user = await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ message: `User ${user.id} deleted` });

    } catch {
        // User not found
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
}

// PUT
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    // Not valid Id
    if (!id)
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

    // Data from request body
    const data = await req.json();

    // User object to be updated
    try {
        const user = await prisma.user.update({
            where: { id },
            data,
        });

        return NextResponse.json({ message: `User ${user.id} updated`, user });

    } catch {
        // User not found
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
}