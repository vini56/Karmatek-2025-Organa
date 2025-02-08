import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// status: waiting, matched, transplanted, deceased
export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, status } = body;
        const patient = await prisma.patients.update({
            where: { id },
            data: {
                status,
            },
        });
        return NextResponse.json({
            success: true,
            message: "Patient status updated",
            data: {
                id: patient.id,
                name: patient.name,
                status: patient.status,
            },
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false,
            message: "An error occurred updating the status",
        });
    }
}
