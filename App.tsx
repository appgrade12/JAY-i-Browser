import React, { useState, useCallback } from 'react';
import BrowserView from './components/BrowserView';
import { HOME_PAGE_URL } from './constants';

// Define the neon color for the border glow
const NEON_COLOR = '#00d9ff'; // Cyan

interface BrowserState {
  id: string;
  key: number; // to force iframe re-renders on back/forward
  history: string[];
  currentHistoryIndex: number;
  isLoading: boolean;
}

const App: React.FC = () => {
  const [browsers, setBrowsers] = useState<BrowserState[]>([
    { id: 'home', key: 0, history: [HOME_PAGE_URL], currentHistoryIndex: 0, isLoading: true },
  ]);

  const handleUrlChange = useCallback((browserIndex: number, newUrl: string) => {
    setBrowsers(prevBrowsers => {
      const targetBrowser = prevBrowsers[browserIndex];
      const currentUrl = targetBrowser.history[targetBrowser.currentHistoryIndex];
  
      if (newUrl !== 'about:blank' && newUrl !== currentUrl) {
        const newHistory = targetBrowser.history.slice(0, targetBrowser.currentHistoryIndex + 1);
        newHistory.push(newUrl);
  
        const updatedBrowser = {
          ...targetBrowser,
          history: newHistory,
          currentHistoryIndex: newHistory.length - 1,
        };
  
        const newBrowsers = [...prevBrowsers];
        newBrowsers[browserIndex] = updatedBrowser;
        return newBrowsers;
      }
      return prevBrowsers;
    });
  }, []);

  const handleLoadingChange = useCallback((browserIndex: number, loading: boolean) => {
    setBrowsers(prevBrowsers => {
        const newBrowsers = [...prevBrowsers];
        // Ensure the object exists before trying to update it
        if (newBrowsers[browserIndex]) {
            newBrowsers[browserIndex] = { ...newBrowsers[browserIndex], isLoading: loading };
        }
        return newBrowsers;
    });
  }, []);

  return (
    <main 
      className="bg-gray-900 h-screen w-screen flex flex-col justify-center items-center font-sans relative overflow-hidden gap-4 p-4"
    >
        {browsers.map((browser, index) => {
            const currentUrl = browser.history[browser.currentHistoryIndex];

            return (
                <div 
                    key={browser.id}
                    className="w-full max-w-[420px] flex-1 bg-gray-800 shadow-2xl flex flex-col animate-futuristic-boot rounded-3xl animate-neon-glow relative z-10 min-h-0 overflow-hidden"
                    // FIX: The style object is cast to React.CSSProperties to allow TypeScript to accept the custom CSS property '--neon-color'.
                    style={{
                        animationDelay: `${index * 150}ms`,
                        '--neon-color': NEON_COLOR,
                    } as React.CSSProperties}
                >
                    <div className="flex-grow flex flex-col bg-white dark:text-white dark:bg-gray-900 min-h-0">
                        <BrowserView 
                            key={`${browser.id}-${browser.key}`}
                            url={currentUrl} 
                            isLoading={browser.isLoading}
                            onLoadingChange={(loading) => handleLoadingChange(index, loading)} 
                            onUrlChange={(newUrl) => handleUrlChange(index, newUrl)}
                        />
                    </div>
                </div>
            )
        })}
    </main>
  );
};

export default App;