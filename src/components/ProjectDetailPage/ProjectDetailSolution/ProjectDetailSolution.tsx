"use client";

import React, { useRef } from "react";
import useInView from "../../../hooks/useInView";
import styles from "./ProjectDetailSolution.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project, ProjectPoint } from "@/types/project";

const ICONS: Record<string, React.ReactNode> = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </>
  ),
  roof: (
    <>
      <path d="M3 20 12 4l9 16" />
      <path d="M3 20h18" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

function getIconKey(point: ProjectPoint): string {
  const text = `${point.title} ${point.description}`.toLowerCase();
  if (/daytime|generation|sun/.test(text)) return "sun";
  if (/roof|space|layout|efficient/.test(text)) return "roof";
  if (/long-term|performance|reliab/.test(text)) return "shield";
  return "sun";
}

function PointIcon({ iconKey }: { iconKey: string }) {
  return (
    <svg
      className={styles.pointIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[iconKey]}
    </svg>
  );
}

interface ProjectDetailSolutionProps {
  project: Project;
}

export default function ProjectDetailSolution({ project }: ProjectDetailSolutionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  const installation =
    project.glance?.find((item) => item.label === "Installation")?.value ??
    "Rooftop";

  return (
    <section
      className={`${styles.solution} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <h2 className={styles.heading}>{project.solution.heading}</h2>
            {project.solution.intro.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            <span className={styles.pill}>
              <span className={styles.pillDot} />
              {project.systemType} &middot; {project.size} &middot;{" "}
              {installation}
            </span>
          </div>

          <div className={styles.timeline}>
            <p className={styles.subLabel}>Built For</p>
            {project.solution.points.map((point, index) => (
              <div key={point.title} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <span className={styles.timelineIconWrap}>
                    <PointIcon iconKey={getIconKey(point)} />
                  </span>
                  {index < project.solution.points.length - 1 && (
                    <span className={styles.timelineLine} />
                  )}
                </div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                  <p className={styles.pointDescription}>
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
