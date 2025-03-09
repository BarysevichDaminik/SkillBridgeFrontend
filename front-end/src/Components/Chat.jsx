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
            console.log('Полученные данные:', Array.isArray(data));
        })
        .catch(error => console.error('Ошибка при получении данных о чатах:', error));
    }, []);

    return (
        <div className="w-100">
            {chats.map(chat => {
                console.log('Рендеринг чата:', chat);
                return (
                    <ChatCard
                        user1={chat.user1}
                        user2={chat.user2}
                        user2Avatar={ require(`../Assets/Avatars/avatar${chat.user2Avatar}.png`)}
                        createdDate={chat.CreatedDate}
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
    return (
        <div className="d-flex start-50 tra mt-3 mb-3 w-75 rounded-pill border border-3" style={{ borderColor: 'rgba(46,46,46, 0.5)', height: '100px', position: 'relative', transform: 'translateX(-50%)' }}>
            <div className="align-self-center ms-3 coats-font fs-3">
                {chatName}
            </div>
            <div className="d-flex align-items-center ms-3 flex-row border-end border-start border-3" style={{ borderColor: 'rgba(46,46,46, 0.5)' }}>
                <p className="coats-font fs-4 m-0 me-2 ms-2">{user1}: </p>
                <img className="ps-4 avatar-size me-3" src={avatar} alt="" />
                <p className="coats-font fs-4 m-0 me-2 ms-2">{user2}: </p>
                <img className="ps-4 avatar-size me-3" src={user2Avatar} alt="" />
            </div>
            <div className="ms-3 d-flex flex-column justify-content-around border-end border-3 me-2" style={{ borderColor: 'rgba(46,46,46, 0.5)' }}>
                <div className="coats-font text-center fs-4">
                    {mySkill}
                </div>
                <div className="coats-font text-center fs-4 me-3">
                    {opponentSkill}
                </div>
            </div>
            <div className='align-self-center ms-3 coats-font fs-3'>
                {createdDate}
            </div>
            <div className="d-flex flex-fill justify-content-center">
                <button className="d-flex fs-3 rounded-pill p-4 align-items-center align-self-center coats-font end-0 my-gray-color" style={{ height: '30px', background: 'rgba(46,46,46, 0)', border: 'none' }}>
                    Перейти
                </button>
            </div>
        </div>
    );
}
