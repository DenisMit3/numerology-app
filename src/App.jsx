import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import ResultDashboard from './components/ResultDashboard';
import PhoneFrame from './components/PhoneFrame';
import './index.css';

// Storage keys
const STORAGE_KEY = 'numerology_last_analysis';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved analysis on mount
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
    } catch (e) {
      console.log('No saved analysis found');
    }
    setIsLoading(false);
  }, []);

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

  // Show loading splash
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
            <span className="text-3xl">✦</span>
          </div>
          <p className="text-white/50 text-sm">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] overflow-auto">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-900/10 rounded-full blur-[100px]" />
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
  );
}

export default App;
