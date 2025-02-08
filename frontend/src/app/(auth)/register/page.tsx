import StaffForm from "@/components/forms/StaffForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="flex h-screen w-full divide-x">
            <div className="flex basis-1/2 flex-col justify-center gap-4">
                <h1 className="text-primary mx-auto text-4xl font-extrabold">
                    Create a new Hospital
                </h1>
                <Image
                    src="/hospital.jpg"
                    alt="Image"
                    width={500}
                    height={500}
                    className="mx-auto aspect-square max-w-md rounded-lg object-contain"
                />
                <p className="mx-auto text-black/40">
                    Small steps to big recoveries—because every patient deserves
                    the best.
                </p>
                <Button asChild className="mx-auto">
                    <Link href="/register/hospital" className="mx-auto">
                        Create New Hospital
                    </Link>
                </Button>
            </div>
            <div className="flex basis-1/2 flex-col justify-center gap-8">
                {" "}
                <h1 className="text-primary mx-auto text-4xl font-extrabold">
                    Create a new Staff
                </h1>
                <Image
                    src="/Nurse.jpg"
                    alt="Image"
                    width={400}
                    height={400}
                    className="mx-auto aspect-square max-w-md rounded-lg object-contain"
                />
                <p className="mx-auto text-black/40">
                    {" "}
                    Behind every healing story is a nurse who cared.
                </p>{" "}
                <Button asChild className="mx-auto">
                    <Link href="/register/staff" className="mx-auto">
                        Create New Staff
                    </Link>
                </Button>           
            </div>
        </div>
    );
};
export default RegisterPage;
