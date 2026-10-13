'use client';

import useCountUp from './useCountUp';
import styles from './Hero.module.scss';

export interface StatProps {
  target: number;
  numSuffix?: string;
  unit?: string;
  label: string;
  active: boolean;
}

export default function Stat({ target, numSuffix, unit, label, active }: StatProps) {
  const count = useCountUp(target, active);

  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>
        {count}
        {numSuffix}
      </span>
      <span className={styles.statLabel}>
        {unit && <strong className={styles.statUnit}>{unit}</strong>}
        {label}
      </span>
    </div>
  );
}
