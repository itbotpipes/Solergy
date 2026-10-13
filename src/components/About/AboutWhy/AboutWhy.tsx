'use client';

import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './AboutWhy.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const TargetIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="8.5" stroke="#EC4D00" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4.5" stroke="#EC4D00" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1" fill="#EC4D00" />
  </svg>
);

const GearIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3.5" stroke="#EC4D00" strokeWidth="1.5" />
    <path
      d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.8 6.2l-1.4 1.4M7.6 16.4l-1.4 1.4M17.8 17.8l-1.4-1.4M7.6 7.6L6.2 6.2"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const HandshakeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 11l4-3.5 4 2.5 3-2.5 4 3.5M3 11v3l3 2.5M21 11v3l-3 2.5M9 12.5l2.2 2.2a1.6 1.6 0 002.3-2.2l-2-2"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WHY_CARDS = [
  {
    icon: <TargetIcon />,
    title: 'No Copy-Paste Systems',
    description:
      'Your building, your usage, your budget — every design starts from scratch, not a template.',
  },
  {
    icon: <GearIcon />,
    title: "Installed Like It's Permanent",
    description:
      'Because it is. We build for decades, not for the photo after handover.',
  },
  {
    icon: <HandshakeIcon />,
    title: 'Still Around After Year One',
    description:
      "Most companies vanish after installation. We don't — check our AMC and support record.",
  },
];

export default function AboutWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.why} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ''
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>
            Made to Last{' '}
            <span className={styles.highlight}>Decades, Not Years</span>
          </h2>
          <div className={styles.copy}>
            <p>
              A washing machine lasts 10 years if you&apos;re lucky. A solar system
              should still be quietly saving you money in 2050. That gap is
              exactly why we don&apos;t cut corners.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {WHY_CARDS.map((card, index) => (
            <div
              key={card.title}
              className={`${styles.cardReveal} ${visible ? styles.cardVisible : ''}`}
              style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
            >
              <div className={styles.card}>
                <div className={styles.iconBadge}>{card.icon}</div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
