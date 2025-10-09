import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET
export async function GET() {
    try {
        const registrations = await prisma.registration.findMany({
            include: {
                user: true,      // get user details
                course: true,    // get course details
            },
        });
        return NextResponse.json(registrations);
    } catch (error) {
        console.error("Error fetching registrations:", error);
        return NextResponse.json(
            { error: "Failed to fetch registrations" },
            { status: 500 }
        );
    }
}

// POST
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate required fields
        if (!body.userId || !body.courseId) {
            return NextResponse.json(
                { error: "userId and courseId are required" },
                { status: 400 }
            );
        }

        // Create the registration
        const registration = await prisma.registration.create({
            data: {
                userId: body.userId,
                courseId: body.courseId,
            },
            include: {
                user: true,
                course: true,
            },
        });

        return NextResponse.json(registration);
    } catch (error) {
        console.error("Error creating registration:", error);
        return NextResponse.json(
            { error: "Failed to create registration" },
            { status: 500 }
        );
    }
}
