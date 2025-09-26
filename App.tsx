import React, { useState, useCallback } from 'react';
import BrowserView from './components/BrowserView';
import { HOME_PAGE_URL } from './constants';

const App: React.FC = () => {
  const [history, setHistory] = useState<string[]>([HOME_PAGE_URL]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentUrl = history[currentHistoryIndex];
  
  const handleIframeUrlChange = useCallback((newUrl: string) => {
    // This handles navigation within the iframe (e.g., clicking a link)
    if (newUrl !== 'about:blank' && newUrl !== currentUrl) {
      const newHistory = history.slice(0, currentHistoryIndex + 1);
      newHistory.push(newUrl);
      setHistory(newHistory);
      setCurrentHistoryIndex(newHistory.length - 1);
    }
  }, [currentUrl, history, currentHistoryIndex]);

  return (
    <main className="bg-gray-900 h-screen w-screen flex justify-center items-center font-sans">
        <div className="w-full max-w-[420px] h-full max-h-[840px] bg-gray-800 shadow-2xl overflow-hidden flex flex-col animate-futuristic-boot">
            <div className="flex-grow flex flex-col bg-white dark:text-white dark:bg-gray-900">
                <BrowserView 
                    url={currentUrl} 
                    isLoading={isLoading}
                    onLoadingChange={setIsLoading} 
                    onUrlChange={handleIframeUrlChange}
                />
            </div>
        </div>
    </main>
  );
};

export default App;