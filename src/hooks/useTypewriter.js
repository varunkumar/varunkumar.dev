import { useState, useEffect } from 'react';

export default function useTypewriter(text, speed = 22, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    let iv;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text]);

  return { displayed, done };
}
