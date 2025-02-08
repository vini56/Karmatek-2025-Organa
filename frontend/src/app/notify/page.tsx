"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";

const TestNotificationPage = () => {
    const notifyUser = async () => {
        try {
            const res = await axios.post(
                "http://localhost:4000/send-notification",
                {
                    message: "New Organ Match Available!",
                },
            );
        } catch (error) {}
    };

    return (
        <Button onClick={notifyUser} className="m-4">
            Click Me ! Send Notification
        </Button>
    );
};

export default TestNotificationPage;
