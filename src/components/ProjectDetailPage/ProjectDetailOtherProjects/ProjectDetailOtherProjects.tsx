"use client";

import React, { useRef } from "react";
import ProjectCard from "../../Projects/ProjectCard";
import useInView from "../../../hooks/useInView";
import PROJECTS from "../../../data/projects";
import styles from "./ProjectDetailOtherProjects.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project } from "@/types/project";

interface ProjectDetailOtherProjectsProps {
  project: Project;
  otherProjects?: Project[];
}

export default function ProjectDetailOtherProjects({ project, otherProjects: passedOthers }: ProjectDetailOtherProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  const pool = passedOthers && passedOthers.length > 0 ? passedOthers : PROJECTS;

  let otherProjects: Project[] = [];
  if (project.otherProjectIds && project.otherProjectIds.length > 0) {
    otherProjects = project.otherProjectIds
      .map((id) =>
        pool.find((p) => p.id === id || p.title.toLowerCase().includes(id.toLowerCase()))
      )
      .filter(Boolean) as Project[];
  }

  if (otherProjects.length === 0) {
    otherProjects = pool.filter((p) => p.id !== project.id).slice(0, 3);
  }

  return (
    <section
      className={`${styles.otherProjects} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          More Work <span className={styles.highlight}>Worth a Look.</span>
        </h2>

        <div className={styles.grid}>
          {otherProjects.map((item) => (
            <ProjectCard
              key={item.id}
              id={item.id}
              image={item.image}
              category={item.category}
              title={item.title}
              location={`${item.city}, ${item.state}`}
              power={`${item.size} Solar`}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
