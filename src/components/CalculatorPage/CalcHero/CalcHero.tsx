import Button from '../../common/Button/Button';
import CalcHeroTeaser from './CalcHeroTeaser';
import styles from './CalcHero.module.scss';

export default function CalcHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Takes Less Than 2 Minutes</p>
          <h1 className={styles.heading}>
            What Could <span className={styles.highlight}>Solar Save</span>{' '}
            You?
          </h1>
          <p className={styles.description}>
            Enter a few details about your electricity usage and discover how
            much you could save with solar — from your estimated system size
            to your potential long-term savings.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" showArrow href="#calculator-tool">
              Calculate My Solar Savings
            </Button>
          </div>
        </div>

        <div className={styles.imageWrap}>
          <CalcHeroTeaser />
        </div>
      </div>
    </section>
  );
}
