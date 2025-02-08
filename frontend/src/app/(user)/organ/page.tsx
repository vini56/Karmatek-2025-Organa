import AvailableMatchedTransplantedChart from "@/components/charts/AvailableMatchedTransplantedChart";
import { OrganDistribution } from "@/components/charts/OrganDistribution";
import H2 from "@/components/typography/H2";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OrganPage = () => {
    return (
        <div className="py-4">
            <div className="mb-4 flex justify-between">
                <H2>Organ</H2>
                <Button asChild>
                    <Link href="/organ/add">Add Available Organ</Link>
                </Button>
                {/* <Bell size={36} className="text-primary" /> */}
            </div>
            <div className="flex gap-4">
                <div className="basis-1/2 rounded-lg border p-4 shadow-sm">
                    <AvailableMatchedTransplantedChart />
                </div>
                <div className="basis-1/2 rounded-lg border p-4 shadow-sm">
                    <OrganDistribution />
                </div>
            </div>
        </div>
    );
};
export default OrganPage;
