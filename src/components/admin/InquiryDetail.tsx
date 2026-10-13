"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Mail, Copy, Check, ArrowLeft } from "lucide-react";
import { Inquiry, InquiryStatus } from "@/types/inquiry";
import styles from "./InquiryDetail.module.scss";

interface InquiryDetailProps {
  inquiry: Inquiry;
}

export default function InquiryDetail({ inquiry }: InquiryDetailProps) {
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);
  const [notes, setNotes] = useState(inquiry.notes || []);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [copied, setCopied] = useState(false);

  const cleanPhone = (inquiry.phone || "").replace(/\D/g, "");
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=Hello%20${encodeURIComponent(
        inquiry.name || "there"
      )},%20thank%20you%20for%20contacting%20Solergy%20Solar.`
    : "#";

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    setStatus(newStatus);
    setUpdatingStatus(true);

    try {
      await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setSavingNote(true);

    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote }),
      });
      const data = await res.json();
      if (data.inquiry?.notes) {
        setNotes(data.inquiry.notes);
      } else {
        setNotes((prev) => [
          ...prev,
          {
            id: `n_${Date.now()}`,
            author: "Administrator",
            content: newNote,
            createdAt: Date.now(),
          },
        ]);
      }
      setNewNote("");
    } catch (err) {
      console.error("Failed to add note", err);
    } finally {
      setSavingNote(false);
    }
  };

  const handleCopyContact = () => {
    const text = `Name: ${inquiry.name || "N/A"}\nEmail: ${
      inquiry.email || "N/A"
    }\nPhone: ${inquiry.phone || "N/A"}\nLocation: ${inquiry.city || "N/A"}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Link
          href="/admin/inquiries"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#94a3b8",
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={16} />
          Back to Inquiries
        </Link>
      </div>

      <div className={styles.layout}>
        {/* Left Column: Form Details */}
        <div>
          <div className={styles.panel}>
            <h2>Inquiry Details & Contact Info</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.label}>Full Name</div>
                <div className={styles.value}>{inquiry.name || "Anonymous / Direct"}</div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.label}>Email Address</div>
                <div className={styles.value}>{inquiry.email || "None provided"}</div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.label}>Phone Number</div>
                <div className={styles.value}>{inquiry.phone || "None provided"}</div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.label}>Location / City</div>
                <div className={styles.value}>{inquiry.city || "Not specified"}</div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.label}>Form Channel</div>
                <div className={styles.value} style={{ color: "#ec4d00" }}>
                  {inquiry.inquiryType.replace("_", " ").toUpperCase()}
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.label}>Date Received</div>
                <div className={styles.value} suppressHydrationWarning>
                  {new Date(inquiry.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            {inquiry.message && (
              <div style={{ marginTop: "20px" }}>
                <div className={styles.infoItem}>
                  <div className={styles.label}>Customer Message</div>
                  <div className={styles.messageBox}>{inquiry.message}</div>
                </div>
              </div>
            )}

            {/* Quick action buttons */}
            <div className={styles.quickActions}>
              {cleanPhone && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionBtn} ${styles.whatsapp}`}
                >
                  <MessageSquare size={16} />
                  Open WhatsApp
                </a>
              )}

              {inquiry.email && (
                <a
                  href={`mailto:${inquiry.email}?subject=Solergy Solar Inquiry Response`}
                  className={`${styles.actionBtn} ${styles.email}`}
                >
                  <Mail size={16} />
                  Send Email
                </a>
              )}

              <button
                type="button"
                className={`${styles.actionBtn} ${styles.copy}`}
                onClick={handleCopyContact}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy Contact Info"}
              </button>
            </div>
          </div>

          {/* Form Raw/Full Data */}
          {inquiry.formData && Object.keys(inquiry.formData).length > 0 && (
            <div className={styles.panel}>
              <h2>Submitted Form Payload</h2>
              <div className={styles.infoGrid}>
                {Object.entries(inquiry.formData).map(([key, val]) => (
                  <div key={key} className={styles.infoItem}>
                    <div className={styles.label}>{key}</div>
                    <div className={styles.value}>
                      {typeof val === "object"
                        ? JSON.stringify(val)
                        : String(val)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calculator Data */}
          {inquiry.calculatorData && (
            <div className={styles.panel}>
              <h2>Calculated System Data</h2>
              <div className={styles.infoGrid}>
                {Object.entries(inquiry.calculatorData).map(([key, val]) => (
                  <div key={key} className={styles.infoItem}>
                    <div className={styles.label}>{key}</div>
                    <div className={styles.value}>{String(val)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Status & Internal Notes */}
        <div>
          <div className={styles.panel}>
            <h2>Inquiry Status</h2>
            <div className={styles.statusChanger}>
              <select
                value={status}
                onChange={(e) =>
                  handleStatusChange(e.target.value as InquiryStatus)
                }
                disabled={updatingStatus}
              >
                <option value="new">New / Uncontacted</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="converted">Converted Client</option>
                <option value="closed">Closed</option>
                <option value="spam">Spam / Disqualified</option>
              </select>
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                {updatingStatus ? "Updating status..." : "Saved in Firestore"}
              </span>
            </div>
          </div>

          <div className={styles.panel}>
            <h2>Internal Notes & Audit Log</h2>
            <div className={styles.notesSection}>
              <form onSubmit={handleAddNote} className={styles.noteForm}>
                <textarea
                  required
                  placeholder="Add internal notes on phone call, site survey scheduling, quote value..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button type="submit" disabled={savingNote}>
                  {savingNote ? "Saving..." : "Add Note"}
                </button>
              </form>

              <div className={styles.notesList}>
                {notes.map((note) => (
                  <div key={note.id} className={styles.noteCard}>
                    <div className={styles.noteMeta}>
                      <span>{note.author}</span>
                      <span suppressHydrationWarning>{new Date(note.createdAt).toLocaleString()}</span>
                    </div>
                    <div className={styles.noteContent}>{note.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
