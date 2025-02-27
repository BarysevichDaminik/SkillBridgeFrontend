import i from '../Assets/GuestPage/GuestPage1920x951.webp';
import '../Styles/index.css';

const GuestPage = () => {
    return (
        <div className="back-color vh-100 d-flex flex-column overflow-y-hidden">
            <img src={i} alt="Картинка" className="img-fluid"/>
            <div className="position-absolute top-0 end-0 pt-5 pe-5 d-flex gap-3">
                <a href="/contacts" className="pe-3 text-decoration-none text-dark coats-font text-white fs-3">Knowledge</a>
                <a href="/about" className="pe-3 text-decoration-none text-dark coats-font text-white fs-3">About Us</a>
                <a href="/signin" className="pe-3 text-decoration-none text-dark coats-font text-white fs-3">Sign In</a>
                <a href="/signup" className="pe-3 text-decoration-none text-dark coats-font text-white fs-3">Sign Up</a>
            </div>
        </div>
    );
}
  
export default GuestPage;