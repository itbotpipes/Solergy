"use client";

import React, { useRef } from "react";
import useInView from "../../../hooks/useInView";
import styles from "./ProjectDetailStory.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project } from "@/types/project";

interface ProjectDetailStoryProps {
  project: Project;
}

export default function ProjectDetailStory({ project }: ProjectDetailStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ""
      }`}
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.storyCol}>
            <p className={styles.eyebrow}>The Project</p>
            <h2 className={styles.heading}>How We Got This Live</h2>
            {project.story.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className={styles.specsCol}>
            <div className={styles.specsCard}>
              <h3 className={styles.specsTitle}>System Specifications</h3>
              <ul className={styles.specsList}>
                {project.specs.map((spec) => (
                  <li key={spec.label} className={styles.specRow}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
