'use client';

import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './AboutTeam.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const FOUNDER = {
  name: 'Maanveer Singh',
  photo: '/images/founder-placeholder.jpg',
};

export default function AboutTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.team} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ''
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.gridContainer}>
          {/* Left Column: Only Image */}
          <div className={styles.imageCol}>
            <div
              className={`${styles.imageReveal} ${
                visible ? styles.imageVisible : ''
              }`}
            >
              <div className={styles.imageFrame}>
                <img
                  src={FOUNDER.photo}
                  alt={FOUNDER.name}
                  className={styles.founderImage}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Paragraph & Highlights (as before) */}
          <div className={styles.contentCol}>
            <h2 className={styles.heading}>
              The Person
              <span className={styles.highlight}> Behind the Power.</span>
            </h2>
            <p className={styles.subheading}>
              Good solar systems need good engineering. Good businesses need
              someone who&apos;s put in the years to understand both the technical
              side and the people side. Solergy is built and led by one person
              who&apos;s done exactly that.
            </p>

            <div className={styles.highlights}>
              <div className={styles.highlightItem}>
                <span className={styles.highlightDot} />
                <div>
                  <strong>Delhi Technological University (DTU)</strong>
                  <p>Industrial engineering foundation applied to solar design</p>
                </div>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightDot} />
                <div>
                  <strong>Founded in 2019</strong>
                  <p>Full-lifecycle EPC rigor from initial site audit to commissioning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
