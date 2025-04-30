import React from 'react';
import {useAuth} from "../../../context/authContext.jsx";
import {LogOut, BarChart4} from "lucide-react";
import {Button} from "../button/Button.jsx";
import './Header.css';
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const getUserInitials = () => {
        if (!user) return 'U';

        if (user.username) {
            return user.username.substring(0, 2).toUpperCase();
        }

        if (user.email) {
            return user.email.substring(0, 2).toUpperCase();
        }

        return 'U';
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo" onClick={() => navigate('/')}>
                    <BarChart4 className="logo-icon" />
                    <h1 className="logo-text">Calorie Tracker</h1>
                </div>

                <nav className="header-nav">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                    >
                        Dashboard
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/overview')}
                    >
                        Overzicht
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/saved-recipes')}
                    >
                        Jouw Favorieten
                    </Button>
                </nav>

                <div className="user-section">
                    <div className="user-avatar">
                        <div className="avatar-fallback">{getUserInitials()}</div>
                    </div>
                    <div className="user-info">
                        <p className="user-email">{user?.username || user?.email}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={logout}>
                        <LogOut className="icon" size={16} />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
};