'use client';

import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './MissionVision.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const TargetIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="8.5" stroke="#EC4D00" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4.5" stroke="#EC4D00" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1" fill="#EC4D00" />
  </svg>
);

const CompassIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="8.5" stroke="#0C0B0A" strokeWidth="1.5" />
    <path
      d="M15 9l-2 5-5 2 2-5 5-2z"
      stroke="#0C0B0A"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const CARDS = [
  {
    tag: 'RIGHT NOW',
    icon: <TargetIcon />,
    title: 'Our Mission',
    description:
      'Our mission is to accelerate India’s transition to clean energy by delivering high-quality solar solutions that are reliable, efficient and affordable. We combine technology, engineering expertise and customer-centric service to help our customers reduce energy costs, achieve energy independence and create a more sustainable future.',
    dark: true,
  },
  {
    tag: 'THE FUTURE',
    icon: <CompassIcon />,
    title: 'Our Vision',
    description:
      'To accelerate India’s journey towards a cleaner, smarter and more sustainable future by making reliable solar energy accessible, affordable and impactful for every home, business and community.',
    dark: false,
  },
];

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.missionVision} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ''
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>
            What We&apos;re Building, and Why It&apos;s{' '}
            <span className={styles.highlight}>Bigger Than One Rooftop</span>
          </h2>
        </div>

        <div className={styles.grid}>
          <span className={styles.connector} />
          {CARDS.map((card) => (
            <div
              key={card.title}
              className={`${styles.card} ${card.dark ? styles.cardDark : ''}`}
            >
              <span className={styles.pill}>{card.tag}</span>
              <div className={styles.iconBadge}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
