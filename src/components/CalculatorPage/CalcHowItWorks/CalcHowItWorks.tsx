'use client';

import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './CalcHowItWorks.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const UsageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
      stroke="#EC4D00"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

const SizingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="#EC4D00" strokeWidth="1.6" />
    <path
      d="M3 9h18M8 4v12M13 4v12M18 4v12"
      stroke="#EC4D00"
      strokeWidth="1.2"
    />
    <path d="M9 20h6M12 16v4" stroke="#EC4D00" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const PaybackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#EC4D00" strokeWidth="1.6" />
    <path
      d="M9 9.5h4a1.75 1.75 0 010 3.5H9m0 0h4.5M9 13h4a1.75 1.75 0 010 3.5H9"
      stroke="#EC4D00"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11 7.5v9" stroke="#EC4D00" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const STEPS = [
  {
    title: 'Your Usage',
    description:
      'We convert your monthly bill into estimated units consumed, using general tariff rates.',
    Icon: UsageIcon,
  },
  {
    title: 'System Sizing',
    description:
      'Based on your usage and average sunlight hours in your city, we estimate the solar system size needed to cover most of your bill.',
    Icon: SizingIcon,
  },
  {
    title: 'Cost & Payback',
    description:
      'We estimate system cost using standard per-kW pricing, then calculate how many years of savings it takes to recover that investment.',
    Icon: PaybackIcon,
  },
];

export default function CalcHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.howItWorks} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ''
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>
            How We <span className={styles.highlight}> Calculate This</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {STEPS.map((step) => (
            <div key={step.title} className={styles.card}>
              <div className={styles.iconWrap}>
                <step.Icon />
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
