import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ResultDashboard from './components/ResultDashboard';
import PhoneFrame from './components/PhoneFrame';
import './index.css';

function App() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="min-h-screen bg-deepSpace bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-mysticPurple/20 via-deepSpace to-black overflow-auto">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Phone Frame with App Inside */}
      <PhoneFrame>
        <div className="h-full overflow-y-auto">
          {!analysisData ? (
            <ChatInterface onComplete={setAnalysisData} />
          ) : (
            <div className="p-3">
              <ResultDashboard data={analysisData} onReset={() => setAnalysisData(null)} />
            </div>
          )}
        </div>
      </PhoneFrame>
    </div>
  );
}

export default App;
