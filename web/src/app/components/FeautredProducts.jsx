"use client";

const FEATURED_PRODUCTS = [
  {
    slug: "laminates",
    title: "Decorative Laminates",
    image: "/featured/laminates.webp",
  },
  {
    slug: "wall-laminates",
    title: "Wall Laminates",
    image: "/featured/wall-laminates.webp",
  },
  {
    slug: "plywood",
    title: "Engineered Plywood",
    image: "/featured/plywood.webp",
  },
  {
    slug: "wpc-boards",
    title: "WPC Boards",
    image: "/featured/wpc.webp",
  },
  {
    slug: "wall-panels",
    title: "Wall Panels",
    image: "/featured/wall-panels.webp",
  },
  {
    slug: "kitchen-panels",
    title: "Kitchen Panels",
    image: "/featured/kitchen-hardware.webp",
  },
];



import Link from "next/link";
import styles from "@/app/css/FeautredProducts.module.css";

export default function FeaturedProducts() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <header className={styles.header}>
          <span className={styles.kicker}>Our Range</span>
          <h2 className={styles.title}>Signature Material Range</h2>
        </header>

        <div className={styles.grid}>
          {FEATURED_PRODUCTS.map((item) => (
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