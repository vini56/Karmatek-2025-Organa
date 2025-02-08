"use client";
import H2 from "@/components/typography/H2";
import H4 from "@/components/typography/H4";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import routes from "@/lib/routes";

interface Patient {
    id: number;
    name: string;
    blood_type: string;
    organ_needed: string;
    priorityStatus: number;
    status: string;
}

const dummyPatients: Patient[] = [
    {
        id: 1,
        name: "Alice Johnson",
        age: 45,
        bloodType: "O+",
        organNeeded: "Kidney",
        status: "Waiting",
        priorityStatus: 1.9,
    },
    {
        id: 2,
        name: "Bob Smith",
        age: 52,
        bloodType: "A-",
        organNeeded: "Liver",
        status: "Matched",
        priorityStatus: 2.6,
    },
    {
        id: 3,
        name: "Charlie Davis",
        age: 36,
        bloodType: "B+",
        organNeeded: "Heart",
        status: "Transplanted",
        priorityStatus: 3.2,
    },
    {
        id: 4,
        name: "David Brown",
        age: 29,
        bloodType: "AB-",
        organNeeded: "Lung",
        status: "Deceased",
        priorityStatus: 4.0,
    },
    {
        id: 5,
        name: "Eve Wilson",
        age: 41,
        bloodType: "O-",
        organNeeded: "Kidney",
        status: "Waiting",
        priorityStatus: 1.5,
    },
    {
        id: 6,
        name: "Frank Miller",
        age: 58,
        bloodType: "A+",
        organNeeded: "Liver",
        status: "Matched",
        priorityStatus: 2.3,
    },
    {
        id: 7,
        name: "Grace Lee",
        age: 34,
        bloodType: "B-",
        organNeeded: "Heart",
        status: "Transplanted",
        priorityStatus: 3.1,
    },
    {
        id: 8,
        name: "Harry Wilson",
        age: 27,
        bloodType: "AB+",
        organNeeded: "Lung",
        status: "Deceased",
        priorityStatus: 4.0,
    },
    {
        id: 9,
        name: "Ivy White",
        age: 49,
        bloodType: "O+",
        organNeeded: "Kidney",
        status: "Waiting",
        priorityStatus: 1.8,
    },
    {
        id: 10,
        name: "Jack Brown",
        age: 54,
        bloodType: "A-",
        organNeeded: "Liver",
        status: "Matched",
        priorityStatus: 2.5,
    },
    {
        id: 11,
        name: "Kane Davis",
        age: 39,
        bloodType: "B+",
        organNeeded: "Heart",
        status: "Transplanted",
        priorityStatus: 3.3,
    },
    {
        id: 12,
        name: "Lily Johnson",
        age: 32,
        bloodType: "AB-",
        organNeeded: "Lung",
        status: "Deceased",
        priorityStatus: 4.0,
    },
    {
        id: 13,
        name: "Mike Smith",
        age: 47,
        bloodType: "O-",
        organNeeded: "Kidney",
        status: "Waiting",
        priorityStatus: 1.7,
    },
];

const headers: (keyof Patient)[] = [
    "id",
    "name",
    "blood_type",
    "organ_needed",
    "status",
];

const PatientPage = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const getPatients = async () => {
            try {
                const response = await axios.get(routes.getPatients);
                console.log(response.data);

                setPatients(response.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        getPatients();
    }, []);

    return (
        // <div>
        <div className="space-y-4">
            <div className="flex justify-between">
                <H2>Match Alerts</H2>
                <Button asChild>
                    <Link href="/patient/add">Add Patient</Link>
                </Button>
            </div>
            <div className="flex w-full justify-between gap-4">
                <div className="shadow-border/50 mb-8 grid flex-grow grid-cols-1 items-center justify-center gap-4 rounded-xl border p-4 shadow-lg">
                    <H4 className="mb-4 mt-2">Waitlist</H4>
                    {patients && (
                        <DataTable
                            headers={headers}
                            data={patients}
                            caption="Current Waitlist for Organ Donation"
                        />
                    )}
                </div>
                <div className="shadow-border/50 max-h-96 w-72 rounded-xl border p-4 shadow-lg">
                    <h6 className="text-xl font-bold">Filter</h6>
                </div>
            </div>
        </div>
    );
};
export default PatientPage;
