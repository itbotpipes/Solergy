import React from "react";
import { Product } from "@/types/product";
import styles from "./ProductSpecs.module.scss";

interface ProductSpecsProps {
  product: Product;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  if (!product.specifications || product.specifications.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Technical <span className={styles.highlight}>Specifications</span>
      </h2>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <tbody>
            {product.specifications.map((spec, idx) => (
              <tr key={spec.id || idx}>
                <th>{spec.label}</th>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
