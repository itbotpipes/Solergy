'use client';

import { useRef } from 'react';
import WhySolarCard from './WhySolarCard';
import { TariffIcon, BillIcon, PowerIcon } from './WhySolarIcons';
import useInView from '../../hooks/useInView';
import styles from './WhySolar.module.scss';
import reveal from '../../styles/reveal.module.scss';

const CARDS = [
  {
    title: 'Rising Electricity Tariffs',
    description:
      "Prices only go one way — up. A solar system locks in your power costs today, so tomorrow's tariff hikes don't touch you.",
    direction: 'cardLeft',
    icon: TariffIcon,
  },
  {
    title: 'High Monthly Bills',
    description:
      'Whether it\'s a home AC or a factory floor full of machines, your electricity bill eats into your savings every single month.',
    direction: 'cardCenter',
    icon: BillIcon,
  },
  {
    title: 'Unreliable Power Supply',
    description:
      'Frequent cuts disrupt homes and businesses alike. A hybrid or off-grid solar setup keeps the lights (and machines) running.',
    direction: 'cardRight',
    icon: PowerIcon,
  },
];

export default function WhySolar() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.whySolar} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ''
      }`}
      id="about"
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div
          className={`${styles.headingReveal} ${visible ? styles.headingVisible : ''}`}
        >
          <h2 className={styles.heading}>
            Your <span className={styles.highlight}>Electricity Bill</span>{' '}
            Isn&apos;t Going Down
          </h2>
          <p className={styles.subheading}>
            Every year, electricity gets more expensive. Every year, you pay
            more for the exact same usage. Solar flips that script.
          </p>
        </div>

        <div className={styles.cards}>
          {CARDS.map((card, index) => (
            <div
              key={index}
              className={`${styles.cardReveal} ${styles[card.direction as keyof typeof styles] || ''} ${
                visible ? styles.cardVisible : ''
              }`}
              style={{ transitionDelay: visible ? '250ms' : '0ms' }}
            >
              <WhySolarCard
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
