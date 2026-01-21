import { createContext, useContext } from 'react';

// Context for beginner mode
export const BeginnerContext = createContext(false);
export const useIsBeginner = () => useContext(BeginnerContext);

// Context for theme
export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => { } });
export const useTheme = () => useContext(ThemeContext);
