import {Navigate, Route, Routes} from 'react-router-dom';
import {AuthProvider, useAuth} from "./context/authContext.jsx";
import Login from "./pages/login/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import {RecipeSearch} from "./pages/recipeSearch/RecipeSearch.jsx";
import {SavedRecipes} from "./pages/savedRecipes/SavedRecipes.jsx";
import {ToastProvider} from "./components/UI/toast/Toast.jsx";
import {Overview} from "./pages/overview/Overview.jsx";
import {Register} from "./pages/register/Register.jsx";
import {Header} from "./components/UI/header/Header.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import './App.css';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/landing" replace />;
};

const AppContent = () => {
    const { user } = useAuth();

    return (
        <div className="app">
            {user && <Header />}
            <main className="app-content">
                <Routes>

                    <Route
                        path="/landing"
                        element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />}
                    />
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
                    />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="/dashboard" replace /> : <Register />}
                    />
                    <Route
                        path="/"
                        element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/landing" replace />}
                    />

                    <Route
                        path="/dashboard"
                        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
                    />
                    <Route
                        path="/overview"
                        element={<ProtectedRoute><Overview /></ProtectedRoute>}
                    />
                    <Route
                        path="/saved-recipes"
                        element={<ProtectedRoute><SavedRecipes /></ProtectedRoute>}
                    />
                    <Route
                        path="/recipes"
                        element={<ProtectedRoute><RecipeSearch /></ProtectedRoute>}
                    />

                    <Route
                        path="*"
                        element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/landing" replace />}
                    />
                </Routes>
            </main>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <AppContent />
            </ToastProvider>
        </AuthProvider>
    );
}

export default App;