"use client";

import Link from "next/link";
import styles from "@/app/css/ProductGrid.module.css";

export default function ProductGrid({ title, products = [] }) {
  if (!products.length) {
    return <div className={styles.empty}>No products found.</div>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {title && <h2 className={styles.heading}>{title}</h2>}

        <div className={styles.grid}>
          {products.map(product => (
            <Link
              key={product._id}
              href={`/products/${product.slug.current}`}
              className={styles.card}
            >
              {/* IMAGE */}
              {product.image?.url && (
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${product.image.url})`,
                  }}
                />
              )}

              <div className={styles.overlay} />

              {/* CONTENT */}
              <div className={styles.content}>
                <h3 className={styles.title}>{product.name}</h3>

                <div className={styles.meta}>
                  {product.finish && <span>{product.finish}</span>}
                  {product.size && <span>{product.size}</span>}
                </div>

                {/* DESIGN CODE */}
                {product.designCode && (
                  <div className={styles.code}>
                    Code: {product.designCode}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}