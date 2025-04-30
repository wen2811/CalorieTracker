import React from "react";
import './LandingPage.css';
import {BarChart4} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {Button} from "../../components/UI/button/Button.jsx";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <div className="overlay" />
            <div className="homepage-content">
                <div className="logo-container">
                    <BarChart4 className="logo-icon" size={48} />
                    <h1 className="app-name">Calorie Tracker</h1>
                </div>
                <p className="homepage-text">
                    Eet bewust, voel je beter. Volg je calorieën met stijl en eenvoud.
                </p>
                <div className="homepage-buttons">
                    <Button
                        variant="default"
                        size="lg"
                        className="primary-action"
                        onClick={() => navigate("/login")}
                    >
                        Inloggen
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="secondary-action"
                        onClick={() => navigate("/register")}
                    >
                        Registreren
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;