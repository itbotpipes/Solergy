'use client';

import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './AboutStory.module.scss';
import reveal from '../../../styles/reveal.module.scss';

export default function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      id="story"
      className={`${styles.story} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ''
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>
            We&apos;re Not Here to Just{' '}
            <span className={styles.highlight}>Sell You Solar.</span>
          </h2>
          <div className={styles.copy}>
            <p>
              Anyone can sell you a solar panel. We believe the real value lies
              in knowing what to do with it. At Solergy India, we study how you
              use electricity, understand your space and requirements, and build
              a system around what actually makes sense for you.
            </p>
            <p>
              From engineering and procurement to installation and after-sales
              support, we handle the entire journey under one roof.
            </p>
            <p className={styles.tagline}>
              One team. One plan. One energy partner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
