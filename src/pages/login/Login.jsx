import React, { useState } from 'react';
import './Login.css';
import {useAuth} from "../../context/authContext.jsx";
import {Card} from "../../components/UI/card/Card.jsx";
import {BarChart4} from "lucide-react";
import {Label} from "../../components/UI/label/Label.jsx";
import {Input} from "../../components/UI/input/Input.jsx";
import {Button} from "../../components/UI/button/Button.jsx";
import {Navigate, useNavigate} from "react-router-dom";


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="card-header">
                    <div className="logo-container">
                        <BarChart4 className="logo" />
                    </div>
                    <h2 className="card-title">Calorie Tracker</h2>
                    <p className="card-description">
                        Enter your credentials to access your account
                    </p>
                </div>
                <div className="card-content">
                    <form onSubmit={handleSubmit} className="login-form">
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                        <div className="form-group">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="login-button">
                            Sign in
                        </Button>
                    </form>
                </div>
                <div className="card-footer">
                    <p>
                        Demo credentials: any email with password "password"
                    </p>
                </div>
            </Card>
        </div>
    );
};
