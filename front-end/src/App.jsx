import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GuestPage from './Pages/GuestPage.jsx';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignInPage from './Pages/SignInPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import MainPage from './Pages/MainPage.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/guest" element={<ProtectedRoute component={GuestPage} />} />
                <Route path="/signin" element={<ProtectedRoute component={SignInPage} />} />
                <Route path="/signup" element={<ProtectedRoute component={SignUpPage} />} />
                <Route path="/main" element={<ProtectedRoute component={MainPage} />} />
                <Route path="/" element={<ProtectedRoute component={() => <Navigate to="/guest" replace={true} />} />} />
                <Route path="/*" element={<ProtectedRoute component={() => <Navigate to="/guest" replace={true} />} />} />
            </Routes>
        </Router>
    );
}

export default App;