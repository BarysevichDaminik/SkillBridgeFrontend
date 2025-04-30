import { useState, useEffect } from 'react';
import "../Styles/index.css";

export default function ExchangesContent() {
    const [exchanges, setExchanges] = useState([]);
    const avatar = require(`../Assets/Avatars/avatar${localStorage.getItem('avatarNumber')}.png`);
    const image2 = require(`../Assets/MainPage/BottomImage1_ru.png`);
    const image4 = require(`../Assets/MainPage/BottomImage2_ru.png`);
    const image6 = require(`../Assets/MainPage/BottomImage3_ru.png`);
    const image8 = require(`../Assets/MainPage/BottomImage4_ru.png`);
    const [currentImage, setCurrentImage] = useState(image2);
    
    const handleFindExchange = async () => {
        const host = window.location.hostname;
        try {
            const response = await fetch(`https://${host}:7186/MainPage/findExchange`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.status === 404) {
                setCurrentImage(image4);
            } else if (response.ok) {
                // const data = await response.json();
                setCurrentImage(image8);
            } else {
                setCurrentImage(image6);
            }
        } catch {
            setCurrentImage(image6);
        }
    };

    useEffect(() => {
        fQuery().then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setExchanges(data);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div className="w-100">
            <div>
                {exchanges.map(exchange => {
                    return (
                        <ExchangeCard
                            user1={exchange.user1}
                            user2={exchange.user2}
                            startDate={exchange.startDate}
                            isActive={exchange.isActive === true ? "yes" : "no"}
                            chats={exchange.chats}
                            avatar={avatar}
                            user2Avatar={require(`../Assets/Avatars/avatar${exchange.user2Avatar}.png`)}
                        />
                    );
                })}
            </div>

            <div className="w-100 d-flex justify-content-between align-items-center mb-4" style={{ position: 'fixed', bottom: '0', width: '100%', maxHeight: '260px', padding: '0 40px', overflow: 'hidden' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ flex: 1, height: '100%' }}>
                    <img src={currentImage} alt="Placeholder" style={{ width: '45%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ flex: 1, height: '100%' }}>
                    <p
                        className="nav-item1 shadow coats-font text-center p-2 ps-4 pe-4 rounded-pill border border-2 border-dark m-0"
                        onClick={handleFindExchange}
                        style={{
                            width: '50%',
                            height: '50%',
                            backgroundColor: 'white',
                            color: 'dark',
                            fontSize: 'calc(1rem + 1vw)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        Найти обмен
                    </p>
                </div>
            </div>
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
};

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
        <div className="d-flex start-50 tra mt-3 mb-3 rounded-pill border border-3 bg-light shadow w-100" style={{ borderColor: 'rgba(46,46,46, 0.5)', height: '100px', position: 'relative', transform: 'translateX(-50%)' }}>
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