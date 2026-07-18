/* Controller: Match Clock */
import { useState, useEffect } from 'react';

export function useMatchClock(startMin = 68, startSec = 12) {
  const [min, setMin] = useState(startMin);
  const [sec, setSec] = useState(startSec);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => {
      setNow(new Date());
      setSec(prev => {
        if (prev >= 59) { setMin(m => Math.min(m + 1, 90)); return 0; }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const matchTime = `${min}:${sec.toString().padStart(2, '0')}`;
  const clockTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  return { min, sec, matchTime, clockTime, now };
}
