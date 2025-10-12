'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  debounceMs?: number;
  showClearButton?: boolean;
}

export default function SearchBar({
  placeholder = "Where do you want to go next?",
  onSearch,
  className = "",
  debounceMs = 300,
  showClearButton = true
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        onSearch(searchQuery);
      }, debounceMs);
    },
    [onSearch, debounceMs]
  );

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  // Handle clear button
  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  }, [onSearch]);

  // Handle key events
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  }, [handleClear]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative flex items-center bg-[#eff0f4] rounded-xl px-4 py-3
          transition-all duration-200 ease-in-out
          ${isFocused ? 'ring-2 ring-blue-500/20 shadow-lg' : 'shadow-sm'}
        `}
      >
        {/* Search Icon */}
        <Search 
          className={`
            w-5 h-5 transition-colors duration-200
            ${isFocused ? 'text-blue-500' : 'text-gray-500'}
          `} 
        />
        
        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            flex-1 ml-3 bg-transparent border-none outline-none
            text-gray-900 placeholder-gray-500
            text-sm md:text-base
            focus:outline-none focus:ring-0
          "
          autoComplete="off"
          spellCheck="false"
        />
        
        {/* Clear Button */}
        {showClearButton && query && (
          <button
            onClick={handleClear}
            className="
              ml-2 p-1 rounded-full hover:bg-gray-300/50
              transition-colors duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-blue-500/20
            "
            aria-label="Clear search"
            type="button"
          >
            <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </div>      
      {/* Focus indicator */}
      {isFocused && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-blue-500/20 pointer-events-none" />
      )}
    </div>
  );
}
