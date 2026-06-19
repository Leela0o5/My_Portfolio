// src/hooks/useSystemStats.ts
import { useState, useEffect } from 'react';

const useSystemStats = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = {
    wifi: 100, // Mbps
    volume: 82,
    battery: 96,
    time: time.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
    }),
  };

  return stats;
};

export default useSystemStats;
