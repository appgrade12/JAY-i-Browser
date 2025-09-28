import React from 'react';

interface NavigationControlsProps {
  onBack: () => void;
  onForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({ onBack, onForward, canGoBack, canGoForward }) => {
  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className="p-2 rounded-full text-gray-400 hover:bg-gray-700 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
        aria-label="Go back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={onForward}
        disabled={!canGoForward}
        className="p-2 rounded-full text-gray-400 hover:bg-gray-700 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
        aria-label="Go forward"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default NavigationControls;
