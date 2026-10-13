'use client';

import { useRef } from 'react';
import ProjectCard from './ProjectCard';
import useInView from '../../hooks/useInView';
import PROJECTS, { FEATURED_PROJECT_IDS } from '../../data/projects';
import styles from './Projects.module.scss';
import reveal from '../../styles/reveal.module.scss';

const FEATURED_PROJECTS = FEATURED_PROJECT_IDS.map((id) =>
  PROJECTS.find((project: any) => project.id === id)
).filter(Boolean) as any[];

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);
  const visible = useInView(gridRef);
  const sectionRef = useRef<HTMLElement>(null);
  const sectionVisible = useInView(sectionRef, 0.1);

  return (
    <section
      className={`${styles.projects} ${reveal.sectionReveal} ${
        sectionVisible ? reveal.sectionVisible : ''
      }`}
      id="projects"
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          <span className={styles.highlight}>Our Work,</span> Out in the Sun
        </h2>

        <div className={styles.grid} ref={gridRef}>
          {FEATURED_PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.cardReveal} ${visible ? styles.cardVisible : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProjectCard
                id={project.id}
                image={project.image}
                category={project.category}
                title={project.title}
                location={`${project.city}, Gujarat`}
                power={`${project.size} Solar`}
                date={project.date}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
