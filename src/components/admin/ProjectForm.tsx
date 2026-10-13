"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, Trash2, Plus, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Project, ProjectSpec, ProjectGlanceItem, ProjectPoint } from "@/types/project";
import TESTIMONIALS from "@/data/testimonials";
import styles from "./ProjectForm.module.scss";

interface ProjectFormProps {
  initialProject?: Project;
  isEditing?: boolean;
}

export default function ProjectForm({
  initialProject,
  isEditing = false,
}: ProjectFormProps) {
  const router = useRouter();

  // 1. Basic Information
  const [id, setId] = useState(initialProject?.id || "");
  const [title, setTitle] = useState(initialProject?.title || "");
  const [category, setCategory] = useState(initialProject?.category || "Residential");
  const [city, setCity] = useState(initialProject?.city || "Ludhiana");
  const [state, setState] = useState(initialProject?.state || "Punjab");
  const [size, setSize] = useState(initialProject?.size || "10 kW");
  const [date, setDate] = useState(initialProject?.date || "February 2025");
  const [systemType, setSystemType] = useState(initialProject?.systemType || "On-Grid Solar");
  const [description, setDescription] = useState(initialProject?.description || "");

  // 2. Main Image & Gallery
  const [imageUrl, setImageUrl] = useState<string>(
    typeof initialProject?.image === "string"
      ? initialProject.image
      : (initialProject?.image as any)?.src || "/images/projects/why-solergy-house.jpg"
  );

  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    initialProject?.gallery?.map((g) => (typeof g === "string" ? g : (g as any)?.src)) || [
      "/images/projects/why-solergy-house.jpg",
    ]
  );

  // 3. Overview Section
  const [overviewHeading, setOverviewHeading] = useState(
    initialProject?.overview?.heading || ""
  );
  const [overviewParagraphs, setOverviewParagraphs] = useState<string[]>(
    initialProject?.overview?.paragraphs && initialProject.overview.paragraphs.length > 0
      ? initialProject.overview.paragraphs
      : [""]
  );

  // 4. Case Study Story / Narrative
  const [story, setStory] = useState<string[]>(
    initialProject?.story && initialProject.story.length > 0
      ? initialProject.story
      : [""]
  );

  // 5. Challenge Section
  const [challengeHeading, setChallengeHeading] = useState(
    initialProject?.challenge?.heading || "The Challenge"
  );
  const [challengeIntro, setChallengeIntro] = useState<string[]>(
    initialProject?.challenge?.intro && initialProject.challenge.intro.length > 0
      ? initialProject.challenge.intro
      : [""]
  );
  const [challengePoints, setChallengePoints] = useState<ProjectPoint[]>(
    initialProject?.challenge?.points || [
      { title: "High Peak Load", description: "Heavy daytime machinery consumption." },
    ]
  );

  // 6. Solution Section
  const [solutionHeading, setSolutionHeading] = useState(
    initialProject?.solution?.heading || "The Solution"
  );
  const [solutionIntro, setSolutionIntro] = useState<string[]>(
    initialProject?.solution?.intro && initialProject.solution.intro.length > 0
      ? initialProject.solution.intro
      : [""]
  );
  const [solutionPoints, setSolutionPoints] = useState<ProjectPoint[]>(
    initialProject?.solution?.points || [
      { title: "Custom Array Layout", description: "Optimized tilt angle for maximum irradiance." },
    ]
  );

  // 7. Technical Specifications
  const [specs, setSpecs] = useState<ProjectSpec[]>(
    initialProject?.specs && initialProject.specs.length > 0
      ? initialProject.specs
      : [
          { label: "System Size", value: "10 kW" },
          { label: "Panels Installed", value: "22 x 450W Mono PERC" },
          { label: "Inverter", value: "10 kW String Inverter" },
          { label: "Annual Generation", value: "~15,000 units" },
          { label: "Monthly Bill Savings", value: "Up to ₹12,000" },
          { label: "Estimated Payback", value: "~4.2 years" },
        ]
  );

  // 8. Numbers At a Glance
  const [glance, setGlance] = useState<ProjectGlanceItem[]>(
    initialProject?.glance && initialProject.glance.length > 0
      ? initialProject.glance
      : [
          { label: "System Capacity", value: "10 kW" },
          { label: "System Type", value: "On-Grid" },
          { label: "Annual Savings", value: "~₹1.4 Lakhs" },
          { label: "Estimated Payback", value: "~4 Years" },
        ]
  );

  // 9. Impact Section
  const [impactParagraphs, setImpactParagraphs] = useState<string[]>(
    initialProject?.impact?.paragraphs && initialProject.impact.paragraphs.length > 0
      ? initialProject.impact.paragraphs
      : [""]
  );
  const [cumulativeSavings, setCumulativeSavings] = useState(
    initialProject?.impact?.cumulativeSavings || "~₹35 Lakhs over 25 years"
  );
  const [paybackYear, setPaybackYear] = useState<number>(
    initialProject?.impact?.paybackYear ?? 4
  );

  // 10. Linked Client Testimonial
  const [testimonialIndex, setTestimonialIndex] = useState<number>(
    initialProject?.testimonialIndex ?? 0
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing && !id) {
      setId(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
      );
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isHero: boolean
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setErrorMsg("");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const folder = "solergy/projects";

        const signRes = await fetch("/api/cloudinary/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder }),
        });
        const signData = await signRes.json();

        let uploadUrl = "";

        if (signData.signature) {
          const uploadFormData = new FormData();
          uploadFormData.append("file", file);
          uploadFormData.append("api_key", signData.apiKey);
          uploadFormData.append("timestamp", signData.timestamp.toString());
          uploadFormData.append("signature", signData.signature);
          uploadFormData.append("folder", folder);

          const endpoint = `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`;
          const cloudRes = await fetch(endpoint, {
            method: "POST",
            body: uploadFormData,
          });
          const cloudData = await cloudRes.json();

          if (cloudData.secure_url) {
            uploadUrl = cloudData.secure_url;
          } else {
            throw new Error(cloudData.error?.message || "Cloudinary upload failed");
          }
        } else {
          uploadUrl = URL.createObjectURL(file);
        }

        if (isHero) {
          setImageUrl(uploadUrl);
        } else {
          setGalleryUrls((prev) => [...prev, uploadUrl]);
        }
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMsg(err.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSaving(true);

    if (!title.trim()) {
      setErrorMsg("Project Title is required.");
      setSaving(false);
      return;
    }

    const payload: Partial<Project> = {
      id: id || `proj-${Date.now()}`,
      title,
      category,
      city,
      state,
      size,
      date,
      systemType,
      description,
      image: imageUrl,
      gallery: galleryUrls.length > 0 ? galleryUrls : [imageUrl],
      story: story.filter((s) => s.trim().length > 0),
      specs: specs.filter((s) => s.label.trim() && s.value.trim()),
      overview: {
        heading: overviewHeading || title,
        paragraphs: overviewParagraphs.filter((p) => p.trim().length > 0),
      },
      challenge: {
        heading: challengeHeading,
        intro: challengeIntro.filter((p) => p.trim().length > 0),
        points: challengePoints.filter((p) => p.title.trim()),
      },
      solution: {
        heading: solutionHeading,
        intro: solutionIntro.filter((p) => p.trim().length > 0),
        points: solutionPoints.filter((p) => p.title.trim()),
      },
      glance: glance.filter((g) => g.label.trim() && g.value.trim()),
      impact: {
        paragraphs: impactParagraphs.filter((p) => p.trim().length > 0),
        cumulativeSavings,
        paybackYear: Number(paybackYear) || 4,
        stats: glance.map((g) => ({ label: g.label, value: g.value })),
      },
      testimonialIndex: Number(testimonialIndex) || 0,
    };

    try {
      const endpoint = isEditing
        ? `/api/admin/projects/${initialProject?.id}`
        : "/api/admin/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save project.");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      console.error("Save error:", err);
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <Link href="/admin/projects" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <h1>{isEditing ? `Edit Project: ${title}` : "Add New Solar Project"}</h1>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => router.push("/admin/projects")}
            disabled={saving}
          >
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn} disabled={saving || uploading}>
            {saving ? "Saving Changes..." : isEditing ? "Update Project" : "Publish Project"}
          </button>
        </div>
      </div>

      {errorMsg && <div className={styles.errorAlert}>{errorMsg}</div>}

      <div className={styles.grid}>
        {/* Left Column: Information, Story, Overview, Challenges & Solutions */}
        <div className={styles.mainCol}>
          {/* Section: General Info */}
          <div className={styles.card}>
            <h2>1. General Information</h2>
            <div className={styles.field}>
              <label>Project Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Janpath Rooftop System"
                required
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Project Slug / ID *</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="e.g. res-janpath-ludhiana"
                  disabled={isEditing}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial/Industrial">Commercial/Industrial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>City *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Ludhiana"
                  required
                />
              </div>

              <div className={styles.field}>
                <label>State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Punjab"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>System Capacity (Size) *</label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="e.g. 60 kW"
                  required
                />
              </div>

              <div className={styles.field}>
                <label>System Type</label>
                <input
                  type="text"
                  value={systemType}
                  onChange={(e) => setSystemType(e.target.value)}
                  placeholder="e.g. On-Grid Solar"
                />
              </div>

              <div className={styles.field}>
                <label>Completion Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. February 2025"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Short Summary / Card Description (Grid Listing)</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A high-level summary of the solar project displayed on project cards..."
              />
            </div>
          </div>

          {/* Section: Overview (Heading & Paragraphs) */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>2. Project Overview Section</h2>
              <button
                type="button"
                className={styles.addBtn}
                onClick={() => setOverviewParagraphs((prev) => [...prev, ""])}
              >
                <Plus size={14} /> Add Paragraph
              </button>
            </div>
            <div className={styles.field}>
              <label>Overview Heading</label>
              <input
                type="text"
                value={overviewHeading}
                onChange={(e) => setOverviewHeading(e.target.value)}
                placeholder="e.g. A Rooftop Built to Carry a Big Load."
              />
            </div>
            {overviewParagraphs.map((para, idx) => (
              <div key={idx} className={styles.itemRow}>
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => {
                    const next = [...overviewParagraphs];
                    next[idx] = e.target.value;
                    setOverviewParagraphs(next);
                  }}
                  placeholder={`Overview paragraph ${idx + 1}...`}
                />
                {overviewParagraphs.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => setOverviewParagraphs(overviewParagraphs.filter((_, i) => i !== idx))}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Section: Case Study Story */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>3. Project Narrative / Story ("How We Got This Live")</h2>
              <button
                type="button"
                className={styles.addBtn}
                onClick={() => setStory((prev) => [...prev, ""])}
              >
                <Plus size={14} /> Add Paragraph
              </button>
            </div>
            {story.map((para, idx) => (
              <div key={idx} className={styles.itemRow}>
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => {
                    const next = [...story];
                    next[idx] = e.target.value;
                    setStory(next);
                  }}
                  placeholder={`Story paragraph ${idx + 1}...`}
                />
                {story.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => setStory(story.filter((_, i) => i !== idx))}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Section: Challenge & Solution */}
          <div className={styles.card}>
            <h2>4. Challenge & Solution Details</h2>
            
            {/* Challenge */}
            <div className={styles.field}>
              <label>Challenge Heading</label>
              <input
                type="text"
                value={challengeHeading}
                onChange={(e) => setChallengeHeading(e.target.value)}
              />
            </div>
            <div className={styles.subList}>
              <div className={styles.cardHeader}>
                <label>Challenge Intro Paragraphs</label>
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() => setChallengeIntro((prev) => [...prev, ""])}
                >
                  <Plus size={14} /> Add Paragraph
                </button>
              </div>
              {challengeIntro.map((para, idx) => (
                <div key={idx} className={styles.itemRow}>
                  <textarea
                    rows={2}
                    value={para}
                    onChange={(e) => {
                      const next = [...challengeIntro];
                      next[idx] = e.target.value;
                      setChallengeIntro(next);
                    }}
                    placeholder={`Challenge intro paragraph ${idx + 1}...`}
                  />
                  {challengeIntro.length > 1 && (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => setChallengeIntro(challengeIntro.filter((_, i) => i !== idx))}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}

              <div className={styles.cardHeader} style={{ marginTop: "16px" }}>
                <label>Challenge Key Points</label>
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() =>
                    setChallengePoints((prev) => [
                      ...prev,
                      { title: "", description: "" },
                    ])
                  }
                >
                  <Plus size={14} /> Add Point
                </button>
              </div>
              {challengePoints.map((pt, idx) => (
                <div key={idx} className={styles.pointRow}>
                  <input
                    type="text"
                    value={pt.title}
                    placeholder="Point Title"
                    onChange={(e) => {
                      const next = [...challengePoints];
                      next[idx].title = e.target.value;
                      setChallengePoints(next);
                    }}
                  />
                  <input
                    type="text"
                    value={pt.description}
                    placeholder="Point Description"
                    onChange={(e) => {
                      const next = [...challengePoints];
                      next[idx].description = e.target.value;
                      setChallengePoints(next);
                    }}
                  />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() =>
                      setChallengePoints(challengePoints.filter((_, i) => i !== idx))
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Solution */}
            <div className={styles.field} style={{ marginTop: "24px" }}>
              <label>Solution Heading</label>
              <input
                type="text"
                value={solutionHeading}
                onChange={(e) => setSolutionHeading(e.target.value)}
              />
            </div>
            <div className={styles.subList}>
              <div className={styles.cardHeader}>
                <label>Solution Intro Paragraphs</label>
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() => setSolutionIntro((prev) => [...prev, ""])}
                >
                  <Plus size={14} /> Add Paragraph
                </button>
              </div>
              {solutionIntro.map((para, idx) => (
                <div key={idx} className={styles.itemRow}>
                  <textarea
                    rows={2}
                    value={para}
                    onChange={(e) => {
                      const next = [...solutionIntro];
                      next[idx] = e.target.value;
                      setSolutionIntro(next);
                    }}
                    placeholder={`Solution intro paragraph ${idx + 1}...`}
                  />
                  {solutionIntro.length > 1 && (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => setSolutionIntro(solutionIntro.filter((_, i) => i !== idx))}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}

              <div className={styles.cardHeader} style={{ marginTop: "16px" }}>
                <label>Solution Key Points</label>
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() =>
                    setSolutionPoints((prev) => [
                      ...prev,
                      { title: "", description: "" },
                    ])
                  }
                >
                  <Plus size={14} /> Add Point
                </button>
              </div>
              {solutionPoints.map((pt, idx) => (
                <div key={idx} className={styles.pointRow}>
                  <input
                    type="text"
                    value={pt.title}
                    placeholder="Point Title"
                    onChange={(e) => {
                      const next = [...solutionPoints];
                      next[idx].title = e.target.value;
                      setSolutionPoints(next);
                    }}
                  />
                  <input
                    type="text"
                    value={pt.description}
                    placeholder="Point Description"
                    onChange={(e) => {
                      const next = [...solutionPoints];
                      next[idx].description = e.target.value;
                      setSolutionPoints(next);
                    }}
                  />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() =>
                      setSolutionPoints(solutionPoints.filter((_, i) => i !== idx))
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Imagery, Specifications & Financial Metrics */}
        <div className={styles.sideCol}>
          {/* Section: Main Image */}
          <div className={styles.card}>
            <h2>Featured Cover Image</h2>
            <div className={styles.imagePreview}>
              {imageUrl ? (
                <img src={imageUrl} alt="Featured Project Cover" />
              ) : (
                <div className={styles.noImage}>
                  <ImageIcon size={32} />
                  <span>No image selected</span>
                </div>
              )}
            </div>

            <div className={styles.uploadArea}>
              <label className={styles.fileInputLabel}>
                <Upload size={16} /> {uploading ? "Uploading..." : "Upload New Cover via Cloudinary"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  disabled={uploading}
                />
              </label>
              <input
                type="text"
                className={styles.urlInput}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or paste image URL"
              />
            </div>
          </div>

          {/* Section: Gallery Images */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Gallery Images</h2>
              <label className={styles.addBtn}>
                <Upload size={14} /> Upload
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload(e, false)}
                  disabled={uploading}
                />
              </label>
            </div>

            <div className={styles.galleryGrid}>
              {galleryUrls.map((url, idx) => (
                <div key={idx} className={styles.galleryItem}>
                  <img src={url} alt={`Gallery ${idx + 1}`} />
                  <button
                    type="button"
                    className={styles.galleryRemove}
                    onClick={() => setGalleryUrls(galleryUrls.filter((_, i) => i !== idx))}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Technical Specs */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>System Specifications</h2>
              <button
                type="button"
                className={styles.addBtn}
                onClick={() => setSpecs((prev) => [...prev, { label: "", value: "" }])}
              >
                <Plus size={14} /> Add Spec
              </button>
            </div>
            {specs.map((s, idx) => (
              <div key={idx} className={styles.specRow}>
                <input
                  type="text"
                  value={s.label}
                  placeholder="Label (e.g. Panels)"
                  onChange={(e) => {
                    const next = [...specs];
                    next[idx].label = e.target.value;
                    setSpecs(next);
                  }}
                />
                <input
                  type="text"
                  value={s.value}
                  placeholder="Value (e.g. 135 x 445W)"
                  onChange={(e) => {
                    const next = [...specs];
                    next[idx].value = e.target.value;
                    setSpecs(next);
                  }}
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => setSpecs(specs.filter((_, i) => i !== idx))}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Section: At a Glance Metrics */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Project at a Glance</h2>
              <button
                type="button"
                className={styles.addBtn}
                onClick={() => setGlance((prev) => [...prev, { label: "", value: "" }])}
              >
                <Plus size={14} /> Add Metric
              </button>
            </div>
            {glance.map((g, idx) => (
              <div key={idx} className={styles.specRow}>
                <input
                  type="text"
                  value={g.label}
                  placeholder="Metric Name"
                  onChange={(e) => {
                    const next = [...glance];
                    next[idx].label = e.target.value;
                    setGlance(next);
                  }}
                />
                <input
                  type="text"
                  value={g.value}
                  placeholder="Value (e.g. ~₹6.96 Lakhs)"
                  onChange={(e) => {
                    const next = [...glance];
                    next[idx].value = e.target.value;
                    setGlance(next);
                  }}
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => setGlance(glance.filter((_, i) => i !== idx))}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Section: Impact & Savings */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Impact & Long-Term Savings</h2>
              <button
                type="button"
                className={styles.addBtn}
                onClick={() => setImpactParagraphs((prev) => [...prev, ""])}
              >
                <Plus size={14} /> Add Paragraph
              </button>
            </div>
            {impactParagraphs.map((para, idx) => (
              <div key={idx} className={styles.itemRow}>
                <textarea
                  rows={2}
                  value={para}
                  onChange={(e) => {
                    const next = [...impactParagraphs];
                    next[idx] = e.target.value;
                    setImpactParagraphs(next);
                  }}
                  placeholder={`Impact paragraph ${idx + 1}...`}
                />
                {impactParagraphs.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => setImpactParagraphs(impactParagraphs.filter((_, i) => i !== idx))}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <div className={styles.field} style={{ marginTop: "16px" }}>
              <label>Estimated Cumulative Savings</label>
              <input
                type="text"
                value={cumulativeSavings}
                onChange={(e) => setCumulativeSavings(e.target.value)}
                placeholder="e.g. ~₹1.74 Cr+ over 25 years"
              />
            </div>
            <div className={styles.field}>
              <label>Payback Period (Years)</label>
              <input
                type="number"
                step="0.1"
                value={paybackYear}
                onChange={(e) => setPaybackYear(parseFloat(e.target.value) || 0)}
                placeholder="4"
              />
            </div>
          </div>

          {/* Section: Client Testimonial */}
          <div className={styles.card}>
            <h2>Featured Client Testimonial</h2>
            <div className={styles.field}>
              <label>Select Testimonial to Feature on this Case Study</label>
              <select
                value={testimonialIndex}
                onChange={(e) => setTestimonialIndex(parseInt(e.target.value, 10))}
              >
                {TESTIMONIALS.map((t, index) => (
                  <option key={index} value={index}>
                    {t.name} ({t.role}) — &quot;{t.quote.slice(0, 45)}...&quot;
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
