"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  MoveLeft,
  Ruler
} from "lucide-react";

import styles from "@/app/product/css/ProductDescrption.module.css";

export default function ProductDescription({ product }) {
  const categorySlug = product.collection?.category?.slug?.current;
  const collectionSlug = product.collection?.slug?.current;

  const isDirectCategory =
    categorySlug && collectionSlug && categorySlug === collectionSlug;

  const backHref =
    isDirectCategory
      ? `/products/${categorySlug}`
      : categorySlug && collectionSlug
        ? `/products/${categorySlug}/${collectionSlug}`
        : categorySlug
          ? `/products/${categorySlug}`
          : "/products";

  const hasSpecs = product.specifications?.length > 0;
  const hasFeatures = product.keyFeatures?.length > 0;
  const hasHighlights = product.highlights?.length > 0;
  const hasPacking = product.packing?.length > 0;

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>

        {/* NAV */}
        <nav className={styles.nav}>
          <Link href={backHref} className={styles.backLink}>
            <MoveLeft size={18} />
            <span>Back to Collection</span>
          </Link>
          <div className={styles.brandTag}>UNIDECOR</div>
        </nav>

        <div className={styles.layout}>

          {/* IMAGE */}
          <aside className={styles.visualSide}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.imageFrame}
            >
              {product.heroImage && (
                <img
                  src={product.heroImage.url}
                  alt={product.name}
                  className={styles.mainImg}
                />
              )}
            </motion.div>
          </aside>

          {/* CONTENT */}
          <section className={styles.contentSide}>

            <header className={styles.header}>
              {product.collection?.title && (
                <span className={styles.series}>
                  {product.collection.title}
                </span>
              )}

              <h1 className={styles.title}>{product.name}</h1>

              {product.designCode && (
                <span className={styles.code}>
                  Code — {product.designCode}
                </span>
              )}

              {product.mrp && (
                <div className={styles.price}>
                  ₹ {product.mrp.toLocaleString()}
                </div>
              )}
            </header>

            {/* DESCRIPTION */}
            {product.description?.length > 0 && (
              <div className={styles.description}>
                {product.description.map((block, i) => (
                  <p key={i}>{block.children?.[0]?.text}</p>
                ))}
              </div>
            )}

            {/* SIZE & FINISH CHIPS */}
            {(product.size || product.finish) && (
              <div className={styles.keySpecs}>
                {product.size && (
                  <Chip icon={<Ruler size={14} />} label="Size" value={product.size} />
                )}

                {product.finish && (
                  <Chip icon={<ShieldCheck size={14} />} label="Finish" value={product.finish} />
                )}
              </div>
            )}

            {/* SPECIFICATIONS */}
            {hasSpecs && (
              <Section title="Specifications">
                <div className={styles.specGrid}>
                  {product.specifications.map((spec, i) => (
                    <Spec key={i} label={spec.label} value={spec.value} />
                  ))}
                </div>
              </Section>
            )}

            {/* KEY FEATURES */}
            {hasFeatures && (
              <Section title="Key Features">
                <ul className={styles.featureList}>
                  {product.keyFeatures.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Section>
            )}

            {/* HIGHLIGHTS */}
            {hasHighlights && (
              <Section title="Highlights">
                <ul className={styles.featureList}>
                  {product.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Section>
            )}

            {/* PACKING */}
            {hasPacking && (
              <Section title="Available Packing">
                <div className={styles.packingChips}>
                  {product.packing.map((size, i) => (
                    <span key={i} className={styles.packingChip}>
                      {size}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* ACTION */}
            <div className={styles.actions}>
              <Link
                href={`/contact?type=product&slug=${product.slug.current}&title=${product.name}`}
                className={styles.primaryBtn}
              >
                Request Sample <ChevronRight size={16} />
              </Link>
            </div>

          </section>
        </div>
      </div>
    </main>
  );
}

/* ---------- Helpers ---------- */

function Section({ title, children }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.subHeading}>{title}</h3>
      {children}
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div className={styles.specItem}>
      <span className={styles.specLabel}>{label}</span>
      <strong className={styles.specValue}>{value}</strong>
    </div>
  );
}

function Chip({ icon, label, value }) {
  return (
    <div className={styles.specChip}>
      {icon}
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}