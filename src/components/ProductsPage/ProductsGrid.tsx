"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import styles from "./ProductsGrid.module.scss";

interface ProductsGridProps {
  initialProducts: Product[];
}

export default function ProductsGrid({ initialProducts }: ProductsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.categoryId) set.add(p.categoryId);
    });
    return ["All", ...Array.from(set)];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCat =
        selectedCategory === "All" || product.categoryId === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <section className={styles.section}>
      <div className={styles.controls}>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.categoryBtn} ${
                selectedCategory === cat ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search solar products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>No products found</h3>
          <p>Try adjusting your category filter or search terms.</p>
        </div>
      )}
    </section>
  );
}
