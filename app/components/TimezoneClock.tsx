'use client';

import React, { useState, useEffect } from 'react';

const timeZones = [
  // Asia
  { id: 'asia-tehran', name: 'Tehran', zone: 'Asia/Tehran' },
  { id: 'asia-dubai', name: 'Dubai', zone: 'Asia/Dubai' },
  { id: 'asia-tokyo', name: 'Tokyo', zone: 'Asia/Tokyo' },
  { id: 'asia-singapore', name: 'Singapore', zone: 'Asia/Singapore' },
  { id: 'asia-shanghai', name: 'Shanghai', zone: 'Asia/Shanghai' },
  
  // Europe
  { id: 'europe-london', name: 'London', zone: 'Europe/London' },
  { id: 'europe-paris', name: 'Paris', zone: 'Europe/Paris' },
  { id: 'europe-berlin', name: 'Berlin', zone: 'Europe/Berlin' },
  { id: 'europe-rome', name: 'Rome', zone: 'Europe/Rome' },
  { id: 'europe-amsterdam', name: 'Amsterdam', zone: 'Europe/Amsterdam' },
  
  // USA
  { id: 'america-new_york', name: 'New York', zone: 'America/New_York' },
  { id: 'america-chicago', name: 'Chicago', zone: 'America/Chicago' },
  { id: 'america-denver', name: 'Denver', zone: 'America/Denver' },
  { id: 'america-los_angeles', name: 'Los Angeles', zone: 'America/Los_Angeles' },
];

const TimezoneClock = () => {
  const [time, setTime] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState('Asia/Tehran');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate timezone adjusted time
  const getTimezoneTime = (date: Date, timezone: string) => {
    return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  };

  const tzTime = getTimezoneTime(time, selectedZone);
  
  // Calculate angles
  const second = tzTime.getSeconds();
  const minute = tzTime.getMinutes();
  const hour = tzTime.getHours();

  const secondDegrees = (second / 60) * 360;
  const minuteDegrees = ((minute + second / 60) / 60) * 360;
  const hourDegrees = ((hour % 12 + minute / 60) / 12) * 360;

  return (
    <div className="flex flex-col items-center justify-center w-96">
      <div className="relative w-80 h-80 rounded-full bg-black">
        {/* Timezone Selector */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10 w-40">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full px-2 py-1 text-sm bg-transparent text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white focus:border-white appearance-none cursor-pointer"
          >
          <option value="Asia/Tehran" className="font-bold">
            Tehran (Default)
          </option>
          
          <option disabled className="font-semibold bg-gray-100">
            --- Asia ---
          </option>
          {timeZones
            .filter(tz => tz.zone.startsWith('Asia/'))
            .map(tz => (
              <option key={tz.id} value={tz.zone}>
                {tz.name}
              </option>
            ))}

          <option disabled className="font-semibold bg-gray-100">
            --- Europe ---
          </option>
          {timeZones
            .filter(tz => tz.zone.startsWith('Europe/'))
            .map(tz => (
              <option key={tz.id} value={tz.zone}>
                {tz.name}
              </option>
            ))}

          <option disabled className="font-semibold bg-gray-100">
            --- USA ---
          </option>
          {timeZones
            .filter(tz => tz.zone.startsWith('America/'))
            .map(tz => (
              <option key={tz.id} value={tz.zone}>
                {tz.name}
              </option>
            ))}
        </select>
      </div>

      {/* Clock Face */}
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
          <span className="text-white text-lg">
            {tzTime.toLocaleTimeString('en-US', {
              hour12: true,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZone: selectedZone
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimezoneClock;