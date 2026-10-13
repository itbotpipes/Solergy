import Button from '../../common/Button/Button';
import SolarPanelScene from './SolarPanelScene';
import styles from './ProjectsHero.module.scss';

const STATS = [
  { value: '120+', label: 'Projects Completed' },
  { value: '20+ MW', label: 'Capacity Installed' },
  { value: '6', label: 'Cities Served' },
];

export interface ProjectsHeroProps {
  onCityClick?: (city: string) => void;
}

export default function ProjectsHero({ onCityClick }: ProjectsHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Our Work</p>
          <h1 className={styles.heading}>
            Real <span className={styles.highlight}>Roofs</span>. Real{' '}
            <span className={styles.highlight}>Power Plants.</span>
          </h1>
          <p className={styles.description}>
            From homes to factories, here&apos;s a look at the solar systems
            we&apos;ve designed, installed, and switched on across India.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" to="/contact">
              Get Your Free Quote
            </Button>
          </div>
        </div>

        <div className={styles.sceneWrap}>
          <SolarPanelScene onCityClick={onCityClick} />
        </div>
      </div>

      <div className={styles.statsStrip}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
