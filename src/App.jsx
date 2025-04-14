import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css'

import {useAuth} from "./context/authContext.jsx";
import {Login} from "./pages/login/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import {RecipeSearch} from "./pages/recipeSearch/RecipeSearch.jsx";
import {SavedRecipes} from "./pages/savedRecipes/SavedRecipes.jsx";
import {ToastProvider} from "./components/UI/toast/Toast.jsx";

// Protected route component that checks auth status
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};


function App() {
    const {user} = useAuth();

    return (
        <ToastProvider>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/recipes" element={<RecipeSearch/>} />
                <Route path="/saved-recipes" element={<SavedRecipes />} />
            </Routes>
        </ToastProvider>
    )
}

export default App
