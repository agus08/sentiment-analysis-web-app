'use client'
import React, { useState, useEffect } from 'react';

const keywords = ["Crash", "Accident", "Burning", "Flood", "Riot", "Fatal", "Natural", "Ablaze"];

const DisasterHeading: React.FC = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0); // Current keyword index
  const [typing, setTyping] = useState(true); // Typing or deleting

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = keywords[index];
    if (typing) {
      // Typing the word
      timeout = setTimeout(() => {
        setText((prev) => currentWord.slice(0, prev.length + 1));
        if (text === currentWord) {
          setTyping(false);
        }
      }, 150);
    } else {
      // Deleting the word
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        if (text === '') {
          setTyping(true);
          setIndex((prevIndex) => (prevIndex + 1) % keywords.length); // Move to next word
        }
      }, 150);
    }

    return () => clearTimeout(timeout); // Clean up the timeout on unmount
  }, [text, typing, index]);

  return (
    <span className="italic text-red-800 w-[100px]">{text}</span>
  );
};

export default DisasterHeading;
