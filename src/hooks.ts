import { useEffect, useRef, useState } from "react";

export const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(reduced());
  useEffect(() => {
    if (seen) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return { ref, seen };
}

export function useCount(to: number, run: boolean, ms = 1400) {
  const [v, setV] = useState(reduced() ? to : 0);
  useEffect(() => {
    if (!run) return;
    if (reduced()) { setV(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, ms]);
  return v;
}

export function useTyping(words: string[], startDelay = 1800) {
  const [text, setText] = useState(reduced() ? words[0] : "");
  useEffect(() => {
    if (reduced()) return;
    let w = 0, c = 0, del = false, t = 0;
    const step = () => {
      const word = words[w];
      c += del ? -1 : 1;
      setText(word.slice(0, c));
      let d = del ? 35 : 75;
      if (!del && c === word.length) { del = true; d = 1400; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; d = 300; }
      t = window.setTimeout(step, d);
    };
    t = window.setTimeout(step, startDelay);
    return () => clearTimeout(t);
  }, [words, startDelay]);
  return text;
}
