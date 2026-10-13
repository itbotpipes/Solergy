import React from 'react';
import styles from './WhySolar.module.scss';

export interface WhySolarCardProps {
  title: string;
  description: string;
  icon: React.ComponentType;
}

export default function WhySolarCard({ title, description, icon: Icon }: WhySolarCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconBadge}>
        <Icon />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}
