'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useInView from '../../../hooks/useInView';
import PROJECTS from '../../../data/projects';
import Button from '../../common/Button/Button';
import styles from './ProjectsGrid.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const FILTERS = [
  { label: 'All Projects', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial/Industrial', value: 'commercial/industrial' },
];

const INITIAL_VISIBLE_COUNT = 6;

function ProjectCard({ project, highlighted }: { project: any; highlighted: boolean }) {
  return (
    <div className={`${styles.card} ${highlighted ? styles.cardHighlight : ''}`}>
      <div className={styles.thumb}>
        {typeof project.image === 'string' ? (
          <img src={project.image} alt={project.title} className={styles.thumbImage} />
        ) : (
          <Image src={project.image} alt={project.title} className={styles.thumbImage} />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.tagRow}>
          <span className={styles.tag}>{project.category}</span>
          <span className={styles.size}>{project.size}</span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.bottomRow}>
          <div className={styles.location}>&#128205; {project.city}, {project.state || 'Gujarat'}</div>
          <Link href={`/project/${project.id}`} className={styles.link}>
            View Project &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export interface ProjectsGridProps {
  filter?: string;
  setFilter?: (f: string) => void;
  highlightCity?: string | null;
  initialProjects?: any[];
}

export default function ProjectsGrid({
  filter: externalFilter,
  setFilter: externalSetFilter,
  highlightCity,
  initialProjects,
}: ProjectsGridProps) {
  const allProjects = initialProjects && initialProjects.length > 0 ? initialProjects : PROJECTS;
  const [internalFilter, setInternalFilter] = useState('all');
  const activeFilter = externalFilter ?? internalFilter;
  const handleSetFilter = externalSetFilter ?? setInternalFilter;

  const sectionRef = useRef<HTMLElement>(null);
  const sectionVisible = useInView(sectionRef, 0.1);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridVisible = useInView(gridRef);
  const [flashCity, setFlashCity] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!highlightCity) return undefined;
    setFlashCity(highlightCity);
    const timer = setTimeout(() => setFlashCity(null), 1400);
    return () => clearTimeout(timer);
  }, [highlightCity]);

  useEffect(() => {
    setShowAll(false);
  }, [activeFilter]);

  const filteredProjects = allProjects.filter(
    (project: any) => activeFilter === 'all' || project.category?.toLowerCase() === activeFilter
  );
  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = filteredProjects.length > INITIAL_VISIBLE_COUNT && !showAll;

  return (
    <section
      id="projects-grid"
      ref={sectionRef}
      className={`${styles.section} ${reveal.sectionReveal} ${
        sectionVisible ? reveal.sectionVisible : ''
      }`}
    >
      <div className={styles.filterRow}>
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`${styles.filterChip} ${
              activeFilter === item.value ? styles.filterChipActive : ''
            }`}
            onClick={() => handleSetFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.grid} ref={gridRef}>
        {visibleProjects.map((project: any, index: number) => (
          <div
            key={project.id}
            className={`${styles.cardReveal} ${
              gridVisible ? styles.cardVisible : ''
            }`}
            style={{ transitionDelay: gridVisible ? `${index * 100}ms` : '0ms' }}
          >
            <ProjectCard
              project={project}
              highlighted={flashCity === project.city}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className={styles.moreRow}>
          <Button variant="secondary" onClick={() => setShowAll(true)}>
            More Projects
          </Button>
        </div>
      )}
    </section>
  );
}
