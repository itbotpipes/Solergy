'use client';

import { useRef } from 'react';
import Image from 'next/image';
import heroHouse from '../../assets/hero-house-new.webp';
import Button from '../common/Button/Button';
import Stat from './Stat';
import useInView from '../../hooks/useInView';
import styles from './Hero.module.scss';

const STATS = [
  { target: 20, numSuffix: '+', unit: 'MW', label: 'Clean Energy Deployed' },
  { target: 500, numSuffix: '+', unit: '', label: 'Happy Customers' },
  { target: 25, numSuffix: '+', unit: 'Yrs', label: 'Average System Lifespan' },
];

export default function Hero() {
  const statsCardRef = useRef<HTMLDivElement>(null);
  const statsVisible = useInView(statsCardRef, 0.4);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>25+ Year System Life</p>
          <h1 className={styles.heading}>
            Let the Sun Pay Your{' '}
            <span className={styles.highlight}>Electricity Bill.</span>
          </h1>
          <p className={styles.description}>
            Solergy India designs, installs, and maintains solar power systems
            for homes, businesses, and factories across India — so you spend
            less on electricity and more on things that actually matter.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" showArrow to="/contact">
              Get a Free Solar Quote
            </Button>
            <Button variant="secondary" href="#services">
              See How Solergy Works
            </Button>
          </div>
        </div>

        <div className={styles.imageWrap}>
          <Image
            src={heroHouse}
            alt="Modern house with solar panels"
            className={styles.houseImage}
            priority
            style={{ width: '100%', height: 'auto' }}
          />

          <div className={styles.statsCard} ref={statsCardRef}>
            {STATS.map((stat) => (
              <Stat
                key={stat.label}
                target={stat.target}
                numSuffix={stat.numSuffix}
                unit={stat.unit}
                label={stat.label}
                active={statsVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
