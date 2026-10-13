import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl =
    product.featuredImage?.secureUrl ||
    product.gallery?.[0]?.secureUrl ||
    "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80";

  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={imageUrl}
          alt={product.featuredImage?.altText || product.name}
          className={styles.image}
          loading="lazy"
        />
        {product.categoryId && (
          <span className={styles.badge}>{product.categoryId}</span>
        )}
        {product.isFeatured && (
          <span className={styles.featuredBadge}>Featured</span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.shortDescription}</p>

        <div className={styles.footer}>
          <span className={styles.action}>
            View Specifications
            <span className={styles.arrow}>&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
