'use client';

import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './AboutTeam.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const FOUNDER = {
  name: 'Maanveer Singh',
  role: 'Founder, Solergy India',
  bio: 'An industrial engineer by training (Delhi Technological University), Maanveer spent his early career in business development before founding Solergy India in 2019 to bring the same rigor to solar EPC — treating every installation as an engineering problem worth solving properly, not just a product to sell.',
  photo:
    'https://media.licdn.com/dms/image/v2/D4D03AQGHoz2vVzCR2Q/profile-displayphoto-shrink_400_400/B4DZVm2zH7G8Ak-/0/1741187396924?e=1792022400&v=beta&t=HM7Lk3b00l0pmh55tSNq4kix14B5FiSZi11uPq-55OY',
  linkedin: 'https://www.linkedin.com/in/maanveer-singh-77b842109/',
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

        <div className={styles.founderWrap}>
          <div
            className={`${styles.cardReveal} ${visible ? styles.cardVisible : ''}`}
          >
            <div className={`${styles.card} ${styles.founderCard}`}>
              <img
                src={FOUNDER.photo}
                alt={FOUNDER.name}
                className={styles.photo}
              />
              <h3 className={styles.name}>{FOUNDER.name}</h3>
              <p className={styles.role}>{FOUNDER.role}</p>
              <p className={styles.bio}>{FOUNDER.bio}</p>
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedinButton}
              >
                Connect on LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
