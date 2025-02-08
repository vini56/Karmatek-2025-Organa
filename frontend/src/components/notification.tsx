import { useEffect, useState } from "react";
import { connectWebSocket } from "@/lib/socket";

export default function Notifications({
    hospitalId,
}: {
    hospitalId: number | string;
}) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = connectWebSocket(hospitalId, (message) => {
            setNotifications((prev) => [...prev, message]);
        });

        return () => socket.close();
    }, [hospitalId]);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notif, index) => (
                    <li key={index}>{notif}</li>
                ))}
            </ul>
        </div>
    );
}
