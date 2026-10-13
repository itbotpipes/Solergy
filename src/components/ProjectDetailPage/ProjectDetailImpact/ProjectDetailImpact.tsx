"use client";

import React, { useRef } from "react";
import useInView from "../../../hooks/useInView";
import styles from "./ProjectDetailImpact.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project } from "@/types/project";

const SYSTEM_LIFE_YEARS = 25;

interface ProjectDetailImpactProps {
  project: Project;
}

export default function ProjectDetailImpact({ project }: ProjectDetailImpactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  const paybackYear = project.impact.paybackYear ?? 0;
  const paybackPosition = Math.min(
    (paybackYear / SYSTEM_LIFE_YEARS) * 100,
    100
  );

  return (
    <section
      className={`${styles.impact} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>
            Less Grid. More Solar.{" "}
            <span className={styles.highlight}>More Savings.</span>
          </h2>
          {project.impact.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={styles.card}>
          <div className={styles.summaryRow}>
            <div className={styles.summaryItem}>
              <p className={styles.summaryLabel}>
                Cumulative Savings Over Time
              </p>
              <p className={styles.summaryValue}>
                {project.impact.cumulativeSavings}
              </p>
            </div>
            <div className={`${styles.summaryItem} ${styles.alignRight}`}>
              <p className={styles.summaryLabel}>Investment Recovered By</p>
              <p className={styles.summaryValue}>Year {paybackYear}</p>
            </div>
          </div>

          <div className={styles.chart}>
            <div className={styles.chartRows}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles.chartRow} />
              ))}
            </div>
            <div
              className={styles.paybackLine}
              style={{ left: `${paybackPosition}%` }}
            >
              <span className={styles.paybackLabel}>
                Payback: Year {paybackYear}
              </span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            {project.impact.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
