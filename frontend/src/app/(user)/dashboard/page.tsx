import { HlaMatchSuccessRate } from "@/components/charts/HlaMatchSuccessRate";
import { OperationSuccessRate } from "@/components/charts/OperationSuccessRate";
import { PatientWaitingByOrganType } from "@/components/charts/PatientWaitingByOrganType";
import { TransplantCompleted } from "@/components/charts/TransplantCompleted";
import H3 from "@/components/typography/H3";
import { Heart } from "lucide-react";
import { Handshake } from "lucide-react";

const DashboardPage = () => {
    return (
        <div className="space-y-4 pb-4">
            <div className="grid grid-cols-5 gap-4">
                <div className="bg-primary text-primary-foreground col-span-3 rounded-xl p-4">
                    <div className="flex h-full gap-8 p-4">
                        <Handshake size={80} className="" />
                        <div className="h-full w-full space-y-4">
                            <div className="">
                                <h1 className="font-semibold">Hello,</h1>
                                <h1 className="mb-4 pt-2 text-4xl font-bold">
                                    Hospital Staff!
                                </h1>
                                <p>
                                    <strong>Hosital Name: </strong>NRS
                                </p>
                                <p>
                                    <strong>Staff-id: </strong>0000001
                                </p>
                            </div>
                            <p className="max-w-[550px] text-wrap">
                                Today is Sunday. Three organ matches are found.
                                Lets have some live.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="border-primary col-span-1 space-y-8 rounded-xl border p-4 text-center">
                    <H3>Statistics</H3>
                    <div className="divide-y px-4">
                        <StatComponent title="Total Patients" value="100" />
                        <StatComponent title="Transplants" value="50" />
                        <StatComponent title="Available Organs" value="3" />
                    </div>
                </div>
                <OperationSuccessRate />
            </div>
            <div className="">
                <TransplantCompleted />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <PatientWaitingByOrganType />
                <HlaMatchSuccessRate />
            </div>
        </div>
    );
};
export default DashboardPage;

const StatComponent = ({
    title,
    value,
    children,
}: {
    title: string;
    value: string | number;
    children?: React.ReactNode;
}) => {
    return (
        // <div className="flex w-full cursor-pointer flex-col items-center justify-center p-4 text-center">
        //     <div>
        //         <Heart size={32} />
        //     </div>
        <div className="flex h-16 w-full cursor-pointer flex-col items-center justify-center p-4 text-center">
            <p className="mx-auto font-bold">{value}</p>
            <p className="mx-auto text-xs">{title}</p>
        </div>
        // </div>
    );
};
