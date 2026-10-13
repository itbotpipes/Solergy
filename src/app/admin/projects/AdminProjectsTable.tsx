"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink, MapPin } from "lucide-react";
import { Project } from "@/types/project";
import styles from "./page.module.scss";

interface AdminProjectsTableProps {
  initialProjects: Project[];
}

export default function AdminProjectsTable({
  initialProjects,
}: AdminProjectsTableProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete project.");
      }
    } catch {
      alert("Error deleting project.");
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
      (p.city && p.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Solar Projects CMS</h1>
          <p>Create, update case studies, customize metrics, and manage installation galleries.</p>
        </div>
        <Link href="/admin/projects/new" className={styles.newBtn}>
          <Plus size={16} />
          New Project
        </Link>
      </div>

      <div className={styles.tablePanel}>
        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="Search projects by title, category, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
            Showing {filtered.length} projects
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Project Case Study</th>
                <th>Category</th>
                <th>Capacity</th>
                <th>Location</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "32px" }}>
                    No projects found. Click &quot;New Project&quot; to add one.
                  </td>
                </tr>
              ) : (
                filtered.map((project) => {
                  const coverImg =
                    typeof project.image === "string"
                      ? project.image
                      : (project.image as any)?.src ||
                        "/images/projects/why-solergy-house.jpg";

                  return (
                    <tr key={project.id}>
                      <td>
                        <div className={styles.productCell}>
                          <img src={coverImg} alt={project.title} />
                          <div>
                            <div className={styles.name}>{project.title}</div>
                            <div className={styles.slug}>/project/{project.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={styles.categoryBadge}>
                          {project.category}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: "#ec4d00" }}>
                        {project.size}
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#cbd5e1" }}>
                          <MapPin size={14} color="#ec4d00" />
                          {project.city}, {project.state || "Punjab"}
                        </div>
                      </td>
                      <td style={{ color: "#94a3b8" }}>{project.date}</td>
                      <td>
                        <div className={styles.actionsCell}>
                          <Link
                            href={`/project/${project.id}`}
                            target="_blank"
                            title="View Live Case Study"
                          >
                            <ExternalLink size={16} />
                          </Link>
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            title="Edit Project"
                          >
                            <Edit2 size={16} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(project.id, project.title)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
