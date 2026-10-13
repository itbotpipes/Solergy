'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Tagline.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WORDS = [
  { text: 'We', highlight: false },
  { text: 'Engineer.', highlight: true },
  { text: 'We', highlight: false },
  { text: 'Procure.', highlight: true, lineBreakAfter: true },
  { text: 'We', highlight: false },
  { text: 'Build.', highlight: true },
  { text: 'We', highlight: false },
  { text: 'Maintain.', highlight: true },
];

const DIM_COLOR = [216, 216, 220];
const DARK_COLOR = [12, 11, 10];
const PRIMARY_COLOR = [236, 77, 0];

const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

const mixColor = (from: number[], to: number[], progress: number) =>
  `rgb(${lerp(from[0]!, to[0]!, progress)}, ${lerp(from[1]!, to[1]!, progress)}, ${lerp(
    from[2]!,
    to[2]!,
    progress
  )})`;

export default function Tagline() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const words = wordRefs.current;
    if (!sectionRef.current) return;

    const applyProgress = (progress: number) => {
      const activePosition = progress * WORDS.length;
      words.forEach((el, index) => {
        if (!el) return;
        const wordProgress = Math.min(Math.max(activePosition - index, 0), 1);
        const target = WORDS[index]?.highlight ? PRIMARY_COLOR : DARK_COLOR;
        el.style.color = mixColor(DIM_COLOR, target, wordProgress);
      });
    };

    applyProgress(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: 'top top',
        end: () => `+=${WORDS.length * window.innerHeight * 0.35}`,
        scrub: 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.tagline} ref={sectionRef}>
      <p className={styles.text}>
        {WORDS.map((word, index) => (
          <span key={`${word.text}-${index}`}>
            <span
              className={styles.word}
              ref={(el) => {
                wordRefs.current[index] = el;
              }}
            >
              {word.text}
            </span>
            {word.lineBreakAfter ? <br /> : ' '}
          </span>
        ))}
      </p>
    </section>
  );
}
