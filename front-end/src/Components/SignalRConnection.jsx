import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export default function SignalRConnection({ onMessageReceived, onConnectionReady }) {
    const connection = useRef(null);

    useEffect(() => {
        const host = window.location.hostname;
        connection.current = new signalR.HubConnectionBuilder()
            .withUrl(`https://${host}:7215/myhub`)
            .withAutomaticReconnect()
            .build();

        connection.current
            .start()
            .then(() => {
                if (onConnectionReady) {
                    onConnectionReady(connection.current);
                }
            })
            .catch(err);

        connection.current.on("ReceiveMessage", (user, message) => {
            if (onMessageReceived) {
                onMessageReceived({ user, message });
            }
        });

        return () => {
            connection.current.stop();
        };
    }, [onMessageReceived, onConnectionReady]);

    return null;
}