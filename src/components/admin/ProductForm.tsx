"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, Trash2, Star, Plus } from "lucide-react";
import { Product, ProductMedia, ProductFeature, ProductSpecification } from "@/types/product";
import styles from "./ProductForm.module.scss";

interface ProductFormProps {
  initialProduct?: Product;
  isEditing?: boolean;
}

export default function ProductForm({
  initialProduct,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialProduct?.name || "");
  const [slug, setSlug] = useState(initialProduct?.slug || "");
  const [categoryId, setCategoryId] = useState(initialProduct?.categoryId || "Solar Panels");
  const [shortDescription, setShortDescription] = useState(
    initialProduct?.shortDescription || ""
  );
  const [fullDescription, setFullDescription] = useState(
    initialProduct?.fullDescription || ""
  );
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    initialProduct?.status || "published"
  );
  const [isFeatured, setIsFeatured] = useState(initialProduct?.isFeatured ?? false);
  const [sortOrder, setSortOrder] = useState(initialProduct?.sortOrder ?? 0);

  const [features, setFeatures] = useState<ProductFeature[]>(
    initialProduct?.features || [
      { id: "1", title: "High Module Efficiency", description: "Up to 22.8% conversion efficiency" },
    ]
  );

  const [specifications, setSpecifications] = useState<ProductSpecification[]>(
    initialProduct?.specifications || [
      { id: "1", label: "Rated Power", value: "580W" },
      { id: "2", label: "Cell Type", value: "N-Type TOPCon Mono" },
    ]
  );

  const [featuredImage, setFeaturedImage] = useState<ProductMedia | null | undefined>(
    initialProduct?.featuredImage
  );
  const [gallery, setGallery] = useState<ProductMedia[]>(
    initialProduct?.gallery || []
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
      );
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setErrorMsg("");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isVideo = file.type.startsWith("video/");
        const folder = isVideo ? "solergy/products/videos" : "solergy/products/gallery";

        // 1. Get signed signature from our Next.js backend
        const signRes = await fetch("/api/cloudinary/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder }),
        });
        const signData = await signRes.json();

        let uploadUrl = "";
        let publicId = `solergy_${Date.now()}_${i}`;

        if (signData.signature) {
          // Real Cloudinary upload
          const uploadFormData = new FormData();
          uploadFormData.append("file", file);
          uploadFormData.append("api_key", signData.apiKey);
          uploadFormData.append("timestamp", signData.timestamp.toString());
          uploadFormData.append("signature", signData.signature);
          uploadFormData.append("folder", folder);

          const endpoint = isVideo
            ? `https://api.cloudinary.com/v1_1/${signData.cloudName}/video/upload`
            : `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`;

          const cloudRes = await fetch(endpoint, {
            method: "POST",
            body: uploadFormData,
          });
          const cloudData = await cloudRes.json();

          if (cloudData.secure_url) {
            uploadUrl = cloudData.secure_url;
            publicId = cloudData.public_id;
          } else {
            throw new Error(cloudData.error?.message || "Cloudinary upload failed");
          }
        } else {
          // Local/Demo preview fallback if Cloudinary credentials are not configured yet
          uploadUrl = URL.createObjectURL(file);
        }

        const newMedia: ProductMedia = {
          id: `media_${Date.now()}_${i}`,
          publicId,
          secureUrl: uploadUrl,
          resourceType: isVideo ? "video" : "image",
          altText: name || "Product Media",
          sortOrder: gallery.length + i,
        };

        if (!featuredImage && !isVideo) {
          setFeaturedImage(newMedia);
        } else {
          setGallery((prev) => [...prev, newMedia]);
        }
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Media upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMedia = (id: string) => {
    if (featuredImage?.id === id) {
      setFeaturedImage(gallery[0] || undefined);
      setGallery((prev) => prev.slice(1));
    } else {
      setGallery((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleSetFeaturedImage = (media: ProductMedia) => {
    if (featuredImage) {
      setGallery((prev) => [featuredImage, ...prev.filter((m) => m.id !== media.id)]);
    } else {
      setGallery((prev) => prev.filter((m) => m.id !== media.id));
    }
    setFeaturedImage(media);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const payload = {
      name,
      slug,
      categoryId,
      shortDescription,
      fullDescription,
      status,
      isFeatured,
      sortOrder: Number(sortOrder),
      features,
      specifications,
      featuredImage: featuredImage || null,
      gallery,
    };

    try {
      const url = isEditing
        ? `/api/admin/products/${initialProduct?.id}`
        : "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save product.");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errorMsg && (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", color: "#f87171", padding: "12px", borderRadius: "8px" }}>
          {errorMsg}
        </div>
      )}

      {/* Basic Info */}
      <div className={styles.panel}>
        <h2>Product Information</h2>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Product Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Solergy HyperPeak 580W TOPCon"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>URL Slug *</label>
            <input
              type="text"
              required
              placeholder="solergy-hyperpeak-580w"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <span className={styles.helpText}>Public URL: /products/{slug || "..."}</span>
          </div>
        </div>

        <div className={styles.grid3} style={{ marginTop: "16px" }}>
          <div className={styles.field}>
            <label>Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="Solar Panels">Solar Panels</option>
              <option value="Inverters">Inverters</option>
              <option value="Energy Storage">Energy Storage</option>
              <option value="Mounting & BOS">Mounting & BOS</option>
              <option value="EV Charging">EV Charging</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Status</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "draft" | "published" | "archived")
              }
            >
              <option value="published">Published (Public)</option>
              <option value="draft">Draft (Hidden)</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Sort Priority Order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />
          </div>
        </div>

        <div className={styles.field} style={{ marginTop: "16px" }}>
          <label>Short Description *</label>
          <textarea
            required
            rows={2}
            placeholder="Concise overview for cards and meta descriptions..."
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>

        <div className={styles.field} style={{ marginTop: "16px" }}>
          <label>Full Technical Overview</label>
          <textarea
            rows={4}
            placeholder="Comprehensive description of engineering specs, cell architecture, and warranty..."
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "16px" }}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            Feature this product on homepage / high-priority sections
          </label>
        </div>
      </div>

      {/* Cloudinary Media Management */}
      <div className={styles.panel}>
        <h2>Cloudinary Media Assets (Images & Videos)</h2>
        <label className={styles.mediaDropzone}>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            style={{ display: "none" }}
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <Upload size={32} style={{ color: "#ec4d00", margin: "0 auto" }} />
          <p>
            {uploading
              ? "Uploading media via Cloudinary API..."
              : "Click to upload product images (JPG, PNG, WebP) or MP4 demo videos"}
          </p>
        </label>

        {/* Media display */}
        <div className={styles.mediaGallery}>
          {featuredImage && (
            <div className={styles.mediaCard}>
              <span className={styles.featuredTag}>Featured Image</span>
              {featuredImage.resourceType === "video" ? (
                <video src={featuredImage.secureUrl} controls />
              ) : (
                <img src={featuredImage.secureUrl} alt={featuredImage.altText || ""} />
              )}
              <div className={styles.mediaActions}>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Primary</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(featuredImage.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )}

          {gallery.map((media) => (
            <div key={media.id} className={styles.mediaCard}>
              {media.resourceType === "video" ? (
                <video src={media.secureUrl} controls />
              ) : (
                <img src={media.secureUrl} alt={media.altText || ""} />
              )}
              <div className={styles.mediaActions}>
                <button
                  type="button"
                  onClick={() => handleSetFeaturedImage(media)}
                  title="Make Featured"
                >
                  <Star size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(media.id)}
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className={styles.panel}>
        <h2>Key Features & Highlights</h2>
        <div className={styles.itemsList}>
          {features.map((feat, idx) => (
            <div key={feat.id || idx} className={styles.itemRow}>
              <input
                type="text"
                placeholder="Feature Title (e.g. Bifacial Generation)"
                value={feat.title}
                onChange={(e) => {
                  const updated = [...features];
                  updated[idx].title = e.target.value;
                  setFeatures(updated);
                }}
              />
              <input
                type="text"
                placeholder="Description (e.g. Up to 25% additional rear gain)"
                value={feat.description || ""}
                onChange={(e) => {
                  const updated = [...features];
                  updated[idx].description = e.target.value;
                  setFeatures(updated);
                }}
              />
              <button
                type="button"
                onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={styles.addItemBtn}
          onClick={() =>
            setFeatures([
              ...features,
              { id: `f_${Date.now()}`, title: "", description: "" },
            ])
          }
        >
          <Plus size={14} style={{ display: "inline", marginRight: "4px" }} />
          Add Feature Point
        </button>
      </div>

      {/* Technical Specifications */}
      <div className={styles.panel}>
        <h2>Technical Specifications</h2>
        <div className={styles.itemsList}>
          {specifications.map((spec, idx) => (
            <div key={spec.id || idx} className={styles.itemRow}>
              <input
                type="text"
                placeholder="Spec Label (e.g. Maximum Power)"
                value={spec.label}
                onChange={(e) => {
                  const updated = [...specifications];
                  updated[idx].label = e.target.value;
                  setSpecifications(updated);
                }}
              />
              <input
                type="text"
                placeholder="Value (e.g. 580W)"
                value={spec.value}
                onChange={(e) => {
                  const updated = [...specifications];
                  updated[idx].value = e.target.value;
                  setSpecifications(updated);
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setSpecifications(specifications.filter((_, i) => i !== idx))
                }
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={styles.addItemBtn}
          onClick={() =>
            setSpecifications([
              ...specifications,
              { id: `s_${Date.now()}`, label: "", value: "" },
            ])
          }
        >
          <Plus size={14} style={{ display: "inline", marginRight: "4px" }} />
          Add Specification Row
        </button>
      </div>

      {/* Submit / Cancel */}
      <div className={styles.footerActions}>
        <Link href="/admin/products" className={styles.cancelBtn}>
          Cancel
        </Link>
        <button
          type="submit"
          className={styles.saveBtn}
          disabled={saving || uploading}
        >
          {saving
            ? "Saving to Firestore..."
            : isEditing
            ? "Update Product"
            : "Create & Publish Product"}
        </button>
      </div>
    </form>
  );
}
