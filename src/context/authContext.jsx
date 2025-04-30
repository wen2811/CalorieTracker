import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await validateToken(token);
                } catch (error) {
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('token');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        checkToken();
    }, []);

    const validateToken = async (token) => {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Invalid token');
            }

            const userData = await response.json();
            setUser({
                id: userData.id || userData.username,
                email: userData.email,
                username: userData.username
            });
            return userData;
        } catch (error) {
            localStorage.removeItem('token');
            setUser(null);
            throw error;
        }
    };

    const register = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role: ["user"]
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed');
            }

            return await response.json();
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Invalid credentials');
            }

            const data = await response.json();
            localStorage.setItem('token', data.accessToken);

            setUser({
                id: data.id || data.username,
                email: data.email,
                username: data.username
            });

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
    }, []);

    const value = {
        user,
        isLoading,
        error,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};