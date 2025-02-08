import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const inventory = prisma.bloodInventory.findMany();
        return NextResponse.json({
            data: inventory,
            success: true,
            message: "Inventory fetched successfully",
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false,
            message: "An error occurred",
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

        const data = bloodTypes.map((type) => ({
            bloodType: type,
            unitsAvailable: 1,
            donorHospital: "RG Kar Medical College",
            hospitalId: 1,
        }));

        // console.log(data);

        await prisma.bloodInventory.createMany({
            data,
            skipDuplicates: true,
        });

        return NextResponse.json({
            success: true,
            message: "Blood bank initialized successfully",
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
                success: false,
                message: "An error occurred",
            },
            { status: 500 },
        );
    }
}
