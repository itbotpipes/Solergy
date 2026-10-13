import Link from 'next/link';
import Image from 'next/image';
import Button from '../../common/Button/Button';
import styles from './ProjectDetailHero.module.scss';

export interface ProjectDetailHeroProps {
  project: any;
}

export default function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.sep}>/</span>
          <Link href="/projects">Projects</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>{project.title}</span>
        </nav>

        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.tag}>
              {project.category} Solar &middot; {project.city}, {project.state || 'Gujarat'}
            </span>
            <h1 className={styles.heading}>{project.title}</h1>
            <p className={styles.summary}>
              {project.size} &middot; {project.systemType}
            </p>
            <p className={styles.description}>{project.description}</p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Location</div>
                <div className={styles.metaValue}>
                  {project.city}, {project.state || 'Gujarat'}
                </div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>System</div>
                <div className={styles.metaValue}>{project.systemType}</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Capacity</div>
                <div className={styles.metaValue}>{project.size}</div>
              </div>
            </div>

            <div className={styles.actions}>
              <Button variant="primary" to="/contact">
                Get a Free Solar Quote
              </Button>
            </div>

            <div className={styles.statsStrip}>
              <div className={styles.stat}>
                <div className={styles.statValue}>{project.size}</div>
                <div className={styles.statLabel}>System Size</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>
                  {project.specs?.find((s: any) => s.label === 'Annual Generation')
                    ?.value ?? '—'}
                </div>
                <div className={styles.statLabel}>Annual Generation</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>{project.date}</div>
                <div className={styles.statLabel}>Completed</div>
              </div>
            </div>
          </div>

          <div className={styles.imageWrap}>
            {typeof project.image === 'string' ? (
              <img
                src={project.image}
                alt={project.title}
                className={styles.heroImage}
              />
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                className={styles.heroImage}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
