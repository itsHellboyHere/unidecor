"use client";

import Link from "next/link";
import styles from "@/app/css/FeautredProducts.module.css";

const FEATURED_PRODUCTS = [
  {
    slug: "laminates",
    title: "Laminates",
    image: "/featured/laminates.webp",
  },
  {
    slug: "paints",
    title: "Paints",
    image: "/featured/paints.webp",
  },
  {
    slug: "hardware",
    title: "Hardware",
    image: "/featured/hardware.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.kicker}>Our Range</span>
          <h2 className={styles.title}>Curated Products</h2>
        </div>

        <div className={styles.grid}>
          {FEATURED_PRODUCTS.map(item => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className={styles.wrapperCard}
            >
              <div className={styles.productCard}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className={styles.overlay} />
                <h3 className={styles.productTitle}>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}