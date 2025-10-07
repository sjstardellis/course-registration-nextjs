import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET
export async function GET() {
    // Finds all courses but does not return registrations
    const courses = await prisma.course.findMany({
        include: { registrations: false },
    });
    return NextResponse.json(courses);
}

// POST
export async function POST(req: Request) {
    const body = await req.json();
    const course = await prisma.course.create({
        data: {
            title: body.title,
            description: body.description,
        },
    });
    return NextResponse.json(course);
}
