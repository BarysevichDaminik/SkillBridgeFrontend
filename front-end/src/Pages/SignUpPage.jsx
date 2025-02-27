import i from '../Assets/SignInPage/SignInPage1920x939.png';
import '../Styles/index.css';
import icon from "../Assets/Icons/web.png"
import { useState } from 'react';

const SignUpPage = () => {
    const [language, setLanguage] = useState('en');
    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ru' : 'en');
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('https://localhost:7186/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    Username : username,
                    Email : email,
                    Password : password
                }),
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

    const containerSize = language === 'en'
        ? { maxWidth: '400px', width: '100%' }
        : { maxWidth: '500px', width: '100%' };
    return (
        <div className="back-color vh-100 position-relative overflow-hidden">
            <div className="position-absolute top-0 end-0 pt-5 pe-5 d-flex gap-3">
            </div>
            <div className="position-relative h-100">
                <img src={i} alt="pic" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
                <div className="d-flex flex-column position-absolute top-50 start-50 translate-middle" style={containerSize}>
                    <p className="text-center coats-font display-1 pb-5">{language === 'en' ? 'Sign Up' : 'Регистрация'}</p>
                    <form className='mb-4 d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center form-group w-100">
                            <input type="text" className="mb-3 form-control form-control-lg rounded-pill"
                                placeholder={language === 'en' ? 'Username' : 'Имя пользователя'}
                                style={{maxWidth: '400px'}}
                                value={username}
                                onChange={handleUsernameChange}/>
                        </div>
                        <div className="d-flex justify-content-center form-group mb-3 w-100">
                            <input type="email" className="form-control form-control-lg rounded-pill"
                                placeholder={language === 'en' ? 'Email' : 'почта'}
                                style={{maxWidth: '400px'}}
                                value={email}
                                onChange={handleEmailChange}/>
                        </div>
                        <div className="d-flex justify-content-center form-group mb-3 w-100">
                            <input type="password" className="form-control form-control-lg rounded-pill"
                                placeholder={language === 'en' ? 'Password' : 'Пароль'}
                                style={{maxWidth: '400px'}}
                                value={password}
                                onChange={handlePasswordChange}/>
                        </div>
                        <div className="justify-content-center">
                            <button type="submit" className="btn btn-lg rounded-pill my-gray-color"
                                    style={{backgroundColor:"#c7522a", color: "#2e2e2e", minWidth:"30%", fontWeight: "bold"}}
                                    disabled={isSubmitting}>{language === 'en' ? 'Sign Up' : 'Регистрация'}</button>
                        </div>
                    </form>
                    <div className="d-flex flex-column text-center justify-content-center">
                        <a href="/signin" className='coats-font my-gray-color text-decoration-none'>{language === 'en' ? 'Or sign in' : 'Или войти'}</a>
                    </div>
                </div>
                <div className='d-flex position-absolute bottom-0 mb-3 text-center start-50 translate-middle-x my-gray-color align-items-center'
                onClick={toggleLanguage}
                style={{cursor: 'pointer'}}>
                    <img src={icon} className='me-2' alt='icon' style={{ width: '30px', height: '30px' }}/>
                    <p className='m-0 coats-font align'>{language === 'en' ? 'EN' : 'RU'}</p>
                </div>
            </div>
        </div>
    );
}
  
export default SignUpPage;