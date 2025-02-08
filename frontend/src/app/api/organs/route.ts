import { prisma } from "@/lib/prisma";
import { patients } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type PatientType = patients & { score: number };

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Body: ", body);
        const newOrgan = await prisma.organs.create({
            data: {
                donor_age: body.donor_age,
                donor_blood_type: body.donor_blood_type,
                donor_gender: body.donor_gender,
                donor_hospital: body.donor_hospital,
                expected_preservation_time: body.expected_preservation_time,
                organ_type: body.organ_type,
                hla_a: body.hla_a,
                hla_b: body.hla_b,
                hla_c: body.hla_c,
                hla_drb1: body.hla_drb1,
                hla_dqb1: body.hla_dqb1,
                status: "available",
                hospital_id: 1,
                cause_of_death: body.cause_of_death,
                recovery_date: new Date(),
                current_location: "hospital",
                // viral_testing_status: "pending",
                organ_condition_rating: body.organ_condition_rating,
                medical_history: body.medical_history,
                organ_size: body.organ_size,
                viral_testing_status: "pending",
                organ_biopsy_results: body.organ_biopsy_results,
            },
        });
        console.log("New Organ: Added:", newOrgan);
        // Match the organ with the hospital
        let patients = await prisma.patients.findMany({
            where: {
                organ_needed: newOrgan.organ_type,
                status: "waiting",
            },
        });

        // Score the patients based on compatibility
        patients.forEach((patient) => {
            let score = 20;

            // Blood type compatibility (assume universal donor/recipient rules)
            if (
                newOrgan.donor_blood_type === patient.blood_type ||
                patient.blood_type === "AB"
            ) {
                score += 30; // Blood type match is critical
            }

            // HLA typing match

            if (patient.hla_test !== null) {
                if (newOrgan.hla_a === patient.hla_test.hlaA) {
                    score += 10;
                }
                if (newOrgan.hla_b === patient.hla_test.hlaB) {
                    score += 10;
                }
                if (newOrgan.hla_c === patient.hla_test.hlaC) {
                    score += 10;
                }
                if (newOrgan.hla_dr === patient.hla_test.hlaDRB1) {
                    score += 10;
                }
                if (newOrgan.hla_dq === patient.hla_test.hlaDQB1) {
                    score += 10;
                }
            }

            patient.score = score;
        });

        // Sort patients by score in descending order
        patients.sort((a, b) => b.score - a.score);

        // Remove patients with a score less than 50
        patients = patients.filter((patient) => patient.score >= 50);

        if (patients.length > 0) {
            // console.log("Patient Matches: ", patients);
            const notification = await axios.post(
                "http://localhost:4000/send-notification",
                {
                    message: "New Organ Match Available! Badhai Ho!",
                },
            );
        } else {
            console.log("No Matches Found");
        }

        // If Match found, send notification to hospital and Add to Database (implement logic here)
        patients.forEach(async (patient) => {
            // generate ai summary for patient
            const newMatch = await prisma.matches.create({
                data: {
                    organ_id: newOrgan.id,
                    patient_id: patient.id,
                    match_score: patient.score,
                    status: "pending",
                },
            });
            try {
                const patientSummary = await axios.post(
                    "http://localhost:4000/ai",
                    {
                        patient: patient,
                        match: newMatch,
                        organ: newOrgan,
                    },
                );
                await prisma.matches.update({
                    data: {
                        ai_summary: patientSummary.data.data,
                    },
                    where: {
                        id: newMatch.id,
                    },
                });
            } catch (error) {}
        });

        // Send Notification to Hospital

        return NextResponse.json({
            message: "Organ added successfully",
            success: true,
            data: newOrgan,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false,
            message: "An error occurred",
        });
    }
}
