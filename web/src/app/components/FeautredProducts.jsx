"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/app/css/FeautredProducts.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

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



export default function FeaturedProducts() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [animateKey, setAnimateKey] = useState(0); 
  

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 780);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = FEATURED_PRODUCTS.length - visibleCount;

  const visibleItems = FEATURED_PRODUCTS.slice(
    index,
    index + visibleCount
  );

  const goNext = () => {
    setIndex(i => Math.min(i + visibleCount, maxIndex));
    setAnimateKey(k => k + 1); 
  };

  const goPrev = () => {
    setIndex(i => Math.max(i - visibleCount, 0));
    setAnimateKey(k => k + 1); 
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.headerRow}>
          <div className={styles.header}>
            <span className={styles.kicker}>Our Range</span>
            <h2 className={styles.title}>Curated Products</h2>
          </div>

          <div className={styles.navButtons}>
            <button onClick={goPrev} disabled={index === 0}>
              <ArrowLeft size={22} />
            </button>
            <button onClick={goNext} disabled={index >= maxIndex}>
              <ArrowRight size={22} />
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className={styles.grid} key={animateKey}>
          {visibleItems.map(item => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className={`${styles.wrapperCard} ${styles.enterFromRight}`}
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