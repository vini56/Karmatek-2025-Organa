import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// export const dynamic = 'force-static'

export async function GET(request: NextRequest) {
    try {
        const users = await prisma.users.findMany();
        const organs = await prisma.organs.findMany();
        const hospitals = await prisma.hospitals.findMany();
        const matches = await prisma.matches.findMany();
        const notifications = await prisma.notifications.findMany();
        const patients = await prisma.patients.findMany();

        return NextResponse.json(
            {
                success: true,
                message: "Hello from the API!",
                data: {
                    users,
                    organs,
                    hospitals,
                    matches,
                    notifications,
                    patients,
                },
            },
            {
                status: 200,
                headers: {},
            },
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred",
                error: error.message || "Unknown error",
            },
            {
                status: 500,
            },
        );
    }
}
