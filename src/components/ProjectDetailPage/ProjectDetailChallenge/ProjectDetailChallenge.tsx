"use client";

import React, { useRef } from "react";
import useInView from "../../../hooks/useInView";
import styles from "./ProjectDetailChallenge.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project, ProjectPoint } from "@/types/project";

const ICONS: Record<string, React.ReactNode> = {
  bolt: (
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
  ),
  trendingUp: (
    <>
      <polyline points="3 17 9 11 13 15 21 6" />
      <polyline points="15 6 21 6 21 12" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 16 14" />
    </>
  ),
  shield: (
    <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3z" />
  ),
  home: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
    </>
  ),
};

function getIconKey(point: ProjectPoint): string {
  const text = `${point.title} ${point.description}`.toLowerCase();
  if (/cost|tariff|bill|expens|saving/.test(text)) return "trendingUp";
  if (/install|window|time|schedul|downtime|day/.test(text)) return "clock";
  if (/safety|clearance|fire|secure/.test(text)) return "shield";
  if (/roof|shed|terrace|site|coordinat/.test(text)) return "home";
  return "bolt";
}

function CardIcon({ iconKey }: { iconKey: string }) {
  return (
    <svg
      className={styles.cardIcon}
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

interface ProjectDetailChallengeProps {
  project: Project;
}

export default function ProjectDetailChallenge({ project }: ProjectDetailChallengeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.challenge} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>{project.challenge.heading}</h2>
          {project.challenge.intro.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={styles.grid}>
          {project.challenge.points.map((point) => (
            <div key={point.title} className={styles.card}>
              <div className={styles.cardIconWrap}>
                <CardIcon iconKey={getIconKey(point)} />
              </div>
              <p className={styles.cardLabel}>What We Had to Solve</p>
              <h3 className={styles.cardTitle}>{point.title}</h3>
              <p className={styles.cardDescription}>{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
