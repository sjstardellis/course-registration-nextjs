import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET
export async function GET(_: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    // Not valid Id
    if (!id)
        return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 });

    // Registration object to be found
    const registration = await prisma.registration.findUnique({
        where: { id },
        include: {
            user: true,
            course: true,
        },
    });

    return registration
        ? NextResponse.json(registration)
        // Registration not found
        : NextResponse.json({ error: "Registration not found" }, { status: 404 });
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    // Not valid Id
    if (!id)
        return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 });

    // Registration object to be deleted
    try {
        const registration = await prisma.registration.delete({
            where: { id },
        });

        return NextResponse.json({ message: `Registration ${registration.id} deleted` });

    } catch {
        // Registration not found
        return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }
}

// PUT
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    // Not valid Id
    if (!id)
        return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 });

    // Data from request body
    const data = await req.json();

    // Registration object to be updated
    try {
        const registration = await prisma.registration.update({
            where: { id },
            data: {
                userId: data.userId,
                courseId: data.courseId,
            },
            include: {
                user: true,
                course: true,
            },
        });

        return NextResponse.json({
            message: `Registration ${registration.id} updated`,
            registration,
        });
    } catch {
        // Registration not found
        return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }
}
