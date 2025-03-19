import { useState, useEffect, useRef } from "react";

export default function ChatWindow({ chat, onBack }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const connectionRef = useRef(null);

    useEffect(() => {
        const host = window.location.hostname;

        const loadMessages = async () => {
            try {
                const response = await fetch(`https://${host}:7186/MainPage/msgs?chatName=${chat.chatName}`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки сообщений: ${response.statusText}`);
                }
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error("Ошибка загрузки сообщений:", error);
            }
        };

        loadMessages();

        const connectSignalR = async () => {
            const signalR = await import("@microsoft/signalr");
            connectionRef.current = new signalR.HubConnectionBuilder()
                .withUrl(`https://${host}:7215/myhub`)
                .withAutomaticReconnect()
                .build();

            try {
                await connectionRef.current.start();
                console.log("SignalR подключение установлено");

                connectionRef.current.on("SendMessage", (user, text) => {
                    setMessages((prevMessages) => [...prevMessages, { user, message: text }]);
                });
            } catch (error) {
                console.error("Ошибка подключения SignalR:", error);
            }
        };

        connectSignalR();

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop().then(() => console.log("SignalR подключение закрыто"));
            }
        };
    }, [chat.chatName]);

    const handleSendMessage = () => {
        if (message.trim() !== "" && connectionRef.current) {
            connectionRef.current
                .invoke("SendMessage", chat.chatName, localStorage.getItem("username"), message)
                .catch((error) => console.error("Ошибка отправки сообщения:", error));
            setMessage("");
        }
    };

    return (
        <div className="chat-window d-flex flex-column bg-light shadow rounded-3" style={{ height: "80vh", margin: "0 auto" }}>
            <div className="d-flex align-items-center bg-secondary text-white p-3 rounded-3">
                <button className="btn btn-light me-3" onClick={onBack}>
                    Назад
                </button>
                <h2 className="m-0">Чат: {chat.chatName}</h2>
            </div>

            <div className="flex-grow-1 p-4 overflow-auto" style={{ maxHeight: "60vh" }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message p-2 mb-2 rounded ${msg.user === "Вы" ? "bg-primary text-white ms-auto" : "bg-secondary text-white me-auto"}`}
                        style={{ maxWidth: "70%" }}
                    >
                        <strong>{msg.user}:</strong> {msg.message}
                    </div>
                ))}
            </div>

            <div className="d-flex align-items-center p-3 border-top">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSendMessage}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
}