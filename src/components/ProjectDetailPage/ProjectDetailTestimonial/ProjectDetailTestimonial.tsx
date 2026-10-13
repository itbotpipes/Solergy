"use client";

import React, { useRef } from "react";
import useInView from "../../../hooks/useInView";
import TestimonialCard from "../../Testimonials/TestimonialCard";
import TESTIMONIALS from "../../../data/testimonials";
import styles from "./ProjectDetailTestimonial.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project } from "@/types/project";

interface ProjectDetailTestimonialProps {
  project?: Project;
}

export default function ProjectDetailTestimonial({ project: _project }: ProjectDetailTestimonialProps) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const visible = useInView(cardsRef);
  const sectionRef = useRef<HTMLElement>(null);
  const sectionVisible = useInView(sectionRef, 0.1);

  const marqueeTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      className={`${styles.testimonial} ${reveal.sectionReveal} ${
        sectionVisible ? reveal.sectionVisible : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Real <span className={styles.highlight}>Homes.</span> Real{' '}
          <span className={styles.highlight}>Bills.</span> Real{' '}
          <span className={styles.highlight}>Savings.</span>
        </h2>
      </div>

      <div
        className={`${styles.marquee} ${visible ? styles.cardVisible : styles.cardReveal}`}
        ref={cardsRef}
      >
        <div className={styles.marqueeTrack}>
          {marqueeTestimonials.map((testimonial, index) => (
            <div className={styles.marqueeCard} key={index}>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
