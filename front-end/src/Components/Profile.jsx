import "../Styles/index.css";

function Profile() {
    const handleLogout = async () => {
        const host = window.location.hostname;
        await fetch(`https://${host}:7186/Auth/logout`, {
            method: "DELETE",
            credentials: "include",
        });
        window.location.href = "/";
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('avatarNumber');
        localStorage.removeItem('userId');
    };

    const avatar = require(`../Assets/Avatars/avatar${localStorage.getItem("avatarNumber")}.png`);
    const username = localStorage.getItem("username");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    return (
        <div className="container d-flex flex-column justify-content-between" style={{ height: "100vh" }}>
            <div className="d-flex align-items-center justify-content-between w-100 mt-3 pb-3" style={{ margin: "0 auto" }}>
                <img
                    src={avatar}
                    alt="User Avatar"
                    style={{ width: "200px", height: "200px" }}
                />

                <div className="ms-3 flex-grow-1 coats-font">
                    <h3 className="mb-2">{username}</h3>
                    <p className="mb-1">Имя: {firstName}</p>
                    <p className="mb-1">Фамилия: {lastName}</p>
                </div>

                <button className="my-gray-bg-st rounded-3 text-white border-0 p-2 pe-3 ps-3 shadow">Редактировать</button>
            </div>

            <div className="w-100 d-flex justify-content-start">
                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
}

export default Profile;