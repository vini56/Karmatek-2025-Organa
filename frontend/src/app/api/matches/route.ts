import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const matches = await prisma.matches.findMany({
            where: {
                status: "pending",
            },
            include: {
                organs: true,
                patients: true,
            },
        });
        return NextResponse.json({
            data: matches,
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message, success: false },
            { status: 500 },
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { id, status } = await req.json();
        const match = await prisma.matches.update({
            where: { id },
            data: {
                status,
            },
        });
        return NextResponse.json(match);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
