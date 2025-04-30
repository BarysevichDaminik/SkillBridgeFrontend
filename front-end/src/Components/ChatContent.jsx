import { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatContent() {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exchanges, setExchanges] = useState([]); // State to hold exchanges
    const [selectedExchange, setSelectedExchange] = useState(null); // State for selected exchange
    const [chatName, setChatName] = useState("");

    const avatar = require(`../Assets/Avatars/avatar${localStorage.getItem("avatarNumber")}.png`);

    const fetchChats = async () => {
        const host = window.location.hostname;
        return await fetch(`https://${host}:7186/MainPage/getChatsInfo`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    };

    const fetchExchanges = async () => {
        const host = window.location.hostname;
        try {
            const response = await fetch(`https://${host}:7186/MainPage/getExchangesInfo`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setExchanges(data); // Store fetched exchanges
            }
        } catch (error) {
            console.error("Error fetching exchanges:", error);
        }
    };

    useEffect(() => {
        fetchChats()
            .then((response) => {
                if (!response || !response.ok) {
                    return;
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setChats(data);
                }
            })
            .catch(() => {});
    }, []);

    const handleBackToChats = async () => {
        const host = window.location.hostname;
        await fetch(`https://${host}:7215/ChatHub/clearMsgs`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chatId: selectedChat.chatId,
            }),
        });
        setSelectedChat(null);
    };

    const handleAddChatSubmit = async () => {
        const host = window.location.hostname;
        try {
            const response = await fetch(`https://${host}:7186/MainPage/addChat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: chatName,
                    exchangeId: selectedExchange.exchangeId,
                }),
            });
            if (response.ok) {
                setIsModalOpen(false);
                setChatName("");
                setSelectedExchange(null);
                fetchChats(); // Optionally fetch updated chat list
            }
        } catch (error) {
            console.error("Error adding chat:", error);
        }
    };

    const handleModalOpen = async () => {
        setIsModalOpen(true);
        await fetchExchanges(); // Fetch exchanges when modal opens
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedExchange(null); // Clear selected exchange
    };

    return (
        <div className="w-100" style={{ position: "relative" }}>
            <div style={{ display: "flex", marginBottom: "20px" }}>
                <button
                    className="btn btn-success"
                    onClick={handleModalOpen}
                    style={{ marginRight: "10px" }}
                >
                    Добавить чат
                </button>
            </div>

            {isModalOpen && (
                <div
                    className="modal-overlay"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                    onClick={handleModalClose}
                >
                    <div
                        className="modal-content"
                        style={{
                            position: "relative",
                            width: "400px",
                            padding: "20px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="btn btn-secondary"
                            style={{ position: "absolute", top: "10px", left: "10px" }}
                            onClick={handleModalClose}
                        >
                            Назад
                        </button>

                        <div className="form-group mb-3">
                            <label htmlFor="chatName">Название чата:</label>
                            <input
                                id="chatName"
                                className="form-control"
                                type="text"
                                value={chatName}
                                onChange={(e) => setChatName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Выберите обмен:</label>
                            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                                {exchanges.map((exchange) => (
                                    <div
                                        key={exchange.exchangeId}
                                        className="border p-3 mb-2 rounded"
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: selectedExchange === exchange
                                                ? "lightblue"
                                                : "white",
                                        }}
                                        onClick={() => setSelectedExchange(exchange)}
                                    >
                                        Оппонент: {exchange.user2}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleAddChatSubmit}
                            disabled={!selectedExchange}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            )}

            {selectedChat ? (
                <ChatWindow chat={selectedChat} onBack={handleBackToChats} />
            ) : (
                chats.map((chat) => (
                    <ChatCard
                        chat={chat}
                        avatar={avatar}
                        avatar2num={chat.user2Avatar}
                        onSelect={() => setSelectedChat(chat)}
                    />
                ))
            )}
        </div>
    );
}

function ChatCard({ chat, avatar, avatar2num, onSelect }) {
    const avatar2 = require(`../Assets/Avatars/avatar${avatar2num}.png`);
    return (
        <div
            className="d-flex start-50 tra mt-3 mb-3 rounded-pill border border-3 bg-light shadow"
            style={{
                borderColor: "rgba(46,46,46, 0.5)",
                height: "100px",
                position: "relative",
                transform: "translateX(-50%)",
            }}
        >
            <div className="align-self-center ms-3 coats-font fs-3">
                {chat.chatName}
            </div>
            <div
                className="d-flex align-items-center ms-3 flex-row border-end border-start border-3"
                style={{ borderColor: "rgba(46,46,46, 0.5)" }}
            >
                <p className="coats-font fs-4 m-0 me-2 ms-2">You: </p>
                <img className="ps-4 avatar-size me-3" src={avatar} alt="" />
                <p className="coats-font fs-4 m-0 me-2 ms-2">Opponent: </p>
                <img className="ps-4 avatar-size me-3" src={avatar2} alt="" />
            </div>
            <div className="ms-3 d-flex flex-column justify-content-around border-end border-3" style={{ borderColor: "rgba(46,46,46, 0.5)" }}>
                <div className="coats-font text-center fs-4">Your skill: {chat.mySkill}</div>
                <div className="coats-font text-center fs-4 me-3">Mate's skill: {chat.opponentSkill}</div>
            </div>
            <div className="d-flex flex-fill justify-content-center">
                <button
                    className="d-flex fs-3 rounded-pill p-4 align-items-center align-self-center coats-font end-0 my-gray-color"
                    style={{ height: "30px", background: "rgba(46,46,46, 0)", border: "none" }}
                    onClick={onSelect}
                >
                    Перейти
                </button>
            </div>
        </div>
    );
}