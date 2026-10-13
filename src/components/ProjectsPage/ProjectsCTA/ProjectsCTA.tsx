import Button from '../../common/Button/Button';
import styles from './ProjectsCTA.module.scss';

export default function ProjectsCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Ready when you are</p>
        <h2 className={styles.heading}>Want to Be Our Next Project?</h2>
        <p className={styles.description}>
          Get a free site visit and a personalised solar quote — no pressure,
          just straight answers.
        </p>
        <div className={styles.actions}>
          <Button variant="primary" to="/contact">
            Get My Free Quote
          </Button>
          <Button
            variant="secondary"
            href="https://wa.me/917888679770"
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk on WhatsApp
          </Button>
        </div>
        <div className={styles.trust}>
          <span>
            <span className={styles.chk}>&#10003;</span> Free consultation
          </span>
          <span>
            <span className={styles.chk}>&#10003;</span> No-obligation quote
          </span>
          <span>
            <span className={styles.chk}>&#10003;</span> Warranty-backed
            installation
          </span>
        </div>
      </div>
    </section>
  );
}
