import logo from '../Assets/SignInPage/SignInPage1920x939.png';
import '../Styles/index.css';
import icon from "../Assets/Icons/web.png";
import { useState } from 'react';
import { sha3_512 } from 'js-sha3';
import checkAuth from '../Components/AuthCheck';
import { useNavigate } from 'react-router-dom'

const SignInPage = () => {
    const [language, setLanguage] = useState('en');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [resetPasswordStep, setResetPasswordStep] = useState(null);
    // const [isCodeSent, setIsCodeSent] = useState(false);
    // const [resetPasswordEmail, setResetPasswordEmail] = useState('');
    // const [verificationCode, setVerificationCode] = useState('');
    // const [isCodeInputDisabled, setIsCodeInputDisabled] = useState(true);
    // const [verifyButtonText, setVerifyButtonText] = useState(language === 'en' ? 'Send Code' : 'Отправить код');
    const navigate = useNavigate();

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
            const host = window.location.hostname;
            const response = await fetch(`https://${host}:7186/Auth/login`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.status === 200) {
                const response = await fetch(`https://${host}:7186/MainPage/getAvatar`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.status === 200) {
                    const avatarText = await response.text();
                    const avatarNumber = parseInt(avatarText, 10);
                    localStorage.setItem('avatarNumber', avatarNumber);
                }
                const auth = await checkAuth(navigate);
                if (auth) {
                    navigate('/main');
                }
            } else {
                // const errorText = await response.text();
            }
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    };

    // const handleCodeVerificationSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     if (!isCodeSent) {
    //         // Этап 1: Отправка кода на почту
    //         // ***Здесь должен быть ваш код для отправки кода верификации на почту***
    //         // Временно имитируем успешную отправку кода
    //         console.log("Sending code to email:", resetPasswordEmail);
    //         // После успешной отправки кода:
    //         setIsCodeSent(true); // Установите флаг, что код отправлен
    //         setIsCodeInputDisabled(false); // Разблокируйте поле ввода кода
    //         setVerifyButtonText(language === 'en' ? 'Verify Code' : 'Подтвердить код'); // Измените текст кнопки
    //     } else {
    //         // Этап 2: Подтверждение кода
    //         // ***Здесь должен быть ваш код для проверки введенного кода верификации***
    //         console.log("Verifying code:", verificationCode);
    //         // Временно имитируем успешную верификацию кода
    //         // После успешной верификации кода, переходим к форме смены пароля
    //         setResetPasswordStep('passwordReset');
    //     }
    //     setIsSubmitting(false);
    // };

    // const fetchEmailSendRequest = async () => {
    //     const response = await fetch('https://localhost:7186/Auth/register', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         credentials: 'include'
    //     });
    // };

    return (
        <div className="back-color vh-100 position-relative overflow-hidden">
            <div className="position-absolute top-0 end-0 pt-5 pe-5 d-flex gap-3">
            </div>
            <div className="position-relative h-100">
                <a className='top-25 start-50 coats-font position-absolute text-decoration-none my-gray-color fs-3 rounded-pill p-1 ps-4 pe-4 mt-3 my-gray-bg-st' style={{ translate: '-50%' }} href="/guest">SkillBridge</a>
                <img src={logo} alt="pic" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
                {/* {resetPasswordStep === 'codeVerification' ? (
                    <div className="position-absolute top-50 start-50 translate-middle" style={{ maxWidth: '400px', width: '100%' }}>
                        <p className="text-center coats-font display-1 pb-5">{language === 'en' ? 'Verify Email' : 'Подтверждение почты'}</p>
                        <p className='coats-font my-gray-color text-center pb-3'>{language === 'en' ? 'Enter your email to receive a verification code' : 'Введите свою почту, чтобы получить код подтверждения'}</p>
                        <form className='mb-4' onSubmit={handleCodeVerificationSubmit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="mb-3 form-control form-control-lg rounded-pill"
                                    placeholder={language === 'en' ? 'Your email' : 'Ваша почта'}
                                    value={resetPasswordEmail}
                                    onChange={(e) => setResetPasswordEmail(e.target.value)}
                                    readOnly={isCodeSent}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="mb-3 form-control form-control-lg rounded-pill"
                                    placeholder={language === 'en' ? 'Verification Code' : 'Код подтверждения'}
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    disabled={isCodeInputDisabled}
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="border-0 btn btn-lg rounded-pill my-gray-color"
                                    style={{ backgroundColor: "#c7522a", color: "#2e2e2e", fontWeight: "bold" }}
                                    onClick={() => fetchEmailSendRequest()}>
                                    {verifyButtonText}
                                </button>
                            </div>
                            <div className="d-flex flex-column text-center mt-3 justify-content-center">
                                <button onClick={() => setResetPasswordStep(null)} className='border-0 coats-font my-gray-color text-decoration-none' style={{ backgroundColor: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}>
                                    {language === 'en' ? 'Back to Login' : 'Вернуться ко входу'}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : resetPasswordStep === 'passwordReset' ? (

                    <div className="position-absolute top-50 start-50 translate-middle" style={{ maxWidth: '400px', width: '100%' }}>
                        <p className="text-center coats-font display-1 pb-5">{language === 'en' ? 'Reset Password' : 'Сброс пароля'}</p>
                        <form className='mb-4' onSubmit={() => { }}>
                            <div className="form-group">
                                <input type="password"
                                    className="mb-3 form-control form-control-lg rounded-pill"
                                    placeholder={language === 'en' ? 'New Password' : 'Новый пароль'}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    className="mb-3 form-control form-control-lg rounded-pill"
                                    placeholder={language === 'en' ? 'Confirm New Password' : 'Подтвердите новый пароль'}
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-lg rounded-pill my-gray-color"
                                    style={{ backgroundColor: "#c7522a", color: "#2e2e2e", fontWeight: "bold" }}>
                                    {language === 'en' ? 'Reset Password' : 'Сбросить пароль'}
                                </button>
                            </div>
                        </form>
                        <div className="d-flex flex-column text-center mt-3 justify-content-center">
                            <button onClick={() => setResetPasswordStep(null)} className='coats-font my-gray-color text-decoration-none' style={{ backgroundColor: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}>
                                {language === 'en' ? 'Back to Login' : 'Вернуться ко входу'}
                            </button>
                        </div>
                    </div>

                ) : ( */}
                <div className="d-flex flex-column position-absolute top-50 start-50 translate-middle" style={{ maxWidth: '400px', width: '100%' }}>
                    <p className="text-center coats-font display-1 pb-5">{language === 'en' ? 'Sign In' : 'Войти'}</p>
                    <form className='mb-4' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                className="mb-3 form-control form-control-lg rounded-pill"
                                placeholder={language === 'en' ? 'Username' : 'Имя пользователя'}
                                value={username}
                                onChange={handleUsernameChange} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password"
                                className="form-control form-control-lg rounded-pill"
                                placeholder={language === 'en' ? 'Password' : 'Пароль'}
                                value={password}
                                onChange={handlePasswordChange} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit"
                                className="border-0 btn btn-lg rounded-pill my-gray-color"
                                style={{ backgroundColor: "#c7522a", color: "#2e2e2e", fontWeight: "bold" }}
                                disabled={isSubmitting}>{language === 'en' ? 'Sign In' : 'Войти'}
                            </button>
                        </div>
                    </form>
                    <div className="d-flex flex-column text-center mt-3 justify-content-center">
                        {/* <button
                            // onClick={handleForgotPasswordClick}
                            className='coats-font my-gray-color text-decoration-none'
                            style={{ backgroundColor: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}>
                            {language === 'en' ? 'Forgot your password?' : 'Забыли ваш пароль?'}
                        </button> */}
                        <a href="/signup"
                            className='mt-2 coats-font my-gray-color text-decoration-none'>
                            {language === 'en' ? 'Or sign up' : 'Или регистрация'}
                        </a>
                    </div>
                </div>
                <div className='d-flex position-absolute bottom-0 mb-3 text-center start-50 translate-middle-x my-gray-color align-items-center'
                    style={{ cursor: 'pointer' }}
                    onClick={toggleLanguage}>
                    <img src={icon} className='me-2' alt='icon' style={{ width: '30px', height: '30px' }} />
                    <p className='m-0 coats-font align'>{language === 'en' ? 'EN' : 'RU'}</p>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;