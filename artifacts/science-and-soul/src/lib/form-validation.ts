import { useEffect, useRef, useState } from "react";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MESSAGE_MAX = 5000;
export const NAME_MAX = 120;
export const EMAIL_MAX = 320;

export function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

export function useSubmitCooldown(limit = 3, windowMs = 60_000) {
  const [cooldownSecs, setCooldownSecs] = useState(0);
  const submissionTimes = useRef<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function startCooldown(remainingMs: number) {
    setCooldownSecs(Math.ceil(remainingMs / 1000));
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCooldownSecs((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function checkRateLimit(): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    submissionTimes.current = submissionTimes.current.filter((t) => t > windowStart);
    if (submissionTimes.current.length >= limit) {
      const oldestInWindow = submissionTimes.current[0];
      startCooldown(oldestInWindow + windowMs - now);
      return false;
    }
    submissionTimes.current.push(now);
    return true;
  }

  return { cooldownSecs, checkRateLimit };
}
