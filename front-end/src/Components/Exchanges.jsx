import { useState, useEffect } from 'react';

export default function ExchangesContent() {
    const [exchanges, setExchanges] = useState([]);

    const avatar = require(`../Assets/Avatars/avatar${localStorage.getItem('avatarNumber')}.png`);

    useEffect(() => {
        fQuery().then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setExchanges(data);
                }
            })
            .catch();
    }, []);

    return (
        <div className="w-100">
            {exchanges.map(exchange => {
                console.log(exchange);
                return (
                    <ExchangeCard
                        user1={exchange.user1}
                        user2={exchange.user2}
                        startDate={exchange.startDate}
                        isActive={exchange.isActive === true ? "yes" : "no"}
                        chats={exchange.chats}
                        avatar={avatar}
                        user2Avatar={ require(`../Assets/Avatars/avatar${exchange.user2Avatar}.png`)}
                    />
                );
            })}
        </div>
    );
}

const fQuery = async () => {
    const host = window.location.hostname;
    return await fetch(`https://${host}:7186/MainPage/getExchangesInfo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
}

function ExchangeCard({ user1, user2, startDate, isActive, chats, avatar, user2Avatar }) {

    const date = new Date(startDate);

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
            <div className="d-flex align-items-center ms-3 flex-row border-end border-3" style={{ borderColor: 'rgba(46,46,46, 0.5)' }}>
                <p className="coats-font fs-4 m-0 me-2 ms-2">{user1}: </p>
                <img className="ps-4 avatar-size me-3" src={avatar} alt="" />
                <p className="coats-font fs-4 m-0 me-2 ms-2">{user2}: </p>
                <img className="ps-4 avatar-size me-3" src={user2Avatar} alt="" />
            </div>
            <div className='d-flex justify-content-center flex-column ms-3 pe-3 coats-font fs-4 border-end border-3 h-100'>
                Обмен начался: <br />
                {formattedDate} в {formattedTime}
            </div>
            <div className='d-flex justify-content-center flex-column ms-3 pe-3 border-end border-3 coats-font fs-4'>
                Active: {isActive}
            </div>
            <div className='d-flex justify-content-center flex-column ms-3 pe-3 border-end border-3 coats-font fs-4'>
                {chats} chats
            </div>
            <div className="d-flex flex-fill justify-content-center border-end border-3">
                <button className="d-flex fs-4 rounded-pill p-4 align-items-center align-self-center coats-font end-0 my-gray-color" style={{ height: '30px', background: 'rgba(46,46,46, 0)', border: 'none' }}>
                    Перейти
                </button>
            </div>
            <div className="d-flex flex-fill justify-content-center">
                <button className="d-flex fs-4 rounded-pill p-4 align-items-center align-self-center coats-font end-0 my-gray-color" style={{ height: '30px', background: 'rgba(46,46,46, 0)', border: 'none' }}>
                    Завершить
                </button>
            </div>
        </div>
    );
}