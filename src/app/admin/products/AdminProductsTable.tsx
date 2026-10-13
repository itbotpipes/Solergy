"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Product } from "@/types/product";
import styles from "./page.module.scss";

interface AdminProductsTableProps {
  initialProducts: Product[];
}

export default function AdminProductsTable({
  initialProducts,
}: AdminProductsTableProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete product "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete product.");
      }
    } catch {
      alert("Error deleting product.");
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      (p.categoryId && p.categoryId.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Product Catalog</h1>
          <p>Create, update, manage media, and publish solar equipment.</p>
        </div>
        <Link href="/admin/products/new" className={styles.newBtn}>
          <Plus size={16} />
          New Product
        </Link>
      </div>

      <div className={styles.tablePanel}>
        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="Search products by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
            Showing {filtered.length} products
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "32px" }}>
                    No products found. Click &quot;New Product&quot; to add one.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productCell}>
                        <img
                          src={
                            product.featuredImage?.secureUrl ||
                            product.gallery?.[0]?.secureUrl ||
                            "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=100&q=80"
                          }
                          alt=""
                        />
                        <div>
                          <div className={styles.name}>{product.name}</div>
                          <div className={styles.slug}>/{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td>{product.categoryId || "General"}</td>
                    <td>
                      <span
                        className={`${styles.statusTag} ${
                          styles[product.status] || styles.draft
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td>
                      {product.isFeatured ? (
                        <span style={{ color: "#ec4d00", fontWeight: 600 }}>
                          ★ Yes
                        </span>
                      ) : (
                        <span style={{ color: "#64748b" }}>No</span>
                      )}
                    </td>
                    <td>{product.sortOrder ?? 0}</td>
                    <td>
                      <div className={styles.actionsCell}>
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          title="View Live Product"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          title="Edit Product"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id, product.name)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
