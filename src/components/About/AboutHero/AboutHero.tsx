import Button from '../../common/Button/Button';
import SunScene from './SunScene';
import styles from './AboutHero.module.scss';

export default function AboutHero() {
  return (
    <section className={styles.aboutHero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Who We Are</p>
          <h1 className={styles.heading}>
            We Don&apos;t Just Install Panels.
            <span className={styles.highlight}>
              {' '}
              We Build Trust That Lasts 25 Years.
            </span>
            <br />
          </h1>
          <p className={styles.description}>
            Every solar company will tell you they&apos;re different. Here&apos;s what
            actually makes us different: we treat your electricity bill like a
            puzzle worth solving properly, not a sales target to hit quickly. We
            study your usage, size your system honestly, install it right the
            first time, and stay reachable long after the invoice is paid.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" showArrow to="/contact">
              Talk to Our Team
            </Button>
            <Button variant="secondary" href="#story">
              See Our Work
            </Button>
          </div>
          <p className={styles.trustLine}>
            500+ systems installed. Zero shortcuts taken.
          </p>
        </div>

        <div className={styles.imageWrap}>
          <SunScene />
        </div>
      </div>
    </section>
  );
}
