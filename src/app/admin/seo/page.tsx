import React from "react";
import Link from "next/link";
import { Edit2, ExternalLink } from "lucide-react";
import { getAllSEOConfigs } from "@/services/seo";
import { getAllProjects } from "@/data/projects";
import { getAllProducts } from "@/services/products";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export default async function AdminSEOPage() {
  const [seoConfigs, products] = await Promise.all([
    getAllSEOConfigs(),
    getAllProducts(),
  ]);
  const projects = getAllProjects();

  const seoMap = new Map(seoConfigs.map((c) => [c.pageKey, c]));

  const staticPages = [
    { key: "home", name: "Homepage", path: "/" },
    { key: "about", name: "About Us", path: "/about" },
    { key: "calculator", name: "Solar Calculator", path: "/calculator" },
    { key: "projects", name: "Projects Portfolio", path: "/projects" },
    { key: "products", name: "Products Catalog", path: "/products" },
    { key: "contact", name: "Contact Us", path: "/contact" },
  ];

  return (
    <div>
      <div className={styles.header}>
        <h1>Website SEO & Metadata Management</h1>
        <p>
          Customize Meta Titles, Open Graph tags, Twitter cards, and indexing
          behavior across every page and project.
        </p>
      </div>

      {/* Static Core Pages */}
      <div className={styles.tablePanel}>
        <div className={styles.panelHeader}>
          <h2>Core Public Pages</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Page</th>
              <th>Current Meta Title</th>
              <th>Indexing</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staticPages.map((page) => {
              const cfg = seoMap.get(page.key);
              return (
                <tr key={page.key}>
                  <td>
                    <div className={styles.pageName}>{page.name}</div>
                    <div className={styles.pagePath}>{page.path}</div>
                  </td>
                  <td>{cfg?.title || "Default brand title configured"}</td>
                  <td>
                    <span
                      className={`${styles.indexBadge} ${
                        cfg?.robotsIndex !== false
                          ? styles.index
                          : styles.noindex
                      }`}
                    >
                      {cfg?.robotsIndex !== false ? "index, follow" : "noindex"}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/admin/seo/${page.key}`}
                      className={styles.editLink}
                    >
                      <Edit2 size={14} />
                      Edit SEO
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Project Detail Pages SEO */}
      <div className={styles.tablePanel}>
        <div className={styles.panelHeader}>
          <h2>Project Case Study Pages (Portfolio SEO Overrides)</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Project Case Study</th>
              <th>Current Meta Title</th>
              <th>Indexing</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => {
              const pageKey = `project:${proj.id}`;
              const cfg = seoMap.get(pageKey);
              return (
                <tr key={proj.id}>
                  <td>
                    <div className={styles.pageName}>{proj.title}</div>
                    <div className={styles.pagePath}>/project/{proj.id}</div>
                  </td>
                  <td>
                    {cfg?.title || `${proj.title} — ${proj.size} Solar Installation`}
                  </td>
                  <td>
                    <span
                      className={`${styles.indexBadge} ${
                        cfg?.robotsIndex !== false
                          ? styles.index
                          : styles.noindex
                      }`}
                    >
                      {cfg?.robotsIndex !== false ? "index, follow" : "noindex"}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/admin/seo/${encodeURIComponent(pageKey)}`}
                      className={styles.editLink}
                    >
                      <Edit2 size={14} />
                      Edit SEO
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Product Detail Pages SEO */}
      <div className={styles.tablePanel}>
        <div className={styles.panelHeader}>
          <h2>Product Pages (Hardware Catalog SEO Overrides)</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Equipment</th>
              <th>Current Meta Title</th>
              <th>Indexing</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => {
              const pageKey = `product:${prod.id}`;
              const cfg = seoMap.get(pageKey);
              return (
                <tr key={prod.id}>
                  <td>
                    <div className={styles.pageName}>{prod.name}</div>
                    <div className={styles.pagePath}>/products/{prod.slug}</div>
                  </td>
                  <td>{cfg?.title || `${prod.name} | Solergy`}</td>
                  <td>
                    <span
                      className={`${styles.indexBadge} ${
                        cfg?.robotsIndex !== false
                          ? styles.index
                          : styles.noindex
                      }`}
                    >
                      {cfg?.robotsIndex !== false ? "index, follow" : "noindex"}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/admin/seo/${encodeURIComponent(pageKey)}`}
                      className={styles.editLink}
                    >
                      <Edit2 size={14} />
                      Edit SEO
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
