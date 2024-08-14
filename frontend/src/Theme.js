import React, { createContext, useState, useContext } from 'react';

const Theme = createContext();

export const useTheme = () => useContext(Theme);

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <Theme.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </Theme.Provider>
    );
};
