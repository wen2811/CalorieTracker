import React, { useState } from 'react';
import './Login.css';
import {useAuth} from "../../context/authContext.jsx";
import {Card} from "../../components/UI/card/Card.jsx";
import {BarChart4} from "lucide-react";
import {Label} from "../../components/UI/label/Label.jsx";
import {Input} from "../../components/UI/input/Input.jsx";
import {Button} from "../../components/UI/button/Button.jsx";
import {Navigate, useNavigate} from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(username, password);
            navigate("/");
        } catch (err) {
            setError("Ongeldige inloggegevens. Probeer het opnieuw.");
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="card-header">
                    <div className="logo-container">
                        <BarChart4 className="logo" />
                    </div>
                    <h2 className="card-title">Welkom terug 👋</h2>
                    <p className="card-description">
                        Log in en houd je voeding moeiteloos bij – elke dag opnieuw.
                    </p>
                </div>

                <div className="card-content">
                    <form onSubmit={handleSubmit} className="login-form">
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-group">
                            <Label htmlFor="username">Gebruikersnaam of e-mail</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="bijv. foodie123"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Label htmlFor="password">Wachtwoord</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="login-button"
                            disabled={!username || !password}
                        >
                            Inloggen
                        </Button>
                    </form>
                </div>

                <div className="card-footer">
                    <p>
                        Proberen zonder account? Gebruik een willekeurige gebruikersnaam en het wachtwoord <strong>"password"</strong>.
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Login;