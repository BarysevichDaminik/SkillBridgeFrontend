import ProfileSettings from '../Components/Profile.jsx';
import ExchangesContent from '../Components/Exchanges.jsx';
import SubscriptionContent from '../Components/Subscription.jsx';
import SkillsContent from '../Components/Skills.jsx';
import ChatContent from '../Components/Chat.jsx';
import '../Styles/index.css';
import { useState } from 'react';

function MainPage() {
    const [selectedMenuItem, setSelectedMenuItem] = useState('skills');

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    let content;
    switch (selectedMenuItem) {
        case 'profile':
            content = <ProfileSettings />;
            break;
        case 'exchanges':
            content = <ExchangesContent />;
            break;
        case 'chats':
            content = <ChatContent />;
            break;
        case 'subscription':
            content = <SubscriptionContent />;
            break;
        case 'skills':
            content = <SkillsContent />;
            break;
        default: break;
    }
    const avatar = require(`../Assets/Avatars/avatar${localStorage.getItem('avatarNumber')}.png`);
    return (
        <div className="content-area main-page-bgc min-vh-100">
            <nav className="navbar-collapse pt-4 fs-3">
                <ul className="navbar-nav d-flex flex-row justify-content-around list-unstyled coats-font">
                    <li role="button" className={`rounded-pill p-2 ps-4 pe-4 nav-item align-self-center ${selectedMenuItem === 'skills' ? 'shadow' : ''}`} onClick={() => handleMenuItemClick('skills')}>
                        Скилы
                    </li>
                    <li role="button" className={`rounded-pill p-2 ps-4 pe-4 nav-item align-self-center ${selectedMenuItem === 'subscription' ? 'shadow' : ''}`} onClick={() => handleMenuItemClick('subscription')}>
                        Подписка
                    </li>
                    <li role="button" className={`rounded-pill p-2 ps-4 pe-4 nav-item align-self-center ${selectedMenuItem === 'chats' ? 'shadow' : ''}`} onClick={() => handleMenuItemClick('chats')}>
                        Мои чаты
                    </li>
                    <li role="button" className={`rounded-pill p-2 ps-4 pe-4 nav-item align-self-center ${selectedMenuItem === 'exchanges' ? 'shadow' : ''}`} onClick={() => handleMenuItemClick('exchanges')}>
                        Мои обмены
                    </li>
                    <li role="button" className={`rounded-pill p-2 ps-4 pe-4 nav-item align-self-center ${selectedMenuItem === 'profile' ? 'shadow' : ''}`} onClick={() => handleMenuItemClick('profile')}>
                        Профиль
                        <img className="ps-4 avatar-size" src={avatar} alt="avatar" />
                    </li>
                </ul>
            </nav>
            <div className='d-flex h-100 bg-white m-3 rounded-pill shadow'>
                {content}
            </div>
        </div>
    );
}

export default MainPage; 