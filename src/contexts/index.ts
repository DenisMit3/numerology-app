import { createContext, useContext } from 'react';
import type { ThemeContextType } from '../types';

// Context for beginner mode
export const BeginnerContext = createContext<boolean>(false);
export const useIsBeginner = (): boolean => useContext(BeginnerContext);

// Context for theme (default values)
const defaultThemeContext: ThemeContextType = {
    theme: 'dark',
    toggleTheme: () => { },
    isDark: true
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);
export const useTheme = (): ThemeContextType => useContext(ThemeContext);
