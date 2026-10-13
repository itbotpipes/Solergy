import Image from 'next/image';
import avatar from '../../assets/user-avatar.png';
import styles from './Testimonials.module.scss';

const DOTS = Array.from({ length: 15 });

export interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export default function TestimonialCard({ quote, name, role, rating }: TestimonialCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.quoteMark} aria-hidden="true">
        &#8220;
      </span>
      <p className={styles.quote}>{quote}</p>

      <span className={styles.dots} aria-hidden="true">
        {DOTS.map((_, i) => (
          <span key={i} className={styles.dot} />
        ))}
      </span>

      <div className={styles.footer}>
        <Image src={avatar} alt={name} className={styles.avatar} width={48} height={48} />
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.role}>{role}</p>
          <div className={styles.rating} aria-label={`${rating} out of 5 stars`}>
            {'★'.repeat(rating)}
          </div>
        </div>
      </div>
    </div>
  );
}
