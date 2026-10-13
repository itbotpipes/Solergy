"use client";

import React, { useRef } from "react";
import useInView from "../../../hooks/useInView";
import TestimonialCard from "../../Testimonials/TestimonialCard";
import TESTIMONIALS from "../../../data/testimonials";
import styles from "./ProjectDetailTestimonial.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project } from "@/types/project";

interface ProjectDetailTestimonialProps {
  project: Project;
}

export default function ProjectDetailTestimonial({ project }: ProjectDetailTestimonialProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  const testimonial =
    TESTIMONIALS[(project.testimonialIndex ?? 0) % TESTIMONIALS.length];

  return (
    <section
      className={`${styles.testimonial} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What They Say</p>
        <h2 className={styles.heading}>Straight From the Client.</h2>

        <div className={styles.cardWrap}>
          <TestimonialCard {...testimonial} />
        </div>
      </div>
    </section>
  );
}
