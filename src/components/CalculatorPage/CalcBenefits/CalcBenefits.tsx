'use client';

import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './CalcBenefits.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const CoinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8.5" stroke="#EC4D00" strokeWidth="1.5" />
    <path d="M12 7.5v9M9.5 9.5h3.7a1.8 1.8 0 010 3.5H9.5m0 0h4.2a1.8 1.8 0 010 3.5H9.5" stroke="#EC4D00" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20V10M12 20V4M20 20v-7" stroke="#EC4D00" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3l7 3v5.5c0 4.6-3 8.3-7 9.5-4-1.2-7-4.9-7-9.5V6l7-3z" stroke="#EC4D00" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4.5" stroke="#EC4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LeafIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 19c0-8 4-13.5 14-14-0.5 10-6 14-14 14z" stroke="#EC4D00" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M5 19c2-4 5-7 9-9.5" stroke="#EC4D00" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BENEFITS = [
  {
    icon: <CoinIcon />,
    title: 'Lower Electricity Costs',
    description: 'Generate your own electricity and reduce your dependence on grid power.',
  },
  {
    icon: <ChartIcon />,
    title: 'Long-Term Savings',
    description: "Turn today's solar investment into years of lower energy costs.",
  },
  {
    icon: <ShieldIcon />,
    title: 'Better Energy Independence',
    description: 'Generate more of the power you use and take greater control of your energy costs.',
  },
  {
    icon: <LeafIcon />,
    title: 'Cleaner Energy',
    description: 'Switch to renewable energy while reducing your dependence on conventional power.',
  },
];

export default function CalcBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.benefits} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ''
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>
            More Than <span className={styles.highlight}>Just a Lower Bill.</span>
          </h2>
          <p className={styles.description}>
            Solar is a long-term investment in how you generate, use, and pay
            for energy.
          </p>
        </div>

        <div className={styles.timeline}>
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className={styles.timelineItem}>
              <div className={styles.iconBadge}>{benefit.icon}</div>
              <h3 className={styles.itemTitle}>{benefit.title}</h3>
              <p className={styles.itemDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
