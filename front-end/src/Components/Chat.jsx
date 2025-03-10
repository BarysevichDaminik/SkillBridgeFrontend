import { useState, useEffect } from 'react';

export default function ChatContent() {
    const [chats, setChats] = useState([]);
    const avatar = require(`../Assets/Avatars/avatar${localStorage.getItem('avatarNumber')}.png`);

    useEffect(() => {
        fQuery().then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                setChats(data);
            }
        })
        .catch();
    }, []);

    return (
        <div className="w-100">
            {chats.map(chat => {
                return (
                    <ChatCard
                        user1={chat.user1}
                        user2={chat.user2}
                        user2Avatar={ require(`../Assets/Avatars/avatar${chat.user2Avatar}.png`)}
                        createdDate={chat.createdDate}
                        chatName={chat.chatName}
                        avatar={avatar}
                        mySkill={chat.mySkill}
                        opponentSkill={chat.opponentSkill}
                    />
                );
            })}
        </div>
    );
}

const fQuery = async () => {
    return await fetch('https://localhost:7186/MainPage/getChatsInfo' , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
}

function ChatCard({ user1, user2, user2Avatar, chatName, avatar, mySkill, createdDate, opponentSkill }) {

    const date = new Date(createdDate);

    const formattedDate = date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const formattedTime = date.toLocaleTimeString('ru-RU', {
        hour: 'numeric',
        minute: 'numeric'
    });

    return (
        <div className="d-flex start-50 tra mt-3 mb-3 rounded-pill border border-3 bg-light shadow" style={{ borderColor: 'rgba(46,46,46, 0.5)', height: '100px', position: 'relative', transform: 'translateX(-50%)' }}>
            <div className="align-self-center ms-3 coats-font fs-4">
                {chatName}
            </div>
            <div className="d-flex align-items-center ms-3 flex-row border-end border-start border-3" style={{ borderColor: 'rgba(46,46,46, 0.5)' }}>
                <p className="coats-font fs-4 m-0 me-2 ms-2">{user1}: </p>
                <img className="ps-4 avatar-size me-3" src={avatar} alt="" />
                <p className="coats-font fs-4 m-0 me-2 ms-2">{user2}: </p>
                <img className="ps-4 avatar-size me-3" src={user2Avatar} alt="" />
            </div>
            <div className="ms-3 d-flex flex-column flex-fill justify-content-around border-end border-3 pe-3" style={{ borderColor: 'rgba(46,46,46, 0.5)' }}>
                <div className="coats-font text-center fs-4">
                    {mySkill}
                </div>
                <div className="coats-font text-center fs-4 me-3">
                    {opponentSkill}
                </div>
            </div>
            <div className='d-flex justify-content-center flex-column ms-3 pe-3 coats-font fs-4 border-end border-3 h-100'>
                Чат создан: <br />
                {formattedDate} в {formattedTime}
            </div>
            <div className="d-flex flex-fill justify-content-center border-end border-3">
                <button className="d-flex fs-4 rounded-pill p-4 align-items-center align-self-center coats-font my-gray-color" style={{ height: '30px', background: 'rgba(46,46,46, 0)', border: 'none' }}>
                    Перейти
                </button>
            </div>
            <div className="d-flex flex-fill justify-content-center">
                <button className="d-flex fs-4 rounded-pill p-4 align-items-center align-self-center coats-font my-gray-color" style={{ height: '30px', background: 'rgba(46,46,46, 0)', border: 'none' }}>
                    Завершить
                </button>
            </div>
        </div>
    );
}
