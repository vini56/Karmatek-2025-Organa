import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const hospitals = await prisma.hospitals.findMany();
        return NextResponse.json(hospitals);
    } catch (error) {
        NextResponse.json({ error: "Unable to fetch hospitals data" });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { name, location, contact_phone, contact_email } = body;

        const hospital = await prisma.hospitals.create({
            data: {
                name,
                location,
                contact_phone,
                contact_email,
            },
        });
        return NextResponse.json({
            message: "Hospital added successfully",
            success: true,
            data: hospital,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false,
            message: "An error occurred",
        });
    }
}
