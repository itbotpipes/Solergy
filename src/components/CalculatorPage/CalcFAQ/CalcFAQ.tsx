'use client';

import { useRef, useState } from 'react';
import CalcFAQItem from './CalcFAQItem';
import useInView from '../../../hooks/useInView';
import styles from './CalcFAQ.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const FAQS = [
  {
    question: 'How accurate is the solar calculator?',
    answer:
      'The calculator provides an initial estimate based on the information you provide. Your actual system size, generation, savings, and payback will depend on your site, electricity usage, tariffs, and final system design.',
  },
  {
    question: 'What information do I need to calculate my savings?',
    answer:
      'Your location, property type, and average electricity bill are the key starting points. Additional information can help make the estimate more relevant.',
  },
  {
    question: 'Are carbon credits related to how much solar I install?',
    answer:
      "Yes — the more solar capacity you install, the more clean energy you generate, and the more carbon emissions you offset. Larger systems typically qualify for more carbon credits, since the credit amount is tied directly to your system's generation output over time.",
  },
  {
    question: 'Does the calculator include government subsidies?',
    answer:
      'Applicable subsidies or incentives can vary based on your location, system type, customer category, and prevailing government policies. Your final estimate can account for applicable benefits.',
  },
  {
    question: 'Can Solergy give me an exact quotation?',
    answer:
      'Yes. Once we understand your requirements and assess your site, our team can recommend a suitable system and provide a detailed quotation.',
  },
];

export default function CalcFAQ() {
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
          <span className={styles.highlight}>Answered Simply.</span>
        </h2>

        <div className={styles.list}>
          {FAQS.map((faq, index) => (
            <CalcFAQItem
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
