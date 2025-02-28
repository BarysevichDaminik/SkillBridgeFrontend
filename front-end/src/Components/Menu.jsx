function Menu({ onMenuItemClick, selectedItem }) {
    return (
        <nav className="pt-4 fs-3">
            <ul className="d-flex flex-row justify-content-around list-unstyled coats-font">
                <li className={`nav-item ${selectedItem === 'skills' ? 'active' : ''}`} onClick={() => onMenuItemClick('skills')}>
                    Скилы
                </li>
                <li className={`nav-item ${selectedItem === 'subscription' ? 'active' : ''}`} onClick={() => onMenuItemClick('subscription')}>
                    Подписка
                </li>
                <li className={`nav-item ${selectedItem === 'chats' ? 'active' : ''}`} onClick={() => onMenuItemClick('chats')}>
                    Мои чаты
                </li>
                <li className={`nav-item ${selectedItem === 'exchanges' ? 'active' : ''}`} onClick={() => onMenuItemClick('exchanges')}>
                    Мои обмены
                </li>
                <li className={`nav-item ${selectedItem === 'profile' ? 'active' : ''}`} onClick={() => onMenuItemClick('profile')}>
                    Профиль
                    <img src="" alt="" />
                </li>
            </ul>
        </nav>
    );
}

export default Menu;