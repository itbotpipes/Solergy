import styles from './FAQ.module.scss';

export interface FAQItemProps {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

export default function FAQItem({ question, answer, open, onToggle }: FAQItemProps) {
  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.question}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className={`${styles.icon} ${open ? styles.open : ''}`}>
          <span className={styles.iconBarH} />
          <span className={styles.iconBarV} />
        </span>
      </button>
      <div className={`${styles.answerWrap} ${open ? styles.answerOpen : ''}`}>
        <div className={styles.answerInner}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </div>
  );
}
