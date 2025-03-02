import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../../context/authContext.jsx";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register, errors } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(email, password);
            navigate('/login');
        } catch (error) {
          console.error("Failed to login", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Login</h2>
                {error && <p className="login-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            placeholder="Type your email"
                            required
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            placeholder="Type your password"
                            required
                            />
                    </div>
                    <button
                        type="submit"
                        className="login-submit"
                        disabled={loading}
                        text="Log in">
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Login;
