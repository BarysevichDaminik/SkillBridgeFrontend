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
                console.log("SignalR подключение установлено");
                if (onConnectionReady) {
                    onConnectionReady(connection.current); // Передаём экземпляр подключения в родительский компонент
                }
            })
            .catch((err) => console.error("Ошибка подключения SignalR:", err));

        connection.current.on("ReceiveMessage", (user, message) => {
            if (onMessageReceived) {
                onMessageReceived({ user, message });
            }
        });

        return () => {
            connection.current.stop().then(() => console.log("SignalR подключение закрыто"));
        };
    }, [onMessageReceived, onConnectionReady]); // useEffect зависит только от переданных функций

    return null; // Этот компонент ничего не рендерит
}