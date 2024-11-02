"use client";

import { createClient } from "@/lib/supabase/client";
import { formatString } from "@/lib/utils";
import clsx from "clsx";
import { redirect, useParams } from "next/navigation";
import React, { useState, useRef, useCallback } from "react";

// Custom hook for debouncing
const useDebouncedEffect = (effect: React.EffectCallback, delay: number, deps: React.DependencyList) => {
  const handler = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (handler.current) clearTimeout(handler.current);
    handler.current = setTimeout(() => effect(), delay);

    return () => {
      if (handler.current) clearTimeout(handler.current);
    };
  }, [...deps, delay]);
};

const AutocompleteInput: React.FC = () => {
  const params = useParams<{ topic: string }>();
  const initialTopic = params.topic ? formatString(params.topic) : "";
  const [inputValue, setInputValue] = useState(initialTopic);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchSuggestions = useCallback(async (query: string): Promise<string[]> => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("keywords")
      .select("keyword")
      .ilike("keyword", `%${query}%`)
      .limit(10);

    setLoading(false);
    if (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
    return data.map((item) => item.keyword);
  }, []);

  // Handle suggestion fetching with debouncing
  useDebouncedEffect(
    () => {
      if (inputValue.length >= 3) {
        fetchSuggestions(inputValue).then((newSuggestions) => {
          setSuggestions(newSuggestions);
          setIsDropdownOpen(newSuggestions.length > 0 && inputRef.current === document.activeElement);
        });
      } else {
        setSuggestions([]);
        setIsDropdownOpen(false);
      }
    },
    300,
    [inputValue]
  );

  // Handlers
  const handleSelectSuggestion = (suggestion: string) => {
    setIsDropdownOpen(false);
    redirect(`/${suggestion}`);
  };

  const handleClearInput = () => {
    setInputValue("");
    setSuggestions([]);
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsDropdownOpen(suggestions.length > 0);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search Disaster Topics..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800"
        />
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16zM21 21l-4.35-4.35" />
          </svg>
        </span>
        {inputValue && (
          <button
            onClick={handleClearInput}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-red-800"
            aria-label="Clear"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <div className={clsx(loading ? 'block' : 'hidden', 'px-5')}>
          <div className="loading-bar"></div>
        </div>
      </div>

      {isDropdownOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-red-800 hover:text-white"
            >
              {formatString(suggestion)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
