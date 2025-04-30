import React, {useState} from "react";
import {useAuth} from "../../context/authContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {Card} from "../../components/UI/card/Card.jsx";
import {useToast} from "../../components/UI/toast/Toast.jsx";
import {Input} from "../../components/UI/input/Input.jsx";
import {Label} from "../../components/UI/label/Label.jsx";
import {Button} from "../../components/UI/button/Button.jsx";
import './Register.css';

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
            setError('Alle velden zijn verplicht');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Wachtwoorden komen niet overeen');
            return false;
        }

        if (password.length < 6) {
            setError('Wachtwoord moet minstens 6 tekens bevatten');
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
                title: 'Registratie gelukt',
                description: 'Je kunt nu inloggen met je accountgegevens',
            });

            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registratie mislukt');

            toast({
                title: 'Registratie mislukt',
                description: err.message || 'Probeer het opnieuw',
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
                    <h2 className="card-title">Account aanmaken</h2>
                    <p className="card-description">
                        Begin vandaag nog met het bijhouden van je voeding en energie-inname.
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
                            <Label htmlFor="username">Gebruikersnaam</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Label htmlFor="email">E-mailadres</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Label htmlFor="password">Wachtwoord</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className="form-hint">Minimaal 6 tekens</p>
                        </div>

                        <div className="form-group">
                            <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
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
                            {isSubmitting ? 'Account wordt aangemaakt...' : 'Account aanmaken'}
                        </Button>
                    </form>
                </div>

                <div className="card-footer">
                    <p>
                        Al een account? <Link to="/login">Inloggen</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};