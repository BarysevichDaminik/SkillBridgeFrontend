import { useState, useEffect, useRef } from "react";
import checkAuth from "./AuthCheck";

export default function ChatWindow({ chat, onBack }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const connectionRef = useRef(null);
    const currentUser = localStorage.getItem("username");

    useEffect(() => {
        const initializeChat = async () => {
            const isAuth = await checkAuth();
            setIsAuthenticated(isAuth);

            if (!isAuth) {
                return;
            }

            const host = window.location.hostname;

            const loadMessages = async () => {
                try {
                    const response = await fetch(`https://${host}:7186/MainPage/msgs?chatId=${chat.chatId}`, {
                        credentials: 'include',
                    });
                    if (!response.ok) {
                        throw new Error();
                    }
                    const data = await response.json();
                    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                    // console.log(sortedData);
                    setMessages(sortedData);
                } catch (error) {
                    console.error("Ошибка загрузки сообщений:", error);
                }
            };

            await loadMessages();

            const connectSignalR = async () => {
                const signalR = await import("@microsoft/signalr");
                connectionRef.current = new signalR.HubConnectionBuilder()
                    .withUrl(`https://${host}:7215/myhub?chatId=${chat.chatId}`)
                    .configureLogging(signalR.LogLevel.None)
                    .withAutomaticReconnect()
                    .build();

                try {
                    await connectionRef.current.start();

                    connectionRef.current.on("SendMessage", (user, text, chatName, chatId) => {
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { user, message: text, chatName, chatId },
                        ]);
                    });
                } catch (error) {
                    console.error("Ошибка подключения SignalR:", error);
                }
            };

            await connectSignalR();
        };

        initializeChat();

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
            }
        };
    }, [chat.chatId]);

    const handleSendMessage = () => {
        if (message.trim() !== "" && connectionRef.current) {
            connectionRef.current
                .invoke("SendMessage", chat.chatId, localStorage.getItem("id"), message)
                .catch((error) => console.error("Ошибка отправки сообщения:", error));
            setMessage("");
        }
    };

    const handleContextMenu = (event, message) => {
        event.preventDefault();
        setContextMenu({
            visible: true,
            x: event.pageX,
            y: event.pageY,
            message,
        });
    };

    const handleDeleteMessage = async () => {
        if (!isAuthenticated) {
            return;
        }
    
        const host = window.location.hostname;
        const messageToDelete = contextMenu.message;
    
        try {
            await fetch(`https://${host}:7215/ChatHub/delMsg`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chatId: messageToDelete.chatId,
                    ulid: messageToDelete.ulid,
                }),
            });

            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg.ulid !== messageToDelete.ulid)
            );
    
        } catch (error) {
        } finally {
            setContextMenu({ ...contextMenu, visible: false });
        }
    };

    const handleClick = () => {
        setContextMenu({ ...contextMenu, visible: false });
    };

    if (!isAuthenticated) {
        return (
            <div className="chat-window d-flex flex-column bg-light shadow rounded-3">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}
                >
                    <p className="text-danger coats-font">
                        Аутентификация не выполнена. Пожалуйста, обновите страницу.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="chat-window d-flex flex-column bg-light shadow rounded-3"
            onClick={handleClick}
        >
            <div className="d-flex align-items-center bg-secondary text-white p-3 rounded-3">
                <button className="btn btn-light me-3" onClick={onBack}>
                    Назад
                </button>
                <h2 className="m-0">Чат: {chat.chatName}</h2>
            </div>
    
            <div className="flex-grow-1 p-4 overflow-auto" style={{ maxHeight: "60vh" }}>
                {messages
                    .filter((msg) => msg.chatId === chat.chatId)
                    .map((msg, index) => {
                        const isCurrentUser = msg.user === currentUser;
                        return (
                            <div
                                key={index}
                                className={`message p-2 mb-2 rounded ${
                                    isCurrentUser
                                        ? "bg-primary text-white ms-auto"
                                        : "bg-secondary text-white me-auto"
                                }`}
                                style={{
                                    maxWidth: "70%",
                                    textAlign: isCurrentUser ? "right" : "left",
                                }}
                                onContextMenu={(event) => handleContextMenu(event, msg)}
                            >
                                <strong>{msg.user}:</strong> {msg.message}
                            </div>
                        );
                    })}
            </div>
    
            {contextMenu.visible && (
                <div
                    className="shadow rounded-3"
                    style={{
                        position: "absolute",
                        top: contextMenu.y,
                        left: contextMenu.x,
                        backgroundColor: "white",
                        padding: "10px",
                    }}
                >
                    <p>
                        <strong>{contextMenu.message.user}</strong>: {contextMenu.message.message}
                    </p>
                    <button className="shadow rounded-3 border-0 bg-info text-light" onClick={handleDeleteMessage}>Удалить сообщение</button>
                    {/* <button onClick={() => alert("Опция 2 для сообщения")}>Опция 2</button> */}
                </div>
            )}
    
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