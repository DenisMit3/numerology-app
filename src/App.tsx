import React, { useState, useEffect, createContext, useContext } from 'react';
import ChatInterface from './components/ChatInterface';
import ResultDashboard from './components/ResultDashboard';
import PhoneFrame from './components/PhoneFrame';
import type { UserData, Theme, ThemeContextType } from './types';
import './index.css';

// Storage keys
const STORAGE_KEY = 'numerology_last_analysis';
const THEME_KEY = 'numerology_theme';

// Theme context
const defaultThemeContext: ThemeContextType = {
    theme: 'dark',
    toggleTheme: () => { },
    isDark: true
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);
export const useTheme = () => useContext(ThemeContext);

interface SavedAnalysis {
    data: UserData;
    timestamp: number;
}

function App(): React.ReactElement {
    const [analysisData, setAnalysisData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [theme, setTheme] = useState<Theme>('dark');

    // Load saved analysis and theme on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed: SavedAnalysis = JSON.parse(saved);
                // Check if saved data is less than 24 hours old
                if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
                    setAnalysisData(parsed.data);
                }
            }
            // Load theme
            const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
            if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
                setTheme(savedTheme);
            }
        } catch (e) {
            console.log('No saved analysis found');
        }
        setIsLoading(false);
    }, []);

    // Toggle theme
    const toggleTheme = (): void => {
        const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
    };

    // Save analysis when completed
    const handleComplete = (data: UserData): void => {
        setAnalysisData(data);
        try {
            const saveData: SavedAnalysis = {
                data,
                timestamp: Date.now()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
        } catch (e) {
            console.log('Could not save analysis');
        }
    };

    // Reset and clear storage
    const handleReset = (): void => {
        setAnalysisData(null);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.log('Could not clear storage');
        }
    };

    // Theme classes
    const isDark = theme === 'dark';
    const bgClass = isDark ? 'bg-[#030014]' : 'bg-gradient-to-br from-purple-50 to-pink-50';

    // Show loading splash
    if (isLoading) {
        return (
            <div className={`min-h-screen ${bgClass} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                        <span className="text-3xl">✦</span>
                    </div>
                    <p className={`${isDark ? 'text-white/50' : 'text-purple-600/70'} text-sm`}>Загрузка...</p>
                </div>
            </div>
        );
    }

    const themeContextValue: ThemeContextType = { theme, toggleTheme, isDark };

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <div className={`min-h-screen ${bgClass} overflow-auto transition-colors duration-300 ${!isDark ? 'light-theme' : ''}`}>
                {/* Background Ambience */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className={`absolute top-[-20%] left-[-10%] w-[400px] h-[400px] ${isDark ? 'bg-purple-900/30' : 'bg-purple-300/30'} rounded-full blur-[120px]`} />
                    <div className={`absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] ${isDark ? 'bg-pink-900/20' : 'bg-pink-300/30'} rounded-full blur-[120px]`} />
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] ${isDark ? 'bg-cyan-900/10' : 'bg-cyan-200/20'} rounded-full blur-[100px]`} />
                </div>

                {/* Phone Frame with App Inside */}
                <PhoneFrame>
                    <div className="h-full overflow-y-auto overflow-x-hidden">
                        {!analysisData ? (
                            <ChatInterface onComplete={handleComplete} />
                        ) : (
                            <ResultDashboard data={analysisData} onReset={handleReset} />
                        )}
                    </div>
                </PhoneFrame>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
