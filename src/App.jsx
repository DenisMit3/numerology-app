import React, { useState, useEffect, createContext, useContext } from 'react';
import ChatInterface from './components/ChatInterface';
import ResultDashboard from './components/ResultDashboard';
import PhoneFrame from './components/PhoneFrame';
import './index.css';

// Storage keys
const STORAGE_KEY = 'numerology_last_analysis';
const THEME_KEY = 'numerology_theme';

// Theme context
export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => { } });
export const useTheme = () => useContext(ThemeContext);

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  // Load saved analysis and theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if saved data is less than 24 hours old
        if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          setAnalysisData(parsed.data);
        }
      }
      // Load theme
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.log('No saved analysis found');
    }
    setIsLoading(false);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  // Save analysis when completed
  const handleComplete = (data) => {
    setAnalysisData(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.log('Could not save analysis');
    }
  };

  // Reset and clear storage
  const handleReset = () => {
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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      <div className={`min-h-screen ${bgClass} overflow-auto transition-colors duration-300`}>
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
