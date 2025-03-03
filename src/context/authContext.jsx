import React, {createContext, useCallback, useContext, useState} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = useCallback(async (email, password) => {
        // Mock authentication
        if (password === 'password') {
            setUser({
                id: '1',
                email
            });
        } else {
            throw new Error('Invalid credentials');
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{user, login, logout}}>
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