import Image from 'next/image';
import houseImage from '../../assets/why-solergy-house.jpg';
import Button from '../common/Button/Button';
import styles from './WhySolergy.module.scss';

export default function WhySolergy() {
  return (
    <section className={styles.whySolergy}>
      <div className={styles.inner}>
        <div className={styles.imageWrap}>
          <span className={styles.arc} aria-hidden="true" />
          <Image
            src={houseImage}
            alt="House with solar panels at sunset"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.heading}>
            More Than Solar.{' '}
            <span className={styles.highlight}>Complete Power Solutions.</span>
          </h2>
          <p className={styles.description}>
            Anyone can sell you a solar panel. Solergy India does something
            bigger — we study how much electricity you actually use, design a
            system that fits your roof and your budget, procure the right
            equipment, install it properly, and stick around to maintain it for
            years.
          </p>
          <p className={styles.description}>
            We&apos;re an end-to-end Solar EPC company — Engineering, Procurement,
            and Construction, all under one roof. That means one team, one plan,
            and zero confusion between five different vendors. Think of us less
            like a solar shop, and more like your long-term energy partner.
          </p>
          <Button variant="primary" showArrow to="/about">
            Learn More About Us
          </Button>
        </div>
      </div>
    </section>
  );
}
