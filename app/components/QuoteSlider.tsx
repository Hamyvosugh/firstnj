// app/components/QuoteSlider.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface Quote {
  id: string;
  quote: string;
  author: string;
  country: string;
  created_at: string;
}

export default function QuoteSlider() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/quotes');
        if (!response.ok) throw new Error('Failed to fetch quotes');
        const data = await response.json();
        setQuotes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [quotes]);

  if (loading) {
    return (
      <div className="w-full h-[10vh] bg-black flex items-center justify-center">
        <p className="text-white">Loading quotes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[10vh] bg-black flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="w-full h-[10vh] bg-black flex items-center justify-center">
        <p className="text-white">No quotes available</p>
      </div>
    );
  }

  const currentQuote = quotes[currentIndex];

  return (
    <div className="w-full h-[10vh] bg-black overflow-hidden relative">
      <div 
        key={currentQuote.id}
        className="w-full h-full flex items-center justify-center px-4 absolute animate-fade-in"
      >
        <div className="text-center">
          <p className="text-white text-lg md:text-xl italic mb-2">
            &ldquo;{currentQuote.quote}&rdquo;
          </p>
          <div className="text-gray-400">
            <span className="font-semibold">{currentQuote.author}</span>
            <span className="mx-2">|</span>
            <span>{currentQuote.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
}