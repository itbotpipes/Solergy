"use client";

import React, { useRef } from "react";
import useInView from "../../../hooks/useInView";
import styles from "./ProjectDetailProcess.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project } from "@/types/project";

const SearchIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9.5" cy="9.5" r="6" stroke="#EC4D00" strokeWidth="1.5" />
    <path
      d="M14 14l4.5 4.5"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DesignIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 3.5l4 4L7 19l-5 1 1-5L14.5 3.5z"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6l4 4"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const BuildIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.7 3.6a4 4 0 00-5.2 4.9L3 15l3 3 6.5-6.5a4 4 0 004.9-5.2l-2.6 2.6-2-2 2.6-2.6z"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="8.5" stroke="#EC4D00" strokeWidth="1.5" />
    <path
      d="M7.2 11.2l2.5 2.5 5-5.4"
      stroke="#EC4D00"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface ProjectDetailProcessProps {
  project: Project;
}

export default function ProjectDetailProcess({ project }: ProjectDetailProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  const STEPS = [
    {
      step: "01",
      title: "Understand",
      description: `We studied ${project.title}'s electricity consumption, operating hours, rooftop area, and project requirements.`,
      icon: <SearchIcon />,
    },
    {
      step: "02",
      title: "Design",
      description: `Our engineering team designed a ${project.size} system around the facility's energy profile and available space.`,
      icon: <DesignIcon />,
    },
    {
      step: "03",
      title: "Build",
      description:
        "We handled equipment procurement, mounting structures, panel installation, electrical integration, and system setup.",
      icon: <BuildIcon />,
    },
    {
      step: "04",
      title: "Commission",
      description:
        "The completed system was tested, commissioned, and handed over ready for operation.",
      icon: <CheckIcon />,
    },
  ];

  return (
    <section
      className={`${styles.process} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>
            From First Calculation to{" "}
            <span className={styles.highlight}>Final Connection.</span>
          </h2>
          <p className={styles.description}>
            A solar project isn&apos;t just about installing panels. It&apos;s
            about understanding the site, getting the design right, and making
            sure everything works together.
          </p>
        </div>

        <div className={styles.timeline}>
          {STEPS.map((item) => (
            <div key={item.step} className={styles.timelineItem}>
              <div className={styles.iconBadge}>{item.icon}</div>
              <span className={styles.year}>
                {item.step} — {item.title}
              </span>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
