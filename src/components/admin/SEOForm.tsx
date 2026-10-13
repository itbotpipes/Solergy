"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SEOPageConfig } from "@/types/seo";
import styles from "./SEOForm.module.scss";

interface SEOFormProps {
  pageKey: string;
  initialConfig?: SEOPageConfig;
}

export default function SEOForm({ pageKey, initialConfig }: SEOFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialConfig?.title || "");
  const [description, setDescription] = useState(
    initialConfig?.description || ""
  );
  const [canonicalUrl, setCanonicalUrl] = useState(
    initialConfig?.canonicalUrl || ""
  );
  const [robotsIndex, setRobotsIndex] = useState(
    initialConfig?.robotsIndex ?? true
  );
  const [robotsFollow, setRobotsFollow] = useState(
    initialConfig?.robotsFollow ?? true
  );

  const [ogTitle, setOgTitle] = useState(initialConfig?.openGraph?.title || "");
  const [ogDescription, setOgDescription] = useState(
    initialConfig?.openGraph?.description || ""
  );
  const [ogImage, setOgImage] = useState(initialConfig?.openGraph?.image || "");

  const [twitterTitle, setTwitterTitle] = useState(
    initialConfig?.twitter?.title || ""
  );
  const [twitterDescription, setTwitterDescription] = useState(
    initialConfig?.twitter?.description || ""
  );
  const [twitterImage, setTwitterImage] = useState(
    initialConfig?.twitter?.image || ""
  );

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const titleLength = title.length;
  const descLength = description.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    const payload: Partial<SEOPageConfig> = {
      pageKey,
      title,
      description,
      canonicalUrl: canonicalUrl || undefined,
      robotsIndex,
      robotsFollow,
      openGraph: {
        title: ogTitle || title,
        description: ogDescription || description,
        image: ogImage || undefined,
      },
      twitter: {
        title: twitterTitle || title,
        description: twitterDescription || description,
        image: twitterImage || undefined,
      },
    };

    try {
      const res = await fetch(`/api/admin/seo/${encodeURIComponent(pageKey)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update SEO config.");
      }

      setSuccessMsg("SEO metadata successfully updated and cached invalidated!");
      setTimeout(() => {
        router.push("/admin/seo");
        router.refresh();
      }, 1200);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving SEO");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {successMsg && (
        <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", color: "#34d399", padding: "12px", borderRadius: "8px" }}>
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", color: "#f87171", padding: "12px", borderRadius: "8px" }}>
          {errorMsg}
        </div>
      )}

      {/* Google SERP Preview */}
      <div className={styles.panel}>
        <h2>Search Result (Google SERP) Preview</h2>
        <div className={styles.serpPreview}>
          <div className={styles.serpUrl}>
            https://solergy.com {canonicalUrl ? `› ${canonicalUrl.replace(/^https?:\/\/[^/]+\/?/, "")}` : `› ${pageKey}`}
          </div>
          <div className={styles.serpTitle}>
            {title || "Solergy | Rooftop Solar Installation & High-Efficiency Systems"}
          </div>
          <div className={styles.serpSnippet}>
            {description || "Explore customized solar installations with top-tier photovoltaic modules and smart battery storage."}
          </div>
        </div>

        <div className={styles.field}>
          <label>
            <span>Meta Title *</span>
            <span
              className={`${styles.counter} ${
                titleLength >= 50 && titleLength <= 60
                  ? styles.good
                  : titleLength > 65
                  ? styles.bad
                  : styles.warn
              }`}
            >
              {titleLength}/60 characters (optimal: 50-60)
            </span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Commercial Rooftop Solar Systems | Solergy"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>
            <span>Meta Description *</span>
            <span
              className={`${styles.counter} ${
                descLength >= 120 && descLength <= 160
                  ? styles.good
                  : descLength > 165
                  ? styles.bad
                  : styles.warn
              }`}
            >
              {descLength}/160 characters (optimal: 120-160)
            </span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="e.g. High-efficiency solar panels and turnkey EPC solutions for industrial warehouses..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Canonical URL Override</label>
          <input
            type="url"
            placeholder="https://solergy.com/..."
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={robotsIndex}
              onChange={(e) => setRobotsIndex(e.target.checked)}
            />
            Allow Search Engines to Index (index / noindex)
          </label>

          <label>
            <input
              type="checkbox"
              checked={robotsFollow}
              onChange={(e) => setRobotsFollow(e.target.checked)}
            />
            Follow Page Links (follow / nofollow)
          </label>
        </div>
      </div>

      {/* Social / Open Graph & Twitter Cards */}
      <div className={styles.panel}>
        <h2>Social Sharing (Open Graph & Twitter / X Cards)</h2>
        <div className={styles.grid2}>
          <div>
            <h3 style={{ fontSize: "0.9375rem", color: "#ffffff", marginBottom: "14px" }}>
              Open Graph (Facebook / LinkedIn / WhatsApp)
            </h3>
            <div className={styles.field}>
              <label>OG Title</label>
              <input
                type="text"
                placeholder="Leave blank to inherit Meta Title"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>OG Description</label>
              <textarea
                rows={2}
                placeholder="Leave blank to inherit Meta Description"
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>OG Social Share Image URL</label>
              <input
                type="url"
                placeholder="https://res.cloudinary.com/..."
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "0.9375rem", color: "#ffffff", marginBottom: "14px" }}>
              Twitter / X Card
            </h3>
            <div className={styles.field}>
              <label>Twitter Title</label>
              <input
                type="text"
                placeholder="Leave blank to inherit Meta Title"
                value={twitterTitle}
                onChange={(e) => setTwitterTitle(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Twitter Description</label>
              <textarea
                rows={2}
                placeholder="Leave blank to inherit Meta Description"
                value={twitterDescription}
                onChange={(e) => setTwitterDescription(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Twitter Card Image URL</label>
              <input
                type="url"
                placeholder="https://res.cloudinary.com/..."
                value={twitterImage}
                onChange={(e) => setTwitterImage(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerActions}>
        <Link href="/admin/seo" className={styles.cancelBtn}>
          Cancel
        </Link>
        <button type="submit" className={styles.saveBtn} disabled={saving}>
          {saving ? "Saving SEO Config..." : "Save SEO Settings"}
        </button>
      </div>
    </form>
  );
}
