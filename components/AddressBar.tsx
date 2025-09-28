import React, { useState, useEffect } from 'react';

interface AddressBarProps {
  url: string;
  onNavigate: (url: string) => void;
}

const AddressBar: React.FC<AddressBarProps> = ({ url, onNavigate }) => {
  const [inputValue, setInputValue] = useState(url);

  useEffect(() => {
    // Avoid updating input while user is typing
    if (document.activeElement?.tagName !== 'INPUT') {
      setInputValue(url);
    }
  }, [url]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newUrl = inputValue.trim();
    if (!newUrl) return;

    // Check if it's likely a search query vs a URL
    if (!/^(https?|ftp):\/\//i.test(newUrl) && (!newUrl.includes('.') || newUrl.includes(' '))) {
        // Use Wikipedia search as it can be iframed, unlike Google.
        newUrl = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(newUrl)}`;
    } else if (!/^(https?|ftp):\/\//i.test(newUrl)) {
        newUrl = 'https://' + newUrl;
    }
    
    onNavigate(newUrl);
    (e.target as HTMLFormElement).querySelector('input')?.blur();
  };

  return (
    <form onSubmit={handleSubmit} className="flex-grow px-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={(e) => e.target.select()}
        className="w-full bg-gray-700 text-white rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-shadow"
        placeholder="Search or type URL"
        aria-label="Address bar"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </form>
  );
};

export default AddressBar;