import Image, { type StaticImageData } from 'next/image';
import styles from './Services.module.scss';
import Button from '../common/Button/Button';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#EC4D00" />
    <path
      d="M5 8.2l1.8 1.8L11 6.5"
      stroke="#fff"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface ServiceRowProps {
  image: string | StaticImageData;
  title: string;
  description: string;
  points: string[];
  note?: string;
  reverse?: boolean;
  buttonText?: string;
}

export default function ServiceRow({
  image,
  title,
  description,
  points,
  note,
  reverse = false,
  buttonText = 'Learn More',
}: ServiceRowProps) {
  return (
    <div className={`${styles.row} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.imageWrap}>
        <Image src={image} alt={title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <ul className={styles.points}>
          {points.map((point) => (
            <li key={point}>
              <CheckIcon />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        {note && <p className={styles.note}>{note}</p>}
        <div className={styles.serviceButton}>
          <Button showArrow to="/contact">{buttonText}</Button>
        </div>
      </div>
    </div>
  );
}
