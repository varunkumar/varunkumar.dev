import { useEffect, useState } from 'react';

export default function useTypewriter(text, speed = 22, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let iv;
    const t = setTimeout(() => {
      setDisplayed('');
      setDone(false);
      iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
