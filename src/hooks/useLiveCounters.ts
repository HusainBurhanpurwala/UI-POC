import { useState, useEffect } from 'react';

export interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPast: boolean;
}

export function calculateTimeDifference(targetDateIso: string): TimeElapsed {
  const target = new Date(targetDateIso).getTime();
  const now = Date.now();
  const diff = now - target;
  const isPast = diff >= 0;
  const absDiff = Math.abs(diff);

  const totalSeconds = Math.floor(absDiff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isPast,
  };
}

export function useLiveCounter(targetDateIso: string): TimeElapsed {
  const [elapsed, setElapsed] = useState<TimeElapsed>(() =>
    calculateTimeDifference(targetDateIso)
  );

  useEffect(() => {
    const update = () => {
      setElapsed(calculateTimeDifference(targetDateIso));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDateIso]);

  return elapsed;
}
