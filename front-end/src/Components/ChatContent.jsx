import { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatContent() {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

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

    useEffect(() => {
        fetchChats()
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setChats(data);
                }
            })
            .catch((error) => console.error("Ошибка при получении данных о чатах:", error));
    }, []);

    const handleBackToChats = () => {
        setSelectedChat(null);
    };

    return (
        <div className="w-100">
            {selectedChat ? (
                <ChatWindow chat={selectedChat} onBack={handleBackToChats} />
            ) : (
                chats.map((chat) => (
                    <ChatCard
                        chat={chat}
                        avatar={avatar}
                        onSelect={() => setSelectedChat(chat)}
                    />
                ))
            )}
        </div>
    );
}

function ChatCard({ chat, avatar, onSelect }) {
    return (
        <div
            className={
                "d-flex start-50 tra mt-3 mb-3 rounded-pill border border-3 bg-light shadow"
            }
            style={{
                borderColor: "rgba(46,46,46, 0.5)",
                height: "100px",
                position: "relative",
                transform: "translateX(-50%)",
            }}
        >
            <div className={"align-self-center ms-3 coats-font fs-3"}>
                {chat.chatName}
            </div>
            <div
                className={
                    "d-flex align-items-center ms-3 flex-row border-end border-start border-3"
                }
                style={{ borderColor: "rgba(46,46,46, 0.5)" }}
            >
                <p className="coats-font fs-4 m-0 me-2 ms-2">You: </p>
                <img className="ps-4 avatar-size me-3" src={avatar} alt="" />
                <p className="coats-font fs-4 m-0 me-2 ms-2">Opponent: </p>
                <img className="ps-4 avatar-size me-3" src={avatar} alt="" />
            </div>
            <div className="ms-3 d-flex flex-column justify-content-around border-end border-3" style={{ borderColor: "rgba(46,46,46, 0.5)" }}>
                <div className="coats-font text-center fs-4">Your skill: {chat.mySkill}</div>
                <div className="coats-font text-center fs-4 me-3">Mate's skill: {chat.opponentSkill}</div>
            </div>
            <div className="d-flex flex-fill justify-content-center">
                <button
                    className={
                        "d-flex fs-3 rounded-pill p-4 align-items-center align-self-center coats-font end-0 my-gray-color"
                    }
                    style={{ height: "30px", background: "rgba(46,46,46, 0)", border: "none" }}
                    onClick={onSelect}
                >
                    Перейти
                </button>
            </div>
        </div>
    );
}