"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Eye } from "lucide-react";
import { Inquiry } from "@/types/inquiry";
import styles from "./page.module.scss";

interface AdminInquiriesTableProps {
  initialInquiries: Inquiry[];
}

export default function AdminInquiriesTable({
  initialInquiries,
}: AdminInquiriesTableProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  React.useEffect(() => {
    setInquiries(initialInquiries);
  }, [initialInquiries]);

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;

    const headers = [
      "ID",
      "Date",
      "Type",
      "Name",
      "Email",
      "Phone",
      "City",
      "Status",
      "Source Page",
    ];

    const rows = inquiries.map((inq) => [
      inq.id,
      new Date(inq.createdAt).toISOString(),
      inq.inquiryType,
      `"${(inq.name || "").replace(/"/g, '""')}"`,
      inq.email || "",
      inq.phone || "",
      `"${(inq.city || "").replace(/"/g, '""')}"`,
      inq.status,
      inq.sourcePage,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `solergy_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = inquiries.filter((inq) => {
    const matchesStatus =
      statusFilter === "all" || inq.status === statusFilter;
    const matchesType =
      typeFilter === "all" || inq.inquiryType === typeFilter;
    const text = `${inq.name || ""} ${inq.email || ""} ${inq.phone || ""} ${
      inq.city || ""
    }`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Website Form Responses & Leads</h1>
          <p>Real-time inquiries captured from contact, calculator, and product forms.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className={styles.exportBtn}
            onClick={async () => {
              try {
                const res = await fetch("/api/admin/inquiries");
                const data = await res.json();
                if (data.inquiries) setInquiries(data.inquiries);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Refresh Leads
          </button>
          <button
            type="button"
            className={styles.exportBtn}
            onClick={handleExportCSV}
            disabled={inquiries.length === 0}
          >
            <Download size={16} />
            Export to CSV
          </button>
        </div>
      </div>

      <div className={styles.tablePanel}>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search leads by name, email, phone, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="new">New / Uncontacted</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="converted">Converted Client</option>
            <option value="closed">Closed</option>
            <option value="spam">Marked as Spam</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Form Types</option>
            <option value="quick_callback">Quick Callback</option>
            <option value="contact_page">Contact Page</option>
            <option value="homepage_contact">Homepage Contact</option>
            <option value="calculator_lead">Calculator Lead</option>
            <option value="industry">Commercial / Industrial</option>
            <option value="home">Residential</option>
          </select>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Contact Name</th>
                <th>Channel / Email / Phone</th>
                <th>Type</th>
                <th>Location</th>
                <th>Date Received</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "32px" }}>
                    No form submissions match the active filters.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "#0f172a" }}>
                        {inq.name || "Anonymous Direct Lead"}
                      </div>
                    </td>
                    <td>
                      <div>{inq.email || "—"}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        {inq.phone || ""}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.8125rem", color: "#ec4d00" }}>
                        {inq.inquiryType.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                    <td>{inq.city || "—"}</td>
                    <td suppressHydrationWarning>
                      {new Date(inq.createdAt).toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`${styles.statusTag} ${
                          styles[inq.status] || styles.new
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/admin/inquiries/${inq.id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#ec4d00",
                          fontWeight: 600,
                        }}
                      >
                        <Eye size={14} />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
