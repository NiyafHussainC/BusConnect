"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("system"); // light | dark | system
    const [resolvedTheme, setResolvedTheme] = useState("light"); // light | dark

    useEffect(() => {
        // Load saved preference
        const savedTheme = localStorage.getItem("busConnectTheme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (t) => {
            const isDark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

            setResolvedTheme(isDark ? 'dark' : 'light');

            const themeValue = isDark ? 'dark' : 'light';
            root.setAttribute('data-theme', themeValue);

            if (isDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme(theme);

        // Listener for system changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') applyTheme('system');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const setThemePreference = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("busConnectTheme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme: setThemePreference }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
