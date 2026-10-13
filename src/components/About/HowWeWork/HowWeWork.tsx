'use client';

import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './HowWeWork.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const UnderstandIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9.5" cy="9.5" r="6" stroke="#EC4D00" strokeWidth="1.5" />
    <path
      d="M14 14l4.5 4.5"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DesignIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 3.5l4 4L7 19l-5 1 1-5L14.5 3.5z"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6l4 4"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const BuildIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.7 3.6a4 4 0 00-5.2 4.9L3 15l3 3 6.5-6.5a4 4 0 004.9-5.2l-2.6 2.6-2-2 2.6-2.6z"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SupportIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12v-1a7 7 0 0114 0v1"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect
      x="2.5"
      y="11.5"
      width="4"
      height="5"
      rx="1.5"
      stroke="#EC4D00"
      strokeWidth="1.5"
    />
    <rect
      x="15.5"
      y="11.5"
      width="4"
      height="5"
      rx="1.5"
      stroke="#EC4D00"
      strokeWidth="1.5"
    />
    <path
      d="M18 16.5v.5a3 3 0 01-3 3h-2.5"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const STEPS = [
  {
    step: '01',
    title: 'We Ask Before We Assume',
    description:
      'Your electricity bill, your roof, your goals — we start with questions, not quotes.',
    icon: <UnderstandIcon />,
  },
  {
    step: '02',
    title: 'We Design Around Reality',
    description:
      'Real sunlight hours, real shading, real budget. Not a generic sizing chart.',
    icon: <DesignIcon />,
  },
  {
    step: '03',
    title: 'We Build It Properly',
    description:
      'Procurement, installation, testing, commissioning — handled by our team, not outsourced to strangers.',
    icon: <BuildIcon />,
  },
  {
    step: '04',
    title: "We Don't Disappear",
    description:
      'Monitoring, maintenance, and a phone number that still gets answered a year later.',
    icon: <SupportIcon />,
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.howWeWork} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ''
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>
            Four <span className={styles.highlight}>Steps. </span> Zero{' '}
            <span className={styles.highlight}>Surprises. </span>
          </h2>
          <p className={styles.description}>
            No hidden scope changes, no mystery line items halfway through. Just
            a transparent process you can rely on.
          </p>
        </div>

        <div className={styles.timeline}>
          {STEPS.map((item) => (
            <div key={item.step} className={styles.timelineItem}>
              <div className={styles.iconBadge}>{item.icon}</div>
              <span className={styles.year}>{item.step}</span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
