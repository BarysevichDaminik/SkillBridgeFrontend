import ProfileSettings from '../Components/Profile.jsx';
import ExchangesContent from '../Components/Exchanges.jsx';
import ChatsContent from '../Components/Chats.jsx';
import SubscriptionContent from '../Components/Subscription.jsx';
import SkillsContent from '../Components/Skills.jsx';
import Menu from '../Components/Menu.jsx';
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
            content = <ChatsContent />;
            break;
        case 'subscription':
            content = <SubscriptionContent />;
            break;
        case 'skills':
            content = <SkillsContent />;
            break;
        default:
            content = <div>Выберите пункт меню</div>;
    }

    return (
        <div className="content-area main-page-bgc min-vh-100">
            <Menu className='' onMenuItemClick={handleMenuItemClick} selectedItem={selectedMenuItem} />
            <div >
                {content}
            </div>
        </div>
    );
}

export default MainPage; 