"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ScrollThemeContextType {
    theme: Theme;
    setScrollTheme: (theme: Theme) => void;
}

const ScrollThemeContext = createContext<ScrollThemeContextType | undefined>(undefined);

export function ScrollThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');

    const setScrollTheme = (newTheme: Theme) => {
        if (newTheme === theme) return;
        setTheme(newTheme);


        requestAnimationFrame(() => {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(newTheme);

            document.documentElement.setAttribute('data-scroll-theme', newTheme);
        });
    };

    // Initialize theme on mount
    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-scroll-theme', 'dark');
    }, []);

    return (
        <ScrollThemeContext.Provider value={{ theme, setScrollTheme }}>
            <div data-scroll-theme={theme} className={theme}>
                {children}
            </div>
        </ScrollThemeContext.Provider>
    );
}

export function useScrollTheme() {
    const context = useContext(ScrollThemeContext);
    if (context === undefined) {
        throw new Error('useScrollTheme must be used within a ScrollThemeProvider');
    }
    return context;
}


export function useCurrentScrollTheme(): Theme {
    const { theme } = useScrollTheme();
    return theme;
}
