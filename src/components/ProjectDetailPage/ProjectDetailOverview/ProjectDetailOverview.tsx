"use client";

import React, { useRef } from "react";
import useInView from "../../../hooks/useInView";
import styles from "./ProjectDetailOverview.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project } from "@/types/project";

function renderHeading(heading: string, s: Record<string, string>) {
  const match = heading.match(/^(.*\s)(\S+\s\S+?)([.!?]?)$/);
  if (!match) return heading;
  const [, lead, highlight, punctuation] = match;
  return (
    <>
      {lead}
      <span className={s.highlight}>{highlight}</span>
      {punctuation}
    </>
  );
}

interface ProjectDetailOverviewProps {
  project: Project;
}

export default function ProjectDetailOverview({ project }: ProjectDetailOverviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  const image = project.gallery?.[1] ?? project.image;
  const imageSrc = typeof image === "string" ? image : image?.src;

  return (
    <section
      className={`${styles.overview} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <img
              src={imageSrc}
              alt={project.title}
              className={styles.image}
              loading="lazy"
            />
          </div>

          <div className={styles.content}>
            <h2 className={styles.heading}>
              {renderHeading(project.overview.heading, styles)}
            </h2>
            {project.overview.paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
