import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let intervalId: any;

    const delayTimer = window.setTimeout(() => {
      if (cancelled) return;
      let i = 0;
      intervalId = window.setInterval(() => {
        i += 1;
        if (cancelled) {
          window.clearInterval(intervalId);
          return;
        }
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
