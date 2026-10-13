import React from "react";
import styles from "./ProductsHero.module.scss";

export default function ProductsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>
          Engineered Solar Systems
        </span>
        <h1 className={styles.heading}>
          High-Efficiency Hardware for <span className={styles.highlight}>Maximum Output.</span>
        </h1>
        <p className={styles.subheading}>
          Explore Tier-1 solar modules, hybrid inverters, and utility-grade lithium storage systems certified for optimal generation in all weather conditions.
        </p>
      </div>
    </section>
  );
}
