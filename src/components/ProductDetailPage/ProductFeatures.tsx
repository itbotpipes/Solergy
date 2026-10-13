import React from "react";
import { Product } from "@/types/product";
import styles from "./ProductFeatures.module.scss";

interface ProductFeaturesProps {
  product: Product;
}

export default function ProductFeatures({ product }: ProductFeaturesProps) {
  return (
    <section className={styles.section}>
      {product.features?.length > 0 && (
        <>
          <h2 className={styles.heading}>
            Key System <span className={styles.highlight}>Features & Advantages</span>
          </h2>

          <div className={styles.grid}>
            {product.features.map((feature, idx) => (
              <div key={feature.id || idx} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                {feature.description && (
                  <p className={styles.featureDesc}>{feature.description}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {product.fullDescription && (
        <div className={styles.fullDescBox}>
          <h3>Detailed Product Overview</h3>
          <p>{product.fullDescription}</p>
        </div>
      )}
    </section>
  );
}
