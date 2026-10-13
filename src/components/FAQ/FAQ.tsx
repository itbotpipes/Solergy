'use client';

import { useRef, useState } from 'react';
import FAQItem from './FAQItem';
import useInView from '../../hooks/useInView';
import styles from './FAQ.module.scss';
import reveal from '../../styles/reveal.module.scss';

const FAQS = [
  {
    question: 'How much can I actually save with solar?',
    answer:
      'It depends on your current electricity usage and system size, but most customers see a significant drop in their monthly bill — often recovering their investment within a few years and enjoying free power for decades after.',
  },
  {
    question: "What's the difference between on-grid, and hybrid systems?",
    answer:
      'On-grid systems connect to the electricity grid and use net metering. Hybrid systems do both — grid-connected with battery backup for power cuts.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'Timelines vary by system size and site complexity, but our team handles everything from design to commissioning as efficiently as possible, keeping you informed at every step.',
  },
  {
    question: 'Do I need to maintain the system myself?',
    answer:
      "Not if you don't want to. We offer Annual Maintenance Contracts (AMC) covering cleaning, inspections, and performance checks, so your system keeps running at its best.",
  },
  {
    question: 'How long do solar panels actually last?',
    answer:
      'Quality solar panels typically last 25–30 years, making solar one of the few investments that keeps paying you back for decades.',
  },
  {
    question: 'Is solar worth it for my business?',
    answer:
      'If your business uses most of its electricity during the day — offices, hotels, factories, hospitals — solar is one of the most financially sound investments you can make.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.faq} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ''
      }`}
      id="faq"
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Solar Questions,{' '}
          <span className={styles.highlight}>Answered Simply</span>
        </h2>

        <div className={styles.list}>
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              open={openIndex === index}
              onToggle={() =>
                setOpenIndex((prev) => (prev === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
