"use client";

import React from "react";
import Link from "next/link";
import Button from "../../common/Button/Button";
import styles from "./ProjectDetailCTA.module.scss";

export default function ProjectDetailCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Ready when you are</p>
        <h2 className={styles.heading}>Want a System Like This?</h2>
        <p className={styles.description}>
          Every project starts with a free site visit and an honest look at
          your energy usage. Let&apos;s figure out what works for your roof.
        </p>
        <div className={styles.actions}>
          <Button variant="primary" href="/#contact">
            Get My Free Quote
          </Button>
          <Button variant="secondary" href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
            Talk on WhatsApp
          </Button>
        </div>
        <Link href="/projects" className={styles.backLink}>
          &larr; Back to All Projects
        </Link>
      </div>
    </section>
  );
}
