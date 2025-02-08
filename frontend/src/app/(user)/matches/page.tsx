"use client";

import MatchCard from "@/components/match-card";
import H2 from "@/components/typography/H2";
import H3 from "@/components/typography/H3";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const MatcherPage = () => {
    const [matches, setMatches] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const { toast } = useToast();

    const approveMatch = async (id: number) => {
        try {
            const res = await axios.patch(`/api/matches/`, {
                status: "approved",
                id: id,
            });
            toast({
                title: "Match Approved",
                variant: "success",
            });
            setRefreshKey((prev) => prev + 1);
        } catch (error) {
            toast({
                title: "Something went wrong!",
                variant: "destructive",
            });
        }
    };
    const dismissMatch = async (id: number) => {
        try {
            const res = await axios.patch(`/api/matches/`, {
                status: "rejected",
                id: id,
            });
            toast({
                title: "Match Dismissed",
                variant: "success",
            });
            setRefreshKey((prev) => prev + 1);
        } catch (error) {
            toast({
                title: "Something went wrong!",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        const getNotifications = async () => {
            const response = await axios("/api/matches");
            const matchData = response.data.data.sort(
                (a, b) => b.match_score - a.match_score,
            );
            // const data = await response.json();
            console.log(response.data);
            setMatches(response.data.data);
        };

        getNotifications();
    }, [refreshKey]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <H2>Match Alerts</H2>
                <Bell size={36} className="text-primary" />
            </div>
            <div className="flex w-full justify-between gap-4">
                {/* <div className="shadow-border/50 bg-secondary/30 mb-8 grid flex-grow grid-cols-1 items-center justify-center gap-4 rounded-xl border p-4 shadow-lg"> */}
                {/* <H3>New Updates</H3> */}
                {/* <Separator /> */}
                <div className="grid w-full grid-cols-1 gap-4">
                    {matches?.map((match, index) => (
                        // <div key={index}>Notification: {index}</div>
                        <MatchCard
                            // notificationData={n}

                            key={index}
                            match={match}
                            organ={match.organs}
                            patient={match.patients}
                            onApprove={() => approveMatch(match.id)}
                            onDismiss={() => dismissMatch(match.id)}
                        />
                    ))}
                </div>
                {/* </div> */}
                <div className="shadow-border/50 max-h-96 w-72 rounded-xl border shadow-lg"></div>
            </div>
        </div>
    );
};
export default MatcherPage;
