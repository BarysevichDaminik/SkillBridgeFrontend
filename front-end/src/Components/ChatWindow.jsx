import { useState, useEffect, useRef } from "react";

export default function ChatWindow({ chat, onBack }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const connectionRef = useRef(null);
    const currentUser = localStorage.getItem("username");

    useEffect(() => {
        const host = window.location.hostname;
        const loadMessages = async () => {
            try {
                const response = await fetch(`https://${host}:7186/MainPage/msgs?chatName=${chat.chatName}`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error();
                }
                const data = await response.json();
                const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                console.log(sortedData);
                setMessages(sortedData);
            } catch (error) { }
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

                connectionRef.current.on("SendMessage", (user, text) => {
                    setMessages((prevMessages) => [...prevMessages, { user, message: text }]);
                });
            } catch (error) { }
        };

        connectSignalR();

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
            }
        };
    }, [chat.chatName]);

    const handleSendMessage = () => {
        if (message.trim() !== "" && connectionRef.current) {
            connectionRef.current
                .invoke("SendMessage", chat.chatName, localStorage.getItem("id"), message)
                .catch();
            setMessage("");
        }
    };

    const handleBack = async () => {
        const host = window.location.hostname;

        try {
            const response = await fetch(`https://${host}:7215/ChatHub/clearMsgs?chatName=${chat.chatName}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error();
            }
        } catch (error) {
        }
        finally {
            onBack();
        }
    };


    return (
        <div className="chat-window d-flex flex-column bg-light shadow rounded-3" style={{ height: "80vh", margin: "0 auto" }}>
            <div className="d-flex align-items-center bg-secondary text-white p-3 rounded-3">
                <button className="btn btn-light me-3" onClick={handleBack}>
                    Назад
                </button>
                <h2 className="m-0">Чат: {chat.chatName}</h2>
            </div>

            <div className="flex-grow-1 p-4 overflow-auto" style={{ maxHeight: "60vh" }}>
                {messages
                    .filter(msg => msg.chatName === chat.chatName)
                    .map((msg, index) => {
                        console.log("msg.chatname: " + msg.chatName + ", chat.chatname: " + chat.chatName);
                        const isCurrentUser = msg.user === currentUser;
                        return (
                            <div
                                key={index}
                                className={`message p-2 mb-2 rounded ${isCurrentUser ? "bg-primary text-white ms-auto" : "bg-secondary text-white me-auto"}`}
                                style={{ maxWidth: "70%", textAlign: isCurrentUser ? "right" : "left" }}
                            >
                                <strong>{msg.user}:</strong> {msg.message}
                            </div>
                        );
                    })}
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