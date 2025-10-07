import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET
export async function GET(_: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    // Not valid Id
    if (!id)
        return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });

    // Course object to be found
    const course = await prisma.course.findUnique({
        where: { id },
    });

    return course
        ? NextResponse.json(course)
        // Course not found
        : NextResponse.json({ error: "Course not found" }, { status: 404 });
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    // Not valid Id
    if (!id)
        return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });

    // Course object to be deleted
    try {
        const course = await prisma.course.delete({
            where: { id },
        });

        return NextResponse.json({ message: `Course ${course.id} deleted` });

    } catch {
        // Course not found
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
}

// PUT
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    // Not valid Id
    if (!id)
        return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });

    // Data from request body
    const data = await req.json();

    // Course object to be updated
    try {
        const course = await prisma.course.update({
            where: { id },
            data,
        });
        return NextResponse.json({ message: `Course ${course.id} updated`, course });
    } catch {
        // Course not found
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
}