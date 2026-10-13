"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import ProductDetailHero from "./ProductDetailHero";
import ProductFeatures from "./ProductFeatures";
import ProductSpecs from "./ProductSpecs";
import ProductInquiryForm from "./ProductInquiryForm";
import ProductCard from "@/components/ProductsPage/ProductCard";
import styles from "./ProductDetailClient.module.scss";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <ProductDetailHero
        product={product}
        onInquireClick={() => setIsInquiryOpen(true)}
      />

      <ProductFeatures product={product} />

      <ProductSpecs product={product} />

      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <h2 className={styles.relatedTitle}>
              Related <span className={styles.highlight}>Solar Hardware</span>
            </h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ProductInquiryForm
        product={product}
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
