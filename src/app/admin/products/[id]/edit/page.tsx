import React from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/services/products";
import ProductForm from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff" }}>
          Edit: {product.name}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
          Update technical specs, pricing, gallery imagery, and metadata.
        </p>
      </div>

      <ProductForm initialProduct={product} isEditing />
    </div>
  );
}
