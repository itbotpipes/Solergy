"use client";

import React, { useState, useEffect } from "react";
import { Upload, Copy, Check, Trash2, Loader2, RefreshCw } from "lucide-react";
import styles from "./page.module.scss";

interface MediaItem {
  id: string;
  publicId?: string;
  url: string;
  type: string;
  name: string;
  format?: string;
  bytes?: number;
}

export default function AdminMediaPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMedia = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/cloudinary/resources");
      const data = await res.json();
      if (data.assets && Array.isArray(data.assets)) {
        setMediaList(data.assets);
      }
    } catch (err) {
      console.error("Failed to load Cloudinary media", err);
      setErrorMsg("Failed to connect to Cloudinary media library.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (publicId?: string, id?: string) => {
    if (!publicId) return;
    if (!window.confirm(`Delete asset "${publicId}" from Cloudinary?`)) return;

    try {
      const res = await fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      const data = await res.json();
      if (data.success) {
        setMediaList((prev) => prev.filter((item) => (item.publicId || item.id) !== (publicId || id)));
      } else {
        alert("Failed to delete asset from Cloudinary");
      }
    } catch (err) {
      alert("Error deleting media asset");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setErrorMsg("");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isVideo = file.type.startsWith("video/");
        const folder = isVideo ? "solergy/products/videos" : "solergy/products/gallery";

        // 1. Get upload signature from backend
        const signRes = await fetch("/api/cloudinary/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder }),
        });
        const signData = await signRes.json();

        if (!signData.signature) {
          throw new Error(signData.error || "Could not generate upload signature");
        }

        // 2. Upload directly to Cloudinary
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
          setMediaList((prev) => [
            {
              id: cloudData.asset_id || cloudData.public_id,
              publicId: cloudData.public_id,
              url: cloudData.secure_url,
              type: isVideo ? "video" : "image",
              name: file.name,
              format: cloudData.format,
              bytes: cloudData.bytes,
            },
            ...prev,
          ]);
        } else {
          throw new Error(cloudData.error?.message || "Cloudinary upload failed");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Upload failed");
    } finally {
      setUploading(false);
      // Reset input value
      e.target.value = "";
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>Cloudinary Media Assets</h1>
            <p>
              High-performance image and video storage for product showcases and website case studies.
            </p>
          </div>
          <button
            type="button"
            onClick={fetchMedia}
            style={{
              background: "#1c1f24",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.8125rem",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
      </div>

      {errorMsg && (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", color: "#f87171", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
          {errorMsg}
        </div>
      )}

      <label className={styles.uploadBox} style={{ opacity: uploading ? 0.7 : 1 }}>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          style={{ display: "none" }}
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading ? (
          <>
            <Loader2 size={32} className="spin" style={{ color: "#ec4d00", margin: "0 auto", animation: "spin 1s linear infinite" }} />
            <p>Uploading files directly to Cloudinary...</p>
          </>
        ) : (
          <>
            <Upload size={32} style={{ color: "#ec4d00", margin: "0 auto" }} />
            <p>Click to upload new images or videos to Cloudinary</p>
          </>
        )}
      </label>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
          Loading assets from Cloudinary...
        </div>
      ) : mediaList.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
          No assets found in Cloudinary. Click above to upload images or videos.
        </div>
      ) : (
        <div className={styles.grid}>
          {mediaList.map((item) => (
            <div key={item.id} className={styles.card}>
              {item.type === "video" ? (
                <video src={item.url} controls />
              ) : (
                <img src={item.url} alt={item.name} loading="lazy" />
              )}
              <div className={styles.meta}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "120px" }} title={item.name}>
                  {item.name}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item.id, item.url)}
                    title="Copy URL"
                  >
                    {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  {item.publicId && (
                    <button
                      type="button"
                      onClick={() => handleDelete(item.publicId, item.id)}
                      title="Delete from Cloudinary"
                      style={{ color: "#ef4444" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
