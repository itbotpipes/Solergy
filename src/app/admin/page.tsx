import React from "react";
import Link from "next/link";
import { Plus, Search, ArrowRight } from "lucide-react";
import { getAllProducts } from "@/services/products";
import { getInquiries, getInquiryStats } from "@/services/inquiries";
import StatCards from "@/components/admin/StatCards";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [products, inquiryStats, recentInquiries] = await Promise.all([
    getAllProducts(),
    getInquiryStats(),
    getInquiries({ limit: 5 }),
  ]);

  const stats = {
    totalProducts: products.length,
    publishedProducts: products.filter((p) => p.status === "published").length,
    totalInquiries: inquiryStats.total,
    newInquiries: inquiryStats.new,
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <div>
          <h1>Operations Overview</h1>
          <p>Real-time statistics across products, customer inquiries, and SEO metadata.</p>
        </div>
        <div className={styles.actions}>
          <Link href="/admin/products/new" className={styles.btnPrimary}>
            <Plus size={16} />
            Add New Product
          </Link>
          <Link href="/admin/seo" className={styles.btnSecondary}>
            <Search size={16} />
            Manage SEO
          </Link>
        </div>
      </div>

      <StatCards stats={stats} />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Recent Form Submissions</h2>
          <Link href="/admin/inquiries">
            View All Inquiries &rarr;
          </Link>
        </div>

        <div className={styles.tableWrap}>
          {recentInquiries.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Client / Contact</th>
                  <th>Form Type</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "#fff" }}>
                        {inq.name || "Anonymous / Direct"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        {inq.email || inq.phone || "No direct email"}
                      </div>
                    </td>
                    <td>{inq.inquiryType.replace("_", " ").toUpperCase()}</td>
                    <td>{inq.city || "—"}</td>
                    <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[inq.status] || styles.new
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/admin/inquiries/${inq.id}`}
                        style={{ color: "#ec4d00", fontSize: "0.8125rem", fontWeight: 600 }}
                      >
                        Inspect &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "#64748b", padding: "20px 0" }}>
              No inquiries submitted yet. Website form submissions will appear here automatically.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
