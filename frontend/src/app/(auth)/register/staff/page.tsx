import HospitalForm from "@/components/forms/HospitalForm";
import StaffForm from "@/components/forms/StaffForm";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import React from "react";

function page() {
    return (
        <div>
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="relative hidden h-full w-full p-8 lg:flex">
                    {/* <h1 className="text-xl font-bold">Organ Matching Staff</h1> */}
                    <div className="outline-muted flex flex-grow flex-col items-center justify-center gap-4 rounded-xl p-2 shadow-xl outline">
                        <h3 className="text-foreground text-3xl font-bold">
                            Create New Staff
                        </h3>
                        <h4 className="text-foreground text-xl font-semibold">
                            Discover the perfect match for every patient
                        </h4>
                        <Image
                            src="/Nurse2.jpg"
                            alt="Image"
                            width={400}
                            height={400}
                            className="mx-auto aspect-square max-w-md rounded-lg object-contain"
                        />
                        <p className="text-muted-foreground">
                            Manage organ details with ease.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <a
                            href="#"
                            className="flex items-center gap-2 font-medium"
                        >
                            <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            Organa
                        </a>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center">
                        <div className="w-full max-w-md">
                            <StaffForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
