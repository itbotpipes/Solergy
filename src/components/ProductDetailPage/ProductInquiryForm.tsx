"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import styles from "./ProductInquiryForm.module.scss";

interface ProductInquiryFormProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductInquiryForm({
  product,
  isOpen,
  onClose,
}: ProductInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
    website_hp: "", // Honeypot
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: "product_inquiry",
          sourcePage: `/products/${product.slug}`,
          productId: product.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          message: formData.message,
          website_hp: formData.website_hp,
          formData: {
            productName: product.name,
            productSlug: product.slug,
            city: formData.city,
            message: formData.message,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {status === "success" ? (
          <div className={styles.successMsg}>
            <h3>Inquiry Received!</h3>
            <p>
              Thank you for your interest in <strong>{product.name}</strong>. Our
              technical engineering team will reach out within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Inquire About Hardware</h2>
            <span className={styles.productTag}>{product.name}</span>

            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="website_hp"
                value={formData.website_hp}
                onChange={(e) =>
                  setFormData({ ...formData, website_hp: e.target.value })
                }
                tabIndex={-1}
                autoComplete="off"
                className={styles.honeypot}
              />

              <div className={styles.field}>
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className={styles.field}>
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className={styles.field}>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className={styles.field}>
                <label>City / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Pune, Maharashtra"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>

              <div className={styles.field}>
                <label>Project Details / Requirements</label>
                <textarea
                  placeholder="Describe your rooftop area, monthly energy bills, or specific system questions..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              {errorMessage && (
                <p className={styles.errorMsg}>{errorMessage}</p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting..." : "Send Product Inquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
