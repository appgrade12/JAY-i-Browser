import React, { useRef } from 'react';

interface BrowserViewProps {
  url: string;
  isLoading: boolean;
  onLoadingChange: (loading: boolean) => void;
  onUrlChange: (url: string) => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="absolute inset-0 bg-white dark:bg-gray-800 flex items-center justify-center z-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
    </div>
);

const BrowserView: React.FC<BrowserViewProps> = ({ url, isLoading, onLoadingChange, onUrlChange }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    onLoadingChange(false);
    try {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            const newUrl = iframeRef.current.contentWindow.location.href;
            onUrlChange(newUrl);
        }
    } catch (error) {
        console.warn("Could not access iframe URL due to cross-origin restrictions.", error);
    }
  };
  
  const handleError = () => {
      onLoadingChange(false);
  }

  return (
    <div className="flex-grow bg-white dark:bg-gray-800 relative">
      {isLoading && <LoadingSpinner />}
      <iframe
        key={url}
        ref={iframeRef}
        src={url}
        className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        title="Web Browser"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        allow="camera"
        onLoad={handleLoad}
        onError={handleError}
      ></iframe>
    </div>
  );
};

export default BrowserView;