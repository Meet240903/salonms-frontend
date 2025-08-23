// src/utils/auth.js

import { useState, useEffect } from "react";

// Keys for localStorage
const USER_KEY = "salonms_user";
const TOKEN_KEY = "salonms_token";

/**
 * Save user & token to localStorage
 */
export const getUserRole = () => {
    const user = getUser();
    return user?.role || null;
};

export const loginUser = (user, token) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    if (token) localStorage.setItem(TOKEN_KEY, token);
};


export const setUserRole = (role) => {
    localStorage.setItem("role", role);
};


/**
 * Remove user & token from localStorage
 */
export const logoutUser = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
};

/**
 * Get the current logged-in user object
 */
export const getUser = () => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
};

/**
 * Get the current auth token
 */
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * Custom hook for auth
 */
export const useAuth = () => {
    const [user, setUser] = useState(getUser());

    useEffect(() => {
        // Sync state with localStorage if updated from elsewhere
        const handleStorageChange = () => {
            setUser(getUser());
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const login = (user, token) => {
        loginUser(user, token);
        setUser(user);
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return { user, login, logout };
};