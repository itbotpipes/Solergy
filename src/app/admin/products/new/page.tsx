import React from "react";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff" }}>
          Add New Solar Product
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
          Upload specifications, high-res photos, and publish to the live store.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}
