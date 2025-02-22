import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GuestPage from './Pages/GuestPage.jsx';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import SignInPage from './Pages/SignInPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
