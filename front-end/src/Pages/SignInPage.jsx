import i from '../Assets/SignInPage/SignInPage1920x939.png';
import '../Styles/index.css';
import icon from "../Assets/Icons/web.png";
import { useState } from 'react';
import { sha3_512 } from 'js-sha3';

const SignInPage = () => {
    const [language, setLanguage] = useState('en');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ru' : 'en');
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const hashedPassword = sha3_512(password);

            const formData = new FormData();
            formData.append('username', username);
            formData.append('hash', hashedPassword);

            const response = await fetch('https://localhost:7186/Auth/login', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.status === 200) {
                // const data = await response.json();
            } else {
                // const errorText = await response.text();
            }
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="back-color vh-100 position-relative overflow-hidden">
            <div className="position-absolute top-0 end-0 pt-5 pe-5 d-flex gap-3">
            </div>
            <div className="position-relative h-100">
                <img src={i} alt="pic" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
                <div className="position-absolute top-50 start-50 translate-middle" style={{ maxWidth: '400px', width: '100%' }}>
                    <p className="text-center coats-font display-1 pb-5">{language === 'en' ? 'Sign In' : 'Войти'}</p>
                    <form className='mb-4' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" 
                            className="mb-3 form-control form-control-lg rounded-pill"
                            placeholder={language === 'en' ? 'Username' : 'Имя пользователя'}
                            value={username}
                            onChange={handleUsernameChange}/>
                        </div>
                        <div className="form-group mb-3">
                            <input type="password"
                            className="form-control form-control-lg rounded-pill"
                            placeholder={language === 'en' ? 'Password' : 'Пароль'}
                            value={password}
                            onChange={handlePasswordChange}/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-lg rounded-pill my-gray-color" 
                            style={{backgroundColor:"#c7522a", color: "#2e2e2e", fontWeight: "bold"}}
                            disabled={isSubmitting}>{language === 'en' ? 'Sign In' : 'Войти'}</button>
                        </div>
                    </form>
                    <div className="d-flex flex-column text-center mt-3 justify-content-center">
                        <a href="/" className='coats-font my-gray-color text-decoration-none'>{language === 'en' ? 'Forgot your password?' : 'Забыли ваш пароль?'}</a>
                        <a href="/signup" className='mt-2 coats-font my-gray-color text-decoration-none'>{language === 'en' ? 'Or sign up' : 'Или регистрация'}</a>
                    </div>
                </div>
                <div className='d-flex position-absolute bottom-0 mb-3 text-center start-50 translate-middle-x my-gray-color align-items-center' 
                style={{cursor: 'pointer'}}
                onClick={toggleLanguage}>
                    <img src={icon} className='me-2' alt='icon' style={{ width: '30px', height: '30px'}}/>
                    <p className='m-0 coats-font align'>{language === 'en' ? 'EN' : 'RU'}</p>
                </div>
            </div>
        </div>
    );
}
  
export default SignInPage;