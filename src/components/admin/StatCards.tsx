import React from "react";
import { Package, Inbox, CheckCircle2, FileText } from "lucide-react";
import styles from "./StatCards.module.scss";

interface StatCardsProps {
  stats: {
    totalProjects: number;
    totalInquiries: number;
    newInquiries: number;
  };
}

export default function StatCards({ stats }: StatCardsProps) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={`${styles.iconWrap} ${styles.orange}`}>
          <Package size={24} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Total Projects</span>
          <span className={styles.value}>{stats.totalProjects}</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={`${styles.iconWrap} ${styles.blue}`}>
          <Inbox size={24} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Total Inquiries</span>
          <span className={styles.value}>{stats.totalInquiries}</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={`${styles.iconWrap} ${styles.purple}`}>
          <FileText size={24} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>New / Unread Leads</span>
          <span className={styles.value}>{stats.newInquiries}</span>
        </div>
      </div>
    </div>
  );
}
