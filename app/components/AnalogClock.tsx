'use client';

import React, { useState, useEffect } from 'react';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate angles
  const second = time.getSeconds();
  const minute = time.getMinutes();
  const hour = time.getHours();

  const secondDegrees = (second / 60) * 360;
  const minuteDegrees = ((minute + second / 60) / 60) * 360;
  const hourDegrees = ((hour % 12 + minute / 60) / 12) * 360;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
      <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
        <div className="relative w-full h-full rounded-full bg-black">
          {/* Logo */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
            <span className="text-white text-lg sm:text-xl">gahshomar</span>
          </div>

          {/* Clock markers */}
          <div className="absolute inset-0">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className={`absolute top-0 left-1/2 h-full ${
                  i % 5 === 0 ? 'w-1 -ml-0.5' : 'w-0.5 -ml-px'
                }`}
                style={{
                  transform: `rotate(${i * 6}deg)`,
                }}
              >
                <div
                  className={`w-full ${
                    i % 5 === 0 ? 'h-3 bg-white' : 'h-1.5 bg-gray-400'
                  } absolute`}
                />
              </div>
            ))}
          </div>

          {/* Clock hands */}
          <div className="absolute inset-0">
            {/* Hour hand */}
            <div
              className="absolute top-1/2 left-1/2 w-1.5 h-20 -ml-0.75 -mt-20 origin-bottom bg-white rounded-full"
              style={{ transform: `rotate(${hourDegrees}deg)` }}
            />
            
            {/* Minute hand */}
            <div
              className="absolute top-1/2 left-1/2 w-1 h-28 -ml-0.5 -mt-28 origin-bottom bg-white rounded-full"
              style={{ transform: `rotate(${minuteDegrees}deg)` }}
            />
            
            {/* Second hand */}
            <div
              className="absolute top-1/2 left-1/2 w-0.5 h-32 -ml-0.25 -mt-32 origin-bottom bg-red-500 rounded-full"
              style={{ transform: `rotate(${secondDegrees}deg)` }}
            />

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-red-500 rounded-full" />
          </div>

          {/* Digital time */}
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
            <span className="text-white text-base sm:text-lg">
              {time.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalogClock;