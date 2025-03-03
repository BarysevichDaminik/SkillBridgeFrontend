import { useState, useEffect } from 'react';

export default function ChatContent() {
    const [chats, setChats] = useState([]);
    const avatar = require(`../Assets/Avatars/avatar${localStorage.getItem('avatarNumber')}.png`);

    useEffect(() => {
        fetch('https://localhost:7186/MainPage/getChatsInfo')
            .then(response => response.json())
            .then(data => setChats(data))
            .catch(error => console.error('Ошибка при получении данных о чатах:', error));
    }, []);

    return (
        <div className="w-100">
            {chats.map(chat => (
                <ChatCard
                    key={chat.id}
                    chatName={chat.chatName}
                    avatar={avatar}
                    mySkill={chat.mySkill}
                    opponentSkill={chat.opponentSkill}
                />
            ))}
        </div>
    );
}

function ChatCard({ chatName, avatar, mySkill, opponentSkill }) {
    return (
        <div className={'d-flex start-50 tra mt-3 mb-3 w-75 rounded-pill border border-3'} style={{ borderColor: 'rgba(46,46,46, 0.5)', height: '100px', position: 'relative', transform: 'translateX(-50%)' }}>
            <div className={'align-self-center ms-3 coats-font fs-3'}>
                {chatName}
            </div>
            <div className={'d-flex align-items-center ms-3 flex-row border-end border-start border-3'} style={{ borderColor: 'rgba(46,46,46, 0.5)' }}>
                <p className="coats-font fs-4 m-0 me-2 ms-2">You: </p>
                <img className="ps-4 avatar-size me-3" src={avatar} alt="" />
                <p className="coats-font fs-4 m-0 me-2 ms-2">Opponent: </p>
                <img className="ps-4 avatar-size me-3" src={avatar} alt="" />
            </div>
            <div className="ms-3 d-flex flex-column justify-content-around border-end border-3" style={{ borderColor: 'rgba(46,46,46, 0.5)' }}>
                <div className="coats-font text-center fs-4">
                    Your skill: {mySkill}
                </div>
                <div className="coats-font text-center fs-4 me-3">
                    Mate's skill: {opponentSkill}
                </div>
            </div>
            <div className="d-flex flex-fill justify-content-center">
                <button className={'d-flex fs-3 rounded-pill p-4 align-items-center align-self-center coats-font end-0 my-gray-color'} style={{ height: '30px', background: 'rgba(46,46,46, 0)', border: 'none' }}>
                    Перейти
                </button>
            </div>
        </div>
    );
}