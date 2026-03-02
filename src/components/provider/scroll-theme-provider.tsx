"use client"

import React, { createContext, useContext } from 'react';

type Theme = 'dark';

interface ScrollThemeContextType {
    theme: Theme;
    setScrollTheme: (theme: Theme) => void;
}

const ScrollThemeContext = createContext<ScrollThemeContextType>({
    theme: 'dark',
    setScrollTheme: () => {},
});

export function ScrollThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ScrollThemeContext.Provider value={{ theme: 'dark', setScrollTheme: () => {} }}>
            {children}
        </ScrollThemeContext.Provider>
    );
}

export function useScrollTheme() {
    return useContext(ScrollThemeContext);
}

export function useCurrentScrollTheme(): Theme {
    return 'dark';
}
