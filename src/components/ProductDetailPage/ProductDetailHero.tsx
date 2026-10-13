"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, ProductMedia } from "@/types/product";
import styles from "./ProductDetailHero.module.scss";

interface ProductDetailHeroProps {
  product: Product;
  onInquireClick?: () => void;
}

export default function ProductDetailHero({
  product,
  onInquireClick,
}: ProductDetailHeroProps) {
  const allMedia: ProductMedia[] = [
    ...(product.featuredImage ? [product.featuredImage] : []),
    ...(product.gallery || []),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentMedia = allMedia[activeIndex] || allMedia[0];

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{product.name}</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.mediaSection}>
            <div className={styles.mainMedia}>
              {currentMedia?.resourceType === "video" ? (
                <video
                  src={currentMedia.secureUrl}
                  controls
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={
                    currentMedia?.secureUrl ||
                    "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={currentMedia?.altText || product.name}
                />
              )}
            </div>

            {allMedia.length > 1 && (
              <div className={styles.thumbnails}>
                {allMedia.map((media, idx) => (
                  <button
                    key={media.id || idx}
                    type="button"
                    className={`${styles.thumbBtn} ${
                      idx === activeIndex ? styles.active : ""
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    {media.resourceType === "video" ? (
                      <video src={media.secureUrl} muted />
                    ) : (
                      <img
                        src={media.secureUrl}
                        alt={media.altText || `${product.name} thumb ${idx + 1}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.infoSection}>
            {product.categoryId && (
              <span className={styles.categoryTag}>{product.categoryId}</span>
            )}
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.shortDesc}>{product.shortDescription}</p>

            <div className={styles.ctaGroup}>
              <button
                type="button"
                className={styles.quoteBtn}
                onClick={onInquireClick}
              >
                Request Product Quote
              </button>
            </div>

            {product.specifications?.length > 0 && (
              <div className={styles.specsOverview}>
                {product.specifications.slice(0, 4).map((spec) => (
                  <div key={spec.id || spec.label} className={styles.specItem}>
                    <div className={styles.label}>{spec.label}</div>
                    <div className={styles.value}>{spec.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
