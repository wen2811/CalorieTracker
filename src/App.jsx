import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css'

import {useAuth} from "./context/authContext.jsx";
import {Login} from "./pages/login/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";

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
                <Route path="/" element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                    }/>
                <Route path="/login" element={<Login />} />
                <Route path=" /dashboard" element={<Dashboard />} />
            </Routes>
    )
}

export default App
