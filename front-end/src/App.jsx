import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GuestPage from './Pages/GuestPage.jsx';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignInPage from './Pages/SignInPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import MainPage from './Pages/MainPage.jsx';
import AuthCheck from './Components/AuthCheck.jsx';

function App() {
    return (
        <Router>
            <AuthCheck />
            <Routes>
                <Route path="/guest" element={<GuestPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/" element={<Navigate to="/guest" replace={true} />} />
                <Route path="/*" element={<Navigate to="/guest" replace={true} />} />
            </Routes>
        </Router>
    );
}

export default App;