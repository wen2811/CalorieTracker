import React, {useState} from "react";
import {useAuth} from "../../context/authContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {Card} from "../../components/UI/card/Card.jsx";
import {useToast} from "../../components/UI/toast/Toast.jsx";
import {Input} from "../../components/UI/input/Input.jsx";
import {Label} from "../../components/UI/label/Label.jsx";
import {Button} from "../../components/UI/button/Button.jsx";
import './Register.css'

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await register(username, email, password);

            toast({
                title: 'Registration successful',
                description: 'You can now log in with your credentials',
            });

            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed');

            toast({
                title: 'Registration failed',
                description: err.message || 'Please try again',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <Card className="register-card">
                <div className="card-header">
                    <h2 className="card-title">Create an Account</h2>
                    <p className="card-description">
                        Sign up to start tracking your nutrition and calories
                    </p>
                </div>

                <div className="card-content">
                    <form onSubmit={handleSubmit} className="register-form">
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className="form-hint">Must be at least 6 characters</p>
                        </div>

                        <div className="form-group">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="register-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>
                </div>

                <div className="card-footer">
                    <p>
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};