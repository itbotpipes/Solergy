"use client";

import React, { useRef } from "react";
import useInView from "../../../hooks/useInView";
import styles from "./ProjectDetailGlance.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project } from "@/types/project";

interface ProjectDetailGlanceProps {
  project: Project;
}

export default function ProjectDetailGlance({ project }: ProjectDetailGlanceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.glance} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>
            The Numbers{" "}
            <span className={styles.highlight}>Behind the Project.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {project.glance.map((item) => (
            <div key={item.label} className={styles.cell}>
              <div className={styles.value}>{item.value}</div>
              <div className={styles.label}>{item.label}</div>
            </div>
          ))}
        </div>

        <p className={styles.footnote}>
          All figures are illustrative for this sample project.
        </p>
      </div>
    </section>
  );
}
