import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css'
import Login from "./pages/login/login.jsx";
import {useAuth} from "./context/authContext.jsx";

// Protected route component that checks auth status
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }

    return children;
};



function App() {
    const {user} = useAuth();

    return (

            <Routes>
                <Route path="/" element={<ProtectedRoute><h1>Dashboard</h1></ProtectedRoute>}/>
                <Route path="/login" element={<Login />} />
            </Routes>
    )
}

export default App
