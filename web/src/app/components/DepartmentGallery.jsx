"use client";
import { motion } from "framer-motion";
import styles from "@/app/css/DepartMentGallery.module.css";

export default function DepartmentGallery({
  subtitle,
  title,
  items = [],
}) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.grid}>
        {items.map((img, index) => (
          <motion.div
            key={img.id}
            className={`${styles.galleryItem} ${styles[`item${index + 1}`]}`}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <img
              src={img.src}
              alt={img.title}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.overlay}>
              <span className={styles.caption}>{img.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}